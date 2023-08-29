import React from 'react';
import { Page, AtButton } from 'cross-ui';
import Test from "@/pages/components/Test";
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
class Test3$Page extends React.Component<any, any> {
  constructor(props, context) {
    super(props);
    this.state = {
      a: 'dsgfddfgfdgfd'
    };
  }
  utils = Object.assign({
    getRoute: utils.createRoute('test3')
  }, utils);
  constants = constants;
  $ = () => null;
  $$ = () => [];
  componentDidMount() {}
  render() {
    const _this = this;
    return <Page statusBarMode='light'>
        <Test aavfg={$eval(() => this.state.a)} />
        <AtButton type='primary' onClick={e => {
        this.setState({
          a: 'dgdfg'
        });
      }}>
          按钮文字
        </AtButton>
      </Page>;
  }
}
export default Test3$Page;