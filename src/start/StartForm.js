import React, { Component } from 'react'
import { createPlan, getCurrentUser } from '../util/APIUtils'
import Alert from 'react-s-alert'
import moment from 'moment'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { heightRegex, weightRegex } from '../constants/ValidationConstants'
import DatePicker from 'react-datepicker'
import RubberSlider from '@shwilliam/react-rubber-slider'
import '../common/css/styles.css'
import $ from 'jquery'
import ActivityBox from './ActivitiyBox'
import GoalBox from './GoalBox'

const minDate = new Date('01/01/1950')
const maxDate = moment().subtract(16, 'years').toDate()

class StartForm extends Component {
  componentDidMount () {
    $('#rotate').click(function () {
      $('.flip-card-inner').toggleClass('tog')
      $('#rotate').hide().css({ top: '100px' })
    })

    $('#rotate2').click(function () {
      $('.flip-card-inner').toggleClass('tog')
      $('#rotate').css({ top: '-20px' }).show()
    })

    $('#rotate3').click(function () {
      $('.flip-card-inner2').toggleClass('tog')
    })
    $('#rotate4').click(function () {
      $('.flip-card-inner2').toggleClass('tog')
    })

  }

  constructor (props) {
    super(props)
    this.state = {
      birthDate: new Date('01/01/1990'),
      gender: 'MALE',
      goal: 'LOSE',
      weight: 80,
      height: 180,
      activityLevel: 'BMR',
      slider: 50,
      active: 'BMR',
      activeChanged: false,
      goalChanged: false
    }
    this.setForm()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSelectedActivity = selection => {
    if (selection === this.state.active) {return}
    this.setState({ activeChanged: !this.state.activeChanged, active: selection })
  }

  handleSelectedGoal = selection => {
    if (selection === this.state.goal) { return }
    this.setState({ goalChanged: !this.state.goalChanged, goal: selection })
  }

  PROM = 1000
  MIN = 0.2

  setForm = form => {
    let user = this.props.currentUser
    if(user.userPlan != undefined) {
      this.state = {
        birthDate: new Date(user.birthDate),
        height: user.height,
        goal: user.userPlan.goal,
        activityLevel: user.userPlan.activityLevel,
        weight: user.userPlan.currentWeight,
        gender: user.gender,
        slider: 50,
        active: 'BMR',
        activeChanged: false,
        goalChanged: false
      }
    }
  }

  handleBirthDateChange = birthDate => {
    this.setState({ birthDate: birthDate })
  }

  handleGenderChange = gender => {
    this.setState({ gender: gender })
  }

  handleWeightChange = weight => {
    this.setState({ weight: weight })
  }

  handleHeightChange = height => {
    this.setState({ height: height })
  }

  handleGoalChange = goal => {
    this.setState({ goal: goal })
    this.props.handleSelectedGoal(goal)
    this.state.goal = goal
  }

  handleActivityLevelChange = activityLevel => {
    this.setState({ activityLevel: activityLevel })
    this.props.handleSelectedActivity(activityLevel)
    this.state.activityLevel = activityLevel
  }

  handleSlider = data => {
    const fatPercentage = data / this.PROM + this.MIN
    this.setState({ slider: fatPercentage })
  }

  handleSubmit (values, setSubmitting) {
    values.userId = this.props.currentUser.id
    values.fatPreferencesPercentage = this.state.slider
    createPlan(values)
      .then(() => {
        Alert.success('You\'re successfully created your first diet plan')
        this.props.history.push('/')
      })
      .catch(error => {
        Alert.error('Something went wrong with saving your user plan')
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
    const { birthDate, gender, height, weight, goal, activityLevel, slider } = this.state

    return (
      <Formik
        enableReinitialize={true}
        initialValues={{
          birthDate: birthDate,
          gender: gender,
          height: height,
          weight: weight,
          activityLevel: activityLevel,
          goal: goal,
          slider: slider
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
            <section className="main">

              <div className={'flip-card'}>
                <div className={'flip-card-inner2'}>
                  <div className="wrap wrap--3 flip-card-front">
                    <div className="activity container3 container--3 ">
                      <button className={'info-button'} id="rotate3" type="button"/>
                      <label className={'label'} htmlFor="activityLevel">Activity Level</label>
                      <Field as="select"
                             name="activityLevel"
                             className="select-css"
                             value={this.state.activityLevel}
                             onChange={e => {
                               this.handleActivityLevelChange(e.target.value)
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
                  </div>

                  <div className="wrap wrap--3 flip-card-back">
                    <div className="activity-explain fix container3 container--3 ">
                      <button className={'revert-button'} id="rotate4" type="button"/>
                      <ActivityBox className={''}
                                   active={this.state.activityLevel ? this.state.activityLevel : undefined}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className={'footer'}>
              </div>
              <div className={'flip-card'}>
                <div className={'flip-card-inner'}>
                  <div className="wrap wrap--3 flip-card-front">
                    <div className="goal container3 container--3 ">
                      <button className={'info-button'} id="rotate" type="button"/>
                      <div className="form-group field ">
                        <label className={'label'} htmlFor="goal">Goal</label>
                        <Field as="select"
                               name="goal"
                               placeholder="Choose goal"
                               className="select-css"
                               value={this.state.goal}
                               onChange={e => {
                                 this.handleGoalChange(e.target.value)
                               }}
                        >
                          <option value="GAIN">Weight gain</option>
                          <option value="STAY">Weight maintenance</option>
                          <option value="LOSE">Weight lose</option>
                        </Field>

                      </div>
                    </div>
                  </div>
                  <div className="wrap wrap--3 flip-card-back">
                    <div className="goal-explain fix container3 container--3 ">
                      <button className={'revert-button'} id="rotate2" type="button"/>
                      <GoalBox className={''}
                               goal={this.state.goal ? this.state.goal : undefined}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="wrap wrap--1">
                <div className="height container3 container3--1">
                  <div className="form-group field">
                    <label className={'label'} htmlFor="height">Height in cm</label>
                    <Field type="text"
                           name="height"
                           value={this.state.height}
                           onChange={e => {
                             this.handleHeightChange(e.target.value)
                           }}
                           placeholder="Enter height"
                           className={` field-css form-control ${
                             touched.height && errors.height ? 'is-invalid' : ''
                           }`}
                    />
                    <ErrorMessage
                      component="div"
                      name="height"
                      className="invalid-feedback"
                    />
                  </div>
                </div>
              </div>

              <div className="wrap wrap--1">
                <div className="weight container3 container3--1">
                  <div className="form-group field">
                    <label className={'label'} htmlFor="weight">Weight in kg</label>
                    <Field type="weight"
                           name="weight"
                           value={this.state.weight}
                           onChange={e => {
                             this.handleWeightChange(e.target.value)
                           }}
                           placeholder="Choose weight"
                           className={` field-css form-control ${
                             touched.weight && errors.weight ? 'is-invalid' : ''
                           }`}
                    />
                    <ErrorMessage
                      component="div"
                      name="weight"
                      className="invalid-feedback"
                    />
                  </div>
                </div>
              </div>
              <div className="wrap wrap--1">
                <div className="birthDate container3 container3--1">
                  <div className="form-group field">
                    <label className={'label'} htmlFor="birthDate">Birth date</label>
                    <DatePicker name="birthDate"
                                className="form-control dateContainer field-css"
                                selected={this.state.birthDate}
                                onChange={this.handleBirthDateChange}
                                minDate={minDate}
                                maxDate={maxDate}
                    />
                  </div>
                </div>
              </div>

              <div className="wrap wrap--3">
                <div className="gender container3 container--3">
                  <div>
                    <div className="form-group field">
                      <label className={'label'} htmlFor="gender">Gender</label>
                      <Field as="select"
                             name="gender"
                             value={this.state.gender}
                             onChange={e => {
                               this.handleGenderChange(e.target.value)
                             }}
                             className="select-css"
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
                  </div>
                </div>
              </div>

              <div className="wrap wrap--3">
                <div className="prefer container3 container--3">
                  <div className={'form-group field'}>
                    <label className={'label'} htmlFor="slider">Which food do you prefer to eat more?</label>
                  </div>
                  <div className={'slider'}>
                    <RubberSlider width={140} value={this.state.slider} onChange={
                      this.handleSlider}/>
                  </div>
                  <div className={'Carbs'}>
                    Carbs
                  </div>
                  <div className={'Fats'}>
                    Fats
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="glow-on-hover"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Please wait...' : 'Submit'}
              </button>
            </section>
          </Form>
        )}
      </Formik>
    )
  }
}

export default StartForm