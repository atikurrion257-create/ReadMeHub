<?php
/**
 * Hello Elementor Child — ReadMeHub bootstrap.
 *
 * Stack (non-negotiable): WordPress + Hello Elementor + Elementor + ACF.
 * This child theme adds ONLY what the platform needs on top:
 *  - the ReadMeHub design system (one CSS file, one small JS file)
 *  - RMH content types & taxonomies (reviews, comparisons, deals…)
 *  - ACF field groups registered in code (no JSON-sync drift)
 *  - honest structured data (schema matches visible content; no fabricated
 *    ratings/offers — enforced by the schema builder reading verified fields)
 *  - breadcrumbs, disclosure handling, verified-price shortcodes for Elementor
 *  - performance hardening
 *
 * @package hello-elementor-child
 */

defined( 'ABSPATH' ) || exit;

define( 'RMH_CHILD_VERSION', '1.0.0' );
define( 'RMH_CHILD_DIR', get_stylesheet_directory() );
define( 'RMH_CHILD_URI', get_stylesheet_directory_uri() );

require_once RMH_CHILD_DIR . '/includes/content-types.php';
require_once RMH_CHILD_DIR . '/includes/performance.php';
require_once RMH_CHILD_DIR . '/includes/breadcrumbs.php';
require_once RMH_CHILD_DIR . '/includes/schema.php';
require_once RMH_CHILD_DIR . '/includes/shortcodes.php';
require_once RMH_CHILD_DIR . '/includes/shortcodes-home.php';
require_once RMH_CHILD_DIR . '/includes/acf-field-groups.php';

/**
 * Front-end assets: exactly one stylesheet + one script for the whole site.
 * Elementor's own frontend CSS remains for Elementor-built layouts; everything
 * ReadMeHub-specific lives in the design-system files.
 */
function rmh_child_enqueue_assets() {
	$css = RMH_CHILD_DIR . '/assets/css/readmehub.css';
	$js  = RMH_CHILD_DIR . '/assets/js/readmehub.js';

	wp_enqueue_style(
		'rmh-design-system',
		RMH_CHILD_URI . '/assets/css/readmehub.css',
		array( 'hello-elementor' ),
		file_exists( $css ) ? (string) filemtime( $css ) : RMH_CHILD_VERSION
	);

	wp_enqueue_script(
		'rmh-main',
		RMH_CHILD_URI . '/assets/js/readmehub.js',
		array(),
		file_exists( $js ) ? (string) filemtime( $js ) : RMH_CHILD_VERSION,
		true
	);

	wp_localize_script(
		'rmh-main',
		'RMH_INDEX',
		rmh_build_search_index() // grouped-by-type search index (JS-side fallback grouping).
	);
}
add_action( 'wp_enqueue_scripts', 'rmh_child_enqueue_assets' );

/**
 * Site-wide search index grouped by content type (Phase 28).
 * Cheap, cached transient; rebuilt when saving RMH content types.
 */
function rmh_build_search_index() {
	$index = get_transient( 'rmh_search_index' );
	if ( is_array( $index ) ) {
		return $index;
	}

	$types = rmh_content_types();
	$index = array();

	foreach ( $types as $slug => $label ) {
		$q = new WP_Query(
			array(
				'post_type'      => $slug,
				'post_status'    => 'publish',
				'posts_per_page' => 200,
				'no_found_rows'  => true,
			)
		);
		foreach ( $q->posts as $post ) {
			$index[] = array(
				'title'    => get_the_title( $post ),
				'sub'      => (string) get_post_meta( $post->ID, 'rmh_short_verdict', true ),
				'href'     => get_permalink( $post ),
				'type'     => $slug,
				'keywords' => wp_strip_all_tags( get_the_excerpt( $post ) ),
			);
		}
	}

	// Pages that matter for search.
	foreach ( array( 'deals' ) as $page_slug ) {
		$page = get_page_by_path( $page_slug );
		if ( $page ) {
			$index[] = array(
				'title' => get_the_title( $page ),
				'sub'   => 'Verified offers only — with check dates',
				'href'  => get_permalink( $page ),
				'type'  => 'deal',
			);
		}
	}

	set_transient( 'rmh_search_index', $index, HOUR_IN_SECONDS * 6 );
	return $index;
}
function rmh_flush_search_index() {
	delete_transient( 'rmh_search_index' );
}
add_action( 'save_post', 'rmh_flush_search_index' );

/**
 * Theme supports: title-tag comes from Hello Elementor; add what is missing.
 */
function rmh_child_theme_supports() {
	add_theme_support( 'title-tag' );
	add_theme_support( 'automatic-feed-links' );
	add_theme_support( 'responsive-embeds' );
	add_theme_support( 'html5', array( 'search-form', 'gallery', 'caption', 'style', 'script' ) );
}
add_action( 'after_setup_theme', 'rmh_child_theme_supports' );

/**
 * ACF dependency guard: the platform REQUIRES Advanced Custom Fields.
 * Fail loudly (admin notice), never silently.
 */
function rmh_child_require_acf() {
	if ( ! function_exists( 'acf_add_local_field_group' ) ) {
		echo '<div class="notice notice-error"><p><strong>ReadMeHub:</strong> the Advanced Custom Fields plugin must be installed and active — the site\'s structured content model depends on it.</p></div>';
	}
	if ( ! function_exists( 'elementor_theme_do_location' ) && ! did_action( 'elementor/loaded' ) ) {
		echo '<div class="notice notice-error"><p><strong>ReadMeHub:</strong> the Elementor plugin must be installed and active — page templates depend on it.</p></div>';
	}
	if ( ! function_exists( 'hello_elementor_setup' ) ) {
		echo '<div class="notice notice-error"><p><strong>ReadMeHub:</strong> the parent theme must be Hello Elementor.</p></div>';
	}
}
add_action( 'admin_notices', 'rmh_child_require_acf' );

/**
 * Elementor header/footer locations: the header/footer are Elementor templates
 * (see wordpress/elementor-templates/) rendered through Hello Elementor's
 * theme locations. Register our locations with Hello Elementor's hook.
 */
function rmh_child_register_elementor_locations( $manager ) {
	$manager->register_all_core_location();
}
add_action( 'elementor/theme/register_locations', 'rmh_child_register_elementor_locations' );

/**
 * Disclosure: ensure every page with affiliate links can output the standing
 * disclosure above content. Editors can override per-post via rmh_disclosure_override.
 */
function rmh_child_default_disclosure( $post_id ) {
	$override = get_post_meta( $post_id, 'rmh_disclosure_override', true );
	if ( $override ) {
		return $override;
	}
	$affiliate = get_post_meta( $post_id, 'rmh_affiliate_status', true );
	if ( 'active' === $affiliate ) {
		return 'Disclosure: this page contains affiliate links. If you subscribe through them, ReadMeHub may earn a commission at no extra cost to you. Commissions never determine our verdicts — see our Affiliate Disclosure page.';
	}
	return '';
}

/**
 * "Last verified" enforcement: admin columns + stale notice for money types.
 */
function rmh_child_stale_check() {
	$types = array( 'rmh_review', 'rmh_comparison', 'rmh_alternative', 'rmh_deal', 'rmh_coupon', 'rmh_guide' );
	$limit = DAY_IN_SECONDS * 45;
	foreach ( $types as $type ) {
		$q = new WP_Query( array( 'post_type' => $type, 'post_status' => 'publish', 'fields' => 'ids', 'posts_per_page' => 300, 'no_found_rows' => true ) );
		foreach ( $q->posts as $pid ) {
			$verified = (string) get_post_meta( $pid, 'rmh_last_verified', true );
			$days     = $verified ? ( time() - strtotime( $verified ) ) / DAY_IN_SECONDS : 9999;
			$status   = get_post_meta( $pid, 'rmh_verification_status', true );
			if ( $days > $limit || ( in_array( $type, array( 'rmh_deal', 'rmh_coupon' ), true ) && 'verified' === $status && $days > DAY_IN_SECONDS * 30 ) ) {
				echo '<div class="notice notice-warning"><p><strong>ReadMeHub QA:</strong> “' . esc_html( get_the_title( $pid ) ) . '” is past its verification cycle (' . esc_html( (string) intval( $days ) ) . ' days). Re-verify pricing/offer and update “Last verified”.</p></div>';
			}
		}
	}
}
add_action( 'load-edit.php', 'rmh_child_stale_check' );
