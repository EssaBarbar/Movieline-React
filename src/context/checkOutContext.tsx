import React, { createContext, Component } from 'react'






export interface ProviderState {
    validOrder: boolean
    validForm: boolean
    validPayment: boolean
}

export interface CheckOutContextState extends ProviderState {

    setInfoFormToTrue: () => void
    setPaymentFormToTrue: () => void
    setValidOrderToTrue: () => void
}

export const checkOutContext = createContext<CheckOutContextState>({
    validOrder: false,
    validForm: false,
    validPayment: false,

    setInfoFormToTrue: () => {
        console.log("Something went wrong while trying to validate your infoForm")
    },
    setPaymentFormToTrue: () => {
        console.log("Something went wrong while trying to validate your payment")
    },
    setValidOrderToTrue: () => {
        console.log("Something went wrong while validating your order")
    }
})

export const CheckOutConsumer = checkOutContext.Consumer


export class CheckOutProvider extends Component<{}, ProviderState> {
    constructor(props: {}) {
        super(props)
        this.state = {
            validForm: false,
            validPayment: false,
            validOrder: false
        }
    }
    setValidOrderToTrue = () => {
        console.log("valid order function is called ", "valid form is ",
            this.state.validForm, "valid payment is ", this.state.validPayment)

        if (this.state.validForm == true && this.state.validPayment == true) {
            this.setState({ validOrder: true })
            console.log("validOrder is true now")
        }
    }

    setInfoFormToTrue = () => {
        if (this.state.validForm === false) {

            this.setState({ validForm: true })


            console.log("info is true now", "valid form is ",
                this.state.validForm, "valid payment is ", this.state.validPayment)
        }
    }

    setPaymentFormToTrue = () => {

        if (this.state.validPayment === false) {

            this.setState({ validPayment: true })

            console.log("Payment is true now", "valid form is ",
                this.state.validForm, "valid payment is ", this.state.validPayment)
        }
    }


    render() {
        return (
            <checkOutContext.Provider value={{
                ...this.state,
                setInfoFormToTrue: this.setInfoFormToTrue,
                setPaymentFormToTrue: this.setPaymentFormToTrue,
                setValidOrderToTrue: this.setValidOrderToTrue
            }}>
                {this.props.children}
            </checkOutContext.Provider>
        )
    }
}

