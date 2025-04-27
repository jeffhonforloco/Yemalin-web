<?php
// Core theme functionality
require_once get_template_directory() . '/inc/customizer.php';
require_once get_template_directory() . '/inc/custom-post-types.php';
require_once get_template_directory() . '/inc/admin-functions.php';

// Theme setup
function yemalin_theme_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
    ));
    register_nav_menus(array(
        'primary' => __('Primary Menu', 'yemalin'),
        'footer'  => __('Footer Menu', 'yemalin'),
    ));
}
add_action('after_setup_theme', 'yemalin_theme_setup');

// Enqueue assets
function yemalin_enqueue_assets() {
    wp_enqueue_style(
        'yemalin-main-style',
        get_template_directory_uri() . '/assets/css/style.css',
        array(),
        filemtime(get_template_directory() . '/assets/css/style.css')
    );
    wp_enqueue_script(
        'yemalin-frontend-js',
        get_template_directory_uri() . '/assets/js/frontend.js',
        array('jquery'),
        filemtime(get_template_directory() . '/assets/js/frontend.js'),
        true
    );
    if (is_admin()) {
        wp_enqueue_style(
            'yemalin-admin-css',
            get_template_directory_uri() . '/assets/css/admin.css',
            array(),
            filemtime(get_template_directory() . '/assets/css/admin.css')
        );
    }
}
add_action('wp_enqueue_scripts', 'yemalin_enqueue_assets');

// Widget areas
function yemalin_widgets_init() {
    register_sidebar(array(
        'name'          => __('Main Sidebar', 'yemalin'),
        'id'            => 'main-sidebar',
        'description'   => __('Add widgets here to appear in your sidebar.', 'yemalin'),
        'before_widget' => '<section id="%1$s" class="widget %2$s">',
        'after_widget'  => '</section>',
        'before_title'  => '<h2 class="widget-title">',
        'after_title'   => '</h2>',
    ));
}
add_action('widgets_init', 'yemalin_widgets_init');
