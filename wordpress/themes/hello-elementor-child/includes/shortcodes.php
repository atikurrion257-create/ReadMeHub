<?php
/**
 * ReadMeHub structured-content shortcodes for Elementor (Phase 37).
 *
 * Pattern: Elementor owns LAYOUT; these shortcodes render STRUCTURED components
 * from ACF data. This keeps Elementor Free sufficient (no addon packs) and
 * keeps components consistent everywhere. Use them inside Elementor
 * Shortcode widgets (or Text Editor widgets).
 *
 * Available:
 *   [rmh_verdict_box]            — verdict/answer block from rmh_short_verdict
 *   [rmh_fit_lists]              — best-for / not-ideal-for columns
 *   [rmh_takeaways]              — key takeaways list
 *   [rmh_price_table]            — verified-price table (plans repeater)
 *   [rmh_pros_cons]              — pros/cons columns
 *   [rmh_faq]                    — FAQ accordion (+ schema source of truth)
 *   [rmh_verification_stamp]     — "Last verified <date>" stamp
 *   [rmh_deal_cards status="verified|all" limit="6"] — deal cards with badges
 *   [rmh_cards type="rmh_review|rmh_comparison|rmh_guide|..." limit="4"] — card loops
 *   [rmh_disclosure]             — standing affiliate disclosure
 *   [rmh_affiliate brand="1password" text=""] — auditable sponsored link
 *   [rmh_breadcrumbs]
 *
 * @package hello-elementor-child
 */

defined( 'ABSPATH' ) || exit;

/** Esc helper for meta values. */
function rmh_meta( $key, $post_id = null ) {
	return (string) get_post_meta( $post_id ? $post_id : get_the_ID(), $key, true );
}

/* ---------------- Verdict box ---------------- */
function rmh_sc_verdict_box() {
	$v = rmh_meta( 'rmh_short_verdict' );
	if ( ! $v ) { return ''; }
	$label = 'The short answer';
	if ( 'rmh_comparison' === get_post_type() ) { $label = 'Quick verdict'; }
	if ( 'rmh_review' === get_post_type() ) { $label = 'Executive verdict'; }
	return '<div class="rm-verdict"><div class="rm-verdict__label">' . esc_html( $label ) . '</div><p>' . esc_html( $v ) . '</p></div>';
}
add_shortcode( 'rmh_verdict_box', 'rmh_sc_verdict_box' );

/* ---------------- Fit lists ---------------- */
function rmh_sc_fit_lists() {
	$best = get_post_meta( get_the_ID(), 'rmh_best_for', true );
	$not  = get_post_meta( get_the_ID(), 'rmh_not_ideal_for', true );
	$col  = function ( $rows, $cls, $title ) {
		if ( ! is_array( $rows ) || ! count( $rows ) ) { return ''; }
		$html = '<div class="rm-fit__col ' . $cls . '"><div class="rm-fit__head">' . esc_html( $title ) . '</div><ul class="rm-fit__list">';
		foreach ( $rows as $r ) {
			$html .= '<li><b>' . esc_html( $r['audience'] ?? '' ) . '</b><span>' . esc_html( $r['reason'] ?? '' ) . '</span></li>';
		}
		return $html . '</ul></div>';
	};
	$out = '<div class="rm-fit">';
	$out .= $col( $best, 'rm-fit__col--yes', 'Best for' );
	$out .= $col( $not, 'rm-fit__col--no', 'Not ideal for' );
	return $out . '</div>';
}
add_shortcode( 'rmh_fit_lists', 'rmh_sc_fit_lists' );

/* ---------------- Key takeaways ---------------- */
function rmh_sc_takeaways() {
	$rows = get_post_meta( get_the_ID(), 'rmh_key_takeaways', true );
	if ( ! is_array( $rows ) ) { return ''; }
	$html = '<div class="rm-takeaways"><h2>Key takeaways</h2><ul>';
	foreach ( $rows as $r ) {
		if ( ! empty( $r['text'] ) ) { $html .= '<li>' . esc_html( $r['text'] ) . '</li>'; }
	}
	return $html . '</ul></div>';
}
add_shortcode( 'rmh_takeaways', 'rmh_sc_takeaways' );

/* ---------------- Verified price table ---------------- */
function rmh_sc_price_table() {
	$rows     = get_post_meta( get_the_ID(), 'rmh_plans', true );
	$verified = rmh_meta( 'rmh_last_verified' );
	if ( ! is_array( $rows ) || ! count( $rows ) ) { return ''; }
	$html  = '<div class="rm-tablewrap"><div class="rm-tablewrap__hint">Swipe to see all columns →</div>';
	$html .= '<table class="rm-table"><caption>Plans &amp; verified pricing</caption><thead><tr>';
	foreach ( array( 'Plan', 'Price', 'Billing term', 'Notes' ) as $h ) { $html .= '<th scope="col">' . $h . '</th>'; }
	$html .= '</tr></thead><tbody>';
	foreach ( $rows as $r ) {
		$price = $r['plan_price'] ?? '';
		$stamp = ! empty( $r['plan_price_verified'] ) && $verified
			? ' <span class="rm-badge rm-badge--verified">Verified ' . esc_html( mysql2date( 'M j, Y', $verified ) ) . '</span>'
			: ' <span class="rm-badge rm-badge--unverified">Verify at checkout</span>';
		$html .= '<tr><td>' . esc_html( $r['plan_name'] ?? '' ) . '</td><td class="rm-price">' . esc_html( $price ) . $stamp . '</td><td>' . esc_html( $r['plan_billing'] ?? '' ) . '</td><td>' . esc_html( $r['plan_highlights'] ?? '' ) . '</td></tr>';
	}
	return $html . '</tbody></table></div>';
}
add_shortcode( 'rmh_price_table', 'rmh_sc_price_table' );

/* ---------------- Pros / cons ---------------- */
function rmh_sc_pros_cons() {
	$pros = get_post_meta( get_the_ID(), 'rmh_pros', true );
	$cons = get_post_meta( get_the_ID(), 'rmh_cons', true );
	$list = function ( $rows ) {
		$html = '';
		if ( is_array( $rows ) ) {
			foreach ( $rows as $r ) {
				if ( ! empty( $r['text'] ) ) { $html .= '<li>' . esc_html( $r['text'] ) . '</li>'; }
			}
		}
		return '<ul class="rm-proscons__list">' . $html . '</ul>';
	};
	return '<div class="rm-proscons">'
		. '<div class="rm-proscons__col rm-proscons__col--pros"><div class="rm-proscons__head">Pros</div>' . $list( $pros ) . '</div>'
		. '<div class="rm-proscons__col rm-proscons__col--cons"><div class="rm-proscons__head">Cons</div>' . $list( $cons ) . '</div>'
		. '</div>';
}
add_shortcode( 'rmh_pros_cons', 'rmh_sc_pros_cons' );

/* ---------------- FAQ ---------------- */
function rmh_sc_faq() {
	$faq = get_post_meta( get_the_ID(), 'rmh_faq', true );
	if ( ! is_array( $faq ) || ! count( $faq ) ) { return ''; }
	$html = '<div class="rm-faq" data-faq>';
	foreach ( $faq as $row ) {
		if ( empty( $row['q'] ) || empty( $row['a'] ) ) { continue; }
		$html .= '<details><summary>' . esc_html( $row['q'] ) . '</summary><div class="rm-faq__a">' . wp_kses_post( wpautop( $row['a'] ) ) . '</div></details>';
	}
	return $html . '</div>';
}
add_shortcode( 'rmh_faq', 'rmh_sc_faq' );

/* ---------------- Verification stamp ---------------- */
function rmh_sc_verification_stamp() {
	$d = rmh_meta( 'rmh_last_verified' );
	if ( ! $d ) { return ''; }
	return '<span class="rm-verified-stamp">✔ Last verified ' . esc_html( mysql2date( 'M j, Y', $d ) ) . '</span>';
}
add_shortcode( 'rmh_verification_stamp', 'rmh_sc_verification_stamp' );

/* ---------------- Deal cards ---------------- */
function rmh_deal_badge( $post_id ) {
	$status = rmh_meta( 'rmh_verification_status', $post_id );
	$map    = array(
		'verified'   => array( 'rm-badge--verified', 'Verified' ),
		'official'   => array( 'rm-badge--official', 'Official' ),
		'unverified' => array( 'rm-badge--unverified', 'Unverified' ),
		'expired'    => array( 'rm-badge--expired', 'Expired' ),
		'none'       => array( 'rm-badge--none', 'No offer found' ),
	);
	$def = $map[ $status ] ?? $map['unverified'];
	$checked = rmh_meta( 'rmh_last_checked', $post_id );
	$label = $def[1] . ( $checked ? ' · checked ' . mysql2date( 'M j, Y', $checked ) : '' );
	if ( 'verified' === $status && $checked && ( time() - strtotime( $checked ) ) > DAY_IN_SECONDS * 30 ) {
		$def   = $map['unverified'];
		$label = 'Verification stale · checked ' . mysql2date( 'M j, Y', $checked );
	}
	return '<span class="rm-badge ' . $def[0] . '">' . esc_html( $label ) . '</span>';
}

function rmh_sc_deal_cards( $atts ) {
	$atts = shortcode_atts( array( 'status' => 'all', 'limit' => 6 ), $atts, 'rmh_deal_cards' );
	$q = new WP_Query( array(
		'post_type'      => 'rmh_deal',
		'posts_per_page' => (int) $atts['limit'],
		'no_found_rows'  => true,
		'meta_query'     => 'all' !== $atts['status'] ? array( array( 'key' => 'rmh_verification_status', 'value' => sanitize_title( $atts['status'] ) ) ) : array(),
	) );
	if ( ! $q->have_posts() ) {
		return '<p class="rm-meta">Currently, we could not verify an active offer in this category. Check the linked official pages — and this page again after our next verification sweep.</p>';
	}
	$html = '<div class="rm-grid rm-grid--3">';
	while ( $q->have_posts() ) {
		$q->the_post();
		$id   = get_the_ID();
		$html .= '<article class="rm-deal">'
			. '<div class="rm-deal__top"><span class="rm-deal__brand">' . esc_html( get_the_title() ) . '</span>' . rmh_deal_badge( $id ) . '</div>'
			. '<div class="rm-deal__offer">' . esc_html( rmh_meta( 'rmh_offer_text', $id ) ) . '</div>'
			. '<div class="rm-deal__meta">' . esc_html( rmh_meta( 'rmh_terms', $id ) ) . '</div>'
			. '<div class="rm-deal__foot"><span class="rm-meta">' . esc_html( rmh_meta( 'rmh_deal_type', $id ) ) . '</span>'
			. '<a class="rm-btn rm-btn--sm rm-btn--brand" href="' . esc_url( rmh_meta( 'rmh_deal_url', $id ) ?: get_permalink( $id ) ) . '" rel="noopener nofollow sponsored" target="_blank">View offer</a></div>'
			. '</article>';
	}
	wp_reset_postdata();
	return $html . '</div>';
}
add_shortcode( 'rmh_deal_cards', 'rmh_sc_deal_cards' );

/* ---------------- Card loops (reviews/comparisons/guides…) ---------------- */
function rmh_sc_cards( $atts ) {
	$atts = shortcode_atts( array( 'type' => 'rmh_review', 'limit' => 4, 'segment' => '' ), $atts, 'rmh_cards' );
	$args = array(
		'post_type'      => sanitize_key( $atts['type'] ),
		'posts_per_page' => (int) $atts['limit'],
		'no_found_rows'  => true,
	);
	if ( $atts['segment'] ) {
		$args['tax_query'] = array( array( 'taxonomy' => 'rmh_segment', 'field' => 'slug', 'terms' => sanitize_title( $atts['segment'] ) ) );
	}
	$q = new WP_Query( $args );
	if ( ! $q->have_posts() ) { return ''; }
	$cols = (int) $atts['limit'] >= 3 ? 'rm-grid--3' : 'rm-grid--2';
	$html = '<div class="rm-grid ' . esc_attr( $cols ) . '">';
	while ( $q->have_posts() ) {
		$q->the_post();
		$id  = get_the_ID();
		$seg = get_the_terms( $id, 'rmh_segment' );
		$verdict = rmh_meta( 'rmh_short_verdict', $id );
		$html .= '<a class="rm-card" href="' . esc_url( get_permalink() ) . '">'
			. '<div class="rm-card__cat">' . esc_html( $seg && ! is_wp_error( $seg ) ? $seg[0]->name : '' ) . '</div>'
			. '<div class="rm-card__title">' . esc_html( get_the_title() ) . '</div>'
			. '<div class="rm-card__body">' . esc_html( wp_trim_words( $verdict ? $verdict : get_the_excerpt(), 26 ) ) . '</div>'
			. '<div class="rm-card__foot"><span class="rm-meta">Updated ' . esc_html( get_the_modified_date( 'M j, Y' ) ) . '</span><span class="rm-card__cta">Read →</span></div>'
			. '</a>';
	}
	wp_reset_postdata();
	return $html . '</div>';
}
add_shortcode( 'rmh_cards', 'rmh_sc_cards' );

/* ---------------- Disclosure & affiliate ---------------- */
function rmh_sc_disclosure() {
	$text = rmh_child_default_disclosure( get_the_ID() );
	if ( ! $text ) { return ''; }
	return '<p class="rm-disclosure">' . esc_html( $text ) . '</p>';
}
add_shortcode( 'rmh_disclosure', 'rmh_sc_disclosure' );

function rmh_sc_affiliate( $atts ) {
	$atts = shortcode_atts( array( 'brand' => '', 'text' => '' ), $atts, 'rmh_affiliate' );
	return rmh_affiliate_link( sanitize_title( $atts['brand'] ), $atts['text'] );
}
add_shortcode( 'rmh_affiliate', 'rmh_sc_affiliate' );

function rmh_sc_breadcrumbs() {
	return rmh_breadcrumbs_html();
}
add_shortcode( 'rmh_breadcrumbs', 'rmh_sc_breadcrumbs' );
