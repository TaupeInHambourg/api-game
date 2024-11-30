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

class Invastigate {
    constructor(id, question, response){
        this.id = id;
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

const suspects = [
    new Suspect(1, "Santa", false),
    new Suspect(2, "Snow", false),
    new Suspect(3, "Grinch", true)
];

const codes = [
    new Code(1, "Noel24", true),
    new Code(2, "Xmas", false),
    new Code(3, "Noel", false)
];

const investigations = [
    new Invastigate(1, "Qui pensez vous être le coupable ?", "Mmmmh, je ne sais pas..."),
]

const clues = [
    new Clue(1, "gps", "GrinchByte semble avoir vérouillé le GPS, vous y connecter en administrateur devrait vous permettre de le déverouiller"),
    new Clue(2, "coupable", "Il semble que le coupable soit un habitué des lieux. Il savait comment bloqué la distribution des cadeux et comment atteindre le traineau."),
    new Clue(3, "pere-noel", "Le père Noël vous dit avoir un accès administrateur, mais il a perdu le mot de passe depuis longtemps... Vous pourrez sûrement le retrouver"),
    new Clue(4, "deverouiller", "Avez-vous essayé /unlock ?"),
    new Clue(5, "connexion", "")
];

//* Export des collections
module.exports = {navigations, suspects, codes, investigations, clues};