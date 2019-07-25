import React from "react";
import PropTypes from "prop-types";

import Highcharts from 'highcharts';

class HighchartsElement extends React.Component {
  constructor(props) {
    super(props);

    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    const { config } = this.props;
    Highcharts.chart('sdk-chart', config);
  }

  render() {
    // const { title } = this.props;
    return (
      <div id="sdk-chart"></div>
    );
  }
}

HighchartsElement.propTypes = {
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

export default HighchartsElement;
