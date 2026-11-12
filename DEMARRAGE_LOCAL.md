# Projet actif — Stitch Café

## Lancer le projet

Depuis la racine du projet :

```powershell
node audit-tools/local-preview.cjs
```

Ou exécuter `lancer-local.ps1`. Le serveur écoute uniquement sur ce PC, au port 8000. Arrêter avec Ctrl+C.

## Interfaces de référence

| Interface | Adresse locale | Source |
|---|---|---|
| Merchant | http://127.0.0.1:8000/isolated_merchant_dashboard/index.html | `isolated_merchant_dashboard/index.html` |
| Caisse intégrée | http://127.0.0.1:8000/isolated_merchant_dashboard/index.html#pos | Onglet du Merchant |
| Cuisine intégrée | http://127.0.0.1:8000/isolated_merchant_dashboard/index.html#kitchen | Onglet du Merchant |
| Menu client | http://127.0.0.1:8000/stitch_caf_menu_table_12/swiggy-style_elite_main_menu_390x2500/index.html | `stitch_caf_menu_table_12/swiggy-style_elite_main_menu_390x2500/index.html` |
| Super administrateur — repéré pour prochaine étape | http://127.0.0.1:8000/stitch_caf_menu_table_12/super_admin_dashboard/index.html | `stitch_caf_menu_table_12/super_admin_dashboard/index.html` |

Le tableau de bord administrateur contient aussi `script.js` et `style.css` dans le même dossier. Il a été localisé, sans refonte à cette étape.

## Anciennes interfaces retirées

Les dossiers `Restaurant-POS-application-main` et `kitchen page` sont conservés dans `_archive/anciennes-interfaces/`. Ils sont retirés de la racine active, exclus du serveur de prévisualisation et ne sont plus lancés sur 3001/3002. Leurs modifications antérieures sont conservées.

## Merchant : modifications du 23 octobre 2026

- Navigation blanche avec un seul onglet actif, identité Stitch et profil plus lisible.
- Cartes, espacements, boutons et panneau de commande harmonisés ; ombres et effets brillants réduits.
- Icônes SVG Lucide locales ; licence dans `isolated_merchant_dashboard/THIRD_PARTY_ICONS_LICENSE.txt`.
- CSS utilitaire compilé dans `assets/utilities.css`, sans CDN Tailwind pour le Merchant.
- Recherche et catégorie combinées, cartes produit accessibles au clavier, indicateur de quantité.
- Chemins d’images rétablis et illustration neutre si une photo manque.
- Une seule modale de personnalisation, suppression des identifiants dupliqués.
- Panier, remise, commandes et statuts restaurés depuis la sauvegarde locale du navigateur.
- Remise appliquée au total d’une commande de démonstration ; cuisine rafraîchie après changement de statut.
- Un échec API laisse le panier en place et affiche une erreur ; il ne fabrique plus un succès de démonstration.
- Accès direct par fragment `#pos`, `#kitchen`, etc.

Sans jeton de connexion, les nouvelles commandes sont des démonstrations locales, explicitement annoncées. Il n’y a aucun paiement réel. La sauvegarde navigateur ne remplace pas une base partagée entre appareils. La sécurité et les opérations financières du backend restent celles identifiées dans le rapport d’audit.

## Modifier les styles

`merchant.css` contient la couche visuelle du Merchant ; `style.css` conserve les styles historiques nécessaires aux autres fonctions. Après modification des classes HTML/JavaScript, recompiler les utilitaires :

```powershell
cd isolated_merchant_dashboard
npm install
npm run build:css
```

Les fichiers compilés sont livrés ; aucune installation npm n’est nécessaire pour la prévisualisation. Le générateur de QR utilise encore QRCode.js depuis son CDN.

## Vérifications effectuées

- Contrôles de syntaxe JavaScript et compilation Tailwind : réussis.
- Merchant, CSS, icônes et interface administrateur : réponses HTTP 200.
- Anciens chemins d’applications : HTTP 404 ; dossier d’archive bloqué en HTTP 403.
- Catalogue : 57 chemins d’images présents ; image neutre prévue pour les fichiers non affichables.
- DOM : aucun identifiant dupliqué détecté, SVG locaux affichés.
- Navigateur : ajout au panier, restauration après actualisation, recherche + catégorie, modale et fermeture par Échap vérifiés.
- Commande de démonstration : 12,50 DH moins 10 % = 11,25 DH, visible en cuisine ; passage à « Preparing » immédiatement affiché et conservé au rechargement.
- Mise en page : absence de débordement horizontal du document sur les vues vérifiées à 320, 390, 1024 et 1366 px. Ces contrôles ne constituent pas un audit complet d’accessibilité.
- Console du Merchant pendant les derniers essais : aucune erreur JavaScript relevée.

Les graphiques et indicateurs commerciaux historiques restent des exemples de démonstration. Les prix, libellés et correspondances exactes des photos du catalogue doivent encore être validés avant exploitation.

## Ajustements du parcours de prise de commande

- Chaque produit ouvre désormais la personnalisation avant ajout : options de sa catégorie, table et instructions. Un produit sans options supplémentaires conserve les champs table et instructions, sans afficher des options café sans rapport.
- Le bouton « Expand », à droite de la recherche, masque le titre et la navigation pour agrandir le catalogue tout en conservant le panier. « Restore » ou Échap rétablit la disposition ; Échap dans une modale ferme seulement celle-ci.
- Bordures renforcées, surfaces contrastées et ombres superposées distinguent le catalogue, le panier, les cartes produit et les tickets cuisine.
- Vérifications navigateur : popups brunch, pain, pâtisserie, thé et café ; expansion/restauration ; conservation du mode étendu après fermeture de la popup. Aucun article ajouté ni commande envoyée pendant ces vérifications.
