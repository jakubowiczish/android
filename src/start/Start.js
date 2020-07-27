import React, { Component } from 'react'
import { Redirect } from 'react-router'
import './Start.css'
import 'react-datepicker/dist/react-datepicker.css'
import '@shwilliam/react-rubber-slider/dist/styles.css'
import ActivityBox from './ActivitiyBox'
import StartForm from './StartForm'

class Start extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selected: { active: 'BMR', goal: 'LOSE' },
    }
  }

  handleSelectedActivity = selection => {
    this.setState({ selected: { active: selection, goal: this.state.selected.goal } })
  }

  handleSelectedGoal = selection => {
    this.setState({ selected: { active: this.state.selected.active, goal: selection } })
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
            <h1 className="start-title">Fill up starter form!</h1>
            <StartForm handleSelectedActivity={this.handleSelectedActivity}
                       handleSelectedGoal={this.handleSelectedGoal}
                       currentUser={this.props.currentUser}
                       selected={this.state.selected}/>
          </div>
        </div>
        <ActivityBox className={'parent_div_1'} selected={this.state.selected}/>
      </div>
    )
  }
}

export default Start