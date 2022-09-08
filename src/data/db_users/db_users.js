const fs = require("fs");
const path = require("path");

const cargarUsers = () => {
  return JSON.parse(
    fs.readFileSync(path.join(__dirname, "./users.json"), "utf-8")
  );
};

const crearUsers = (users) => {
    fs.writeFileSync(path.join(__dirname,'./users.json'), JSON.stringify(users, null, 3),'utf8')
}

const loadCategoriasUser = () => {
    return JSON.parse(fs.readFileSync(path.join(__dirname, './categoriaUsuario.json'),'utf-8'))
  }

module.exports = { 
  cargarUsers, 
  crearUsers,
  loadCategoriasUser
};