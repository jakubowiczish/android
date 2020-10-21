import moment from 'moment'
import React from 'react'
import DataTable from 'react-data-table-component'
import DatePicker from 'react-datepicker'
import {
  deleteRecentProducts, deleteUserActivities, getRecentActivitiesForDate,
  getRecentProductsForDate
} from '../util/APIUtils'
import AddDiaryEntryModal from './AddDiaryEntryModal'
import './Diary.css'
import { Add, Delete } from '@material-ui/icons'
import IconButton from '@material-ui/core/IconButton'
import memoize from 'memoize-one'
import Alert from 'react-s-alert'
import { Card } from 'antd'
import FoodStatCards from './FoodStatCards'
import AddActivityDiaryModal from './AddActivityDiaryModal'

const actions = memoize(addHandler => (
  <IconButton color='primary' onClick={addHandler}>
    <Add/>
  </IconButton>
))

const contextActions = memoize(deleteHandler => (
  <IconButton color='secondary' onClick={deleteHandler}>
    <Delete/>
  </IconButton>
))

const activities = memoize(addHandler => (
  <IconButton color='primary' onClick={addHandler}>
    <Add/>
  </IconButton>
))

const conditionalRowStyles = [
  {
    when: row => row.mealType === 'BREAKFAST',
    style: {
      backgroundColor: 'rgba(63, 195, 128, 0.9)',
      color: 'white'
    }
  },
  {
    when: row => row.mealType === 'LUNCH',
    style: {
      backgroundColor: 'rgba(63, 19, 128, 0.9)',
      color: 'white'
    }
  },
  {
    when: row => row.mealType === 'DINNER',
    style: {
      backgroundColor: 'rgba(34, 195, 30, 0.9)',
      color: 'white'
    }
  },
  {
    when: row => row.mealType === 'SUPPER',
    style: {
      backgroundColor: 'rgba(200, 200, 50, 0.9)',
      color: 'white'
    }
  },
  {
    when: row => row.mealType === 'SNACK',
    style: {
      backgroundColor: 'rgba(34, 30, 180, 0.9)',
      color: 'white'
    }
  },
  {
    when: row => row.mealType === 'ACTIVITY',
    style: {
      backgroundColor: 'rgba(219, 187, 255, 0.9)',
      color: 'white'
    }
  }
]

const columns = memoize(() => [
  {
    name: 'Product name',
    selector: 'productName',
    sortable: true,
    wrap: true,
    center: true
  },
  {
    name: 'Meal Type',
    selector: 'mealType',
    sortable: true,
    center: true
  },
  {
    name: 'Meal Time',
    selector: 'mealTime',
    sortable: true,
    grow: 1.5,
    center: true
  },
  {
    name: 'Portion',
    selector: row => row.portion + ' ' + row.mealUnit,
    sortable: true,
    maxWidth: '50px',
    center: true
  },
  {
    name: 'Amount of portions',
    selector: 'amount',
    sortable: true,
    maxWidth: '50px',
    center: true
  },
  {
    name: 'Calories',
    selector: 'caloriesEaten',
    sortable: true,
    center: true
  },
  {
    name: 'Proteins',
    selector: 'proteinsEaten',
    sortable: true,
    center: true
  },
  {
    name: 'Fat',
    selector: 'fatEaten',
    sortable: true,
    center: true
  },
  {
    name: 'Carbohydrates',
    selector: 'carbohydratesEaten',
    sortable: true,
    center: true
  }
])

class Diary extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      count: 0,
      tableData: [],
      date: moment().valueOf(),
      selectedRows: [],
      activities: [],
      open: false,
      toggleCleared: false,
      activityOpen: false
    }

    this.refresh()
  }

  handleSelectedRowClick = state => {
    this.setState({ selectedRows: state.selectedRows })
  }

  refresh () {
    this.handleGetUserActivityByDate(this.state.date)
  }

  concatActivitiesAndProducts () {
    let empty = []
    let data = this.state.tableData
    empty = empty.concat(data.recentProducts).concat(this.state.activities)
    data.recentProducts = empty
    console.log(data)
    console.log(this.state.activities)
    this.setState({ tableData: data })
  }

  mapActivityToProduct (activity) {
    return {
      mealType: activity.mealType,
      amount: 0,
      portion: 0,
      mealUnit: 'min',
      productName: activity.activityName,
      caloriesEaten: -1 * activity.caloriesBurned,
      proteinsEaten: 0,
      fatEaten: 0,
      carbohydratesEaten: 0,
      recentProductId: activity.userActivityId,
      mealTime: activity.activityTime
    }
  }

  handleOpenModal = () => {
    this.setState({ open: true })
  }

  handleOpenActivitiesModal = () => {
    this.setState({ activityOpen: true })
  }

  handleCloseModal = () => {
    this.refresh()
    this.setState({ open: false })
  }

  handleCloseActivityModal = () => {
    this.handleGetUserActivityByDate(this.state.date)
    this.setState({ activityOpen: false })
  }

  handleGetRecentProductsByDate = date => {
    const dateString = moment(date).format('YYYY-MM-DD')

    getRecentProductsForDate(dateString).then(res => {
      this.setState({ tableData: res })
      this.concatActivitiesAndProducts()
    })
  }
  handleGetUserActivityByDate = date => {
    const dateString = moment(date).format('YYYY-MM-DD')

    getRecentActivitiesForDate(dateString).then(res => {
      const list = res.infoList
      const result = []

      for (let i = 0; i < list.length; i++) {
        result.push(this.mapActivityToProduct(list[i]))
      }
      this.setState({ activities: result })
      this.handleGetRecentProductsByDate(this.state.date)
    })
  }

  handleDeleteRecentProducts = () => {
    const { selectedRows } = this.state
    const rowsNames = selectedRows.map(r => r.productName)
    const userActivitiesIds = selectedRows.filter(r => r.mealType === 'ACTIVITY').map(r => r.recentProductId)
    const recentProductsIds = selectedRows.filter(r => r.mealType !== 'ACTIVITY').map(r => r.recentProductId)

    if (window.confirm(`Are you sure you want to delete:\r ${rowsNames}?`)) {
      if (userActivitiesIds.length !== 0) {
        const deleteRowRequest = { userActivitiesIds: userActivitiesIds }
        deleteUserActivities(deleteRowRequest)
          .then(() => {
            Alert.success('Activity has been successfully deleted from diary')
          }).then(() => {
          this.refresh()
        })
      }
      if (recentProductsIds.length !==0){
        const deleteRowRequest = { recentProductsIds: recentProductsIds }
        deleteRecentProducts(deleteRowRequest)
          .then(() => {
            Alert.success('Product has been successfully deleted from diary')
          })
          .then(() => {
            this.refresh()
          })
      }
    }

    this.setState({ toggleCleared: !this.state.toggleCleared })
  }

  render () {
    return (
      <div>
        {/* <Grid item xl={'auto'}> */}
        <Card className='card-container'>
          <DatePicker className="datepicker-container"
                      dateFormat='yyyy-MM-dd'
                      selected={this.state.date}
                      onChange={date => {
                        this.setState({ date: date })
                        this.refresh()
                      }}
          />

          <DataTable
            columns={columns()}
            data={this.state.tableData.recentProducts}
            defaultSortField='productName'
            wrap
            pagination
            selectableRows
            pointerOnHover
            highlightOnHover
            clearSelectedRows={this.state.toggleCleared}
            actions={[actions(this.handleOpenModal), activities(this.handleOpenActivitiesModal)]}
            contextActions={contextActions(this.handleDeleteRecentProducts)}
            onSelectedRowsChange={this.handleSelectedRowClick}
            conditionalRowStyles={conditionalRowStyles}
          />
        </Card>
        <Card className='summary-container'>
          <FoodStatCards summaryList={this.state.tableData.summaryList}/>
        </Card>
        {/* </Grid> */}

        <AddDiaryEntryModal
          show={this.state.open}
          onHide={this.handleCloseModal}
        />
        <AddActivityDiaryModal
          show={this.state.activityOpen}
          onHide={this.handleCloseActivityModal}
        />
      </div>
    )
  }
}

export default Diary
