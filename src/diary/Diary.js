import { Card } from '@material-ui/core'
import moment from 'moment'
import React from 'react'
import Button from 'react-bootstrap/Button'
import DataTable from 'react-data-table-component'
import DatePicker from 'react-datepicker'
import { deleteRecentProducts, getRecentProductsForDate } from '../util/APIUtils'
import AddDiaryEntryModal from './AddDiaryEntryModal'
import './Diary.css'
import { Add, Delete } from '@material-ui/icons'
import IconButton from '@material-ui/core/IconButton'
import memoize from 'memoize-one'
import Alert from 'react-s-alert'

const selectProps = { indeterminate: isIndeterminate => isIndeterminate }

const actions = (
  <IconButton
    color="primary"
  >
    <Add/>
  </IconButton>
)

const contextActions = memoize(deleteHandler => (
  <IconButton
    color="secondary"
    onClick={deleteHandler}
  >
    <Delete/>
  </IconButton>
))

const columns = memoize(() => [
  {
    name: 'Product name',
    selector: 'productName',
    sortable: true,
  },
  {
    name: 'Meal Type',
    selector: 'mealType',
    sortable: true,
  },
  {
    name: 'Meal Time',
    selector: 'mealTime',
    sortable: true,
    // minWidth: '200px'
    grow: 1,
  },
  {
    name: 'Amount of portions',
    selector: 'amount',
    sortable: true,
    maxWidth: '50px',
    center: true,
  },
  {
    name: 'Portion',
    selector: 'portion',
    sortable: true,
    maxWidth: '50px',
    center: true,
  },
  {
    name: 'Meal unit',
    selector: 'mealUnit',
    sortable: true,
    maxWidth: '50px',
    center: true,
  },
  {
    name: 'Calories',
    selector: 'caloriesEaten',
    sortable: true,
    center: true,
  },
  {
    name: 'Proteins',
    selector: 'proteinsEaten',
    sortable: true,
    center: true,
  },
  {
    name: 'Fat',
    selector: 'fatEaten',
    sortable: true,
    center: true,
  },
  {
    name: 'Carbohydrates',
    selector: 'carbohydratesEaten',
    sortable: true,
    center: true,
  }
])

class Diary extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      count: 0,
      tableData: '',
      date: moment().valueOf(),
      selectedRows: [],
      open: false
    }

    this.handleGetRecentProductsByDate(this.state.date)
  }

  handleSelectedRowClick = state => {
    this.setState({ selectedRows: state.selectedRows })
  }

  handleGetRecentProductsByDate = (date) => {
    const dateString = moment(date).format('YYYY-MM-DD')

    getRecentProductsForDate(dateString)
      .then(res => {
        console.log(res)
        this.setState({ tableData: res })
      })
  }

  handleDeleteRecentProducts = () => {
    const { selectedRows } = this.state
    const rowsNames = selectedRows.map(r => r.productName)
    const rowsIds = selectedRows.map(r => r.recentProductId)
    const deleteRecentProductsRequest = {
      recentProductsIds: rowsIds
    }

    if (window.confirm(`Are you sure you want to delete:\r ${rowsNames}?`)) {
      deleteRecentProducts(deleteRecentProductsRequest)
        .then(res => {
          console.log(res)
          Alert.success('Product has been successfully deleted from diary')
        })
    }

    // this.handleGetRecentProductsByDate(this.state.date)
  }

  render () {
    return (
      <div>
        <Card style={{ height: '100%', width: '80%' }}>
          <DatePicker
            dateFormat="yyyy-MM-dd"
            selected={this.state.date}
            onChange={date => {
              this.setState({ date: date })
              this.handleGetRecentProductsByDate(date)
            }}/>

          <Button style={{ alignRight: true }}
                  variant="primary" onClick={() => this.setState({ open: true })}>
            Add product to diary
          </Button>

          <DataTable
            columns={columns()}
            data={this.state.tableData.recentProducts}
            defaultSortField="productName"
            wrap
            pagination
            selectableRows
            pointerOnHover
            highlightOnHover
            contextActions={contextActions(this.handleDeleteRecentProducts)}
            onSelectedRowsChange={this.handleSelectedRowClick}
          />
        </Card>

        <AddDiaryEntryModal show={this.state.open} onHide={() => this.setState({ open: false })}/>
      </div>
    )
  }

}

export default Diary