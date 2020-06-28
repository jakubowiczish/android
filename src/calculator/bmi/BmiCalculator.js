import React, { Component } from 'react'
import { Redirect } from 'react-router'

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
            <BmiCalculatorForm handleSelectedActivity={this.handleSelectedActivity}
                       handleSelectedGoal={this.handleSelectedGoal}
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

}

export default BmiCalculator