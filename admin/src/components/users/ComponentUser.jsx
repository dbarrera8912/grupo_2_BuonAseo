import React from 'react'
import { useEffect } from "react";
import { useState } from "react";
import { fetchWithoutToken } from "../../hooks/useFetch";
import { User } from './User';
import { useLocation } from 'react-router-dom';

export const ComponentUser = () => {
  let location = useLocation().search

  const [users, setProduct] = useState({
    loading: true,
    data: {},
    
  });
 
  useEffect(() => {
    fetchWithoutToken(`/users${location ? location : "?page=1"}&limit=6`)
      .then(({ data }) => {
        setProduct({
          loading: false,
          data: data,
        });
      })
      .catch(() => console.error);
       // eslint-disable-next-line
  }, []);

  return (
    <div className='w-100'>
      {users.loading ? (
        <p>Cargando...</p>
      ) : users.data.length > 0 ? (
        <div className='d-flex flex-wrap justify-content-between' style={{ gap: "10px" }}>
          {users.data.map((user, index) => (
            <User {...user} key={user.name + index} />
          ))}
        </div>
      ): (
        <div>
          <div class="alert alert-info" role="alert">
            <p> No se encontraron mas usuarios registrados, por favor retroceda.</p>
            <img src="https://http.dog/404.jpg" alt="gatito" />
          </div>
          
        </div>
      )}
    </div>
  )
}
