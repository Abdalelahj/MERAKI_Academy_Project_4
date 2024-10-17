import React from 'react';
import { Collapse } from 'antd';
const text_1 = `
 You can find the room and property facilities in your booking confirmation.
`;
const text_2 = `
 This depends on the property who will do their best to meet your needs, but cannot guarantee your request.
`;
const text_3 = `
  You may be charged a prepayment according to the property's prepayment policy. This is done to verify your credit card, where a temporary hold is placed on an amount until after check-out. It's best to contact the property for any charging queries.
`;
const text_4 = `
It depends on the booking's payment policy.
`;
const items = [
  {
    key: '1',
    label: "How do I get more information about the room or property's facilities?",
    children: <p>{text_1}</p>,
  },
  {
    key: '2',
    label: 'I will be arriving outside check-in hours. Can I still check-in?',
    children: <p>{text_2}</p>,
  },
  {
    key: '3',
    label: "Who is going to charge my credit card, and when?",
    children: <p>{text_3}</p>,
  },
  {
    key: '4',
    label: "Does the property need a deposit or a payment in advance?",
    children: <p>{text_4}</p>,
  },
];
const Frequent = () => {
  const onChange = (key) => {
    console.log(key);
  };
  return <Collapse   size="small" items={items} defaultActiveKey={['1']} onChange={onChange} 
  style={{width:1300,textAlign:"start"}} />;
};
export default Frequent;