
import * as React from 'react';
import { Input, Message, Form, Divider, Checkbox, Icon } from '@alifd/next';

import { useInterval } from './utils';
import  './index.module.css';

const { Item } = Form;

export interface IDataSource {
  name: string;
  password: string;
  autoLogin: boolean;
  phone: string;
  code: string;
}

const DEFAULT_DATA: IDataSource = {
  name: '',
  password: '',
  autoLogin: true,
  phone: '',
  code: '',
};

interface LoginProps {
  dataSource?: IDataSource;
}
const { useState } = React;
const LoginBlock: React.FunctionComponent<LoginProps> = (
  props = { dataSource: DEFAULT_DATA },
): JSX.Element => {
  const { dataSource = DEFAULT_DATA } = props;

  const [postData, setValue] = useState(dataSource);

  const [isRunning, checkRunning] = useState(false);
  const [isPhone, checkPhone] = useState(false);
  const [second, setSecond] = useState(59);

  useInterval(
    () => {
      setSecond(second - 1);
      if (second <= 0) {
        checkRunning(false);
        setSecond(59);
      }
    },
    isRunning ? 1000 : null,
  );

  const formChange = (values: IDataSource) => {
    setValue(values);
  };

  const sendCode = (values: IDataSource, errors: []) => {
    if (errors) {
      return;
    }
    // get values.phone
    checkRunning(true);
  };

  const handleSubmit = (values: IDataSource, errors: []) => {
    if (errors) {
      console.log('errors', errors);
      return;
    }
    console.log('values:', values);
    Message.success('登录成功');
  };

  const phoneForm = (
    <>
      <Item format="tel" required requiredMessage="必填" asterisk={false}>
        <Input
          name="phone"
          innerBefore={
            <span className={'innerBeforeInput'}>
              +86
              <span className={'line'} />
            </span>
          }
          maxLength={20}
          placeholder="手机号"
        />
      </Item>
      <Item required requiredMessage="必填" style={{ marginBottom: 0 }}>
        <Input
          name="code"
          innerAfter={
            <span className={'innerAfterInput'}>
              <span className={'line'} />
              <Form.Submit
                text
                type="primary"
                style={{ width: 64 }}
                disabled={!!isRunning}
                validate={['phone']}
                onClick={sendCode}
                className={'sendCode'}
              >
                {isRunning ? `${second}秒后再试` : '获取验证码'}
              </Form.Submit>
            </span>
          }
          maxLength={20}
          placeholder="验证码"
        />
      </Item>
    </>
  );

  const accountForm = (
    <>
      <Item required requiredMessage="必填">
        <Input name="name" maxLength={20} placeholder="用户名" />
      </Item>
      <Item required requiredMessage="必填" style={{ marginBottom: 0 }}>
        <Input.Password name="password" htmlType="password" placeholder="密码" />
      </Item>
    </>
  );

  const byAccount = () => {
    checkPhone(false);
  };

  const byForm = () => {
    checkPhone(true);
  };

  return (
    <div className={'loginBlock'}>
      <div className={'innerBlock'}>
        <a href="#">
          <img
            className={'logo'}
            src="https://img.alicdn.com/tfs/TB1KtN6mKH2gK0jSZJnXXaT1FXa-1014-200.png"
            alt="logo"
          />
        </a>
        <div className={'desc'}>
          <span onClick={byAccount} className={isPhone ? undefined : 'active'}>
            账户密码登录
          </span>
          <Divider direction="ver" />
          <span onClick={byForm} className={isPhone ? 'active' : undefined}>
            手机号登录
          </span>
        </div>

        <Form value={postData} onChange={formChange} size="large">
          {isPhone ? phoneForm : accountForm}

          <div className={'infoLine'}>
            <Item style={{ marginBottom: 0 }}>
              <Checkbox name="autoLogin" className={'infoLeft'}>
                自动登录
              </Checkbox>
            </Item>
            <div>
              <a href="/" className={'link'}>
                忘记密码
              </a>
            </div>
          </div>

          <Item style={{ marginBottom: 10 }}>
            <Form.Submit
              type="primary"
              onClick={handleSubmit}
              className={'submitBtn'}
              validate
            >
              登录
            </Form.Submit>
          </Item>
          <div className={'infoLine'}>
            <div className={'infoLeft'}>
              其他登录方式 <Icon type="atm" size="small" /> <Icon type="atm" size="small" />{' '}
              <Icon type="atm" size="small" />
            </div>
            <a href="/" className={'link'}>
              注册账号
            </a>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default LoginBlock;
