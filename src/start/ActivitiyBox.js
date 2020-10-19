import React, { Component } from 'react'
import bmrActiveImg from '../img/activities/bmr-active-img.jpg'
import sedentaryActiveImg from '../img/activities/sedentary-active-img.jpg'
import lightActiveImg from '../img/activities/light-active-img.jpg'
import moderateActiveImg from '../img/activities/moderate-active-img.jpg'
import activeActiveImg from '../img/activities/active-active-img.jpg'
import veryActiveActiveImg from '../img/activities/very_active-active-img.jpg'
import './Start.css'

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

    let header = this.parseActivityLevel(active)

    let activeData = getImageAndDescriptionForActive(active)
    let activeDescription = activeData[1]

    return (
      <div className="start-container">
          <h2 className={"label"}> Activity level</h2>
          <h2 className="label2">{header}</h2>
        <div className={"shade"}>
          <h3 className={'active-description'}>{activeDescription}</h3>
        </div>
      </div>)
  }
}

export default ActivityBox