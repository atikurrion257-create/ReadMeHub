<?php
/**
 * Performance hardening (Phase 20).
 * Goal budgets on a PHP host: LCP < 2.0s, CLS < 0.05, INP < 200ms, homepage
 * DOM well under 1,500 nodes. System fonts (no webfont requests), one CSS,
 * one JS, no sliders/animations.
 *
 * @package hello-elementor-child
 */

defined( 'ABSPATH' ) || exit;

/** Remove emoji script (unused, render-blocking). */
function rmh_disable_emojis() {
	remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
	remove_action( 'wp_print_styles', 'print_emoji_styles' );
	remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
}
add_action( 'init', 'rmh_disable_emojis' );

/** Drop unnecessary head bloat. */
remove_action( 'wp_head', 'rsd_link' );
remove_action( 'wp_head', 'wlwmanifest_link' );
remove_action( 'wp_head', 'wp_generator' );
remove_action( 'wp_head', 'wp_shortlink_wp_head' );

/** Native lazy loading + async decoding for content images (WP core handles
 * srcset; we just make decoding async explicit). */
function rmh_image_attributes( $attr ) {
	if ( empty( $attr['loading'] ) ) {
		$attr['loading'] = 'lazy';
	}
	$attr['decoding'] = 'async';
	return $attr;
}
add_filter( 'wp_get_attachment_image_attributes', 'rmh_image_attributes' );

/** Preload nothing except what exists: keep it lean. Hello Elementor ships
 * system-adjacent font handling; ReadMeHub uses system fonts by design
 * (no webfont requests). If a self-hosted webfont is adopted later, preload it
 * HERE with font-display: swap and a size-adjust fallback — document in INSTALL.md. */

/** Elementor: disable default font kits we don't use (leave Google fonts off;
 * the design system defines the stack). */
add_filter( 'elementor/frontend/print_google_fonts', '__return_false' );

/** Limit Heartbeat on the front end (it shouldn't be there anyway) and ease
 * admin-editor collisions to 60s. */
function rmh_heartbeat_settings( $settings ) {
	$settings['interval'] = 60;
	return $settings;
}
add_filter( 'heartbeat_settings', 'rmh_heartbeat_settings' );

/** Dequeue jQuery Migrate on the front end. */
function rmh_drop_jquery_migrate( $scripts ) {
	if ( ! is_admin() && isset( $scripts->registered['jquery'] ) ) {
		$script = $scripts->registered['jquery'];
		if ( $script->deps ) {
			$script->deps = array_diff( $script->deps, array( 'jquery-migrate' ) );
		}
	}
}
add_action( 'wp_default_scripts', 'rmh_drop_jquery_migrate' );

/** Recommend-but-never-force caching note: server caching (LiteSpeed/Nginx
 * fastcgi/Cloudflare) is host-level; see INSTALL.md checklist. */
