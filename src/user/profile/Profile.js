import React, { Component } from 'react'
import './Profile.css'
import { getUserProfile } from '../../util/APIUtils'
import { Container, Image } from 'react-bootstrap'
import configurationIcon from '../../img/common/configuration-icon.svg'
import { Link } from 'react-router-dom'
import UserData from './UserData'
import Alert from 'react-s-alert'

class Profile extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: this.props.currentUser,
      weight: '',
      editMode: false
    }
    this.loadUserProfile()
    this.changeWeight = this.changeWeight.bind(this)
  }

  loadUserProfile () {
    getUserProfile()
      .then(response => {
        this.setState({
          user: response.user,
          weight: response.weight
        })
      }
      ).catch(error => {
        Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!')
      })
  }

  changeWeight (newWeight) {
    this.setState({ weight: newWeight })
    Alert.success('Weight has been updated successfully')
  }

  render () {
    return (
      <div>
        <div>
          <div id='page1' className='parallax profile_top_background'>
            <section className='profile__intro'>
              <div className='profile__title__div'>
                <div className='intro__align'>
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
                  </div>
                  <div className='profile-header-container'>
                    <div className='profile-name'>{this.state.user.name}</div>
                    <div className='profile-email'>{this.state.user.email}</div>
                  </div>
                </div>
                <Container id='userProfileDataContainer'>
                  <hr className='splitter-line' />
                  <UserData weight={this.state.weight} user={this.state.user} changeWeight={this.changeWeight} />
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
            </section>
          </div>
          <div className='footer' />
        </div>
      </div>
    )
  }
}

export default Profile
