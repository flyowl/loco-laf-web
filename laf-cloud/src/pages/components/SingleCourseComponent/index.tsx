import React from 'react';
import { View, Image, Text } from 'cross-ui';
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
class SingleCourseComponent$Page extends React.Component<any, any> {
  constructor(props, context) {
    super(props);
    this.state = {};
  }
  utils = Object.assign({
    getRoute: utils.createRoute('SingleCourseComponent')
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
    return <React.Fragment fill={true}>
        <View ref={this._refsManager.linkRef('view-0e81178e')} onClick={e => {
        this.utils.navigateTo('courseDetailsPage', {
          query: {
            _id: this.props?.course?.course?._id // 跳转时会在 pages/xxx/xxx?id=1
          },

          params: {
            item: {},
            // 可传递JS变量
            onXXX: val => {} // 可传递回调函数 页面中可使用this.utils.getRoute()?.params?.onXXX?.(回传数据)
          }
        });
      }} className='SingleCourseComponent__vw'>
          <View className='SingleCourseComponent__vw__vw'>
            <Image src={$eval(() => this.props?.course?.course?.cover)} remote={false} fit={false} className='SingleCourseComponent__vw__vw__Image' />
          </View>
          <View ref={this._refsManager.linkRef('view-2e305029')} className='SingleCourseComponent__vw__vw1 M-flex-item'>
            <Text className='SingleCourseComponent__vw__vw1__tx'>
              {$eval(() => this.props?.course?.course?.title || '标题')}
            </Text>
            <Text numberOfLines={2} className='SingleCourseComponent__vw__vw1__tx1'>
              {$eval(() => this.props?.course?.course.description || '测试')}
            </Text>
          </View>
        </View>
      </React.Fragment>;
  }
}
export default SingleCourseComponent$Page;