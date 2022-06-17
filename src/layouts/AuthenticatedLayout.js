import React, { useEffect, useState } from 'react';
import { Layout, Menu, Affix, Button } from 'antd';
import { InfoCircleOutlined, GiftOutlined, GoldOutlined, ShoppingCartOutlined,HomeOutlined } from '@ant-design/icons';
import {BsFillSignpost2Fill} from 'react-icons/bs';

import AppRoutes from '../routes';
import { Link, useLocation } from 'react-router-dom';

import './Menulayout.css';

const { Content, Footer } = Layout;

const AuthenticatedLayout = () => {
  const location = useLocation();

  const [path, setPath] = useState('');

  useEffect(() => {
    setPath(location.pathname);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Layout>
      <Affix>
        <Menu selectedKeys={[path.split('/')[1]]} mode='horizontal' style={{justifyContent:'right'}}>
          <Menu.Item key='' icon={<HomeOutlined />} style={{ fontWeight: 'bold' }}>
            Home <Link to='/' />
          </Menu.Item>
          <Menu.Item key='gifts' icon={<BsFillSignpost2Fill />} style={{ fontWeight: 'bold' }}>
            Feeds <Link to='/feeds' />
          </Menu.Item>
          <Menu.Item key='cart' icon={<ShoppingCartOutlined />} style={{ fontWeight: 'bold' }}>
            My Cart <Link to='/cart' />
          </Menu.Item>
          <Menu.Item key='requisition' icon={<GoldOutlined />} style={{ fontWeight: 'bold' }}>
            Requisition Items <Link to='/requisition' />
          </Menu.Item>
        </Menu>
      </Affix>

      <Layout>
        <Content style={{ margin: '24px 16px 0' }}>
          <div className='site-layout-background' style={{ padding: '12px 24px', minHeight: 800 }}>
            <AppRoutes />
          </div>
        </Content>

        <Footer style={{ textAlign: 'center' }}>Blood Lagbe ©{new Date().getFullYear()} Nanosoft Ltd</Footer>
      </Layout>
    </Layout>
  );
};

export default AuthenticatedLayout;
