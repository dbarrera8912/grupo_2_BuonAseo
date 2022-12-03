import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { fetchWithoutToken } from "../../hooks/useFetch";

export const LastProduct = () => {
  const [product, setProduct] = useState({
    loading: true,
    data: {},
  });

  useEffect(() => {
    fetchWithoutToken("/products/detail/1")
      .then(({data}) => {
        setProduct({
          loading: false,
          data: data.product,
        });
      })
      .catch(() => console.error);
  }, []);

  return (
    <div className="col-lg-6 mb-4">
      {product.loading ? (
        <p>Cargando...</p>
      ) : (
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h5 className="m-0 font-weight-bold text-gray-800">
              Producto destacado
            </h5>
          </div>
          <div className="card-body">
            <div className="text-center">
              <img
                className="img-fluid px-3 px-sm-4 mt-3 mb-4"
                style={{ width: "40rem" }}
                src={product.data.avatarURL}
                alt=" Product - BuonAseo "
              />
            </div>
            <p>{product.data.description}</p>
            <a
              className="btn btn-danger"
              target="_blank"
              rel="nofollow"
              href="/"
            >
              Ver detalle del producto
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
