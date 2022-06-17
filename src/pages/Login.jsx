import React, { useState } from "react";
import { Row, Col, Button, Checkbox, Form, Input, Layout,Typography,Card } from "antd";
import { useHistory } from "react-router-dom";
import axios from 'axios';
const { Content } = Layout;
const {Title} = Typography;


const Login = () => {
  const history = useHistory();
  const onFinish = async(values) => {
    const userNumber = {
      "phone":values.phoneNo
    }
    let axiosConfig = {
      headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "*",
      }
    };
    const result = await axios.post('https://bloodlagbe-api.herokuapp.com/api/v1/auth/signin',userNumber,axiosConfig)
    const {data} = result.data;
    if(data){
      sessionStorage.setItem("token",data.token)
      const userInfo = {"name":data.name,"image_url":data.image}
      sessionStorage.setItem("userInfo",JSON.stringify(userInfo))
    }
    
    sessionStorage.setItem("isLoggedIn",true)
    history.push('/')
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <Content>
        <Row style={{marginTop:"100px"}} justify='center' gutter={[250,50]}>
          <Col>
          <Title level={1} style={{color:'#e53935'}}>Welcome to Blood Bank</Title>
          <Title level={5}>Your one bag of blood could save a life.</Title>
          </Col>
          <Col>
          <Card style={{borderRadius:'5px',padding:'10px'}}>
          <Form
            name="basic"
            layout="vertical"
            labelCol={{
              span: 16,
            }}
            wrapperCol={{
              span: 24,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            
          >
            <Form.Item
              label="Phone Number"
              name="phoneNo"
              
              rules={[
                // {
                //   required: true,
                //   message: "Please input your phone number!",
                // },
                {
                  pattern: new RegExp( /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/ ),
                  message: "Please input your Phone Number",
                }
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 13,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>

          </Card>

          </Col>
          
        </Row>
      </Content>
    </>
  );
};

export default Login;
