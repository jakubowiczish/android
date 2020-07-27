import React, { Component } from 'react'
import { createPlan } from '../util/APIUtils'
import Alert from 'react-s-alert'
import moment from 'moment'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { heightRegex, weightRegex } from '../constants/ValidationConstants'
import DatePicker from 'react-datepicker'
import carbohydratesPercentageImag from '../img/fatPercentage/carbohydratesPercentage.jpg'
import RubberSlider from '@shwilliam/react-rubber-slider'
import fatPercentageImag from '../img/fatPercentage/fatPercentage.jpg'

class StartForm extends Component {
  constructor (props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  state = {
    birthDate: new Date('01/01/1990'),
    goal: 'LOSE',
    gender: 'MALE',
    slider: 50
  }

  handleChange = date => {
    this.setState({
      startDate: date
    })
  }
  handleChangeGender = data => {
    this.setState({
      gender: data
    })
  }
  PROM = 1000
  MIN = 0.2
  handleSlider = data => {
    const fatPercentage = data / this.PROM + this.MIN
    this.setState({
      slider: fatPercentage
    })
  }

  handleSubmit (values, setSubmitting) {
    values.userId = this.props.currentUser.id
    values.fatPreferencesPercentage = this.state.slider
    createPlan(values)
      .then(() => {
        Alert.success('You\'re successfully created your first diet plan')
      })
      .catch(error => {
        Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!')
      })
      .finally(() => {
        setSubmitting(false)
      })
  }

  checkPartOfDate (partOfDate) {
    return partOfDate.length > 1 ? partOfDate : '0' + partOfDate
  }

  getFormattedDate (date) {
    const year = date.getFullYear()
    let month = (1 + date.getMonth()).toString()
    month = this.checkPartOfDate(month)
    let day = date.getDate().toString()
    day = this.checkPartOfDate(day)
    return day + '/' + month + '/' + year
  }

  render () {
    const minDate = new Date('01/01/1950')
    const maxDate = new Date(moment(new Date()).subtract(16, 'years').format('DD/MM/YYYY'))

    const { birthDate, gender, goal, slider } = this.state
    const activityLevel = this.props.selected.active

    return (
      <Formik
        initialValues={{
          birthDate: birthDate,
          gender: gender,
          height: '',
          weight: '',
          activityLevel: activityLevel,
          goal: goal
        }}
        validate={values => {
          let errors = {}
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
          values.birthDate = this.getFormattedDate(this.state.birthDate)
          values.fatPreferencesPercentage = this.state.slider
          this.handleSubmit(values, setSubmitting)
        }}
      >
        {({ touched, errors, isSubmitting }) => (
          <Form>
            <div className="form-group field">
              <label htmlFor="birthDate">Birth date</label>
              <DatePicker
                name="birthDate"
                className="form-control dateContainer"
                selected={this.state.birthDate}
                onChange={this.handleChange}
                minDate={minDate}
                maxDate={maxDate}
              />
            </div>
            <div className="form-group field">
              <label htmlFor="gender">Gender</label>
              <Field as="select"
                     name="gender"
                     value={this.state.gender}
                     onChange={e => {
                       // TODO FIX ON CHANGE IN THE WHOLE CLASS, UPDATE HEIGHT IN DATABASE AS WELL
                       this.handleChangeGender(e.target.value)
                     }}
                     className="form-control"
              >
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
              </Field>
              <ErrorMessage
                component="div"
                name="gender"
                className="invalid-feedback"
              />
            </div>
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
            <div className="form-group field">
              <label htmlFor="activityLevel">Activity Level</label>
              <Field as="select"
                     name="activityLevel"
                     className="form-control"
                     value={this.props.selected.active}
                     onChange={e => {
                       this.props.handleSelectedActivity(e.target.value)
                     }}
              >
                <option value="BMR">Basal Metabolic Rate (BMR)</option>
                <option value="SEDENTARY">Sedentary</option>
                <option value="LIGHT">Light</option>
                <option value="MODERATE">Moderate</option>
                <option value="ACTIVE">Active</option>
                <option value="VERY_ACTIVE">Very active</option>
              </Field>
            </div>
            <div className="form-group field">
              <label htmlFor="goal">Goal</label>
              <Field as="select"
                     name="goal"
                     placeholder="Choose goal"
                     className="form-control"
                     value={this.props.selected.goal}
                     onChange={e => {
                       this.props.handleSelectedGoal(e.target.value)
                     }}
              >
                <option value="GAIN">Weight gain</option>
                <option value="STAY">Weight maintenance</option>
                <option value="LOSE">Weight lose</option>
              </Field>
            </div>
            <div className={'form-group field'}>
              <label htmlFor="slider">Which food do you prefer to eat more?</label>
            </div>
            <div className={'row '}>
              <div className={'column'}>
                <img src={carbohydratesPercentageImag} width={100} alt={'Carbohydrates'}/>
              </div>
              <div className={'column'}>
                <RubberSlider width={140} value={this.state.slider} onChange={
                  this.handleSlider}/>
              </div>
              <div className={'column'}>
                <img src={fatPercentageImag} width={100} alt={'Fats'}/>
              </div>
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

export default StartForm