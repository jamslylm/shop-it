import {createContext, useEffect, useState} from "react"

import SHOP_DATA from '../shop-data.json'
export const ProductsContext = createContext({
  productsList: [],
  setProductsList: () => null,
})

export const ProductsProvider = ({children}) => {
  const [productsList, setProductsList] = useState(SHOP_DATA)
  const value = {productsList, setProductsList}

  useEffect(() => {
    setProductsList(SHOP_DATA)
  }, [])

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
}