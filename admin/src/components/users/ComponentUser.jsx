import React from 'react'
import { useEffect } from "react";
import { useState } from "react";
import { fetchWithoutToken } from "../../hooks/useFetch";
import { User } from './User';

export const ComponentUser = () => {
  const [page, setPage] = useState(1);

  const handleChangePageRest = (button) => {
    console.log(button)
    users.prev && setPage(page - 1)
  }

  const handleChangePageSum = () => {
    users.next && setPage(page + 1)
  }

  const handleChangePage = (number) => {
    let page = number
    setPage(page)
  }

  let paginas;
  const [users, setProduct] = useState({
    loading: true,
    data: {},
    paginas: 0,
    prev: "",
    next: ""
  });

  useEffect(() => {
    fetchWithoutToken(`/users?page=${page}&limit=6`)
      .then((data) => {
        // eslint-disable-next-line
        paginas = Math.ceil(data.meta.total / 6);
        paginas = Array.from(Array(paginas).keys());

        setProduct({
          loading: false,
          data: data.data,
          paginas,
          prev: data.meta.prev,
          next: data.meta.next
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
          {!users.loading && users.paginas.map((index) => (
            <li className={`page-item ${page === index + 1 && "active"}`} key={index}><button onClick={() => handleChangePage(index + 1)} className="page-link">{index + 1}</button></li>
          ))}
          <li className="page-item">
            <button onClick={handleChangePageSum} className="page-link azulFuerte">Next</button>
          </li>
        </ul>
      </nav>
      {users.loading ? (
        <p>Cargando...</p>
      ) : users.data.length > 0 ? (
        <div className='d-flex flex-wrap justify-content-between' style={{ gap: "10px" }}>
          {users.data.map((user, index) => (
            <User {...user} key={user.name + index} />
          ))}
        </div>
      ) : (
        <div>
          <div class="alert alert-info" role="alert">
            <p> No se encontraron mas usuarios registrados, por favor retroceda.</p>
            <img src="https://http.dog/404.jpg" alt="gatito" />
          </div>

        </div>
      )}
      <nav aria-label="..." className='d-flex'>
        <ul className="pagination mx-auto">
          <li className="page-item">
            <button onClick={() => handleChangePageRest(this)} id="restarPage" className="page-link azulFuerte">Previous</button>
          </li>
          {!users.loading && users.paginas.map((index) => (
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
