import { Loading, Nav, Search, Shell } from '@alifd/next';
import * as React from 'react';
import {admin} from 'src/apis/config'
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Logout } from 'src/apis/lafapi';
import  { sys_menuList } from 'src/apis/lafapi'
import Footer from './Footer';
import HeaderAvatar from './HeaderAvatar';
import './index.scss';
import Notice from './Notice';
import BlockCard from './setting/appshow';
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

const App = () => {
  // const url = useParams()['*'] ||'background' ;

const thema =   window.localStorage.getItem('app_theme')
// debugger

  const [device, setDevice] = useState(getDevice(NaN));
  const [files, setFiles] = useState([]);
  const [app, setApp] = useState(JSON.parse(thema)||
    {
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
}
);

  const [load, setload] = useState(true);

  const [UserInfo, setUserInfo] = useState({
    name: null,
    avatar: 'https://img.alicdn.com/tfs/TB1.ZBecq67gK0jSZFHXXa9jVXa-904-826.png',
  });

  const Responsive = ()=>{
    
  }
  const processApp =(data:any,name:string) =>{
    data.appName = name
    const deviceWidth = window.innerWidth
    if (deviceWidth < 680){
      data.header_isShow = true //header是否显示
      // data.header_App_isShow=false
      data.header_search= false // 查询是否显示
      data.header_isName= false // 名称是否显示
      data.header_isMenu= false // 菜单是否显示
      data.header_isfixed= false //是否固定按钮
      data.leftNav_isShow= true  //
      setDevice('phone')
      setApp(data)
    }else{
      setApp(data)
      setDevice(getDevice(deviceWidth));
    }
  }

  const navigate = useNavigate();
  async function LogOut() {
    const files = await Logout();
    navigate('/user/login');
  }
  async function startallDictionary() {
    // await allDictionary();
  }

  async function getUser() {
    // const user = await getUserInfo();
    // if (!user) {
    //   return
    // }
    // setUserInfo(user);
    startallDictionary();
  }
  async function getFiles() {
            setload(false);
    const files = await sys_menuList();
    
    setFiles(files);
  }
  useEffect(() => {
    getFiles();
  }, []);


  const renderMenuData = (data: any) => {
    if (data ==undefined){
      return
    }
    return data.map((item: any) => {
      if (item.parentId =="-1") {
        if (item.menuType  == 0){
          return (
            <SubNav key={item._id} label={item.name} icon={item.icon}>
              {renderMenuData(item.children)}
            </SubNav>
          );
        }

      }

        return (

                    <Item icon={item.icon}>
              <Link to={admin+ item.path}>{item.name} </Link>
            </Item>
        );
      
    });
    // return data.map((item: any) => {
    //   if (item.parentId =="-1") {

    //     if (item.menuType  == 0){
    //       return (
    //         <SubNav key={item._id} label={item.name} icon={item.icon}>
    //           {renderMenuData(item.children)}
    //         </SubNav>
    //       );
    //     }
    //   }
    //   if (item.path) {
    //       return (
    //         <Item icon={item.icon}>
    //           <Link to={admin+ item.path}>{item.name} </Link>
    //         </Item>
    //       );
    //     }

    //     return (
    //       <Item icon={item.icon} key={item._id}>
    //         {item.name}
    //       </Item>
    //     );
    // });
  };



  const renderNav = (type: any) => {
    return (
      <Nav
        embeddable
        type={app.menuType}
        hasTooltip
        aria-label="global navigation"
        style={{ width: '100%' }}
        hasArrow={false}
        direction={type}
        openMode="single"
        
      >
        {files.length ? renderMenuData(files) : null}
      </Nav>
    );
  };

  if (load) {
    return <Loading fullScreen tip="加载中" size="large" />;
  }

  return (
    <div>
      <Shell
        fixedHeader={app.header_isfixed}
        style={{ backgroundColor: 'red' }}
        className="iframe-hack"
        type={app.navType}
        fixedHeader={false}
        device={device}
        // style={{ border: '1px solid #eee', minHeight: '100vh' }}
      >
        {app.header_isShow && (
          <Shell.Branding >
            {/* <div className="çç"></div> */}
            {app.header_isName && (
              <span className="nav-name" style={{ color: app.color, fontSize: app.titleSize }}>
                <span>{app?.appName}</span>
              </span>
            )}

            {app.header_isMenu ? renderNav('hoz') : null}
          </Shell.Branding>
        )}

        {app.header_isShow && (
          <Shell.Action>
            {app.header_search && (
              <Search
                key="2"
                shape="simple"
                style={{ width: '250px', marginRight: '40px' }}
              ></Search>
            )}
            {app.header_isMessage && <Notice /> }
            
            <HeaderAvatar
              name={UserInfo.name}
              avatar={UserInfo.avatar}
              appdata={app}
              setApp_test={setApp}
            />
          </Shell.Action>
        )}

        {app?.leftNav_isShow && (
          <Shell.Navigation  className='nav-menu'>
            {app?.leftNav_Group ? (
              <div style={{ marginTop: app?.leftNav_marginTop }}>
                <Nav
                  embeddable
                  hasTooltip
                  style={{ width: '100%' }}
                  hasArrow={false}
                  openMode="single"
                  aria-label="global navigation"
                >
                  {files.length ? renderMenuData(files) : null}
                </Nav>
              </div>
            ) : (
              <div style={{ marginTop: app?.leftNav_marginTop }}>{renderNav('ver')}</div>
            )}
          </Shell.Navigation>
        )}
        <Shell.Content>
          <Outlet />
        </Shell.Content>
        {app?.isFoor && (
          <Shell.Footer>
            <Footer title={app.foor_Title}
              enterprise={app.foor_Enterprise} />
          </Shell.Footer>
        )}
      </Shell>
    </div>
  );
};

export default App;
