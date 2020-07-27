import React, { Component } from 'react'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import './Browser.css'
import { searchActivities } from '../util/APIUtils'
import DataTable from 'react-data-table-component'

class SearchActivityComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      searchTerm: '',
      activities: [
      ],
      selectedActivities: [],
      loading: false,
      totalRows: 0,
      perPage: 10
    }
    this.handleSearchButtonClick = this.handleSearchButtonClick.bind(this)
    this.handleSearchTermChange = this.handleSearchTermChange.bind(this)
    this.getColumnsForSearchComponent = this.getColumnsForSearchComponent.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)
    this.handlePerRowsChange = this.handlePerRowsChange.bind(this)
  }

  handleSearchTermChange (newTerm) {
    this.setState({ searchTerm: newTerm.target.value })
  }

  handleSearchButtonClick () {
    const searchTerm = this.state.searchTerm
    const perPage = this.state.perPage
    searchActivities(searchTerm, 1, perPage).then(
      response => {
        this.setState({
          searchTerm: searchTerm,
          activities: response.activities,
          totalRows: response.maximumPageNumber
        })
      }
    )
  }

  async handlePageChange (page) {
    const { perPage } = this.state
    const searchTerm = this.state.searchTerm

    this.setState({ loading: true })

    searchActivities(searchTerm, page, perPage).then(
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
    const searchTerm = this.state.searchTerm

    searchActivities(searchTerm, page, perPage).then(
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

  getColumnsForSearchComponent () {
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
        name: 'Burned Calories',
        selector: row => row.burnedCalories + ' kcal per min',
        sortable: true,
        sortFunction: (rowA, rowB) => rowA.burnedCalories - rowB.burnedCalories
      }]
  }

  handleSelectChange (state) {
    this.setState({ selectedActivities: state.selectedRows })
      this.props.onSelectedActivitiesChangeHandler(state.selectedRows)
  }

  isRowUnselected (row) {
    return !this.state.selectedActivities.some(e => e.id === row.id)
  }

  render () {
    return (
      <div className='container'>
        <div className='browser-container parent_div_1'>
          <div className='browser-content child_div_2'>
            <div className='search-container'>
              <h1 className='start-title'>Search for activities</h1>
              <InputGroup className='search-term'>
                <FormControl
                  id='search-term'
                  onChange={this.handleSearchTermChange}
                  placeholder='Activity name'
                  aria-label='Activity name'
                />
                <InputGroup.Append>
                  <Button
                    id='search-button'
                    variant='dark'
                    onClick={this.handleSearchButtonClick}
                  >
                    Search
                  </Button>
                </InputGroup.Append>
              </InputGroup>
              <DataTable
                data={this.state.activities}
                columns={this.getColumnsForSearchComponent()}
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
      </div>
    )
  }
}

export default SearchActivityComponent