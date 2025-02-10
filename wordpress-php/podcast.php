<?php
function register_podcast_post_type() {
    $labels = array(
        'name'               => 'Podcast',
        'singular_name'      => 'Podcast',
        'menu_name'          => 'Podcast',
        'add_new'            => 'Añadir Nuevo',
        'add_new_item'       => 'Añadir Nuevo Podcast',
        'edit_item'          => 'Editar Podcast',
        'new_item'           => 'Nuevo Podcast',
        'view_item'          => 'Ver Podcast',
        'search_items'       => 'Buscar Podcasts',
        'not_found'          => 'No se encontraron podcasts',
        'not_found_in_trash' => 'No se encontraron podcasts en la papelera',
    );

    $args = array(
        'labels'              => $labels,
        'public'              => false,
        'publicly_queryable'  => false,
        'show_ui'             => true,
        'show_in_menu'        => true,
        'show_in_rest'        => true, // Enable REST API support
        'rest_base'           => 'podcast',
        'query_var'           => false,
        'rewrite'             => false,
        'capability_type'     => 'post',
        'has_archive'         => false,
        'hierarchical'        => false,
        'menu_position'       => 5,
        'menu_icon'           => 'dashicons-microphone',
        'supports'            => array('title', 'thumbnail'),
    );

    register_post_type('podcast', $args);
}
add_action('init', 'register_podcast_post_type');

// Add Meta Box for URLs
function add_podcast_meta_boxes() {
    add_meta_box(
        'podcast_urls',
        'URLs del Podcast',
        'podcast_urls_meta_box_callback',
        'podcast',
        'normal',
        'high'
    );
}
add_action('add_meta_boxes', 'add_podcast_meta_boxes');

// Meta Box Callback Function
function podcast_urls_meta_box_callback($post) {
    wp_nonce_field('podcast_urls_meta_box', 'podcast_urls_meta_box_nonce');

    $youtube_url = get_post_meta($post->ID, '_youtube_url', true);
    $spotify_url = get_post_meta($post->ID, '_spotify_url', true);
    ?>
    <p>
        <label for="youtube_url">URL de YouTube:</label><br>
        <input type="url" id="youtube_url" name="youtube_url" value="<?php echo esc_attr($youtube_url); ?>" size="60">
    </p>
    <p>
        <label for="spotify_url">URL de Spotify:</label><br>
        <input type="url" id="spotify_url" name="spotify_url" value="<?php echo esc_attr($spotify_url); ?>" size="60">
    </p>
    <?php
}

// Save Meta Box Data
function save_podcast_meta_boxes($post_id) {
    if (!isset($_POST['podcast_urls_meta_box_nonce'])) {
        return;
    }

    if (!wp_verify_nonce($_POST['podcast_urls_meta_box_nonce'], 'podcast_urls_meta_box')) {
        return;
    }

    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }

    if (!current_user_can('edit_post', $post_id)) {
        return;
    }

    if (isset($_POST['youtube_url'])) {
        update_post_meta($post_id, '_youtube_url', sanitize_url($_POST['youtube_url']));
    }

    if (isset($_POST['spotify_url'])) {
        update_post_meta($post_id, '_spotify_url', sanitize_url($_POST['spotify_url']));
    }
}
add_action('save_post_podcast', 'save_podcast_meta_boxes');

// Register REST API fields
function register_podcast_rest_fields() {
    register_rest_field('podcast', 'featured_image_url',
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

    register_rest_field('podcast', 'youtube_url',
        array(
            'get_callback' => function($object) {
                return get_post_meta($object['id'], '_youtube_url', true);
            },
            'schema' => array(
                'description' => 'URL de YouTube',
                'type'        => 'string'
            ),
        )
    );

    register_rest_field('podcast', 'spotify_url',
        array(
            'get_callback' => function($object) {
                return get_post_meta($object['id'], '_spotify_url', true);
            },
            'schema' => array(
                'description' => 'URL de Spotify',
                'type'        => 'string'
            ),
        )
    );
}
add_action('rest_api_init', 'register_podcast_rest_fields');