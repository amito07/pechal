import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Table, Typography, Space, Button, Tooltip, Spin } from 'antd';
import { DeleteOutlined, MinusCircleOutlined } from '@ant-design/icons';

import { BaseAPI } from '../utils/ApiGateway';
import EmptyState from '../components/EmptyState';
import Notification from '../utils/Notification';

const { Title } = Typography;

const Requisition = () => {
  const [requisitionItems, setRequisitionItems] = useState([]);
  const [updatedItems, setUpdatedItems] = useState([]);
  const [newArray, setNewArray] = useState([]);
  const [changesData, setChangesData] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('retailerCode') != null) {
      setLoading(true);
      BaseAPI.get(`/gift/requisition/view/${sessionStorage.getItem('retailerCode')}`)
        .then((res) => {
          console.log(res);
          setRequisitionItems(res.data.data[0].cart);
          setUpdatedItems(res.data.data[0].cart);

          let ids = [];
          res.data.data[0].cart.map((x) => {
            for (let i = 0; i < x.unit; i++) {
              ids.push(x.id);
            }
          });
          setNewArray(ids);
        })
        .catch((err) => {
          if (err?.response?.data?.message) {
            Notification(err?.response?.data?.message, 'Please fix this error and try again. Otherwise communicate with the admin', 'error');
          } else {
            Notification('Something went wrong', 'Please check your internet connection and try again or communicate with the admin', 'error');
          }
        })
        .finally(() => setLoading(false));
    }
  }, []);

  const itemDelete = (record) => {
    let newItems = updatedItems.filter((x, i) => x.id !== record.id);
    setUpdatedItems(newItems);
    let addPoints = (+sessionStorage.getItem('maxAchievableScore') + record.unit * record.scores).toFixed(2);
    sessionStorage.setItem('maxAchievableScore', addPoints);

    let arr = [...new Set(newArray)];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === record.id) {
        console.log('id ', arr[i]);
        let index = arr.findIndex((x) => x === record.id);
        arr.splice(index, 1);
      }
    }
    setChangesData(true);
    setNewArray(arr);
  };

  const decreaseItem = (record) => {
    console.log('record', record);
    let newItems = updatedItems.map((x, i) => {
      return {
        ...x,
        unit: record.id === x.id ? record.unit - 1 : x.unit,
      };
    });
    setUpdatedItems(newItems);

    const addPoints = (+sessionStorage.getItem('maxAchievableScore') + record.scores).toFixed(2);
    sessionStorage.setItem('maxAchievableScore', addPoints);

    let arr = newArray;
    let index = arr.findIndex((x) => x === record.id);
    arr.splice(index, 1);
    setChangesData(true);
  };

  const onUpdate = () => {
    const values = {
      rtlid: sessionStorage.getItem('retailerId'),
      uid: sessionStorage.getItem('tsaId'),
      gift: newArray,
    };
    setLoading(true);
    BaseAPI.post('/gift/requisition/insert', values)
      .then((res) => {
        Notification('Success', 'Your requisition has been changed', 'success');
        setChangesData(false);
      })
      .catch((err) => {
        if (err?.response?.data?.message) {
          Notification(err?.response?.data?.message, 'Please fix this error and try again. Otherwise communicate with the admin', 'error');
        } else {
          Notification('Something went wrong', 'Please check your internet connection and try again or communicate with the admin', 'error');
        }
      })
      .finally(() => setLoading(false));
  };

  // requisition table column
  const requisitionColumns = [
    {
      title: 'Gift Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Brand Name',
      dataIndex: 'brand',
      key: 'brand',
    },
    {
      title: 'Unit',
      dataIndex: 'unit',
      key: 'unit',
    },
    {
      title: 'Slab',
      dataIndex: 'slab',
      key: 'slab',
    },
    {
      title: 'Score',
      dataIndex: 'scores',
      key: 'scores',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size='middle'>
          {record.unit > 1 ? (
            <Tooltip title='Decrease one item'>
              <MinusCircleOutlined style={{ cursor: 'pointer', color: 'blue' }} onClick={() => decreaseItem(record)} />
            </Tooltip>
          ) : null}
          <Tooltip title='Remove whole item'>
            <DeleteOutlined style={{ cursor: 'pointer', color: 'red' }} onClick={() => itemDelete(record)} />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <Spin spinning={loading}>
      {requisitionItems.length > 0 ? (
        <>
          <Row justify='center'>
            <Title level={2}> Your Requisition Items</Title>
          </Row>
          <Row>
            <Col xs={{ span: 24 }}>
              <Card className='card'>
                <Table columns={requisitionColumns} dataSource={updatedItems} pagination={false} scroll={{ x: 1000 }} />
              </Card>
            </Col>
          </Row>
          {changesData && (
            <Row style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
              <Col>
                <Button type='primary' onClick={() => onUpdate()}>
                  Update
                </Button>
              </Col>
            </Row>
          )}
        </>
      ) : (
        <Row justify='center'>
          <EmptyState description='Please submit your requisition from gift page.' />
        </Row>
      )}
    </Spin>
  );
};

export default Requisition;
