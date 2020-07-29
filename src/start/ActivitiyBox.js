import React, { Component } from 'react'
import bmrActiveImg from '../img/activities/bmr-active-img.jpg'
import sedentaryActiveImg from '../img/activities/sedentary-active-img.jpg'
import lightActiveImg from '../img/activities/light-active-img.jpg'
import moderateActiveImg from '../img/activities/moderate-active-img.jpg'
import activeActiveImg from '../img/activities/active-active-img.jpg'
import veryActiveActiveImg from '../img/activities/very_active-active-img.jpg'
import loseGoalImg from '../img/activities/lose-goal-img.jpg'
import stayGoalImg from '../img/activities/stay-goal-img.jpg'
import gainGoalImg from '../img/activities/gain-active-img.jpg'

function getImageAndDescriptionForActive (active) {
  let imageActive, activeDescription

  switch (active) {
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

  return [imageActive, activeDescription]
}

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

class ActivityBox extends Component {
  constructor (props) {
    super(props)
  }

  parseHeader = header => {
    return header.charAt(0).toUpperCase() + header.slice(1).toLowerCase().replace('_', ' ')
  }

  parseActivityLevel = level => {
    if (level === 'BMR') {return level}
    return this.parseHeader(level)
  }

  render () {
    let active = this.props.active !== undefined ? this.props.active : 'BMR'
    let goal = this.props.goal !== undefined ? this.props.goal : 'LOSE'

    let header = 'Activity level: ' + this.parseActivityLevel(active)
    let headerGoal = 'Goal: ' + this.parseHeader(goal)

    let activeData = getImageAndDescriptionForActive(active)
    let imageActive = activeData[0]
    let activeDescription = activeData[1]

    let goalData = getImageAndDescriptionForGoal(goal)
    let imageGoal = goalData[0]
    let goalDescription = goalData[1]

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

export default ActivityBox