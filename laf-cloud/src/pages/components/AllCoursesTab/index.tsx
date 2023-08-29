import React from 'react';
import { View, Text } from 'cross-ui';
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
class AllCoursesTab$Page extends React.Component<any, any> {
  constructor(props, context) {
    super(props);
    this.state = {
      list: ['战略领导力', '阳明心学', '道德经', '百日经典', '管理经典', '家庭课程'],
      select: 0
    };
  }
  utils = Object.assign({
    getRoute: utils.createRoute('AllCoursesTab')
  }, utils);
  constants = constants;
  _refsManager = new RefsManager();
  $ = refName => {
    return this._refsManager.get(refName);
  };
  $$ = refName => {
    return this._refsManager.getAll(refName);
  };
  setStateValue = (e, {
    field,
    valueField,
    indexs
  }, cb) => {
    const state = {
      ...this.state
    };
    let value = e;
    if (valueField) {
      value = valueField.split('.').reduce((obj, key) => obj && obj[key], e);
    }
    const _field = indexs?.length > 0 ? field.replace(/\.\[\]/g, match => `[${indexs.shift()}].`).replace('.[item]', '') : field;
    this.utils.setValue(state, _field, value);
    this.setState(state, cb);
  };
  componentDidMount() {}
  render() {
    const _this = this;
    return <React.Fragment>
        <View ref={this._refsManager.linkRef('view-a933b8b5')} className='AllCoursesTab__vw'>
          {$evalArray(() => this.state.list).map((item, index) => (_this => <View ref={this._refsManager.linkRef('view-45992cab')} onClick={e => {
          _this.setStateValue(index, {
            field: 'select'
          });
        }} inlineStyle={[{
          enable: $eval(() => index == _this.state.select),
          name: '动态样式1',
          style: {
            backgroundColor: '#fbfbfb'
          }
        }]}>
                <Text ref={this._refsManager.linkRef('text-4eb7bbc9')} inlineStyle={[{
            enable: $eval(() => index == _this.state.select),
            name: '动态样式1',
            style: {
              color: '#e71013'
            }
          }]} className='AllCoursesTab__tx'>
                  {$eval(() => item)}
                </Text>
              </View>)($createChildContext(_this, {
          item,
          index
        })))}
        </View>
      </React.Fragment>;
  }
}
export default AllCoursesTab$Page;