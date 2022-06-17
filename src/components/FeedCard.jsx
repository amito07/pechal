import React from "react";
import { Row, Col, Card, Typography } from "antd";
const { Title } = Typography;

const FeedCard = ({cardicon,cardtitle,primarycolor,secondarycolor}) => {
  return (
    <>
      <div className="site-card-border-less-wrapper">
        <Card
          bordered={false}
          style={{ width: 300, background: primarycolor, borderRadius: "5px" }}
        >
          <Row justify="center">
            <Col>
             {cardicon}
            </Col>
          </Row>
          <Row justify="center">
            <Col>
              <Title level={6} style={{ color: secondarycolor }}>
                {cardtitle}
              </Title>
            </Col>
          </Row>
        </Card>
      </div>
    </>
  );
};

export default FeedCard;
