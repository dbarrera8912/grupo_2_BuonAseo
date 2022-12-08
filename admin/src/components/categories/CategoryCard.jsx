import React from 'react'
export const CategoryCard = ({ id, name,totalProducts,status,createdAt }) => {
    return(
        <tr>
            <td>{id}</td>
            <td>{name}</td>
            <td>{status == 1 ? "Habilitado" : "Deshabilitado"}</td>
            <td>{totalProducts}</td>
            <td><a href={`/categories/${id}`}><i class="fa-solid fa-right-to-bracket"></i></a></td>
        </tr>

    )
}