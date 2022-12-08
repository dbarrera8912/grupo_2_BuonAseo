import React from 'react'
import { useEffect } from "react";
import { useState } from "react";
import { fetchWithoutToken } from "../../hooks/useFetch";
import { User } from './User';

export const ComponentUser = () => {
  const [users, setProduct] = useState({
    loading: true,
    data: {},
  });

  useEffect(() => {
    fetchWithoutToken("/users?limit=6")
      .then(({ data }) => {
        console.log(data[0].name)
        setProduct({
          loading: false,
          data: data,
        });
      })
      .catch(() => console.error);
  }, []);

  return (

    <div className='w-100'>
      {users.loading ? (
        <p>Cargando...</p>
      ) : (


        <div className='d-flex flex-wrap justify-content-between' style={{ gap: "10px" }}>
          {users.data.map((user, index) => (
            <User {...user} key={user.name + index} />
          ))}
        </div>


      )}
    </div>
  )
}
