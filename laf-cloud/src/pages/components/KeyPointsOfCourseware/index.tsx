import React from 'react';
import { ScrollView, RichText } from 'cross-ui';
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
class KeyPointsOfCourseware$Page extends React.Component<any, any> {
  constructor(props, context) {
    super(props);
    this.state = {};
  }
  utils = Object.assign({
    getRoute: utils.createRoute('KeyPointsOfCourseware')
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
        <ScrollView ref={this._refsManager.linkRef('scrollview')} className='KeyPointsOfCourseware__sv'>
          <RichText nodes={$eval(() => this.props?.content || '文件显示')} className='KeyPointsOfCourseware__sv__RichText' />
        </ScrollView>
      </React.Fragment>;
  }
}
export default KeyPointsOfCourseware$Page;