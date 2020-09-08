import React, { createContext, Component } from 'react'
import { Product } from '../products'

interface CartItem {
    product: Product,
    quantity: number
}

export interface ProviderState {
    cartItems: CartItem[]
}

export interface CartContextState extends ProviderState {
    addProductToCart: (product: Product) => void
    deletefromcart: (product: Product, index: number) => void
    countProductsInCart: () => void
    getTotalPrice: () => number
}

export const CartContext = createContext<CartContextState>({
    cartItems: [],
    addProductToCart: (product: Product) => {
        console.log(("Something went wrong with adding " + product.title + "to cart")
        )
    },
    deletefromcart: (product: Product) => {
        console.log(("Something went wrong while deleting " + product.title + "to cart")
        )
    },
    countProductsInCart: () => {
        console.log("An error occured while trying to count the number of the products, check your log")
    },
    getTotalPrice: () => 0
})

export const CartConsumer = CartContext.Consumer

export class CartProvider extends Component<{}, ProviderState> {

    constructor(props: {}) {
        super(props)
        this.state = {
            cartItems: []
        }
    }

    addProductToCart = (product: Product) => {
        const clonedCart: CartItem[] = Object.assign([], this.state.cartItems)

        const foundProductIndex: number = this.state.cartItems.findIndex((produktToFind) => {
            return product.id === produktToFind.product.id
        })
        if (foundProductIndex === -1) { clonedCart.push({ product: product, quantity: 1 }) }
        else {
            clonedCart[foundProductIndex].quantity++

        }
        this.setState({ cartItems: clonedCart })
    }

    deletefromcart = (product: Product, index: number) => {
        const clonedCart: CartItem[] = Object.assign([], this.state.cartItems)

        const foundProdIndex: number = this.state.cartItems.findIndex((productToFind) => {
            return product.id === productToFind.product.id
        })

        if (foundProdIndex === -1 || clonedCart[foundProdIndex].quantity <= 1) {
            clonedCart.splice(index, 1, { product: product, quantity: -1 })
            clonedCart.splice(index, 1)
        } else {
            clonedCart[foundProdIndex].quantity--
        }

        this.setState({ cartItems: clonedCart })
    }

    countProductsInCart = () => {
        let totalQuantityToShow: number = 0
        this.state.cartItems.map((cartItemObject) => {
            return (
                (
                    totalQuantityToShow += cartItemObject.quantity
                ))
        })
        return totalQuantityToShow
    }

    getTotalPrice = () => {

        let totalPrice: number = 0
        this.state.cartItems.map((product) => {
            totalPrice = totalPrice + product.product.price * product.quantity
        })
        return totalPrice
    }

    render() {
        return (
            <CartContext.Provider value={{
                ...this.state,
                addProductToCart: this.addProductToCart,
                deletefromcart: this.deletefromcart,
                countProductsInCart: this.countProductsInCart,
                getTotalPrice: this.getTotalPrice
            }}>
                {this.props.children}
            </CartContext.Provider>
        )
    }
}