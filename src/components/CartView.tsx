import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { CartConsumer, ContextState } from '../context/cartContext'
import { Button } from '@blueprintjs/core'

interface Params {
    cart: string
}

interface Props extends RouteComponentProps<Params> { }

function CartView(props: Props) {
    const cart = props.match.params.cart
    
    return (
        <CartConsumer>
            {(contextData: ContextState) => {
                let totalPrice = 0;
                return (
                    <div style={cartContainer}>
                        <h1 style={cartTitle}>Cart</h1>
                        {
                            contextData.cartItems.length ?
                                contextData.cartItems.map((cartItem, index: number) => {
                                    totalPrice = totalPrice + cartItem.product.price * cartItem.quantity;
                                    return (
                                        <div key={cartItem.product.id} style={singleCartItem}>
                                            <h3 style={childrenFlex}>Quantity: <br/> x {cartItem.quantity}</h3>
                                            <h3 style={childrenFlex}>{cartItem.product.title}</h3>
                                            <img src={require("./../assets/" + cartItem.product.img)} alt="pic" style={childrenFlex} />
                                            <h3 style={childrenFlex}>Price for single item: {cartItem.product.price} SEK</h3>
                                            <div style={childrenFlex}>
                                             <Button style={deleteButton} className="bp3-intent-danger" onClick={() => contextData.deletefromcart(cartItem.product, index)}>Delete from cart</Button>
                                            </div>
                                            
                                        </div>
                                    ) 
                                } 
                                ) 
                                :
                                (<div style={{textAlign: 'center'}}>
                                    <h4>No items in cart...</h4>
                                    <img src="https://shop.myfelt.com/skin/frontend/rwd/myfelt-2018/images/cart-noitem-mobile.gif" alt="empty-cart-gif"/>

                                </div>)
                        }
                        <h1 style={{textAlign: 'center', borderBottom: 'grey solid 1px'}}>{contextData.cartItems.length ? "Your current saldo: " + totalPrice : "Your current saldo: 0"} SEK</h1> 
                        <div style={{textAlign: 'center'}}>Check your order. If everything is right than proceed to {'>>'}
                        <Link to='/checkout/'>
                            <Button className="bp3-minimal"><b>CHECKOUT</b></Button>
                        </Link>
                        </div>
                    </div>
                )
            }}
        </CartConsumer>
    )
};

export default CartView

const cartTitle: React.CSSProperties = {
    textAlign: 'center'
}

const cartContainer: React.CSSProperties = {
    width: '100%',
    height: 'auto',
}

const singleCartItem: React.CSSProperties = {
    width: '100%',
    height: '20%',
    display: 'flex',
    borderTop: 'grey solid 1px',
    flexWrap: 'wrap'
}


const childrenFlex: React.CSSProperties = {
    padding: '2%',
    margin: '2%',
    width: '200px',
    borderLeft: 'grey solid 1px'
}

const deleteButton: React.CSSProperties = {
    padding: '2%',
    width: '120px',
    height: '60px',
    alignItems: 'center'
}