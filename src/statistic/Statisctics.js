import * as React from 'react';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  LineSeries,
  ZoomAndPan,
} from '@devexpress/dx-react-chart-bootstrap4';
import '@devexpress/dx-react-chart-bootstrap4/dist/dx-react-chart-bootstrap4.css';
import { getAllUserWeight } from '../util/APIUtils'

export default class Statisctics extends React.PureComponent {
  constructor(props) {
    super(props);
    this.getData()
    this.state = {
      data:[]
    };
  }
  getFormattedDate (date) {
    date = new Date(date)
    const year = date.getFullYear()
    let month = (1 + date.getMonth()).toString()
    month = this.checkPartOfDate(month)
    let day = date.getDate().toString()
    day = this.checkPartOfDate(day)
    return day + '/' + month + '/' + year
  }
  checkPartOfDate (partOfDate) {
    return partOfDate.length > 1 ? partOfDate : '0' + partOfDate
  }
  getData = () => {
    getAllUserWeight().then( response =>{
      const ret = [];
      for (let i = 0; i < response.length; i += 1) {
        let y = response[i].weight
        let date = response[i].creationDate
        let output = this.getFormattedDate(date)
        ret.push({ x: output, y });
      }
      this.setState({data : ret})
      }
    )
  }
  render() {
    const {
      data: chartData,
    } = this.state;
    return (
      <div className="card">
        <Chart data={chartData}>
          <ArgumentAxis />
          <ValueAxis />

          <LineSeries valueField="y" argumentField="x" />
          <ZoomAndPan />
        </Chart>
      </div>
    );
  }
}
