import React from 'react';
import { Slider } from 'antd';
const TimeS = () => {

  return (
    <Slider
    disabled
    placement="hi"
    range defaultValue={[0,50,100]}
    style={{width:320 }}
    />
  );
};
export default TimeS;