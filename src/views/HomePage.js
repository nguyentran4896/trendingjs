import React from "react";
import { withTranslation } from 'react-i18next';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardFooter,
  Badge,
  Button
} from "shards-react";

import { Helmet } from "react-helmet";

import PageTitle from "../components/common/PageTitle";
import SmallStats from "../components/common/SmallStats";
import Discussions from "../components/blog/Discussions";
import CountryReports from "../components/common/CountryReports";
import YouTube from "react-youtube";
import loadCss from '../loadCss';

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      topTrends,
      videos: [],
      PostsListOne: [
        {
          backgroundImage: require("../images/loading.gif"),
          category: "Business",
          categoryTheme: "dark",
          author: "...",
          authorAvatar: require("../images/loading.gif"),
          title: "...",
          body:
            "...",
          date: "..."
        },
        {
          backgroundImage: require("../images/loading.gif"),
          category: "Travel",
          categoryTheme: "info",
          author: "...",
          authorAvatar: require("../images/loading.gif"),
          title: "...",
          body:
            "...",
          date: "..."
        },
        {
          backgroundImage: require("../images/loading.gif"),
          category: "Technology",
          categoryTheme: "royal-blue",
          author: "...",
          authorAvatar: require("../images/loading.gif"),
          title: "...",
          body: "...",
          date: "..."
        },
        {
          backgroundImage: require("../images/loading.gif"),
          category: "Business",
          categoryTheme: "warning",
          author: "...",
          authorAvatar: require("../images/loading.gif"),
          title: "...",
          body: "...",
          date: "..."
        },
        {
          backgroundImage: require("../images/loading.gif"),
          category: "Business",
          categoryTheme: "warning",
          author: "...",
          authorAvatar: require("../images/loading.gif"),
          title: "...",
          body: "...",
          date: "..."
        }
      ]
    }
  }

  async componentDidMount() {
    loadCss();
    const response = await fetch(process.env.REACT_APP_BASE_API + '/dailyTrends') // get list app
    const json = await response.json();
    // console.log('Loaded dailyTrends', json)

    let topTrends
    if (json.default.trendingSearchesDays.length > 1) {
      topTrends = json.default.trendingSearchesDays[0].trendingSearches.concat(json.default.trendingSearchesDays[1].trendingSearches)
    } else {
      topTrends = json.default.trendingSearchesDays[0].trendingSearches
    }
    topTrends = topTrends.splice(0, 5)

    var a = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&hl=vi&locale=vn&regionCode=VN&maxResults=7&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`)
    const videos = (await a.json()).items.map(e => (parseYoutubeVideoData(e)))
    // console.log(videos)

    this.setState({
      topTrends: topTrends.map(e => (parseSmallStatData(e))),
      PostsListOne: topTrends.map(e => (parseToNewsData(e))),
      videos
    })
  }

  render() {
    const { topTrends, videos, PostsListOne } = this.state
    const { t } = this.props;
    return (
      <Container fluid className="main-content-container px-4">
        <Helmet>
          <meta name="description" content={t('homepage_description')} />
          <meta property="og:description" content={t('homepage_description')} />
          <meta property="og:locale" content="vi_VN" />
          <meta property="og:locale:alternate" content="en_US" />
        </Helmet>

        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle title={t('google_trending')} subtitle="" className="text-sm-left mb-3" />
        </Row>

        {/* Small Stats Blocks */}
        <Row>
          {topTrends.map((stats, idx) => (
            <Col className="col-lg col-md-6 col-sm-6 col-xs-12 mb-4" key={idx} {...stats.attrs}>
              <SmallStats
                id={`small-stats-${idx}`}
                variation="1"
                chartData={stats.datasets}
                chartLabels={stats.chartLabels}
                label={stats.label}
                value={stats.value}
                percentage={stats.percentage}
                increase={stats.increase}
                decrease={stats.decrease}
              />
            </Col>
          ))}
        </Row>

        <Row>
          {PostsListOne.map((post, idx) => (
            <Col lg="" md="6" sm="12" className="mb-4" key={idx}>
              <Card small className="card-post card-post--1">
                <div
                  className="card-post__image"
                  style={{ backgroundImage: `url(${post.backgroundImage})` }}
                >
                  <Badge
                    pill
                    className={`card-post__category bg-${post.categoryTheme}`}
                  >
                    {post.category}
                  </Badge>
                  <div className="card-post__author d-flex">
                    <a
                      href="#"
                      className="card-post__author-avatar card-post__author-avatar--small"
                      style={{ backgroundImage: `url('${post.authorAvatar}')` }}
                    >
                      Written by {post.author}
                    </a>
                  </div>
                </div>
                <CardBody style={{ maxHeight: '300px', overflow: 'hidden' }}>
                  <h5 className="card-title">
                    <a href={post.url} className="text-fiord-blue" dangerouslySetInnerHTML={{ __html: post.title }} target="_blank" rel="noopener noreferrer" ></a>
                  </h5>
                  <p className="card-text d-inline-block mb-3" dangerouslySetInnerHTML={{ __html: post.body }}></p>
                  <span className="text-muted">{post.date}</span>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>


        {/* Youtube */}
        <Row>
          <Col className="col-lg mb-3 text-center" key={`container-yt-trend`}>
            <img
              height="200"
              width="320"
              className="d-inline-block align-middle"
              src="https://www.stickpng.com/assets/images/580b57fcd9996e24bc43c548.png" alt="" />
          </Col>

          {videos.map(video => (
            <Col className="col-lg mb-3" key={`container-${video.id}`}>
              <Card small className="card-post" style={{ maxWidth: '426px' }}>
                <CardBody style={{ padding: '0' }}>
                  <YouTube
                    key={video.id}
                    videoId={video.videoId}
                    id={video.id}
                    opts={video.opts}
                  />
                </CardBody>
                <CardFooter className="border-top d-flex">
                  <div className="card-post__author d-flex">
                    <a
                      href="#"
                      className="card-post__author-avatar card-post__author-avatar--small"
                      style={{ backgroundImage: `url('')` }}
                    >
                      {video.channelTitle}
                    </a>
                    <div className="d-flex flex-column justify-content-center ml-3">
                      <span className="card-post__author-name">
                        {video.channelTitle}
                      </span>
                      <small className="text-muted">{`Views: ${video.viewCount}`}</small>
                    </div>
                  </div>
                  {/* <div className="my-auto ml-auto">
                    <Button size="sm" theme="white">
                      <i className="far fa-bookmark mr-1" /> Bookmark
                    </Button>
                  </div> */}
                </CardFooter>
              </Card>
            </Col>
          ))}
        </Row>

        <Row>
          {/* Discussions */}
          <Col lg="5" md="12" sm="12" className="mb-4">
            <Discussions />
          </Col>

          <Col lg="7" md="12" sm="12" className="mb-4">
            <CountryReports />
          </Col>
        </Row>
      </Container>
    )
  }
}

const topTrends = [
  {
    label: "",
    value: "",
    percentage: "",
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
    label: "",
    value: "",
    percentage: "",
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
    label: "",
    value: "",
    percentage: "",
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
    label: "",
    value: "",
    percentage: "",
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
    label: "",
    value: "",
    percentage: "",
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

const parseSmallStatData = (obj) => ({
  // chartData={stats.datasets}

  value: obj.title.query,
  label: obj.formattedTraffic,
  percentage: (Math.random() * 100).toFixed(1) + '%',
  increase: true,
  decrease: false,
  attrs: { md: "4", sm: "6" }
})

const parseToNewsData = (obj) => ({
  backgroundImage: obj.image.imageUrl,
  category: obj.image.source,
  categoryTheme: "info",
  url: obj.image.newsUrl,
  author: obj.image.source,
  authorAvatar: require("../images/avatars/1.jpg"),
  title: obj.articles[0].title,
  body: obj.articles[0].snippet,
  date: obj.articles[0].timeAgo
})

const opts = {
  height: '240',
  width: '426',
  playerVars: { // https://developers.google.com/youtube/player_parameters
    autoplay: 0,
    hl: 'vi',
    origin: 'https://www.youtube.com'
  }
}

const parseYoutubeVideoData = (obj) => ({
  id: `youtube-video-${obj.id}`,
  videoId: obj.id,
  channelTitle: obj.snippet.channelTitle,
  viewCount: obj.statistics.viewCount,
  opts
})

export default withTranslation()(HomePage);
