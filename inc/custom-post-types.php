<?php
function yemalin_register_cpt() {
    register_post_type('portfolio', array(
        'labels'      => array(
            'name'          => __('Portfolio', 'yemalin'),
            'singular_name' => __('Portfolio Item', 'yemalin'),
        ),
        'public'      => true,
        'has_archive' => true,
        'supports'    => array('title', 'editor', 'thumbnail'),
        'menu_icon'   => 'dashicons-portfolio',
        'show_in_rest'=> true,
    ));
}
add_action('init', 'yemalin_register_cpt');
