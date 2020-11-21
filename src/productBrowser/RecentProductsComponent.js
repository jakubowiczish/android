import React, { Component } from 'react'
import './Browser.css'
import { getRecentProducts } from '../util/APIUtils'
import DataTable from 'react-data-table-component'
import Card from '@material-ui/core/Card'

class RecentProductsComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      products: [],
      selectedProducts: [],
      loading: false,
      totalRows: 0,
      perPage: 10
    }
    this.getColumnsForRecentProductsComponent = this.getColumnsForRecentProductsComponent.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)
    this.handlePerRowsChange = this.handlePerRowsChange.bind(this)
    this.loadRecentProducts()
  }

  loadRecentProducts () {
    getRecentProducts(1, this.state.perPage).then(
      response => {
        this.setState({
          products: response.products,
          totalRows: response.totalNumberOfProducts
        })
      }
    )
  }

  async handlePageChange (page) {
    const { perPage } = this.state

    this.setState({ loading: true })

    getRecentProducts(page, perPage).then(
      response => {
        this.setState({
          products: response.products,
          loading: false,
          totalRows: response.totalNumberOfProducts
        })
      }
    )
  }

  async handlePerRowsChange (perPage, page) {
    this.setState({ loading: true })

    getRecentProducts(page, perPage).then(
      response => {
        this.setState({
          products: response.products,
          loading: false,
          perPage: perPage,
          totalRows: response.totalNumberOfProducts
        })
      }
    )
  }

  getColumnsForRecentProductsComponent () {
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
        name: 'Default portion',
        selector: row => row.defaultValue + ' ' + row.unit,
        sortable: true,
        sortFunction: (rowA, rowB) => rowA.defaultValue - rowB.defaultValue
      },
      {
        name: 'Calories',
        selector: row => row.calories + ' kcal',
        sortable: true,
        sortFunction: (rowA, rowB) => rowA.calories - rowB.calories
      }]
  }

  handleSelectChange (state) {
    this.setState({ selectedProducts: state.selectedRows })
    this.props.onSelectedRecentProductsChangeHandler(state.selectedRows)
  }

  isRowUnselected (row) {
    return !this.state.selectedProducts.some(e => e.id === row.id)
  }

  render () {
    return (
      <Card className='search_component_container' style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <h1 className='search_for_products_title'>Your recent products</h1>
        <DataTable
          className='items-datatable'
          data={this.state.products}
          columns={this.getColumnsForRecentProductsComponent()}
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

export default RecentProductsComponent
