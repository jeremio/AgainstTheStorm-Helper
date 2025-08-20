# Optimiseur de Plans Against the Storm - Guide des Fonctionnalités

## Aperçu

L'Optimiseur de Plans Against the Storm est un outil web conçu pour aider les joueurs à faire des choix optimaux de bâtiments basés sur la configuration actuelle de leur colonie. Cet outil analyse votre biome, les espèces sélectionnées, les bâtiments actuels, et les options de plans disponibles pour fournir des recommandations basées sur les données.

## Fonctionnalités Principales

### 🏗️ Configuration de la Colonie

#### Sélection du Biome
- **Objectif** : Sélectionnez votre biome actuel pour optimiser les recommandations basées sur la disponibilité des ressources
- **Biomes Supportés** :
  - Royal Woodlands (Forêts Royales)
  - Cursed Royal Woodlands (Forêts Royales Maudites)
  - Ashen Thicket (Bosquet Cendré)
  - Bamboo Flats (Plaines de Bambou)
  - Coastal Grove (Bosquet Côtier)
  - Coral Forest (Forêt de Corail)
  - Scarlet Orchard (Verger Écarlate)
  - Marshlands (Marécages)
  - Sealed Forest (Forêt Scellée)
  - Rocky Ravine (Ravin Rocheux)

#### Gestion des Espèces
- **Limite d'Espèces** : Exactement 3 espèces doivent être sélectionnées (exigence du jeu)
- **Espèces Disponibles** : Humains, Castors, Lézards, Harpies, Renards, Grenouilles, Chauves-souris
- **Retour Visuel** : Les espèces sélectionnées sont surlignées avec des bordures dorées
- **Validation Intelligente** : Empêche la sélection de plus de 3 espèces

#### Suivi des Bâtiments Actuels
- **Catégories de Bâtiments** : Production, Logement, Service, Agriculture, Acquisition de Ressources
- **Fonctionnalité de Recherche** : Filtrez les bâtiments par nom pour une sélection facile
- **Mises à jour en Temps Réel** : La liste de bâtiments se met à jour selon la sélection d'espèces (règles d'exclusivité)
- **Pré-sélection** : Les bâtiments essentiels (Cuisine de Campagne, Poste de Fortune, Atelier Rudimentaire) sont automatiquement sélectionnés

#### Sélection des Types d'Eau de Pluie
- **Types d'Eau** : Eau de Clearance, Eau de Bruine, Eau d'Orage
- **Impact** : Affecte la notation pour les bâtiments dépendants de la pluie
- **Sélection Multiple** : Peut sélectionner plusieurs types d'eau disponibles dans votre colonie

### 📊 Système d'Analyse des Plans

#### Options de Plans
- **Nombre d'Options** : Jusqu'à 4 choix de plans différents peuvent être comparés
- **Filtrage Intelligent** : Exclut les bâtiments de base et actuels de la sélection
- **Mode de Secours** : Si aucun plan n'est sélectionné, analyse tous les bâtiments disponibles

#### Algorithme de Notation
L'optimiseur utilise un système de notation complet qui évalue plusieurs facteurs :

**Catégories de Notation de Base :**
- **Synergie d'Espèces** (jusqu'à +45 points) : Bâtiments qui correspondent aux spécialisations de vos espèces
- **Disponibilité des Ressources** (variable) : Scores plus élevés pour les bâtiments qui utilisent les ressources abondantes du biome
- **Satisfaction des Besoins** (jusqu'à +60 points) : Bâtiments qui produisent des biens requis par vos espèces
- **Valeur de Production** (jusqu'à +50 points) : Priorité donnée aux biens essentiels comme les planches, briques, tissus
- **Synergie de Bâtiments** (jusqu'à +15 points) : Bâtiments qui complètent votre infrastructure existante
- **Compatibilité de Biome** (variable) : Bonus pour les bâtiments qui excellent dans votre biome
- **Correspondance d'Eau de Pluie** (+10 points) : Bâtiments qui peuvent utiliser vos types d'eau disponibles

**Bonus Spéciaux :**
- **Priorité de Logement** (+70 points) : Le logement reçoit toujours une haute priorité
- **Analyse Agricole** : Évaluation complexe de l'utilisation du sol fertile et de la productivité
- **Bonus d'Héritage** : Bonus pré-configurés pour des bâtiments spécifiques de haute valeur
- **Qualité des Recettes** : Les recettes d'étoiles supérieures reçoivent des points supplémentaires

### 🎯 Moteur de Recommandations

#### Affichage des Résultats
- **Résultats Classés** : Toutes les options classées du score le plus élevé au plus bas
- **Visualisation des Scores** : Scores codés par couleur (vert pour excellent, jaune pour bon, rouge pour faible)
- **Raisonnement Détaillé** : Chaque recommandation inclut des raisons spécifiques pour le score
- **Répartition des Scores** : Notation transparente avec attribution détaillée des points

#### Recommandations Intelligentes
- **Conscience du Contexte** : Considère votre progression actuelle et vos besoins
- **Notation Équilibrée** : Pondère plusieurs facteurs pour des recommandations bien arrondies
- **Gestion de l'Exclusivité** : Filtre automatiquement les bâtiments indisponibles pour vos espèces
- **Vérification des Prérequis** : Évalue si vous pouvez utiliser efficacement les bâtiments recommandés

## Fonctionnalités de l'Interface Utilisateur

### 🎨 Design Moderne
- **Mise en Page Responsive** : Fonctionne sur ordinateur de bureau, tablette et mobile
- **Thème Sombre** : Facile pour les yeux avec des arrière-plans dégradés
- **Hiérarchie Visuelle** : Organisation claire avec des sections codées par couleur
- **Interactions Fluides** : Effets de survol et transitions pour une meilleure UX

### 🔧 Fonctionnalités d'Utilisabilité
- **Validation en Temps Réel** : Retour immédiat sur les erreurs de configuration
- **Indicateurs de Progrès** : Montre le progrès de sélection (ex: "Sélectionnés : 2/3 espèces")
- **Messages d'Erreur** : Messages d'erreur clairs et utiles avec des solutions suggérées
- **Recherche de Bâtiments** : Fonctionnalité de filtrage rapide pour les grandes listes de bâtiments

### 📱 Accessibilité
- **Optimisé Mobile** : Interface tactile pour le gaming mobile
- **Navigation au Clavier** : Support clavier complet pour les utilisateurs avancés
- **Adapté aux Lecteurs d'Écran** : Libellés ARIA appropriés et HTML sémantique
- **Contraste Élevé** : Contraste de couleur suffisant pour la visibilité

## Fonctionnalités Avancées

### 🧮 Moteur de Calcul
- **Analyse Multi-facteurs** : Considère plus de 10 facteurs de notation différents
- **Pondération Dynamique** : La notation s'ajuste selon l'état de la colonie
- **Optimisé Performance** : Calculs rapides même avec des configurations complexes
- **Extensible** : Facile d'ajouter de nouveaux critères de notation

### 🔄 Gestion des Données
- **Données basées sur JSON** : Facile de mettre à jour les données du jeu à mesure que le jeu évolue
- **Architecture Modulaire** : Fichiers de données séparés pour une maintenance facile
- **Contrôle de Version** : Suivi des changements d'équilibrage du jeu au fil du temps

### 🌐 Intégration
- **Liens Sociaux** : Liens directs vers le contenu du créateur (YouTube, Discord, Twitch, Kick)
- **Axé Communauté** : Construit pour soutenir la communauté Against the Storm
- **Développement Ouvert** : Processus de développement transparent

## Conseils pour de Meilleurs Résultats

### Conseils de Configuration
1. **Soyez Précis** : Assurez-vous que votre sélection de biome et d'espèces correspond à votre état de jeu actuel
2. **Mettez à Jour les Bâtiments** : Gardez votre liste de bâtiments actuels à jour pour de meilleures recommandations
3. **Considérez l'Eau** : N'oubliez pas de sélectionner vos types d'eau de pluie disponibles
4. **Pensez à l'Avenir** : Considérez ce dont vous aurez besoin dans les prochaines minutes, pas seulement immédiatement

### Directives d'Interprétation
1. **Scores Élevés (80+)** : Excellents choix qui s'alignent bien avec votre colonie
2. **Scores Moyens (60-79)** : Bonnes options qui peuvent fonctionner selon votre stratégie
3. **Scores Faibles (<60)** : Généralement à éviter sauf si vous avez des raisons stratégiques spécifiques
4. **Considérez le Contexte** : Parfois un bâtiment moins bien noté pourrait être nécessaire pour des objectifs spécifiques

### Usage Stratégique
1. **Début de Partie** : Concentrez-vous sur la production essentielle et le logement
2. **Milieu de Partie** : Cherchez les synergies entre bâtiments et bonus d'espèces
3. **Fin de Partie** : Optimisez pour des conditions de victoire spécifiques et ressources avancées
4. **Urgence** : Utilisez pour des décisions rapides sous pression temporelle

## Améliorations Futures

### Fonctionnalités Prévues
- **Sauvegarder/Charger les Configurations** : Sauvegarder les configurations communes de colonie
- **Suivi Historique** : Suivre vos choix de bâtiments au fil du temps
- **Filtres Avancés** : Contrôle plus granulaire sur les recommandations
- **Fonctionnalité d'Export** : Partager les configurations avec d'autres joueurs
- **Mises à jour Saisonnières** : Mises à jour régulières correspondant aux patchs du jeu

### Fonctionnalités Communautaires
- **Retours Utilisateur** : Intégration pour les suggestions de la communauté
- **Guides de Stratégie** : Conseils intégrés de joueurs expérimentés
- **Analyse Méta** : Suivi des combinaisons de bâtiments populaires
- **Mode Tournoi** : Recommandations spécialisées pour le jeu compétitif

L'Optimiseur de Plans Against the Storm continue d'évoluer basé sur les retours de la communauté et les mises à jour du jeu, s'assurant qu'il reste l'outil le plus précis et utile pour l'optimisation de colonie.
