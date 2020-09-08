import React, { useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Button, Card, Label, MenuItem, Menu, FormGroup, InputGroup, RadioGroup, Radio, Checkbox } from "@blueprintjs/core"
import { CartConsumer, CartContextState } from '../context/cartContext'
import InfoForm from './checkout-components/FormInfo'
import DeliveryMethod, { Delivery, deliveryAlternatives } from '../components/checkout-components/Delivery'
import Payment from './checkout-components/Payment'

interface Params {
    checkout: string
}

interface State {
    selectedDelivery: Delivery
}

interface Props extends RouteComponentProps<Params> {
    form: (form: any) => void
}

export default class CheckoutView extends React.Component<Props, State> {


    constructor(props: Props) {
        super(props)
        this.state = {
            selectedDelivery: deliveryAlternatives[0]
        }
    }

    render() {
        return (
            <CartConsumer>
                {(contextData: CartContextState) => {
                    let totalPrice = 0;
                    let pricePerItem = 0;
                    return (
                        <div style={checkoutStyle} className="pt-card pt-elevation-0" >
                            <div style={cardStyle}>
                                <h2>Summary of your order:</h2>
                                <div>
                                    {
                                        contextData.cartItems.length ?
                                            contextData.cartItems.map((cartItem, index: number) => {
                                                totalPrice = totalPrice + cartItem.product.price * cartItem.quantity;
                                                pricePerItem = cartItem.product.price * cartItem.quantity;
                                                return (
                                                    <div style={summary} key={cartItem.product.id}>
                                                        <h3>{cartItem.product.title}</h3>
                                                        <p>Antal: x{cartItem.quantity}</p>
                                                        <p>{pricePerItem} SEK</p>
                                                    </div>
                                                )
                                            })
                                            :
                                            <p>No items in cart...</p>
                                    }
                                    <h3 style={{ textAlign: 'center', padding: '10px', backgroundColor: '#212121', color: 'white' }}>
                                        Total: {contextData.getTotalPrice()} SEK</h3>
                                </div>
                            </div>

                            <div style={cardStyle} id="msg">
                                <h2>Your Info</h2>
                                <div style={{ fontSize: '12px' }}>Fields with * must be filled.</div>
                                <br />
                                <InfoForm></InfoForm>
                            </div>

                            <div style={cardStyle}>
                                <h2>Delivery</h2>
                                <DeliveryMethod
                                    selectedDelivery={this.state.selectedDelivery}
                                    setSelectedDelivey={(selectedDelivery) => this.setState({ selectedDelivery })}
                                />
                            </div>

                            <div style={cardStyle}>
                                <Payment form={this.props.form} />
                                <br />
                            </div>
                            <div id="contain-all" style={{ textAlign: 'right', minWidth: '100%', padding: '2%' }}>
                                <b>Total price including sales tax and shipping: {contextData.getTotalPrice() + this.state.selectedDelivery.price} SEK</b>
                                <div id="price-inkl"></div>
                                <Button onClick={confirmOrder}>Confirm your order</Button>
                            </div>
                        </div>
                    )
                }}
            </CartConsumer>
        )
    }
};

function confirmOrder() {
    if (window.confirm('Are you sure you are done?')) {
        window.location.reload(true);
    }
}


const checkoutStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: 'row',
    flexWrap: "wrap",
    justifyContent: "center",

}


export const cardStyle: React.CSSProperties = {
    maxWidth: "60%",
    minWidth: "300px",
    flex: "1",
    margin: "0.2px",
    padding: '8px',
    border: '1px solid #487cc5'
}

const summary: React.CSSProperties = {
    textAlign: 'center'
}
