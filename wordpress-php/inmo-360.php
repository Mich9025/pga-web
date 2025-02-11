<?php
function register_inmo360_post_type() {
    $labels = array(
        'name'               => 'Inmo 360',
        'singular_name'      => 'Inmo 360',
        'menu_name'          => 'Inmo 360',
        'add_new'            => 'Añadir Nuevo',
        'add_new_item'       => 'Añadir Nuevo Inmo 360',
        'edit_item'          => 'Editar Inmo 360',
        'new_item'           => 'Nuevo Inmo 360',
        'view_item'          => 'Ver Inmo 360',
        'search_items'       => 'Buscar Inmo 360',
        'not_found'          => 'No se encontraron entradas',
        'not_found_in_trash' => 'No se encontraron entradas en la papelera',
    );

    $args = array(
        'labels'              => $labels,
        'public'              => false,
        'publicly_queryable'  => false,
        'show_ui'             => true,
        'show_in_menu'        => true,
        'show_in_rest'        => true, // Enable Gutenberg editor
        'rest_base'           => 'inmo-360',
        'query_var'           => false,
        'rewrite'             => false,
        'capability_type'     => 'post',
        'has_archive'         => false,
        'hierarchical'        => false,
        'menu_position'       => 5,
        'menu_icon'           => 'dashicons-admin-multisite',
        'supports'            => array('title', 'editor', 'thumbnail'),
    );

    register_post_type('inmo360', $args);
}
add_action('init', 'register_inmo360_post_type');

// Add Meta Box for Icon
function add_inmo360_meta_boxes() {
    add_meta_box(
        'inmo360_icon',
        'Icono',
        'inmo360_icon_meta_box_callback',
        'inmo360',
        'side',
        'default'
    );
}
add_action('add_meta_boxes', 'add_inmo360_meta_boxes');

// Meta Box Callback Function
function inmo360_icon_meta_box_callback($post) {
    wp_nonce_field('inmo360_icon_meta_box', 'inmo360_icon_meta_box_nonce');
    $icon = get_post_meta($post->ID, '_icon', true);
    ?>
    <p>
        <label for="icon">Icono:</label><br>
        <input type="text" id="icon" name="icon" value="<?php echo esc_attr($icon); ?>" size="25">
    </p>
    <?php
}

// Save Meta Box Data
function save_inmo360_meta_boxes($post_id) {
    if (!isset($_POST['inmo360_icon_meta_box_nonce'])) {
        return;
    }

    if (!wp_verify_nonce($_POST['inmo360_icon_meta_box_nonce'], 'inmo360_icon_meta_box')) {
        return;
    }

    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }

    if (!current_user_can('edit_post', $post_id)) {
        return;
    }

    if (isset($_POST['icon'])) {
        update_post_meta($post_id, '_icon', sanitize_text_field($_POST['icon']));
    }
}
add_action('save_post_inmo360', 'save_inmo360_meta_boxes');

// Register REST API fields
function register_inmo360_rest_fields() {
    // Register featured image
    register_rest_field('inmo360', 'featured_image_url',
        array(
            'get_callback' => function($object) {
                if (has_post_thumbnail($object['id'])) {
                    $img = wp_get_attachment_image_src(get_post_thumbnail_id($object['id']), 'full');
                    return $img[0];
                }
                return null;
            },
            'schema' => array(
                'description' => 'URL de la imagen destacada',
                'type'        => 'string'
            ),
        )
    );

    // Register icon field
    register_rest_field('inmo360', 'icon',
        array(
            'get_callback' => function($object) {
                return get_post_meta($object['id'], '_icon', true);
            },
            'schema' => array(
                'description' => 'Icono',
                'type'        => 'string'
            ),
        )
    );
}
add_action('rest_api_init', 'register_inmo360_rest_fields');