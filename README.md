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

D??but du projet, cr??ation des pages Earth et Moon avec images en background

18/03/22

Mise en place du controller test pour tenter les routes avec klein et les obtenir ?? partir du frontend
??nergie en bdd et ajout d'??nergie suppl??mentaire ?? partir d'un bouton

19/03/22

mise en ligne du projet
t??che cron ajoutant de l'??nergie toutes les minutes fonctionnelle
??nergie se modifiant dans le m??me ordre de grandeur toutes les 10 secondes

20/03/22

design un peu plus joli
sauvegarde du lieu spatial o?? on s'est d??connect??
am??lioration du code (App qui r??cup??re les donn??es en bdd et les distribue aux components)

21/03/22

ajout du stockage et du niveau de reg??n??ration d'??nergie

22/03/22

mise en bdd du stockage et du niveau de reg??n??ration d'??nergie et r??cup??ration et redistribution au component react Home

24/03/22

ajout du bouton augmentation du niveau de reg??n??ration

25/03/2022

??toffage de la bdd pour la r??g??n??ration et le stockage des niveaux d'??nergie

27/03/2022

sauvegarde emplacement en bdd

28/03/2022

cr??ation du component Planet
ajout automatique d'??nergie ?? partir de la bdd pour les niveaux de r??g??n??ration et de capacit?? de stockage
r??cup??ration en bdd toutes les minutes de l'??nergie

!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
ne pas oublier de mettre le .htaccess dans le dossier www (avec static, index.html etc.)
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

29/03/2022

ajout toast (message flash)
am??lioration design
affichage ressources n??cessaires pour augmenter niveau de r??g??n??ration
d??but d'impl??mentation d'utilisation d'??nergie pour se d??placer de plan??te en plan??te

30/03/2022

impl??mentation d'utilisation d'??nergie pour se d??placer de plan??te en plan??te fini
ajout de tables en bdd

31/03/2022

design du bouton augmenter r??g??n??ration ??nergie

01/04/2022

correction bug ??nergie fig??e au premier voyage apr??s un refresh
d??but impl??mentation du cristal sur les plan??tes
t??che cron fonctionelle pour le cristal

02/04/2022

r??cup??ration du cristal et stockage sur la Terre fonctionnel
bouton ajout de niveau r??g??n??ration ??nergie et d??compte cristaux fonctionnel

03/04/2022

am??lioration du code (passage objet starship, energyInfos et planet)

04-05/04/2022

continuation am??lioration du code, ajout d'infos sur l'interface

06/04/2022

continuation am??lioration du code

07/04/2022

boutons g??n??ration cristal et stockage cristal des plan??tes fonctionnels
ajout modale et datagrid

08/04/2022

remplissage donn??es dans datagrid
ALT+MAJ+F pour formater
remplissage des donn??es BDD des 500 plan??tes de la galaxie 1

09/04/2022

travail sur le design
nettoyage du code
arr??ter serveur react : npx kill-port 3000
arr??ter serveur 8000 : netstat -ano | findstr 8000 puistaskkill /F /PID <nom de la t??che>
impl??mentation de la galaxie dans les adresses. Quand on clique dans la datagrid sur la plan??te d'une autre galaxie, on va ?? l'adresse voulue et les infos de la plan??te sont affich??es

10/04/2022

image d'arri??re plan charg??e dpeuis la BDD
correction de divers bugs (suite ?? l'impl??mentation de la galaxie en BDD)
ajout cristal sur toutes les plan??tes de toutes les galaxies par t??che cron fonctionnel (pas encore test?? sur le serveur en ligne)

11-12/04/2022

pas travaill?? sur le projet car j'ai le covid

13/04/2022

d??but soustraction ??nergie pour changer de galaxie => affichage de l'??nergie n??cessaire dans le datagrid

14/04/2022

finition affichage ??nergie dans le datagrid. J'ai abandonn?? l'id??e de faire 500 plan??tes organis??es en cercle (que l'??nergie de 500 ?? 1 soit la m??me que de 1 ?? 2)

16/04/2022

travail sur le design datagrid

23/06/2022

apr??s longue absence, correction bug boutons plan??tes autre que Terre qui n'agissaient plus

24/06/2022

petit travail de design apr??s avoir montr?? ?? Alex L. d'Apteed
d??but impl??mentation combat contre PNJ

25/06/2022

ennemi pr??sent au chargement de la page fight

26/06/2022

il manque l'affichage dans la dialog de r??sultats des r??sultats, la redirection quand on perd et le bouton pour revenir sur la plan??te d'o?? on vient mais sinon le combat PNJ est fini !

27/06/2022

combat fini (premi??re version) et mis en ligne. bug en ligne non pr??sent en local

28/06/2022

correction du bug (il se servait des donn??es d'ennemi du vaisseau suivant pour faire le combat et pas le vaisseau qu'on voulait combattre)
je montre le projet demain ?? Apteed

29/06/2022

finalement que Labigna l'a vu. il m'a donn?? des conseils

30/06 1-2/07

Syst??me de combat PNJ fini
correction bug d'affichage des ressources, il en reste toujours

03/07/2022

mise en place de tooltip sur le menu des plan??tes
