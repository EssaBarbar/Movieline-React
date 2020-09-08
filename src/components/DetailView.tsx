import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { products } from "../products"
import { Product } from "../products"
import { Button } from '@blueprintjs/core'
import { productsContainer, productCards, poster, TitleLink } from '../css'
import { CartConsumer, CartContextState } from '../context/cartContext'

interface Params {
    id: string
}

interface Props extends RouteComponentProps<Params> { }

const productList: Product[] = products

function DetailView(props: Props) {
    const id = props.match.params.id
    const numberId = parseFloat(id)

    return (
        <div style={productsContainer}>
            {productList.map((product) => {
                if (product.id === numberId)
                    return (
                        <div key={product.id} style={productCards}>
                            <h1 style={TitleLink}>{product.title}</h1>
                            <p>{product.fullDescription}</p>
                            <img src={require("./../assets/" + product.img)} style={poster} className='movieImg' />
                            <h3>Köp: {product.price} SEK</h3>
                            <CartConsumer>
                                {(contextData: CartContextState) => {
                                    return (
                                        <Button onClick={() => contextData.addProductToCart(product)}>Add to cart</Button>
                                    )
                                }}
                            </CartConsumer>
                        </div>
                    )
            })}
        </div>
    )
};

export default DetailView