</main>
<footer class="site-footer">
    <div class="container">
        <div class="footer-widgets">
            <?php if (is_active_sidebar('footer-1')) : dynamic_sidebar('footer-1'); endif; ?>
        </div>
        <nav class="footer-navigation">
            <?php wp_nav_menu(array(
                'theme_location' => 'footer',
                'container'      => false,
                'menu_class'     => 'footer-menu'
            )); ?>
        </nav>
        <div class="site-info">
            <p>&copy; <?php echo date('Y'); ?> <?php bloginfo('name'); ?></p>
        </div>
    </div>
</footer>
<?php wp_footer(); ?>
</body>
</html>