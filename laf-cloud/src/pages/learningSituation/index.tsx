import React from 'react';
import { Page, HeaderBar, View, Text, AtIcon, AutoList, Modal, AtCalendar } from 'cross-ui';
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
class LearningSituation$Page extends React.Component<any, any> {
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
      datetime: ''
    };
  }
  utils = Object.assign({
    getRoute: utils.createRoute('learningSituation')
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
            uri: _this.constants.url + '/video_assignment_detail' + `?typed=history&classId=${_this.utils?.getRoute()?.query?.classId || '64b5fbb3e358efb950c8c389'}&datetime=${_this.state.datetime}`,
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
    return <Page statusBarMode='light' style={{}} backgroundImage='https://file.mengti.cc/FiLftfp_5O48Dd2MZyQ3jUW9Cs_a'>
        <HeaderBar backgroundColor='#ffffff' mode='light' showBack={true} title='今日学习情况' titleAlign='center' translucent={true} />
        <View ref={this._refsManager.linkRef('view-84f4d70e')} className='learningSituation__vw1 M-flex-item'>
          <View className='learningSituation__vw1__vw'>
            <Text className='learningSituation__vw1__vw__tx'>作业情况</Text>
            <View onClick={e => {
            this.$('modal').open();
          }} ref={this._refsManager.linkRef('view-4d2f710f')} className='learningSituation__vw1__vw__vw1'>
              <Text className='learningSituation__vw1__vw__vw1__tx'>
                历史数据
              </Text>
              <AtIcon value='chevron-right' size={16} color='#666' ref={this._refsManager.linkRef('aticon-5284d310')} />
            </View>
          </View>
          <View className='learningSituation__vw1__vw1'>
            <Text className='learningSituation__vw1__vw1__tx'>未分组</Text>
            <View ref={this._refsManager.linkRef('view-4c30a00d')} className='learningSituation__vw1__vw1__vw1'>
              <Text className='learningSituation__vw1__vw1__vw1__tx'>
                更多小组
              </Text>
              <AtIcon value='clock' size={16} color='#666' />
            </View>
          </View>
          <View ref={this._refsManager.linkRef('view-f67060a9')} className='learningSituation__vw1__vw2'>
            <Text className='learningSituation__vw1__vw2__tx'>
              {$eval(() => `${this.state.dataList?.startTime.slice(0, 10) || ''}-${this.state.dataList?.endTime.slice(0, 10) || ''}`)}
            </Text>
            <Text ref={this._refsManager.linkRef('text-8ded2074')} className='learningSituation__vw1__vw2__tx1'>
              积分合计: 0分
            </Text>
          </View>
          <View ref={this._refsManager.linkRef('view-eb4d095b')} className='learningSituation__vw1__vw3'>
            <View className='learningSituation__vw1__vw3__vw'>
              <View className='learningSituation__vw1__vw3__vw__vw M-flex-item'>
                <View className='learningSituation__vw1__vw3__vw__vw__vw M-flex-item'>
                  <View ref={this._refsManager.linkRef('view-4a6b4fdd')} className='learningSituation__vw1__vw3__vw__vw__vw__vw'>
                    <Text ref={this._refsManager.linkRef('text-c30998ef')} className='learningSituation__vw1__vw3__vw__vw__vw__vw__tx'>
                      姓名
                    </Text>
                  </View>
                  <View className='learningSituation__vw1__vw3__vw__vw__vw__vw1'>
                    <Text className='learningSituation__vw1__vw3__vw__vw__vw__vw1__tx'>
                      听课
                    </Text>
                  </View>
                  <View ref={this._refsManager.linkRef('view-d90f9a5f')} className='learningSituation__vw1__vw3__vw__vw__vw__vw2 M-flex-item'>
                    <Text className='learningSituation__vw1__vw3__vw__vw__vw__vw2__tx'>
                      作业
                    </Text>
                  </View>
                </View>
              </View>
              <View className='learningSituation__vw1__vw3__vw__vw1 M-flex-item'>
                <View className='learningSituation__vw1__vw3__vw__vw1__vw M-flex-item'>
                  <View className='learningSituation__vw1__vw3__vw__vw1__vw__vw M-flex-item'>
                    <View ref={this._refsManager.linkRef('view-06adff45')} className='learningSituation__vw1__vw3__vw__vw1__vw__vw__vw'>
                      <Text className='learningSituation__vw1__vw3__vw__vw1__vw__vw__vw__tx'>
                        学分
                      </Text>
                    </View>
                    <View style={{}}>
                      <Text ref={this._refsManager.linkRef('text-978cafa1')} className='learningSituation__tx'>
                        累计学分
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View className='learningSituation__vw1__vw3__vw1' />
          </View>
          <AutoList dataSource={$eval(() => this.state.dataList?.data)} autoFetch={false} mode='noscroll' pageMode='auto' emptyText='' footerMarginTop={0} pageSize={10} renderItem={(item, index, currentPage) => <View style={{}}>
                <View inlineStyle={[{
            enable: $eval(() => index % 2 === 0 ? true : false),
            name: '动态样式1',
            style: {
              backgroundColor: '#ffffff'
            }
          }]} className='learningSituation__vw'>
                  <View className='learningSituation__vw__vw M-flex-item'>
                    <View className='learningSituation__vw__vw__vw M-flex-item'>
                      <View ref={this._refsManager.linkRef('view-b6955200')} className='learningSituation__vw__vw__vw__vw M-flex-item'>
                        <Text ref={this._refsManager.linkRef('text-9b5519a2')} className='learningSituation__vw__vw__vw__vw__tx'>
                          {$eval(() => item?.user?.nickname)}
                        </Text>
                      </View>
                      <View ref={this._refsManager.linkRef('view-c343cf8d')} className='learningSituation__vw__vw__vw__vw1 M-flex-item'>
                        <AtIcon value='heart-2' size={20} color={$eval(() => item?.assignment?.vid_status ? '#d02020' : '#bcb5b5')} ref={this._refsManager.linkRef('aticon-180d082d')} />
                      </View>
                      <View ref={this._refsManager.linkRef('view-d05aa5f2')} className='learningSituation__vw__vw__vw__vw2 M-flex-item'>
                        <AtIcon value='heart-2' size={20} color={$eval(() => item?.assignment ? '#d02020' : '#bcb5b5')} ref={this._refsManager.linkRef('aticon-24b42111')} />
                      </View>
                    </View>
                  </View>
                  <View className='learningSituation__vw__vw1 M-flex-item'>
                    <View className='learningSituation__vw__vw1__vw M-flex-item'>
                      <View className='learningSituation__vw__vw1__vw__vw M-flex-item'>
                        <View ref={this._refsManager.linkRef('view-63c72001')} className='learningSituation__vw__vw1__vw__vw__vw'>
                          <Text ref={this._refsManager.linkRef('text-9b149e95')} className='learningSituation__vw__vw1__vw__vw__vw__tx'>
                            {$eval(() => item?.assignment?.fraction || 0)}
                          </Text>
                        </View>
                        <View ref={this._refsManager.linkRef('view-ebcbc531')} className='learningSituation__vw__vw1__vw__vw__vw1 M-flex-item'>
                          <Text ref={this._refsManager.linkRef('text-0c63eebe')} className='learningSituation__vw__vw1__vw__vw__vw1__tx'>
                            0
                          </Text>
                          <AtIcon value='chevron-right' size={20} color='#666' ref={this._refsManager.linkRef('aticon-cca05669')} />
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>} emptyHideHeader={false} ref={this._refsManager.linkRef('autolist')} />
        </View>
        <Modal style={{
        height: '60%'
      }} animate='slide-bottom' renderView={props => <View className='learningSituation__vw_1 M-flex-item'>
              <View className='learningSituation__vw_1__vw'>
                <Text className='learningSituation__vw_1__vw__tx'>
                  请选择日期
                </Text>
              </View>
              <AtCalendar format='YYYY-MM-DD' onDayClick={item => {
          _this.$('modal').close();

          // console.log(item)

          _this.setState({
            datetime: item.value
          }, () => {
            _this.dataSourceMap['dataList']?.load();
          });
        }} isMultiSelect={false} isSwiper={false} hideArrow={false} isVertical={false} className='learningSituation__vw_1__AtCalendar1' />
            </View>} visible={false} maskClosable={true} ref={this._refsManager.linkRef('modal')} />
      </Page>;
  }
}
export default LearningSituation$Page;