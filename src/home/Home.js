import React, { Component } from 'react'
import './Home.css'
import Alert from 'react-s-alert'
import { getUserCaloriesStatus } from '../util/APIUtils'

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      caloriesConsumed: '',
      dailyCaloricDemand: ''
    }
    if (this.props.authenticated) {
      this.getUserCaloriesStatus()
    }
  }

  getUserCaloriesStatus () {
    getUserCaloriesStatus()
      .then(response => {
        this.setState({
          caloriesConsumed: response.caloriesConsumed,
          dailyCaloricDemand: response.dailyCaloricDemand
        })
      }
      ).catch(error => {
        Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!')
      })
  }

  render () {
    return (
      <div className='home-container'>
        <div className='container'>
          <div className='graf-bg-container'>
            <div className='graf-layout'>
              <div className='graf-circle' />
              <div className='graf-circle' />
              <div className='graf-circle' />
              <div className='graf-circle' />
              <div className='graf-circle' />
              <div className='graf-circle' />
              <div className='graf-circle' />
              <div className='graf-circle' />
              <div className='graf-circle' />
              <div className='graf-circle' />
              <div className='graf-circle' />
            </div>
          </div>
          <h1 className='home-title'>Master Diet</h1>
          {this.props.authenticated
            ? <h2 className='calories-status'>Calories consumed: {this.state.caloriesConsumed}/{this.state.dailyCaloricDemand} kcal</h2>
            : ''}
        </div>
      </div>
    )
  }
}

export default Home
