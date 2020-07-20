import React, { Component } from 'react'
import './ProductBrowser.css'
import RecentActivitiesComponent from './RecentActivitiesComponent'
import SearchActivityComponent from './SearchActivityComponent'

class ActivityBrowser extends Component {
  render () {
    return (
      <div>
        <SearchActivityComponent />
        <RecentActivitiesComponent />
      </div>
    )
  }
}

export default ActivityBrowser
