import React from "react";
import { useForm } from "react-hook-form";
import ReactDOM from 'react-dom'
import { render } from "@testing-library/react";
import { Label, Button, Icon, Intent } from "@blueprintjs/core";
import { CheckOutProvider, CheckOutConsumer, CheckOutContextState } from '../../context/checkOutContext'



type FormData = {
  firstName: string;
  email: any;
  phone: number;
  adress: string;
};


export default function InfoForm() {
  const { register, handleSubmit, errors } = useForm<FormData>();
  const onSubmit = handleSubmit((values) => {
    console.log('SUBMIT:', values);

  });



  const success = handleSubmit((values) => {

    const form = document.getElementById('msg')
    const name = values.firstName
    const email = values.email
    const phone = values.phone
    const adress = values.adress

    ReactDOM.render(
      <div>
        <CheckOutProvider>
          <CheckOutConsumer>
            {(contextData: CheckOutContextState) => {
              contextData.setInfoFormToTrue()
              return (<div></div>)
            }
            }
          </CheckOutConsumer>
        </CheckOutProvider>
        <h2>Your Info</h2>
        <div style={{ textAlign: 'center' }}>
          <Icon icon="tick-circle" intent={Intent.SUCCESS} />
          <span style={{ color: 'green' }}>  Your data have been saved!</span>
          <p><b>Name</b> {name}</p>
          <p><b>Email</b>: {email}</p>
          <p><b>Phone</b>: {phone}</p>
          <p><b>Adress</b>: {adress}</p>

        </div>
      </div>, form
    )
  })



  const errMsg = <div style={{ color: 'red', marginBottom: '10px' }}>* Please, fill in the form correctly.</div>


  return (

    <form id="infos-form" onSubmit={onSubmit} autoComplete="on">
      <Label className="bp3-fill">* Name:</Label>
      <input style={inputStyle} className="bp3-fill" name="firstName" ref={register({
        required: true,
        pattern: {
          value: /[a-z]\w+/,
          message: "Please enter a valid name"
        }
      }) as any} /> <br />
      {errors.firstName && errMsg}

      <Label className="bp3-fill">* Email:</Label>

      <input style={inputStyle} className="bp3-fill" name="email" ref={register({
        required: true,
        pattern: {
          value: /[a-z]\w+/,
          message: "Please enter a valid Email"
        }
      }) as any} /> <br />
      {errors.email && errMsg}

      <Label className="bp3-fill">Phone number:</Label>

      <input style={inputStyle} className="bp3-fill" name="phone" type="number"
        ref={register({
          required: false
        }) as any} /> <br />


      <Label className="bp3-fill">* Address:</Label>

      <input style={inputStyle} className="bp3-fill" name="adress" ref={register({
        required: true,
        pattern: {
          value: /[a-z]\w+/,
          message: "Please enter a valid Address"
        }
      }) as any} /> <br />
      {errors.adress && errMsg}

      <Button onClick={success} type="submit" style={buttonStyle}>
        Save
      </Button>
      <div id="message"></div>
    </form>
  );
}



const buttonStyle: React.CSSProperties = {
  width: '100%',
  border: '1px, grey'
};

const inputStyle: React.CSSProperties = {
  border: '1px #ccc5b9 solid',
  position: 'relative',
  width: '100%',
  height: '30%',
  marginBottom: '10px'
}
