import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { calculateBMI } from '../../util/APIUtils'
import Alert from 'react-s-alert'
import bmiLevelsImg from '../../img/bmi/bmi_levels.jpg'
import { heightRegex, weightRegex } from '../../constants/ValidationConstants'

class BmiCalculator extends Component {
  constructor (props) {
    super(props)

    this.state = {
      bmi: ''
    }
  }

  handleShowingBmiLevel = bmiParameter => {
    this.setState({ bmi: bmiParameter })
  }

  render () {
    if (this.props.authenticated) {
      return <Redirect
        to={{
          pathname: '/',
          state: { from: this.props.location }
        }}
      />
    }

    return (
      <div className='container'>
        <div className='start-container parent_div_1'>
          <div className='start-content child_div_2'>
            <h1 className='start-title'>Fill up following fields to check your BMI!</h1>
            <BmiCalculatorForm
              currentUser={this.props.currentUser}
              handleShowingBmiLevel={this.handleShowingBmiLevel}
            />
          </div>
        </div>
        <WeightRangeBox className={'parent_div_1'} bmi={this.state.bmi}/>
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
      .then(res => {
        Alert.success('Successful calculation of BMI')
        this.props.handleShowingBmiLevel(res.bmi)
      }).catch(() => {
      Alert.error('Something went wrong with calculating your BMI')
    }).finally(() => {
      setSubmitting(false)
    })
  }

  render () {
    return (
      <Formik
        initialValues={{
          height: '',
          weight: ''
        }}
        validate={values => {
          const errors = {}
          if (values.height === '') {
            errors.height = 'Height required'
          } else if (!heightRegex.test(values.height)) {
            errors.height = 'Invalid height - Correct value form 40cm - 250cm'
          }
          if (values.weight === '') {
            errors.weight = 'Weight required'
          } else if (!weightRegex.test(values.weight)) {
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
            <div className='form-group field'>
              <label htmlFor='height'>Height in cm</label>
              <Field
                type='text'
                name='height'
                placeholder='Enter height'
                className={`form-control ${
                  touched.height && errors.height ? 'is-invalid' : ''
                }`}
              />
              <ErrorMessage
                component='div'
                name='height'
                className='invalid-feedback'
              />
            </div>
            <div className='form-group field'>
              <label htmlFor='weight'>Weight in kg</label>
              <Field
                type='weight'
                name='weight'
                placeholder='Choose weight'
                className={`form-control ${
                  touched.weight && errors.weight ? 'is-invalid' : ''
                }`}
              />
              <ErrorMessage
                component='div'
                name='weight'
                className='invalid-feedback'
              />
            </div>
            <button
              type='submit'
              className='btn btn-primary btn-block'
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

class WeightRangeBox extends Component {

  render () {
    const bmi = this.props.bmi

    return (
      <div className="start-container">
        <div className="start-content child_div_1">
          <h2 className="start-title">BMI</h2>
          <img src={bmiLevelsImg} height={300} alt={'BMI Image'}/>
          <p>Calculated BMI: {bmi}</p>
        </div>
      </div>)
  }
}

export default BmiCalculator
