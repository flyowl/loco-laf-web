import React from 'react';
import { HeaderBar, View, Text, AutoList } from 'cross-ui';
import { requestHandle } from '@/utils/dataSource';
import IndividualClassComponents from "@/pages/components/IndividualClassComponents";
import SingleCourseComponent from "@/pages/components/SingleCourseComponent";
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
class Study$Page extends React.Component<any, any> {
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
      tabs: ['今日学习', '我的班级'],
      current_tab: 0,
      datalist: [1, 1, 1, 1]
    };
  }
  utils = Object.assign({
    getRoute: utils.createRoute('Study')
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
        id: 'myclass',
        isInit: function () {
          return true;
        },
        isSync: false,
        type: 'fetch',
        options: function () {
          return {
            uri: _this.constants.url + '/video_class_user_detail' + `?typed=myclass`,
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
        id: 'mycourse',
        isInit: function () {
          return true;
        },
        isSync: false,
        type: 'fetch',
        options: function () {
          return {
            uri: _this.constants.url + '/video_user_detail' + `?typed=mycourse`,
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
        id: 'mystudy',
        isInit: function () {
          return false;
        },
        isSync: false,
        type: 'fetch',
        options: function () {
          return {
            uri: _this.constants.url + '/video_time_class_detail' + `?typed=mystudy`,
            contentType: 'JSON',
            method: 'GET',
            isCors: true,
            params: {},
            headers: {}
          };
        }
      }]
    };
  }
  componentDidMount() {
    this._dataSourceEngine.reloadDataSource();
    this.dataSourceMap['myclass']?.load();
    // this.dataSourceMap["mycourse"]?.load();
  }

  render() {
    const _this = this;
    return <React.Fragment fill={true}>
        <HeaderBar backgroundColor='#ffffff' mode='light' showBack={false} title='宏勤学' titleAlign='center' translucent={true} ref={this._refsManager.linkRef('headerbar-229b3847')} />
        <View className='Study__vw1'>
          {$evalArray(() => this.state.tabs).map((item, index) => (_this => <View onClick={e => {
          _this.setState({
            current_tab: index
          }, () => {
            // this.$('atulist')?.refresh()
            // if(this.state.current_tab == 2) {
            //   this.setState({
            //     datalist:[]
            //   })
            // } else {
            //   this.setState({
            //     datalist: [1,1,1,1,1]
            //   })
            // }
          });
        }} ref={this._refsManager.linkRef('view-2a73b406')} className='Study__vw1__vw M-flex-item'>
                <View>
                  <Text ref={this._refsManager.linkRef('text-d3d19bdb')} inlineStyle={[{
              enable: $eval(() => _this.state.current_tab == index),
              name: '动态样式1',
              style: {
                fontSize: px(36),
                fontWeight: 600
              }
            }]} className='Study__tx'>
                    {$eval(() => item)}
                  </Text>
                </View>
                <View inlineStyle={[{
            enable: $eval(() => _this.state.current_tab == index),
            name: '动态样式1',
            style: {
              backgroundColor: '#417505',
              width: px(84),
              height: px(4)
            }
          }]} className='Study__vw1__vw__vw1' />
                <View className='Study__vw1__vw__vw2' />
              </View>)($createChildContext(_this, {
          item,
          index
        })))}
        </View>
        <View className='Study__vw2' />
        {!!$eval(() => this.state.current_tab == 0) && <View ref={this._refsManager.linkRef('view-d21ef3f1')} className='Study__vw3 M-flex-item'>
            <AutoList autoFetch={true} mode='scroll' pageMode='auto' emptyText='无学习' footerMarginTop={0} pageSize={10} renderItem={(item, index, currentPage) => <View ref={this._refsManager.linkRef('view-dbf72335')} />} emptyHideHeader={false} ref={this._refsManager.linkRef('autolist-dd548d45')} renderHeader='' dataSource={[{
          title: '示例数据1',
          id: 1
        }, {
          title: '示例数据2',
          id: 2
        }, {
          title: '示例数据1',
          id: 2
        }]} className='Study__vw3__AutoList' />
          </View>}
        {!!$eval(() => this.state.current_tab == 1) && <View ref={this._refsManager.linkRef('view-0b525140')} className='Study__my_class M-flex-item'>
            <AutoList dataSource={$eval(() => this.state.myclass)} autoFetch={true} mode='scroll' pageMode='auto' emptyText='无班级,请联系管理员添加班级' footerMarginTop={0} pageSize={10} renderItem={(item, index, currentPage) => <View ref={this._refsManager.linkRef('view-00426066')} className='Study__vw'>
                  <IndividualClassComponents title='' class={$eval(() => item)} ref={this._refsManager.linkRef('individualclasscomponents-076c4af4')} />
                </View>} emptyHideHeader={false} ref={this._refsManager.linkRef('autolist-a9663c84')} />
          </View>}
        {!!$eval(() => this.state.current_tab == 2) && <View ref={this._refsManager.linkRef('view-ce47f908')} className='Study__vw5 M-flex-item'>
            <AutoList dataSource={$eval(() => this.state.mycourse)} autoFetch={true} mode='scroll' pageMode='auto' emptyText='无课程' footerMarginTop={0} pageSize={10} renderItem={(item, index, currentPage) => <View>
                  <SingleCourseComponent title='' course={$eval(() => item)} ref={this._refsManager.linkRef('singlecoursecomponent-9327eb43')} />
                </View>} emptyHideHeader={false} ref={this._refsManager.linkRef('autolist-fa61ba3a')} />
          </View>}
      </React.Fragment>;
  }
}
export default Study$Page;