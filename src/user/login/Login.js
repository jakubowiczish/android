import React, { Component } from 'react'
import './Login.css'
import { Redirect } from 'react-router-dom'
import Alert from 'react-s-alert'
import LoginSignupContainer from './LoginSignupContainer'

class Login extends Component {
  componentDidMount () {
    // If the OAuth2 login encounters an error, the user is redirected to the /login page with an error.
    // Here we display the error and then remove the error query parameter from the location.

    if (this.props.location.state && this.props.location.state.error) {
      setTimeout(() => {
        Alert.error(this.props.location.state.error, {
          timeout: 5000
        })
        this.props.history.replace({
          pathname: this.props.location.pathname,
          state: {}
        })
      }, 100)
    }
  }

  render () {
    if (this.props.authenticated) {
      return <Redirect
        to={{
          pathname: '/',
          state: { from: this.props.location }
        }}
      />
    }

    return (
      <div>
        <div>
          <div id='page1' className='parallax top_login_background'>
            <section className='intro'>
              <div className='title__div'>
                <div className='intro__align'>
                  <h1 className='intro__align__title animated__h1'>Welcome to Master Diet</h1>
                  <h2 className='intro__align__sub-title animated'>Scroll down</h2>
                </div>
              </div>
            </section>
          </div>
          <div className='footer' />
        </div>
        <div className='content'>
          <div className='parallax bottom_login_background'>
            <LoginSignupContainer {...this.props} />
            <div className='footer' />
          </div>
        </div>
      </div>
    )
  }
}

export default Login
