/**
 * Export des fonctions helpers pour la spécification HAL
 * Voir la spécification HAL : https://stateless.group/hal_specification.html
 * Voir la spécification HAL (RFC, source) : https://datatracker.ietf.org/doc/html/draft-kelly-json-hal
 */

/**
 * Retourne un Link Object, conforme à la spécification HAL
 * @param {*} url 
 * @param {*} type 
 * @param {*} name 
 * @param {*} templated 
 * @param {*} deprecation 
 * @returns 
 */
function halLinkObject(url, type = '', name = '', templated = false, deprecation = false) {
    return {
        "href": url,
        "templated": templated,
        ...(type && { "type": type }),
        ...(name && { "name": name }),
        ...(deprecation && { "deprecation": deprecation })
    }
}

/**
 * Retourne une représentation Ressource Object (HAL) d'un indice
 * @param {*} clueData Données brutes d'un indice
 * @returns un Ressource Object Clue (spec HAL)
 */
function mapCluetoResourceObject(clueData, baseURL) {
    return {
        "_links": [{
            "self": halLinkObject(`/clues/${clueData.name}`),
            "clues": halLinkObject('/clues'),
        }],
        name: clueData.name,
        description: clueData.description,
    }
}

/**
 * Retourne une représentation Ressource Object (HAL) d'un indice
 * @param {*} investigateData Données brutes d'un indice
 * @returns un Ressource Object Clue (spec HAL)
 */
function mapInvestigationResourceObject(investigationData) {
    return {
        "_links": {
            "self": halLinkObject(`/investigate/${investigationData.id_pnj}/${investigationData.subject}`),
            "investigate": halLinkObject(`/investigate`),
        },
        subject: investigationData.subject,
    };
}
function mapInvestigationListToResourceObject(investigations, personnage) {
    const embedded = investigations.map(investigation => mapInvestigationResourceObject(investigation));

    return {
        "_links": {
            "self": halLinkObject(`/investigate/${personnage.name}`),
        },
        personnage: {
            name: personnage.name,
        },
        "_embedded": {
            "subjects": embedded,
        },
    };
}

/**
 * Retourne une représentation Ressource Object (HAL) d'un indice
 * @param {*} questionData Données brutes d'un indice
 * @returns un Ressource Object Clue (spec HAL)
 */
function mapQuestionRessourceObject(questionData){
    return {
        "_links": {
            "self": halLinkObject(`/investigate/${questionData.id_pnj}/${questionData.subject}`),
            "investigate": halLinkObject(`/investigate`),
        },
        subject: questionData.subject,
        talk: {
            question: questionData.question,
            response: questionData.response
        }
    };
}


module.exports = { halLinkObject, mapCluetoResourceObject, mapInvestigationResourceObject, mapInvestigationListToResourceObject, mapQuestionRessourceObject };