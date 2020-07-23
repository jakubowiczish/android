import React, { Component } from 'react'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import './ProductBrowser.css'
import { searchProducts } from '../util/APIUtils'
import DataTable from 'react-data-table-component'

class SearchComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      searchTerm: '',
      products: [
      ],
      selectedProducts: [],
      loading: false,
      totalRows: 0,
      perPage: 10
    }
    this.handleSearchButtonClick = this.handleSearchButtonClick.bind(this)
    this.handleSearchTermChange = this.handleSearchTermChange.bind(this)
    this.getColumnsForSearchComponent = this.getColumnsForSearchComponent.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)
    this.handlePerRowsChange = this.handlePerRowsChange.bind(this)
  }

  handleSearchTermChange (newTerm) {
    this.setState({ searchTerm: newTerm.target.value })
  }

  handleSearchButtonClick () {
    const searchTerm = this.state.searchTerm
    const perPage = this.state.perPage
    searchProducts(searchTerm, 1, perPage).then(
      response => {
        this.setState({
          searchTerm: searchTerm,
          products: response.products,
          totalRows: response.totalProductsAmount
        })
      }
    )
  }

  async handlePageChange (page) {
    const { perPage } = this.state
    const searchTerm = this.state.searchTerm

    this.setState({ loading: true })

    searchProducts(searchTerm, page, perPage).then(
      response => {
        this.setState({
          products: response.products,
          loading: false,
          totalRows: response.totalProductsAmount
        })
      }
    )
  }

  async handlePerRowsChange (perPage, page) {
    this.setState({ loading: true })
    const searchTerm = this.state.searchTerm

    searchProducts(searchTerm, page, perPage).then(
      response => {
        this.setState({
          products: response.products,
          loading: false,
          perPage: perPage,
          totalRows: response.totalProductsAmount
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
        grow: 2
      },
      {
        name: 'Default portion',
        selector: 'defaultValue',
        sortable: true
      },
      {
        name: 'Unit',
        selector: 'unit',
        sortable: true
      },
      {
        name: 'Calories',
        selector: 'calories',
        sortable: true
      }]
  }

  handleChange () {
    console.log(this.state.selectedProducts)
    this.setState({ selectedRows: this.state.selectedProducts })
  }

  render () {
    console.log(this.state.products)
    return (
      <div className='browser-container'>
        <div className='search-container'>
          <div id='search-label'>Search for products</div>
          <InputGroup className='search-term'>
            <FormControl
              id='search-term'
              onChange={this.handleSearchTermChange}
              placeholder='Product name'
              aria-label='Product name'
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
            title='Results'
            data={this.state.products}
            columns={this.getColumnsForSearchComponent()}
            onSelectedRowsChange={this.handleChange}
            selectableRows
            progressPending={this.state.loading}
            pagination
            paginationServer
            paginationTotalRows={this.state.totalRows}
            paginationRowsPerPageOptions={[10]}
            onChangeRowsPerPage={this.handlePerRowsChange}
            onChangePage={this.handlePageChange}
          />

        </div>
      </div>
    )
  }
}

export default SearchComponent
