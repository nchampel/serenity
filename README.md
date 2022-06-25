# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

13/03/22

Début du projet, création des pages Earth et Moon avec images en background

18/03/22

Mise en place du controller test pour tenter les routes avec klein et les obtenir à partir du frontend
énergie en bdd et ajout d'énergie supplémentaire à partir d'un bouton

19/03/22

mise en ligne du projet
tâche cron ajoutant de l'énergie toutes les minutes fonctionnelle
énergie se modifiant dans le même ordre de grandeur toutes les 10 secondes

20/03/22

design un peu plus joli
sauvegarde du lieu spatial où on s'est déconnecté
amélioration du code (App qui récupère les données en bdd et les distribue aux components)

21/03/22

ajout du stockage et du niveau de regénération d'énergie

22/03/22

mise en bdd du stockage et du niveau de regénération d'énergie et récupération et redistribution au component react Home

24/03/22

ajout du bouton augmentation du niveau de regénération

25/03/2022

étoffage de la bdd pour la régénération et le stockage des niveaux d'énergie

27/03/2022

sauvegarde emplacement en bdd

28/03/2022

création du component Planet
ajout automatique d'énergie à partir de la bdd pour les niveaux de régénération et de capacité de stockage
récupération en bdd toutes les minutes de l'énergie

!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
ne pas oublier de mettre le .htaccess dans le dossier www (avec static, index.html etc.)
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

29/03/2022

ajout toast (message flash)
amélioration design
affichage ressources nécessaires pour augmenter niveau de régénération
début d'implémentation d'utilisation d'énergie pour se déplacer de planète en planète

30/03/2022

implémentation d'utilisation d'énergie pour se déplacer de planète en planète fini
ajout de tables en bdd

31/03/2022

design du bouton augmenter régénération énergie

01/04/2022

correction bug énergie figée au premier voyage après un refresh
début implémentation du cristal sur les planètes
tâche cron fonctionelle pour le cristal

02/04/2022

récupération du cristal et stockage sur la Terre fonctionnel
bouton ajout de niveau régénération énergie et décompte cristaux fonctionnel

03/04/2022

amélioration du code (passage objet starship, energyInfos et planet)

04-05/04/2022

continuation amélioration du code, ajout d'infos sur l'interface

06/04/2022

continuation amélioration du code

07/04/2022

boutons génération cristal et stockage cristal des planètes fonctionnels
ajout modale et datagrid

08/04/2022

remplissage données dans datagrid
ALT+MAJ+F pour formater
remplissage des données BDD des 500 planètes de la galaxie 1

09/04/2022

travail sur le design
nettoyage du code
arrêter serveur react : npx kill-port 3000
arrêter serveur 8000 : netstat -ano | findstr 8000 puistaskkill /F /PID <nom de la tâche>
implémentation de la galaxie dans les adresses. Quand on clique dans la datagrid sur la planète d'une autre galaxie, on va à l'adresse voulue et les infos de la planète sont affichées

10/04/2022

image d'arrière plan chargée dpeuis la BDD
correction de divers bugs (suite à l'implémentation de la galaxie en BDD)
ajout cristal sur toutes les planètes de toutes les galaxies par tâche cron fonctionnel (pas encore testé sur le serveur en ligne)

11-12/04/2022

pas travaillé sur le projet car j'ai le covid

13/04/2022

début soustraction énergie pour changer de galaxie => affichage de l'énergie nécessaire dans le datagrid

14/04/2022

finition affichage énergie dans le datagrid. J'ai abandonné l'idée de faire 500 planètes organisées en cercle (que l'énergie de 500 à 1 soit la même que de 1 à 2)

16/04/2022

travail sur le design datagrid

23/06/2022

après longue absence, correction bug boutons planètes autre que Terre qui n'agissaient plus

24/06/2022

petit travail de design après avoir montré à Alexandre Lorenzo d'Apteed
début implémentation combat contre PNJ

25/06/2022

ennemi présent au chargement de la page fight
