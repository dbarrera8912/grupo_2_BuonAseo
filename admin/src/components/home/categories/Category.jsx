import React from 'react'

export const Category = ({name}) => {
    return (
        <div className="col-lg-6 mb-4 ">
            <div className="card bg-dark text-white shadow">
                <div className="card-body azulFuerteFondo" style={{textAlign : "center"}}>{name}</div>
            </div>
        </div>
    )
}
