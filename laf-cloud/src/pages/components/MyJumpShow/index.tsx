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
class MyJumpShow$Page extends React.Component<any, any> {
  constructor(props, context) {
    super(props);
    this.state = {};
  }
  utils = Object.assign({
    getRoute: utils.createRoute('MyJumpShow')
  }, utils);
  constants = constants;
  $ = () => null;
  $$ = () => [];
  componentDidMount() {}
  render() {
    const _this = this;
    return <React.Fragment>
        <View className='MyJumpShow__vw'>
          <View className='MyJumpShow__vw__vw'>
            <View className='MyJumpShow__vw__vw__vw'>
              <Text className='MyJumpShow__vw__vw__vw__tx'>标题</Text>
            </View>
            <View className='MyJumpShow__vw__vw__vw1'>
              <View className='MyJumpShow__vw__vw__vw1__vw'>
                <View className='MyJumpShow__vw__vw__vw1__vw__vw'>
                  <AtIcon color='#666' size={30} svg={ICONS["svg_wqa2kg"]} className='MyJumpShow__vw__vw__vw1__vw__vw__AtIcon' />
                  <Text className='MyJumpShow__vw__vw__vw1__vw__vw__tx1'>
                    我的礼物
                  </Text>
                </View>
                <View className='MyJumpShow__vw__vw__vw1__vw__vw1'>
                  <AtIcon color='#666' size={30} svg={ICONS["svg_16fpov"]} className='MyJumpShow__vw__vw__vw1__vw__vw1__AtIcon' />
                  <Text className='MyJumpShow__vw__vw__vw1__vw__vw1__tx1'>
                    我的兑换码
                  </Text>
                </View>
                <View className='MyJumpShow__vw__vw__vw1__vw__vw2'>
                  <AtIcon color='#666' size={30} svg={ICONS["svg_bs4rvr"]} className='MyJumpShow__vw__vw__vw1__vw__vw2__AtIcon' />
                  <Text className='MyJumpShow__vw__vw__vw1__vw__vw2__tx1'>
                    我的礼物
                  </Text>
                </View>
                <View className='MyJumpShow__vw__vw__vw1__vw__vw3'>
                  <AtIcon color='#666' size={30} svg={ICONS["svg_jhp1lv"]} className='MyJumpShow__vw__vw__vw1__vw__vw3__AtIcon' />
                  <Text className='MyJumpShow__vw__vw__vw1__vw__vw3__tx1'>
                    我的礼物
                  </Text>
                </View>
                <View className='MyJumpShow__vw__vw__vw1__vw__vw4'>
                  <AtIcon color='#666' size={30} svg={ICONS["svg_qeexzg"]} className='MyJumpShow__vw__vw__vw1__vw__vw4__AtIcon' />
                  <Text className='MyJumpShow__vw__vw__vw1__vw__vw4__tx1'>
                    我的礼物
                  </Text>
                </View>
                <View className='MyJumpShow__vw__vw__vw1__vw__vw5'>
                  <AtIcon color='#666' size={30} svg={ICONS["svg_0gvh1l"]} className='MyJumpShow__vw__vw__vw1__vw__vw5__AtIcon' />
                  <Text className='MyJumpShow__vw__vw__vw1__vw__vw5__tx1'>
                    我的礼物
                  </Text>
                </View>
                <View className='MyJumpShow__vw__vw__vw1__vw__vw6'>
                  <AtIcon color='#666' size={30} svg={ICONS["svg_yqpfr2"]} className='MyJumpShow__vw__vw__vw1__vw__vw6__AtIcon' />
                  <Text className='MyJumpShow__vw__vw__vw1__vw__vw6__tx1'>
                    我的礼物
                  </Text>
                </View>
                <View className='MyJumpShow__vw__vw__vw1__vw__vw7'>
                  <AtIcon color='#666' size={30} svg={ICONS["svg_8i6dcg"]} className='MyJumpShow__vw__vw__vw1__vw__vw7__AtIcon' />
                  <Text className='MyJumpShow__vw__vw__vw1__vw__vw7__tx1'>
                    我的礼物
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </React.Fragment>;
  }
}
export default MyJumpShow$Page;