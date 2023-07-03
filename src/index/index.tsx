import { Loading, Nav, Search, Shell, Icon, Dropdown } from '@alifd/next';
import * as React from 'react';
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import { Logout } from 'src/apis/Login';
import { allDictionary, list_Route_Menus } from 'src/apis/menu';
import  { sys_menuList } from 'src/apis/lafapi'
import { getUserInfo } from 'src/apis/user';
import { delTreeData } from 'src/utils';
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

const { Item, SubNav, Group } = Nav;

// function getQueryString(name: String) {
//   var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
//   var r = window.location.search.substr(1).match(reg);
//   if (r != null) {
//     return decodeURI(r[2]);
//   }
//   return null;
// }

(function () {
  const throttle = function (type: string, name: string, obj: Window = window) {
    let running = false;

    const func = () => {
      if (running) {
        return;
      }

      running = true;
      requestAnimationFrame(() => {
        obj.dispatchEvent(new CustomEvent(name));
        running = false;
      });
    };

    obj.addEventListener(type, func);
  };

  if (typeof window !== 'undefined') {
    throttle('resize', 'optimizedResize');
  }
})();

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
  const url = useParams()['*'] ||'background' ;
  console.log(url)
  const [device, setDevice] = useState(getDevice(NaN));
  const [files, setFiles] = useState([]);
  const [app, setApp] = useState({
    "appName": "低代码脚手架",
    // "appWidth": "200px",
    "color": "#5584ff",
    "titleSize": "18px",
    "menuType": "normal",
    "navType": "light",
    "header_isShow": true,
    "header_search": false,
    "header_isName": true,
    "header_isMenu": false,
    "header_isfixed": true,
    "leftNav_isShow": true,
    "leftNav_IconOnly":true,
    "header_isMessage": true,
    "leftNav_marginTop": "5px",
    "leftNav_Group": false,
    "header_isFoor": true,
    "foor_Title": "dfgd",
    "foor_Enterprise": "LOCO低代码",
    "isFoor": true,
    "header_App_isShow": false
});

  const [load, setload] = useState(true);

  const [UserInfo, setUserInfo] = useState({
    name: null,
    avatar: 'https://img.alicdn.com/tfs/TB1.ZBecq67gK0jSZFHXXa9jVXa-904-826.png',
  });



  const navigate = useNavigate();
  async function LogOut() {
    const files = await Logout();
    navigate('/user/login');
  }
  async function startallDictionary() {
    await allDictionary();
  }

  async function getUser() {
    const user = await getUserInfo();
    if (!user) {
      return
    }
    setUserInfo(user);
    startallDictionary();
  }
  async function getFiles() {

            setload(false);

    const files = await sys_menuList();
    
    setFiles(files);
  }
  useEffect(() => {
    getFiles();
    // getUser();
  }, []);





  if (load) {
    return <Loading fullScreen tip="加载中" size="large" />;
  }

  return (
    <div>
        <div>首----页</div>
      <Outlet />
    </div>
  );
};

export default Index;
