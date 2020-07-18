import React, { Component } from 'react'
import { addRecentProduct, getRecentProductsForDate } from '../util/APIUtils'
import { Card } from 'react-bootstrap'
import DataTable from 'react-data-table-component'
import Button from 'react-bootstrap/Button'
import DatePicker from 'react-datepicker/es'
import moment from 'moment'

class Diary extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tableData: [],
      date: new Date()
    }
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
      .then(res => console.log(res))
  }

  handleGetRecentProductsByDate = (date) => {
    const dateString = moment(date).format('YYYY-MM-DD')

    getRecentProductsForDate(dateString)
      .then(res => console.log(res))
  }

  render () {
    const columns = [
      {
        name: 'Title',
        selector: 'title',
        sortable: true,
      },
      {
        name: 'Director',
        selector: 'director',
        sortable: true,
      },
      {
        name: 'Year',
        selector: 'year',
        sortable: true,
      },
    ]

    return (
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
            title="Diary"
            columns={columns}
            data={this.state.tableData}
            defaultSortField="title"
          />

          <Button
            onClick={this.handleGetRecentProductsByDate}
          />
        </Card>


      </div>
    )
  }
}

export default Diary