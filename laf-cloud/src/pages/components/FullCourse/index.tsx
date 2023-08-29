import React from 'react';
import { HeaderBar, View } from 'cross-ui';
import AllCoursesTab from "@/pages/components/AllCoursesTab";
import AllCoursesCont from "@/pages/components/AllCoursesCont";
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
class FullCourse$Page extends React.Component<any, any> {
  constructor(props, context) {
    super(props);
    this.state = {};
  }
  utils = Object.assign({
    getRoute: utils.createRoute('FullCourse')
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
        <HeaderBar backgroundColor='#ffffff' mode='light' showBack={true} title='全部课程' titleAlign='center' translucent={false} ref={this._refsManager.linkRef('headerbar-619bf99a')} className='FullCourse__HeaderBar' />
        <View className='FullCourse__vw1'>
          <View className='FullCourse__vw1__vw'>
            <View className='FullCourse__vw1__vw__vw'>
              <AllCoursesTab title='' />
            </View>
            <View className='FullCourse__vw1__vw__vw1 M-flex-item'>
              <AllCoursesCont title='' />
            </View>
          </View>
        </View>
      </React.Fragment>;
  }
}
export default FullCourse$Page;