import React, { Component } from 'react'
import './Profile.css'
import { getUserProfile } from '../../util/APIUtils'
import { Container } from 'react-bootstrap'

class Profile extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: this.props.currentUser,
      weight: ''
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
          <Container>
            <hr className='splitter-line' />
            <div className='user-data'>
              <b>Birth date: </b>{this.state.user.birthDate}
            </div>
            <div className='user-data'>
              <b>Height: </b>{this.state.user.height + 'cm'}
            </div>
            <div className='user-data'>
              <b>Last login date: </b>{dateTimeFormat.format(new Date(this.state.user.lastLoginDate))}
            </div>
          </Container>
        </div>
      </div>
    )
  }
}

export default Profile
