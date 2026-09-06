<?php
/**
 * ACF field groups — registered in code (Phase 6/36).
 *
 * Rationale for code registration: no JSON sync drift, survives deploys and CI,
 * and makes the content model auditable in version control. Field names are
 * stable contracts consumed by schema.php + shortcodes.php + Elementor dynamic tags.
 *
 * Fabrication is made structurally hard:
 *  - rmh_last_verified is REQUIRED on money types (validation error otherwise).
 *  - rmh_show_rating=true requires a >=200-char methodology note.
 *  - hands-on testing requires evidence text.
 *
 * @package hello-elementor-child
 */

defined( 'ABSPATH' ) || exit;

/** Guard: ACF must be active. */
if ( ! function_exists( 'acf_add_local_field_group' ) ) {
	return;
}

rmh_register_all_field_groups();

function rmh_register_all_field_groups() {

	$position = 0;

	/* =====================================================================
	 * GROUP: ReadMeHub — Core (all RMH types)
	 * ==================================================================== */
	acf_add_local_field_group( array(
		'key'      => 'group_rmh_core',
		'title'    => 'ReadMeHub — Core',
		'position' => 'acf_after_title',
		'show_in_rest' => 1,
		'location' => array( array( rmh_location_any_rmh() ) ),
		'fields'   => array(
			array( 'key' => 'f_rmh_short_verdict', 'label' => 'Short verdict (the page\'s direct answer, ≤180 chars)', 'name' => 'rmh_short_verdict', 'type' => 'textarea', 'required' => 1, 'maxlength' => 220, 'rows' => 3, 'instructions' => 'Renders in the verdict box and search results. Must answer the page decision directly.' ),
			array( 'key' => 'f_rmh_best_for', 'label' => 'Best for', 'name' => 'rmh_best_for', 'type' => 'repeater', 'button_label' => 'Add audience', 'sub_fields' => array(
				array( 'key' => 'f_rmh_bf_audience', 'label' => 'Audience', 'name' => 'audience', 'type' => 'text', 'required' => 1 ),
				array( 'key' => 'f_rmh_bf_reason', 'label' => 'Why', 'name' => 'reason', 'type' => 'textarea', 'rows' => 2, 'required' => 1 ),
			)),
			array( 'key' => 'f_rmh_not_ideal_for', 'label' => 'Not ideal for', 'name' => 'rmh_not_ideal_for', 'type' => 'repeater', 'button_label' => 'Add audience', 'sub_fields' => array(
				array( 'key' => 'f_rmh_ni_audience', 'label' => 'Audience', 'name' => 'audience', 'type' => 'text', 'required' => 1 ),
				array( 'key' => 'f_rmh_ni_reason', 'label' => 'Why', 'name' => 'reason', 'type' => 'textarea', 'rows' => 2, 'required' => 1 ),
			)),
			array( 'key' => 'f_rmh_last_verified', 'label' => 'Last verified (prices/claims checked at source)', 'name' => 'rmh_last_verified', 'type' => 'date_picker', 'required' => 1, 'display_format' => 'Y-m-d', 'return_format' => 'Y-m-d', 'instructions' => 'QA enforces a ≤45-day cycle; deals additionally require rmh_last_checked ≤30 days.' ),
			array( 'key' => 'f_rmh_official_url', 'label' => 'Official website', 'name' => 'rmh_official_url', 'type' => 'url' ),
			array( 'key' => 'f_rmh_affiliate_status', 'label' => 'Affiliate program status', 'name' => 'rmh_affiliate_status', 'type' => 'select', 'choices' => array(
				'none' => 'None found (plain links)',
				'pending' => 'Pending verification',
				'active' => 'Active — links are sponsored & disclosed',
			), 'default_value' => 'none' ),
			array( 'key' => 'f_rmh_affiliate_url', 'label' => 'Affiliate/tracking URL (used via /go/ redirects only)', 'name' => 'rmh_affiliate_url', 'type' => 'url', 'conditional_logic' => array( array( array( 'field' => 'f_rmh_affiliate_status', 'operator' => '==', 'value' => 'active' ) ) ) ),
			array( 'key' => 'f_rmh_sources', 'label' => 'Sources', 'name' => 'rmh_sources', 'type' => 'repeater', 'button_label' => 'Add source', 'sub_fields' => array(
				array( 'key' => 'f_rmh_src_label', 'label' => 'Label', 'name' => 'label', 'type' => 'text', 'required' => 1 ),
				array( 'key' => 'f_rmh_src_url', 'label' => 'URL', 'name' => 'url', 'type' => 'url', 'required' => 1 ),
			)),
			array( 'key' => 'f_rmh_faq', 'label' => 'FAQ (rendered by [rmh_faq]; schema uses the same data)', 'name' => 'rmh_faq', 'type' => 'repeater', 'button_label' => 'Add question', 'sub_fields' => array(
				array( 'key' => 'f_rmh_faq_q', 'label' => 'Question', 'name' => 'q', 'type' => 'text', 'required' => 1 ),
				array( 'key' => 'f_rmh_faq_a', 'label' => 'Answer (self-contained, 40–60 words)', 'name' => 'a', 'type' => 'textarea', 'rows' => 3, 'required' => 1 ),
			)),
			array( 'key' => 'f_rmh_show_rating', 'label' => 'Show a numeric rating? (only with real methodology — see warning)', 'name' => 'rmh_show_rating', 'type' => 'true_false', 'default_value' => 0, 'instructions' => 'Leave OFF unless a genuine scoring methodology with real evaluation exists. Schema refuses to emit ratings without the methodology note.' ),
			array( 'key' => 'f_rmh_rating', 'label' => 'Rating (0–5)', 'name' => 'rmh_rating', 'type' => 'number', 'min' => 0, 'max' => 5, 'step' => 0.1, 'conditional_logic' => array( array( array( 'field' => 'f_rmh_show_rating', 'operator' => '==', 'value' => 1 ) ) ) ),
			array( 'key' => 'f_rmh_rating_methodology', 'label' => 'Rating methodology (≥200 chars, required to display/schema any rating)', 'name' => 'rmh_rating_methodology', 'type' => 'textarea', 'rows' => 6, 'conditional_logic' => array( array( array( 'field' => 'f_rmh_show_rating', 'operator' => '==', 'value' => 1 ) ) ) ),
			array( 'key' => 'f_rmh_disclosure_override', 'label' => 'Affiliate disclosure override (leave empty to use the standing disclosure)', 'name' => 'rmh_disclosure_override', 'type' => 'wysiwyg', 'media_upload' => 0, 'toolbar' => 'basic' ),
		),
	) );

	/* =====================================================================
	 * GROUP: Review
	 * ==================================================================== */
	acf_add_local_field_group( array(
		'key'      => 'group_rmh_review',
		'title'    => 'ReadMeHub — Review',
		'show_in_rest' => 1,
		'location' => array( array( array( 'param' => 'post_type', 'operator' => '==', 'value' => 'rmh_review' ) ) ),
		'fields'   => array(
			array( 'key' => 'f_rmw_brand', 'label' => 'Brand', 'name' => 'rmh_brand_id', 'type' => 'post_object', 'post_type' => array( 'rmh_brand' ), 'return_format' => 'id', 'required' => 1 ),
			array( 'key' => 'f_rmw_product_name', 'label' => 'Product/service name (entity, used in schema)', 'name' => 'rmh_product_name', 'type' => 'text' ),
			array( 'key' => 'f_rmw_key_takeaways', 'label' => 'Key takeaways', 'name' => 'rmh_key_takeaways', 'type' => 'repeater', 'button_label' => 'Add takeaway', 'sub_fields' => array(
				array( 'key' => 'f_rmw_kt_text', 'label' => 'Takeaway', 'name' => 'text', 'type' => 'textarea', 'rows' => 2 ),
			)),
			array( 'key' => 'f_rmw_plans', 'label' => 'Plans & pricing (every row needs a verified flag)', 'name' => 'rmh_plans', 'type' => 'repeater', 'button_label' => 'Add plan', 'sub_fields' => array(
				array( 'key' => 'f_rmw_pl_name', 'label' => 'Plan name', 'name' => 'plan_name', 'type' => 'text', 'required' => 1 ),
				array( 'key' => 'f_rmw_pl_price', 'label' => 'Price (exact, e.g. $19.80/yr — ranges go in Notes)', 'name' => 'plan_price', 'type' => 'text' ),
				array( 'key' => 'f_rmw_pl_billing', 'label' => 'Billing term', 'name' => 'plan_billing', 'type' => 'text' ),
				array( 'key' => 'f_rmw_pl_verified', 'label' => 'Price verified at official source?', 'name' => 'plan_price_verified', 'type' => 'true_false', 'default_value' => 0 ),
				array( 'key' => 'f_rmw_pl_highlights', 'label' => 'What it includes / notes', 'name' => 'plan_highlights', 'type' => 'textarea', 'rows' => 2 ),
			)),
			array( 'key' => 'f_rmw_primary_price', 'label' => 'Primary plan exact price (number, for verified Offer schema)', 'name' => 'rmh_primary_price', 'type' => 'number', 'step' => 0.01 ),
			array( 'key' => 'f_rmw_primary_currency', 'label' => 'Currency', 'name' => 'rmh_primary_currency', 'type' => 'select', 'choices' => array( 'USD' => 'USD', 'CAD' => 'CAD', 'GBP' => 'GBP', 'AUD' => 'AUD', 'EUR' => 'EUR' ) ),
			array( 'key' => 'f_rmw_price_verified', 'label' => 'Primary price verified (gates Offer schema)', 'name' => 'rmh_price_verified', 'type' => 'true_false', 'default_value' => 0 ),
			array( 'key' => 'f_rmw_features', 'label' => 'Feature-by-feature analysis', 'name' => 'rmh_features', 'type' => 'repeater', 'button_label' => 'Add feature', 'sub_fields' => array(
				array( 'key' => 'f_rmw_ft_name', 'label' => 'Feature', 'name' => 'feature', 'type' => 'text', 'required' => 1 ),
				array( 'key' => 'f_rmw_ft_assessment', 'label' => 'Assessment', 'name' => 'assessment', 'type' => 'textarea', 'rows' => 3, 'required' => 1 ),
			)),
			array( 'key' => 'f_rmw_testing_status', 'label' => 'Testing status', 'name' => 'rmh_testing_status', 'type' => 'select', 'default_value' => 'research_only', 'choices' => array(
				'research_only' => 'Research-based only (label it as such — DEFAULT)',
				'hands_on' => 'Hands-on testing performed (evidence required)',
			)),
			array( 'key' => 'f_rmw_testing_evidence', 'label' => 'Testing evidence (what, when, by whom)', 'name' => 'rmh_testing_evidence', 'type' => 'textarea', 'rows' => 4, 'conditional_logic' => array( array( array( 'field' => 'f_rmw_testing_status', 'operator' => '==', 'value' => 'hands_on' ) ) ) ),
			array( 'key' => 'f_rmw_pros', 'label' => 'Pros', 'name' => 'rmh_pros', 'type' => 'repeater', 'button_label' => 'Add pro', 'sub_fields' => array(
				array( 'key' => 'f_rmw_pros_text', 'label' => 'Pro', 'name' => 'text', 'type' => 'textarea', 'rows' => 2 ),
			)),
			array( 'key' => 'f_rmw_cons', 'label' => 'Cons', 'name' => 'rmh_cons', 'type' => 'repeater', 'button_label' => 'Add con', 'sub_fields' => array(
				array( 'key' => 'f_rmw_cons_text', 'label' => 'Con', 'name' => 'text', 'type' => 'textarea', 'rows' => 2 ),
			)),
			array( 'key' => 'f_rmw_related_comparisons', 'label' => 'Related comparisons', 'name' => 'rmh_related_comparisons', 'type' => 'relationship', 'post_type' => array( 'rmh_comparison' ), 'return_format' => 'id', 'max' => 4 ),
			array( 'key' => 'f_rmw_related_alternatives', 'label' => 'Related alternatives', 'name' => 'rmh_related_alternatives', 'type' => 'relationship', 'post_type' => array( 'rmh_alternative' ), 'return_format' => 'id', 'max' => 3 ),
			array( 'key' => 'f_rmw_related_guides', 'label' => 'Related guides', 'name' => 'rmh_related_guides', 'type' => 'relationship', 'post_type' => array( 'rmh_guide' ), 'return_format' => 'id', 'max' => 4 ),
			array( 'key' => 'f_rmw_related_usecases', 'label' => 'Related use cases', 'name' => 'rmh_related_usecases', 'type' => 'relationship', 'post_type' => array( 'rmh_usecase' ), 'return_format' => 'id', 'max' => 3 ),
		),
	) );

	/* =====================================================================
	 * GROUP: Comparison
	 * ==================================================================== */
	acf_add_local_field_group( array(
		'key'      => 'group_rmh_comparison',
		'title'    => 'ReadMeHub — Comparison',
		'show_in_rest' => 1,
		'location' => array( array( array( 'param' => 'post_type', 'operator' => '==', 'value' => 'rmh_comparison' ) ) ),
		'fields'   => array(
			array( 'key' => 'f_rmc_side_a', 'label' => 'Side A (review/brand)', 'name' => 'rmh_side_a', 'type' => 'post_object', 'post_type' => array( 'rmh_review', 'rmh_brand' ), 'return_format' => 'id', 'required' => 1 ),
			array( 'key' => 'f_rmc_side_b', 'label' => 'Side B (review/brand)', 'name' => 'rmh_side_b', 'type' => 'post_object', 'post_type' => array( 'rmh_review', 'rmh_brand' ), 'return_format' => 'id', 'required' => 1 ),
			array( 'key' => 'f_rmc_best_a', 'label' => 'A is best for…', 'name' => 'rmh_verdict_a_for', 'type' => 'textarea', 'rows' => 3, 'required' => 1 ),
			array( 'key' => 'f_rmc_best_b', 'label' => 'B is best for…', 'name' => 'rmh_verdict_b_for', 'type' => 'textarea', 'rows' => 3, 'required' => 1 ),
			array( 'key' => 'f_rmc_choose_a', 'label' => 'Choose A if…', 'name' => 'rmh_choose_a', 'type' => 'repeater', 'button_label' => 'Add condition', 'sub_fields' => array(
				array( 'key' => 'f_rmc_ca_text', 'label' => 'Condition', 'name' => 'text', 'type' => 'textarea', 'rows' => 2 ),
			)),
			array( 'key' => 'f_rmc_choose_b', 'label' => 'Choose B if…', 'name' => 'rmh_choose_b', 'type' => 'repeater', 'button_label' => 'Add condition', 'sub_fields' => array(
				array( 'key' => 'f_rmc_cb_text', 'label' => 'Condition', 'name' => 'text', 'type' => 'textarea', 'rows' => 2 ),
			)),
			array( 'key' => 'f_rmc_matrix', 'label' => 'Comparison matrix', 'name' => 'rmh_matrix', 'type' => 'repeater', 'button_label' => 'Add row', 'sub_fields' => array(
				array( 'key' => 'f_rmc_mx_dim', 'label' => 'Dimension', 'name' => 'dimension', 'type' => 'text', 'required' => 1 ),
				array( 'key' => 'f_rmc_mx_a', 'label' => 'A value', 'name' => 'a_value', 'type' => 'text', 'required' => 1 ),
				array( 'key' => 'f_rmc_mx_b', 'label' => 'B value', 'name' => 'b_value', 'type' => 'text', 'required' => 1 ),
				array( 'key' => 'f_rmc_mx_winner', 'label' => 'Edge', 'name' => 'winner', 'type' => 'select', 'choices' => array( 'a' => 'A', 'b' => 'B', 'tie' => 'Tie' ), 'default_value' => 'tie' ),
				array( 'key' => 'f_rmc_mx_interp', 'label' => 'What it means for you', 'name' => 'interpretation', 'type' => 'textarea', 'rows' => 2 ),
			)),
			array( 'key' => 'f_rmc_tiebreaker', 'label' => 'The tiebreaker (when both fit)', 'name' => 'rmh_tiebreaker', 'type' => 'textarea', 'rows' => 4 ),
		),
	) );

	/* =====================================================================
	 * GROUP: Deal + Coupon
	 * ==================================================================== */
	$deal_fields = array(
		array( 'key' => 'f_rmd_brand', 'label' => 'Brand', 'name' => 'rmh_deal_brand_id', 'type' => 'post_object', 'post_type' => array( 'rmh_brand' ), 'return_format' => 'id', 'required' => 1 ),
		array( 'key' => 'f_rmd_type', 'label' => 'Deal type', 'name' => 'rmh_deal_type', 'type' => 'select', 'choices' => array( 'promo' => 'Promotion', 'first-year' => 'First-year discount', 'bundle' => 'Bundle', 'trial' => 'Free trial / guarantee', 'coupon' => 'Coupon code' ), 'required' => 1 ),
		array( 'key' => 'f_rmd_offer', 'label' => 'Offer (plain, no hype)', 'name' => 'rmh_offer_text', 'type' => 'textarea', 'rows' => 3, 'required' => 1 ),
		array( 'key' => 'f_rmd_status', 'label' => 'Verification status', 'name' => 'rmh_verification_status', 'type' => 'select', 'required' => 1, 'choices' => array(
			'verified' => 'Verified (checked at official source)',
			'official' => 'Official (standing vendor policy)',
			'unverified' => 'Unverified (reported, NOT confirmed)',
			'expired' => 'Expired',
			'none' => 'No offer found (status report)',
		), 'default_value' => 'unverified', 'instructions' => 'Unverified rows must never contain specific discount amounts.' ),
		array( 'key' => 'f_rmd_last_checked', 'label' => 'Last checked', 'name' => 'rmh_last_checked', 'type' => 'date_picker', 'required' => 1, 'display_format' => 'Y-m-d', 'return_format' => 'Y-m-d' ),
		array( 'key' => 'f_rmd_valid_to', 'label' => 'Known end date (leave empty if rolling)', 'name' => 'rmh_valid_to', 'type' => 'date_picker', 'display_format' => 'Y-m-d', 'return_format' => 'Y-m-d' ),
		array( 'key' => 'f_rmd_url', 'label' => 'Official source URL (where verified)', 'name' => 'rmh_deal_source_url', 'type' => 'url', 'required' => 1 ),
		array( 'key' => 'f_rmd_dest', 'label' => 'Destination URL', 'name' => 'rmh_deal_url', 'type' => 'url' ),
		array( 'key' => 'f_rmd_terms', 'label' => 'Terms', 'name' => 'rmh_terms', 'type' => 'textarea', 'rows' => 2 ),
		array( 'key' => 'f_rmd_region', 'label' => 'Regions', 'name' => 'rmh_region', 'type' => 'checkbox', 'choices' => array( 'global' => 'Global', 'us' => 'US', 'ca' => 'Canada', 'uk' => 'UK', 'au' => 'Australia', 'eu' => 'EU' ), 'default_value' => array( 'global' ) ),
		array( 'key' => 'f_rmd_currency', 'label' => 'Currency context', 'name' => 'rmh_currency', 'type' => 'select', 'choices' => array( 'USD' => 'USD', 'CAD' => 'CAD', 'GBP' => 'GBP', 'AUD' => 'AUD', 'EUR' => 'EUR', 'regional' => 'Varies by region' ) ),
	);
	acf_add_local_field_group( array(
		'key' => 'group_rmh_deal', 'title' => 'ReadMeHub — Deal', 'show_in_rest' => 1,
		'location' => array( array( array( 'param' => 'post_type', 'operator' => '==', 'value' => 'rmh_deal' ) ) ),
		'fields' => $deal_fields,
	) );
	acf_add_local_field_group( array(
		'key' => 'group_rmh_coupon', 'title' => 'ReadMeHub — Coupon', 'show_in_rest' => 1,
		'location' => array( array( array( 'param' => 'post_type', 'operator' => '==', 'value' => 'rmh_coupon' ) ) ),
		'fields' => array_merge( $deal_fields, array(
			array( 'key' => 'f_rmcp_code', 'label' => 'Coupon code (ONLY from an official source — the deal is void without a source URL)', 'name' => 'rmh_coupon_code', 'type' => 'text', 'required' => 1 ),
		) ),
	) );

	/* =====================================================================
	 * GROUP: Brand
	 * ==================================================================== */
	acf_add_local_field_group( array(
		'key' => 'group_rmh_brand', 'title' => 'ReadMeHub — Brand', 'show_in_rest' => 1,
		'location' => array( array( array( 'param' => 'post_type', 'operator' => '==', 'value' => 'rmh_brand' ) ) ),
		'fields' => array(
			array( 'key' => 'f_rmb_parent', 'label' => 'Parent company / entity', 'name' => 'rmh_brand_parent', 'type' => 'text' ),
			array( 'key' => 'f_rmb_jurisdiction', 'label' => 'Jurisdiction / HQ', 'name' => 'rmh_brand_jurisdiction', 'type' => 'text' ),
			array( 'key' => 'f_rmb_summary', 'label' => 'Brand summary', 'name' => 'rmh_brand_summary', 'type' => 'textarea', 'rows' => 4, 'required' => 1 ),
			array( 'key' => 'f_rmb_pricing_summary', 'label' => 'Pricing summary (verified framing)', 'name' => 'rmh_brand_pricing', 'type' => 'textarea', 'rows' => 3 ),
			array( 'key' => 'f_rmb_strengths', 'label' => 'Strengths', 'name' => 'rmh_brand_strengths', 'type' => 'repeater', 'button_label' => 'Add', 'sub_fields' => array(
				array( 'key' => 'f_rmb_st_text', 'label' => 'Strength', 'name' => 'text', 'type' => 'text' ),
			)),
			array( 'key' => 'f_rmb_weaknesses', 'label' => 'Weaknesses', 'name' => 'rmh_brand_weaknesses', 'type' => 'repeater', 'button_label' => 'Add', 'sub_fields' => array(
				array( 'key' => 'f_rmb_wk_text', 'label' => 'Weakness', 'name' => 'text', 'type' => 'text' ),
			)),
			array( 'key' => 'f_rmb_products', 'label' => 'Products (related)', 'name' => 'rmh_brand_products', 'type' => 'relationship', 'post_type' => array( 'rmh_product' ), 'return_format' => 'id' ),
			array( 'key' => 'f_rmb_reviews', 'label' => 'Our reviews of this brand', 'name' => 'rmh_brand_reviews', 'type' => 'relationship', 'post_type' => array( 'rmh_review' ), 'return_format' => 'id' ),
		),
	) );

	/* =====================================================================
	 * GROUP: Product
	 * ==================================================================== */
	acf_add_local_field_group( array(
		'key' => 'group_rmh_product', 'title' => 'ReadMeHub — Product', 'show_in_rest' => 1,
		'location' => array( array( array( 'param' => 'post_type', 'operator' => '==', 'value' => 'rmh_product' ) ) ),
		'fields' => array(
			array( 'key' => 'f_rmp_brand', 'label' => 'Brand', 'name' => 'rmh_product_brand_id', 'type' => 'post_object', 'post_type' => array( 'rmh_brand' ), 'return_format' => 'id', 'required' => 1 ),
			array( 'key' => 'f_rmp_type', 'label' => 'Product type', 'name' => 'rmh_product_type', 'type' => 'text' ),
			array( 'key' => 'f_rmp_price_min', 'label' => 'Price min', 'name' => 'rmh_price_min', 'type' => 'number', 'step' => 0.01 ),
			array( 'key' => 'f_rmp_price_max', 'label' => 'Price max', 'name' => 'rmh_price_max', 'type' => 'number', 'step' => 0.01 ),
			array( 'key' => 'f_rmp_billing', 'label' => 'Billing term', 'name' => 'rmh_price_billing', 'type' => 'text' ),
			array( 'key' => 'f_rmp_specs', 'label' => 'Key specs', 'name' => 'rmh_specs', 'type' => 'repeater', 'button_label' => 'Add spec', 'sub_fields' => array(
				array( 'key' => 'f_rmp_sp_name', 'label' => 'Spec', 'name' => 'name', 'type' => 'text' ),
				array( 'key' => 'f_rmp_sp_value', 'label' => 'Value', 'name' => 'value', 'type' => 'text' ),
			)),
			array( 'key' => 'f_rmp_usecases', 'label' => 'Use cases', 'name' => 'rmh_product_usecases', 'type' => 'relationship', 'post_type' => array( 'rmh_usecase' ), 'return_format' => 'id' ),
			array( 'key' => 'f_rmp_review', 'label' => 'Related review', 'name' => 'rmh_product_review', 'type' => 'post_object', 'post_type' => array( 'rmh_review' ), 'return_format' => 'id' ),
		),
	) );

	/* =====================================================================
	 * GROUP: Use case
	 * ==================================================================== */
	acf_add_local_field_group( array(
		'key' => 'group_rmh_usecase', 'title' => 'ReadMeHub — Use Case', 'show_in_rest' => 1,
		'location' => array( array( array( 'param' => 'post_type', 'operator' => '==', 'value' => 'rmh_usecase' ) ) ),
		'fields' => array(
			array( 'key' => 'f_rmu_audience', 'label' => 'Audience', 'name' => 'rmh_uc_audience', 'type' => 'textarea', 'rows' => 2, 'required' => 1 ),
			array( 'key' => 'f_rmu_problem', 'label' => 'Problem', 'name' => 'rmh_uc_problem', 'type' => 'textarea', 'rows' => 3, 'required' => 1 ),
			array( 'key' => 'f_rmu_requirements', 'label' => 'Requirements checklist', 'name' => 'rmh_uc_requirements', 'type' => 'repeater', 'button_label' => 'Add requirement', 'sub_fields' => array(
				array( 'key' => 'f_rmu_rq_text', 'label' => 'Requirement', 'name' => 'text', 'type' => 'text' ),
			)),
			array( 'key' => 'f_rmu_recommendations', 'label' => 'Ranked recommendations', 'name' => 'rmh_uc_recommendations', 'type' => 'repeater', 'button_label' => 'Add recommendation', 'sub_fields' => array(
				array( 'key' => 'f_rmu_rc_rank', 'label' => 'Rank', 'name' => 'rank', 'type' => 'number' ),
				array( 'key' => 'f_rmu_rc_pick', 'label' => 'Pick', 'name' => 'pick', 'type' => 'text', 'required' => 1 ),
				array( 'key' => 'f_rmu_rc_price', 'label' => 'Price context (verified)', 'name' => 'price_context', 'type' => 'text' ),
				array( 'key' => 'f_rmu_rc_why', 'label' => 'Why', 'name' => 'why', 'type' => 'textarea', 'rows' => 3, 'required' => 1 ),
				array( 'key' => 'f_rmu_rc_review', 'label' => 'Link to review', 'name' => 'review_id', 'type' => 'post_object', 'post_type' => array( 'rmh_review' ), 'return_format' => 'id' ),
			)),
			array( 'key' => 'f_rmu_budget', 'label' => 'Budget guidance', 'name' => 'rmh_uc_budget', 'type' => 'textarea', 'rows' => 3 ),
		),
	) );

	/* =====================================================================
	 * GROUP: Guide / Alternatives / Pillar
	 * ==================================================================== */
	acf_add_local_field_group( array(
		'key' => 'group_rmh_guide', 'title' => 'ReadMeHub — Guide / Alternatives', 'show_in_rest' => 1,
		'location' => array(
			array( array( 'param' => 'post_type', 'operator' => '==', 'value' => 'rmh_guide' ) ),
			array( array( 'param' => 'post_type', 'operator' => '==', 'value' => 'rmh_alternative' ) ),
		),
		'fields' => array(
			array( 'key' => 'f_rmg_pillar', 'label' => 'Is this the category pillar?', 'name' => 'rmh_is_pillar', 'type' => 'true_false', 'default_value' => 0 ),
			array( 'key' => 'f_rmg_answer', 'label' => 'Direct answer (GEO: the extractable answer paragraph)', 'name' => 'rmh_direct_answer', 'type' => 'textarea', 'rows' => 4 ),
			array( 'key' => 'f_rmg_framework', 'label' => 'Decision framework (situation → pick)', 'name' => 'rmh_framework', 'type' => 'repeater', 'button_label' => 'Add situation', 'sub_fields' => array(
				array( 'key' => 'f_rmg_fw_sit', 'label' => 'Situation', 'name' => 'situation', 'type' => 'text', 'required' => 1 ),
				array( 'key' => 'f_rmg_fw_pick', 'label' => 'Pick', 'name' => 'pick', 'type' => 'text', 'required' => 1 ),
				array( 'key' => 'f_rmg_fw_why', 'label' => 'Why', 'name' => 'why', 'type' => 'textarea', 'rows' => 2, 'required' => 1 ),
			)),
			array( 'key' => 'f_rmg_churn_reasons', 'label' => 'Churn reasons (alternatives pages)', 'name' => 'rmh_churn_reasons', 'type' => 'repeater', 'button_label' => 'Add reason', 'sub_fields' => array(
				array( 'key' => 'f_rmg_cr_reason', 'label' => 'Reason', 'name' => 'reason', 'type' => 'text' ),
				array( 'key' => 'f_rmg_cr_evidence', 'label' => 'Evidence note', 'name' => 'evidence', 'type' => 'textarea', 'rows' => 2 ),
			)),
			array( 'key' => 'f_rmg_commercial', 'label' => 'Related commercial pages (drives internal linking modules)', 'name' => 'rmh_related_commercial', 'type' => 'relationship', 'post_type' => array( 'rmh_review', 'rmh_comparison', 'rmh_alternative', 'rmh_usecase' ), 'return_format' => 'id', 'max' => 6 ),
		),
	) );

	/* =====================================================================
	 * Options page: verified social profiles (schema sameAs gate)
	 * ==================================================================== */
	if ( function_exists( 'acf_add_options_page' ) ) {
		acf_add_options_page( array(
			'page_title' => 'ReadMeHub Settings',
			'menu_title' => 'ReadMeHub',
			'menu_slug'  => 'rmh-settings',
			'capability' => 'manage_options',
			'position'   => 20,
		) );
		acf_add_local_field_group( array(
			'key' => 'group_rmh_opts', 'title' => 'ReadMeHub — Site Settings', 'location' => array( array( array( 'param' => 'options_page', 'operator' => '==', 'value' => 'rmh-settings' ) ) ),
			'fields' => array(
				array( 'key' => 'f_rmh_opts_social', 'label' => 'Verified social profile URLs (one per line — leave empty until real; feeds schema sameAs)', 'name' => 'rmh_opts_social_profiles', 'type' => 'textarea', 'rows' => 4 ),
				array( 'key' => 'f_rmh_opts_org_logo', 'label' => 'Organization logo (SVG/PNG ≥112px)', 'name' => 'rmh_opts_logo', 'type' => 'image', 'return_format' => 'url' ),
			),
		) );
	}
}

/** Location array matching any RMH type. */
function rmh_location_any_rmh() {
	$types = array_keys( rmh_content_types() );
	$or    = array();
	foreach ( $types as $type ) {
		$or[] = array( 'param' => 'post_type', 'operator' => '==', 'value' => $type );
	}
	return $or;
}

/** ACF validation: hands-on testing requires evidence text. */
function rmh_acf_validate_testing( $valid, $value, $field, $post_id ) {
	if ( 'f_rmw_testing_status' === $field['key'] && 'hands_on' === $value ) {
		$evidence = get_field( 'rmh_testing_evidence', $post_id );
		if ( ! $evidence || strlen( wp_strip_all_tags( (string) $evidence ) ) < 40 ) {
			return 'Hands-on testing claims require testing evidence (what, when, by whom). If you have not tested hands-on, keep “Research-based only”.';
		}
	}
	return $valid;
}
add_filter( 'acf/validate_value/key=f_rmw_testing_status', 'rmh_acf_validate_testing', 10, 4 );

/** ACF validation: rating methodology length gate. */
function rmh_acf_validate_rating( $valid, $value, $field, $post_id ) {
	if ( 'f_rmh_rating' === $field['key'] && $value > 0 ) {
		$methodology = (string) ( $_POST['acf']['f_rmh_rating_methodology'] ?? get_field( 'rmh_rating_methodology', $post_id ) ); // phpcs:ignore WordPress.Security.NonceVerification
		if ( strlen( wp_strip_all_tags( $methodology ) ) < 200 ) {
			return 'A rating requires a ≥200-character methodology note describing how it was produced. Without one, ratings cannot be displayed or emitted in schema.';
		}
	}
	return $valid;
}
add_filter( 'acf/validate_value/key=f_rmh_rating', 'rmh_acf_validate_rating', 10, 4 );
