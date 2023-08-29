import ICONS from "./icons";
import React from 'react';
import { Page, HeaderBar, View, Video, Text, AtIcon, ScrollView, AutoList, Input } from 'cross-ui';
import { requestHandle } from '@/utils/dataSource';
import IndividualVideoComponent from "@/pages/components/IndividualVideoComponent";
import InteractiveCommunication from "@/pages/components/InteractiveCommunication";
import KeyPointsOfCourseware from "@/pages/components/KeyPointsOfCourseware";
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
class CourseDetailsPage$Page extends React.Component<any, any> {
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
      tabs: ['视频列表', '课程介绍'],
      current_tab: 0,
      videoId: '64b53afa367768f60c922d1f',
      index: 0,
      playstatus: true,
      timerId: {}
    };
  }
  utils = Object.assign({
    getRoute: utils.createRoute('courseDetailsPage')
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
          return false;
        },
        isSync: false,
        type: 'fetch',
        options: function () {
          return {
            uri: _this.constants.url + '/video_course_detail' + `?_id=${_this.utils?.getRoute()?.query?._id || '64b53a77367768f60c922d1e'}&typed=1`,
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
        id: 'getvideo',
        isInit: function () {
          return false;
        },
        isSync: false,
        type: 'fetch',
        options: function () {
          return {
            uri: _this.constants.url + '/video_video_detail' + `?_id=${_this.state.videoId}`,
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
        id: 'play',
        isInit: function () {
          return true;
        },
        isSync: false,
        type: 'fetch',
        options: function () {
          return {
            uri: _this.constants.url + '/video_video_detail' + `?typed=play`,
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
          console.log(res.data?.data?.PlayInfo[0]?.PlayURL);
          _this.setState({
            playurl: res.data?.data?.PlayInfo[0]?.PlayURL
          });
          return res.data?.data;
        }
      }, {
        id: 'playadd',
        isInit: function () {
          return false;
        },
        isSync: false,
        type: 'fetch',
        options: function () {
          return {
            uri: _this.constants.url + '/video_learning_time_detail',
            contentType: 'JSON',
            method: 'POST',
            isCors: true,
            params: {
              videoId: _this.state.videoId
            },
            headers: {}
          };
        }
      }, {
        id: 'finish',
        isInit: function () {
          return false;
        },
        isSync: false,
        type: 'fetch',
        options: function () {
          return {
            uri: _this.constants.url + '/video_time_class_detail',
            contentType: 'JSON',
            method: 'PUT',
            isCors: true,
            params: {},
            headers: {}
          };
        },
        willFetch: function willFetch(options) {
          return options;
        },
        dataHandler: function dataHandler(res) {
          return res.data;
        }
      }]
    };
  }
  componentWillUnmount() {
    console.log('页面退出');
    this.setStateValue(false, {
      field: 'isstudy'
    });
    console.log('abc', this.state.timerId);
    clearInterval(this.state.timerId);
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
  playByIndex = index => {
    const kid = this.state.dataList.videoList[index].kid;
    const videoId = this.state.dataList.videoList[index]._id;
    console.log(videoId);
    this.setState({
      isstudy: true,
      videoId: videoId
    }, () => {
      this.dataSourceMap['play']?.load({
        videoId: kid
      });
    });
  };
  playOperation = async () => {
    console.log('this.state.isstudy', this.state.isstudy);
    if (this.state.isstudy) {
      const index = this.state.index;
      const newArray = this.state.dataList?.videoList;
      const sum = newArray[index].study_time * 60 / newArray[index].duration;

      // console.log("num", sum)

      if (sum > 0.9) {
        console.log('-1-1');
        console.log('-2-2', newArray[index].status);
        if (newArray[index].status == 1) {
          console.log('进来3');
          await this.dataSourceMap['finish']?.load({
            videoId: this.state.videoId
          });
          newArray[index].status = 2;
        }
      } else {
        newArray[index].status = 1;
      }
      if (sum < 2) {
        this.dataSourceMap['playadd']?.load({
          videoId: this.state.videoId
        });
        newArray[index].study_time = newArray[index].study_time + 1;
      }
      this.setState({
        dataList: {
          ...this.state.dataList,
          videoList: newArray
        }
      });
    }
  };
  async_componentDidMount = async () => {
    await this.dataSourceMap['dataList']?.load();
    // this.playByIndex(0)

    const b = setInterval(this.playOperation, 60000);
    this.setStateValue(b, {
      field: 'timerId'
    });
  };
  componentDidMount() {
    this._dataSourceEngine.reloadDataSource();
    this.async_componentDidMount();
  }
  render() {
    const _this = this;
    return <Page statusBarMode='light' backgroundImage='https://file.mengti.cc/FiLftfp_5O48Dd2MZyQ3jUW9Cs_a' className='courseDetailsPage__course_details_page'>
        <HeaderBar backgroundColor='#6749ff' mode='light' showBack={true} title='' titleAlign='center' translucent={true} capsulePadding='right' />
        <View ref={this._refsManager.linkRef('view-555a924a')} className='courseDetailsPage__course_details_page__vw1'>
          {!!$eval(() => this.state.playstatus) && <Video src={$eval(() => this.state.playurl)} ref={this._refsManager.linkRef('video-d47262f5')} controls={true} autoplay={true} showCenterPlayBtn={true} onPlay={e => {
          this.setState({
            isstudy: true
          });
        }} 指定视频初始播放位置={300} objectFit='contain' showFullscreenBtn={true} onPause={e => {
          this.setState({
            isstudy: false
          });
        }} onEnded={e => {
          this.setState({
            isstudy: false
          });
        }} enableProgressGesture={true} className='courseDetailsPage__course_details_page__vw1__Video' />}
        </View>
        <View ref={this._refsManager.linkRef('view-9589fad7')} className='courseDetailsPage__course_details_page__vw2'>
          <View ref={this._refsManager.linkRef('view-4b8ffdab')} className='courseDetailsPage__course_details_page__vw2__vw'>
            <View className='courseDetailsPage__course_details_page__vw2__vw__vw'>
              <Text numberOfLines={1} className='courseDetailsPage__course_details_page__vw2__vw__vw__tx'>
                {$eval(() => this.state.dataList?.title || '学会领导力')}
              </Text>
            </View>
          </View>
          <View className='courseDetailsPage__course_details_page__vw2__vw1'>
            <Text className='courseDetailsPage__course_details_page__vw2__vw1__tx'>
              播放
            </Text>
            <Text className='courseDetailsPage__course_details_page__vw2__vw1__tx1'>
              17.5w
            </Text>
            <Text className='courseDetailsPage__course_details_page__vw2__vw1__tx2'>
              心得0条
            </Text>
          </View>
          <View className='courseDetailsPage__course_details_page__vw2__vw2'>
            <View className='courseDetailsPage__course_details_page__vw2__vw2__vw M-flex-item'>
              <View ref={this._refsManager.linkRef('view-6c630677')} onClick={e => {
              this.utils.navigateTo('classHomePage', {
                query: {
                  _id: this.state.dataList?.videoList[0].classId // 跳转时会在 pages/xxx/xxx?id=1
                }
              });
            }} className='courseDetailsPage__course_details_page__vw2__vw2__vw__vw M-flex-item'>
                <View>
                  <AtIcon color='#840212' size={30} svg={ICONS["svg_go1yuv"]} className='courseDetailsPage__AtIcon' />
                </View>
                <Text className='courseDetailsPage__course_details_page__vw2__vw2__vw__vw__tx1'>
                  我的班级
                </Text>
              </View>
              <View onClick={e => {
              this.utils.navigateTo('myStudy', {
                query: {
                  classId: this.state.dataList?.videoList[0].classId // 跳转时会在 pages/xxx/xxx?id=1
                },

                params: {
                  item: {},
                  // 可传递JS变量
                  onXXX: val => {} // 可传递回调函数 页面中可使用this.utils.getRoute()?.params?.onXXX?.(回传数据)
                }
              });
            }} className='courseDetailsPage__course_details_page__vw2__vw2__vw__vw1 M-flex-item'>
                <View>
                  <AtIcon color='#840212' size={30} svg={ICONS["svg_q41osi"]} className='courseDetailsPage__AtIcon_1' />
                </View>
                <Text ref={this._refsManager.linkRef('text-c17d2433')} className='courseDetailsPage__course_details_page__vw2__vw2__vw__vw1__tx1'>
                  我的作业
                </Text>
              </View>
              <View className='courseDetailsPage__course_details_page__vw2__vw2__vw__vw2 M-flex-item'>
                <View>
                  <AtIcon color='#9013fe' size={30} svg={ICONS["svg_g6dkb1"]} className='courseDetailsPage__AtIcon_2' />
                </View>
                <Text className='courseDetailsPage__course_details_page__vw2__vw2__vw__vw2__tx1'>
                  学习情况
                </Text>
              </View>
              <View ref={this._refsManager.linkRef('view-bfd79a15')} className='courseDetailsPage__course_details_page__vw2__vw2__vw__vw3 M-flex-item'>
                <View>
                  <AtIcon color='#840212' size={30} svg={ICONS["svg_0kp2ar"]} className='courseDetailsPage__AtIcon_3' />
                </View>
                <Text className='courseDetailsPage__course_details_page__vw2__vw2__vw__vw3__tx1'>
                  学习心得
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View ref={this._refsManager.linkRef('view-f66398c8')} className='courseDetailsPage__tab'>
          {$evalArray(() => this.state.tabs).map((item, index) => (_this => <View onClick={e => {
          _this.setState({
            current_tab: index
          }, () => {
            console.log(_this.state.current_tab);
            if (index == 1) {}
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
        }} ref={this._refsManager.linkRef('view-2a73b406')} className='courseDetailsPage__tab__vw M-flex-item'>
                <View ref={this._refsManager.linkRef('view-318d6530')}>
                  <Text ref={this._refsManager.linkRef('text-d3d19bdb')} inlineStyle={[{
              enable: $eval(() => _this.state.current_tab == index),
              name: '动态样式1',
              style: {
                color: '#000000'
              }
            }]} className='courseDetailsPage__tx'>
                    {$eval(() => item)}
                  </Text>
                </View>
                <View ref={this._refsManager.linkRef('view-0555ecbb')} className='courseDetailsPage__tab__vw__vw1'>
                  <View inlineStyle={[{
              enable: $eval(() => _this.state.current_tab == index),
              name: '动态样式1',
              style: {
                backgroundColor: '#41c872',
                width: px(84),
                height: px(4)
              }
            }]} ref={this._refsManager.linkRef('view-08dfe83f')} className='courseDetailsPage__tab__vw__vw1__vw' />
                </View>
              </View>)($createChildContext(_this, {
          item,
          index
        })))}
        </View>
        {!!$eval(() => this.state.current_tab == 0) && <ScrollView ref={this._refsManager.linkRef('scrollview')} className='courseDetailsPage__course_details_page__sv4'>
            {$evalArray(() => this.state.dataList?.videoList).map((item, index) => (_this => <View ref={this._refsManager.linkRef('view-e43ab6a4')} className='courseDetailsPage__course_details_page__sv4__vw'>
                    <View animationIn='' onClick={e => {
            // this.dataSourceMap["play"]?.load({ videoId: this.item.kid });

            _this.playByIndex(index);

            // this.setStateValue(this.index, {
            //   field: 'index'
            // })

            _this.setState({
              index: index
              // CoverURL: this.item.CoverURL
            });

            const current = index;
            const newArray = _this.state.dataList?.videoList;
            const updatedArray = newArray?.map((item, index) => {
              if (parseInt(index) == parseInt(current)) {
                item.current = true;
              } else {
                item.current = false;
              }
              // console.log('xunhuan', item)

              return item;
            });
            _this.setState({
              dataList: {
                ..._this.state.dataList,
                videoList: updatedArray
              }
            });

            // this.setState({ dataList: updatedArray});

            // const newArray = this.state.dataList?.videoList

            // newArray[this.index].current = true
            // this.setState({dataList?.videoList: newArray }); // 更新状态变量

            // this.setStateValue(true, {
            //   field: 'dataList.videoList.current'
            // })
          }} ref={this._refsManager.linkRef('view-c5c84239')}>
                      <IndividualVideoComponent source={$eval(() => item)} current={$eval(() => item?.current)} ref={this._refsManager.linkRef('individualvideocomponent-c8930262')} />
                    </View>
                  </View>)($createChildContext(_this, {
          item,
          index
        })))}
          </ScrollView>}
        {!!false && <AutoList dataSource={$eval(() => this.state.dataList?.videoList)} autoFetch={true} mode='noscroll' pageMode='auto' emptyText='' footerMarginTop={0} pageSize={10} renderItem={(item, index, currentPage) => <View ref={this._refsManager.linkRef('view-e43ab6a4')} className='courseDetailsPage__vw'>
                <View animationIn='bounceInUp' onClick={e => {
          // this.dataSourceMap["play"]?.load({ videoId: this.item.kid });

          _this.playByIndex(index);

          // this.setStateValue(this.index, {
          //   field: 'index'
          // })

          _this.setState({
            index: index
            // CoverURL: this.item.CoverURL
          });

          const current = index;
          const newArray = _this.state.dataList?.videoList;
          const updatedArray = newArray?.map((item, index) => {
            if (parseInt(index) == parseInt(current)) {
              item.current = true;
            } else {
              item.current = false;
            }
            // console.log('xunhuan', item)

            return item;
          });
          console.log('update:', updatedArray);
          _this.setState({
            dataList: {
              ..._this.state.dataList,
              videoList: updatedArray
            }
          });

          // this.setState({ dataList: updatedArray});

          // const newArray = this.state.dataList?.videoList

          // newArray[this.index].current = true
          // this.setState({dataList?.videoList: newArray }); // 更新状态变量

          // this.setStateValue(true, {
          //   field: 'dataList.videoList.current'
          // })
        }} ref={this._refsManager.linkRef('view-c5c84239')}>
                  <IndividualVideoComponent source={$eval(() => item)} current={$eval(() => item?.current)} ref={this._refsManager.linkRef('individualvideocomponent-c8930262')} />
                </View>
              </View>} emptyHideHeader={false} ref={this._refsManager.linkRef('autolist-289f661a')} />}
        {!!false && <InteractiveCommunication title='' ref={this._refsManager.linkRef('interactivecommunication-5d90e934')} />}
        {!!$eval(() => this.state.current_tab == 0) && <View ref={this._refsManager.linkRef('view-4bcb6e09')} style={{}}>
            {!!false && <View ref={this._refsManager.linkRef('view-b44aacac')} className='courseDetailsPage__vw_4'>
                <View ref={this._refsManager.linkRef('view-8ae943e1')} className='courseDetailsPage__vw_4__vw M-flex-item'>
                  <Input type='text' confirmType='done' value='' placeholder='写下这一刻的想法' password={false} ref={this._refsManager.linkRef('input-2cf102b4')} className='courseDetailsPage__vw_4__vw__Input' />
                </View>
                <View ref={this._refsManager.linkRef('view-174315a2')} className='courseDetailsPage__vw_4__vw1'>
                  <Text ref={this._refsManager.linkRef('text-f6142b72')} className='courseDetailsPage__vw_4__vw1__tx'>
                    发送
                  </Text>
                </View>
              </View>}
          </View>}
        {!!false && <KeyPointsOfCourseware title='' ref={this._refsManager.linkRef('keypointsofcourseware-25e36522')} content={$eval(() => this.item?.description)} />}
        {!!$eval(() => this.state.current_tab == 1) && <CoursewareDetailedList title='' ref={this._refsManager.linkRef('coursewaredetailedlist-f4c6a8aa')} content={$eval(() => this.state.dataList?.description)} />}
      </Page>;
  }
}
export default CourseDetailsPage$Page;