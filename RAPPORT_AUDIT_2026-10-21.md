# Audit du projet Stitch Café

> Mise à jour du 23 octobre 2026 : les deux variantes Next.js ont été retirées du projet actif et conservées dans `_archive/anciennes-interfaces/`. Le Merchant a depuis reçu une refonte visuelle et plusieurs corrections locales. Voir `DEMARRAGE_LOCAL.md` pour les liens actuels, les changements et les vérifications. Les constats ci-dessous décrivent l’état audité le 21 octobre ; les points corrigés depuis ne doivent pas être considérés comme toujours présents.

Date : 21 octobre 2026. Analyse du dépôt local, tests HTTP sur simulateur isolé, contrôle TypeScript et observation du menu et de la caisse dans le navigateur.

> **Précision de périmètre après échange avec l’utilisateur :** l’interface commerçant réellement utilisée est `isolated_merchant_dashboard/index.html`. Elle a été examinée ensuite dans le navigateur et le code. Elle regroupe caisse, cuisine, commandes, catalogue, QR et réservations. Elle doit être la référence principale pour la suite du projet. Les deux applications Next.js examinées ci-dessous sont des variantes secondaires. Les limites des applications Next ne doivent pas être attribuées automatiquement à ce tableau de bord. Voir le complément final.

## 1. Mon avis général

Le projet porte une idée cohérente : relier le menu QR du client, la prise de commande, la cuisine et la gestion du café. Le travail visuel et la couverture des écrans constituent une base intéressante. En revanche, le dépôt est encore un assemblage de prototypes et de démonstrations, avec plusieurs sources de données indépendantes. Il ne faut pas encore le considérer comme une caisse opérationnelle ou un SaaS prêt à commercialiser.

Le meilleur investissement maintenant est de fiabiliser un parcours complet : scanner une table, choisir un produit, envoyer une commande persistante, la voir en cuisine puis l’encaisser. Ajouter davantage de pages avant cette intégration augmenterait la maintenance sans résoudre le problème principal.

Cette analyse ne constitue pas une certification de sécurité. Les constats ci-dessous distinguent les reproductions locales, les défauts établis par lecture du code et les points restant à mesurer.

## 2. Architecture et maturité

| Bloc | Technologie et état constaté | Conséquence |
|---|---|---|
| Menu client | HTML/CSS/JavaScript dans `stitch_caf_menu_table_12` | Nombreux écrans, catalogue local, logique dispersée |
| API | Express, JWT, PostgreSQL, repli en mémoire | Base de backend existante, mais sécurité et transactions à reprendre |
| Caisse | Next.js 15, React 19, composants Radix/Tailwind | Navigation et interactions de démonstration ; commandes non reliées à l’API |
| Cuisine | Next.js 16, React 19 | Commandes initialisées dans `SAMPLE_ORDERS`, modifications en mémoire React |
| Administration | Plusieurs dashboards statiques et dossiers isolés | Références concurrentes et identité visuelle fragmentée |
| Outils | Nombreux scripts de restauration et de remplacement | Difficile de distinguer le code produit des outils historiques |

Points positifs : requêtes SQL généralement paramétrées, hachage bcrypt dans le parcours PostgreSQL, rôles API explicites, composants réutilisables côté React, images et catégories déjà préparées, mécanisme de traduction existant. Ces éléments sont à conserver après correction.

## 3. Sécurité : défauts prioritaires

### S1 — Critique : connexion API sans validation du mot de passe

Preuve : `api/server.js`, route `/api/v1/auth/login`. Après une tentative PostgreSQL non concluante, le code recherche l’adresse dans `MEMORY_DB.users` et signe directement un JWT. Aucun contrôle du mot de passe dans cette branche. Elle reste accessible même si une base réelle est configurée.

Reproduction locale : le compte manager avec un mot de passe volontairement incorrect reçoit HTTP 200 et un JWT valide. Le même mécanisme concerne les autres comptes de démonstration, dont le super administrateur. Le rapport de test masque le jeton.

Correction : séparer explicitement démonstration et production ; refuser toute authentification après échec du mot de passe ; interdire les comptes de démonstration en production. Ajouter des tests garantissant un 401 pour un mauvais mot de passe et un 403 pour un rôle interdit.

### S2 — Élevée : validation TLS désactivée globalement

`api/server.js` fixe `NODE_TLS_REJECT_UNAUTHORIZED` à `0` et configure par défaut PostgreSQL avec `rejectUnauthorized: false`. La vérification d’identité du serveur distant est ainsi affaiblie. Supprimer la désactivation globale et configurer les autorités de certification adaptées au fournisseur de base.

### S3 — Élevée : secret JWT de secours et comptes de démonstration

La valeur de secours `dev_secret` permettrait de signer des jetons si la variable d’environnement n’est pas définie. Le démarrage crée également des comptes à mot de passe connu dans PostgreSQL. Exiger un secret robuste au démarrage hors démonstration et rendre le peuplement de démonstration volontaire et distinct des migrations.

### S4 — Élevée : séparation entre établissements incomplète

Le menu public lit tous les produits disponibles sans filtrer un établissement. La création d’une commande lit le prix par identifiant de produit sans vérifier son `tenant_id` ni sa disponibilité. La suppression en mémoire d’un produit ne vérifie pas son établissement. Ces défauts sont établis par lecture du code ; un scénario complet à deux établissements reste à tester.

Correction : transmettre un identifiant public d’établissement, le résoudre côté serveur et filtrer chaque lecture/écriture. Tester systématiquement un accès croisé entre deux établissements.

### S5 — Élevée : suspension et révocation incomplètes

Le middleware vérifie la signature JWT sans relire l’état actif de l’utilisateur ou de son établissement. La route de connexion ne filtre pas `t.is_active`. Le logout renvoie un succès sans invalider le jeton. Une suspension peut donc ne pas couper l’accès attendu. Définir une politique de révocation et vérifier les états serveur.

### S6 — Moyenne : serveur statique historique trop permissif

`simple_server.js` concatène directement l’URL avec un chemin relatif, sans vérifier que le résultat reste dans le dossier public, et écoute sans adresse locale explicite. Risques de lecture hors périmètre et de publication de fichiers internes si ce serveur est réutilisé. Pour cet audit, un serveur distinct limite l’accès à `127.0.0.1`, bloque les chemins cachés et ne sert que des extensions prévues.

### S7 — À durcir : CORS, tentatives de connexion et HTML dynamique

CORS accepte toutes les origines par défaut. Aucun mécanisme de limitation des tentatives n’est visible dans le serveur examiné. Des chaînes sont injectées avec `innerHTML` dans le menu et les dashboards : risque XSS à évaluer lorsque des données saisies ou issues d’une API alimenteront ces zones. Aucun exploit XSS complet n’a été reproduit. Utiliser du texte échappé ou des composants, une politique CSP adaptée et une liste d’origines explicite.

## 4. Bugs métier et intégrité des données

| Priorité | Constat et preuve | Impact / correction |
|---|---|---|
| P0 | Création SQL : insertion des `order_items` avant leur commande parente, dans `api/server.js` | La clé étrangère immédiate rejette une commande non vide avec le schéma fourni. Créer la commande avant ses lignes |
| P0 | Transactions effectuées avec `pool.query('BEGIN')`, puis plusieurs `pool.query` | Les requêtes ne sont pas garanties sur la même connexion. Utiliser `pool.connect()`, un client unique, rollback et release |
| P0 | Une erreur SQL peut retomber dans un succès en mémoire | Le client croit à une sauvegarde persistante. Retourner une erreur ; aucun repli automatique pour une écriture métier |
| P0 | Quantité `-2` acceptée : total `-7` ; produit inconnu et liste vide acceptés avec total `0` | Reproduit en simulateur. Valider tableau non vide, identifiants, disponibilité et quantités entières strictement positives |
| P0 | Création d’une commande directement en état `PAID` | Confond création, préparation et paiement. Créer en attente et payer par une opération dédiée |
| P0 | Paiement : montant libre, contrôles hors transaction, tous les types génèrent `CASH_IN` | Risques d’encaissement incomplet, de doublons et de caisse fausse. Verrouillage, idempotence, contrôle de solde, distinction espèces/carte |
| P1 | `DB_READY=true` alors que `pool=null` | `/me` et caisse courante répondent 500 en simulation ; `/ready` annonce pourtant `db:true`. Reproduit |
| P1 | `seedDemo()` insère de nouveaux UUID de produits à chaque démarrage sans unicité métier | Catalogue susceptible de grossir de doublons. Seed idempotent avec clés stables |
| P1 | Fermeture de caisse et ouverture sans verrou/contrainte d’unicité des sessions ouvertes | Résultats incohérents possibles en concurrence. Contraintes et tests simultanés requis |
| P1 | Suppression d’établissement ne traite pas toutes les références des paiements et sessions | Peut échouer à cause des clés étrangères. Préférer désactivation/archivage et politique de conservation explicite |

Les erreurs SQL sont ici fondées sur le code et le schéma livré. Aucune écriture n’a été envoyée à une base distante pour les reproduire.

## 5. Frontend : fonctionnement et qualité

Le menu principal charge `../central_store.js`, absent du dépôt et renvoyant 404 localement. La fonction active d’envoi attend `window.CentralStore` : ce parcours peut donc afficher « Ordering system offline ». Créer un magasin local isolé ne suffirait pas à synchroniser un téléphone client et un écran cuisine ; il faut une API et une persistance partagées.

La connexion HTML stocke un faux jeton `demo_token_12345`, incompatible avec la vérification JWT de l’API. Elle redirige le manager vers `../dashbord insight page/index.html`, dossier absent à cet emplacement. La connexion Next.js accepte simplement des champs remplis et redirige vers l’accueil. Ce sont des simulations, pas une protection d’accès.

Dans la caisse, `handlePlaceOrder()` génère un numéro aléatoire et ouvre un état de succès sans création serveur. La page paiement utilise un sous-total fixe de 38,50 et `setIsPaid(true)` comme action finale. La cuisine initialise ses commandes depuis une constante et ne les persiste pas. Les modifications ne constituent pas un flux intégré entre appareils.

Autres incohérences : devises DH, euros et dollars selon les écrans ; taxe de 10 % dans le menu et de 8 % dans la caisse ; catalogue différent entre API, menu HTML et caisse. Ces taux sont des valeurs du prototype, pas une validation fiscale. Prix, taxes, options et devises doivent venir d’une configuration serveur unique.

Le catalogue comporte aussi des correspondances trompeuses : une omelette utilise une image nommée `Salade Cesar.jpg`, et `Orange Chesse Cake` a une description de steak et œufs dans `menu.js`. Les traductions peuvent encore changer les noms affichés. Faire valider chaque fiche : nom, photo, composition, options et information allergènes.

Le menu principal mélange plusieurs définitions et affectations de `placeOrder`. Une ancienne branche supprime `cart` alors que la clé habituelle est `stitch_cart`. Même si cette branche est remplacée dans le parcours courant, cette duplication rend les régressions probables. Conserver une seule implémentation et un contrat de panier documenté.

Architecture recommandée : applications clairement délimitées pour client, caisse et cuisine ; types métier partagés ; client API centralisé ; configuration d’environnement ; composants `ProductCard`, panier, sélecteur d’options et états de commande. Garder les mises en page spécifiques à chaque usage sans recopier les règles de prix et de paiement.

## 6. Mon avis UI et design

### Ce qui mérite d’être conservé

La direction café, les photos généreuses, les catégories visuelles et les accents chauds peuvent rendre le menu accueillant. Les sections de catégories se comprennent rapidement. Les composants de caisse prévoient une séparation entre navigation, catalogue et commande. C’est une base exploitable pour une identité plus cohérente.

### Ce que j’ai réellement observé

Dans le navigateur local, au format étroit, plusieurs icônes apparaissent sous forme de mots : `location_on`, `search`, `local_dining`, `shopping_cart`, etc. Ces textes débordent et se superposent à la recherche ou à la navigation. La cause exacte du non-chargement de la police n’est pas certifiée ; la dépendance aux polices externes est visible dans le code. Des SVG locaux apporteraient un affichage stable.

Le header réunit photo de fond, localisation, avatar, titre, recherche, micro et modes de service dans peu d’espace. Les catégories du menu sont plus lisibles que ce premier écran. Je réduirais le header à l’établissement/table, la recherche et le choix sur place/à emporter, avec une seule zone promotionnelle.

La barre fixe du bas est encombrée dans le rendu observé. Il faut des icônes fiables, des libellés courts et une marge de sécurité pour le contenu. Les bandes de promotions et de « subscription packs » sont répétées de nombreuses fois dans le DOM du catalogue. Elles allongent fortement la page et détournent l’attention de la commande.

La première ouverture de la caisse a affiché un rendu sans utilitaires Tailwind, avec une image prenant l’essentiel de l’écran. Les fichiers de configuration PostCSS et Tailwind étaient absents du dossier de cette application. Ils ont été ajoutés pour rétablir la compilation des styles ; voir le bilan de vérification final pour les limites du contrôle visuel.

### Direction recommandée

1. Une marque constante : Stitch Café apparaît côté client, Kans Resto côté caisse. Choisir la marque produit et afficher séparément le nom de l’établissement.
2. Deux usages visuels : menu client chaleureux et photographique ; caisse/cuisine sobres, denses et rapides. Partager couleurs, typographie et statuts.
3. Une action principale par contexte : ajouter, valider la commande, envoyer en préparation ou encaisser. Les animations et promotions restent secondaires.
4. Un panneau de commande stable sur tablette, avec table, quantités, options, total et bouton principal toujours retrouvables. Sur téléphone, ouvrir un panier plein écran ou une feuille adaptée.
5. Une échelle typographique lisible : corps autour de 14–16 px comme point de départ ; réserver les très petits textes aux informations réellement secondaires. Les classes de 10–12 px présentes doivent être revues sur appareil.
6. Des cartes produit uniformes : ratio de photo constant, nom, description courte, prix et bouton. Ne pas remplacer une photo manquante par un plat sans rapport.
7. Des états complets : chargement, vide, rupture, erreur réseau, confirmation reçue du serveur et reprise après échec. Un simple message de succès visuel ne suffit pas.
8. Des animations discrètes : supprimer les secousses promotionnelles répétées et respecter la préférence de réduction des mouvements.

### Accessibilité et mobile

Remplacer les `div` cliquables par des liens ou boutons sémantiques ; donner des noms accessibles aux boutons à icône ; vérifier le focus et le clavier ; gérer le focus des modales ; annoncer les mises à jour du panier. Actualiser `lang` et le sens RTL selon la langue. Le document principal reste `lang="en"` alors que du français est affiché.

Tester 320, 390, 768, 1024 et 1440 px, zoom 200 %, clavier mobile ouvert, nom de produit long et panier de 20 articles. Les contrastes, la navigation clavier complète et ces cinq largeurs n’ont pas été certifiés pendant cet audit. Aucun score Lighthouse ou Core Web Vitals n’est inventé.

## 7. Performance, maintenance et tests

Le menu utilise Tailwind par CDN, des polices Google et beaucoup de contenu dynamique. Cela ajoute des dépendances réseau et complique un fonctionnement en connexion faible. Compiler les styles, servir les icônes localement et optimiser les images sont prioritaires. Employer AVIF/WebP avec dimensions et tailles adaptées, chargement différé sous la ligne de flottaison et une seule image principale prioritaire.

Le contrôle syntaxique des 89 fichiers JavaScript du périmètre menu n’a trouvé aucune erreur de syntaxe. Cela ne garantit pas l’absence d’erreurs à l’exécution. Le scanner a examiné 70 fichiers HTML et signalé 24 références locales absentes : la plupart concernent `old_index.html` ou `code.html`. Une seule référence signalée est dans l’`index.html` actif du menu : `central_store.js`. Le contrôle est limité aux attributs HTML, pas aux URLs générées en JavaScript ou aux images CSS ; les chemins absolus doivent être réinterprétés selon la racine de déploiement.

Après correction de l’alias `@/*`, le contrôle TypeScript de la caisse signale encore 8 diagnostics : propriété `item` manquante dans le formulaire de menu, API `IconLeft` du calendrier et typage du composant sidebar. Les deux applications autorisent `ignoreBuildErrors:true`, ce qui masque ces problèmes lors du build. Le contrôle TypeScript de la cuisine n’a pas signalé de diagnostic.

Les scripts `lint` invoquent ESLint, absent des dépendances déclarées de ces deux projets ; aucune configuration ESLint n’a été trouvée dans le périmètre examiné. Installer et configurer une chaîne cohérente puis rendre le contrôle obligatoire. Aucun jeu de tests métier automatisés n’a été identifié dans les dossiers applicatifs examinés.

Tests à écrire en priorité : mauvais mot de passe, accès entre établissements, quantités invalides, panne de base, double soumission, paiement concurrent, redémarrage serveur, commande téléphone vers cuisine et clôture de caisse. Ce sont des tests de risque métier ; tester chaque composant décoratif serait moins prioritaire.

## 8. Marketing et positionnement

### Positionnement proposé — hypothèse à valider

Commencer par les cafés/brunchs indépendants d’une zone géographique proche, avec installation et accompagnement. La proposition à tester : « Une commande claire depuis la table jusqu’à la cuisine, avec un menu à votre image. » La combinaison français/arabe et une configuration adaptée à l’établissement peuvent être pertinentes pour un pilote marocain ; la demande réelle n’a pas été mesurée.

Le QR seul ne constitue pas une différenciation suffisante : Square décrit déjà un parcours QR associé à une table, commande/paiement mobile puis transmission à la caisse et à la cuisine. Source officielle consultée : [Square — QR code ordering](https://squareup.com/us/en/online-ordering/qr-code-ordering). Cette comparaison porte sur les fonctions annoncées ; elle ne prouve ni disponibilité ni adaptation commerciale au Maroc.

Il faut donc prouver la simplicité de mise en place, la qualité du menu, la fiabilité pendant le service et la qualité de l’accompagnement. Ne pas annoncer de réduction chiffrée d’erreurs ou de hausse du chiffre d’affaires avant un pilote mesuré.

### Offre et acquisition

Construire d’abord une offre courte : menu QR administrable et commande à table. Ajouter la cuisine connectée après validation, puis l’encaissement complet lorsque les contrôles financiers sont fiables. La tarification doit couvrir installation, saisie du menu, formation, support et hébergement. Tester un abonnement par établissement et une prestation d’installation sans annoncer de prix comme « prix marché » : aucune étude tarifaire locale n’a été réalisée.

Après correction des P0, sélectionner trois établissements pilotes, observer un vrai service et comparer une période de référence à une période équipée. Préparer une démonstration courte du parcours complet et une page commerciale avec captures réelles, fonctions disponibles et formulaire de demande de démonstration. Approcher directement les gérants ; les éventuels messages de prospection restent à rédiger et à autoriser avant envoi.

### Conversion et confiance

Les notes, nombres d’avis et volumes de ventes affichés dans le prototype doivent être marqués comme fictifs ou remplacés par des données vérifiables avant présentation commerciale. Les images et descriptions doivent correspondre aux plats. Les mélanges de langues, devises et marques fragilisent la confiance même si le design plaît.

Limiter les promotions à une ou deux offres utiles. Mettre une suggestion complémentaire pertinente dans le panier plutôt que répéter de longues bandes promotionnelles. Tester l’effet sur le panier et l’abandon ; aucun résultat n’est garanti.

Mesures : taux de scan vers consultation, ajout au panier, commande confirmée par serveur, abandon, délai jusqu’à l’apparition en cuisine, erreurs/doublons, panier moyen et retour des établissements pilotes. Définir chaque indicateur et sa source ; les chiffres statiques des dashboards actuels ne constituent pas des mesures réelles.

## 9. Feuille de route par ordre de dépendance

| Étape | Travail | Condition de sortie |
|---|---|---|
| 1 — Sécuriser | Connexion, JWT, TLS, établissements, suppression du repli d’écriture | Tests de refus et isolation passent |
| 2 — Fiabiliser les commandes | Validation, parent avant lignes, transaction sur client unique, statuts | Commande persistante et aucun succès fictif après panne |
| 3 — Relier les écrans | Catalogue unique, sessions réelles, QR de table, cuisine synchronisée | Un téléphone distinct envoie une commande visible en cuisine |
| 4 — Fiabiliser la caisse | Paiement, idempotence, concurrence, espèces/carte, clôture | Aucun double encaissement et rapprochement correct |
| 5 — Harmoniser le frontend | Design partagé, icônes locales, textes, photos, accessibilité, mobile | Parcours complet utilisable aux largeurs retenues |
| 6 — Pilote commercial | Installation, formation, suivi des indicateurs | Utilisation réelle et retours documentés de trois établissements |

Ne pas fixer de date de commercialisation avant d’avoir validé les quatre premières étapes. Une estimation de délai fiable nécessite de choisir le périmètre et de confirmer l’environnement de données et de paiement.

## 10. Exécution locale et modifications réalisées

Les données distantes n’ont pas été utilisées. Le lanceur API force une base vide, un secret temporaire et une écoute sur l’interface locale. Les commandes de test sont seulement en mémoire et disparaissent à l’arrêt. Ce simulateur conserve volontairement les défauts du backend pour les documenter ; il ne valide pas les paiements réels.

Adresses : menu `http://127.0.0.1:8000/stitch_caf_menu_table_12/swiggy-style_elite_main_menu_390x2500/index.html`, API `http://127.0.0.1:3000/health`, caisse `http://127.0.0.1:3001/`, cuisine `http://127.0.0.1:3002/`.

Modifications limitées au lancement : alias TypeScript de la caisse ; racines de projet Next explicites ; configuration PostCSS/Tailwind de la caisse ; dossier de compilation de caisse distinct pour éviter le cache des styles antérieurs. Outils et preuves ajoutés dans `audit-tools`. Les failles métier et de sécurité décrites ne sont pas corrigées par cet audit.

Pour relancer, depuis la racine ouvrir un terminal par service : `node audit-tools/local-preview.cjs`, `node audit-tools/api-simulator.cjs`. Dans le dossier de caisse : `node node_modules/next/dist/bin/next dev --hostname 127.0.0.1 --port 3001`. Dans le dossier cuisine : `node node_modules/next/dist/bin/next dev --webpack --hostname 127.0.0.1 --port 3002`. Arrêter chaque service par Ctrl+C. Webpack évite le plantage Turbopack observé au premier démarrage cuisine.

Preuves : `static-results.json`, `runtime-results.json`, `launch-results.json`, `pos-typescript.txt`, `kitchen-typescript.txt` et captures dans `audit-tools`. Les résultats runtime initiaux conservent les erreurs de démarrage avant correction ; le bilan final est séparé.

### Vérification finale et complément visuel

Après recompilation dans le dossier distinct, la caisse affiche bien les styles : navigation, cartes de raccourcis, indicateurs et colonnes sont visibles et organisés. La capture finale remplace le premier rendu sans styles. Le tableau de bord est lisible sur le format large observé, avec une bonne séparation entre fond gris et cartes blanches. Les raccourcis prennent cependant beaucoup de hauteur ; pendant le service, je donnerais davantage de place aux commandes actives. Le chiffre d’affaires est répété dans plusieurs blocs et pourrait être simplifié. Ces chiffres restent fictifs.

La cuisine a également été observée : filtres clairs, cartes distinctes et boutons d’action bien visibles. Les couleurs bleu/orange/vert facilitent le repérage des étapes. À améliorer : le numéro `ORD-105` revient à la ligne dans la carte urgente, le badge d’urgence concurrence le temps écoulé, et les cartes courtes laissent beaucoup d’espace vide. Stabiliser la zone numéro/urgence/temps, renforcer la priorité des commandes anciennes et vérifier les contrastes et l’usage à distance. Le sous-titre annonce du « real-time » alors que le code courant utilise des données locales : adapter le libellé de démonstration.

Le menu, la caisse et la cuisine ont donc été ouverts dans le navigateur. Le menu a été observé en format étroit et les deux outils internes en format large. Les autres largeurs, interactions complètes et lecteurs d’écran restent à vérifier. Les polices Google n’ont pas toutes pu être téléchargées dans cet environnement ; Next a utilisé des polices de secours. Aucun build de production complet ni audit des vulnérabilités des dépendances par registre n’a été réalisé ; aucune liste de CVE n’est affirmée à partir des seuls numéros de version.

## 11. Complément : interface commerçant réellement utilisée

L’utilisateur utilise `isolated_merchant_dashboard/index.html`. Après lecture du code et observation des onglets caisse et cuisine, je recommande de retenir cette version comme socle produit. Elle est plus cohérente avec Stitch Café, les montants en DH et un usage commerçant centralisé. Les deux applications Next peuvent rester des références de composants sans devenir trois produits à maintenir en parallèle.

### Ce qui est déjà partagé

Les sept rubriques sont réunies dans une navigation commune : dashboard, prise de commande, commandes, cuisine, catalogue, QR/tables et réservations. Le tableau `liveOrders` est réellement commun à la caisse locale et à la cuisine (`script.js:292`, `1554`, `2199`). Le précédent constat d’écrans complètement indépendants concerne donc les applications Next ; il ne décrit pas correctement le fonctionnement interne de cette page.

### Points à fiabiliser dans cette version précise

| Constat établi par le code | Effet |
|---|---|
| Initialisation depuis `DEMO_ORDERS`, sans restauration initiale de `stitch_live_orders` (`script.js:292`) | Une actualisation réinitialise les commandes visibles ; les statuts et archives ne sont pas sauvegardés durablement |
| Succès API : panier vidé sans mise à jour de `liveOrders` (`2169–2174`) | La commande serveur n’est pas ajoutée à la cuisine locale par ce parcours |
| Échec API : simulation puis message de succès (`2176–2205`) | Un problème réseau peut être confondu avec une commande réellement enregistrée |
| POST limité aux identifiants et quantités (`2167`) | Table, options, notes et remise ne sont pas transmis |
| Remise calculée à l’écran (`2071–2089`), total brut recalculé au checkout (`2179`) | Écart possible entre total affiché et commande créée |
| Changement de statut ne rappelle pas `renderKitchenDisplay` (`1271–1285`) | Carte cuisine susceptible de rester visuellement dans l’ancien état jusqu’au retour dans cet onglet |
| Événement `storage` limité aux listes plus longues (`1066–1075`) | Ignore les changements de statut et suppressions ; aucune synchronisation entre appareils |
| Reçu archivé recherché dans les démos et actualisation après impression (`1291–1295`, `1333–1339`) | Ticket potentiellement erroné et perte de l’état en mémoire |
| Deux modales avec le même ID `pos-modifier-modal` (`index.html:885`, `1054`) | Sélection DOM ambiguë et maintenance fragile |

Ces scénarios ont été établis par lecture ciblée ; aucun paiement réel ni clôture de caisse n’a été exécuté pour cette comparaison.

### Avis visuel sur cette interface

Le panneau de commande séparé du catalogue est une bonne base : panier, remise et total sont regroupés et faciles à retrouver. La cuisine présente bien les tables, statuts et notes. La navigation commune évite de changer d’application pendant le service.

Le rendu observé reste trop chargé en ombres, bordures épaisses, effets brillants et couleurs d’action. L’orange de marque, le bleu des actions et les couleurs métier devraient avoir des rôles constants. Réserver un traitement fort à l’onglet actif ; les boutons latéraux se ressemblent trop. Améliorer le contraste du profil et du texte secondaire. Plusieurs photos étaient absentes dans la prévisualisation HTTP ; vérifier les chemins relatifs et prévoir une image de secours. Les catégories de caisse étaient tronquées dans la largeur observée. La colonne latérale peut être réduite pour donner plus d’espace aux produits et aux tickets cuisine.

La version intégrée constitue donc une meilleure référence produit pour cet usage, sans être encore une caisse fiable en exploitation. Conserver une seule application, avec une vue cuisine directement ouvrable et limitée au rôle cuisine, et une vue caisse dédiée au personnel concerné.

### Ouverture locale

Utiliser [le tableau de bord via HTTP local](http://127.0.0.1:8000/isolated_merchant_dashboard/index.html). L’ouverture `file://` est adaptée à une maquette mais le générateur QR construit ses liens depuis `window.location.origin` (`script.js:731`), ce qui n’offre pas une adresse web utilisable par les clients. Une URL en `127.0.0.1` fonctionne sur ce PC uniquement ; les QR destinés aux téléphones nécessiteront une adresse réseau ou un domaine accessible, avec les protections appropriées.
