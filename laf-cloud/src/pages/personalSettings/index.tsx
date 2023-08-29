import React from 'react';
import { Page, HeaderBar, View, AtAvatar, Text, Input, AtDivider, Textarea, AtButton } from 'cross-ui';
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
class PersonalSettings$Page extends React.Component<any, any> {
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
    getRoute: utils.createRoute('personalSettings')
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
        id: 'userinfo',
        isInit: function () {
          return true;
        },
        isSync: false,
        type: 'fetch',
        options: function () {
          return {
            uri: _this.constants.url + '/sys_user_setting',
            contentType: 'JSON',
            method: 'GET',
            isCors: true,
            params: {},
            headers: {}
          };
        },
        dataHandler: function dataHandler(res) {
          return res.data?.data;
        }
      }, {
        id: 'saveuser',
        isInit: function () {
          return false;
        },
        isSync: false,
        type: 'fetch',
        options: function () {
          return {
            uri: _this.constants.url + '/sys_user_setting',
            contentType: 'JSON',
            method: 'PUT',
            isCors: true,
            params: {
              nickname: _this.state.userinfo?.nickname,
              description: _this.state.userinfo?.description
            },
            headers: {}
          };
        }
      }]
    };
  }
  componentDidMount() {
    this._dataSourceEngine.reloadDataSource();
  }
  render() {
    const _this = this;
    return <Page statusBarMode='light' backgroundImage='https://file.mengti.cc/FiLftfp_5O48Dd2MZyQ3jUW9Cs_a' className='personalSettings__personal_settings'>
        <HeaderBar backgroundColor='#ffffff' mode='light' showBack={true} title='个人设置' titleAlign='center' translucent={true} ref={this._refsManager.linkRef('headerbar-406d8199')} />
        <View style={{}}>
          <View ref={this._refsManager.linkRef('view-100dae6e')} className='personalSettings__vw'>
            <View className='personalSettings__vw__vw'>
              <AtAvatar size='normal' circle={true} image='' ref={this._refsManager.linkRef('atavatar-068a317e')} customStyle={{
              width: px(130),
              height: px(130)
            }} />
            </View>
            <View ref={this._refsManager.linkRef('view-5ab56256')} className='personalSettings__vw__vw1 M-flex-item'>
              <View ref={this._refsManager.linkRef('view-59266e8f')} className='personalSettings__vw__vw1__vw'>
                <Text ref={this._refsManager.linkRef('text-b33497f7')} className='personalSettings__vw__vw1__vw__tx'>
                  {$eval(() => this.state.userinfo?.nickname || '微信用户')}
                </Text>
              </View>
              <View ref={this._refsManager.linkRef('view-a40caa47')} onClick={e => {
              this.utils.navigateTo('personalSettings');
            }} className='personalSettings__vw__vw1__vw1'>
                <Text className='personalSettings__vw__vw1__vw1__tx'>
                  修改头像
                </Text>
              </View>
            </View>
          </View>
          <View ref={this._refsManager.linkRef('view-a18baccf')} className='personalSettings__vw1'>
            <View ref={this._refsManager.linkRef('view-8bc182c0')} className='personalSettings__vw1__vw'>
              <View ref={this._refsManager.linkRef('view-e6dd00e3')} className='personalSettings__vw1__vw__vw'>
                <View ref={this._refsManager.linkRef('view-82090693')} className='personalSettings__vw1__vw__vw__vw'>
                  <Text ref={this._refsManager.linkRef('text-c96f1f53')} className='personalSettings__vw1__vw__vw__vw__tx'>
                    昵称
                  </Text>
                </View>
                <View className='personalSettings__vw1__vw__vw__vw1 M-flex-item'>
                  <Input type='text' confirmType='next' value={$eval(() => this.state.userinfo?.nickname)} placeholder='请输入' autoFocus={false} onChange={value => {
                  const b = this.state.userinfo;
                  b.nickname = value;
                  this.setState({
                    userinfo: b
                  });
                }} ref={this._refsManager.linkRef('input-55905e4c')} />
                </View>
              </View>
              <AtDivider height={5} fontColor='#cbcbcd' fontSize={28} lineColor='#ccc' customStyle={{
              backgroundColor: '#fff'
            }} ref={this._refsManager.linkRef('atdivider-efc66113')} />
            </View>
          </View>
          <View ref={this._refsManager.linkRef('view-a18baccf')} className='personalSettings__vw2'>
            <View ref={this._refsManager.linkRef('view-8bc182c0')} className='personalSettings__vw2__vw'>
              <View ref={this._refsManager.linkRef('view-e6dd00e3')} className='personalSettings__vw2__vw__vw'>
                <View ref={this._refsManager.linkRef('view-82090693')} className='personalSettings__vw2__vw__vw__vw'>
                  <Text ref={this._refsManager.linkRef('text-c96f1f53')} className='personalSettings__vw2__vw__vw__vw__tx'>
                    性别
                  </Text>
                </View>
                <View className='personalSettings__vw2__vw__vw__vw1 M-flex-item'>
                  <Input type='text' confirmType='next' value='' placeholder='请输入' autoFocus={false} onChange={value => {
                  const b = this.state.userinfo;
                  b.nickname = value;
                  this.setState({
                    userinfo: b
                  });
                }} ref={this._refsManager.linkRef('input-55905e4c')} />
                </View>
              </View>
              <AtDivider height={5} fontColor='#cbcbcd' fontSize={28} lineColor='#ccc' customStyle={{
              backgroundColor: '#fff'
            }} ref={this._refsManager.linkRef('atdivider-efc66113')} />
            </View>
          </View>
          <View ref={this._refsManager.linkRef('view-a18baccf')} className='personalSettings__vw3'>
            <View ref={this._refsManager.linkRef('view-8bc182c0')} className='personalSettings__vw3__vw'>
              <View ref={this._refsManager.linkRef('view-e6dd00e3')} className='personalSettings__vw3__vw__vw'>
                <View ref={this._refsManager.linkRef('view-82090693')} className='personalSettings__vw3__vw__vw__vw'>
                  <Text ref={this._refsManager.linkRef('text-c96f1f53')} className='personalSettings__vw3__vw__vw__vw__tx'>
                    生日
                  </Text>
                </View>
                <View className='personalSettings__vw3__vw__vw__vw1 M-flex-item'>
                  <Input type='text' confirmType='next' value='' placeholder='请输入' autoFocus={false} onChange={value => {
                  const b = this.state.userinfo;
                  b.nickname = value;
                  this.setState({
                    userinfo: b
                  });
                }} ref={this._refsManager.linkRef('input-55905e4c')} />
                </View>
              </View>
              <AtDivider height={5} fontColor='#cbcbcd' fontSize={28} lineColor='#ccc' customStyle={{
              backgroundColor: '#fff'
            }} ref={this._refsManager.linkRef('atdivider-efc66113')} />
            </View>
          </View>
          <View ref={this._refsManager.linkRef('view-fea68004')} className='personalSettings__vw4'>
            <View ref={this._refsManager.linkRef('view-0b2b5bd2')} className='personalSettings__vw4__vw'>
              <View ref={this._refsManager.linkRef('view-29a714c4')} className='personalSettings__vw4__vw__vw'>
                <View ref={this._refsManager.linkRef('view-342d606d')} className='personalSettings__vw4__vw__vw__vw'>
                  <Text ref={this._refsManager.linkRef('text-e947bb48')} className='personalSettings__vw4__vw__vw__vw__tx'>
                    个人说明
                  </Text>
                </View>
                <View ref={this._refsManager.linkRef('view-24b1c3af')} className='personalSettings__vw4__vw__vw__vw1 M-flex-item'>
                  <Textarea value={$eval(() => this.state.userinfo?.description)} placeholder='请输入' onInput={value => {
                  const b = this.state.userinfo;
                  b.description = value.detail.value;
                  this.setState({
                    userinfo: b
                  });
                }} ref={this._refsManager.linkRef('textarea-f439b4c3')} placeholderStyle={{}} className='personalSettings__vw4__vw__vw__vw1__Textarea' />
                </View>
              </View>
              <AtDivider height={5} fontColor='#cbcbcd' fontSize={28} lineColor='#ccc' customStyle={{
              backgroundColor: '#fff'
            }} />
            </View>
          </View>
          <View className='personalSettings__vw5' />
          <View className='personalSettings__vw6'>
            <View className='personalSettings__vw6__vw'>
              <AtButton size='small' type='primary' onClick={e => {
              this.dataSourceMap['saveuser']?.load();
              this.utils.showToast({
                title: '修改成功',
                icon: 'errpr',
                duration: 2000
              });
            }} ref={this._refsManager.linkRef('atbutton-23f0d93d')} className='personalSettings__vw6__vw__AtButton'>
                保存
              </AtButton>
            </View>
          </View>
        </View>
      </Page>;
  }
}
export default PersonalSettings$Page;