import React from 'react'
import { Button } from "@blueprintjs/core";
import InfoOrder from './infoOrder'

const validcardFirstNameRegex = RegExp(
  /^(?<firstchar>(?=[A-Za-z]))((?<alphachars>[A-Za-z])|(?<specialchars>[A-Za-z]['-](?=[A-Za-z]))|(?<spaces> (?=[A-Za-z])))*$/
);
const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);
const validMobileRegex = RegExp(
  /^(\+\d{1,3}[- ]?)?\d{10}$/
);
const validAdressRegex = RegExp(
  /^[#.0-9a-öA-Ö\s,-]+$/
);

const validateForm = (errors: any) => {
  let valid = true
  Object.values(errors).map((value: any) => value.length > 0 && (valid = false))
  return valid
}

interface State {
  showInfo: boolean
  hideInputForm: boolean
  forms: []

  firstName: string
  email: string
  mobilePhone: number
  address: string

  errors: {
    firstName: any
    email: any
    mobilePhone: any
    address: any
  }
}

interface Props {
  showInfo: (showInfo: any) => void
}

export default class FormInfo extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      showInfo: true,
      hideInputForm: false,

      forms: [],

      firstName: "",
      email: "",
      mobilePhone: parseInt(""),
      address: "",

      errors: {
        firstName: "",
        email: "",
        mobilePhone: "",
        address: ""
      }
    }
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors

    switch (name) {
      case 'firstName':
        errors.firstName =
          validcardFirstNameRegex.test(value)
            ? ''
            : 'Name is not valid';
        break;
      case 'email':
        errors.email =
          validEmailRegex.test(value)
            ? ''
            : 'Email is not valid'
        break;
      case 'mobilePhone':
        errors.mobilePhone =
          validMobileRegex.test(value)
            ? ''
            : 'Phone is not valid'
        break;
      case 'address':
        errors.address =
          validAdressRegex.test(value)
            ? ''
            : 'Adress is not valid'
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
    if (validateForm(this.state.errors) && this.state.firstName && this.state.email && this.state.mobilePhone && this.state.address) {

      alert('Your info is valid!')

      const printInfoForm = {
        firstName: this.state.firstName,
        email: this.state.email,
        mobilePhone: this.state.mobilePhone,
        address: this.state.address
      }
      this.form(printInfoForm)

      this.setState({ hideInputForm: true })
      this.setState({ showInfo: false })

      let info = this.state.showInfo
      this.props.showInfo(info)

    } else {
      alert("You have to fill in all inputs to confirm!")
      console.error('Invalid Form')
    }
  }

  form = (form: any) => {
    let formToFill = this.state.forms as any
    formToFill.push(form)
    this.setState({
      forms: formToFill
    }, () => {
      console.log(this.state.forms)
    })
  }

  render() {
    const { errors } = this.state
    return (
      <div>
        {
          this.state.showInfo ?
            <div>
              <form style={{ display: 'flex', flexDirection: 'column', width: '20%' }} onSubmit={this.handleSubmit} >
                <label htmlFor="firstName">Firstname:
                        <input name="firstName" type="firstName" onChange={this.handleChange} placeholder="firstname" autoComplete="on" />
                  {errors.firstName.length > 0 &&
                    <span style={{ color: 'red' }}>{errors.firstName}</span>}
                </label>
                <label htmlFor="email">Email:
                        <input name="email" type="email" onChange={this.handleChange} placeholder="you@example.com" autoComplete="on" />
                  {errors.email.length > 0 &&
                    <span style={{ color: 'red' }}>{errors.email}</span>}
                </label>
                <label htmlFor="mobilePhone">Mobilephone:
                        <input name="mobilePhone" type="mobilePhone" onChange={this.handleChange} placeholder="mobilephone" autoComplete="on" />
                  {errors.mobilePhone.length > 0 &&
                    <span style={{ color: 'red' }}>{errors.mobilePhone}</span>}
                </label>
                <label htmlFor="address">Address:
                        <input name="address" type="address" onChange={this.handleChange} placeholder="address" autoComplete="on" />
                  {errors.address.length > 0 &&
                    <span style={{ color: 'red' }}>{errors.address}</span>}
                </label>
                <Button type="submit" value="submit" style={buttonStyle}>Submit</Button>
              </form>

            </div>
            : null
        }
        {
          this.state.hideInputForm ?
            <div>
              <InfoOrder forms={this.state.forms} />
            </div>
            : null
        }
      </div>
    )
  }
}

const buttonStyle: React.CSSProperties = {
  width: '100%',
  border: '1px, grey'
}