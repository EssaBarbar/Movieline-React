import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { CartConsumer, ContextState } from '../context/cartContext'
import InfoForm from './checkout-components/FormInfo'
import DeliveryMethod, { Delivery, deliveryAlternatives } from '../components/checkout-components/Delivery'
import Payment from './checkout-components/Payment'

interface Params {
    checkout: string
}

interface State {
    selectedDelivery: Delivery
    info: boolean
}

interface Props extends RouteComponentProps<Params> {
    showVisaForm: boolean
    showSwishForm: boolean
    showPaypalForm: boolean
    showInfo: any
}

export default class CheckoutView extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props)
        this.state = {
            selectedDelivery: deliveryAlternatives[0],
            info: false
        }
    }

    showInfo = (info: any) => {
        this.setState({ info: info }, () => {
            console.log(this.state.info)
        })
    }

    render() {
        return (
            <CartConsumer>
                {(contextData: ContextState) => {
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
                                <InfoForm showInfo={this.showInfo} ></InfoForm>
                            </div>

                            <div style={cardStyle}>
                                <h2>Delivery</h2>
                                <DeliveryMethod
                                    selectedDelivery={this.state.selectedDelivery}
                                    setSelectedDelivey={(selectedDelivery) => this.setState({ selectedDelivery })}
                                />
                            </div>

                            <div style={cardStyle}>
                                <Payment showVisaForm={this.props.showVisaForm} showSwishForm={this.props.showSwishForm} showPaypalForm={this.props.showPaypalForm} showInfo={this.state.info} />
                                <br />
                            </div>
                            <div id="contain-all" style={{ textAlign: 'left', minWidth: '100%', padding: '2%', display: "flex", flexDirection: "column" }}>
                                <b>Shipping: {this.state.selectedDelivery.price} SEK</b>
                                <br />
                                <b>VAT 25%: {contextData.getVAT()} SEK</b>
                                <br />
                                <b>Total incl. VAT: {contextData.getTotalPrice() + this.state.selectedDelivery.price} SEK</b>
                                {/* <div id="price-inkl"></div> */}
                            </div>
                        </div>
                    )
                }}
            </CartConsumer>
        )
    }
};

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
