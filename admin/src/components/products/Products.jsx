import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


export const Product = ({ id, name, category, idCode, image, dimensions, price, volume, smell, quantity, stock, type, description, discount }) => {
    const [show, setShow] = useState(false);
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        
        <div className="card w-30 shadow-lg p-3 mb-5 bg-body rounded " style={{ width: "31%" }}>
            {console.log(image)}
            <img src={image ? image : "/images/imagenDefaultProducto.png"} className="card-img-top rounded mx-auto " style={{ width: "200px", height: "200px" }} alt="Producto" />
            <div className="card-body ">
                <h5 className="card-title"><b>Producto N°{id}</b></h5>
                <p className="card-text">{name}</p>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item border-info"><b>Precio:</b> {price ? price : "-"}</li>
                <li className="list-group-item border-info"><b>Descuento:</b> {discount ? discount : "-"}</li>
            </ul>
            <br />
            <>
                <Button variant="primary" onClick={handleShow}>
                    Ver detalle
                </Button>

                <Modal show={show} onHide={handleClose} className="" style={{ width: "100%" }}>
                    <Modal.Header closeButton>
                        <Modal.Title><b>Producto N°{id}:</b> {name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="w-100">
                        <div className="card  shadow-lg p-3 mb-5 bg-body rounded " style={{ width: "100%" }}>
                            <img src={image ? image : "/images/imagenDefaultProducto.png"} className="card-img-top rounded mx-auto " style={{ width: "200px", height: "200px" }} alt="Producto" />
                            <br/>
                            <ul className="list-group list-group-flush">
                            <li className="list-group-item border-info"><b>Nombre:</b> {name ? name : "-"}</li>
                                <li className="list-group-item border-info"><b>Precio:</b> {price ? price : "-"}</li>
                                <li className="list-group-item border-info"><b>Codigo ID:</b> {idCode ? idCode : "-"}</li>
                                <li className="list-group-item border-info"><b>Dimenciones:</b> {dimensions ? dimensions : "-"}</li>
                                <li className="list-group-item border-info"><b>Descripcion:</b> {description ? description : "-"}</li>
                                <li className="list-group-item border-info"><b>Tipo:</b> {type ? type : "-"}</li>
                                <li className="list-group-item border-info"><b>Cantidad:</b> {quantity ? quantity : "-"}</li>
                                <li className="list-group-item border-info"><b>Categoria:</b> {category ? category : "-"}</li>
                                <li className="list-group-item border-info"><b>Volumen:</b> {volume ? volume : "-"}</li>
                                <li className="list-group-item border-info"><b>Aroma:</b> {smell ? smell : "-"}</li>
                                <li className="list-group-item border-info"><b>Stock:</b> {stock ? stock : "-"}</li>
                                <li className="list-group-item border-info"><b>Descuento:</b> {discount ? discount : "-"}</li>
                                
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