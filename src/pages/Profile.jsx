import React from "react";
import { Row, Col, Card, Avatar, Typography } from "antd";
const { Title } = Typography;

const Profile = () => {
  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  const profilePic = userInfo.image_url;
  const username = userInfo.name.split("")[0];
  console.log(username);
  return (
    <>
      <Row justify="center">
        <Col>
          <Card>
            <Row justify="center">
              <Col>
                {profilePic ? (
                  <Avatar
                    src={<img src={profilePic} style={{ width: 32 }} />}
                  />
                ) : (
                  <Avatar style={{ backgroundColor: "#f56a00" }}>
                    {username ? username : "A"}
                  </Avatar>
                )}
              </Col>
            </Row>
            <Row justify="center">
              <Col xs={24}>
                <Title level={4}>Name:<span>Amit Mandal</span></Title>
              </Col>
              <Col xs={24}>
                <Title level={4}>Name:<span>Amit Mandal</span></Title>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Profile;
