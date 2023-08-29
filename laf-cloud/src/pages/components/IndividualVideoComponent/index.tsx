import ICONS from "./icons";
import React from 'react';
import { View, Text, AtIcon } from 'cross-ui';
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
class IndividualVideoComponent$Page extends React.Component<any, any> {
  constructor(props, context) {
    super(props);
    this.state = {};
  }
  utils = Object.assign({
    getRoute: utils.createRoute('IndividualVideoComponent')
  }, utils);
  constants = constants;
  _refsManager = new RefsManager();
  $ = refName => {
    return this._refsManager.get(refName);
  };
  $$ = refName => {
    return this._refsManager.getAll(refName);
  };
  returnType = num => {
    if (num == 0) {
      return '未完成';
    }
    if (num == 1) {
      return '学习中';
    }
    if (num == 2) {
      return '已完成';
    }
  };
  componentDidMount() {}
  render() {
    const _this = this;
    return <React.Fragment fill={true}>
        <View ref={this._refsManager.linkRef('view-685e99ce')} className='IndividualVideoComponent__vw'>
          <Text ref={this._refsManager.linkRef('text-596a566e')} className='IndividualVideoComponent__vw__tx'>
            01
          </Text>
          <View ref={this._refsManager.linkRef('view-31a067e3')} className='IndividualVideoComponent__vw__vw1 M-flex-item'>
            <Text numberOfLines={1} inlineStyle={[{
            enable: $eval(() => this.props?.current),
            name: '动态样式1',
            style: {
              color: '#41c872'
            }
          }]} ref={this._refsManager.linkRef('text-135bc749')} className='IndividualVideoComponent__vw__vw1__tx'>
              {$eval(() => this.props?.source?.title || '默认')}
            </Text>
            <View ref={this._refsManager.linkRef('view-49d29440')} className='IndividualVideoComponent__vw__vw1__vw1'>
              <Text numberOfLines={1} className='IndividualVideoComponent__vw__vw1__vw1__tx'>
                {$eval(() => this.props?.source?.startTime.slice(0, 10))}
              </Text>
              {!!false && <Text numberOfLines={1} ref={this._refsManager.linkRef('text-5fe9134c')} className='IndividualVideoComponent__vw__vw1__vw1__tx1'>
                  {$eval(() => this.props?.source?.description || '默认')}
                </Text>}
              <Text ref={this._refsManager.linkRef('text-f27dcd27')} className='IndividualVideoComponent__vw__vw1__vw1__tx2'>
                {$eval(() => `${this.props?.source?.num || 0}万次播放`)}
              </Text>
            </View>
            <View className='IndividualVideoComponent__vw__vw1__vw2'>
              <Text inlineStyle={[{
              enable: $eval(() => this.props?.source?.status == 1),
              name: '动态样式1',
              style: {
                color: '#d0021b'
              }
            }, {
              enable: $eval(() => this.props?.source?.status == 2),
              name: '动态样式1',
              style: {
                color: '#7ed321'
              }
            }]} ref={this._refsManager.linkRef('text-2bc96dcb')} className='IndividualVideoComponent__vw__vw1__vw2__tx'>
                {$eval(() => this.props?.source?.status === 0 ? '未完成' : this.props?.source?.status === 1 ? '学习中' : '已完成')}
              </Text>
              <Text className='IndividualVideoComponent__vw__vw1__vw2__tx1'>
                {$eval(() => `${Math.min(this.props?.source?.study_time * 60 / this.props?.source?.duration * 100 || 0, 100).toFixed(1)}%`)}
              </Text>
            </View>
          </View>
          <View className='IndividualVideoComponent__vw__vw2'>
            <AtIcon value='clock' size={30} color='#41c872' svg={ICONS["svg_clock"]} />
          </View>
        </View>
      </React.Fragment>;
  }
}
export default IndividualVideoComponent$Page;