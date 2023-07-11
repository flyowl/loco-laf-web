import {
  Avatar,
  Icon,
  Menu,
  Overlay,
  Drawer,
  Form,
  Field,
  Input,
  Radio,
  Switch,
  Divider,
  Button,
  Message
} from '@alifd/next';
import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './index.module.css';
import { Logout } from 'src/apis/lafapi';
import { permission } from 'src/utils/index';
const { Item } = Menu;
const { Popup } = Overlay;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

export interface Props {
  name: string;
  avatar: string;
  mail?: string;
  appdata?:any;
  setApp_test?:any;
}
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};
const UserProfile = (props:Props) => {
  const {name, avatar, mail} = props
  return (
    <div className={styles.profile}>
      <div className={styles.avatar}>
        <Avatar src={avatar} alt="用户头像" />
      </div>
      <div className={styles.content}>
        <h4>{name}</h4>
        <span>{mail || ''}</span>
      </div>
    </div>
  );
};

const HeaderAvatar = (props: Props) => {
  const { name, avatar,appdata,setApp_test} = props;
  
  const [dialogShow, setdialogShow] = React.useState(false);

  const navigate = useNavigate();
  async function LogOut() {
    const files = await Logout();
    navigate('/user/login');
  }
  const field = Field.useField();

  const layout =  formItemLayout;
  React.useEffect(() => {
    // if (permission('lowcode:getschema')) ∂{
    //   setDisplay('show');
    // }
    field.setValues(appdata)

  }, []);



  const DialogOpen = () => {
    setdialogShow(true);
  };
  const DialogClose = () => {
    setdialogShow(false);
  };
  const theme = [
    {
      value: 'light',
      label: '白色',
    },
    {
      value: 'dark',
      label: '黑色',
    },
    {
      value: 'brand',
      label: 'brand',
    },
  ];
  const navTheme = [
    {
      value: 'normal',
      label: '普通',
    },
    {
      value: 'primary',
      label: '主要',
    },
    {
      value: 'secondary',
      label: '次要',
    },
    {
      value: 'line',
      label: '线形',
    },
  ];
  const handleCopy = (e: ClipboardEvent) => {
    // clipboardData 可能是 null
    e.clipboardData && e.clipboardData.setData('text/plain',  JSON.stringify(field.getValues()) );
    e.preventDefault();
    // removeEventListener 要传入第二个参数
    document.removeEventListener('copy', handleCopy);
};


  const handleChange = () =>{
     setApp_test(field.getValues())
  }
  const handlesubmit = () =>{
    document.addEventListener('copy', handleCopy);
    document.execCommand('copy');
    Message.success("复制成功");



 }
  return (
    <div>
      <Drawer
        title="主题设置"
        placement="right"
        visible={dialogShow}
        closeMode={['close', 'esc', 'mask']}
        onClose={DialogClose}
        cache={true}
        width={400}
        
        className="drawer_app_setting"
      >
        <Form style={{marginBottom: "30px"}}  field={field} inline={false} labelAlign={'left'} {...layout} >
          <Divider dashed> 综合设置</Divider>

          <Form.Item label="主题风格" name="navType">
            <RadioGroup dataSource={theme} shape="button" onChange={handleChange} defaultValue='light' />
          </Form.Item>
          <Form.Item label="导航风格" name="menuType">
            <RadioGroup dataSource={navTheme} shape="button"  defaultValue='normal'  onChange={handleChange}/>
          </Form.Item>




          <Divider dashed> header设置</Divider>

          <Form.Item label="是否显示:" name="header_isShow">
          <Switch autoWidth   onChange={handleChange}/>
          </Form.Item>
          <Form.Item label="查询显示:" name="header_search">
          <Switch autoWidth   onChange={handleChange}/>
          </Form.Item>
          <Form.Item label="导航显示:" name="header_isMenu">
          <Switch autoWidth   onChange={handleChange}/>
          </Form.Item>
          <Form.Item label="名称显示:" name="header_isName">
          <Switch autoWidth   onChange={handleChange}/>
          </Form.Item>
          {/* <Form.Item label="APP显示:" name="header_App_isShow">
          <Switch autoWidth   onChange={handleChange}/>
          </Form.Item>
          <Form.Item label="APP宽度:" name="appWidth">
          <Input   
                aria-label="输入相关高度"
                addonTextAfter="px"
          onChange={handleChange} 
          />
          </Form.Item> */}
          <Form.Item label="消息显示:" name="header_isMessage">
          <Switch autoWidth   onChange={handleChange}/>
          </Form.Item>
          <Form.Item label="标题颜色:" name="color">
          <Input   
                aria-label="输入相关颜色"
                addonTextAfter="颜色"
          onChange={handleChange} 
          />
          </Form.Item>
          <Form.Item label="标题大小:" name="titleSize">
          <Input   
                aria-label="输入相关高度"
                addonTextAfter="px"
          onChange={handleChange} 
          />
          </Form.Item>
          <Divider dashed> 导航设置</Divider>

          <Form.Item label="左侧显示:" name="leftNav_isShow">
          <Switch autoWidth   onChange={handleChange}/>
          </Form.Item>
          <Form.Item label="上(左)边距:" name="leftNav_marginTop">
          <Input   
                aria-label="输入相关高度"
                addonTextAfter="px"
          onChange={handleChange} 
          />
          </Form.Item>

          <Form.Item label="导航分组:" name="leftNav_Group">
          <Switch autoWidth   onChange={handleChange}/>
          </Form.Item>
          <Divider dashed> 底部设置</Divider>
          <Form.Item label="显示页底" name="isFoor">
          <Switch autoWidth defaultChecked={false}   onChange={handleChange}/>

          </Form.Item>
          <Form.Item label="产品名称:" name="foor_Title">
          <Input   
                aria-label="产品名称"
          onChange={handleChange} 
          />
          </Form.Item>
          <Form.Item label="企业相关:" name="foor_Enterprise">
          <Input   
                aria-label="企业相关"
          onChange={handleChange} 
          />
          </Form.Item>


        </Form>
        <div
            style={{
              position: "absolute",
              bottom: 0,
              width: "100%",
              borderTop: "1px solid #e8e8e8",
              padding: "10px 16px",
              textAlign: "right",
              left: 0,
              background: "#fff",
              borderRadius: "0 0 4px 4px"
            }}
          >

            <Button  type="primary" onClick={handlesubmit}>
              复制
            </Button>
          </div>
      </Drawer>

    <div>
    <Popup
        trigger={
          <div className={styles.headerAvatar}>
            <Avatar
              size="small"
              src={avatar || 'https://img.alicdn.com/tfs/TB1.ZBecq67gK0jSZFHXXa9jVXa-904-826.png'}
              alt="用户头像"
            />
            <span style={{ marginLeft: 10 }}>{name}</span>
          </div>
        }
        triggerType="click"
      >
        <div className={styles.avatarPopup}>
          {
            
            props.name && (<UserProfile {...props} />)
          }
          
          <Menu className={styles.menu}>
          {/* {permission('lowcode:getschema') && ( */}
            <Item>
            <Icon size="small" type="account" />{' '}
            <Link to="/editor.html" target={'_blank'}>
              可视化编辑器
            </Link>
          </Item>
          

          {/* )} */}

            {/* {permission('lowcode:Update') && ( */}
              <Item >
              <Icon size="small" type="set" /> 
              <a onClick={DialogOpen}>主题样式设置</a>
            </Item>
            {/* )} */}

            <Item>
              <Icon size="small" type="account" /> <Link to="/userinfo">个人设置</Link>
            </Item>
            <Item onClick={LogOut}>
              <Icon size="small" type="exit" />
              退出
            </Item>
          </Menu>
        </div>
      </Popup>
    </div>
    </div>
  );
};

HeaderAvatar.defaultProps = {
  name: null,
  // mail: 'name@gmail.com',
  avatar: 'https://img.alicdn.com/tfs/TB1.ZBecq67gK0jSZFHXXa9jVXa-904-826.png',
};

export default HeaderAvatar;
