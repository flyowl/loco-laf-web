import React from 'react';
import { ScrollView, View, Text } from 'cross-ui';
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
class InteractiveCommunication$Page extends React.Component<any, any> {
  constructor(props, context) {
    super(props);
    this.state = {};
  }
  utils = Object.assign({
    getRoute: utils.createRoute('InteractiveCommunication')
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
        <ScrollView ref={this._refsManager.linkRef('scrollview')} scrollY={true} showScrollbar={false} enableBackToTop={true}>
          <View className='InteractiveCommunication__vw'>
            <View className='InteractiveCommunication__vw__vw M-flex-item'>
              <Text className='InteractiveCommunication__vw__vw__tx'>
                t涛涛：
              </Text>
            </View>
            <View className='InteractiveCommunication__vw__vw1'>
              <Text className='InteractiveCommunication__vw__vw1__tx'>
                源祖国越来越好
              </Text>
            </View>
          </View>
          <View className='InteractiveCommunication__vw1'>
            <View className='InteractiveCommunication__vw1__vw M-flex-item'>
              <Text className='InteractiveCommunication__vw1__vw__tx'>
                t涛涛：
              </Text>
            </View>
            <View className='InteractiveCommunication__vw1__vw1'>
              <Text className='InteractiveCommunication__vw1__vw1__tx'>
                源祖国越来越好
              </Text>
            </View>
          </View>
          <View className='InteractiveCommunication__vw2'>
            <View className='InteractiveCommunication__vw2__vw M-flex-item'>
              <Text className='InteractiveCommunication__vw2__vw__tx'>
                t涛涛：
              </Text>
            </View>
            <View className='InteractiveCommunication__vw2__vw1'>
              <Text className='InteractiveCommunication__vw2__vw1__tx'>
                源祖国越来越好
              </Text>
            </View>
          </View>
          <View className='InteractiveCommunication__vw3'>
            <View className='InteractiveCommunication__vw3__vw M-flex-item'>
              <Text className='InteractiveCommunication__vw3__vw__tx'>
                t涛涛：
              </Text>
            </View>
            <View className='InteractiveCommunication__vw3__vw1'>
              <Text className='InteractiveCommunication__vw3__vw1__tx'>
                源祖国越来越好
              </Text>
            </View>
          </View>
          <View className='InteractiveCommunication__vw4'>
            <View className='InteractiveCommunication__vw4__vw M-flex-item'>
              <Text className='InteractiveCommunication__vw4__vw__tx'>
                t涛涛：
              </Text>
            </View>
            <View className='InteractiveCommunication__vw4__vw1'>
              <Text className='InteractiveCommunication__vw4__vw1__tx'>
                源祖国越来越好
              </Text>
            </View>
          </View>
          <View className='InteractiveCommunication__vw5'>
            <View className='InteractiveCommunication__vw5__vw M-flex-item'>
              <Text className='InteractiveCommunication__vw5__vw__tx'>
                t涛涛：
              </Text>
            </View>
            <View className='InteractiveCommunication__vw5__vw1'>
              <Text className='InteractiveCommunication__vw5__vw1__tx'>
                源祖国越来越好
              </Text>
            </View>
          </View>
          <View className='InteractiveCommunication__vw6'>
            <View className='InteractiveCommunication__vw6__vw M-flex-item'>
              <Text className='InteractiveCommunication__vw6__vw__tx'>
                t涛涛：
              </Text>
            </View>
            <View className='InteractiveCommunication__vw6__vw1'>
              <Text className='InteractiveCommunication__vw6__vw1__tx'>
                源祖国越来越好
              </Text>
            </View>
          </View>
          <View className='InteractiveCommunication__vw7'>
            <View className='InteractiveCommunication__vw7__vw M-flex-item'>
              <Text className='InteractiveCommunication__vw7__vw__tx'>
                t涛涛：
              </Text>
            </View>
            <View className='InteractiveCommunication__vw7__vw1'>
              <Text className='InteractiveCommunication__vw7__vw1__tx'>
                源祖国越来越好
              </Text>
            </View>
          </View>
          <View className='InteractiveCommunication__vw8'>
            <View className='InteractiveCommunication__vw8__vw M-flex-item'>
              <Text className='InteractiveCommunication__vw8__vw__tx'>
                t涛涛：
              </Text>
            </View>
            <View className='InteractiveCommunication__vw8__vw1'>
              <Text className='InteractiveCommunication__vw8__vw1__tx'>
                源祖国越来越好
              </Text>
            </View>
          </View>
          <View className='InteractiveCommunication__vw9'>
            <View className='InteractiveCommunication__vw9__vw M-flex-item'>
              <Text className='InteractiveCommunication__vw9__vw__tx'>
                t涛涛：
              </Text>
            </View>
            <View className='InteractiveCommunication__vw9__vw1'>
              <Text className='InteractiveCommunication__vw9__vw1__tx'>
                源祖国越来越好
              </Text>
            </View>
          </View>
          <View className='InteractiveCommunication__vw10'>
            <View className='InteractiveCommunication__vw10__vw M-flex-item'>
              <Text className='InteractiveCommunication__vw10__vw__tx'>
                t涛涛：
              </Text>
            </View>
            <View className='InteractiveCommunication__vw10__vw1'>
              <Text className='InteractiveCommunication__vw10__vw1__tx'>
                源祖国越来越好
              </Text>
            </View>
          </View>
          <View className='InteractiveCommunication__vw11'>
            <View className='InteractiveCommunication__vw11__vw M-flex-item'>
              <Text className='InteractiveCommunication__vw11__vw__tx'>
                t涛涛：
              </Text>
            </View>
            <View className='InteractiveCommunication__vw11__vw1'>
              <Text className='InteractiveCommunication__vw11__vw1__tx'>
                源祖国越来越好
              </Text>
            </View>
          </View>
          <View className='InteractiveCommunication__vw12'>
            <View className='InteractiveCommunication__vw12__vw M-flex-item'>
              <Text className='InteractiveCommunication__vw12__vw__tx'>
                t涛涛：
              </Text>
            </View>
            <View className='InteractiveCommunication__vw12__vw1'>
              <Text className='InteractiveCommunication__vw12__vw1__tx'>
                源祖国越来越好
              </Text>
            </View>
          </View>
          <View className='InteractiveCommunication__vw13'>
            <View className='InteractiveCommunication__vw13__vw M-flex-item'>
              <Text className='InteractiveCommunication__vw13__vw__tx'>
                t涛涛：
              </Text>
            </View>
            <View className='InteractiveCommunication__vw13__vw1'>
              <Text className='InteractiveCommunication__vw13__vw1__tx'>
                源祖国越来越好
              </Text>
            </View>
          </View>
          <View className='InteractiveCommunication__vw14'>
            <View className='InteractiveCommunication__vw14__vw M-flex-item'>
              <Text className='InteractiveCommunication__vw14__vw__tx'>
                t涛涛：
              </Text>
            </View>
            <View className='InteractiveCommunication__vw14__vw1'>
              <Text className='InteractiveCommunication__vw14__vw1__tx'>
                源祖国越来越好
              </Text>
            </View>
          </View>
          <View className='InteractiveCommunication__vw15'>
            <View className='InteractiveCommunication__vw15__vw M-flex-item'>
              <Text className='InteractiveCommunication__vw15__vw__tx'>
                t涛涛：
              </Text>
            </View>
            <View className='InteractiveCommunication__vw15__vw1'>
              <Text className='InteractiveCommunication__vw15__vw1__tx'>
                源祖国越来越好
              </Text>
            </View>
          </View>
          <View className='InteractiveCommunication__vw16'>
            <View className='InteractiveCommunication__vw16__vw M-flex-item'>
              <Text className='InteractiveCommunication__vw16__vw__tx'>
                t涛涛：
              </Text>
            </View>
            <View className='InteractiveCommunication__vw16__vw1'>
              <Text className='InteractiveCommunication__vw16__vw1__tx'>
                源祖国越来越好
              </Text>
            </View>
          </View>
          <View className='InteractiveCommunication__vw17'>
            <View className='InteractiveCommunication__vw17__vw M-flex-item'>
              <Text className='InteractiveCommunication__vw17__vw__tx'>
                t涛涛：
              </Text>
            </View>
            <View className='InteractiveCommunication__vw17__vw1'>
              <Text className='InteractiveCommunication__vw17__vw1__tx'>
                源祖国越来越好
              </Text>
            </View>
          </View>
        </ScrollView>
      </React.Fragment>;
  }
}
export default InteractiveCommunication$Page;