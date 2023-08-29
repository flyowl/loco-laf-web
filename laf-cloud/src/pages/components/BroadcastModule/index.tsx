import React from 'react';
import { View, AtAvatar, Text, AtButton } from 'cross-ui';
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
class BroadcastModule$Page extends React.Component<any, any> {
  constructor(props, context) {
    super(props);
    this.state = {};
  }
  utils = Object.assign({
    getRoute: utils.createRoute('BroadcastModule')
  }, utils);
  constants = constants;
  _refsManager = new RefsManager();
  $ = refName => {
    return this._refsManager.get(refName);
  };
  $$ = refName => {
    return this._refsManager.getAll(refName);
  };
  componentDidMount() {}
  render() {
    const _this = this;
    return <React.Fragment>
        {$evalArray(() => this.item?.list).map((item, index) => (_this => <View ref={this._refsManager.linkRef('view-257a1c09')} className='BroadcastModule__vw'>
              <View style={{}} ref={this._refsManager.linkRef('view-f3b44e5d')}>
                <AtAvatar size='large' circle={false} ref={this._refsManager.linkRef('atavatar-f53cc0d2')} image={$eval(() => item?.url)} customStyle={{
            borderRadius: px(14)
          }} />
              </View>
              <View ref={this._refsManager.linkRef('view-55f42e51')} className='BroadcastModule__vw__vw1 M-flex-item'>
                <View ref={this._refsManager.linkRef('view-e908b635')} className='BroadcastModule__vw__vw1__vw'>
                  <View ref={this._refsManager.linkRef('view-c63931a2')} className='BroadcastModule__vw__vw1__vw__vw'>
                    <Text className='BroadcastModule__vw__vw1__vw__vw__tx'>
                      战略
                    </Text>
                    <Text ref={this._refsManager.linkRef('text-5582f367')} className='BroadcastModule__vw__vw1__vw__vw__tx1'>
                      毕业歌
                    </Text>
                  </View>
                </View>
                <View className='BroadcastModule__vw__vw1__vw1'>
                  <View ref={this._refsManager.linkRef('view-9653566a')} className='BroadcastModule__vw__vw1__vw1__vw M-flex-item'>
                    <Text ref={this._refsManager.linkRef('text-7fbf8934')} className='BroadcastModule__vw__vw1__vw1__vw__tx'>
                      11人观看
                    </Text>
                  </View>
                  <View style={{}} ref={this._refsManager.linkRef('view-843f8dd3')}>
                    <AtButton size='small' type='primary' circle={true} className='BroadcastModule__AtButton'>
                      回放
                    </AtButton>
                  </View>
                </View>
              </View>
            </View>)($createChildContext(_this, {
        item,
        index
      })))}
      </React.Fragment>;
  }
}
export default BroadcastModule$Page;