import React, { useState } from 'react'
import { addRecentProduct, getRecentProductsForDate } from '../util/APIUtils'
import DataTable from 'react-data-table-component'
import Button from 'react-bootstrap/Button'
import DatePicker from 'react-datepicker/es'
import moment from 'moment'
import './Diary.css'
import Alert from 'react-s-alert'
import { Card } from '@material-ui/core'
import AddDiaryEntryModal from './AddDiaryEntryModal'

function Diary (props) {

  const [tableData, setTableData] = useState('')
  const [date, setDate] = useState(new Date())

  const [open, setOpen] = useState(false)
  const closeModal = () => setOpen(false)
  const openModal = () => setOpen(true)

  function getColumnsForDiaryTable () {
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



  function handleGetRecentProductsByDate (date) {
    const dateString = moment(date).format('YYYY-MM-DD')

    getRecentProductsForDate(dateString)
      .then(res => {
        console.log(res)
        setTableData(res)
      })
  }

  return (
    // <div className="diary-container">
    //   <div className="diary-content child_div_1">
    <div>
      <Card>
        <DatePicker
          dateFormat="yyyy-MM-dd"
          selected={date}
          onChange={date => {
            setDate(date)
            handleGetRecentProductsByDate(date)
          }}/>
        <DataTable
          columns={getColumnsForDiaryTable()}
          data={tableData.recentProducts}
          defaultSortField="title"
          wrap
          highlightOnHover
          pointerOnHover
          pagination
          selectableRows
        />
      </Card>

      <div>
        <Button variant="primary" onClick={openModal}>
          Add product to diary
        </Button>

        <AddDiaryEntryModal
          show={open}
          onHide={closeModal}/>
      </div>
    </div>


    //   </div>
    // </div>
  )

}

export default Diary