<?php
/**
 * Breadcrumbs (Phase 22/29): semantic, schema-mirrored via schema.php.
 *
 * @package hello-elementor-child
 */

defined( 'ABSPATH' ) || exit;

/**
 * Build the breadcrumb trail for any context.
 *
 * @return array[] items: label + url ('' for current).
 */
function rmh_breadcrumb_items() {
	$items = array( array( 'label' => 'Home', 'url' => home_url( '/' ) ) );

	$segment = '';
	if ( is_singular() ) {
		$terms = get_the_terms( get_the_ID(), 'rmh_segment' );
		if ( $terms && ! is_wp_error( $terms ) ) {
			$segment = array_shift( $terms );
		}
	}

	if ( is_singular() ) {
		$type = get_post_type();
		if ( 'rmh_review' === $type ) {
			$items[] = array( 'label' => 'Reviews', 'url' => get_post_type_archive_link( 'rmh_review' ) );
		} elseif ( 'rmh_comparison' === $type ) {
			$items[] = array( 'label' => 'Comparisons', 'url' => get_post_type_archive_link( 'rmh_comparison' ) );
		} elseif ( 'rmh_guide' === $type ) {
			$items[] = array( 'label' => 'Guides', 'url' => get_post_type_archive_link( 'rmh_guide' ) );
		} elseif ( 'rmh_alternative' === $type ) {
			$items[] = array( 'label' => 'Alternatives', 'url' => get_post_type_archive_link( 'rmh_alternative' ) );
		} elseif ( 'rmh_usecase' === $type ) {
			$items[] = array( 'label' => 'Use Cases', 'url' => get_post_type_archive_link( 'rmh_usecase' ) );
		} elseif ( 'rmh_deal' === $type || 'rmh_coupon' === $type ) {
			$items[] = array( 'label' => 'Deals', 'url' => home_url( '/deals/' ) );
		} elseif ( 'rmh_brand' === $type ) {
			$items[] = array( 'label' => 'Brands', 'url' => get_post_type_archive_link( 'rmh_brand' ) );
		}
		if ( $segment ) {
			$items[] = array( 'label' => $segment->name, 'url' => get_term_link( $segment ) );
		}
		$items[] = array( 'label' => get_the_title(), 'url' => '' );
		return $items;
	}

	if ( is_post_type_archive() ) {
		$items[] = array( 'label' => post_type_archive_title( '', false ), 'url' => '' );
		return $items;
	}
	if ( is_tax( 'rmh_segment' ) ) {
		$items[] = array( 'label' => 'Categories', 'url' => home_url( '/categories/' ) );
		$items[] = array( 'label' => single_term_title( '', false ), 'url' => '' );
		return $items;
	}
	if ( is_page() ) {
		$items[] = array( 'label' => get_the_title(), 'url' => '' );
	}
	return $items;
}

/**
 * Render breadcrumbs (visible HTML — schema.php mirrors it).
 */
function rmh_breadcrumbs_html() {
	$items = rmh_breadcrumb_items();
	if ( count( $items ) < 2 ) {
		return '';
	}
	$out = '<nav class="rm-breadcrumbs" aria-label="Breadcrumb"><ol style="list-style:none;display:flex;flex-wrap:wrap;gap:6px;margin:0;padding:0;">';
	$last = count( $items ) - 1;
	foreach ( $items as $i => $item ) {
		if ( $i < $last && $item['url'] ) {
			$out .= '<li><a href="' . esc_url( $item['url'] ) . '">' . esc_html( $item['label'] ) . '</a> <span aria-hidden="true">/</span></li>';
		} else {
			$out .= '<li><span aria-current="page">' . esc_html( $item['label'] ) . '</span></li>';
		}
	}
	$out .= '</ol></nav>';
	return $out;
}
