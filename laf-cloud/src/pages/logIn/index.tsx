import static_image from "./images/image.png";
import ICONS from "./icons";
import React from 'react';
import { Page, View, ScrollView, Image, Text, AtIcon, Input, ImageBackground, Modal, AtButton, AtDivider } from 'cross-ui';
import { requestHandle } from '@/utils/dataSource';
import WechatComponentOneClickLogin from "@/pages/components/WechatComponentOneClickLogin";
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
class LogIn$Page extends React.Component<any, any> {
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
      username: '',
      password: ''
    };
  }
  utils = Object.assign({
    getRoute: utils.createRoute('logIn')
  }, utils);
  constants = constants;
  _refsManager = new RefsManager();
  $ = refName => {
    return this._refsManager.get(refName);
  };
  $$ = refName => {
    return this._refsManager.getAll(refName);
  };
  _defineDataSourceConfig() {
    const _this = this;
    return {
      list: [{
        id: 'sys_user_login',
        isInit: function () {
          return false;
        },
        isSync: false,
        type: 'fetch',
        options: function () {
          return {
            uri: _this.constants.url + '/sys_user_login',
            contentType: 'JSON',
            method: 'POST',
            isCors: true,
            params: {
              username: _this.state.username,
              password: _this.state.password
            },
            headers: {}
          };
        },
        dataHandler: function dataHandler(res) {
          return res;
        }
      }]
    };
  }
  setStateValue = (e, {
    field,
    valueField,
    indexs
  }, cb) => {
    const state = {
      ...this.state
    };
    let value = e;
    if (valueField) {
      value = valueField.split('.').reduce((obj, key) => obj && obj[key], e);
    }
    const _field = indexs?.length > 0 ? field.replace(/\.\[\]/g, match => `[${indexs.shift()}].`).replace('.[item]', '') : field;
    this.utils.setValue(state, _field, value);
    this.setState(state, cb);
  };
  logIn = async e => {
    const res = await this.dataSourceMap['sys_user_login']?.load();
    console.log('sys_user_login: ', res);
    if (res.data?.code == 4000) {
      return this.utils.showToast({
        title: es.data?.msg,
        icon: 'error',
        duration: 2000
      });
    }
    if (res.data.code === 2000) {
      this.utils.setStorageItem('Authorization', 'Bearer ' + res.data?.data?.access_token);
      this.utils.setStorageItem('user', res.data?.data?.user);
      // this.utils.setGlobalData('Authorization', res.data?.data?.access_token)
      // this.utils.setGlobalData('user', res.data?.data?.user)
      this.utils.navigateTo('home');
    }
  };
  componentDidMount() {
    this._dataSourceEngine.reloadDataSource();
  }
  render() {
    const _this = this;
    return <Page statusBarMode='light'>
        <View ref={this._refsManager.linkRef('view-6bae24ea')} className='logIn__vw M-flex-item'>
          <ScrollView ref={this._refsManager.linkRef('scrollview')} className='logIn__vw__sv'>
            <View className='logIn__vw__sv__vw M-flex-item'>
              <View className='logIn__vw__sv__vw__vw'>
                <View className='logIn__vw__sv__vw__vw__vw'>
                  <Image src={static_image} remote={false} fit={false} className='logIn__vw__sv__vw__vw__vw__Image' />
                </View>
                <View className='logIn__vw__sv__vw__vw__vw1'>
                  <Text className='logIn__vw__sv__vw__vw__vw1__tx'>宏勤学</Text>
                </View>
              </View>
              <View ref={this._refsManager.linkRef('view-da91e678')} className='logIn__vw__sv__vw__vw1 M-flex-item'>
                <View className='logIn__vw__sv__vw__vw1__vw'>
                  <View className='logIn__vw__sv__vw__vw1__vw__vw'>
                    <View>
                      <AtIcon color='#bd10e0' size={16} svg={ICONS["svg_l5eydh"]} />
                    </View>
                    <View className='logIn__vw__sv__vw__vw1__vw__vw__vw1 M-flex-item'>
                      <Input type='text' confirmType='done' value={$eval(() => this.state.username)} placeholder='请输入用户名' password={false} onChange={function () {
                      return this.setStateValue.apply(this, Array.prototype.slice.call(arguments).concat([{
                        field: 'username'
                      }]));
                    }.bind(this)} />
                    </View>
                  </View>
                </View>
                <View className='logIn__vw__sv__vw__vw1__vw1'>
                  <View className='logIn__vw__sv__vw__vw1__vw1__vw'>
                    <View>
                      <AtIcon color='#bd10e0' svg={ICONS["svg_zbw1x4"]} className='logIn__AtIcon' />
                    </View>
                    <View className='logIn__vw__sv__vw__vw1__vw1__vw__vw1 M-flex-item'>
                      <Input type='text' confirmType='done' value={$eval(() => this.state.password)} placeholder='请输入密码' password={true} onChange={function () {
                      return this.setStateValue.apply(this, Array.prototype.slice.call(arguments).concat([{
                        field: 'password'
                      }]));
                    }.bind(this)} ref={this._refsManager.linkRef('input-b149274a')} />
                    </View>
                  </View>
                </View>
                <View className='logIn__vw__sv__vw__vw1__vw2'>
                  <View>
                    <ImageBackground src='' className='logIn__ibg'>
                      <View onClick={function () {
                      return this.logIn.apply(this, Array.prototype.slice.call(arguments).concat([]));
                    }.bind(this)} className='logIn__ibg__vw M-flex-item'>
                        <Text className='logIn__ibg__vw__tx'>登录</Text>
                      </View>
                    </ImageBackground>
                  </View>
                </View>
                <View>
                  {!!false && <View ref={this._refsManager.linkRef('view-2d650268')} className='logIn__vw_1'>
                      <Text className='logIn__vw_1__tx'>忘记密码</Text>
                    </View>}
                </View>
                <View className='logIn__vw__sv__vw__vw1__vw4'>
                  <View className='logIn__vw__sv__vw__vw1__vw4__vw' />
                  <View className='logIn__vw__sv__vw__vw1__vw4__vw1'>
                    <Text className='logIn__vw__sv__vw__vw1__vw4__vw1__tx'>
                      其他方式登录
                    </Text>
                  </View>
                  <View className='logIn__vw__sv__vw__vw1__vw4__vw2' />
                </View>
                <View ref={this._refsManager.linkRef('view-ae723e22')} className='logIn__vw__sv__vw__vw1__vw5'>
                  <WechatComponentOneClickLogin ref={this._refsManager.linkRef('wechatcomponentoneclicklogin-68515516')} />
                </View>
                {!!false && <View ref={this._refsManager.linkRef('view-7163529e')} className='logIn__vw__sv__vw__vw1__vw6'>
                    <View ref={this._refsManager.linkRef('view-cec26c0e')} className='logIn__vw__sv__vw__vw1__vw6__vw'>
                      <Text ref={this._refsManager.linkRef('text-d2774f4f')} className='logIn__vw__sv__vw__vw1__vw6__vw__tx'>
                        没有账号，
                      </Text>
                    </View>
                    <View ref={this._refsManager.linkRef('view-4bf3c86e')} className='logIn__vw__sv__vw__vw1__vw6__vw1'>
                      <Text ref={this._refsManager.linkRef('text-401f1e7e')} className='logIn__vw__sv__vw__vw1__vw6__vw1__tx'>
                        注册新用户？
                      </Text>
                    </View>
                  </View>}
              </View>
            </View>
          </ScrollView>
        </View>
        <Modal style={{
        height: '60%'
      }} animate='slide-bottom' renderView={props => <View ref={this._refsManager.linkRef('view-21e859e1')} className='logIn__vw_2'>
              <View className='logIn__vw_2__vw'>
                <Image src='' remote={false} fit={false} className='logIn__vw_2__vw__Image' />
                <Text className='logIn__vw_2__vw__tx1'>企业培训系统</Text>
              </View>
              <View className='logIn__vw_2__vw1'>
                <Text className='logIn__vw_2__vw1__tx'>
                  建议使用您的微信头像和昵称，以便获得更好的体验
                </Text>
              </View>
              <View className='logIn__vw_2__vw2'>
                <View className='logIn__vw_2__vw2__vw'>
                  <Text className='logIn__vw_2__vw2__vw__tx'>*</Text>
                  <Text className='logIn__vw_2__vw2__vw__tx1'>头像</Text>
                </View>
                <View onClick={e => {
            // this.utils.chooseImage({
            //   success: (res) => {
            //     const tempFilePaths = res.tempFilePaths
            //     this.utils.uploadFile({
            //       url: 'https://gvfh2x.flyowl.com.cn/upload-file', //仅为示例，非真实的接口地址
            //       filePath: tempFilePaths[0],
            //       name: 'file',
            //       headers: {
            //         Authorization: this.utils.getStorageItem('Authorization')
            //       },
            //       withCredentials: true, // 添加跨域访问
            //       success: (res) => {
            //         const data = res.data
            //         //do something
            //       }
            //     })
            //   }
            // })
          }} className='logIn__vw_2__vw2__vw1 M-flex-item'>
                  <View>
                    <AtButton size='normal' type='primary' ref={this._refsManager.linkRef('atbutton-f6f96439')} openType='chooseAvatar' onChooseAvatar={e => {
                console.log('onChooseAvatar: ', e);
                const Authorization = 'Bearer ' + _this.utils.getGlobalData('Authorization');
                console.log({
                  url: 'https://gvfh2x.flyowl.com.cn/upload-file',
                  //仅为示例，非真实的接口地址
                  filePath: e.detail.avatarUrl,
                  name: 'file',
                  header: {
                    Authorization
                  },
                  withCredentials: false
                });
                _this.utils.uploadFile({
                  url: 'https://gvfh2x.flyowl.com.cn/upload-file',
                  //仅为示例，非真实的接口地址
                  filePath: e.detail.avatarUrl,
                  name: 'file',
                  header: {
                    Authorization
                  },
                  withCredentials: false,
                  success: res => {
                    const data = JSON.parse(res.data);
                    console.log('data: ', data);
                    if (data?.code === 2000) {
                      _this.setStateValue(data?.data?.url, {
                        field: 'avatar'
                      });
                    }
                  },
                  fail: e => {
                    console.log('uploadFile fail: ', e);
                  }
                });
              }} className='logIn__AtButton'>
                      {<ImageBackground style={{}} src={$eval(() => _this.state.avatar)}>
                          <View ref={this._refsManager.linkRef('view-3389fa7f')} className='logIn__vw_3'>
                            <AtIcon value='add' size={20} color='#bebebe' />
                            <Text className='logIn__vw_3__tx1'>添加图片</Text>
                          </View>
                        </ImageBackground>}
                    </AtButton>
                  </View>
                </View>
              </View>
              <AtDivider height={20} fontColor='#3e5bec' fontSize={28} lineColor='#ccc' customStyle={{
          backgroundColor: '#fff'
        }} />
              <View className='logIn__vw_2__vw4'>
                <View className='logIn__vw_2__vw4__vw'>
                  <Text className='logIn__vw_2__vw4__vw__tx'>*</Text>
                  <Text className='logIn__vw_2__vw4__vw__tx1'>昵称</Text>
                </View>
                <View className='logIn__vw_2__vw4__vw1 M-flex-item'>
                  <Input type='nickname' confirmType='done' value={$eval(() => _this.state.nickname)} placeholder='请输入' ref={this._refsManager.linkRef('input-b34d7023')} onChange={function () {
              return this.setStateValue.apply(this, Array.prototype.slice.call(arguments).concat([{
                field: 'nickname'
              }]));
            }.bind(_this)} />
                </View>
              </View>
              <AtDivider height={20} fontColor='#3e5bec' fontSize={28} lineColor='#ccc' customStyle={{
          backgroundColor: '#fff'
        }} />
              <AtButton size='small' type='primary' ref={this._refsManager.linkRef('atbutton-f6f96439')} onClick={function () {
          return this.confirmDataEntry.apply(this, Array.prototype.slice.call(arguments).concat([]));
        }.bind(_this)} className='logIn__vw_2__AtButton6'>
                确认登入
              </AtButton>
              <View ref={this._refsManager.linkRef('view-205972f7')} onClick={e => {
          _this.$('modal').close();
        }} className='logIn__vw_2__vw7'>
                <Text ref={this._refsManager.linkRef('text-bdd56f66')} className='logIn__vw_2__vw7__tx'>
                  暂不登入
                </Text>
              </View>
            </View>} visible={false} maskClosable={true} ref={this._refsManager.linkRef('modal')} />
      </Page>;
  }
}
export default LogIn$Page;