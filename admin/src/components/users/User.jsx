import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


export const User = ({ id, name, email, nationality, tipoUsuario, avatarURL, phone, dni, birthday, postal_code, address, city, gender, interest }) => {
    const [show, setShow] = useState(false);
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (

        <div className="card w-30 shadow-lg p-3 mb-5 bg-body rounded " style={{ width: "31%" }}>

            <img src={avatarURL ? avatarURL : "/images/defaultAdmin.png"} className="card-img-top rounded-circle mx-auto " style={{ width: "200px", height: "200px" }} alt="User" />
            <div className="card-body ">
                <h5 className="card-title"><b>Usuario N°{id}</b></h5>
                <p className="card-text">{name}</p>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item azulClaroBorde"><b>Email:</b> {email}</li>
                <li className="list-group-item azulClaroBorde"><b>Nacionalidad:</b> {nationality ? nationality : "-"}</li>
                <li className="list-group-item azulClaroBorde"><b>Tipo de cuenta:</b> {tipoUsuario}</li>
            </ul>
            <br />
            <>
                <Button variant="primary" className='azulFuerteFondo' onClick={handleShow}>
                    Ver detalle
                </Button>

                <Modal show={show} onHide={handleClose} className="" style={{ width: "100%" }}>
                    <Modal.Header closeButton>
                        <Modal.Title><b>Usuario N°{id}:</b> {name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="w-100">
                        <div className="card  shadow-lg p-3 mb-5 bg-body rounded " style={{ width: "100%" }}>
                            <img src={avatarURL ? avatarURL : "/images/defaultAdmin.png"} className="card-img-top rounded-circle mx-auto " style={{ width: "200px", height: "200px" }} alt="User" />
                            <br/>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item border-info"><b>Email:</b> {email}</li>
                                <li className="list-group-item border-info"><b>Nacionalidad:</b> {nationality ? nationality : "-"}</li>
                                <li className="list-group-item border-info"><b>Tipo de cuenta:</b> {tipoUsuario}</li>
                                <li className="list-group-item border-info"><b>Telefono:</b> {phone ? phone : "-"}</li>
                                <li className="list-group-item border-info"><b>DNI:</b> {dni ? dni : "-"}</li>
                                <li className="list-group-item border-info"><b>Fecha de nacimiento:</b> {birthday ? birthday : "-"}</li>
                                <li className="list-group-item border-info"><b>Codigo postal:</b> {postal_code ? postal_code : "-"}</li>
                                <li className="list-group-item border-info"><b>Dirección:</b> {address ? address : "-"}</li>
                                <li className="list-group-item border-info"><b>Ciudad:</b> {city ? city : "-"}</li>
                                <li className="list-group-item border-info"><b>Genero:</b> {gender ? gender.name : "-"}</li>
                                <li className="list-group-item border-info"><b>Interes:</b> {interest.length > 0 ? 
                                interest.map((interest, index) => {
                                    return (
                                        <ul key={interest.interest.name + index}>
                                            <li >{ interest.interest.name }</li>
                                        </ul>
                                    )
                                }) 
                                : "-"}</li>
                            </ul>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" className="info" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        </div>

    )
}