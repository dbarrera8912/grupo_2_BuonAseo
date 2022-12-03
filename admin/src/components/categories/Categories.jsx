import React from "react";
//import { useEffect } from "react";
import { useState } from "react";
//import { fetchWithoutToken } from "../../hooks/useFetch";
import { Category } from "./Category";

export const Categories = () => {
  const [categories, /* setCategories */] = useState({
    loading: true,
    error: null,
    data: [],
  });

  /* useEffect(() => {
    fetchWithoutToken("/categories").then((response) => {
      if (response.ok) {
        const { data } = response;
        setCategories({
          ...categories,
          loading: false,
          data: data,
        });
      } else {
        setCategories({
          ...categories,
          error: response.error,
        });
      }
    });
  }, []);
 */
  return (
    <div className="col-lg-6 mb-4">
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h5 className="m-0 font-weight-bold text-gray-800">Categorías</h5>
        </div>
        <div className="card-body">
          <div className="row">
            {categories.data.map((category, index) => (
              <Category {...category} key={category.name + index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
