# Hack du traineau du père Noël

## Sommaire
<!-- vscode-markdown-toc -->
* 1. [Lancer le jeu](#Lancerlejeu)
* 2. [Conception](#Conception)
	* 2.1. [Dictionnaire de données](#Dictionnairededonnes)
	* 2.2. [Récapitulatif des ressources](#Rcapitulatifdesressources)
* 3. [Sécurité](#Scurit)
* 4. [Remarques](#Remarques)
* 5. [Références](#Rfrences)

<!-- vscode-markdown-toc-config
	numbering=true
	autoSave=true
	/vscode-markdown-toc-config -->
<!-- /vscode-markdown-toc -->

##  1. <a name='Lancerlejeu'></a>Lancer le jeu

~~~bash
npm install
npm start
~~~

~~~bash
curl localhost:3000
~~~

##  2. <a name='Conception'></a>Conception
###  2.1. <a name='Dictionnairededonnes'></a>Dictionnaire de données
| Code | Libellé | Type | Obligatoire ? | Remarque et contraintes |
|---------------|---------------------------|--------|---------------|----------------------------------------------|
| navigation_id | Identifiant | N | Oui | UNIQUE, utilisé pour identifier une navigation |
| location | Nom de la ville de l'enfant | A | Oui | |
| name | Nom de l'enfant | A | Oui | |
| description | Description de l'enfant | A | Non | |
| isKind | Si l'enfant est sage | B | Oui | Booléen |
| suspect_id | Identifiant du suspect | N | Oui | UNIQUE |
| suspect_name | Nom du suspect | A | Oui | |
| isGuilty | Si le suspect est coupable | B | Oui | Booléen |
| code_id | Identifiant du code | N | Oui | UNIQUE |
| key | Code de réparation | AN | Oui | Hashé avec bcrypt, minimum 8 caractères |
| isWorking | Si le code fonctionne pour réparer le traineau | B | Oui | Booléen |
| clue_id | Identifiant de l'indice | N | Oui | UNIQUE |
| clue_name | Nom de l'indice | AN | Oui | |
| clue_description | Contenu de l'indice | AN | Oui | |
| question_id | identifiant de la question | N | Oui | UNIQUE |
| question | contenu de la question | AN | Oui | |
| response | contenu de la réponse à la question | AN | Non | |

###  2.2. <a name='Rcapitulatifdesressources'></a>Récapitulatif des ressources
| Ressource | URL | Méthode HTTP | Paramètres et variations | Commentaires |
|------------------|----------------------|--------------|---------------------------------|--------------------------------|
| Liste des données du gps | `/gps` | GET, HEAD, OPTION | | Page protégée : affiche les données si le coupable et le message caché ont été trouvés |
| Liste des premiers indices | `/clues` | GET, HEAD, OPTION | | |
| Affiche le contenu d'un indice | `/clues/{name}` | GET, HEAD, OPTION | `:name` = nom d'un indice | |
| Supprime un indice | `/clues/{id}` | DELETE, HEAD, OPTION | `:id` = id d'un indice |  |
| Permet à l'utilisateur de proposer un coupable et le message caché pour débloquer le traineau | `/unlock` | POST, HEAD, OPTION | `{ coupable, message }` = nom d'un coupable et contenu d'un message | Si les conditions sont rénuies, envoie un JWT qui permettra à l'utilisateur de débloquer le traineau |
| Permet à l'utilisateur de s'adresser à un personnage | `/investigate/{pnj}` | GET, HEAD, OPTION | `:pnj` = nom d'un personnage | |
| Permet à l'utilisateur de poser une question | `/investigate/{pnj}/{id}` | GET, HEAD, OPTION | `:pnj` `:id` = nom d'un personnage et id d'une question | |

##  3. <a name='Scurit'></a>Sécurité
L'API est sécurisée
##  4. <a name='Remarques'></a>Remarques

##  5. <a name='Rfrences'></a>Références
[ExpressJS](https://expressjs.com/en/) \
[MDN web docs](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs) \
[Geeks for geeks](https://www.geeksforgeeks.org/) \
[Stack overflow](https://stackoverflow.com/) \