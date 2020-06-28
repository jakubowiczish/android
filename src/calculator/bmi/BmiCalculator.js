import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { calculateBMI } from '../../util/APIUtils'
import Alert from 'react-s-alert'

class BmiCalculator extends Component {

  constructor (props) {
    super(props)

    this.state = {}
  }

  render () {
    if (this.props.authenticated) {
      return <Redirect
        to={{
          pathname: '/',
          state: { from: this.props.location }
        }}/>
    }

    return (
      <div className={'container'}>
        <div className="start-container parent_div_1">
          <div className="start-content child_div_2">
            <h1 className="start-title">Fill up following fields to check your BMI!</h1>
            <BmiCalculatorForm
              currentUser={this.props.currentUser}
              selected={this.state.selected}/>
          </div>
        </div>
      </div>
    )
  }
}

class BmiCalculatorForm extends Component {
  constructor (props) {
    super(props)
  }

  handleSubmit (values, setSubmitting) {
    calculateBMI(values)
      .then(() => {
        Alert.success('Successful calculation of BMI')
      }).catch(error => {
      Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!')
    }).finally(() => {
      setSubmitting(false)
    })
  }

  render () {
    const heightTest = /^[4-9][0-9]$|^1[0-9][0-9]$|^2[0-4][0-9]$|^250$/i
    const weightTest = /^[3-9][0-9]$|^[1-2][0-9][0-9]$|^300$/i

    return (
      <Formik
        initialValues={{
          height: '',
          weight: '',
        }}
        validate={values => {
          let errors = {}
          if (values.height === '') {
            errors.height = 'Height required'
          } else if (!heightTest.test(values.height)) {
            errors.height = 'Invalid height - Correct value form 40cm - 250cm'
          }
          if (values.weight === '') {
            errors.weight = 'Weight required'
          } else if (!weightTest.test(values.weight)) {
            errors.weight = 'Invalid weight - Correct value form 30kg - 300kg'
          }
          return errors
        }}
        onSubmit={(values, { setSubmitting }) => {
          this.handleSubmit(values, setSubmitting)
        }}
      >
        {({ touched, errors, isSubmitting }) => (
          <Form>
            <div className="form-group field">
              <label htmlFor="height">Height in cm</label>
              <Field
                type="text"
                name="height"
                placeholder="Enter height"
                className={`form-control ${
                  touched.height && errors.height ? 'is-invalid' : ''
                }`}
              />
              <ErrorMessage
                component="div"
                name="height"
                className="invalid-feedback"
              />
            </div>
            <div className="form-group field">
              <label htmlFor="weight">Weight in kg</label>
              <Field
                type="weight"
                name="weight"
                placeholder="Choose weight"
                className={`form-control ${
                  touched.weight && errors.weight ? 'is-invalid' : ''
                }`}
              />
              <ErrorMessage
                component="div"
                name="weight"
                className="invalid-feedback"
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary btn-block"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Please wait...' : 'Submit'}
            </button>
          </Form>
        )}
      </Formik>
    )
  }

}

export default BmiCalculator