import React from 'react'
import { useEffect } from "react";
import { useState } from "react";
import { fetchWithoutToken } from "../../hooks/useFetch";
import { Product } from './Products';

export const ComponentProduct = () => {
  const [page, setPage] = useState(1);

  const handleChangePageRest = (button) => {
    console.log(button)
    products.previous && setPage(page - 1)
  }

  const handleChangePageSum = () => {
    products.next && setPage(page + 1)
  }

  const handleChangePage = (number) => {
    let page = number
    setPage(page)
  }

  let paginas;
  const [products, setProduct] = useState({
    loading: true,
    data: {},
    paginas: 0,
    previous: "",
    next: ""
  });

  useEffect(() => {
    fetchWithoutToken(`/products?page=${page}&limit=6`)
      .then(({data, meta}) => {
        // eslint-disable-next-line
        paginas = Math.ceil(meta.count / 6);
        paginas = Array.from(Array(paginas).keys());

        setProduct({
          loading: false,
          data: data,
          paginas,
          previous: meta.previous,
          next: meta.next
        });
      })
      .catch(() => console.error);
    // eslint-disable-next-line
  }, [page]);

  return (
    <div className='w-100'>
      <nav aria-label="..." className='d-flex'>
        <ul className="pagination mx-auto">
          <li className="page-item">
            <button onClick={() => handleChangePageRest(this)} id="restarPage" className="page-link azulFuerte">Previous</button>
          </li>
          {!products.loading && products.paginas.map((index) => (
            <li className={`page-item ${page === index + 1 && "active"}`} key={index}><button onClick={() => handleChangePage(index + 1)} className="page-link">{index + 1}</button></li>
          ))}
          <li className="page-item">
            <button onClick={handleChangePageSum} className="page-link azulFuerte">Next</button>
          </li>
        </ul>
      </nav>
      {products.loading ? (
        <p>Cargando...</p>
      ) : products.data.length > 0 ? (
        <div className='d-flex flex-wrap justify-content-between' style={{ gap: "10px" }}>
          {products.data.map((product, index) => (
            <Product {...product} key={product.name + index} />
          ))}
        </div>
      ) : (
        <div>
          <div class="alert alert-info" role="alert">
            <p> No se encontraron mas productos registrados, por favor retroceda.</p>
            <img src="https://http.dog/404.jpg" alt="gatito" />
          </div>

        </div>
      )}
      <nav aria-label="..." className='d-flex'>
        <ul className="pagination mx-auto">
          <li className="page-item">
            <button onClick={() => handleChangePageRest(this)} id="restarPage" className="page-link azulFuerte">Previous</button>
          </li>
          {!products.loading && products.paginas.map((index) => (
            <li className={`page-item ${page === index + 1 && "active"}`} key={index}><button onClick={() => handleChangePage(index + 1)} className="page-link">{index + 1}</button></li>
          ))}
          <li className="page-item">
            <button onClick={handleChangePageSum} className="page-link azulFuerte">Next</button>
          </li>
        </ul>
      </nav>
    </div>
  )
}
