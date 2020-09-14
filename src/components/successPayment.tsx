import React from 'react'
import { RouteComponentProps } from 'react-router'
import qs from 'qs'

import { loadStripe } from '@stripe/stripe-js'


let stripePromise = loadStripe('pk_test_51HMToQA2xvILlZPTCMc0fMPxYXOsu49C8DjEQqJOt7DwabOkbQ5RLd1GKPOOR8xtrytoKjxHK9uhO7H0bkMYuPsA00LjQvhr9Z');


export default class successPayment extends React.Component<RouteComponentProps, {}> {





    async componentDidMount() {
        const sessionId = qs.parse((this.props as RouteComponentProps).location.search,
            { ignoreQueryPrefix: true }).session_id as string
        const paidResult = await this.checkIfPaid(sessionId)
    }


    checkIfPaid = async (sessionId: string) => {
        // Get Stripe.js instance
        const stripe: any = await stripePromise;

        console.log(sessionId)

        // Call your backend to create the Checkout Session
        const response = await fetch('http://localhost:4000/check-if-paid', {
            method: 'POST',
            body: JSON.stringify({
                id: sessionId
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const isPaid = await response.json();
        console.log(isPaid)
        if (isPaid) {
            console.log("will add to json file")
        }
        else { console.log("you are fking spammer") }

        // When the customer clicks on the button, redirect them to Checkout.

    };

    render() {

        return (
            <div>
                hellloooooooo
            </div>
        )
    }
}