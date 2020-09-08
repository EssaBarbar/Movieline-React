import React from 'react'
import PaymentItem from './paymentItem'

interface State { }

interface Props {
    forms: any
}

export default class PaymentOrder extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
    }

    get orderList() {
        if (this.props.forms.length) {
            return this.props.forms.map((form: any) => {
                return <PaymentItem key={form} form={form} />
            })
        } else {
            return <h4 style={{ color: "red" }}>Inget betalningsalternativ valt.</h4>
        }
    }

    render() {
        return (
            <div style={{ textAlign: "center" }}>
                <h3>Betalnings bekräftelse</h3>
                {this.orderList}
            </div>
        )
    }
}