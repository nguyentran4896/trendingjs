import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Card, CardHeader, CardBody, Button } from "shards-react";

// import RangeDatePicker from "../common/RangeDatePicker";
import Highcharts from 'highcharts';

class SDKVerionChart extends React.Component {
  constructor(props) {
    super(props);

    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    Highcharts.chart('sdk-chart', {
      chart: {
        type: 'spline',
        scrollablePlotArea: {
          minWidth: 600,
          scrollPositionX: 1
        }
      },
      title: {
        text: 'SDK Version',
        align: 'center'
      },
      subtitle: {
        text: null,
        align: 'center'
      },
      xAxis: {
        type: 'datetime',
        labels: {
          overflow: 'justify'
        }
      },
      yAxis: {
        title: {
          text: 'Wind speed (m/s)'
        }
      },
      tooltip: {
        valueSuffix: ' m/s'
      },
      plotOptions: {
        spline: {
          lineWidth: 2,
          states: {
            hover: {
              lineWidth: 5
            }
          },
          marker: {
            enabled: false
          },
          pointInterval: 3600000, // one hour
          pointStart: Date.UTC(2018, 1, 13, 0, 0, 0)
        }
      },
      series: [
        {
          name: '12v1_1',
          data: [
            0.2, 0.1, 0.1, 0.1, 0.3, 0.2, 0.3, 0.1, 0.7, 0.3, 0.2, 0.2,
            0.3, 0.1, 0.3, 0.4, 0.3, 0.2, 0.3, 0.2, 0.4, 0.0, 0.9, 0.3,
            0.7, 1.1, 1.8, 1.2, 1.4, 1.2, 0.9, 0.8, 0.9, 0.2, 0.4, 1.2,
            0.3, 2.3, 1.0, 0.7, 1.0, 0.8, 2.0, 1.2, 1.4, 3.7, 2.1, 2.0,
            1.5
          ]
        }, {
          name: '12v1_2',
          data: [
            3.7, 3.3, 3.9, 5.1, 3.5, 3.8, 4.0, 5.0, 6.1, 3.7, 3.3, 6.4,
            6.9, 6.0, 6.8, 4.4, 4.0, 3.8, 5.0, 4.9, 9.2, 9.6, 9.5, 6.3,
            9.5, 10.8, 14.0, 11.5, 10.0, 10.2, 10.3, 9.4, 8.9, 10.6, 10.5, 11.1,
            10.4, 10.7, 11.3, 10.2, 9.6, 10.2, 11.1, 10.8, 13.0, 12.5, 12.5, 11.3,
            10.1
          ]
        },
        {
          name: '12v1_3',
          data: [
            0.3, 0.5, 0.4, 0.6, 0.6, 0.7, 0.3, 0.1, 0.7, 0.3, 0.5, 0.2,
            0.3, 0.1, 0.3, 0.7, 0.5, 0.8, 0.3, 0.2, 0.4, 0.0, 0.1, 0.5,
            0.7, 1.1, 1.8, 1.8, 1.4, 1.9, 0.9, 0.8, 0.9, 0.2, 0.2, 1.6,
            0.3, 2.3, 1.0, 0.4, 1.3, 0.0, 2.0, 1.2, 1.4, 3.7, 2.0, 2.8,
            1.5
          ]
        }],
      navigation: {
        menuItemStyle: {
          fontSize: '10px'
        }
      }
    });
  }

  render() {
    const { title } = this.props;
    return (
      <Card small className="h-100">
        <CardHeader className="border-bottom">
          <h6 className="m-0">{title}</h6>
        </CardHeader>
        <CardBody className="pt-0">
          <Row className="border-bottom py-2 bg-light">
            <Col sm="6" className="d-flex mb-2 mb-sm-0">
              {/* <RangeDatePicker /> */}
            </Col>
            <Col>
              <Button
                size="sm"
                className="d-flex btn-white ml-auto mr-auto ml-sm-auto mr-sm-0 mt-3 mt-sm-0"
              >
                View Full Report &rarr;
              </Button>
            </Col>
          </Row>
          <div id="sdk-chart"></div>
        </CardBody>
      </Card>
    );
  }
}

SDKVerionChart.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string,
  /**
   * The chart dataset.
   */
  chartData: PropTypes.object,
  /**
   * The Chart.js options.
   */
  chartOptions: PropTypes.object
};

export default SDKVerionChart;
