import React, { Component } from 'react'
import { Redirect } from 'react-router'
import './Start.css'
import 'react-datepicker/dist/react-datepicker.css'
import '@shwilliam/react-rubber-slider/dist/styles.css'
import StartForm from './StartForm'
class Start extends Component {
  constructor (props) {
    super(props)
    this.state = {
      active: 'BMR',
      goal: 'LOSE',
      activeChanged: false,
      goalChanged: false
    }
  }

  handleSelectedActivity = selection => {
    if (selection === this.state.active) {return}
    this.setState({ activeChanged: !this.state.activeChanged, active: selection })
  }

  handleSelectedGoal = selection => {
    if (selection === this.state.goal) { return }
    this.setState({ goalChanged: !this.state.goalChanged, goal: selection  })
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
      <div>
      <div>
        <div id="page1" className="parallax top_background">
          <section className="intro">

            <div className="title__div">

              <div className="intro__align">

                <h1 className="intro__align__title animated__h1">Start you journey</h1>
                <h2 className="intro__align__sub-title animated">Fill up a form</h2>
              </div>

            </div>

          </section>

        </div>
        <div className={"footer"}>
        </div>
        <div className="tab">
          <h1 className="start-title">Fill up starter form!</h1>
        </div>
      </div>
      <div className={'content'}>
          <div className="parallax bottom_background">
            <div>
            <h1 className="start-title">Fill up starter form!</h1>
            <StartForm handleSelectedActivity={this.handleSelectedActivity}
                       handleSelectedGoal={this.handleSelectedGoal}
                       currentUser={this.props.currentUser}
                       {...this.props}
            />
            </div>

            <div className={"footer"}>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Start