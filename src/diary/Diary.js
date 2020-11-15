import moment from 'moment'
import React from 'react'
import DataTable from 'react-data-table-component'
import DatePicker from 'react-datepicker'
import {
  deleteRecentProducts,
  deleteUserActivities,
  getRecentActivitiesForDate,
  getRecentProductsForDate
} from '../util/APIUtils'
import AddDiaryEntryModal from './AddDiaryEntryModal'
import './Diary.css'
import { Add, Delete } from '@material-ui/icons'
import IconButton from '@material-ui/core/IconButton'
import memoize from 'memoize-one'
import Alert from 'react-s-alert'
import { Card } from 'antd'
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
      tableData: '',
      date: moment().valueOf(),
      selectedRows: [],
      activities: [],
      open: false,
      toggleCleared: false,
      activityOpen: false,
      caloriesActivities: 0
    }

    this.handleSelectedRowClick = this.handleSelectedRowClick.bind(this)
    this.refresh = this.refresh.bind(this)
    this.mapActivityToProduct = this.mapActivityToProduct.bind(this)
    this.handleOpenModal = this.handleOpenModal.bind(this)
    this.handleOpenActivitiesModal = this.handleOpenActivitiesModal.bind(this)
    this.handleCloseModal = this.handleCloseModal.bind(this)
    this.handleCloseActivityModal = this.handleCloseActivityModal.bind(this)
    this.handleGetRecentProductsByDate = this.handleGetRecentProductsByDate.bind(this)
    this.concatActivitiesAndProducts = this.concatActivitiesAndProducts.bind(this)
    this.handleGetUserActivityByDate = this.handleGetUserActivityByDate.bind(this)
    this.handleDeleteRecentProducts = this.handleDeleteRecentProducts.bind(this)

    this.refresh()
  }

  // componentDidMount () {
  //   this.refresh()
  // }

  handleSelectedRowClick = state => {
    this.setState({ selectedRows: state.selectedRows })
  }

  refresh () {
    this.handleGetUserActivityByDate(this.state.date)
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

    getRecentProductsForDate(dateString)
      .then(res => {
        // this.setState({ tableData: res })
        this.concatActivitiesAndProducts(res)
      })
  }

  concatActivitiesAndProducts (res) {
    let recentProducts = []
    let data = res
    recentProducts = recentProducts.concat(data.recentProducts).concat(this.state.activities)
    data.recentProducts = recentProducts
    data.summaryList[1] = {
      description: 'Calories',
      sum: data.summaryList[1].sum + this.state.caloriesActivities,
      difference: data.summaryList[1].difference
    }
    this.setState({ tableData: data })
  }

  handleGetUserActivityByDate = date => {
    const dateString = moment(date).format('YYYY-MM-DD')

    getRecentActivitiesForDate(dateString).then(res => {
      const list = res.infoList
      const result = []

      for (let i = 0; i < list.length; i++) {
        result.push(this.mapActivityToProduct(list[i]))
        this.state.caloriesActivities += -1 * list[i].caloriesBurned
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
          })
          .then(() => {
            this.refresh()
          })
      }
      if (recentProductsIds.length !== 0) {
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
        <div>
          <div id='page1' className='parallax top_diary_background'>
            <section className='intro'>
              <div className='title__div'>
                <div className='intro__align'>
                  <h1 className='intro__align__title animated__h1'>Diary</h1>
                  <h2 className='intro__align__sub-title animated'>Welcome to the diary!</h2>
                </div>
              </div>
            </section>
          </div>
          <div className='footer'/>
          <div className='tab'>
            <h1 className='start-title'>Fill up starter form!</h1>
          </div>
        </div>
        <div className='content'>
          <div className='parallax bottom_diary_background'>
            <div>
              <div>
                <Card className='main_diary_card'>

                  <Card className='datepicker_card_container'>
                    <DatePicker className="datepicker-container"
                                dateFormat='yyyy-MM-dd'
                                selected={this.state.date}
                                onChange={date => {
                                  this.setState({ date: date })
                                  this.refresh()
                                }}
                    />
                  </Card>

                  <Card className='card-container'>

                    <DataTable
                      columns={columns()}
                      data={this.state.tableData.recentProducts}
                      defaultSortField='productName'
                      wrap
                      theme='dark'
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
                </Card>
              </div>
              <AddDiaryEntryModal
                show={this.state.open}
                onHide={this.handleCloseModal}
              />
              <AddActivityDiaryModal
                show={this.state.activityOpen}
                onHide={this.handleCloseActivityModal}
              />
            </div>
          </div>
          <div className='footer'/>
        </div>
      </div>
    )
  }
}

export default Diary
