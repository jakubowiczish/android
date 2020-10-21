import React, { Component } from 'react'
import { Form, Button, FormGroup, Label, Input } from 'reactstrap'
import './ReactstrapLogin.css'

class ReactstrapLogin extends Component {

  render () {
    return (
      <Form className="login-form">
        <FormGroup>
          <Label>Email</Label>
          <Input type="email" placeholder="Email"/>
        </FormGroup>
        <FormGroup>
          <Label>Password</Label>
          <Input type="password" placeholder="Password"/>
        </FormGroup>

      </Form>
    )
  }

}

export default ReactstrapLogin