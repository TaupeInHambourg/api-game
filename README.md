# Hack du traineau du père Noël
## Sommaire
<!-- vscode-markdown-toc -->
* 1. [Lancer le jeu](#Lancerlejeu)
* 2. [Conception](#Conception)
	* 2.1. [Dictionnaire de données](#Dictionnairededonnes)
	* 2.2. [Récapitulatif des ressources](#Rcapitulatifdesressources)
* 3. [Remarques](#Remarques)
* 4. [Sécurité](#Scurit)
* 5. [Références](#Rfrences)

<!-- vscode-markdown-toc-config
	numbering=true
	autoSave=true
	/vscode-markdown-toc-config -->
<!-- /vscode-markdown-toc -->
##  1. <a name='Lancerlejeu'></a>Lancer le jeu

**Installer le projet**
~~~bash
git clone https://github.com/TaupeInHambourg/api-game.git
npm install
cd api-game
touch private.key
~~~

**Démarrer le jeu**
~~~bash
npm start
curl localhost:3000/
~~~

##  2. <a name='Conception'></a>Conception
###  2.1. <a name='Dictionnairededonnes'></a>Dictionnaire de données
| Code | Libellé | Type | Obligatoire ? | Remarque et contraintes |
|---------------|---------------------------|--------|---------------------------|----------------------------------------------|
| navigation_id | Identifiant | N | Oui | UNIQUE, utilisé pour identifier une navigation |
| location | Nom de la ville de l'enfant | A | Oui | |
| name | Nom de l'enfant | A | Oui | |
| description | Description de l'enfant | A | Non | |
| isKind | Si l'enfant est sage | B | Oui | Booléen |
| personnage_id | Identifiant d'un personnage | N | Oui | UNIQUE |
| personnage_name | Nom d'un personnage | A | Oui | |
| isGuilty | Si le personnage est coupable | B | Oui | Booléen |
| message_id | Identifiant d'un message | N | Oui | UNIQUE |
| key | Contenu du message | AN | Oui | Hashé avec bcrypt, minimum 8 caractères |
| isWorking | Si le message est celui laissé par le hacker | B | Oui | Booléen |
| clue_id | Identifiant de l'indice | N | Oui | UNIQUE |
| clue_name | Nom de l'indice | AN | Oui | |
| clue_description | Contenu de l'indice | AN | Oui | |
| investigate_id | identifiant de la conversation | N | Oui | UNIQUE |
| id_pnj | identifiant de l'interlocuteur | N | Oui | Correspond à `personnage_id` |
| subject | sujet de l'échange | AN | Oui | |
| question | contenu de la question | AN | Oui | |
| response | contenu de la réponse à la question | AN | Non | |

###  2.2. <a name='Rcapitulatifdesressources'></a>Récapitulatif des ressources
| Ressource | URL | Méthode HTTP | Paramètres et variations | Commentaires |
|------------------|----------------------|--------------|---------------------------------|--------------------------------|
| Liste des données du gps | `/gps` | GET, HEAD, OPTION | | Page protégée : affiche les données si le coupable et le message caché ont été trouvés |
| Liste des premiers indices | `/clues` | GET, HEAD, OPTION | | |
| Supprime ou affiche le contenu d'un indice | `/clues/{name}` | GET, DELETE, HEAD, OPTION | `:name` = nom d'un indice | |
| Permet à l'utilisateur de proposer un coupable et le message caché pour débloquer le traineau | `/unlock` | POST, HEAD, OPTION | `{ coupable, message }` = nom d'un coupable et contenu d'un message | Si les conditions sont rénuies, envoie un JWT qui permettra à l'utilisateur de débloquer le traineau |
| Permet à l'utilisateur de s'adresser à un personnage | `/investigate/{pnj}` | GET, HEAD, OPTION | `:pnj` = nom d'un personnage | |
| Permet à l'utilisateur de poser une question | `/investigate/{id}/{subject}` | GET, HEAD, OPTION | `:id` `:subject` = id d'un personnage et sujet d'une conversation | |

##  3. <a name='Remarques'></a>Remarques
J'ai beaucoup aimé l'expérience et je suis plutôt contente du résultat même s'il est toujours possible de faire mieux. J'ai continué d'apprendre et de mieux comprendre le fonctionnement d'une API REST et l'utilisation d'Express.JS.

J'espère que vous avez pris plaisir à jouer et que le degré de difficulté était correctement dosé !

##  4. <a name='Scurit'></a>Sécurité
J'utilise rate-limiter afin de protéger l'API du brute-force. Le middleware créé limite le nombre de tentatives échouées à 10 toutes les secondes.
##  5. <a name='Rfrences'></a>Références
- [ExpressJS](https://expressjs.com/en/)
- [MDN web docs](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs)
- [Geeks for geeks](https://www.geeksforgeeks.org/)
- [Stack overflow](https://stackoverflow.com/)
- [Repo Github](https://github.com/paul-schuhm/web-api) de [@paul-schuhm](https://github.com/paul-schuhm)
- [Rate-limiter : node package](https://www.npmjs.com/package/rate-limiter-flexible)
- [Rate-limiter : help for my case](https://reflectoring.io/tutorial-nodejs-rate-limiter/)
- [Common Mark](https://commonmark.org/help/)
- [Base64](https://www.base64decode.org/fr/), [URL Decoder](https://www.urldecoder.org/) et [Dcode](https://www.dcode.fr/chiffre-cesar) pour les messages codés présents dans le jeu