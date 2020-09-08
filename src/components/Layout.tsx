import React from 'react'
import Nav from './Navbar'
import ViewContainer from './ViewContainer'
import { CartProvider } from '../context/cartContext'


export default class Layout extends React.Component {

    render() {
        return (
            <div>
                <CartProvider>
                    <Nav />
                    <ViewContainer />
                </CartProvider>
            </div>
        )
    }
};