var bcrypt = require('bcrypt');

//* Déclaration des classes

class Navigation {
    constructor(id, date, location, artist, description, seats){
        this.id = id;
        this.date = date;
        this.location = location;
        this.artist = artist;
        this.description = description;
        this.seats = seats;
    }
}

class User {
    constructor(id, pseudo, password, isAdmin){
        this.id = id;
        this.pseudo = pseudo;
        this.password = bcrypt.hashSync(password, 5);
        this.isAdmin = isAdmin;
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
    new Navigation(1,new Date(2023, 11, 15, 19, 0, 0),"Tokyo","Hatsune Miku","Navigation holographique de Hatsune Miku, l'idol virtuelle emblématique du Japon.",25000),
    new Navigation(
        2,
        new Date(2023,12,5,18,30,0),
        "Séoul",
        "K/DA",
        "Performance live de K/DA, le groupe de K-pop virtuel inspiré de League of Legends.",
        40000
    ),
    new Navigation(
        3,
        new Date(2024,01,15,20,0,0),
        "Los Angeles",
        "A-SOUL",
        "Navigation virtuel du célèbre groupe chinois de virtual idols, A-SOUL.",
        30000
    ),
    new Navigation(
        4,
        new Date(2024,02,20,21,0,0),
        "New York",
        "Evelynn",
        "Spectacle immersif avec Evelynn, l'idol virtuelle de K/DA.",
        18000
    ),
    new Navigation(
        5,
        new Date(2024,3,18,19,45,0),
        "Londres",
        "Vocaloid All Stars",
        "Une collaboration unique d'idols Vocaloid pour un Navigation à Londres.",
        22000
    ),
    new Navigation(
        6,
        new Date(2024,4,12,20,30,0),
        "Paris",
        "Lil Miquela",
        "Lil Miquela, influenceuse virtuelle, en live à Paris.",
        15000
    ),
    new Navigation(
        7,
        new Date(2024,5,20,19,15,0),
        "Berlin",
        "Kizuna AI",
        "La pionnière des YouTubeurs virtuels, Kizuna AI, en Navigation pour ses fans européens.",
        27000
    ),
    new Navigation(
        8,
        new Date(2024,6,25,20,0,0),
        "Shanghai",
        "Luo Tianyi",
        "Navigation en hologramme de Luo Tianyi, l'idol virtuelle populaire en Chine.",
        35000
    ),
    new Navigation(
        9,
        new Date(2024,7,30,21,0,0),
        "Bangkok",
        "Yukari Yuzuki",
        "Yukari Yuzuki, la vocaloid japonaise, en performance live en Thaïlande.",
        20000
    ),
    new Navigation(
        10,
        new Date(2024,8,15,18,0,0),
        "San Francisco",
        "Projekt Melody",
        "Projekt Melody, la star virtuelle de Twitch, en Navigation pour ses fans américains.",
        10000
    )
];

const users = [
    new User(1, "Santa", "Xmas", true),
    new User(2, "Snow", "niceTry", false),
    new User(3, "GrinchByte", "a", false)
];

const clues = [
    new Clue(1, "gps", "Le GPS est compromis"),
    new Clue(2, "grinchbyte", "Il semble que GrinchByte soit un habitué des lieux. Il savait comment bloqué la distribution des cadeux et comment atteindre le traineau."),
    new Clue(3, "santa", "Le père Noël vous dit avoir un accès administrateur, mais il a perdu le mot de passe depuis longtemps... Vous pourrez sûrement le retrouver")
];

//* Export des collections
module.exports = {navigations, users, clues};