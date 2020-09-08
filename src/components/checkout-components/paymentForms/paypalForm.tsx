import React from 'react'
import { Button } from "@blueprintjs/core";

const validEmailRegex = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);

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
    showPaypalForm: boolean
    email: string
    mobilePhone: number;
    errors: {
        email: string,
        mobilePhone: any
    }
};

interface Props {
    form: (form: any) => void
}

export default class PaypalForm extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            title: "Paypal",
            showPaypalForm: true,
            email: "",
            mobilePhone: parseInt(""),
            errors: {
                email: "",
                mobilePhone: ""
            }
        }
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors

        switch (name) {
            case 'email':
                errors.email =
                    validEmailRegex.test(value)
                        ? ''
                        : 'Email is not valid';
                break;
            case 'mobilePhone':
                errors.mobilePhone =
                    validMobileRegex.test(value)
                        ? ''
                        : 'Number is not valid'
                break;
            default:
                break;
        }
        this.setState((prevState) => ({
            ...prevState,
            errors, [name]: value
        }))
    }

    handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (validateForm(this.state.errors) && this.state.email != "" && this.state.mobilePhone) {
            console.info('Valid Form')
            alert('You are valid! Check your mailbox.')

            const printPaypalForm = {
                title: this.state.title,
                email: this.state.email,
                mobilePhone: this.state.mobilePhone
            }
            this.props.form(printPaypalForm)
            this.setState({ showPaypalForm: false })
        } else {
            console.error('Invalid Form')
        }
    }

    render() {
        const { errors } = this.state
        return (
            <div>
                {
                    this.state.showPaypalForm ?
                        <div>
                            <form style={{ display: 'flex', flexDirection: 'column', width: '20%' }} onSubmit={this.handleSubmit} >
                                <label htmlFor='email'>Email:
                    <input name="email" type="email" onChange={this.handleChange} value={this.state.email} placeholder="you@example.com" autoComplete="on" />
                                    {errors.email.length > 0 &&
                                        <span style={{ color: 'red' }}>{errors.email}</span>}
                                </label>
                                <label htmlFor="mobilePhone">Mobile:
                    <input name="mobilePhone" type="mobilePhone" onChange={this.handleChange} placeholder="mobilnummer" autoComplete="on" />
                                    {errors.mobilePhone.length > 0 &&
                                        <span style={{ color: 'red' }}>{errors.mobilePhone}</span>}
                                </label>
                                <Button type="submit" value="submit" style={buttonStyle}>Submit</Button>
                            </form>
                        </div>
                        : null
                }
                <a href="https://www.paypal.com/se/signin"><img style={{ maxWidth: '50%' }}
                    src={require("./assets/paypal.png")} alt="Paypal" /></a>
            </div>
        )
    }
}

const buttonStyle: React.CSSProperties = {
    width: '100%',
    border: '1px, grey'
}