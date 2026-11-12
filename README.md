# ☕ Stitch Café & Roastery — Smart POS & QR Menu SaaS

> **Écosystème Digital Complet pour Restaurant / Café & Roastery** : Caisse Enregistreuse POS, Kitchen Display System (KDS), Plan de Salle dynamique (12 Tables / 3 Zones), Centre de Commande QR et Menu Client immersif à 3 Thèmes adaptatifs.

---

## 🌟 Architecture & Composants Principaux

### 1. 🖥️ Dashboard Marchand (`/isolated_merchant_dashboard`)
Interface unifiée pour l'équipe du restaurant et le gérant :
- **Point of Sale (POS)** : Prise de commande rapide au comptoir, personnalisation des articles (modifiers, lait, sucre, cuisson), calcul de monnaie et impression de tickets.
- **Plan des Tables & QR (12 Tables)** :
  - **🌿 Terrasse** : Tables 1 à 4
  - **☕ Salle Principale** : Tables 5 à 8
  - **🏛️ 1er Étage** : Tables 9 à 12
  - Statuts en temps réel : *Libre (🟢), Occupée (🟡), Addition demandée (🟣), Réservée (🔵)*.
- **Kitchen Display System (KDS)** : Affichage cuisine en temps réel avec bandeau couleur d'étape (Reçue 🟡, En préparation 🔵, Prête 🟢).
- **Livraisons & Réservations** : Hub centralisé pour les commandes hors-salle et le planning des tables réservées.
- **Menu Manager** : Gestion du catalogue produits (129+ références), ajout de nouveaux produits avec upload photo et mise à jour des prix.
- **Apparence du Menu** : Sélecteur direct de thèmes client avec prévisualisation plein écran en direct.

### 2. 📱 Menu Client QR Code (`/stitch_caf_menu_table_12/swiggy-style_elite_main_menu_390x2500`)
Application web mobile-first optimisée pour smartphones et tablettes :
- **3 Identités Visuelles & Thèmes Dédiés** :
  1. **Style 1 : Classique Minimaliste** — Design scandinave épuré, fond blanc/gris perle, typographie moderne et cartes horizontales fluides.
  2. **Style 2 : Gourmet Reserve Roastery** — Ambiance feutrée torréfaction haute couture, fond crème latte chaud, typographie luxe à empattements (*Instrument Serif*), médaillons dorés et bordures colorées par catégorie.
  3. **Style 3 : Swiggy Bold (Photos XXL)** — Ambiance pop food vibrante, dégradé coucher de soleil, illustrations doodles en arrière-plan, photos occupant 65-70% de la carte et boutons signature `+ AJOUTER`.
- **Synchronisation Table & Zone** : Reconnaissance automatique du numéro de table et de la zone via l'URL (ex: `?table=12` $\rightarrow$ `Table 12 · 1er Étage`).
- **Services Table en Direct** : Bouton d'appel serveur et demande d'addition reliés en temps réel au dashboard marchand.

---

## 🚀 Démarrage Rapide

### Prérequis
- [Node.js](https://nodejs.org/) (v18+)

### Lancement du Serveur Local
```bash
# Lancement du serveur de prévisualisation (port 8000)
node audit-tools/local-preview.cjs
```

### Accès aux Applications
- **Dashboard Marchand** : `http://127.0.0.1:8000/isolated_merchant_dashboard/index.html`
- **Menu Client Table 12** : `http://127.0.0.1:8000/stitch_caf_menu_table_12/swiggy-style_elite_main_menu_390x2500/index.html?table=12`
- **Menu Mode Livraison** : `http://127.0.0.1:8000/stitch_caf_menu_table_12/swiggy-style_elite_main_menu_390x2500/index.html?mode=delivery`

---

## 📂 Structure du Répertoire

```text
├── isolated_merchant_dashboard/    # Dashboard Marchand (POS, KDS, Tables, Menu, Apparence)
│   ├── index.html
│   ├── script.js
│   ├── merchant-ui.js
│   ├── icons.js
│   └── ...
├── stitch_caf_menu_table_12/       # Menu Client QR Code
│   ├── swiggy-style_elite_main_menu_390x2500/  # Application principale client
│   ├── theme-engine.js             # Moteur universel de bascule des 3 thèmes
│   └── assets/                     # Photographies produits & visuels
├── audit-tools/                    # Outils d'audit & serveur local
│   └── local-preview.cjs
└── README.md
```

---

## 🔒 Posture Sécurité & Architecture
- Validation des entrées et isolation des flux.
- Séparation stricte des canaux de commande en salle (Tables 1-12) et hors-salle (Flyers / QR Externe).
- Architecture modulaire sans dépendance serveur bloquante (fonctionne en autonome avec persistance locale et support synchronisation API).
