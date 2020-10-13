import React, { Component } from 'react'
import { ACCESS_TOKEN } from '../../constants'
import { Redirect } from 'react-router-dom'
import { getCurrentUser } from '../../util/APIUtils'

class OAuth2RedirectHandler extends Component {
  constructor (props) {
    super(props)
    this.state = { user: null }
    getCurrentUser()
      .then(res => {
        this.setState({ user: res })
      })
  }

  getUrlParameter (name) {
    name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]')
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)')

    const results = regex.exec(this.props.location.search)
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '))
  };

  render () {
    const token = this.getUrlParameter('token')
    const error = this.getUrlParameter('error')

    if (token) {
      localStorage.setItem(ACCESS_TOKEN, token)
      const user = this.state.user
      return user == null
        ? (<a>Loading</a>) : user.userPlan != null
          ? (
            <Redirect to={{
              pathname: '/',
              state: { from: this.props.location }
            }}
            />
          ) : (
            <Redirect to={{
              pathname: '/startForm',
              state: { from: this.props.location }
            }}
            />
          )
    } else {
      return <Redirect to={{
        pathname: '/login',
        state: {
          from: this.props.location,
          error: error
        }
      }}
      />
    }
  }
}

export default OAuth2RedirectHandler
