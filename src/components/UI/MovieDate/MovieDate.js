import React from 'react';
import { Typography } from 'antd';
import { format } from 'date-fns';
import './MovieDate.css';

const { Paragraph } = Typography;

export const MovieDate = ({ date }) => {
  const formatedDate = date ? format(new Date(date), 'LLLL d, yyyy') : '';
  return <Paragraph className="customCard__paragraph">{formatedDate}</Paragraph>;
};
