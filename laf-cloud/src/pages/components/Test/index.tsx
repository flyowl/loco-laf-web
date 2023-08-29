import React from 'react';
import { Text, AtButton, View } from 'cross-ui';
import ScrollBar from "@/pages/components/ScrollBar";
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
class Test$Page extends React.Component<any, any> {
  constructor(props, context) {
    super(props);
    this.state = {
      ffvcxv: '东西GV对方'
    };
  }
  utils = Object.assign({
    getRoute: utils.createRoute('Test')
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
        <Text ref={this._refsManager.linkRef('text-609d1747')} className='Test__test__tx'>
          {$eval(() => this.props?.test)}
        </Text>
        <AtButton type='primary' onClick={e => {
        this.utils.showLoading({
          title: '',
          mask: true
        });
        setTimeout(() => {
          this.utils.hideLoading();
        }, 2000);
      }} ref={this._refsManager.linkRef('atbutton-b7a03bb5')}>
          按钮文字
        </AtButton>
        <View onClick={e => {
        this.utils.chooseImage({
          success: res => {
            const tempFilePaths = res.tempFilePaths;
            this.utils.uploadFile({
              url: 'https://gvfh2x.flyowl.com.cn/upload-file',
              //仅为示例，非真实的接口地址
              filePath: tempFilePaths[0],
              name: 'file',
              withCredentials: false,
              header: {
                Authorization: this.constants.Authorization
              },
              formData: {
                user: 'test'
              },
              success: res => {
                const data = res.data;
                //do something
              }
            });
          }
        });
      }}>
          <Text className='Test__tx'>上传</Text>
        </View>
        <Text className='Test__test__tx3'>
          {$eval(() => this.state.ffvcxv)}
        </Text>
        <ScrollBar />
      </React.Fragment>;
  }
}
export default Test$Page;