import React, { Component } from 'react'
import './ProductBrowser.css'
import RecentActivitiesComponent from './RecentActivitiesComponent'
import SearchActivityComponent from './SearchActivityComponent'
class ActivityBrowser extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedActivities: [],
      selectedRecentActivities: []
    }
    this.handleSelectedActivitiesChange = this.handleSelectedActivitiesChange.bind(this)
    this.handleSelectedRecentActivitiesChange = this.handleSelectedRecentActivitiesChange.bind(this)
  }

  handleSelectedActivitiesChange (activities) {
    this.setState({
      selectedActivities: activities
    })
    this.handleSelectionChange(activities, this.state.selectedRecentActivities)
  }

  handleSelectedRecentActivitiesChange (activities) {
    this.setState({
      selectedRecentActivities: activities
    })
    this.handleSelectionChange(this.state.selectedActivities, activities)
  }

  handleSelectionChange (selectedActivity, selectedRecentActivities) {
    const concatenatedSelectionsWithoutDuplicates = selectedActivity
      .concat(selectedRecentActivities.filter((item) => selectedActivity.indexOf(item) < 0))
    if (this.props.onSelectionChangeHandler != null) {
      this.props.onSelectionChangeHandler(concatenatedSelectionsWithoutDuplicates)
    }
  }

  render () {
    return (
      <div>
        <SearchActivityComponent onSelectedActivitiesChangeHandler={this.handleSelectedActivitiesChange} />
        <RecentActivitiesComponent onSelectedRecentActivitiesChangeHandler={this.handleSelectedRecentActivitiesChange} />
      </div>
    )
  }
}

export default ActivityBrowser
