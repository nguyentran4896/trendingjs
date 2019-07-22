import React from "react";
import { Col } from "shards-react";

import SmallStats from "./SmallStats";
import Constant from "./Constant";

class RowSmallStats extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      topTrendKeywords: []
    }
  }

  async componentDidMount() {
    const response = await fetch(Constant.BASE_API + '/dailyTrends') // get list app
    const json = await response.json();

    this.setState({
      topTrendKeywords: json.default.trendingSearchesDays[0].trendingSearches.splice(0, 4)
    })
  }

  render() {
    const { topTrendKeywords } = this.state
    return (
      topTrendKeywords.map((topTrends, idx) => {
        const stats = smallStats[idx]
        console.log(stats);
        
        return (

          <Col className="col-lg mb-4" key={idx} {...stats.attrs}>
            <SmallStats
              id={`small-stats-${idx}`}
              variation="1"
              chartData={stats.datasets}
              chartLabels={stats.chartLabels}
              // label={stats.label}
              label={topTrends.title.query}
              // value={stats.value}
              value={topTrends.formattedTraffic}
              percentage={stats.percentage}
              increase={stats.increase}
              decrease={stats.decrease}
            />
          </Col>
        )


      })
    );
  }
}

const smallStats = [
  {
    label: "Posts",
    value: "2,390",
    percentage: "4.7%",
    increase: true,
    chartLabels: [null, null, null, null, null, null, null],
    attrs: { md: "6", sm: "6" },
    datasets: [
      {
        label: "Today",
        fill: "start",
        borderWidth: 1.5,
        backgroundColor: "rgba(0, 184, 216, 0.1)",
        borderColor: "rgb(0, 184, 216)",
        data: [1, 2, 1, 3, 5, 4, 7]
      }
    ]
  },
  {
    label: "Pages",
    value: "182",
    percentage: "12.4",
    increase: true,
    chartLabels: [null, null, null, null, null, null, null],
    attrs: { md: "6", sm: "6" },
    datasets: [
      {
        label: "Today",
        fill: "start",
        borderWidth: 1.5,
        backgroundColor: "rgba(23,198,113,0.1)",
        borderColor: "rgb(23,198,113)",
        data: [1, 2, 3, 3, 3, 4, 4]
      }
    ]
  },
  {
    label: "Comments",
    value: "8,147",
    percentage: "3.8%",
    increase: false,
    decrease: true,
    chartLabels: [null, null, null, null, null, null, null],
    attrs: { md: "4", sm: "6" },
    datasets: [
      {
        label: "Today",
        fill: "start",
        borderWidth: 1.5,
        backgroundColor: "rgba(255,180,0,0.1)",
        borderColor: "rgb(255,180,0)",
        data: [2, 3, 3, 3, 4, 3, 3]
      }
    ]
  },
  {
    label: "New Customers",
    value: "29",
    percentage: "2.71%",
    increase: false,
    decrease: true,
    chartLabels: [null, null, null, null, null, null, null],
    attrs: { md: "4", sm: "6" },
    datasets: [
      {
        label: "Today",
        fill: "start",
        borderWidth: 1.5,
        backgroundColor: "rgba(255,65,105,0.1)",
        borderColor: "rgb(255,65,105)",
        data: [1, 7, 1, 3, 1, 4, 8]
      }
    ]
  },
  {
    label: "Subscribers",
    value: "17,281",
    percentage: "2.4%",
    increase: false,
    decrease: true,
    chartLabels: [null, null, null, null, null, null, null],
    attrs: { md: "4", sm: "6" },
    datasets: [
      {
        label: "Today",
        fill: "start",
        borderWidth: 1.5,
        backgroundColor: "rgb(0,123,255,0.1)",
        borderColor: "rgb(0,123,255)",
        data: [3, 2, 3, 2, 4, 5, 4]
      }
    ]
  }
]

export default RowSmallStats;
