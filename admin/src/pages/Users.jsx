import React from 'react'
import {ComponentUser} from '../components/users/ComponentUser'
import { useLocation } from 'react-router-dom';

export const Users = () => {
  let location = useLocation().search.split("=")[1] /* Sacamos el numero de query */
  location = +location
  let previousPage = location === 1 ? 1 : location - 1;
  let nextPage = location === 3? 3 : location + 1;
  return (
    <div className="container-fluid">
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Dashboard Buon Aseo | Users</h1>
      </div>

      <div className="row w-100">
      <nav aria-label="..." className='mx-auto'>
            <ul className="pagination">
              <li className="page-item">
                <a href={`?page=${previousPage}`} className="page-link azulFuerte">Previous</a>
              </li>
              <li className={`page-item ${(location === 1 || !location) && "active"}`}><a className="page-link" href="?page=1">1</a></li>
              <li className={`page-item ${location === 2 && "active" }`}><a className="page-link" href="?page=2">2</a></li>
              <li className={`page-item ${location === 3 && "active"}`}><a className="page-link" href="?page=3">3</a></li>
              <li className="page-item ">
                <a href={`?page=${nextPage}`} className="page-link azulFuerte">Next</a>
              </li>
            </ul>
          </nav>
        <ComponentUser/>
        <nav aria-label="..." className='mx-auto'>
            <ul className="pagination">
              <li className="page-item">
                <a href={`?page=${previousPage}`} className="page-link azulFuerte">Previous</a>
              </li>
              <li className={`page-item ${(location === 1 || !location) && "active"}`}><a className="page-link" href="?page=1">1</a></li>
              <li className={`page-item ${location === 2 && "active"}`}><a className="page-link" href="?page=2">2</a></li>
              <li className={`page-item ${location === 3 && "active"}`}><a className="page-link" href="?page=3">3</a></li>
              <li className="page-item">
                <a href={`?page=${nextPage}`} className="page-link azulFuerte">Next</a>
              </li>
            </ul>
          </nav>
      </div>
    </div>
  )
}
