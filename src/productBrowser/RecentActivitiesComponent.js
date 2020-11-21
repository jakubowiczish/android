import React, { Component } from 'react'
import './Browser.css'
import { getRecentActivities } from '../util/APIUtils'
import DataTable from 'react-data-table-component'
import Card from '@material-ui/core/Card'

class RecentActivitiesComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      activities: [],
      selectedActivities: [],
      loading: false,
      totalRows: 0,
      perPage: 10
    }
    this.getColumnsForRecentActivitiesComponent = this.getColumnsForRecentActivitiesComponent.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)
    this.handlePerRowsChange = this.handlePerRowsChange.bind(this)
    this.loadRecentActivities()
  }

  loadRecentActivities () {
    getRecentActivities(1, this.state.perPage).then(
      response => {
        this.setState({
          activities: response.activities,
          totalRows: response.maximumPageNumber
        })
      }
    )
  }

  async handlePageChange (page) {
    const { perPage } = this.state

    this.setState({ loading: true })

    getRecentActivities(page, perPage).then(
      response => {
        this.setState({
          activities: response.activities,
          loading: false,
          totalRows: response.maximumPageNumber
        })
      }
    )
  }

  async handlePerRowsChange (perPage, page) {
    this.setState({ loading: true })

    getRecentActivities(page, perPage).then(
      response => {
        this.setState({
          activities: response.activities,
          loading: false,
          perPage: perPage,
          totalRows: response.maximumPageNumber
        })
      }
    )
  }

  getColumnsForRecentActivitiesComponent () {
    return [
      {
        name: 'Name',
        selector: 'name',
        sortable: true,
        grow: 2.5,
        wrap: true,
        center: true
      },
      {
        name: 'Calories',
        selector: row => row.burnedCalories + ' kcal',
        sortable: true,
        sortFunction: (rowA, rowB) => rowA.burnedCalories - rowB.burnedCalories
      }]
  }

  handleSelectChange (state) {
    this.setState({ selectedActivities: state.selectedRows })
    this.props.onSelectedRecentActivitiesChangeHandler(state.selectedRows)
  }

  isRowUnselected (row) {
    return !this.state.selectedActivities.some(e => e.id === row.id)
  }

  render () {
    return (
      <Card className='search_component_container' style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <h1 className='search_for_activities_title'>Recently added activities</h1>
        <DataTable
          className='items-datatable'
          data={this.state.activities}
          columns={this.getColumnsForRecentActivitiesComponent()}
          onSelectedRowsChange={this.handleSelectChange}
          selectableRows
          progressPending={this.state.loading}
          pagination
          theme='dark'
          paginationServer
          paginationTotalRows={this.state.totalRows}
          paginationRowsPerPageOptions={[10]}
          onChangeRowsPerPage={this.handlePerRowsChange}
          onChangePage={this.handlePageChange}
          selectableRowDisabled={row => this.props.isAnyRowSelected() && this.isRowUnselected(row)}
          selectableRowsNoSelectAll
          selectableRowsHighlight
        />
      </Card>
    )
  }
}

export default RecentActivitiesComponent
