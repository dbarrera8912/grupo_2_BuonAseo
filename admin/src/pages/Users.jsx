import React from 'react'
import {ComponentUser} from '../components/users/ComponentUser'
export const Users = () => {
  return (
    <div className="container-fluid">
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Dashboard Buon Aseo | Users</h1>
      </div>

      <div className="row w-100">
        <ComponentUser />
      </div>
    </div>
  )
}
