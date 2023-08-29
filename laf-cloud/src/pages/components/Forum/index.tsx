import React from 'react';
import { View, AtAvatar, Text, AtIcon } from 'cross-ui';
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
class Forum$Page extends React.Component<any, any> {
  constructor(props, context) {
    super(props);
    this.state = {
      test: 'tst默认'
    };
  }
  utils = Object.assign({
    getRoute: utils.createRoute('Forum')
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
    return <React.Fragment fill={false}>
        <View className='Forum__vw'>
          <View className='Forum__vw__vw'>
            <View className='Forum__vw__vw__vw'>
              <AtAvatar size='small' circle={true} ref={this._refsManager.linkRef('atavatar-a9d5315b')} />
            </View>
            <View className='Forum__vw__vw__vw1 M-flex-item'>
              <View className='Forum__vw__vw__vw1__vw'>
                <Text className='Forum__vw__vw__vw1__vw__tx'>
                  {$eval(() => this.props?.user_name || '默认名称')}
                </Text>
              </View>
              <View className='Forum__vw__vw__vw1__vw1'>
                <Text className='Forum__vw__vw__vw1__vw1__tx'>
                  {$eval(() => this.props?.createTime || '2022-12-21 17:15:13')}
                </Text>
              </View>
              <View className='Forum__vw__vw__vw1__vw2'>
                <Text className='Forum__vw__vw__vw1__vw2__tx'>
                  {$eval(() => this.props?.content || '内存内存内存内存内存内存内存内存内存内存内存内存内存内存内存')}
                </Text>
              </View>
              <View className='Forum__vw__vw__vw1__vw3'>
                <View ref={this._refsManager.linkRef('view-e9ea918c')} className='Forum__vw__vw__vw1__vw3__vw'>
                  <View ref={this._refsManager.linkRef('view-432290b6')} className='Forum__vw__vw__vw1__vw3__vw__vw'>
                    <AtIcon value='bell' size={18} color='#cccccc' className='Forum__vw__vw__vw1__vw3__vw__vw__AtIcon' />
                    <Text className='Forum__vw__vw__vw1__vw3__vw__vw__tx1'>
                      评论
                    </Text>
                  </View>
                  <View ref={this._refsManager.linkRef('view-5aab512a')} className='Forum__vw__vw__vw1__vw3__vw__vw1'>
                    <AtIcon value='heart' size={18} color='#adadad' ref={this._refsManager.linkRef('aticon-9bf3c44b')} className='Forum__vw__vw__vw1__vw3__vw__vw1__AtIcon' />
                    {!!false && <AtIcon value='heart-2' size={18} color='#f60303' ref={this._refsManager.linkRef('aticon-6a80b50a')} className='Forum__vw__vw__vw1__vw3__vw__vw1__AtIcon1' />}
                    <Text className='Forum__vw__vw__vw1__vw3__vw__vw1__tx2'>
                      点赞
                    </Text>
                  </View>
                </View>
                <View>
                  <View className='Forum__vw_1'>
                    <View className='Forum__vw_1__vw'>
                      <View className='Forum__vw_1__vw__vw'>
                        <AtIcon value='heart-2' size={18} color='#ff0000' className='Forum__vw_1__vw__vw__AtIcon' />
                      </View>
                      <View className='Forum__vw_1__vw__vw1 M-flex-item'>
                        <Text className='Forum__vw_1__vw__vw1__tx'>文本</Text>
                      </View>
                    </View>
                  </View>
                  <View>
                    <View className='Forum__vw_2'>
                      <View className='Forum__vw_2__vw' />
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </React.Fragment>;
  }
}
export default Forum$Page;