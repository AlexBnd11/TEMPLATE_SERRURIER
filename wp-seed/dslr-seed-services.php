<?php
/**
 * Plugin Name: DSLR — Import des services
 * Description: Crée les 6 services par défaut dans le CPT service_item. À supprimer après usage.
 * Version: 1.0
 */

if (!defined('ABSPATH')) exit;

add_action('admin_menu', function () {
    add_management_page(
        'Import services DSLR',
        '🔧 Import services DSLR',
        'manage_options',
        'dslr-seed-services',
        'dslr_seed_services_page'
    );
});

function dslr_seed_services_page() {
    if (!current_user_can('manage_options')) return;

    $done = get_option('dslr_seed_services_done', false);

    echo '<div class="wrap"><h1>Import des services — DSLR</h1>';

    if ($done) {
        echo '<div class="notice notice-success"><p><strong>✅ Import déjà effectué.</strong> Vous pouvez supprimer ce plugin.</p></div>';
        echo '</div>';
        return;
    }

    if (isset($_POST['dslr_run_services']) && check_admin_referer('dslr_services_action')) {
        $results = dslr_import_services();
        echo '<div class="notice notice-success"><p><strong>✅ Terminé !</strong></p><ul style="list-style:disc;margin-left:2em">';
        foreach ($results as $line) {
            echo '<li>' . esc_html($line) . '</li>';
        }
        echo '</ul></div>';
        echo '<p>Vous pouvez maintenant <strong>supprimer ce plugin</strong>.</p>';
        echo '</div>';
        return;
    }

    echo '<p>Ce script crée les <strong>6 services</strong> suivants dans le CPT <code>service_item</code> :</p>';
    echo '<ul style="list-style:disc;margin-left:2em">';
    echo '<li>Ouverture de porte</li>';
    echo '<li>Serrure bloquée, perdue ou cassée</li>';
    echo '<li>Remplacement et pose de serrures</li>';
    echo '<li>Renforcement anti-effraction</li>';
    echo '<li>Dépannage après tentative d\'effraction</li>';
    echo '<li>Aide à la déclaration assurance</li>';
    echo '</ul>';
    echo '<p>Les services déjà existants (même titre) sont ignorés. Le script peut être relancé sans risque.</p>';
    echo '<form method="post">';
    wp_nonce_field('dslr_services_action');
    echo '<button type="submit" name="dslr_run_services" class="button button-primary button-large">Importer les services</button>';
    echo '</form></div>';
}

function dslr_import_services(): array {
    $log = [];

    $services = [
        [
            'order' => 1,
            'title' => 'Ouverture de porte',
            'acf'   => [
                'description_courte' => "Intervention rapide pour porte claquée ou clé perdue, sans abîmer votre serrure.",
                'prix'               => "À partir de 90 € TTC en journée (hors majoration nuit & jours fériés)",
            ],
        ],
        [
            'order' => 2,
            'title' => 'Serrure bloquée, perdue ou cassée',
            'acf'   => [
                'description_courte' => "Diagnostic précis et remise en service de votre serrure sans changement inutile de matériel.",
                'prix'               => "À partir de 110 € TTC en journée (hors pièces éventuelles)",
            ],
        ],
        [
            'order' => 3,
            'title' => 'Remplacement et pose de serrures',
            'acf'   => [
                'description_courte' => "Cylindres et serrures toutes marques, adaptés à votre budget et à votre niveau de sécurité.",
                'prix'               => "À partir de 150 € TTC pose comprise (hors matériel haute sécurité)",
            ],
        ],
        [
            'order' => 4,
            'title' => 'Renforcement anti-effraction',
            'acf'   => [
                'description_courte' => "Solution globale pour retarder une tentative d'effraction et dissuader les cambrioleurs.",
                'prix'               => "Devis personnalisé après visite sur place",
            ],
        ],
        [
            'order' => 5,
            'title' => "Dépannage après tentative d'effraction",
            'acf'   => [
                'description_courte' => "Mise en sécurité immédiate de votre logement après cambriolage ou tentative.",
                'prix'               => "Sur devis, selon dégâts constatés et matériel à remplacer",
            ],
        ],
        [
            'order' => 6,
            'title' => 'Aide à la déclaration assurance',
            'acf'   => [
                'description_courte' => "Accompagnement complet pour vos démarches assurance après sinistre ou tentative d'effraction.",
                'prix'               => "Inclus avec les interventions concernées",
            ],
        ],
    ];

    foreach ($services as $service) {
        $existing = get_posts([
            'post_type'   => 'service_item',
            'title'       => $service['title'],
            'post_status' => 'publish',
            'numberposts' => 1,
            'fields'      => 'ids',
        ]);

        if (!empty($existing)) {
            $log[] = "— Ignoré (déjà existant) : " . $service['title'];
            continue;
        }

        $id = wp_insert_post([
            'post_title'  => $service['title'],
            'post_status' => 'publish',
            'post_type'   => 'service_item',
            'menu_order'  => $service['order'],
        ], true);

        if (is_wp_error($id)) {
            $log[] = "✘ Erreur : " . $service['title'] . ' — ' . $id->get_error_message();
            continue;
        }

        if (function_exists('update_field')) {
            foreach ($service['acf'] as $key => $value) {
                update_field($key, $value, $id);
            }
        } else {
            foreach ($service['acf'] as $key => $value) {
                update_post_meta($id, $key, $value);
            }
        }

        $log[] = "✔ Créé : " . $service['title'];
    }

    update_option('dslr_seed_services_done', true);

    return $log;
}
