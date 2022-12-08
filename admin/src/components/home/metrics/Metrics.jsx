import React, { useState } from 'react'
import { useEffect } from 'react';
import { fetchWithoutToken } from '../../../hooks/useFetch';
import { Metric } from './Metric';

export const Metrics = () => {

  const [state, setState] = useState({
    loading: true,
    products: {
      title: "Total productos",
      color: "primary",
      icon: "fa-boxes",
      data: 0,
    },
    users: {
      title: "Usuarios registrados",
      color: "primary",
      icon: "fa-users",
      data: 0,
    },
    categories: {
      title: "Categorias activas",
      color: "primary",
      icon: "fa-folder",
      data: 0,
    },
  });

  const getData = async (endpoint) => {
    try {
      let {data} = await fetchWithoutToken(endpoint);
      setState({
        loading: false,
        products: {
          ...state.products,
          data: data.productsTotal,
        },
        users: {
          ...state.users,
          data: data.usersTotal,
        },
        categories: {
          ...state.categories,
          data: data.categoriesTotal,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData("/main/getTotals")
    //eslint-disable-next-line
  }, []);
  


  return (
    <div className="row">
        <Metric {...state.products} />
        <Metric {...state.users} />
        <Metric {...state.categories} />
      </div>
  )
}
