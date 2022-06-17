import React, { useState } from 'react'
import {Row,Col,Card,Badge} from "antd";

const Feed = ({value}) => {
  return (
    <>
     <Card
        bordered={false}
        style={{
          width: 300,
          borderRadius:"5px"
          
        }}
      >
        <Row justify='space-between'>
            <Col span={12}><p>{value.name}</p><p>{value.publish_time}</p> </Col>
            <Badge count={value.is_managed ? "Managed" : "Searching"} />
        </Row>
        <Row>
            <Col xs={24}>Blood Group: {value.blood_group}</Col>
            <Col xs={24}>Number of bag: {value.total_data}</Col>
            <Col xs={24}>Hospital Name: {value.hospital_name}</Col>
            <Col xs={24}>Address: {value.address}</Col>
            <Col xs={24}>Phone Number: {value.phone}</Col>
            <Col xs={24}>Need For: {value.need_for}</Col>
            <Col xs={24}>Time: {value.need_within}</Col>
        </Row>
      </Card>
    </>
  )
}

export default Feed