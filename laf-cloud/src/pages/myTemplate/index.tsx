import React from 'react';
import { Page, View } from 'cross-ui';
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
class MyTemplate$Page extends React.Component<any, any> {
  constructor(props, context) {
    super(props);
    this.state = {};
  }
  utils = Object.assign({
    getRoute: utils.createRoute('myTemplate')
  }, utils);
  constants = constants;
  $ = () => null;
  $$ = () => [];
  componentDidMount() {}
  render() {
    const _this = this;
    return <Page statusBarMode='light'>
        <View />
      </Page>;
  }
}
export default MyTemplate$Page;