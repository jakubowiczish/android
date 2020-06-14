import React, {Component} from 'react'
import './Home.css'

class Home extends Component {
  render () {
    return (
      <div className='home-container'>
        <div className='container'>
          <div className='graf-bg-container'>
            <div className='graf-layout'>
              <div className='graf-circle' />
              <div className='graf-circle' />
              <div className='graf-circle' />
              <div className='graf-circle' />
              <div className='graf-circle' />
              <div className='graf-circle' />
              <div className='graf-circle' />
              <div className='graf-circle' />
              <div className='graf-circle' />
              <div className='graf-circle' />
              <div className='graf-circle' />
            </div>
          </div>
          <h1 className='home-title'>Master Diet</h1>
        </div>
      </div>
    )
  }
}

export default Home
