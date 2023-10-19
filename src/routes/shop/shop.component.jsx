import {ProductsContext} from "../../contexts/products.context"
import {useContext} from "react"
import {ProductCard} from "../../components/product-card/product-card.component"
import './shop.styles.scss'

const Shop = () => {
  const {productsList} = useContext(ProductsContext)

  return (
    <div className={'products-container'}>
      {productsList.map((product) => (
        <ProductCard key={product.id} product={product}/>
      ))}
    </div>
  )
}

export default Shop