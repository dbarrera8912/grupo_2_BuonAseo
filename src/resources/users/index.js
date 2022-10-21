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

const eliminarAvatarToUser = (archivo) =>{
    fs.existsSync(path.resolve(__dirname, "../../../public/img/fotos-users/" + archivo)) && fs.unlinkSync(path.resolve(__dirname, "../../../public/img/fotos-users/" + archivo))
}

module.exports = {
    consultasDBOptionUser,
    consultasDBOptionData,
    eliminarAvatarToUser
}