import React, { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { Alignment, Button, Navbar } from "@blueprintjs/core";
import { CartConsumer, ContextState } from '../context/cartContext'

export default function viewNavBar() {
    return (
        <div>
            {<Navbar style={styleNavBar}>

                <Navbar.Group align={Alignment.LEFT} >
                    <Link to='/'>
                        <Navbar.Heading style={styleHeading}>MovieLine</Navbar.Heading>
                    </Link>
                </Navbar.Group>

                <Navbar.Group align={Alignment.RIGHT} style={cartContainer}>
                    <Link to='/cart/'>
                        <Button className="bp3-button bp3-minimal bp3-icon-shopping-cart" style={cartChildren} />
                        <CartConsumer>
                            {(contextData: ContextState) => {
                                return (
                                    < span style={cartChildren} > {contextData.countProductsInCart()}</span>)
                            }}
                        </CartConsumer>
                    </Link>
                </Navbar.Group>

            </Navbar>}
        </div >
    )
};


const styleNavBar: CSSProperties = {
    backgroundColor: "#212121",
    height: "63PX",
    width: "100%",
    position: "sticky",
}

const cartChildren: CSSProperties = {
    width: '50%',
    color: 'white'
}

const styleHeading: CSSProperties = {
    display: "inline-block",
    alignItems: "right",
    fontWeight: "bold",
    fontSize: "30px",
    color: "#FFFFFF",
    margin: "8px",
    marginTop: "17px"
}

const cartContainer: CSSProperties = {
    width: '40%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: '7px',
    marginRight: '3%'
}