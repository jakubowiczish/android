import React, { Component } from 'react'
import './Profile.css'
import { getUserProfile } from '../../util/APIUtils'
import { Container, Image } from 'react-bootstrap'
import configurationIcon from '../../img/common/configuration_icon.png'
import { Link } from 'react-router-dom'
import UserData from './UserData'

class Profile extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: this.props.currentUser,
      weight: '',
      editMode: false
    }
    this.loadUserProfile()
  }

  loadUserProfile () {
    getUserProfile().then(
      response => {
        this.setState({
          user: response.user,
          weight: response.weight
        })
      }
    )
  }

  render () {
    const dateTimeFormat = new Intl.DateTimeFormat('en', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: 'numeric',
      minute: 'numeric'
    })
    return (
      <div className='profile-container'>
        <div className='profile-content'>
          <div className='profile-info'>
            <div className='profile-avatar'>
              {
                this.state.user.imageUrl ? (
                  <img src={this.state.user.imageUrl} alt={this.state.user.name} />
                ) : (
                  <div className='text-avatar'>
                    <span>{this.state.user.name && this.state.user.name[0]}</span>
                  </div>
                )
              }
            </div>
            <div className='profile-name'>
              <h2>{this.state.user.name}</h2>
              <p className='profile-email'>{this.state.user.email}</p>
            </div>
          </div>
          <Container id='userProfileDataContainer'>
            <hr className='splitter-line' />
            <UserData user={this.state.user}/>
            {/*<div className='user-data-header'>*/}
            {/*  <b>User data </b>*/}
            {/*  {this.state.editMode*/}
            {/*    ? <a href='#'>*/}
            {/*      <Image*/}
            {/*        onClick={() => this.setState({ editMode: false })}*/}
            {/*        src={closeIcon} width={24} height={24}*/}
            {/*        title='Edit your data'*/}
            {/*      />*/}
            {/*    </a>*/}
            {/*    : <a href='#'>*/}
            {/*      <Image*/}
            {/*        onClick={() => this.setState({ editMode: true })}*/}
            {/*        src={configurationIcon} width={24} height={24}*/}
            {/*        title='Edit your data'*/}
            {/*      />*/}
            {/*    </a>}*/}
            {/*</div>*/}
            {/*{this.state.editMode*/}
            {/*  ? <div className='user-data'>*/}
            {/*    <b>Birth date: </b>{this.state.user.birthDate}*/}
            {/*    </div>*/}
            {/*  : <div className='edit-field'>*/}
            {/*    <user-data-input-label><b>Simple label</b></user-data-input-label>*/}
            {/*    <input type='text' />*/}
            {/*  </div>}*/}
            {/*<div className='user-data'>*/}
            {/*  <b>Height: </b>{this.state.user.height + 'cm'}*/}
            {/*</div>*/}
            {/*<div className='user-data'>*/}
            {/*  <b>Current weight: </b>{this.state.weight + 'kg'}*/}
            {/*</div>*/}
            {/*<div className='user-data'>*/}
            {/*  <b>Last login date: </b>{dateTimeFormat.format(new Date(this.state.user.lastLoginDate))}*/}
            {/*</div>*/}
            <hr className='splitter-line' />
            <div className='user-data-header'>
              <b>User plan </b>
              <Link to='startForm'>
                <Image src={configurationIcon} width={24} height={24} title='Edit your plan' />
              </Link>
            </div>
            <div className='user-data'>
              <b>Weight goal: </b>{this.state.user.userPlan.goal}
            </div>
            <div className='user-data'>
              <b>Activity level: </b>{this.state.user.userPlan.activityLevel}
            </div>
            <div className='user-data'>
              <b>Calories per day: </b>{this.state.user.userPlan.calories + 'kcal'}
            </div>
            <div className='user-data'>
              <b>Carbohydrates per day: </b>{this.state.user.userPlan.carbohydrates + 'g'}
            </div>
            <div className='user-data'>
              <b>Proteins per day: </b>{this.state.user.userPlan.proteins + 'g'}
            </div>
            <div className='user-data'>
              <b>Fat per day: </b>{this.state.user.userPlan.fat + 'g'}
            </div>
          </Container>
        </div>
      </div>
    )
  }
}

export default Profile
