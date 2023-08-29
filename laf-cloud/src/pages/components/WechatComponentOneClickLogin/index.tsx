import static_image from "./images/image.png";
import React from 'react';
import { Modal, View, Image, Text, AtButton, ImageBackground, AtIcon, AtDivider, Input } from 'cross-ui';
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
class WechatComponentOneClickLogin$Page extends React.Component<any, any> {
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
    this.state = {};
  }
  utils = Object.assign({
    getRoute: utils.createRoute('WechatComponentOneClickLogin')
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
        id: 'firstLogin',
        isInit: function () {
          return false;
        },
        isSync: false,
        type: 'fetch',
        options: function () {
          return {
            uri: _this.constants.url + '/wx_login',
            contentType: 'JSON',
            method: 'POST',
            isCors: true,
            params: {},
            headers: {}
          };
        },
        dataHandler: function dataHandler(res) {
          // console.log("====1=", res.data?.data)

          if (!res.data?.data?.status) {
            _this.$('wechat_modal')?.open();
          } else {
            _this.setToken(res.data?.data?.access_token, res.data?.data?.user);
            _this.utils.navigateTo('home');
          }
          return res.data?.data;
        }
      }]
    };
  }
  wechatLoginCallback = e => {
    // const code = await this.getOpenid()
    // console.log('code', code)
    // this.$('wechat_modal').open()

    new Promise(async (resolve, reject) => {
      this.utils.login().then(async res => {
        console.log(99990000, res.code);
        // 拿到code 进行处理，先进行验证
        const re = await this.dataSourceMap['firstLogin']?.load({
          code: res.code
        });
        console.log('222', re);
      });
    });
  };
  createAUser = () => {
    return new Promise(async (resolve, reject) => {
      console.log('jinlai');
      this.utils.login().then(async res => {
        console.log(99990000, res.code);
        // 拿到code 进行处理，先进行验证
        const re = await this.dataSourceMap['firstLogin']?.load({
          code: res.code,
          avatar: this.state.avatar,
          nickname: this.state.nickname
        });
      }).catch(e => {
        console.log('e: ', e);
        reject(e);
      });
    });
  };
  setToken = async (token, user) => {
    this.utils.setStorageItem('Authorization', 'Bearer ' + token);
    this.utils.setStorageItem('user', user);
  };
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
  componentDidMount() {
    this._dataSourceEngine.reloadDataSource();
  }
  render() {
    const _this = this;
    return <React.Fragment>
        <Modal style={{
        height: '60%'
      }} animate='slide-bottom' renderView={props => <View ref={this._refsManager.linkRef('view-21e859e1')} className='WechatComponentOneClickLogin__vw'>
              <View className='WechatComponentOneClickLogin__vw__vw'>
                <Image src='' remote={false} fit={false} className='WechatComponentOneClickLogin__vw__vw__Image' />
                <Text className='WechatComponentOneClickLogin__vw__vw__tx1'>
                  企业培训系统
                </Text>
              </View>
              <View className='WechatComponentOneClickLogin__vw__vw1'>
                <Text className='WechatComponentOneClickLogin__vw__vw1__tx'>
                  建议使用您的微信头像和昵称，以便获得更好的体验
                </Text>
              </View>
              <View className='WechatComponentOneClickLogin__vw__vw2'>
                <View className='WechatComponentOneClickLogin__vw__vw2__vw'>
                  <Text className='WechatComponentOneClickLogin__vw__vw2__vw__tx'>
                    *
                  </Text>
                  <Text className='WechatComponentOneClickLogin__vw__vw2__vw__tx1'>
                    头像
                  </Text>
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
          }} className='WechatComponentOneClickLogin__vw__vw2__vw1 M-flex-item'>
                  <View>
                    <AtButton size='normal' type='primary' ref={this._refsManager.linkRef('atbutton-f6f96439')} openType='chooseAvatar' onChooseAvatar={e => {
                console.log('onChooseAvatar: ', e);
                const Authorization = _this.constants.Authorization;
                // console.log({
                //   url: 'https://gvfh2x.flyowl.com.cn/upload-file', //仅为示例，非真实的接口地址
                //   filePath: e.detail.avatarUrl,
                //   name: 'file',
                //   header: {
                //     Authorization
                //   },
                //   withCredentials: false,
                // })
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
              }} className='WechatComponentOneClickLogin__AtButton'>
                      {<ImageBackground style={{}} src={$eval(() => _this.state.avatar)} ref={this._refsManager.linkRef('imagebackground-2ee53f9b')}>
                          <View ref={this._refsManager.linkRef('view-3389fa7f')} className='WechatComponentOneClickLogin__vw_1'>
                            <AtIcon value='add' size={20} color='#bebebe' />
                            <Text className='WechatComponentOneClickLogin__vw_1__tx1'>
                              添加图片
                            </Text>
                          </View>
                        </ImageBackground>}
                    </AtButton>
                  </View>
                </View>
              </View>
              <AtDivider height={20} fontColor='#3e5bec' fontSize={28} lineColor='#ccc' customStyle={{
          backgroundColor: '#fff'
        }} />
              <View className='WechatComponentOneClickLogin__vw__vw4'>
                <View className='WechatComponentOneClickLogin__vw__vw4__vw'>
                  <Text className='WechatComponentOneClickLogin__vw__vw4__vw__tx'>
                    *
                  </Text>
                  <Text className='WechatComponentOneClickLogin__vw__vw4__vw__tx1'>
                    昵称
                  </Text>
                </View>
                <View className='WechatComponentOneClickLogin__vw__vw4__vw1 M-flex-item'>
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
              <AtButton size='small' type='primary' ref={this._refsManager.linkRef('atbutton-f6f96439')} onClick={e => {
          _this.createAUser();
        }} className='WechatComponentOneClickLogin__vw__AtButton6'>
                确认登入
              </AtButton>
              <View ref={this._refsManager.linkRef('view-205972f7')} onClick={e => {
          _this.$('wechat_modal')?.close();
        }} className='WechatComponentOneClickLogin__vw__vw7'>
                <Text ref={this._refsManager.linkRef('text-bdd56f66')} className='WechatComponentOneClickLogin__vw__vw7__tx'>
                  暂不登入
                </Text>
              </View>
            </View>} visible={false} maskClosable={true} ref={this._refsManager.linkRef('wechat_modal')} />
        <AtButton type='primary' onClick={e => {
        this.wechatLoginCallback(e);
      }} openType='getUserInfo' circle={false} full={false} loading={false} ref={this._refsManager.linkRef('atbutton-f4864678')} className='WechatComponentOneClickLogin__AtButton1'>
          {<Image src={static_image} remote={false} fit={false} ref={this._refsManager.linkRef('image-87955acc')} className='WechatComponentOneClickLogin__Image' />}
        </AtButton>
      </React.Fragment>;
  }
}
export default WechatComponentOneClickLogin$Page;