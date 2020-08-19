import React from 'react'
import { products } from "../products"
import { Product } from "../products"
import { Button } from '@blueprintjs/core'
import { Link } from 'react-router-dom'
import { CartConsumer, ContextState } from '../context/cartContext'
import { productsContainer, productCards, poster, TitleLink } from '../css'

const productList: Product[] = products

export default class MasterView extends React.Component {

    get loopThis() {
        if (productList.length) {
            return productList.map((product) => {
                return (

                    <div key={product.id} style={productCards}>
                        <Link to={"/products/" + product.id}>
                            <h1 style={TitleLink}>{product.title}</h1>
                        </Link>

                        <p>{product.descreption}</p>
                        <img src={require("./../assets/" + product.img)} alt="pic" style={poster} className='movieImg' />
                        <h3>Köp: {product.price} SEK</h3>
                        <CartConsumer>
                            {(contextData: ContextState) => {
                                return (
                                    <Button onClick={() => contextData.addProductToCart(product)}>Add to cart</Button>
                                )
                            }}
                        </CartConsumer>
                    </div >

                )
            })
        } else {
            return "No products"
        }
    };

    render() {
        return <div style={productsContainer}>
            {this.loopThis}
        </div>
    }
}