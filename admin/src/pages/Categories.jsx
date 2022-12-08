import React from 'react'
import ComponentCategory from '../components/categories/ComponentCategory'

export const Categories = () => {
  return (
    <div className="container-fluid">
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Dashboard Buon Aseo | Categorias</h1>
      </div>

      <div className="row justify-content-center">
        <ComponentCategory />
      </div>
    </div>
  )
}
