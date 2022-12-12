import React from 'react'
import { ComponentProduct } from '../components/products/ComponentProduct'
export const Products = () => {
  return (
    <div className="container-fluid">
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Dashboard Buon Aseo | Productos</h1>
      </div>
      
      <div className="row">
        <ComponentProduct />
      </div>
    </div>
  )
}
