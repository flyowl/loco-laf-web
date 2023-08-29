import React from 'react';
import { View, AtAvatar, Text } from 'cross-ui';
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
class AllCoursesCont$Page extends React.Component<any, any> {
  constructor(props, context) {
    super(props);
    this.state = {};
  }
  utils = Object.assign({
    getRoute: utils.createRoute('AllCoursesCont')
  }, utils);
  constants = constants;
  $ = () => null;
  $$ = () => [];
  componentDidMount() {}
  render() {
    const _this = this;
    return <React.Fragment>
        <View className='AllCoursesCont__vw'>
          <View className='AllCoursesCont__vw__vw'>
            <View className='AllCoursesCont__vw__vw__vw'>
              <View style={{}}>
                <AtAvatar size='large' circle={false} image='https://file.mengti.cc/Fha81BNay1CC1uLSuC1A_sgSyHAJ' />
              </View>
              <View className='AllCoursesCont__vw__vw__vw__vw1 M-flex-item'>
                <Text className='AllCoursesCont__vw__vw__vw__vw1__tx'>
                  4156
                </Text>
                <Text className='AllCoursesCont__vw__vw__vw__vw1__tx1'>
                  文本
                </Text>
              </View>
            </View>
            <View className='AllCoursesCont__vw__vw__vw1'>
              <View style={{}}>
                <AtAvatar size='large' circle={false} image='https://file.mengti.cc/Fha81BNay1CC1uLSuC1A_sgSyHAJ' />
              </View>
              <View className='AllCoursesCont__vw__vw__vw1__vw1 M-flex-item'>
                <Text className='AllCoursesCont__vw__vw__vw1__vw1__tx'>
                  4156
                </Text>
                <Text className='AllCoursesCont__vw__vw__vw1__vw1__tx1'>
                  文本
                </Text>
              </View>
            </View>
            <View className='AllCoursesCont__vw__vw__vw2'>
              <View style={{}}>
                <AtAvatar size='large' circle={false} image='https://file.mengti.cc/Fha81BNay1CC1uLSuC1A_sgSyHAJ' />
              </View>
              <View className='AllCoursesCont__vw__vw__vw2__vw1 M-flex-item'>
                <Text className='AllCoursesCont__vw__vw__vw2__vw1__tx'>
                  4156
                </Text>
                <Text className='AllCoursesCont__vw__vw__vw2__vw1__tx1'>
                  文本
                </Text>
              </View>
            </View>
          </View>
        </View>
      </React.Fragment>;
  }
}
export default AllCoursesCont$Page;