<?php
function register_clients_post_type() {
    $labels = array(
        'name'               => 'Clientes',
        'singular_name'      => 'Cliente',
        'menu_name'          => 'Clientes',
        'add_new'            => 'Añadir Nuevo',
        'add_new_item'       => 'Añadir Nuevo Cliente',
        'edit_item'          => 'Editar Cliente',
        'new_item'           => 'Nuevo Cliente',
        'view_item'          => 'Ver Cliente',
        'search_items'       => 'Buscar Clientes',
        'not_found'          => 'No se encontraron clientes',
        'not_found_in_trash' => 'No se encontraron clientes en la papelera',
    );

    $args = array(
        'labels'              => $labels,
        'public'              => false,
        'publicly_queryable'  => false,
        'show_ui'             => true,
        'show_in_menu'        => true,
        'show_in_rest'        => true, // Enable REST API support
        'rest_base'           => 'clientes',
        'query_var'           => false,
        'rewrite'             => false,
        'capability_type'     => 'post',
        'has_archive'         => false,
        'hierarchical'        => false,
        'menu_position'       => 5,
        'menu_icon'           => 'dashicons-groups',
        'supports'            => array('title', 'thumbnail'),
    );

    register_post_type('clients', $args);
}
add_action('init', 'register_clients_post_type');

// Register featured image in REST API
function register_clients_featured_image() {
    register_rest_field('clients', 'featured_image_url',
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
}
add_action('rest_api_init', 'register_clients_featured_image');