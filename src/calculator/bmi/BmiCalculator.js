import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { calculateBMI } from '../../util/APIUtils'
import Alert from 'react-s-alert'
import bmrActiveImg from '../../img/activities/bmr-active-img.jpg'
import sedentaryActiveImg from '../../img/activities/sedentary-active-img.jpg'
import lightActiveImg from '../../img/activities/light-active-img.jpg'
import moderateActiveImg from '../../img/activities/moderate-active-img.jpg'
import activeActiveImg from '../../img/activities/active-active-img.jpg'
import veryActiveActiveImg from '../../img/activities/very_active-active-img.jpg'
import loseGoalImg from '../../img/activities/lose-goal-img.jpg'
import stayGoalImg from '../../img/activities/stay-goal-img.jpg'
import gainGoalImg from '../../img/activities/gain-active-img.jpg'

class BmiCalculator extends Component {
  constructor (props) {
    super(props)

    this.state = {
      weightRange: ''
    }
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
              selected={this.state.selected}
            />
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
      }).catch(() => {
      Alert.error('Something went wrong with calculating your BMI')
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
          weight: ''
        }}
        validate={values => {
          const errors = {}
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
    const { selected } = this.props
    if (selected.active === undefined) {
      selected.active = 'BMR'
    }

    if (selected.goal === undefined) {
      selected.goal = 'LOSE'
    }
    let imageActive
    let imageGoal
    let activeDescription
    let goalDescription
    let header = 'Activity level: ' + this.parseActivityLevel(selected.active)
    let headerGoal = 'Goal: ' + this.parseHeader(selected.goal)
    switch (selected.active) {
      case 'BMR':
        imageActive = bmrActiveImg
        activeDescription = 'The basal metabolic rate (BMR) is the amount of energy needed while resting in a temperate environment when the digestive system is inactive.'
        break
      case 'SEDENTARY':
        imageActive = sedentaryActiveImg
        activeDescription = 'You don\'t like to be in a hurry :) If you have sedentary work or your favorite exercise is reaching the remote this level is for you.'
        break
      case 'LIGHT':
        imageActive = lightActiveImg
        activeDescription = 'If you exercise 1-3 times per week and prefer light workouts this is your level.'
        break
      case 'MODERATE':
        imageActive = moderateActiveImg
        activeDescription = 'You are very active person. Exercise 4-5 times per week aren\'t scary for you.'
        break
      case 'ACTIVE':
        imageActive = activeActiveImg
        activeDescription = 'Gym veterans.You like very intense trainings or you do your daily exercise.'
        break
      case 'VERY_ACTIVE':
        imageActive = veryActiveActiveImg
        activeDescription = 'Level for fit lovers and physical workers. If you could you would sleep in the gym.'
        break
      default:
        imageActive = bmrActiveImg
        activeDescription = 'The basal metabolic rate (BMR) is the amount of energy needed while resting in a temperate environment when the digestive system is inactive.'
    }
    switch (selected.goal) {
      case 'LOSE':
        imageGoal = loseGoalImg
        goalDescription = 'To achieve your goal we have to cut 100-300 calories from your basic caloric level that you would enter your caloric deficit.'
        break
      case 'STAY':
        imageGoal = stayGoalImg
        goalDescription = 'To maintain your weight we calculate exactly how much calories do you need to consume during the day'
        break
      case 'GAIN':
        imageGoal = gainGoalImg
        goalDescription = 'To gain wight we have to add 100-300 calories to your basic caloric level.The calorific increase allowed to build additional muscle mass'
        break
      default:
        imageGoal = loseGoalImg
        goalDescription = 'To achieve your goal we have to cut 100-300 calories from your basic caloric level that you would enter your caloric deficit.'
    }

    return (
      <div className="start-container">
        <div className="start-content child_div_1">
          <h2 className="start-title">{header}</h2>
          <img src={imageActive} height={300} alt={'describing activity level'}/>
          <p className={'field'}>{activeDescription}</p>
          <h2 className="start-title">{headerGoal}</h2>
          <img src={imageGoal} height={150} alt={'describing goal'}/>
          <p>{goalDescription}</p>
        </div>
      </div>)
  }
}

export default BmiCalculator
