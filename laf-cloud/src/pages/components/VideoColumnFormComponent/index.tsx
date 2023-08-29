import ICONS from "./icons";
import React from 'react';
import { AutoList, View, Text, AtIcon, AtDivider } from 'cross-ui';
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
class VideoColumnFormComponent$Page extends React.Component<any, any> {
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
      dataList: []
    };
  }
  utils = Object.assign({
    getRoute: utils.createRoute('VideoColumnFormComponent')
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
            uri: _this.constants.url + '/video_video' + `?courseId=${_this.props?._id || '64b53a77367768f60c922d1e'}`,
            contentType: 'JSON',
            method: 'GET',
            isCors: true,
            params: {},
            headers: {}
          };
        },
        dataHandler: function dataHandler(res) {
          return res.data?.data?.data;
        }
      }]
    };
  }
  async_componentDidMount = async () => {
    // this.dataSourceMap["dataList"]?.load();
  };
  componentDidMount() {
    this._dataSourceEngine.reloadDataSource();
    this.async_componentDidMount();
  }
  render() {
    const _this = this;
    return <React.Fragment>
        <AutoList dataSource={$eval(() => this.props?.data)} autoFetch={true} mode='scroll' pageMode='pagination' emptyText='暂时没有课件' footerMarginTop={0} pageSize={10} renderItem={/* 插槽容器*/(item, index, currentPage) => <View>
                <View ref={this._refsManager.linkRef('view-acfd3737')} animationIn='bounceInUp' inDelay={$eval(() => index * 100)}>
                  <View onClick={e => {
            _this.props?.onPlay(item);
          }} ref={this._refsManager.linkRef('view-e7c5bebb')} className='VideoColumnFormComponent__vw'>
                    <View ref={this._refsManager.linkRef('view-516e0c1f')} className='VideoColumnFormComponent__vw__vw M-flex-item'>
                      <Text numberOfLines={1} ref={this._refsManager.linkRef('text-de27a4a5')} className='VideoColumnFormComponent__vw__vw__tx'>
                        {$eval(() => item?.title || '默认')}
                      </Text>
                      <Text ref={this._refsManager.linkRef('text-2a3137fa')} className='VideoColumnFormComponent__vw__vw__tx1'>
                        {$eval(() => item?.description || '说明')}
                      </Text>
                      <View ref={this._refsManager.linkRef('view-3c7487f3')} className='VideoColumnFormComponent__vw__vw__vw2'>
                        <Text ref={this._refsManager.linkRef('text-38aed43e')} className='VideoColumnFormComponent__vw__vw__vw2__tx'>
                          5.7
                        </Text>
                        <Text ref={this._refsManager.linkRef('text-87d6bcae')} className='VideoColumnFormComponent__vw__vw__vw2__tx1'>
                          万次播放 |
                        </Text>
                        {!!$eval(() => item?.status == 0) && <Text ref={this._refsManager.linkRef('text-87d6bcae')} className='VideoColumnFormComponent__vw__vw__vw2__tx2'>
                            未开始
                          </Text>}
                        {!!$eval(() => item?.status == 1) && <Text ref={this._refsManager.linkRef('text-87d6bcae')} className='VideoColumnFormComponent__vw__vw__vw2__tx3'>
                            学习中
                          </Text>}
                      </View>
                    </View>
                    <View ref={this._refsManager.linkRef('view-98ea3b0f')} className='VideoColumnFormComponent__vw__vw1'>
                      <AtIcon color='#ff0606' size={20} svg={ICONS["svg_cx66jq"]} ref={this._refsManager.linkRef('aticon-bdf2d1ef')} />
                    </View>
                  </View>
                  <AtDivider height={10} fontColor='#3e5bec' fontSize={28} lineColor='#edecec' customStyle={{
            backgroundColor: '#fff'
          }} ref={this._refsManager.linkRef('atdivider-62d62386')} />
                </View>
              </View>} emptyHideHeader={false} ref={this._refsManager.linkRef('autolist-b2377647')} className='VideoColumnFormComponent__AutoList' />
      </React.Fragment>;
  }
}
export default VideoColumnFormComponent$Page;