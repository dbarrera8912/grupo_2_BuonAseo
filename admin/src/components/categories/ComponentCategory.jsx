import React from 'react'
import { useEffect } from "react";
import { useState } from "react";
import { fetchWithoutToken } from "../../hooks/useFetch";
import {CategoryCard} from "./CategoryCard";

import { useLocation } from 'react-router-dom';
import  "./Category.css";
export default function ComponentCategory() {
let location = useLocation().search.split("=")[1] /* Sacamos el numero de query */

location = (location > 0 )?+location : 1;
let previousPage = location === 1 ? 1 : location - 1;
let nextPage = location === 3? 3 : location + 1;
let paginas;

const [category, setCategory] = useState({
  loading: true,
  error: null,
  paginas:0,
  data: [],
});
const [page, setPage] = useState(1);
const handleChangePageRest = (button) => {
    setPage(page - 1)
  }

  const handleChangePageSum = () => {
    setPage(page + 1)
  }

  const handleChangePage = (number) => {
    console.log(number);
    let page = number
    setPage(page)
}
  useEffect(() => {
    console.log(page);
    fetchWithoutToken(`/categories/listCount?pagina=${page}`)
      .then(({ data ,meta }) => {
        console.log(data)
        paginas = Math.ceil(meta.count / 6); 
        paginas = Array.from(Array(paginas).keys());
        setCategory({
          ...category,
          paginas,
          loading: false,
          data: data,
        });
      })
      .catch(() => console.error);
  }, [page]);
  
  return (
    <div className='col-md-10 col-12'>
      {category.loading ? (
        <p>Cargando...</p>
      ) : category.data.categorias.length > 0 ? (
        <>
          <nav aria-label="..." className='mx-auto'>
            <ul className="pagination">
              <li className="page-item">
                <a onClick={()=>handleChangePageRest((page - 1))} className="page-link azulFuerte">Previous</a>
              </li>
              {category.paginas.map((index) => (
                <li className={`page-item ${((index + 1) === page) && "active"}`}>
                    <a key={(index+1)} className="page-link" onClick={()=>handleChangePage((index+1))}>{(index+1)}</a>
                </li>
              ))}
              
              <li className="page-item ">
                <a  onClick={()=>handleChangePageSum((page + 1))}  className="page-link azulFuerte">Next</a>
              </li>
            </ul>
          </nav>
          <table className='table' id="table-categories">
            <thead>
              <tr>
                <th>ID#</th>
                <th>Nombre</th>
                <th>Status</th>
                <th>Cantidad de Productos</th>
                <th>IR</th>
              </tr>
            </thead>
            <tbody>
            {category.data.categorias.map((cat, index) => (
              <CategoryCard {...cat} />
            ))}
            </tbody>
          </table>
        </>
      ) : (
        <div>
          <div class="alert alert-info" role="alert">
            <p> No se encontraron ninguna categoria, por favor retroceda.</p>
            <img src="https://http.dog/404.jpg" alt="gatito" />
          </div>
          
        </div>
      )}
    </div>
  )
}
