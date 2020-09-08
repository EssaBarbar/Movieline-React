import React, { CSSProperties } from 'react'

interface State { }

interface Props {
    form: any
}

export default class PaymentItem extends React.Component<Props, State> {

    render() {
        return (
            <div style={{ marginBottom: "1em", display: "flex", flexDirection: "column" }}>
                <h4 style={text}>{this.props.form.firstName}</h4>
                <h4 style={text}>{this.props.form.email}</h4>
                <h4 style={text}>{this.props.form.mobilePhone}</h4>
                <h4 style={text}>{this.props.form.address}</h4>
            </div>
        )
    }
}

const text: CSSProperties = {
    margin: 0,
    marginBottom: "5px"
}