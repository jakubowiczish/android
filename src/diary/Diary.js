import moment from 'moment'
import React from 'react'
import DataTable from 'react-data-table-component'
import DatePicker from 'react-datepicker'
import { deleteRecentProducts, getRecentProductsForDate } from '../util/APIUtils'
import AddDiaryEntryModal from './AddDiaryEntryModal'
import './Diary.css'
import { Add, Delete } from '@material-ui/icons'
import IconButton from '@material-ui/core/IconButton'
import memoize from 'memoize-one'
import Alert from 'react-s-alert'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'

const actions = memoize(addHandler => (
  <IconButton
    color="primary"
    onClick={addHandler}
  >
    <Add/>
  </IconButton>
))

const contextActions = memoize(deleteHandler => (
  <IconButton
    color="secondary"
    onClick={deleteHandler}
  >
    <Delete/>
  </IconButton>
))

const conditionalRowStyles = [
  {
    when: row => row.mealType === 'BREAKFAST',
    style: {
      backgroundColor: 'rgba(63, 195, 128, 0.9)',
      color: 'white',
    },
  },
  {
    when: row => row.mealType === 'LUNCH',
    style: {
      backgroundColor: 'rgba(63, 19, 128, 0.9)',
      color: 'white',
    },
  },
  {
    when: row => row.mealType === 'DINNER',
    style: {
      backgroundColor: 'rgba(34, 195, 30, 0.9)',
      color: 'white',
    },
  },
  {
    when: row => row.mealType === 'SUPPER',
    style: {
      backgroundColor: 'rgba(200, 200, 50, 0.9)',
      color: 'white',
    },
  },
  {
    when: row => row.mealType === 'SNACK',
    style: {
      backgroundColor: 'rgba(34, 30, 180, 0.9)',
      color: 'white',
    },
  },
]

const columns = memoize(() => [
  {
    name: 'Product name',
    selector: 'productName',
    sortable: true,
    wrap: true,
    center: true,
  },
  {
    name: 'Meal Type',
    selector: 'mealType',
    sortable: true,
    center: true,
  },
  {
    name: 'Meal Time',
    selector: 'mealTime',
    sortable: true,
    grow: 1.5,
    center: true,
  },
  {
    name: 'Portion',
    selector: row => row.portion + ' ' + row.mealUnit,
    sortable: true,
    maxWidth: '50px',
    center: true,
  },
  {
    name: 'Amount of portions',
    selector: 'amount',
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
      open: false,
      toggleCleared: false,
    }

    this.handleGetRecentProductsByDate(this.state.date)
  }

  handleSelectedRowClick = state => {
    this.setState({ selectedRows: state.selectedRows })
  }

  handleOpenModal = () => {
    this.setState({ open: true })
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
    const deleteRecentProductsRequest = { recentProductsIds: rowsIds }

    if (window.confirm(`Are you sure you want to delete:\r ${rowsNames}?`)) {
      deleteRecentProducts(deleteRecentProductsRequest)
        .then(res => {
          console.log(res)
          Alert.success('Product has been successfully deleted from diary')
        })
        .then(() => {
          this.handleGetRecentProductsByDate(this.state.date)
        })
    }

    this.setState({ toggleCleared: !this.state.toggleCleared })
  }

  render () {
    return (
      <div>
        <Grid item xl={'auto'}>
          <Card className="card-container">
            <DatePicker
              dateFormat="yyyy-MM-dd"
              selected={this.state.date}
              onChange={date => {
                this.setState({ date: date })
                this.handleGetRecentProductsByDate(date)
              }}
            />

            <DataTable
              columns={columns()}
              data={this.state.tableData.recentProducts}
              defaultSortField="productName"
              wrap
              pagination
              selectableRows
              pointerOnHover
              highlightOnHover
              clearSelectedRows={this.state.toggleCleared}
              actions={actions(this.handleOpenModal)}
              contextActions={contextActions(this.handleDeleteRecentProducts)}
              onSelectedRowsChange={this.handleSelectedRowClick}
              conditionalRowStyles={conditionalRowStyles}
            />
          </Card>
        </Grid>
        <AddDiaryEntryModal show={this.state.open} onHide={() => this.setState({ open: false })}/>
      </div>
    )
  }

}

export default Diary