<?php
function register_social_profiles_post_type() {
    $labels = array(
        'name'               => 'Redes Sociales',
        'singular_name'      => 'Red Social',
        'menu_name'          => 'Redes Sociales',
        'add_new'            => 'Añadir Nueva',
        'add_new_item'       => 'Añadir Nueva Red Social',
        'edit_item'          => 'Editar Red Social',
        'new_item'           => 'Nueva Red Social',
        'view_item'          => 'Ver Red Social',
        'search_items'       => 'Buscar Redes Sociales',
        'not_found'          => 'No se encontraron redes sociales',
        'not_found_in_trash' => 'No se encontraron redes sociales en la papelera',
    );

    $args = array(
        'labels'              => $labels,
        'public'              => false,
        'publicly_queryable'  => false,
        'show_ui'             => true,
        'show_in_menu'        => true,
        'show_in_rest'        => true, // Enable REST API support
        'rest_base'           => 'redes-sociales',
        'query_var'           => false,
        'rewrite'             => false,
        'capability_type'     => 'post',
        'has_archive'         => false,
        'hierarchical'        => false,
        'menu_position'       => 5,
        'menu_icon'           => 'dashicons-share',
        'supports'            => array('title'),
    );

    register_post_type('social_profile', $args);
}
add_action('init', 'register_social_profiles_post_type');

// Add Meta Box for Social Profile Details
function add_social_profile_meta_boxes() {
    add_meta_box(
        'social_profile_details',
        'Detalles de Red Social',
        'social_profile_meta_box_callback',
        'social_profile',
        'normal',
        'high'
    );
}
add_action('add_meta_boxes', 'add_social_profile_meta_boxes');

// Meta Box Callback Function
function social_profile_meta_box_callback($post) {
    wp_nonce_field('social_profile_meta_box', 'social_profile_meta_box_nonce');

    $profile_url = get_post_meta($post->ID, '_profile_url', true);
    $handler = get_post_meta($post->ID, '_handler', true);
    ?>
    <p>
        <label for="profile_url">URL del Perfil:</label><br>
        <input type="url" id="profile_url" name="profile_url" value="<?php echo esc_attr($profile_url); ?>" size="60">
    </p>
    <p>
        <label for="handler">Usuario:</label><br>
        <input type="text" id="handler" name="handler" value="<?php echo esc_attr($handler); ?>" size="30">
    </p>
    <?php
}

// Save Meta Box Data
function save_social_profile_meta_boxes($post_id) {
    if (!isset($_POST['social_profile_meta_box_nonce'])) {
        return;
    }

    if (!wp_verify_nonce($_POST['social_profile_meta_box_nonce'], 'social_profile_meta_box')) {
        return;
    }

    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }

    if (!current_user_can('edit_post', $post_id)) {
        return;
    }

    if (isset($_POST['profile_url'])) {
        update_post_meta($post_id, '_profile_url', sanitize_url($_POST['profile_url']));
    }

    if (isset($_POST['handler'])) {
        update_post_meta($post_id, '_handler', sanitize_text_field($_POST['handler']));
    }
}
add_action('save_post_social_profile', 'save_social_profile_meta_boxes');

// Register REST API fields
function register_social_profile_rest_fields() {
    register_rest_field('social_profile', 'profile_url',
        array(
            'get_callback' => function($object) {
                return get_post_meta($object['id'], '_profile_url', true);
            },
            'schema' => array(
                'description' => 'URL del perfil social',
                'type'        => 'string'
            ),
        )
    );

    register_rest_field('social_profile', 'handler',
        array(
            'get_callback' => function($object) {
                return get_post_meta($object['id'], '_handler', true);
            },
            'schema' => array(
                'description' => 'Usuario de la red social',
                'type'        => 'string'
            ),
        )
    );
}
add_action('rest_api_init', 'register_social_profile_rest_fields');