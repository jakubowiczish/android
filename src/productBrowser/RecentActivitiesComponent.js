import React, { Component } from 'react'
import './Browser.css'
import { getRecentActivities } from '../util/APIUtils'
import DataTable from 'react-data-table-component'

class RecentActivitiesComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      activities: [
      ],
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
        selector: row => row.calories + ' kcal',
        sortable: true,
        sortFunction: (rowA, rowB) => rowA.calories - rowB.calories
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
      <div className='container'>
        <div className='recent-item-container parent_div_1'>
          <div className='recent-item-content child_div_2'>
            <h1 className='start-title'>Recently added activities</h1>
            <DataTable
              data={this.state.activities}
              columns={this.getColumnsForRecentActivitiesComponent()}
              onSelectedRowsChange={this.handleSelectChange}
              selectableRows
              progressPending={this.state.loading}
              pagination
              paginationServer
              paginationTotalRows={this.state.totalRows}
              paginationRowsPerPageOptions={[10]}
              onChangeRowsPerPage={this.handlePerRowsChange}
              onChangePage={this.handlePageChange}
              selectableRowDisabled={row => this.state.selectedActivities.length > 0 && this.isRowUnselected(row)}
              selectableRowsNoSelectAll
              selectableRowsHighlight
            />
          </div>
        </div>
      </div>
    )
  }
}

export default RecentActivitiesComponent
