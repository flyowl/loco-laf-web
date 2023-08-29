import ICONS from "./icons";
import React from 'react';
import { Page, Modal, View, Input, Text, HeaderBar, AtAvatar, AtIcon } from 'cross-ui';
import { requestHandle } from '@/utils/dataSource';
import Forum from "@/pages/components/Forum";
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
class ClassHomePage$Page extends React.Component<any, any> {
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
    getRoute: utils.createRoute('classHomePage')
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
            uri: _this.constants.url + '/video_class_detail' + `?_id=${_this.utils?.getRoute()?.query?._id}`,
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
  }
  render() {
    const _this = this;
    return <Page statusBarMode='light' backgroundImage='https://file.mengti.cc/FiLftfp_5O48Dd2MZyQ3jUW9Cs_a' className='classHomePage__class_home_page'>
        <Modal style={{
        height: '60%'
      }} animate='slide-bottom' renderView={props => <View ref={this._refsManager.linkRef('view-d19e71cf')} className='classHomePage__vw'>
              <View ref={this._refsManager.linkRef('view-3a6bad5c')} className='classHomePage__vw__vw'>
                <View ref={this._refsManager.linkRef('view-a883e9c9')} className='classHomePage__vw__vw__vw'>
                  <View className='classHomePage__vw__vw__vw__vw M-flex-item'>
                    <Input type='text' confirmType='done' value='' placeholder='请输入' password={false} ref={this._refsManager.linkRef('input-bbc78325')} className='classHomePage__vw__vw__vw__vw__Input' />
                  </View>
                  <View ref={this._refsManager.linkRef('view-3c83a15d')} className='classHomePage__vw__vw__vw__vw1'>
                    <Text className='classHomePage__vw__vw__vw__vw1__tx'>
                      发送
                    </Text>
                  </View>
                </View>
              </View>
            </View>} visible={false} maskClosable={false} ref={this._refsManager.linkRef('modal')} />
        <HeaderBar backgroundColor='#ffffff' mode='light' showBack={true} title={$eval(() => this.state.dataList?.title || '道德学习班')} titleAlign='center' translucent={true} leftContent='' rightContent='' bottomContent='' capsulePadding='right' ref={this._refsManager.linkRef('headerbar-6f926205')} className='classHomePage__class_home_page__HeaderBar1' />
        <View className='classHomePage__class_home_page__vw2' />
        <View className='classHomePage__class_home_page__vw3'>
          <View className='classHomePage__class_home_page__vw3__vw'>
            <View ref={this._refsManager.linkRef('view-25f4af5b')} className='classHomePage__class_home_page__vw3__vw__vw M-flex-item'>
              <View ref={this._refsManager.linkRef('view-cd372960')} className='classHomePage__class_home_page__vw3__vw__vw__vw M-flex-item'>
                <AtAvatar size='large' circle={true} image={$eval(() => this.state.dataList?.cover)} ref={this._refsManager.linkRef('atavatar-e912017f')} />
                <View className='classHomePage__class_home_page__vw3__vw__vw__vw__vw1'>
                  <Text ref={this._refsManager.linkRef('text-23836b9b')} className='classHomePage__class_home_page__vw3__vw__vw__vw__vw1__tx'>
                    {$eval(() => this.state.dataList?.title || '默认')}
                  </Text>
                  <View className='classHomePage__class_home_page__vw3__vw__vw__vw__vw1__vw1'>
                    <Text className='classHomePage__class_home_page__vw3__vw__vw__vw__vw1__vw1__tx'>
                      班号：
                    </Text>
                    <Text className='classHomePage__class_home_page__vw3__vw__vw__vw__vw1__vw1__tx1'>
                      {$eval(() => this.state.dataList?._id || '123')}
                    </Text>
                    <Text className='classHomePage__class_home_page__vw3__vw__vw__vw__vw1__vw1__tx2'>
                      人数：
                    </Text>
                    <Text className='classHomePage__class_home_page__vw3__vw__vw__vw__vw1__vw1__tx3'>
                      {$eval(() => this.state.dataList?.num | 20)}
                    </Text>
                  </View>
                  <View>
                    <Text className='classHomePage__tx'>我的学分：</Text>
                    <Text className='classHomePage__tx1'>0</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View className='classHomePage__class_home_page__vw3__vw1' />
          <View ref={this._refsManager.linkRef('view-7db1c241')} className='classHomePage__class_home_page__vw3__vw2'>
            <Text ref={this._refsManager.linkRef('text-b894b7e5')} className='classHomePage__class_home_page__vw3__vw2__tx'>
              {$eval(() => this.state.dataList?.description || '读生鲜经典，悟人生达到，知行合一，新上用')}
            </Text>
          </View>
          <View className='classHomePage__class_home_page__vw3__vw3'>
            <View onClick={e => {
            this.utils.navigateTo('myStudy', {
              query: {
                classId: this.state.dataList?._id // 跳转时会在 pages/xxx/xxx?id=1
              },

              params: {
                item: {},
                // 可传递JS变量
                onXXX: val => {} // 可传递回调函数 页面中可使用this.utils.getRoute()?.params?.onXXX?.(回传数据)
              }
            });
          }} className='classHomePage__class_home_page__vw3__vw3__vw'>
              <View>
                <AtIcon color='#666' size={35} svg={ICONS["svg_hczcd5"]} />
              </View>
              <View className='classHomePage__class_home_page__vw3__vw3__vw__vw1'>
                <Text className='classHomePage__class_home_page__vw3__vw3__vw__vw1__tx'>
                  我的作业
                </Text>
              </View>
            </View>
            <View onClick={e => {
            this.utils.navigateTo('learningSituation', {
              query: {
                classId: this.state.dataList?._id // 跳转时会在 pages/xxx/xxx?id=1
              }
            });
          }} className='classHomePage__class_home_page__vw3__vw3__vw1'>
              <View>
                <AtIcon color='#666' size={40} svg={ICONS["svg_cbm5wj"]} />
              </View>
              <View className='classHomePage__class_home_page__vw3__vw3__vw1__vw1'>
                <Text className='classHomePage__class_home_page__vw3__vw3__vw1__vw1__tx'>
                  学习情况
                </Text>
              </View>
            </View>
            <View onClick={e => {
            this.utils.navigateTo('classMember', {
              query: {
                _id: this.state.dataList?._id // 跳转时会在 pages/xxx/xxx?id=1
              }
            });
          }} className='classHomePage__class_home_page__vw3__vw3__vw2'>
              <View>
                <AtIcon color='#666' size={40} svg={ICONS["svg_k32i18"]} />
              </View>
              <View className='classHomePage__class_home_page__vw3__vw3__vw2__vw1'>
                <Text className='classHomePage__class_home_page__vw3__vw3__vw2__vw1__tx'>
                  班级成员
                </Text>
              </View>
            </View>
            <View onClick={e => {
            this.utils.navigateTo('courseDetailsPage', {
              query: {
                _id: this.state.dataList?.courseId // 跳转时会在 pages/xxx/xxx?id=1
              }
            });
          }} className='classHomePage__class_home_page__vw3__vw3__vw3'>
              <View>
                <AtIcon color='#2babbe' size={40} svg={ICONS["svg_80wudy"]} />
              </View>
              <View className='classHomePage__class_home_page__vw3__vw3__vw3__vw1'>
                <Text className='classHomePage__class_home_page__vw3__vw3__vw3__vw1__tx'>
                  去上课
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View className='classHomePage__class_home_page__vw4'>
          <View className='classHomePage__class_home_page__vw4__vw'>
            <View className='classHomePage__class_home_page__vw4__vw__vw M-flex-item'>
              <Text className='classHomePage__class_home_page__vw4__vw__vw__tx'>
                学习心得
              </Text>
            </View>
            <View className='classHomePage__class_home_page__vw4__vw__vw1 M-flex-item'>
              <Text ref={this._refsManager.linkRef('text-051cb0eb')} className='classHomePage__class_home_page__vw4__vw__vw1__tx'>
                更多 &#62;
              </Text>
            </View>
          </View>
        </View>
        <View className='classHomePage__class_home_page__vw5' />
        <View className='classHomePage__class_home_page__vw6'>
          <View ref={this._refsManager.linkRef('view-4aa8faeb')} className='classHomePage__class_home_page__vw6__vw' />
        </View>
        <View className='classHomePage__class_home_page__vw7'>
          {!!false && <View ref={this._refsManager.linkRef('view-59be95d3')} className='classHomePage__class_home_page__vw7__vw'>
              <Forum title='' ref={this._refsManager.linkRef('forum-9c32a247')} />
            </View>}
        </View>
      </Page>;
  }
}
export default ClassHomePage$Page;