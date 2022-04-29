import React from 'react';
import { Menu } from 'antd';
import './Navigation.css';

export const Navigation = ({ currentTab, getTab }) => {
  const menu = ['Search', 'Rated'];
  return (
    <Menu mode="horizontal" defaultSelectedKeys={[currentTab]}>
      {menu.map((el) => (
        <Menu.Item onClick={getTab} key={el}>
          {el}
        </Menu.Item>
      ))}
    </Menu>
  );
};
