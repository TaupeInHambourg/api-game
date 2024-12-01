var bcrypt = require('bcrypt');

//* Déclaration des classes

class Navigation {
    constructor(id, location, name, description, isKind){
        this.id = id;
        this.location = location;
        this.name = name;
        this.description = description;
        this.isKind = isKind;
    }
}

class Suspect {
    constructor(id, name, isGuilty){
        this.id = id;
        this.name = name;
        this.isGuilty = isGuilty;
    }
}

class Code {
    constructor(id, key, isWorking){
        this.id = id;
        this.key = bcrypt.hashSync(key, 5);
        this.isWorking = isWorking;
    }
}

class Personnage {
    constructor(id, name, isGuilty){
        this.id = id;
        this.name = name;
        this.isGuilty = isGuilty;
    }
}

class Investigate {
    constructor(id, id_pnj, subject, question, response){
        this.id = id;
        this.id_pnj = id_pnj;
        this.subject = subject;
        this.question = question;
        this.response = response;
    }
}

class Clue {
    constructor(id, name, description){
        this.id = id;
        this.name = name;
        this.description = description;
    }
}

//* Définition des collections

const navigations = [
    new Navigation(1, "Brumeciel", "Michel Dupont", "Laisse toujours un cookie", true),
    new Navigation(2, "Rochelande", "Sabrina Smith", "Se moque de ses amis", false),
    new Navigation(3, "Lunebourg", "Jean Martin", "Aide toujours ses voisins", true),
    new Navigation(4, "Verteval", "Claire Dubois", "Aime critiquer les autres", false),
    new Navigation(5, "Florebourg", "Paul Durant", "Rend service sans attendre", true),
    new Navigation(6, "Dorenville", "Amélie Petit", "Chante toujours en marchant", true),
    new Navigation(7, "Oriville", "Jacques Bernard", "Ne partage jamais ses affaires", false),
    new Navigation(8, "Nebulis", "Sophie Lemoine", "Apprend rapidement de nouvelles choses", true),
    new Navigation(9, "Cielval", "Marc Lefèvre", "Raconte des histoires drôles", true),
    new Navigation(10, "Vallune", "Emma Caron", "Interrompt constamment les autres", false)
];

const codes = [
    new Code(1, "Ce Noël va être annulé !", true),
    new Code(2, "Xmas", false),
    new Code(3, "Il est trop tard. C'est déjà la fin.", false),
    new Code(4, "Vive l'anti-Noel !!", false)
];

const personnages = [
    new Personnage(1, "Nicolas", false),
    new Personnage(2, "Snow", false),
    new Personnage(3, "Grinch", true),
    new Personnage(4, "Gilbreth", false),
    new Personnage(5, "Watson", false),
    new Personnage(6, "Mary", false),
    new Personnage(7, "Gremlins", false)
];

const investigations = [
    new Investigate(1, 1, "coupable", "Qui pensez vous être le coupable ?", "Le père Noël semble occupé, Mmmmh, je ne sais pas...répond-t-il pensivement, Je ne crois pas que mes amis ici en seraient capable, dit-il en désignant ses lutins. Mais prévenez-moi lorsque vous en saurez plus."),
    new Investigate(2, 1, "traineau", "Etes-vous le premier à être arrivé au traineau après l'incient ?", "Oui, j'y suis allé après que Gilbreth m'ai informé que l'équipage était près. C'est là que j'ai vu que le système de navigation était HS."),
    new Investigate(3, 1, "gilbreth", "Gilbreth semble être le dernier à avoir été vu autour du traineau, pensez-vous qu'il puisse vous en vouloir, où qu'il souhaite annuler Noël ?", "Non, c'est impossible, il a beaucoup de travail en cette période c'est vrai, mais je ne connais pas de lutins plus fidèle que lui."),
    new Investigate(4, 1, "alibi", "Que faisiez-vous lorsque le traineau à été attaqué ?", "Et bien, j'étais chez moi, je préparais ma tenue pour le grand-soir, ma femme, Mary, pourra en attester."),
    new Investigate(5, 1, "tag", "Le tag sur le traineau, l'avez-vous déjà vu quelque part ?", "Non, jamais, d'ailleurs je ne comprend pas ce qu'il signifie, un peu comme le message d'ailleurs, je l'ai donné à Gilbreth pour qu'il essaye de le déchiffrer."),
    new Investigate(6, 1, "grinch", "Pensez-vous que le Grinch puisse-t-être le coupable ?", "Impossible, c'est vrai qu'il est de mauvais poil en ce moment mais ça n'est pas une raison !"),
    new Investigate(7, 1, "gremlins", "Pensez-vous que le Gremlins puisse-t-être le coupable ?", "Non je ne le crois pas, il est destructeur, c'est vrai mais il a toujours aimé Noël."),
    new Investigate(8, 6, "grinch", "Pensez-vous que le Grinch puisse-t-être le coupable ?", "Assurément ! Il n'aime ni Noël, ni les enfants, chaque année, il râle et vole des cadeau, peut-être est-il cette fois allé plus loin ?"),
    new Investigate(9, 6, "gremlins", "Pensez-vous que le Gremlins puisse-t-être le coupable ?", "C'est tout à fait possible ! Il est devenu invivable depuis qu'il a pris un bain ! Qui sait de quoi il est désormais capable..."),
    new Investigate(10, 6, "nicolas", "Que faisait Nicolas Christmas, lors de l'attaque ?", "Il était avec moi, il préparait sa tenue pour la nuit de la distribution."),
    new Investigate(11, 4, "alibi", "Que faisiez-vous lorsque le traineau à été attaqué ?", "Eh bien, j'étais dans l'atelier, je supervisais le remplissage de la hotte."),
    new Investigate(12, 4, "coupable", "Qui pensez vous être le coupable ?", "Eh bien, à tous les coups c'est l'un des lutins de mon équipe ! Il n'y a pas grand monde en Laponie, vous et votre assistant être les premières personnes que nous voyons depuis longtemps! Et, ajoute-t-il, j'imagine mal les renes ou le Père Noël faire cela."),
    new Investigate(13, 4, "traineau", "Qui a remarqué l'attaque en premier ?", "Nicolas. Il a d'abord remarqué le tag sur le traineau, avant de voir que le GPS était HS."),
    new Investigate(14, 4, "message", "Que signifie le message que le Père Noël vous a confié ?", "Pas grand chose, si vous voulez mon avis, ce n'est rien de plus qu'un gribouillage., il s'éloigne avant de revenir avec un petit bout de papier qu'il tend à Watson"),
    new Investigate(15, 4, "lutins", "Vous semblez accuser les lutins, est-ce que l'un d'entre eux vous parrait suspect ?", "Ah !, s'esclame-t-il, ils le sont tous, des bons à rien ! Ce n'est pas compliqué, vous pouvez les diviser en deux groupes : les lèches-bottes et les fainéants !"),
    new Investigate(16, 5, "tag", "Voilà un tag bien étrange, qu'en pensez-vous mon ami ?", "Mon cher Snow, je crois que le coupable se joue de nous 'Ylyh o'dqwl-Qrho !!' ne me parrait pas être un message dénué de sens, il suffit de jouer un peu avec ses lettres."),
    new Investigate(17, 5, "message", "Dites-moi que contient ce message ?", "Ma foi, c'est là une énigme que j'ai bien du mal à comprendre : 'Q2UgTm/Dq2wgdmEgw6p0cmUgYW5udWzDqSAh'."),
    new Investigate(18, 5, "coupable", "D'après vous Watson, qui est le coupable ?", "Je pense que Gilbreth a raison, c'est forcément l'un des lutins, je vais aller m'informer à ce sujet."),
    new Investigate(19, 5, "lutins", "Alors mon ami, avez-vous quelques suspects à me présenter ?", "Et comment ! Il semble d'après Gilbreth et Mary que deux lutins ont changé d'attitude à l'approche de Noël : Grinch et Gremlins ! L'un comme l'autre semble vouloir la fin de Noël. Le premier vole les cadeaux et le second les détruit."),
    new Investigate(20, 5, "grinch", "Avez-vous plus d'informations à son sujet ?", "Depuis le hack du traineau, il se réjouit de l'annulation de Noël et ne cesse de répéter en chantant 'Ce Noël va être annulé !'."),
    new Investigate(21, 5, "gremlins", "Avez-vous plus d'informations à son sujet ?", "Il ne parle pas beaucoup, mais il est très desctructeur... J'ai trouvé un petit carnet qui semble lui appartenir, il ne contient qu'un seul message 'Il est trop tard. C'est déjà la fin.'."),
    new Investigate(22, 3, "alibi", "Pour quelle raison chantez vous cela ? Et que faisiez-vous lors de l'attaque du traineau ?", "Je déteste Noël ! Je déteste les fêtes, je déteste les décorations et je déteste ces petits humains !, c'est là la seule réponse que vous arrivez à lui tirer"),
    new Investigate(23, 7, "alibi", "Vous vous approchez prudamment, et lui demandez ce qu'il faisait lors de l'attaque", "Occupé à dévoré un cadeau, le Gremlins ne semble pas vous entendre."),
]

const clues = [
    new Clue(1, "gps", "Le hacker semble avoir vérouillé le GPS, vous détectez cependant que le hacker s'est laissé la possibilité d'acceder au système par un code, peut-être pourrez-vous le trouver ?"),
    new Clue(2, "coupable", "Peut-être trouverez vous un lien entre les messages codés et les dires des suspects?"),
    new Clue(3, "pere-noel", "Nicolas vous dit avoir trouvé un étrange message dans le traineau, il a confié à Gilbreth, son fidel chef des lutins, la tâche de le déchiffrer."),
    new Clue(4, "deverouiller", "Avez-vous essayé /unlock ?"),
    new Clue(5, "enquete", "N'hésitez pas à investiguer pour poser des questions aux personnes qui vous entourent."),
    new Clue(6, "tag", "Décalez chaque lettre de 3 places dans l'alphabet."),
    new Clue(7, "message", "Et-si le message reposait sur le format Base64 ?")
];

//* Export des collections
module.exports = {navigations, personnages, codes, investigations, clues};