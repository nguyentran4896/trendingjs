import React from "react";
import PropTypes from "prop-types";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Form,
  Alert
} from "shards-react";

import PageTitle from "./../components/common/PageTitle";
import SmallStats from "./../components/common/SmallStats";
import AppChart from "../components/blog/AppChart";
import SDKVerionChart from "../components/blog/SDKVersionChart";
import UsersByDevice from "./../components/blog/UsersByDevice";
import NewDraft from "./../components/blog/NewDraft";
import Discussions from "./../components/blog/Discussions";
import TopReferrals from "./../components/common/TopReferrals";
import Sliders from "../components/components-overview/Sliders";
import RowSmallStats from "../components/common/RowSmallStats";


const BlogOverview = () => (
  <Container fluid className="main-content-container px-4">
    {/* Page Header */}
    <Row noGutters className="page-header py-4">
      <PageTitle title="Top daily trends" subtitle="Dashboard" className="text-sm-left mb-3" />
    </Row>

    {/* Small Stats Blocks */}
    <Row>
      <RowSmallStats/>
    </Row>

    <Row>
      {/* Users Overview */}
      <Col lg="8" md="12" sm="12" className="mb-4">
        <AppChart />
      </Col>

      {/* Users by Device */}
      <Col lg="4" md="6" sm="12" className="mb-4">
        <UsersByDevice />
      </Col>

      <Col lg="8" md="12" sm="12" className="mb-4">
        <SDKVerionChart />
      </Col>

      {/* New Draft */}
      <Col lg="4" md="6" sm="12" className="mb-4">
        <NewDraft />
      </Col>

      {/* Discussions */}
      <Col lg="5" md="12" sm="12" className="mb-4">
        <Discussions />
      </Col>

      {/* Top Referrals */}
      <Col lg="3" md="12" sm="12" className="mb-4">
        {/* <TopReferrals /> */}

        <Card small className="mb-4">
            <CardHeader className="border-bottom">
              <h6 className="m-0">Sliders & Progress Bars</h6>
            </CardHeader>
            <ListGroup flush>
              <Sliders />
            </ListGroup>
          </Card>
      </Col>
    </Row>
  </Container>
);

export default BlogOverview;
