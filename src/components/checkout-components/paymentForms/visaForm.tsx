import React from 'react'
import { Button } from "@blueprintjs/core";
import Order from '../Order'

const validcardNumberRegex = RegExp(
    /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14})$/
);
const validMonthRegex = RegExp(
    /^(0[1-9]{1}|1[0-2]{1})$/
);
const validYearRegex = RegExp(
    /^(0?[0-9]|[1-9][0-9])$/
);
const validCVCRegex = RegExp(
    /^[0-9]{3}$/
);

const validateForm = (errors: any) => {
    let valid = true
    Object.values(errors).map((value: any) => value.length > 0 && (valid = false))
    return valid
}

interface State {
    showVisaForm: boolean
    title: string

    cardNumber: number
    month: number
    year: number
    cvc: number

    errors: {
        cardNumber: any
        month: any
        year: any
        cvc: any
    }
}

interface Props {
    form: (form: any) => void
    showSwishForm: boolean
    showPaypalForm: boolean
    showInfo: any
}

export default class VisaForm extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
            title: "VISA",
            showVisaForm: true,

            cardNumber: parseInt(""),
            month: parseInt(""),
            year: parseInt(""),
            cvc: parseInt(""),

            errors: {
                cardNumber: "",
                month: "",
                year: "",
                cvc: ""
            }
        }
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors

        switch (name) {
            case 'cardNumber':
                errors.cardNumber =
                    validcardNumberRegex.test(value)
                        ? ''
                        : 'Card is not valid';
                break;
            case 'month':
                errors.month =
                    validMonthRegex.test(value)
                        ? ''
                        : 'Month is not valid'
                break;
            case 'year':
                errors.year =
                    validYearRegex.test(value)
                        ? ''
                        : 'Year is not valid'
                break;
            case 'cvc':
                errors.cvc =
                    validCVCRegex.test(value)
                        ? ''
                        : 'CVC is not valid'
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
        if (validateForm(this.state.errors) && this.state.cardNumber && this.state.month && this.state.year && this.state.cvc && this.props.showInfo) {

            alert('You are valid!')

            const printVisaForm = {
                title: this.state.title,
                cardNumber: this.state.cardNumber,
                month: this.state.month,
                year: this.state.year,
                cvc: this.state.cvc
            }

            this.props.form(printVisaForm)

            this.setState({ showVisaForm: false })
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
                    this.state.showVisaForm ?
                        <div>
                            <form style={{ display: 'flex', flexDirection: 'column', width: '20%' }} onSubmit={this.handleSubmit} >
                                <label htmlFor="cardNumber">cardNumber:
                        <input name="cardNumber" type="cardNumber" onChange={this.handleChange} placeholder=" your cardnumber" autoComplete="on" />
                                    {errors.cardNumber.length > 0 &&
                                        <span style={{ color: 'red' }}>{errors.cardNumber}</span>}
                                </label>
                                <label htmlFor="month">Month:
                        <input name="month" type="text" onChange={this.handleChange} placeholder="01" autoComplete="on" />
                                    {errors.month.length > 0 &&
                                        <span style={{ color: 'red' }}>{errors.month}</span>}
                                </label>
                                <label htmlFor="year">Year:
                        <input name="year" type="year" onChange={this.handleChange} placeholder="20" autoComplete="on" />
                                    {errors.year.length > 0 &&
                                        <span style={{ color: 'red' }}>{errors.year}</span>}
                                </label>
                                <label htmlFor="cvc">CVC:
                        <input name="cvc" type="cvc" onChange={this.handleChange} placeholder="cvc" autoComplete="on" />
                                    {errors.cvc.length > 0 &&
                                        <span style={{ color: 'red' }}>{errors.cvc}</span>}
                                </label>
                                <Button type="submit" value="submit" style={buttonStyle}>Submit</Button>
                            </form>

                        </div>
                        : null
                }
                <img style={{ maxWidth: '75%', display: "flex", justifyContent: "center", margin: "auto" }}
                    src={require("./assets/visa.png")} alt="Visa" />
                <div>
                    <Order showVisaForm={this.state.showVisaForm} showSwishForm={this.props.showSwishForm} showPaypalForm={this.props.showPaypalForm} showInfo={this.props.showInfo} />
                </div>
            </div>
        )
    }
}

const buttonStyle: React.CSSProperties = {
    width: '100%',
    border: '1px, grey'
}