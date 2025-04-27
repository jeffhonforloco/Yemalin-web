<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<header class="site-header">
    <div class="container">
        <div class="branding">
            <?php if (has_custom_logo()) : the_custom_logo(); else : ?>
                <a href="<?php echo esc_url(home_url('/')); ?>">
                    <h1><?php bloginfo('name'); ?></h1>
                </a>
            <?php endif; ?>
        </div>
        <button class="menu-toggle"><?php esc_html_e('Menu', 'yemalin'); ?></button>
        <nav class="main-navigation">
            <?php wp_nav_menu(array(
                'theme_location' => 'primary',
                'container'      => false,
                'menu_class'     => 'primary-menu'
            )); ?>
        </nav>
    </div>
</header>
<main class="site-content">