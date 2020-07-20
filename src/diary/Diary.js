import React, { Component } from 'react'
import { addRecentProduct, getRecentProductsForDate } from '../util/APIUtils'
import DataTable from 'react-data-table-component'
import Button from 'react-bootstrap/Button'
import DatePicker from 'react-datepicker/es'
import moment from 'moment'
import './Diary.css'
import Alert from 'react-s-alert'
import { Card } from '@material-ui/core'

class Diary extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tableData: '',
      date: new Date()
    }
  }

  getColumnsForDiaryTable = () => {
    return [
      {
        name: 'Meal Type',
        selector: 'mealType',
        sortable: true,
      },
      {
        name: 'Meal Time',
        selector: 'mealTime',
        sortable: true,
        wrap: true,
      },
      {
        name: 'Amount of portions',
        selector: 'amount',
        sortable: true,
      },
      {
        name: 'Portion',
        selector: 'portion',
        sortable: true,
      },
      {
        name: 'Meal unit',
        selector: 'mealUnit',
        sortable: true,
      },
      {
        name: 'Product name',
        selector: 'productName',
        sortable: true,
      },
      {
        name: 'Calories',
        selector: 'caloriesEaten',
        sortable: true,
      },
      {
        name: 'Proteins',
        selector: 'proteinsEaten',
        sortable: true,
      },
      {
        name: 'Fat',
        selector: 'fatEaten',
        sortable: true,
      },
      {
        name: 'Carbohydrates',
        selector: 'carbohydratesEaten',
        sortable: true,
      }
    ]
  }

  handleAddRecentProduct = () => {
    const request = {
      'mealType': 'BREAKFAST',
      'mealTime': '2020-07-14T19:20',
      'amount': '2.00',
      'portion': '1.00',
      'portionUnit': 'g',
      'productId': 1
    }

    addRecentProduct(request)
      .then(res => {
        console.log(res)
        Alert.success('Product has been successfully added to diary')
      })
  }

  handleGetRecentProductsByDate = (date) => {
    const dateString = moment(date).format('YYYY-MM-DD')

    getRecentProductsForDate(dateString)
      .then(res => {
        console.log(res)
        this.setState({ tableData: res })
      })
  }

  render () {
    return (
      // <div className="diary-container">
      //   <div className="diary-content child_div_1">
      <div>
        <Card>
          <DatePicker
            dateFormat="yyyy-MM-dd"
            selected={this.state.date}
            onChange={date => {
              this.setState({ date: date })
              this.handleGetRecentProductsByDate(date)
            }}/>
          <DataTable
            columns={this.getColumnsForDiaryTable()}
            data={this.state.tableData.recentProducts}
            defaultSortField="title"
            wrap
            highlightOnHover
            pointerOnHover
            pagination
            selectableRows
          />

          <Button
            variant="primary"
            onClick={this.handleAddRecentProduct}>
            Add new diary entry
          </Button>

        </Card>
      </div>


      //   </div>
      // </div>
    )
  }
}

export default Diary