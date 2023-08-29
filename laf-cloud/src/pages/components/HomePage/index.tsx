import static_image from "./images/image.png";
import static_r1_image from "./images/r1_image.png";
import static_image_2 from "./images/image_2.png";
import ICONS from "./icons";
import React from 'react';
import { HeaderBar, ScrollView, Image, View, Text, AtIcon } from 'cross-ui';
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
class HomePage$Page extends React.Component<any, any> {
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
    getRoute: utils.createRoute('HomePage')
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
        id: 'datalist',
        isInit: function () {
          return false;
        },
        isSync: false,
        type: 'fetch',
        options: function () {
          return {
            uri: _this.constants.url + '/video_course',
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
          return res.data?.data?.data;
        }
      }]
    };
  }
  async_componentDidMount = async () => {
    // this.dataSourceMap["datalist"]?.load();
  };
  componentDidMount() {
    this._dataSourceEngine.reloadDataSource();
    this.async_componentDidMount();
  }
  render() {
    const _this = this;
    return <React.Fragment>
        <HeaderBar backgroundColor='#ffffff' mode='light' showBack={false} title='宏勤学' titleAlign='center' translucent={true} ref={this._refsManager.linkRef('headerbar-229b3847')} />
        <ScrollView ref={this._refsManager.linkRef('scrollview')} className='HomePage__home_page__sv1'>
          <Image src={static_image} remote={false} fit={false} className='HomePage__home_page__sv1__Image' />
          <View className='HomePage__home_page__sv1__vw1' />
          <View className='HomePage__home_page__sv1__vw2'>
            <View className='HomePage__home_page__sv1__vw2__vw'>
              <View>
                <Text className='HomePage__tx'>公告</Text>
              </View>
              <View>
                <AtIcon color='#666' size={15} svg={ICONS["svg_tim2ni"]} className='HomePage__AtIcon' />
              </View>
            </View>
            <View className='HomePage__home_page__sv1__vw2__vw1'>
              <View className='HomePage__home_page__sv1__vw2__vw1__vw'>
                <View>
                  <Image src={static_r1_image} remote={false} fit={false} className='HomePage__Image' />
                </View>
                <View>
                  <Text className='HomePage__tx_1'>
                    欢迎大家进入宏勤学课堂，祝愿在此大家收获满满！
                  </Text>
                </View>
              </View>
              <View className='HomePage__home_page__sv1__vw2__vw1__vw1'>
                <Text className='HomePage__home_page__sv1__vw2__vw1__vw1__tx'>
                  {$eval(() => this.utils.getCurrentDate())}
                </Text>
              </View>
            </View>
          </View>
          <View ref={this._refsManager.linkRef('view-99cd6f03')} className='HomePage__home_page__sv1__vw3'>
            <View ref={this._refsManager.linkRef('view-b80c1925')} className='HomePage__home_page__sv1__vw3__vw'>
              <View className='HomePage__home_page__sv1__vw3__vw__vw'>
                <Text className='HomePage__home_page__sv1__vw3__vw__vw__tx'>
                  点播视频
                </Text>
              </View>
              <View className='HomePage__home_page__sv1__vw3__vw__vw1'>
                <View>
                  <Image src={static_image_2} remote={false} fit={false} className='HomePage__Image_2' />
                </View>
                <View>
                  <Text className='HomePage__tx_3'>请联系管理员添加班级</Text>
                </View>
              </View>
              <View className='HomePage__home_page__sv1__vw3__vw__vw2' />
            </View>
          </View>
          <View className='HomePage__home_page__sv1__vw4' />
          <View className='HomePage__home_page__sv1__vw5' />
          <View className='HomePage__home_page__sv1__vw6' />
          {$evalArray(() => this.state.datalist).map((item, index) => (_this => !!false && <View ref={this._refsManager.linkRef('view-0e81178e')} onClick={e => {
          _this.utils.navigateTo('videoHome', {
            query: {
              _id: item?._id // 跳转时会在 pages/xxx/xxx?id=1
            }
          });
        }} className='HomePage__home_page__sv1__vw7'>
                  <View className='HomePage__home_page__sv1__vw7__vw'>
                    <Image src={$eval(() => item?.cover)} remote={false} fit={false} ref={this._refsManager.linkRef('image-4665aee9')} className='HomePage__home_page__sv1__vw7__vw__Image' />
                  </View>
                  <View ref={this._refsManager.linkRef('view-2e305029')} className='HomePage__home_page__sv1__vw7__vw1 M-flex-item'>
                    <Text ref={this._refsManager.linkRef('text-23e01e4c')} className='HomePage__home_page__sv1__vw7__vw1__tx'>
                      {$eval(() => item?.title)}
                    </Text>
                    <Text numberOfLines={2} ref={this._refsManager.linkRef('text-3c5cfbc0')} className='HomePage__home_page__sv1__vw7__vw1__tx1'>
                      {$eval(() => item?.description)}
                    </Text>
                  </View>
                </View>)($createChildContext(_this, {
          item,
          index
        })))}
        </ScrollView>
      </React.Fragment>;
  }
}
export default HomePage$Page;