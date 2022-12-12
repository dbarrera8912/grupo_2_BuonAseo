import React, { useEffect, useState } from 'react'
import { fetchWithoutToken } from '../../hooks/useFetch';
import { Product } from './Products';

export const ComponentProduct = () => {
    
  const [products, setProducts] = useState({
    loading: true,
    data: {},
  });
  console.log(products.data)
  useEffect(() => {
    fetchWithoutToken('/products')
      .then(({ data }) => {
        setProducts({
          loading: false,
          data: data,
        });
      })
      .catch(() => console.error);
       // eslint-disable-next-line
    }, []);
  return (
    
    <div className='w-100'>
      {products.loading ? (
        <p>LOADING...</p>
      ) : products.data.length > 0 ? (
        <div className='d-flex flex-wrap justify-content-between' style={{ gap: "10px" }}>
          {products.data.map((product, index) => (
            <Product {...product} key={product.name + index} />
            
          )
          )}
        </div>
      ): (
        <div>
          <div class="alert alert-info" role="alert">
            <p> No se encontraron mas usuarios registrados, por favor retroceda.</p>
            <img src="https://http.dog/404.jpg" alt="gatito" />
          </div>
          
        </div>
      )}
    </div>
  )
}
