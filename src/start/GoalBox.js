import React, { Component } from 'react'
import loseGoalImg from '../img/activities/lose-goal-img.jpg'
import stayGoalImg from '../img/activities/stay-goal-img.jpg'
import gainGoalImg from '../img/activities/gain-active-img.jpg'


function getImageAndDescriptionForGoal (goal) {
  let imageGoal, goalDescription

  switch (goal) {
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

  return [imageGoal, goalDescription]
}

class GoalBox extends Component {
  constructor (props) {
    super(props)
  }

  parseHeader = header => {
    return header.charAt(0).toUpperCase() + header.slice(1).toLowerCase().replace('_', ' ')
  }



  render () {
    let goal = this.props.goal !== undefined ? this.props.goal : 'LOSE'

    let headerGoal = 'Goal: ' + this.parseHeader(goal)

    let goalData = getImageAndDescriptionForGoal(goal)
    let imageGoal = goalData[0]
    let goalDescription = goalData[1]

    return (
      <div className="start-container">
          <h2 className="label">{headerGoal}</h2>
        <div className={"shade"}>
          <h3 className={"goal-description"}>{goalDescription}</h3>
        </div>
      </div>)
  }
}

export default GoalBox