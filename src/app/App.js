import 'bootstrap/dist/css/bootstrap.min.css'
import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import AppHeader from '../common/AppHeader'
import Home from '../home/Home'
import Login from '../user/login/Login'
import Profile from '../user/profile/Profile'
import OAuth2RedirectHandler from '../user/oauth2/OAuth2RedirectHandler'
import NotFound from '../common/NotFound'
import LoadingIndicator from '../common/LoadingIndicator'
import { getCurrentUser } from '../util/APIUtils'
import { ACCESS_TOKEN } from '../constants'
import PrivateRoute from '../common/PrivateRoute'
import Alert from 'react-s-alert'
import 'react-s-alert/dist/s-alert-default.css'
import 'react-s-alert/dist/s-alert-css-effects/slide.css'
import './App.css'
import Start from '../start/Start'
import BMICalculator from '../calculator/bmi/BMICalculator'
import ProductBrowser from '../productBrowser/ProductBrowser'
import ActivityBrowser from '../productBrowser/ActivityBrowser'
import Diary from '../diary/Diary'
import Achievements from '../achievements/Achievements'
import Statistics from '../statistic/Statisctics'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      authenticated: false,
      currentUser: null,
      loading: false
    }

    this.loadCurrentlyLoggedInUser = this.loadCurrentlyLoggedInUser.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  loadCurrentlyLoggedInUser () {
    this.setState({
      loading: true
    })

    getCurrentUser()
      .then(response => {
        this.setState({
          currentUser: response,
          authenticated: true,
          loading: false
        })
      }).catch(error => {
      this.setState({
        loading: false
      })
    })
  }

  handleLogout () {
    localStorage.removeItem(ACCESS_TOKEN)
    this.setState({
      authenticated: false,
      currentUser: null
    })
    Alert.success('You\'re safely logged out!')
  }

  componentDidMount () {
    this.loadCurrentlyLoggedInUser()
  }

  render () {
    if (this.state.loading) {
      return <LoadingIndicator/>
    }

    return (
      <div className='app'>
        <div className='app-top-box'>
          <AppHeader authenticated={this.state.authenticated} onLogout={this.handleLogout}/>
        </div>
        <div className='app-body'>
          <Switch>
            <Route
              exact path='/'
              render={(props) => <Home authenticated={this.state.authenticated} {...props} />}
            />
            <PrivateRoute
              path='/profile'
              authenticated={this.state.authenticated}
              currentUser={this.state.currentUser}
              component={Profile}
            />
            <PrivateRoute
              path='/productBrowser' authenticated={this.state.authenticated}
              currentUser={this.state.currentUser}
              component={ProductBrowser}
            />
            <PrivateRoute
              path='/activityBrowser'
              authenticated={this.state.authenticated}
              currentUser={this.state.currentUser}
              component={ActivityBrowser}
            />
            <PrivateRoute
              path='/achievements' authenticated={this.state.authenticated}
              currentUser={this.state.currentUser}
              component={Achievements}
            />
            <Route
              path='/login'
              render={(props) => <Login authenticated={this.state.authenticated} {...props} />}
            />
            <PrivateRoute
              path='/startForm'
              authenticated={this.state.authenticated}
              currentUser={this.state.currentUser}
              component={Start}
              {...this.props}
            />
            <PrivateRoute
              path='/bmiCalculator'
              authenticated={this.state.authenticated}
              currentUser={this.state.currentUser}
              component={BMICalculator}
            />
            <PrivateRoute
              path='/diary'
              authenticated={this.state.authenticated}
              currentUser={this.state.currentUser}
              component={Diary}
            />
            <PrivateRoute
              path='/statistics'
              authenticated={this.state.authenticated}
              currentUser={this.state.currentUser}
              component={Statistics}
            />
            <Route
              path='/oauth2/redirect'
              currentUser={this.state.currentUser}
              component={OAuth2RedirectHandler}
            />
            <Route component={NotFound}/>
          </Switch>
        </div>
        <Alert
          stack={{ limit: 3 }}
          timeout={3000}
          position='top-right' effect='slide' offset={65}
        />
      </div>
    )
  }
}

export default App
