<?php
/**
 * Homepage + template presentation shortcodes (used by the Elementor templates).
 * All data comes from ACF/queries — no hardcoded marketing copy here beyond
 * structural labels.
 *
 * @package hello-elementor-child
 */

defined( 'ABSPATH' ) || exit;

/* ---- Navigation (fallback list styled as the ReadMeHub nav) ---- */
function rmh_sc_nav_menu() {
	$locations = get_nav_menu_locations();
	if ( ! empty( $locations['primary'] ) ) {
		return wp_nav_menu(
			array(
				'theme_location' => 'primary',
				'menu_class'     => 'rm-nav',
				'container'      => 'nav',
				'container_class'=> 'rm-nav',
				'echo'           => false,
				'fallback_cb'    => false,
			)
		);
	}
	// Fallback until a menu is assigned: honest default nav.
	$items = array(
		'Reviews'     => '/reviews/',
		'Comparisons' => '/compare/',
		'Best Picks'  => '/best/password-managers/',
		'Deals'       => '/deals/',
		'Guides'      => '/guides/',
		'Categories'  => '/categories/',
	);
	$html = '<nav class="rm-nav" aria-label="Primary">';
	foreach ( $items as $label => $url ) {
		$html .= '<a href="' . esc_url( home_url( $url ) ) . '">' . esc_html( $label ) . '</a>';
	}
	return $html . '</nav>';
}
add_shortcode( 'rmh_nav_menu', 'rmh_sc_nav_menu' );

/* ---- Meta passthrough for templates ---- */
function rmh_sc_meta( $atts ) {
	$atts = shortcode_atts( array( 'key' => '', 'id' => 0 ), $atts, 'rmh_meta' );
	return esc_html( get_post_meta( $atts['id'] ? (int) $atts['id'] : get_the_ID(), $atts['key'], true ) );
}
add_shortcode( 'rmh_meta', 'rmh_sc_meta' );

/* ---- Featured decision cards (curated via ReadMeHub settings) ---- */
function rmh_sc_featured_cards() {
	$ids = function_exists( 'get_field' ) ? (array) get_field( 'rmh_opts_featured', 'option' ) : array();
	if ( ! $ids ) {
		$q = new WP_Query( array( 'post_type' => array( 'rmh_guide', 'rmh_comparison', 'rmh_usecase' ), 'posts_per_page' => 4, 'no_found_rows' => true ) );
		$ids = wp_list_pluck( $q->posts, 'ID' );
	}
	$html = '<div class="rm-grid rm-grid--4">';
	foreach ( $ids as $id ) {
		$html .= '<a class="rm-card" href="' . esc_url( get_permalink( $id ) ) . '">'
			. '<div class="rm-card__cat">' . esc_html( get_post_type_object( get_post_type( $id ) )->labels->singular_name ) . '</div>'
			. '<div class="rm-card__title">' . esc_html( get_the_title( $id ) ) . '</div>'
			. '<div class="rm-card__body">' . esc_html( wp_trim_words( (string) get_post_meta( $id, 'rmh_short_verdict', true ), 24 ) ) . '</div>'
			. '<div class="rm-card__foot"><span></span><span class="rm-card__cta">Read →</span></div></a>';
	}
	return $html . '</div>';
}
add_shortcode( 'rmh_featured_cards', 'rmh_sc_featured_cards' );

/* ---- Best picks by situation (curated via ReadMeHub settings) ---- */
function rmh_sc_picks_grid() {
	$rows = function_exists( 'get_field' ) ? (array) get_field( 'rmh_opts_picks', 'option' ) : array();
	if ( ! $rows ) {
		return '<p class="rm-meta">Editor picks are curated in ReadMeHub → Settings → Homepage picks.</p>';
	}
	$html = '<div class="rm-grid rm-grid--3">';
	foreach ( $rows as $row ) {
		$html .= '<a class="rm-pick" href="' . esc_url( $row['link'] ?? '#' ) . '">'
			. '<span class="rm-pick__label">' . esc_html( $row['label'] ?? '' ) . '</span>'
			. '<span class="rm-pick__value">' . esc_html( $row['value'] ?? '' ) . '</span>'
			. '<span class="rm-pick__why">' . esc_html( $row['why'] ?? '' ) . '</span>'
			. '<span class="rm-pick__go">See the research →</span></a>';
	}
	return $html . '</div>';
}
add_shortcode( 'rmh_picks_grid', 'rmh_sc_picks_grid' );

/* ---- Comparison cards (verdict-first, from rmh_comparison ACF) ---- */
function rmh_sc_compcards() {
	$q = new WP_Query( array( 'post_type' => 'rmh_comparison', 'posts_per_page' => 3, 'no_found_rows' => true ) );
	if ( ! $q->have_posts() ) { return ''; }
	$html = '';
	while ( $q->have_posts() ) {
		$q->the_post();
		$id   = get_the_ID();
		$a_id = (int) get_post_meta( $id, 'rmh_side_a', true );
		$b_id = (int) get_post_meta( $id, 'rmh_side_b', true );
		$name = function_exists( 'get_field' ) ? 'get_field' : '';
		$a = $a_id ? get_the_title( $a_id ) : 'A';
		$b = $b_id ? get_the_title( $b_id ) : 'B';
		$html .= '<div class="rm-compcard"><div class="rm-compcard__head">'
			. '<div class="rm-compcard__side"><b>' . esc_html( $a ) . '</b></div><div class="rm-compcard__vs" aria-hidden="true">VS</div>'
			. '<div class="rm-compcard__side"><b>' . esc_html( $b ) . '</b></div></div>'
			. '<div class="rm-compcard__body">'
			. '<div class="rm-compcard__cell"><h3>Choose ' . esc_html( $a ) . ' if</h3><p>' . esc_html( get_post_meta( $id, 'rmh_verdict_a_for', true ) ) . '</p></div>'
			. '<div class="rm-compcard__cell"><h3>Choose ' . esc_html( $b ) . ' if</h3><p>' . esc_html( get_post_meta( $id, 'rmh_verdict_b_for', true ) ) . '</p></div>'
			. '</div><div class="rm-compcard__key" style="display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap">'
			. '<a class="rm-btn rm-btn--sm rm-btn--brand" href="' . esc_url( get_permalink( $id ) ) . '">Read the verdict</a></div></div>';
	}
	wp_reset_postdata();
	return $html;
}
add_shortcode( 'rmh_compcards', 'rmh_sc_compcards' );

/* ---- Comparison single-page components ---- */
function rmh_sc_choose_if() {
	$id = get_the_ID();
	$a  = rmh_list_items( get_post_meta( $id, 'rmh_choose_a', true ) );
	$b  = rmh_list_items( get_post_meta( $id, 'rmh_choose_b', true ) );
	$a_id = (int) get_post_meta( $id, 'rmh_side_a', true );
	$b_id = (int) get_post_meta( $id, 'rmh_side_b', true );
	$html = '<div class="rm-chooseif">';
	$html .= '<div class="rm-chooseif__col rm-chooseif__col--a"><h2>Choose ' . esc_html( $a_id ? get_the_title( $a_id ) : 'A' ) . ' if…</h2><ul>' . $a . '</ul></div>';
	$html .= '<div class="rm-chooseif__col rm-chooseif__col--b"><h2>Choose ' . esc_html( $b_id ? get_the_title( $b_id ) : 'B' ) . ' if…</h2><ul>' . $b . '</ul></div>';
	return $html . '</div>';
}
add_shortcode( 'rmh_choose_if', 'rmh_sc_choose_if' );

function rmh_sc_matrix_table() {
	$rows = get_post_meta( get_the_ID(), 'rmh_matrix', true );
	if ( ! is_array( $rows ) ) { return ''; }
	$a_id = (int) get_post_meta( get_the_ID(), 'rmh_side_a', true );
	$b_id = (int) get_post_meta( get_the_ID(), 'rmh_side_b', true );
	$html  = '<div class="rm-tablewrap"><div class="rm-tablewrap__hint">Swipe to see all columns →</div>';
	$html .= '<table class="rm-table"><thead><tr><th>Dimension</th><th>' . esc_html( $a_id ? get_the_title( $a_id ) : 'A' ) . '</th><th>' . esc_html( $b_id ? get_the_title( $b_id ) : 'B' ) . '</th><th>Interpretation</th></tr></thead><tbody>';
	foreach ( $rows as $r ) {
		$html .= '<tr><td>' . esc_html( $r['dimension'] ?? '' ) . '</td><td>' . esc_html( $r['a_value'] ?? '' ) . '</td><td>' . esc_html( $r['b_value'] ?? '' ) . '</td><td>' . esc_html( $r['interpretation'] ?? '' ) . '</td></tr>';
	}
	return $html . '</tbody></table></div>';
}
add_shortcode( 'rmh_matrix_table', 'rmh_sc_matrix_table' );

function rmh_sc_tiebreaker() {
	$t = get_post_meta( get_the_ID(), 'rmh_tiebreaker', true );
	if ( ! $t ) { return ''; }
	return '<h2>The tiebreaker</h2><p>' . esc_html( $t ) . '</p>';
}
add_shortcode( 'rmh_tiebreaker', 'rmh_sc_tiebreaker' );

/* ---- Related module (drives the internal-linking graph) ---- */
function rmh_sc_related( $atts ) {
	$atts  = shortcode_atts( array( 'type' => 'auto', 'limit' => 3 ), $atts, 'rmh_related' );
	$id    = get_the_ID();
	$ids   = array();
	foreach ( array( 'rmh_related_comparisons', 'rmh_related_alternatives', 'rmh_related_guides', 'rmh_related_usecases', 'rmh_related_commercial' ) as $field ) {
		$ids = array_merge( $ids, (array) get_post_meta( $id, $field, true ) );
	}
	$ids = array_filter( array_map( 'intval', array_unique( $ids ) ) );
	if ( ! $ids ) {
		// Fallback: same segment, different post — keeps the graph alive.
		$terms = wp_get_post_terms( $id, 'rmh_segment', array( 'fields' => 'ids' ) );
		$q = new WP_Query( array(
			'post_type'   => array( 'rmh_comparison', 'rmh_guide', 'rmh_alternative', 'rmh_usecase' ),
			'posts_per_page' => (int) $atts['limit'],
			'post__not_in' => array( $id ),
			'no_found_rows' => true,
			'tax_query'   => $terms ? array( array( 'taxonomy' => 'rmh_segment', 'field' => 'ids', 'terms' => $terms ) ) : array(),
		) );
		$ids = wp_list_pluck( $q->posts, 'ID' );
	}
	if ( ! $ids ) { return ''; }
	$html = '<h2>Related decisions</h2><ul>';
	foreach ( array_slice( $ids, 0, (int) $atts['limit'] ) as $rel_id ) {
		$html .= '<li><a href="' . esc_url( get_permalink( $rel_id ) ) . '">' . esc_html( get_the_title( $rel_id ) ) . '</a></li>';
	}
	return $html . '</ul>';
}
add_shortcode( 'rmh_related', 'rmh_sc_related' );

/** Repeater of {'text': …} to <li>s. */
function rmh_list_items( $rows ) {
	$html = '';
	if ( is_array( $rows ) ) {
		foreach ( $rows as $r ) {
			if ( ! empty( $r['text'] ) ) { $html .= '<li>' . esc_html( $r['text'] ) . '</li>'; }
		}
	}
	return $html;
}
