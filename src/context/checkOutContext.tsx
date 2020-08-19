import React, { createContext, Component } from 'react'




export interface CheckOutContextState {
    validOrder: boolean
}


export const checkOutContext = createContext({


})

export const CheckOutConsumer = checkOutContext.Consumer


export class CheckOutProvider extends Component<{}> {

    constructor(props: {}) {
        super(props)
        this.state = {
            validOrder: true
        }
    }
    render() {
        return (
            <checkOutContext.Provider value={{
                ...this.state,
            }}>
                {this.props.children}
            </checkOutContext.Provider>
        )
    }
}

