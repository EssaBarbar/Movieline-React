import React from 'react'
import InfoItem from './infoItem'

interface State { }

interface Props {
    forms: any
}

export default class InfoOrder extends React.Component<Props, State> {

    get infoList() {
        if (this.props.forms.length) {
            return this.props.forms.map((form: any) => {
                return <InfoItem key={form} form={form} />
            })
        } else {
            return <h4 style={{ color: "red" }}>Fill your info.</h4>
        }
    }

    render() {
        return (
            <div style={{ textAlign: "center" }}>
                <h3>Received order by:</h3>
                {this.infoList}
            </div>
        )
    }
}