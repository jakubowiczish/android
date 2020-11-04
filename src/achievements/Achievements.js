import React, { Component } from 'react'
import AchievementsList from './AchievementsList'

class Achievements extends Component {
  render () {
    return (
      <div>
        <div>
          <div id='page1' className='parallax top_achievements_background'>
            <section className='intro'>
              <div className='title__div'>
                <div className='intro__align'>
                  <h1 className='intro__align__title animated__h1'>Achievements</h1>
                  <h2 className='intro__align__sub-title animated'>Unlock them all!</h2>
                </div>
              </div>
            </section>
          </div>
          <div className='footer' />
          <div className='tab'>
            <h1 className='start-title'>Fill up starter form!</h1>
          </div>
        </div>
        <div className='content'>
          <div className='parallax bottom_achievements_background'>
            <div>
              <div>
                <AchievementsList />
              </div>
            </div>
            <div className='footer' />
          </div>
        </div>
      </div>
    )
  }
}

export default Achievements
