import React, { Component } from 'react'
import './Home.css'
import Alert from 'react-s-alert'
import { getUserCaloriesStatus } from '../util/APIUtils'
import CaloriesStatusContainer from './CaloriesStatusContainer'

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      caloriesConsumed: '',
      dailyCaloricDemand: ''
    }
    if (this.props.authenticated) {
      this.getUserCaloriesStatus()
    }
  }

  getUserCaloriesStatus () {
    getUserCaloriesStatus()
      .then(response => {
        this.setState({
          caloriesConsumed: response.caloriesConsumed,
          dailyCaloricDemand: response.dailyCaloricDemand
        })
      }
      ).catch(error => {
        Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!')
      })
  }

  render () {
    return (
      <div>
        <div>
          <div id='page1' className='parallax home_top_background'>
            <section className='home__intro'>
              <div className='home__title__div'>
                <div className='intro__align'>
                  <h1 className='intro__align__title animated__h1 home-font'>Master Diet</h1>
                  {this.props.authenticated
                    ? <CaloriesStatusContainer
                      caloriesConsumed={this.state.caloriesConsumed}
                      dailyCaloricDemand={this.state.dailyCaloricDemand}
                      /> : ''}
                </div>
              </div>
            </section>
          </div>
          <div className='footer' />
        </div>
      </div>
    )
  }
}

export default Home
