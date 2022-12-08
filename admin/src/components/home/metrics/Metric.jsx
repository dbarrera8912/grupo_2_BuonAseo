import React from 'react'

export const Metric = ({title, color, icon, data}) => {
  return (
    <div className="col-md-4 mb-4 azulFuerteBorde">
    <div className={`card border-left-${color} shadow h-100 py-2`}>
      <div className="card-body">
        <div className="row no-gutters align-items-center">
          <div className="col mr-2">
            <div className={`text-xs font-weight-bold text-${color} text-uppercase mb-1`} style={{fontSize : "15px"}}>
              {title}
            </div>
            <div className="h5 mb-0 font-weight-bold text-gray-800">
              {data}
            </div>
          </div>
          <div className="col-auto">
            <i className={`fas ${icon} fa-2x text-gray-300`}></i>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}
