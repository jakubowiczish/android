import React, { Component } from 'react'
import './Profile.css'
import { Image } from 'react-bootstrap'
import configurationIcon from '../../img/common/configuration_icon.png'
import closeIcon from '../../img/common/close_icon.png'

class UserData extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: this.props.user,
      editMode: false
    }
    console.log(props)
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
      this.state.editMode
        ? <div>
          <div className='user-data-header'>
            <b>User data </b>
            <a href='#'>
              <Image
                onClick={() => this.setState({ editMode: false })}
                src={closeIcon} width={24} height={24}
                title='Cancel editing'
              />
            </a>
          </div>
          <div className='edit-field'>
            <user-data-input-label><b>Birth date: </b></user-data-input-label>
            <input type='text' />
          </div>
          <div className='edit-field'>
            <user-data-input-label><b>Height: </b></user-data-input-label>
            <input type='text' />
          </div>
          <div className='edit-field'>
            <user-data-input-label><b>Current weight: </b></user-data-input-label>
            <input type='text' />
          </div>
          <div className='user-data'>
            <b>Last login date: </b>{dateTimeFormat.format(new Date(this.state.user.lastLoginDate))}
          </div>
        </div>
        : <div>
          <div className='user-data-header'>
            <b>User data </b>
            <a href='#'>
              <Image
                onClick={() => this.setState({ editMode: true })}
                src={configurationIcon} width={24} height={24}
                title='Edit your data'
              />
            </a>
          </div>
          <div className='user-data'>
            <b>Birth date: </b>{this.state.user.birthDate}
          </div>
          <div className='user-data'>
            <b>Height: </b>{this.state.user.height + 'cm'}
          </div>
          <div className='user-data'>
            <b>Current weight: </b>{this.state.weight + 'kg'}
          </div>
          <div className='user-data'>
            <b>Last login date: </b>{dateTimeFormat.format(new Date(this.state.user.lastLoginDate))}
          </div>
        </div>
    )
  }
}

export default UserData
