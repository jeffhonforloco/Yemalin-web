<?php
function yemalin_custom_admin_menu() {
    remove_menu_page('edit-comments.php');
    add_menu_page(
        'Yemalin Settings',
        'Yemalin',
        'manage_options',
        'yemalin-settings',
        'yemalin_settings_page'
    );
}
add_action('admin_menu', 'yemalin_custom_admin_menu');

function yemalin_settings_page() {
    ?>
    <div class="wrap">
        <h1><?php esc_html_e('Yemalin Theme Settings', 'yemalin'); ?></h1>
        <form method="post" action="options.php">
            <?php
            settings_fields('yemalin-settings-group');
            do_settings_sections('yemalin-settings');
            submit_button();
            ?>
        </form>
    </div>
    <?php
}

function yemalin_custom_admin_bar($wp_admin_bar) {
    $wp_admin_bar->remove_node('wp-logo');
    $wp_admin_bar->add_node(array(
        'id'    => 'yemalin-support',
        'title' => __('Support', 'yemalin'),
        'href'  => 'mailto:support@yemalin.com',
    ));
}
add_action('admin_bar_menu', 'yemalin_custom_admin_bar', 999);
