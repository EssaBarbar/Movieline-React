import React, { CSSProperties } from 'react'

interface State { }

interface Props {
    form: any
}

export default class PaymentItem extends React.Component<Props, State> {

    render() {
        return (
            <div style={{ marginBottom: "1em", display: "flex", flexDirection: "column" }}>
                <h4 style={text}>Your payment option has been approved.</h4>
                <h4 style={text} >{this.props.form.title}</h4>
                <h3 style={text}>{this.props.form.mobilePhone}</h3>
                <p style={text}>{this.props.form.email}</p>
            </div>
        )
    }
}

const text: CSSProperties = {
    margin: 0,
    marginBottom: "5px"
}