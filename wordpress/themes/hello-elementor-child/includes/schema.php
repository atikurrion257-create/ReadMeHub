<?php
/**
 * Structured data (Phase 16) — honesty enforced in code.
 *
 * Rules implemented here:
 *  - Organization + WebSite + BreadcrumbList + WebPage sitewide.
 *  - Article for editorial content (author = the editorial team entity).
 *  - Review itemReviewed WITHOUT reviewRating until rmh_show_rating is true
 *    AND a methodology note exists (fabricated ratings are structurally impossible).
 *  - Offer ONLY when a price row is verified (rmh verified flag) and an exact
 *    price + currency exists. Ranges/dynamic pricing never become Offer schema.
 *  - FAQPage only from the rmh_faq repeater that is also rendered on-page via
 *    [rmh_faq] — the same data source, so markup can never exceed visible content.
 *
 * @package hello-elementor-child
 */

defined( 'ABSPATH' ) || exit;

/** Output the JSON-LD graph on singular front-end requests only. */
function rmh_output_schema() {
	if ( is_admin() || is_feed() || ! is_singular() ) {
		return;
	}
	$graph = array();

	$graph[] = array(
		'@type' => 'Organization',
		'@id'   => home_url( '/#organization' ),
		'name'  => get_bloginfo( 'name' ),
		'url'   => home_url( '/' ),
		'logo'  => array(
			'@type' => 'ImageObject',
			'url'   => RMH_CHILD_URI . '/assets/img/logo.svg',
		),
		// sameAs is added ONLY if the site owner verified real profiles (ACF options page).
	);

	$same_as = function_exists( 'get_field' ) ? get_field( 'rmh_opts_social_profiles', 'option' ) : '';
	if ( $same_as ) {
		$graph[0]['sameAs'] = array_map( 'trim', explode( "\n", $same_as ) );
	}

	$graph[] = array(
		'@type'       => 'WebSite',
		'@id'         => home_url( '/#website' ),
		'url'         => home_url( '/' ),
		'name'        => get_bloginfo( 'name' ),
		'publisher'   => array( '@id' => home_url( '/#organization' ) ),
		'potentialAction' => array(
			'@type'       => 'SearchAction',
			'target'      => array(
				'@type'       => 'EntryPoint',
				'urlTemplate' => home_url( '/?s={search_term_string}' ),
			),
			'query-input' => 'required name=search_term_string',
		),
	);

	// BreadcrumbList mirrors the visible breadcrumbs exactly.
	$items    = rmh_breadcrumb_items();
	$bclist   = array();
	$position = 1;
	foreach ( $items as $item ) {
		$entry = array(
			'@type'    => 'ListItem',
			'position' => $position++,
			'name'     => wp_strip_all_tags( $item['label'] ),
		);
		$entry['item'] = $item['url'] ? $item['url'] : get_permalink();
		$bclist[]      = $entry;
	}
	$graph[] = array(
		'@type'           => 'BreadcrumbList',
		'@id'             => get_permalink() . '#breadcrumb',
		'itemListElement' => $bclist,
	);

	$post_id   = get_the_ID();
	$published = get_the_date( DATE_W3C, $post_id );
	$modified  = get_the_modified_date( DATE_W3C, $post_id );

	$article = array(
		'@type'            => 'Article',
		'@id'              => get_permalink() . '#article',
		'headline'         => wp_trim_words( get_the_title( $post_id ), 20 ),
		'datePublished'    => $published,
		'dateModified'     => $modified,
		'author'           => array(
			'@type' => 'Organization',
			'name'  => get_bloginfo( 'name' ) . ' Editorial Team',
			'url'   => home_url( '/about/' ),
		),
		'publisher'        => array( '@id' => home_url( '/#organization' ) ),
		'mainEntityOfPage' => get_permalink(),
		'isPartOf'         => array( '@id' => home_url( '/#website' ) ),
	);

	$type = get_post_type( $post_id );

	// Review: itemReviewed without rating (honesty gate below).
	if ( 'rmh_review' === $type ) {
		$brand_id = (int) get_post_meta( $post_id, 'rmh_brand_id', true );
		$review   = array(
			'@type'        => 'Review',
			'@id'          => get_permalink() . '#review',
			'itemReviewed' => array(
				'@type' => 'SoftwareApplication',
				'name'  => get_post_meta( $post_id, 'rmh_product_name', true ) ?: get_the_title( $post_id ),
				'applicationCategory' => 'SecurityApplication',
			),
			'author'       => array( '@id' => home_url( '/#organization' ) ),
			'datePublished' => $published,
			'dateModified'  => $modified,
			'positiveNotes' => rmh_schematize_list( get_post_meta( $post_id, 'rmh_pros', true ) ),
			'negativeNotes' => rmh_schematize_list( get_post_meta( $post_id, 'rmh_cons', true ) ),
		);
		// Rating honesty gate: only with explicit show_rating + methodology >= 200 chars.
		$show_rating = get_post_meta( $post_id, 'rmh_show_rating', true );
		$methodology = (string) get_post_meta( $post_id, 'rmh_rating_methodology', true );
		$rating      = (float) get_post_meta( $post_id, 'rmh_rating', true );
		if ( $show_rating && $rating > 0 && strlen( $methodology ) >= 200 ) {
			$review['reviewRating'] = array(
				'@type'       => 'Rating',
				'ratingValue' => $rating,
				'bestRating'  => 5,
				'worstRating' => 1,
			);
		}
		$graph[] = $review;
		$article['@type'] = 'ReviewNewsArticle';
	}

	// Verified Offer for reviews with a verified exact price (single primary plan).
	if ( in_array( $type, array( 'rmh_review' ), true ) ) {
		$price     = get_post_meta( $post_id, 'rmh_primary_price', true );
		$currency  = get_post_meta( $post_id, 'rmh_primary_currency', true );
		$verified  = get_post_meta( $post_id, 'rmh_price_verified', true );
		$official  = get_post_meta( $post_id, 'rmh_official_url', true );
		if ( $price && $currency && $verified && $official ) {
			$graph[] = array(
				'@type'         => 'Offer',
				'@id'           => get_permalink() . '#offer',
				'price'         => (string) $price,
				'priceCurrency' => $currency,
				'url'           => $official,
				'availability'  => 'https://schema.org/InStock',
				'seller'        => array( '@id' => home_url( '/#organization' ) ),
			);
		}
	}

	// FAQPage from the same repeater that [rmh_faq] renders.
	$faq = get_post_meta( $post_id, 'rmh_faq', true );
	if ( is_array( $faq ) && count( $faq ) ) {
		$entities = array();
		foreach ( $faq as $row ) {
			if ( empty( $row['q'] ) || empty( $row['a'] ) ) { continue; }
			$entities[] = array(
				'@type'          => 'Question',
				'name'           => wp_strip_all_tags( $row['q'] ),
				'acceptedAnswer' => array(
					'@type' => 'Answer',
					'text'  => wp_strip_all_tags( $row['a'] ),
				),
			);
		}
		if ( $entities ) {
			$graph[] = array(
				'@type'      => 'FAQPage',
				'@id'        => get_permalink() . '#faq',
				'mainEntity' => $entities,
			);
		}
	}

	$graph[] = $article;

	$data = array(
		'@context' => 'https://schema.org',
		'@graph'   => $graph,
	);

	echo '<script type="application/ld+json">' . wp_json_encode( $data, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE ) . '</script>';
}
add_action( 'wp_head', 'rmh_output_schema', 20 );

/** Helper: repeater rows (array of 'text') -> ItemList. */
function rmh_schematize_list( $rows ) {
	if ( ! is_array( $rows ) ) {
		return null;
	}
	$items = array();
	$i     = 1;
	foreach ( $rows as $row ) {
		if ( empty( $row['text'] ) ) { continue; }
		$items[] = array(
			'@type'    => 'ListItem',
			'position' => $i++,
			'name'     => wp_strip_all_tags( $row['text'] ),
		);
	}
	return $items ? array( '@type' => 'ItemList', 'itemListElement' => $items ) : null;
}
