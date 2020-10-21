import React, { Component } from 'react'
import './Login.css'
import { ACCESS_TOKEN, FACEBOOK_AUTH_URL, GITHUB_AUTH_URL, GOOGLE_AUTH_URL } from '../../constants'
import { login } from '../../util/APIUtils'
import { Link, Redirect } from 'react-router-dom'
import fbLogo from '../../img/social-icons/facebook-logo.png'
import googleLogo from '../../img/google-logo.png'
import githubLogo from '../../img/social-icons/github-logo.png'
import Alert from 'react-s-alert'
import ReactstrapLogin from './ReactstrapLogin'
import SignInContainer from './SignInContainer'
import LoginSignupContainer from './LoginSignupContainer'
import StartForm from '../../start/StartForm'

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
          <div id="page1" className="parallax top_login_background">
            <section className="intro">
              <div className="title__div">
                <div className="intro__align">
                  <h1 className="intro__align__title animated__h1">Welcome to Master Diet</h1>
                  <h2 className="intro__align__sub-title animated">Log in</h2>
                </div>
              </div>
            </section>
          </div>
          <div className={'footer'}>
          </div>
          <div className="tab">
            <h1 className="start-title">Fill up starter form!</h1>
          </div>
        </div>
        <div className={'content'}>
          <div className="parallax bottom_login_background">
            <div className="center-login-signup-form">
              <LoginSignupContainer/>
              <SocialLogin/>
            </div>
            <div className={'footer'}>
            </div>
          </div>
        </div>
      </div>
      // <div>
      //   <LoginSignupContainer/>
      //   {/* <div className='login-container'>*/}
      //   {/*   <div className='login-content'>*/}
      //   {/*     <h1 className='login-title'>Login to Master Diet</h1>*/}
      //   {/*<SignInContainer/>*/}
      //   {/*<ReactstrapLogin/>*/}
      //   {/*<LoginForm/>*/}
      //   {/*<LoginComponent/>*/}
      //   {/*<div className='or-separator'>*/}
      //   {/*  <span className='or-text'>OR</span>*/}
      //   {/*</div>*/}
      //   {/*<LoginForm {...this.props} />*/}
      //   {/*<span className='signup-link'>New user? <Link to='/signup'>Sign up!</Link></span>*/}
      //   {/*   </div>*/}
      //   {/* </div>*/}
      // </div>
    )
  }
}

class SocialLogin extends Component {
  render () {
    return (
      <div className='social-login'>
        <a className='btn btn-block social-btn google' href={GOOGLE_AUTH_URL}>
          <img src={googleLogo} alt='Google'/> Log in with Google
        </a>
        <a className='btn btn-block social-btn facebook' href={FACEBOOK_AUTH_URL}>
          <img src={fbLogo} alt='Facebook'/> Log in with Facebook
        </a>
        <a className='btn btn-block social-btn github' href={GITHUB_AUTH_URL}>
          <img src={githubLogo} alt='Github'/> Log in with Github
        </a>
      </div>
    )
  }
}

class LoginForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleInputChange (event) {
    const target = event.target
    const inputName = target.name
    const inputValue = target.value

    this.setState({
      [inputName]: inputValue
    })
  }

  handleSubmit (event) {
    event.preventDefault()

    const loginRequest = Object.assign({}, this.state)
    login(loginRequest)
      .then(response => {
        localStorage.setItem(ACCESS_TOKEN, response.accessToken)
        this.props.history.push('/')
        window.location.reload(true)
        Alert.success('You\'re successfully logged in!')
      }).catch(error => {
      Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!')
    })
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className='form-item'>
          <input
            type='email' name='email'
            className='form-control' placeholder='Email'
            value={this.state.email} onChange={this.handleInputChange} required
          />
        </div>
        <div className='form-item'>
          <input
            type='password' name='password'
            className='form-control' placeholder='Password'
            value={this.state.password} onChange={this.handleInputChange} required
          />
        </div>
        <div className='form-item'>
          <button type='submit' className='btn btn-block btn-primary'>Login</button>
        </div>
      </form>
    )
  }
}

export default Login
