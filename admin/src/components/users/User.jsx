import React from 'react'

export const User = ({ id, name, email, nationality, tipoUsuario, avatarURL }) => {
    return (

        <div className="card w-30 shadow-lg p-3 mb-5 bg-body rounded " style={{ width: "31%" }}>
            <img src={avatarURL ? avatarURL : "/images/defaultAdmin.png"} className="card-img-top rounded-circle mx-auto " style={{ width: "200px", height: "200px" }} alt="User" />
            <div className="card-body ">
                <h5 className="card-title">Usuario N°{id}</h5>
                <p className="card-text">{name}</p>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item border-info">Email: {email}</li>
                <li className="list-group-item border-info">Nacionalidad: {nationality ? nationality : "-"}</li>
                <li className="list-group-item border-info">Tipo de cuenta: {tipoUsuario}</li>
            </ul>
            <div className="card-body">
                <a href="/" className="btn btn-info">Ver mas</a>
            </div>
        </div>

    )
}