import React from 'react';
import { Page, HeaderBar, ScrollView, View, Text } from 'cross-ui';
import { requestHandle } from '@/utils/dataSource';
import StudyAssignment from "@/pages/components/StudyAssignment";
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
class MyStudy$Page extends React.Component<any, any> {
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
      tabs: ['今日作业', '往期作业'],
      current_tab: 0,
      mystudy: {
        _id: '64b602b0731e46785090c56a',
        videoId: '64b53adc731e46785090c561',
        courseId: '64b53a77367768f60c922d1e',
        classId: '64b5fbb3e358efb950c8c389',
        startTime: '2023-04-03 15:15:14',
        endTime: '2023-04-03 15:15:14',
        task: [{
          title: '不讲一句善意的谎言',
          cont: '',
          type: 1,
          isok: false,
          fraction: 10
        }, {
          title: '不说一句负面的话',
          cont: '',
          type: 1,
          isok: false,
          fraction: 10
        }, {
          title: '听课（听课自动加分）',
          cont: '',
          isok: false,
          type: 1,
          fraction: 30
        }, {
          title: '心得',
          type: 0,
          cont: '',
          isok: false,
          fraction: 30
        }, {
          title: '日行一善',
          type: 0,
          cont: '',
          isok: false,
          fraction: 30
        }, {
          title: '晨读/晚读',
          cont: '',
          isok: false,
          type: 1,
          fraction: 20
        }, {
          title: '晨会/晚会/大班会全程开视频',
          cont: '备注：晨会/晚会/大班会中实际有开视频则点击“已完成”，未开视频则不用点击',
          type: 1,
          isok: false,
          fraction: 30
        }, {
          title: '晨会/晚会/大班会分享：',
          cont: '备注：晨会/晚会/大班会中实际有分享则点击“已完成”，平时未分享则不用点击',
          type: 1,
          isok: false,
          fraction: 50
        }],
        description: '',
        createTime: '2023-06-24T07:21:24.023Z',
        updateTime: '2023-06-24T07:21:24.023Z',
        createrId: '649596b8ed0171a2acb8903f',
        updaterId: '649596b8ed0171a2acb8903f',
        deleted: false
      }
    };
  }
  utils = Object.assign({
    getRoute: utils.createRoute('myStudy')
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
        id: 'mystudy',
        isInit: function () {
          return true;
        },
        isSync: false,
        type: 'fetch',
        options: function () {
          return {
            uri: _this.constants.url + '/video_time_class_detail' + `?classId=${_this.utils?.getRoute()?.query?.classId || '64b5fbb3e358efb950c8c389'}&typed=todaytask`,
            contentType: 'JSON',
            method: 'GET',
            isCors: true,
            params: {},
            headers: {}
          };
        },
        dataHandler: async function dataHandler(res) {
          const data = res.data?.data;
          if (data.status) {
            const res = await _this.dataSourceMap['isstudy']?.load({
              _id: data._id,
              typed: 'finish'
            });
            console.log(res);
            if (res.data.status) {
              data.fraction = 30;
              _this.setState({
                vid_status: true
              }, () => [_this.setState({
                showstatus: true
              })]);
            } else {
              _this.setState({
                vid_status: false
              }, () => [_this.setState({
                showstatus: true
              })]);
              _this.utils.showToast({
                title: '请先学习',
                icon: 'success',
                duration: 2000
              });
            }
          }
          return data;
        }
      }, {
        id: 'savedata',
        isInit: function () {
          return false;
        },
        isSync: false,
        type: 'fetch',
        options: function () {
          return {
            uri: _this.constants.url + '/video_assignment_detail' + `?taskLog=${_this.props?.task}&classId=undefined`,
            contentType: 'JSON',
            method: 'POST',
            isCors: true,
            params: {},
            headers: {}
          };
        }
      }, {
        id: 'studylist',
        isInit: function () {
          return true;
        },
        isSync: false,
        type: 'fetch',
        options: function () {
          return {
            uri: _this.constants.url + '/video_assignment_detail' + `?typed=list&classId=${_this.utils?.getRoute()?.query?.classId || '64b5fbb3e358efb950c8c389'}`,
            contentType: 'JSON',
            method: 'GET',
            isCors: true,
            params: {},
            headers: {
              typed: 'list',
              classId: _this.utils?.getRoute()?.query?.classId
            }
          };
        },
        dataHandler: function dataHandler(res) {
          return res.data?.data;
        }
      }, {
        id: 'isstudy',
        isInit: function () {
          return false;
        },
        isSync: false,
        type: 'fetch',
        options: function () {
          return {
            uri: _this.constants.url + '/video_time_class_detail',
            contentType: 'JSON',
            method: 'GET',
            isCors: true,
            params: {},
            headers: {}
          };
        },
        dataHandler: function dataHandler(res) {
          // if (!res.status) {

          //   this.utils.showToast({
          //     title: '请先学习视频',
          //     icon: 'none',
          //     duration: 2000
          //   })

          //   return

          // }

          return res.data;
        }
      }]
    };
  }
  componentDidMount() {
    this._dataSourceEngine.reloadDataSource();
    const tab = this.utils.getRoute()?.query?.tab;
    if (tab) {
      this.setState({
        current_tab: tab
      });
    }
  }
  render() {
    const _this = this;
    return <Page statusBarMode='light' backgroundImage='https://file.mengti.cc/FiLftfp_5O48Dd2MZyQ3jUW9Cs_a' style={{}}>
        <HeaderBar backgroundColor='#ffffff' mode='light' showBack={true} title='我的作业' titleAlign='center' translucent={true} ref={this._refsManager.linkRef('headerbar-229b3847')} className='myStudy__HeaderBar' />
        <ScrollView ref={this._refsManager.linkRef('scrollview')}>
          <View ref={this._refsManager.linkRef('view-cb4b922d')} className='myStudy__vw'>
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
            if (index == 1) {}
          }} ref={this._refsManager.linkRef('view-2a73b406')} className='myStudy__vw__vw M-flex-item'>
                  <View>
                    <Text ref={this._refsManager.linkRef('text-d3d19bdb')} className='myStudy__tx'>
                      {$eval(() => item)}
                    </Text>
                  </View>
                  <View className='myStudy__vw__vw__vw1'>
                    <View inlineStyle={[{
                enable: $eval(() => _this.state.current_tab == index),
                name: '动态样式1',
                style: {
                  width: px(84),
                  height: px(4),
                  backgroundColor: '#42c871'
                }
              }]} className='myStudy__vw__vw__vw1__vw' />
                  </View>
                </View>)($createChildContext(_this, {
            item,
            index
          })))}
          </View>
          <View ref={this._refsManager.linkRef('view-5b03c4db')} className='myStudy__vw1 M-flex-item'>
            {!!$eval(() => this.state.current_tab == 0) && <View ref={this._refsManager.linkRef('view-078f96ab')} animationIn='0' inDelay={100} animationOut='fadeOutRight' className='myStudy__vw1__vw'>
                {!!$eval(() => this.state.showstatus) && <StudyAssignment title='' ref={this._refsManager.linkRef('studyassignment-00880c38')} task={$eval(() => this.state.mystudy?.taskLog || this.state.mystudy?.task)} current_tab={$eval(() => this.state.current_tab)} classId={$eval(() => this.utils?.getRoute()?.query?.classId)} issave={$eval(() => this.state.mystudy?.status)} timeClassId={$eval(() => this.state.mystudy?._id)} startTime={$eval(() => this.state.mystudy?.startTime || this.state.mystudy?.createTime)} endTime={$eval(() => this.state.mystudy?.endTime)} fraction={$eval(() => this.state.mystudy?.fraction || 0)} vid_status={$eval(() => this.state.vid_status)} />}
              </View>}
            {!!$eval(() => this.state.current_tab == 1) && <View ref={this._refsManager.linkRef('view-078f96ab')} animationIn='fadeInRight' inDuration={$eval(() => this.index * 100)} animationOut='fadeOutLeft' className='myStudy__vw1__vw1'>
                {$evalArray(() => this.state.studylist?.data).map((item, index) => (_this => <StudyAssignment title='' ref={this._refsManager.linkRef('studyassignment-00880c38')} task={$eval(() => item?.taskLog)} current_tab={$eval(() => _this.state.current_tab)} classId={$eval(() => _this.utils?.getRoute()?.query?.classId)} startTime={$eval(() => _this.state.mystudy?.startTime || _this.state.mystudy?.createTime)} fraction={$eval(() => item?.fraction || 0)} />)($createChildContext(_this, {
              item,
              index
            })))}
              </View>}
          </View>
        </ScrollView>
      </Page>;
  }
}
export default MyStudy$Page;