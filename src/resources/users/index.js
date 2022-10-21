const fs = require('fs');
const path = require('path');

const consultasDBOptionUser = [
    {
        association: "interest",
        include: [
            {
                association: "interest",
                attributes: {
                    exclude: ["createdAt", "updatedAt", "deletedAt"],
                }
            }
        ],
        attributes: {
            exclude: ["createdAt", "updatedAt", "deletedAt"],
        },
    }
];

const consultasDBOptionData = {
    exclude: ["createdAt", "updatedAt", "deletedAt"],
}

const eliminarAvatarToUser = (archivo) => {
    fs.existsSync(path.resolve(__dirname, "../../../public/img/fotos-users/" + archivo)) && fs.unlinkSync(path.resolve(__dirname, "../../../public/img/fotos-users/" + archivo))
}

const interestsToDBFunction = (userDataValuesInterest) => {
    interestsToLogin = []
    if (userDataValuesInterest.length > 0) {
        userDataValuesInterest.forEach(intereses => {
            intereses.id_interest === intereses.interest.dataValues.id ? interestsToLogin.push(intereses.interest.dataValues.name) : null
        });
    }
    return interestsToLogin
}

module.exports = {
    consultasDBOptionUser,
    consultasDBOptionData,
    eliminarAvatarToUser,
    interestsToDBFunction
}