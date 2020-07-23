import { Card } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import Add from '@material-ui/icons/Add'
import Delete from '@material-ui/icons/Delete'
import memoize from 'memoize-one'
import moment from 'moment'
import { default as React, useState } from 'react'
import Button from 'react-bootstrap/Button'
import DataTable from 'react-data-table-component'
import DatePicker from 'react-datepicker/es'
import { getRecentProductsForDate } from '../util/APIUtils'
import AddDiaryEntryModal from './AddDiaryEntryModal'
import './Diary.css'

class Diary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  const [tableData, setTableData] = useState('')
  const [date, setDate] = useState(new Date())
  const [selectedRows, setSelectedRows] = useState([])
  
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
      <Card style={{ height: '100%' }}>
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

        <AddDiaryEntryModal show={open} onHide={setOpen(false)}/>
      </div>
    </div>


    //   </div>
    // </div>
  )

}

export default Diary