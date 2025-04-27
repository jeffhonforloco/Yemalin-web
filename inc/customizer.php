<?php
function yemalin_customize_register( $wp_customize ) {
    $wp_customize->add_section('yemalin_header', array(
        'title'    => __('Header Settings', 'yemalin'),
        'priority' => 30,
    ));
    $wp_customize->add_setting('yemalin_logo');
    $wp_customize->add_control( new WP_Customize_Image_Control(
        $wp_customize, 'yemalin_logo', array(
            'label'    => __('Upload Logo', 'yemalin'),
            'section'  => 'yemalin_header',
            'settings' => 'yemalin_logo',
        )
    ));
}
add_action('customize_register', 'yemalin_customize_register');
