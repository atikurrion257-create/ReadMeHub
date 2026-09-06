<?php
/**
 * ReadMeHub content types & taxonomies (Phase 5–6 architecture).
 *
 * Content types are prefixed rmh_ to stay collision-free and to make the
 * knowledge graph explicit: brand -> product -> review -> comparison ->
 * alternative -> use case -> deal/coupon -> guide, all tied by rmh_segment.
 *
 * @package hello-elementor-child
 */

defined( 'ABSPATH' ) || exit;

/**
 * Map of RMH content types => admin/search labels.
 */
function rmh_content_types() {
	return array(
		'rmh_review'      => 'Reviews',
		'rmh_comparison'  => 'Comparisons',
		'rmh_alternative' => 'Alternatives',
		'rmh_guide'       => 'Guides',
		'rmh_deal'        => 'Deals',
		'rmh_coupon'      => 'Coupons',
		'rmh_product'     => 'Products',
		'rmh_brand'       => 'Brands',
		'rmh_usecase'     => 'Use Cases',
	);
}

/**
 * Register content types + shared segment taxonomy + intent taxonomy.
 */
function rmh_register_content_types() {
	$shared = array(
		'public'             => true,
		'publicly_queryable' => true,
		'show_ui'            => true,
		'show_in_rest'       => true, // Elementor/ Gutenberg interop.
		'has_archive'        => true,
		'supports'           => array( 'title', 'editor', 'excerpt', 'thumbnail', 'revisions', 'custom-fields' ),
		'show_in_nav_menus'  => true,
	);

	$types = array(
		'rmh_review'      => array( 'Review', 'Reviews', 'reviews', 'Verdict-first product review with verified pricing' ),
		'rmh_comparison'  => array( 'Comparison', 'Comparisons', 'compare', 'Head-to-head comparison: choose X if, choose Y if' ),
		'rmh_alternative' => array( 'Alternatives Page', 'Alternatives', 'alternatives', 'Alternatives organized by why people switch' ),
		'rmh_guide'       => array( 'Guide', 'Guides', 'guides', 'Decision framework, buying guide or explainer' ),
		'rmh_deal'        => array( 'Deal', 'Deals', 'deals', 'Verified offer with check date and honest status' ),
		'rmh_coupon'      => array( 'Coupon', 'Coupons', 'coupons', 'Coupon code sourced from an official source only' ),
		'rmh_product'     => array( 'Product', 'Products', 'products', 'Structured product record' ),
		'rmh_brand'       => array( 'Brand', 'Brands', 'brands', 'Brand hub: entity, products, relations' ),
		'rmh_usecase'     => array( 'Use Case', 'Use Cases', 'use-cases', 'Situation-based recommendation page' ),
	);

	foreach ( $types as $slug => $def ) {
		register_post_type(
			$slug,
			array_merge(
				$shared,
				array(
					'labels'       => array(
						'name'          => $def[1],
						'singular_name' => $def[0],
						'menu_name'     => $def[1],
					),
					'rewrite'      => array( 'slug' => $def[2], 'with_front' => false ),
					'description'  => $def[3],
					'menu_icon'    => 'dashicons-portfolio',
					'menu_position' => 21,
				)
			)
		);
	}

	register_taxonomy(
		'rmh_segment',
		array_keys( $types ),
		array(
			'labels'            => array( 'name' => 'Segments', 'singular_name' => 'Segment' ),
			'public'            => true,
			'hierarchical'      => true,
			'show_in_rest'      => true,
			'publicly_queryable' => false, // hubs are pages; term archives disabled (no doorway/duplicate archives).
			'rewrite'           => false,
		)
	);

	register_taxonomy(
		'rmh_intent',
		array( 'rmh_review', 'rmh_comparison', 'rmh_alternative', 'rmh_guide', 'rmh_deal', 'rmh_coupon', 'rmh_usecase' ),
		array(
			'labels'       => array( 'name' => 'Intents', 'singular_name' => 'Intent' ),
			'public'       => false,
			'show_ui'      => true,
			'hierarchical' => false,
			'show_in_rest' => true,
		)
	);
}
add_action( 'init', 'rmh_register_content_types' );

/**
 * Segment term links point to the curated hub PAGES (/categories/{slug}/),
 * which carry the decision-center content. Term archives are disabled.
 */
function rmh_segment_term_link( $termlink, $term ) {
	if ( 'rmh_segment' === $term->taxonomy ) {
		return home_url( '/categories/' . $term->slug . '/' );
	}
	return $termlink;
}
add_filter( 'term_link', 'rmh_segment_term_link', 10, 2 );

/**
 * Deals hub is a page at /deals/ — but single deals must not collide with the
 * page slug. Single deals live at /deals/{brand-slug}/ via a filtered link;
 * the hub page uses /deals/. Guard: hub page slug = 'deals-index' internally,
 * permalink rewritten to /deals/.
 */
function rmh_deals_hub_permalink( $link, $post ) {
	if ( 'page' === $post->post_type && 'deals-index' === $post->post_name ) {
		return home_url( '/deals/' );
	}
	return $link;
}
add_filter( 'page_link', 'rmh_deals_hub_permalink', 10, 2 );

function rmh_deals_hub_rewrite() {
	add_rewrite_rule( '^deals/?$', 'index.php?pagename=deals-index', 'top' );
}
add_action( 'init', 'rmh_deals_hub_rewrite' );

/**
 * Affiliate redirect endpoint: /go/{brand}/ reads the destination from the
 * brand post's rmh_affiliate_url (ACF), marks the link nofollow sponsored at
 * generation time (see shortcodes.php), and 302-redirects.
 */
function rmh_affiliate_redirect() {
	if ( ! isset( $_GET['rmh_go'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification
		return;
	}
	$slug = sanitize_title( wp_unslash( $_GET['rmh_go'] ) );
	$brand = get_page_by_path( $slug, OBJECT, array( 'rmh_brand' ) );
	$url   = $brand ? get_post_meta( $brand->ID, 'rmh_affiliate_url', true ) : '';
	if ( ! $url || ! wp_http_validate_url( $url ) ) {
		wp_safe_redirect( home_url( '/deals/' ), 302 );
		exit;
	}
	wp_redirect( esc_url_raw( $url ), 302 ); // phpcs:ignore WordPress.Security.SafeRedirect -- outbound affiliate destination from ACF by design.
	exit;
}
add_action( 'template_redirect', 'rmh_affiliate_redirect', 1 );

/**
 * Affiliate link generator (auditable: destinations live in ACF, never hardcoded).
 */
function rmh_affiliate_link( $brand_slug, $anchor_text = '' ) {
	$brand = get_page_by_path( $brand_slug, OBJECT, array( 'rmh_brand' ) );
	if ( ! $brand ) {
		return '';
	}
	$label = $anchor_text ? $anchor_text : sprintf( 'Check current pricing at %s', get_the_title( $brand ) );
	$ext   = get_post_meta( $brand->ID, 'rmh_affiliate_url', true );
	if ( $ext ) {
		$href = add_query_arg( 'rmh_go', $brand_slug, home_url( '/' ) );
		return sprintf( '<a href="%s" rel="nofollow sponsored noopener" target="_blank" data-rmh-affiliate="%s">%s</a>', esc_url( $href ), esc_attr( $brand_slug ), esc_html( $label ) );
	}
	$official = get_post_meta( $brand->ID, 'rmh_official_url', true );
	return sprintf( '<a href="%s" rel="noopener" target="_blank">%s</a>', esc_url( $official ), esc_html( $label ) );
}
