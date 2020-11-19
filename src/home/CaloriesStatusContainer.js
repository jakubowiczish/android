import React, { Component } from 'react'
import './CaloriesStatusContainer.css'
import ProgressBar from 'react-bootstrap/ProgressBar'

class CaloriesStatusContainer extends Component {
  calculateGreenPartProgressBarPercentage () {
    if (this.props.caloriesConsumed <= this.props.dailyCaloricDemand) {
      return this.props.caloriesConsumed / this.props.dailyCaloricDemand * 100.0
    }
    return this.props.dailyCaloricDemand / this.props.caloriesConsumed * 100.0
  }

  calculateRedPartProgressBarPercentage () {
    if (this.props.caloriesConsumed > this.props.dailyCaloricDemand) {
      return 100.0 - (this.props.dailyCaloricDemand / this.props.caloriesConsumed * 100.0)
    }
    return 0.0
  }

  getGreenPartProgressBarLabel () {
    if (this.calculateGreenPartProgressBarPercentage() < 10.0) {
      return ''
    }
    if (this.props.caloriesConsumed <= this.props.dailyCaloricDemand) {
      return this.props.caloriesConsumed + 'kcal'
    }
    return this.props.dailyCaloricDemand + 'kcal'
  }

  getRedPartProgressBarLabel () {
    if (this.calculateRedPartProgressBarPercentage() < 10.0) {
      return ''
    }
    if (this.props.caloriesConsumed > this.props.dailyCaloricDemand) {
      return (this.props.caloriesConsumed - this.props.dailyCaloricDemand) + 'kcal'
    }
    return ''
  }

  render () {
    return (
      <div className='calories-status-container'>
        <h2 className='calories-status-header home-h2-font'>Calories consumed: {this.props.caloriesConsumed}/{this.props.dailyCaloricDemand} kcal</h2>
        <div className='progress-bar-container'>
          <ProgressBar className='calories-progress-bar'>
            <ProgressBar striped variant='success' label={this.getGreenPartProgressBarLabel()} now={this.calculateGreenPartProgressBarPercentage()} />
            <ProgressBar striped variant='danger' label={this.getRedPartProgressBarLabel()} now={this.calculateRedPartProgressBarPercentage()} />
          </ProgressBar>
        </div>
      </div>
    )
  }
}

export default CaloriesStatusContainer
