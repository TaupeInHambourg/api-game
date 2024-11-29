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
# Hack du traineau du père Noël

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
| Ressource       | URL                  | Méthode HTTP | Paramètres et variations       | Commentaires                   |
|------------------|----------------------|--------------|---------------------------------|--------------------------------|
| Affiche les données du gps     | `/gps`        | GET, HEAD, OPTION           |              | Affiche les données si l'utilisateur est administrateur |
| Propose des indices      | `/clues`    | GET, DELETE, HEAD, OPTION          | `:id` (identifiant utilisateur)| Récupère les détails d'un utilisateur.   |
| Affiche un indice | `/clues/:name`        | GET, HEAD, OPTION         | `{ "name": "John", "email": "john@example.com" }` | Crée un nouvel utilisateur.    |
| Supprime un indice    | `/clues/:id`    | DELETE, HEAD, OPTION          | `{ "name": "John Updated" }`   | Met à jour un utilisateur existant. |
| Supprimer        | `/unlock`    | POST, HEAD, OPTION       | `:id`                          | Supprime un utilisateur.       |

###  2.2. <a name='Rcapitulatifdesressources'></a>Récapitulatif des ressources

##  3. <a name='Scurit'></a>Sécurité

##  4. <a name='Remarques'></a>Remarques

##  5. <a name='Rfrences'></a>Références