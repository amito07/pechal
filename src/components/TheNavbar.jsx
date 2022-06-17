import React from 'react';
import { Button, Layout, Avatar, Menu, Dropdown } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import './TheNavbar.css';

const { Header } = Layout;

const TheNavbar = () => {
  const history = useHistory();
  const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
  const UserName = userInfo?.name?.split("")[0]

  console.log(UserName)

  const logout = () => {
    sessionStorage.clear();
    history.push('/login');
    window.location.reload(false);
  };

  const menu = (
    <Menu
      items={[
        {
          key: '1',
          label: (
            <a target="_blank" rel="noopener noreferrer" onClick={()=>history.push('/profile')}>
              Profile
            </a>
          ),
        },
        {
          key: '2',
          label: (
            <a target="_blank" rel="noopener noreferrer" onClick={logout}>
              Logout
            </a>
          ),
        },
      ]}
    />
  );

  return (
    <div>
      <Layout className='layout'>
        <Header className='login-header'>
          <Link to='/'>
            <div className='logo-link'>
              <p className='logo-text'>Blood Lagbe</p>
            </div>
          </Link>
          {sessionStorage && sessionStorage.getItem('isLoggedIn') && (
            <Dropdown overlay={menu} placement="bottomLeft" arrow>
              <Avatar style={{ backgroundColor: '#f56a00' }}>{UserName? UserName: "A"}</Avatar>
            </Dropdown>
            
          )}
        </Header>
      </Layout>
    </div>
  );
};

export default TheNavbar;
