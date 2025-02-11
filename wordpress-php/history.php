<?php
function register_history_post_type() {
    $labels = array(
        'name'               => 'Historia',
        'singular_name'      => 'Historia',
        'menu_name'          => 'Historia',
        'add_new'            => 'Añadir Nueva',
        'add_new_item'       => 'Añadir Nueva Historia',
        'edit_item'          => 'Editar Historia',
        'new_item'           => 'Nueva Historia',
        'view_item'          => 'Ver Historia',
        'search_items'       => 'Buscar Historia',
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
        'rest_base'           => 'historia',
        'query_var'           => false,
        'rewrite'             => false,
        'capability_type'     => 'post',
        'has_archive'         => false,
        'hierarchical'        => false,
        'menu_position'       => 5,
        'menu_icon'           => 'dashicons-backup',
        'supports'            => array('title', 'editor', 'thumbnail'),
    );

    register_post_type('history', $args);
}
add_action('init', 'register_history_post_type');

// Add Meta Box for Year
function add_history_meta_boxes() {
    add_meta_box(
        'history_year',
        'Año',
        'history_year_meta_box_callback',
        'history',
        'side',
        'high'
    );
}
add_action('add_meta_boxes', 'add_history_meta_boxes');

// Meta Box Callback Function
function history_year_meta_box_callback($post) {
    wp_nonce_field('history_year_meta_box', 'history_year_meta_box_nonce');
    $year = get_post_meta($post->ID, '_year', true);
    ?>
    <p>
        <label for="year">Año:</label><br>
        <input type="number" id="year" name="year" value="<?php echo esc_attr($year); ?>" min="1800" max="2100">
    </p>
    <?php
}

// Save Meta Box Data
function save_history_meta_boxes($post_id) {
    if (!isset($_POST['history_year_meta_box_nonce'])) {
        return;
    }

    if (!wp_verify_nonce($_POST['history_year_meta_box_nonce'], 'history_year_meta_box')) {
        return;
    }

    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }

    if (!current_user_can('edit_post', $post_id)) {
        return;
    }

    if (isset($_POST['year'])) {
        update_post_meta($post_id, '_year', intval($_POST['year']));
    }
}
add_action('save_post_history', 'save_history_meta_boxes');

// Make columns sortable in admin
function add_history_columns($columns) {
    $columns['year'] = 'Año';
    return $columns;
}
add_filter('manage_history_posts_columns', 'add_history_columns');

function show_history_columns($column, $post_id) {
    if ($column === 'year') {
        echo get_post_meta($post_id, '_year', true);
    }
}
add_action('manage_history_posts_custom_column', 'show_history_columns', 10, 2);

function make_history_columns_sortable($columns) {
    $columns['year'] = 'year';
    return $columns;
}
add_filter('manage_edit-history_sortable_columns', 'make_history_columns_sortable');

// Add sorting functionality
function history_orderby($query) {
    if (!is_admin() || !$query->is_main_query()) {
        return;
    }

    if ($query->get('post_type') === 'history') {
        if ($query->get('orderby') === 'year') {
            $query->set('meta_key', '_year');
            $query->set('orderby', 'meta_value_num');
        }
    }
}
add_action('pre_get_posts', 'history_orderby');

// Register REST API fields
function register_history_rest_fields() {
    // Register featured image
    register_rest_field('history', 'featured_image_url',
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

    // Register year field
    register_rest_field('history', 'year',
        array(
            'get_callback' => function($object) {
                return intval(get_post_meta($object['id'], '_year', true));
            },
            'schema' => array(
                'description' => 'Año',
                'type'        => 'integer'
            ),
        )
    );
}
add_action('rest_api_init', 'register_history_rest_fields');

// Add REST API support for sorting by year
function add_year_rest_orderby_param() {
    $args = array(
        'year' => array(
            'description' => 'Order by year',
            'type'        => 'string',
        ),
    );
    register_rest_field('history', 'orderby', $args);
}
add_action('rest_api_init', 'add_year_rest_orderby_param');

function modify_history_rest_query($args, $request) {
    if (isset($request['orderby']) && $request['orderby'] === 'year') {
        $args['meta_key'] = '_year';
        $args['orderby'] = 'meta_value_num';
    }
    return $args;
}
add_filter('rest_history_query', 'modify_history_rest_query', 10, 2);