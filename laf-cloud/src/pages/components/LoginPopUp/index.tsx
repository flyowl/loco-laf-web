import React from 'react';
import { View, ImageBackground, Text, AtButton } from 'cross-ui';
import { requestHandle } from '@/utils/dataSource';
import * as utils from '@/utils';
import constants from '@/utils/constants';
import "./index.scss";
const {
  px,
  RefsManager,
  $eval,
  $evalArray,
  $createChildContext
} = utils;
class LoginPopUp$Page extends React.Component<any, any> {
  _dataSourceConfig = this._defineDataSourceConfig();
  _dataSourceEngine = utils.dataSource(this._dataSourceConfig, this, {
    runtimeConfig: true,
    requestHandlersMap: {
      fetch: requestHandle()
    }
  });
  get dataSourceMap() {
    return this._dataSourceEngine.dataSourceMap || {};
  }
  reloadDataSource = async () => {
    await this._dataSourceEngine.reloadDataSource();
  };
  constructor(props, context) {
    super(props);
    this.state = {
      codeToOpenid: {},
      codePhoneLogin: {}
    };
  }
  utils = Object.assign({
    getRoute: utils.createRoute('LoginPopUp')
  }, utils);
  constants = constants;
  $ = () => null;
  $$ = () => [];
  _defineDataSourceConfig() {
    const _this = this;
    return {
      list: [{
        id: 'codeToOpenid',
        isInit: function () {
          return false;
        },
        isSync: false,
        type: 'fetch',
        options: function () {
          return {
            uri: _this.constants.HostDomain + '/system_weixin-applet-login',
            contentType: 'JSON',
            method: 'POST',
            params: {},
            headers: {},
            timeout: 15000
          };
        }
      }, {
        id: 'codePhoneLogin',
        isInit: function () {
          return false;
        },
        isSync: false,
        type: 'fetch',
        options: function () {
          return {
            uri: _this.constants.HostDomain + '/system_weixin-applet-authorize',
            contentType: 'JSON',
            method: 'POST',
            params: {
              code: '',
              openid: 'xxx-xxx'
            },
            headers: {}
          };
        }
      }]
    };
  }
  phoneNumberCallback = async e => {
    try {
      const {
        scene
      } = this.utils.getRoute()?.query;
      console.log('scene: ', scene);
      console.log('queryToObject: ', this.utils.queryToObject);
      const params = this.utils.queryToObject(decodeURIComponent(scene));
      console.log('params: ', params);
      const {
        code
      } = e.detail;
      const hideLoading = this.utils.messages()?.loading();
      const {
        inviteCode,
        uuid
      } = params;
      const res = await this.dataSourceMap['codePhoneLogin']?.load({
        code,
        openid: this.openid,
        uuid,
        inviteCode: inviteCode && inviteCode != 'undefined' ? inviteCode : this.hs_i
      });
      hideLoading();
      if (res.code === 0 && res.data) {
        const accessToken = res.data;
        await this.utils.setStorageItem('accessToken', accessToken);
        this.utils.setGlobalData('accessToken', accessToken);
        this.utils.setStorageItem('hs_i', '');
      } else {
        this.utils.messages().error(res.msg || '登录失败');
        this.initialize();
      }
    } catch (e) {
      this.utils.messages().error('登录失败,稍后重试');
      this.initialize();
    }
  };
  getOpenid = async () => {
    return new Promise(async (resolve, reject) => {
      this.utils.login().then(async res => {
        console.log(99990000, res);
        const codeToOpenid = await this.dataSourceMap['codeToOpenid']?.load({
          code: res.code
        });
        if (codeToOpenid.code === 0) {
          this.setState({
            openid: codeToOpenid.data
          }, () => {
            resolve(codeToOpenid.data);
          });
        }
      }).catch(e => {
        console.log('e: ', e);
        reject(e);
      });
    });
  };
  initialize = async () => {
    try {
      this.utils.showLoading({
        title: '',
        mask: true
      });
      const openid = await this.getOpenid();
      console.log('openid: ', openid);
      this.openid = openid;
      this.utils.hideLoading();
    } catch (e) {
      this.utils.showToast({
        title: '登陆失败，请重新扫码',
        icon: 'none'
      });
    }
  };
  componentDidMount() {
    this._dataSourceEngine.reloadDataSource();
    this.initialize();
  }
  render() {
    const _this = this;
    return <React.Fragment>
        <View className='LoginPopUp__vw'>
          <View animationIn='' className='LoginPopUp__vw__vw'>
            <View animationIn='pulse' inDuration={2000} inDelay={600} className='LoginPopUp__vw__vw__vw'>
              <ImageBackground src='https://qn.iruddock.com/hysliCloud/20230720/e8ef2772-fef8-4ab0-9ad2-647e47e3accb.png' className='LoginPopUp__vw__vw__vw__ibg'>
                <View className='LoginPopUp__vw__vw__vw__ibg__vw'>
                  <Text className='LoginPopUp__vw__vw__vw__ibg__vw__tx'>
                    欢迎您加入我们的AI乐园
                  </Text>
                </View>
              </ImageBackground>
            </View>
          </View>
          <View className='LoginPopUp__vw__vw1'>
            <AtButton type='primary' openType='getPhoneNumber' onGetPhoneNumber={e => {
            this.phoneNumberCallback(e);
          }} className='LoginPopUp__vw__vw1__AtButton'>
              手机号一键登陆
            </AtButton>
          </View>
          <View onClick={e => {
          this.utils.test();
          // this.utils.redirectTo('loginPage')
        }} className='LoginPopUp__vw__vw2'>
            <Text className='LoginPopUp__vw__vw2__tx'>验证码/密码登陆</Text>
          </View>
        </View>
      </React.Fragment>;
  }
}
export default LoginPopUp$Page;