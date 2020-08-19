import React from 'react'
import { Button } from "@blueprintjs/core";
import Order from '../Order'

const validMobileRegex = RegExp(
    /^(\+\d{1,3}[- ]?)?\d{10}$/
);

const validateForm = (errors: any) => {
    let valid = true
    Object.values(errors).map((value: any) => value.length > 0 && (valid = false))
    return valid
}

interface State {
    title: string
    showSwishForm: boolean

    mobilePhone: number
    errors: {
        mobilePhone: any
    }
};

interface Props {
    form: (form: any) => void
    showVisaForm: boolean
    showPaypalForm: boolean
    showInfo: any
}

export default class SwishForm extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            title: "Swish",
            showSwishForm: true,

            mobilePhone: parseInt(""),

            errors: {
                mobilePhone: ""
            }
        }
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const { name, value } = event.target
        let errors = this.state.errors

        errors.mobilePhone = validMobileRegex.test(value) ? '' : 'Number is not valid';

        this.setState((prevState) => ({
            ...prevState,
            errors, [name]: value
        }))
    }

    handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (validateForm(this.state.errors) && this.state.mobilePhone && this.props.showInfo) {

            alert('You are valid! Open your BankID application.')

            const printSwishForm = {
                title: this.state.title,
                mobilePhone: this.state.mobilePhone
            }
            this.props.form(printSwishForm)

            this.setState({ showSwishForm: false })
        } else {
            alert("You have to fill in all inputs to confirm!")
            console.error('Invalid Form')
        }
    }

    render() {
        const { errors } = this.state
        return (
            <div>
                {
                    this.state.showSwishForm ?
                        <div>
                            <form style={{ display: 'flex', flexDirection: 'column', width: '20%' }} onSubmit={this.handleSubmit} >
                                <label htmlFor="mobilePhone">Mobile:
                        <input name="mobilePhone" type="mobilePhone" onChange={this.handleChange} placeholder="mobilephone" autoComplete="on" />
                                    {errors.mobilePhone.length > 0 &&
                                        <span style={{ color: 'red' }}>{errors.mobilePhone}</span>}
                                </label>
                                <Button type="submit" value="submit" style={buttonStyle}>Submit</Button>
                            </form>

                        </div>
                        : null
                }
                <img style={{ maxWidth: '75%', display: "flex", justifyContent: "center", margin: "auto" }}
                    src={require("./assets/swish.png")} alt="Swish" />
                <div>
                    <Order showVisaForm={this.props.showVisaForm} showSwishForm={this.state.showSwishForm} showPaypalForm={this.props.showPaypalForm} showInfo={this.props.showInfo}/>
                </div>
            </div>
        )
    }
}

const buttonStyle: React.CSSProperties = {
    width: '100%',
    border: '1px, grey'
}