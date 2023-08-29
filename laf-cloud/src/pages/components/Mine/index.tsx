import ICONS from "./icons";
import React from 'react';
import { ScrollView, View, AtAvatar, Text, AtIcon, AtDivider } from 'cross-ui';
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
class Mine$Page extends React.Component<any, any> {
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
    getRoute: utils.createRoute('Mine')
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
          return false;
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
      }]
    };
  }
  componentDidMount() {
    this._dataSourceEngine.reloadDataSource();
    this.dataSourceMap['userinfo']?.load();
  }
  render() {
    const _this = this;
    return <React.Fragment>
        <ScrollView ref={this._refsManager.linkRef('scrollview')} className='Mine__mine__sv'>
          <View className='Mine__mine__sv__vw'>
            <View ref={this._refsManager.linkRef('view-100dae6e')} className='Mine__mine__sv__vw__vw'>
              <View className='Mine__mine__sv__vw__vw__vw'>
                <AtAvatar size='normal' circle={true} image={$eval(() => this.state.userinfo?.avatar)} ref={this._refsManager.linkRef('atavatar-068a317e')} customStyle={{
                width: px(130),
                height: px(130)
              }} />
              </View>
              <View ref={this._refsManager.linkRef('view-5ab56256')} className='Mine__mine__sv__vw__vw__vw1 M-flex-item'>
                <View ref={this._refsManager.linkRef('view-59266e8f')} className='Mine__mine__sv__vw__vw__vw1__vw'>
                  <Text ref={this._refsManager.linkRef('text-b33497f7')} className='Mine__mine__sv__vw__vw__vw1__vw__tx'>
                    {$eval(() => this.state.userinfo?.nickname || '微信用户')}
                  </Text>
                  <View ref={this._refsManager.linkRef('view-a40caa47')} onClick={e => {
                  this.utils.navigateTo('personalSettings');
                }} className='Mine__mine__sv__vw__vw__vw1__vw__vw1'>
                    <AtIcon color='#43cf7c' size={13} svg={ICONS["svg_ff9i50"]} />
                    <Text ref={this._refsManager.linkRef('text-2597dd91')} className='Mine__mine__sv__vw__vw__vw1__vw__vw1__tx1'>
                      编辑
                    </Text>
                  </View>
                </View>
                <Text className='Mine__mine__sv__vw__vw__vw1__tx1'>
                  今日已学习40分钟
                </Text>
              </View>
            </View>
            <View className='Mine__mine__sv__vw__vw1'>
              <View className='Mine__mine__sv__vw__vw1__vw'>
                <View className='Mine__mine__sv__vw__vw1__vw__vw'>
                  <View className='Mine__mine__sv__vw__vw1__vw__vw__vw'>
                    <Text className='Mine__mine__sv__vw__vw1__vw__vw__vw__tx'>
                      0分钟
                    </Text>
                  </View>
                  <Text className='Mine__mine__sv__vw__vw1__vw__vw__tx1'>
                    今日听课
                  </Text>
                </View>
                <View className='Mine__mine__sv__vw__vw1__vw__vw1'>
                  <View className='Mine__mine__sv__vw__vw1__vw__vw1__vw'>
                    <Text className='Mine__mine__sv__vw__vw1__vw__vw1__vw__tx'>
                      0天
                    </Text>
                  </View>
                  <Text className='Mine__mine__sv__vw__vw1__vw__vw1__tx1'>
                    连续听课
                  </Text>
                </View>
                <View className='Mine__mine__sv__vw__vw1__vw__vw2'>
                  <View className='Mine__mine__sv__vw__vw1__vw__vw2__vw'>
                    <Text className='Mine__mine__sv__vw__vw1__vw__vw2__vw__tx'>
                      0天
                    </Text>
                  </View>
                  <Text className='Mine__mine__sv__vw__vw1__vw__vw2__tx1'>
                    总共听课
                  </Text>
                </View>
              </View>
            </View>
            <View className='Mine__mine__sv__vw__vw2' />
          </View>
          <View className='Mine__mine__sv__vw1' />
          <View ref={this._refsManager.linkRef('view-b1191071')} className='Mine__mine__sv__vw2'>
            <View className='Mine__mine__sv__vw2__vw'>
              <View className='Mine__mine__sv__vw2__vw__vw'>
                <View ref={this._refsManager.linkRef('view-771ef8ce')} className='Mine__mine__sv__vw2__vw__vw__vw M-flex-item'>
                  <AtIcon color='#43cf7c' size={30} svg={ICONS["svg_zubt6o"]} className='Mine__mine__sv__vw2__vw__vw__vw__AtIcon' />
                  <Text ref={this._refsManager.linkRef('text-ccb1148b')} className='Mine__mine__sv__vw2__vw__vw__vw__tx1'>
                    播放记录
                  </Text>
                </View>
                <View className='Mine__mine__sv__vw2__vw__vw__vw1'>
                  <AtIcon value='chevron-right' size={30} color='#cbcbcb' />
                </View>
              </View>
              <AtDivider height={10} fontColor='#3e5bec' fontSize={28} lineColor='#f1f1f1' customStyle={{
              backgroundColor: '#fff',
              display: 'none'
            }} />
            </View>
            <View className='Mine__mine__sv__vw2__vw1'>
              <View className='Mine__mine__sv__vw2__vw1__vw'>
                <View ref={this._refsManager.linkRef('view-771ef8ce')} className='Mine__mine__sv__vw2__vw1__vw__vw M-flex-item'>
                  <AtIcon color='#43cf7c' size={30} svg={ICONS["svg_c9zzgi"]} className='Mine__mine__sv__vw2__vw1__vw__vw__AtIcon' />
                  <Text ref={this._refsManager.linkRef('text-ccb1148b')} className='Mine__mine__sv__vw2__vw1__vw__vw__tx1'>
                    我的评论
                  </Text>
                </View>
                <View className='Mine__mine__sv__vw2__vw1__vw__vw1'>
                  <AtIcon value='chevron-right' size={30} color='#cbcbcb' />
                </View>
              </View>
              <AtDivider height={10} fontColor='#3e5bec' fontSize={28} lineColor='#f1f1f1' customStyle={{
              backgroundColor: '#fff',
              display: 'none'
            }} />
            </View>
            <View ref={this._refsManager.linkRef('view-0e159b59')} className='Mine__mine__sv__vw2__vw2'>
              <View className='Mine__mine__sv__vw2__vw2__vw'>
                <View ref={this._refsManager.linkRef('view-771ef8ce')} className='Mine__mine__sv__vw2__vw2__vw__vw M-flex-item'>
                  <AtIcon color='#43cf7c' size={30} svg={ICONS["svg_se4c5q"]} className='Mine__mine__sv__vw2__vw2__vw__vw__AtIcon' />
                  <Text ref={this._refsManager.linkRef('text-ccb1148b')} className='Mine__mine__sv__vw2__vw2__vw__vw__tx1'>
                    我的点赞
                  </Text>
                </View>
                <View className='Mine__mine__sv__vw2__vw2__vw__vw1'>
                  <AtIcon value='chevron-right' size={30} color='#cbcbcb' />
                </View>
              </View>
              <AtDivider height={10} fontColor='#3e5bec' fontSize={28} lineColor='#f1f1f1' customStyle={{
              backgroundColor: '#fff',
              display: 'none'
            }} />
            </View>
            <View ref={this._refsManager.linkRef('view-f2dcb4f6')} className='Mine__mine__sv__vw2__vw3'>
              <View className='Mine__mine__sv__vw2__vw3__vw'>
                <View ref={this._refsManager.linkRef('view-771ef8ce')} className='Mine__mine__sv__vw2__vw3__vw__vw M-flex-item'>
                  <AtIcon color='#43cf7c' size={30} svg={ICONS["svg_c6h6xl"]} ref={this._refsManager.linkRef('aticon-91a1e990')} className='Mine__mine__sv__vw2__vw3__vw__vw__AtIcon' />
                  <Text ref={this._refsManager.linkRef('text-ccb1148b')} className='Mine__mine__sv__vw2__vw3__vw__vw__tx1'>
                    学习心得
                  </Text>
                </View>
                <View className='Mine__mine__sv__vw2__vw3__vw__vw1'>
                  <AtIcon value='chevron-right' size={30} color='#cbcbcb' />
                </View>
              </View>
              <AtDivider height={10} fontColor='#3e5bec' fontSize={28} lineColor='#f1f1f1' customStyle={{
              backgroundColor: '#fff',
              display: 'none'
            }} />
            </View>
            <View ref={this._refsManager.linkRef('view-f2dcb4f6')} className='Mine__mine__sv__vw2__vw4'>
              <View className='Mine__mine__sv__vw2__vw4__vw'>
                <View ref={this._refsManager.linkRef('view-771ef8ce')} className='Mine__mine__sv__vw2__vw4__vw__vw M-flex-item'>
                  <AtIcon color='#43cf7c' size={30} svg={ICONS["svg_y3mfl6"]} ref={this._refsManager.linkRef('aticon-2b0841e8')} className='Mine__mine__sv__vw2__vw4__vw__vw__AtIcon' />
                  <Text ref={this._refsManager.linkRef('text-ccb1148b')} className='Mine__mine__sv__vw2__vw4__vw__vw__tx1'>
                    更新版本
                  </Text>
                </View>
                <View className='Mine__mine__sv__vw2__vw4__vw__vw1'>
                  <AtIcon value='chevron-right' size={30} color='#cbcbcb' />
                </View>
              </View>
              <AtDivider height={10} fontColor='#3e5bec' fontSize={28} lineColor='#f1f1f1' customStyle={{
              backgroundColor: '#fff',
              display: 'none'
            }} ref={this._refsManager.linkRef('atdivider-25a6eadf')} />
            </View>
            <View ref={this._refsManager.linkRef('view-1f18461c')} onClick={e => {
            this.utils.navigateTo('personalSettings');
          }} className='Mine__mine__sv__vw2__vw5'>
              <View ref={this._refsManager.linkRef('view-fb232bf8')} className='Mine__mine__sv__vw2__vw5__vw'>
                <View ref={this._refsManager.linkRef('view-57eb3921')} className='Mine__mine__sv__vw2__vw5__vw__vw M-flex-item'>
                  <AtIcon color='#43cf7c' size={30} svg={ICONS["svg_9m04ve"]} ref={this._refsManager.linkRef('aticon-0aa75c14')} className='Mine__mine__sv__vw2__vw5__vw__vw__AtIcon' />
                  <Text ref={this._refsManager.linkRef('text-5fd17397')} className='Mine__mine__sv__vw2__vw5__vw__vw__tx1'>
                    个人设置
                  </Text>
                </View>
                <View className='Mine__mine__sv__vw2__vw5__vw__vw1'>
                  <AtIcon value='chevron-right' size={30} color='#cbcbcb' ref={this._refsManager.linkRef('aticon-ae2bd02c')} />
                </View>
              </View>
              <AtDivider height={10} fontColor='#3e5bec' fontSize={28} lineColor='#f1f1f1' customStyle={{
              backgroundColor: '#fff',
              display: 'none'
            }} />
            </View>
            <View className='Mine__mine__sv__vw2__vw6'>
              <View className='Mine__mine__sv__vw2__vw6__vw'>
                <View ref={this._refsManager.linkRef('view-9380906d')} className='Mine__mine__sv__vw2__vw6__vw__vw M-flex-item'>
                  <AtIcon color='#43cf7c' size={30} svg={ICONS["svg_mfxhvs"]} ref={this._refsManager.linkRef('aticon-c2d86589')} className='Mine__mine__sv__vw2__vw6__vw__vw__AtIcon' />
                  <Text ref={this._refsManager.linkRef('text-81c0e333')} className='Mine__mine__sv__vw2__vw6__vw__vw__tx1'>
                    责任说明
                  </Text>
                </View>
                <View className='Mine__mine__sv__vw2__vw6__vw__vw1'>
                  <AtIcon value='chevron-right' size={30} color='#cbcbcb' />
                </View>
              </View>
              <AtDivider height={10} fontColor='#3e5bec' fontSize={28} lineColor='#f1f1f1' customStyle={{
              backgroundColor: '#fff',
              display: 'none'
            }} />
            </View>
            <View onClick={e => {
            this.utils.setStorageItem('Authorization', null);
            this.utils.setStorageItem('user', null);
            this.utils.setGlobalData('Authorization', null);
            this.utils.setGlobalData('user', null);
            this.utils.navigateTo('logIn');
          }} ref={this._refsManager.linkRef('view-9494859c')} className='Mine__mine__sv__vw2__vw7'>
              <View className='Mine__mine__sv__vw2__vw7__vw'>
                <View ref={this._refsManager.linkRef('view-428d83d1')} className='Mine__mine__sv__vw2__vw7__vw__vw M-flex-item'>
                  <AtIcon color='#43cf7c' size={30} svg={ICONS["svg_1dz7ov"]} ref={this._refsManager.linkRef('aticon-92ecb006')} className='Mine__mine__sv__vw2__vw7__vw__vw__AtIcon' />
                  <Text ref={this._refsManager.linkRef('text-81c0e333')} className='Mine__mine__sv__vw2__vw7__vw__vw__tx1'>
                    退出
                  </Text>
                </View>
                <View className='Mine__mine__sv__vw2__vw7__vw__vw1'>
                  <AtIcon value='chevron-right' size={30} color='#cbcbcb' />
                </View>
              </View>
              <AtDivider height={10} fontColor='#3e5bec' fontSize={28} lineColor='#f1f1f1' customStyle={{
              backgroundColor: '#fff',
              display: 'none'
            }} />
            </View>
          </View>
        </ScrollView>
      </React.Fragment>;
  }
}
export default Mine$Page;