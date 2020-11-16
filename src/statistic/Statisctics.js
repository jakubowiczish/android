import * as React from 'react';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  LineSeries,
  ZoomAndPan,
} from '@devexpress/dx-react-chart-bootstrap4';
import '@devexpress/dx-react-chart-bootstrap4/dist/dx-react-chart-bootstrap4.css';
import { getAllWeightsOfUser } from '../util/APIUtils'
import './staticStyle.css'
import StartForm from '../start/StartForm'
import { Animation } from '@devexpress/dx-react-chart'

export default class Statisctics extends React.PureComponent {
  constructor(props) {
    super(props);
    this.getData()
    this.state = {
      data:[]
    };
  }

  getData = () => {
    getAllWeightsOfUser().then( response =>{
      const ret = [];
      for (let i = 0; i < response.length; i += 1) {
        let y = response[i].weight
        let date = new Date(response[i].creationDate)
        let output = StartForm.getFormattedDate(date)
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
      <div>
        <div>
          <div id="page1" className={`parallax top_background bottom_stats_background padding`}>
            <section className="intro">
              <div className="title__div box">
                <div className={"box"}>
                  <div>
                  <h1 className="intro__align__title">Your weight diagram </h1>
                  </div>
                  <div className="card-chart">
                    <Chart data={chartData} className = "chart-style">
                      <ArgumentAxis />
                      <ValueAxis />
                      <LineSeries valueField="y" argumentField="x" />
                      <ZoomAndPan />
                      <Animation />
                    </Chart>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div className={'footer'}>
          </div>
          <div className="tab">
          </div>
        </div>
      </div>
    );
  }
}
