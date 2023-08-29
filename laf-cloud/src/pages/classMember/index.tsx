import ICONS from "./icons";
import React from 'react';
import { Page, HeaderBar, AtSearchBar, View, AtAvatar, Text, AtIcon, AtDivider } from 'cross-ui';
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
class ClassMember$Page extends React.Component<any, any> {
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
    getRoute: utils.createRoute('classMember')
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
        id: 'dataList',
        isInit: function () {
          return true;
        },
        isSync: false,
        type: 'fetch',
        options: function () {
          return {
            uri: _this.constants.url + '/video_class_user_detail' + `?_id=${_this.utils?.getRoute()?.query?._id || '64b5fbb3e358efb950c8c389'}&typed=list`,
            contentType: 'JSON',
            method: 'GET',
            isCors: true,
            params: {},
            headers: {
              Authorization: _this.constants.Authorization
            }
          };
        },
        dataHandler: function dataHandler(res) {
          return res.data?.data;
        }
      }]
    };
  }
  async_componentDidMount = async () => {
    this.utils.afterLogin(true, {
      confirm: true
    }).then(async () => {
      const data = await this.utils.reloadGlobalData('tree');
      // alert(JSON.stringify(data))
      console.log('data:', data);
    });
  };
  componentDidMount() {
    this._dataSourceEngine.reloadDataSource();
    this.async_componentDidMount();
  }
  render() {
    const _this = this;
    return <Page statusBarMode='light' backgroundImage='https://file.mengti.cc/FiLftfp_5O48Dd2MZyQ3jUW9Cs_a' className='classMember__class_member'>
        <HeaderBar backgroundColor='#ffffff' mode='light' showBack={true} title='班级成员' titleAlign='center' translucent={true} leftContent='' rightContent='' bottomContent='' capsulePadding='right' ref={this._refsManager.linkRef('headerbar-6f926205')} className='classMember__class_member__HeaderBar' />
        <AtSearchBar actionName='搜索' value='' placeholder='请输入学员名称进行搜索' focus={false} disabled={false} showActionButton={false} ref={this._refsManager.linkRef('atsearchbar-d6c7978a')} className='classMember__class_member__AtSearchBar1' />
        <View className='classMember__class_member__vw2'>
          <View className='classMember__class_member__vw2__vw M-flex-item'>
            <View className='classMember__class_member__vw2__vw__vw M-flex-item'>
              <AtAvatar size='normal' circle={true} ref={this._refsManager.linkRef('atavatar-62f4138e')} customStyle={{
              width: px(100),
              height: px(100)
            }} />
            </View>
            <View className='classMember__class_member__vw2__vw__vw1'>
              <Text className='classMember__class_member__vw2__vw__vw1__tx'>
                封余名
              </Text>
              <Text className='classMember__class_member__vw2__vw__vw1__tx1'>
                班主任
              </Text>
            </View>
          </View>
          <View className='classMember__class_member__vw2__vw1 M-flex-item'>
            <AtIcon color='#b5b5b5' size={10} svg={ICONS["svg_alqmkr"]} className='classMember__class_member__vw2__vw1__AtIcon' />
          </View>
        </View>
        {$evalArray(() => this.state.dataList).map((item, index) => (_this => <View ref={this._refsManager.linkRef('view-babe576c')} className='classMember__class_member__vw3'>
              <View>
                <View className='classMember__vw'>
                  <View ref={this._refsManager.linkRef('view-6fab2f34')} className='classMember__vw__vw M-flex-item'>
                    <AtAvatar size='normal' circle={true} customStyle={{
                width: px(100),
                height: px(100)
              }} ref={this._refsManager.linkRef('atavatar-bbf2374d')} />
                    <View className='classMember__vw__vw__vw1'>
                      <Text ref={this._refsManager.linkRef('text-2cd6dede')} className='classMember__vw__vw__vw1__tx'>
                        {$eval(() => item?.userList?.nickname || 'dg')}
                      </Text>
                      <Text ref={this._refsManager.linkRef('text-2cd6dede')} className='classMember__vw__vw__vw1__tx1'>
                        班主任
                      </Text>
                    </View>
                  </View>
                  <View className='classMember__vw__vw1 M-flex-item'>
                    <AtIcon color='#b5b5b5' size={10} svg={ICONS["svg_dfqf91"]} className='classMember__vw__vw1__AtIcon' />
                  </View>
                </View>
                <AtDivider height={10} fontColor='#b5b5b5' fontSize={28} lineColor='#ccc' customStyle={{
            backgroundColor: '#fff'
          }} />
              </View>
            </View>)($createChildContext(_this, {
        item,
        index
      })))}
      </Page>;
  }
}
export default ClassMember$Page;