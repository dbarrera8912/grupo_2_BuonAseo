
import React from 'react'
export const CategoryPagination = ({ index,active }) => {

    return(
        <li className={`page-item ${((index + 1) === active) && "active"}`}>
            <a className="page-link" href={`?page=${(index+1)}`}>{(index+1)}</a>
        </li>


    )
}