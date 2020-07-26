import React, { Component } from 'react'
import './ProductBrowser.css'
import { getRecentProducts } from '../util/APIUtils'
import DataTable from 'react-data-table-component'

class RecentProductsComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      products: [
      ],
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
        grow: 1.5
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
      <div className='container'>
        <div className='recent-products-container parent_div_1'>
          <div className='recent-products-content child_div_2'>
            <h1 className='start-title'>Recently added products</h1>
            <DataTable
              data={this.state.products}
              columns={this.getColumnsForRecentProductsComponent()}
              onSelectedRowsChange={this.handleSelectChange}
              selectableRows
              progressPending={this.state.loading}
              pagination
              paginationServer
              paginationTotalRows={this.state.totalRows}
              paginationRowsPerPageOptions={[10]}
              onChangeRowsPerPage={this.handlePerRowsChange}
              onChangePage={this.handlePageChange}
              selectableRowDisabled={row => this.state.selectedProducts.length > 0 && this.isRowUnselected(row)}
              selectableRowsNoSelectAll
            />
          </div>
        </div>
      </div>
    )
  }
}

export default RecentProductsComponent
