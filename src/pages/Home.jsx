import React from "react";
import { Row, Col} from "antd";
import { TbListDetails } from "react-icons/tb";
import { HiUserGroup } from "react-icons/hi";
import {MdFactCheck} from 'react-icons/md';
import FeedCard from "../components/FeedCard";
const feedStyle = {
  fontSize: "30px", color: "#1565c0"
}
const groupstyle = {
  fontSize: "30px", color: "#e53935"
}

const mygroupstyle = {
  fontSize: "30px", color: "#43a047"
}

const Home = () => {
  return (
    <>
      <Row justify="center" gutter={[50, 48]}>
        <Col>
        <FeedCard cardicon={<TbListDetails style={feedStyle} />} cardtitle={"Feed"} primarycolor={"#bbdefb"} secondarycolor={"#1565c0"} />
        </Col>
        <Col>
        <FeedCard cardicon={<HiUserGroup style={groupstyle} />} cardtitle={"Groups"} primarycolor={"#ffcdd2"} secondarycolor={"#e53935"} />
        </Col>
      </Row>
      <Row justify="center" gutter={[50, 48]} style={{marginTop:'50px'}}>
        <Col>
        <FeedCard cardicon={<MdFactCheck style={mygroupstyle} />} cardtitle={"My Group"} primarycolor={"#c8e6c9"} secondarycolor={"#43a047"} />
        </Col>
      </Row>

    </>
  );
};

export default Home;
