## Lancer le projet

### Pré-requis

- [Node & npm v20](https://nodejs.org/en/download)
- [git](https://git-scm.com/downloads)

### Installation

Dans un terminal, se placer dans un dossier qui accueillera les sources puis :

```shell
git clone https://github.com/etupro/etupro-app.git
```

Se déplacer dans le dossier du projet :

```shell
cd etupro-app
```

Installer le projet :

```shell
npm install
```

### Lancer le projet en local

```bash
npm start
```

Ouvrir [http://localhost:5002](http://localhost:5002) dans le navigateur pour observer le résultat.

## Participer

La participation est ouverte à tous les membres du projet qui se sente d'ajouter une pierre à l'édifice.
Il n'est pas nécessaire d'être un excellent codeur pour le faire et toutes l'aide possible pourra être
apporté via le Discord ou en échangeant dans les tickets.

Pour assurer un travail collaboratif allant dans le bon sens pour l'application et le travail de chacun,
il y aura quelques règles à suivre pour cadrer la participation et valider le code.

### Branches

Tout nouveau développement doit se faire sur une branche de travail basé sur la branche principale.  
Pour l'instant, il n'y a pas de règle de nommage pour la branche à part que se doit être en anglais.

### Commits

Pour l'instant, il n'y a pas de règle sur les commits.  
Même s'il est conseillé de faire une synthèse claire en anglais de ce qui est fait dans le commit pour pouvoir identifier
rapidement les modifications incluses dans le commit. Ne pas hésiter à découper en plusieurs commits de grosses
modifications.

### Pull requests

Pour intégrer son développement à la branche principale, il est obligatoire de créer une "Pull Request" (PR)
qui permettra à un autre développeur de faire une revue de code et à terme valider la PR.  
Une fois validé, le développeur qui a fait la relecture du code pourra merge la PR sur la branche principale.

Il est attendu que le pair fasse une relecture du code pour une validation technique et également une passe
fonctionnelle pour s'assurer du bon fonctionnement de l'application.

## Organisation

Le projet s'organise actuellement surtout autour du tableau du projet de type "Kanban Board".  
C'est là-bas que sont créées les taches et que l'on suit leur évolution passant de la conception
à la réalisation.

### Board projet

Le board projet se retrouve [ici](https://github.com/orgs/etupro/projects/1).
Le cycle de vie d'une tache est le suivant :

1. Création de la tache dans la colonne `Spécification`. Elle reste dans cette colonne tant qu'elle
   n'est pas complètement qualifié et qu'un découpage technique n'a pas été fait. Une fois prête, elle
   passe dans la colonne `À faire`.
2. La tache reste dans la colonne `À faire` en attendant d'être affecté à un développeur. Une fois affecté,
   elle passe dans la colonne `En cours`.
3. Durant tout le temps du développement la tache reste dans la colonne `En cours`. Une fois le
   développement terminé et une première validation technique et fonctionnelle du développeur, la tache
   passe en `Qualification` pour être validé par un pair.
4. En `Qualification` la tache attend la validation du code et du fonctionnement par un second développeur.
   Pendant cette phase il peut il avoir plusieurs aller-retour suite aux corrections demandés par le pair. Une
   fois que le pair est satisfait de la qualité du code et qu'aucune régression n'est détecté dans l'application,
   la tache passe dans la colonne `Validé`.
5. Dans la colonne `Validé`, la tache attend que le code soit merge vers la branche principale puis peut
   être cloturé ce qui la fera passer automatiquement dans la colonne `Terminé`.
6. La colonne `Terminé` regroupe toutes les tâches achevées récemment. Les taches dans cette colonne sont archivé
   automatiquement après 2semaine.

### Code review

TODO expliquer comment faire une code review

### Architecture du projet

- **src** // tout le code et autre fichier de l'app se trouve ici
  - **app** // Dossier qui contient le code de l'application
    - **modules** // Dossier qui contient les différents modules qui structure l'application.
      - On retrouve un dossier par module principal
      - Chaque module doit définir son routing
    - **shared** // Dossier qui contient le code partagé entre les différents modules de l'application
      - **components** // Dossier qui contient tout les composant commun
      - **models** // Dossier qui contient les type, interface et classe qui définissent des structures de donnée
      - **services** // Dossier qui contient les class de service qui serve la logique commune pour l'application
  - **assets** // Dossier qui continent les assets de l'app (image, ficher, ...)
  - **environments** // Dossier avec les fichiers de variable d'environement

## A discuter

Les points à discuter sur l'orga ou les idées truc a mettre en place :

- Branche de pré-release (staging)
- Organiser le nommage des commits
- Gérer les versions de l'application
