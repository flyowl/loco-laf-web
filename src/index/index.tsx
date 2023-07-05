import { Loading } from '@alifd/next';
import * as React from 'react';
import {  Outlet} from 'react-router-dom';

import './index.scss';
const { useEffect, useState } = React;

// let navigate = useNavigate();

// const navigate = useNavigate()

interface Userinfo {
  avatar: String;
  email: String;
  gender: any;
  mobile: string;
  name: string;
}




interface IGetDevice {
  (width: number): 'phone' | 'tablet' | 'desktop';
}
const getDevice: IGetDevice = (width) => {
  const isPhone =
    typeof navigator !== 'undefined' && navigator && navigator.userAgent.match(/phone/gi);
  if (width < 680 || isPhone) {
    return 'phone';
  } else if (width < 1280 && width > 680) {
    return 'tablet';
  } else {
    return 'desktop';
  }
};

const Index = () => {





  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Index;
