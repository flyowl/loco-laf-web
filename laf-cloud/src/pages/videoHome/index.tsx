import static_image from "./images/image.png";
import React from 'react';
import { Page, HeaderBar, View, AtButton, Image, Text } from 'cross-ui';
import { requestHandle } from '@/utils/dataSource';
import VideoColumnFormComponent from "@/pages/components/VideoColumnFormComponent";
import CoursewareDetailedList from "@/pages/components/CoursewareDetailedList";
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
class VideoHome$Page extends React.Component<any, any> {
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
      tabs: ['课程介绍', '课件列表'],
      current_tab: 0,
      _id: '64b53a77367768f60c922d1e',
      show: false
    };
  }
  utils = Object.assign({
    getRoute: utils.createRoute('videoHome')
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
            uri: _this.constants.url + '/video_course_detail' + `?_id=${_this.utils?.getRoute()?.query?._id || '64b53a77367768f60c922d1e'}`,
            contentType: 'JSON',
            method: 'GET',
            isCors: true,
            params: {},
            headers: {}
          };
        },
        willFetch: function willFetch(options) {
          return options;
        },
        dataHandler: function dataHandler(res) {
          return res.data?.data;
        }
      }, {
        id: 'isbuy',
        isInit: function () {
          return true;
        },
        isSync: false,
        type: 'fetch',
        options: function () {
          return {
            uri: _this.constants.url + '/video_user_detail' + `?typed=status&courseId=${_this.utils?.getRoute()?.query?._id || '64b53a86731e46785090c560'}`,
            contentType: 'JSON',
            method: 'POST',
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
    return <Page statusBarMode='light' backgroundImage='https://file.mengti.cc/FiLftfp_5O48Dd2MZyQ3jUW9Cs_a' className='videoHome__video_home'>
        <HeaderBar backgroundColor='#ffffff' mode='light' showBack={true} title='斩月领导力' titleAlign='center' translucent={true} leftContent='' rightContent='' bottomContent='' capsulePadding='right' ref={this._refsManager.linkRef('headerbar-6f926205')} className='videoHome__video_home__HeaderBar' />
        {!!$eval(() => this.state.isbuy) && <View ref={this._refsManager.linkRef('view-b4fafec3')} className='videoHome__video_home__vw1'>
            <AtButton size='small' type='primary' circle={true} className='videoHome__video_home__vw1__AtButton'>
              {' '}
              免费领取
            </AtButton>
          </View>}
        <View className='videoHome__video_home__vw2'>
          <Image src={static_image} remote={false} fit={false} className='videoHome__video_home__vw2__Image' />
        </View>
        <View className='videoHome__video_home__vw3'>
          <View className='videoHome__video_home__vw3__vw'>
            <View className='videoHome__video_home__vw3__vw__vw'>
              <View className='videoHome__video_home__vw3__vw__vw__vw' />
              <Text numberOfLines={1} selectable={false} className='videoHome__video_home__vw3__vw__vw__tx1'>
                {$eval(() => this.state.dataList?.title)}
              </Text>
            </View>
            <View className='videoHome__video_home__vw3__vw__vw1 M-flex-item'>
              {!!false && <Text ref={this._refsManager.linkRef('text-f634cbca')} className='videoHome__video_home__vw3__vw__vw1__tx'>
                  ￥10000000
                </Text>}
            </View>
          </View>
          <View>
            <Text className='videoHome__tx'>
              {$eval(() => `已更新${this.state.dataList?.num}节`)}
            </Text>
            <View className='videoHome__vw1'>
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
            }} ref={this._refsManager.linkRef('view-2a73b406')} className='videoHome__vw1__vw M-flex-item'>
                    <View ref={this._refsManager.linkRef('view-7590a527')}>
                      <Text ref={this._refsManager.linkRef('text-d3d19bdb')} className='videoHome__tx_1'>
                        {$eval(() => item)}
                      </Text>
                    </View>
                    <View className='videoHome__vw1__vw__vw1'>
                      <View inlineStyle={[{
                  enable: $eval(() => _this.state.current_tab == index),
                  name: '动态样式1',
                  style: {
                    backgroundColor: '#417505',
                    width: px(84),
                    height: px(4)
                  }
                }]} className='videoHome__vw1__vw__vw1__vw' />
                    </View>
                  </View>)($createChildContext(_this, {
              item,
              index
            })))}
            </View>
          </View>
        </View>
        {!!$eval(() => this.state.current_tab == 1) && <VideoColumnFormComponent title='' ref={this._refsManager.linkRef('videocolumnformcomponent-401f2b38')} _id={$eval(() => this.state._id || '64b53a77367768f60c922d1e')} onPlay={(video, id) => {
        // alert(JSON.stringify(video._id))
      }} data={$eval(() => this.state.dataList?.videoList)} />}
        {!!$eval(() => this.state.current_tab == 3) && <CoursewareDetailedList title='' ref={this._refsManager.linkRef('coursewaredetailedlist-2ec8c1a2')} />}
      </Page>;
  }
}
export default VideoHome$Page;