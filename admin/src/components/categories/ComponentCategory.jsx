import React from 'react'
import { useEffect } from "react";
import { useState } from "react";
import { fetchWithoutToken } from "../../hooks/useFetch";
import {CategoryCard} from "./CategoryCard";
import  "./Category.css";
export default function ComponentCategory() {
const [category,setCategory] = useState({
  loading:true,
  data:{}
})
  useEffect(() => {
    fetchWithoutToken(`/categories/listCount`)
      .then(({ data }) => {
        console.log(data)
        setCategory({
          loading: false,
          data: data.categories,
        });
      })
      .catch(() => console.error);
       // eslint-disable-next-line
  }, []);
  return (
    <div className='col-md-10 col-12'>
      {category.loading ? (
        <p>Cargando...</p>
      ) : category.data.length > 0 ? (
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
          {category.data.map((cat, index) => (
            <CategoryCard {...cat} />
          ))}
        </table>
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
