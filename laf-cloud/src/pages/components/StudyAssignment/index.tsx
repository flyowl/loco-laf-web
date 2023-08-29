import ICONS from "./icons";
import React from 'react';
import { View, Text, Textarea, AtIcon, AtButton } from 'cross-ui';
import { requestHandle } from '@/utils/dataSource';
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
class StudyAssignment$Page extends React.Component<any, any> {
  _dataSourceConfig = this._defineDataSourceConfig();
  _dataSourceEngine = utils.dataSource(this._dataSourceConfig, this, {
    runtimeConfig: true,
    requestHandlersMap: {
      fetch: requestHandle()
    }
  });
  get dataSourceMap() {
    return this._dataSourceEngine.dataSourceMap || {};
  }
  reloadDataSource = async () => {
    await this._dataSourceEngine.reloadDataSource();
  };
  constructor(props, context) {
    super(props);
    this.state = {
      showbutton: true,
      fraction: 0
    };
  }
  utils = Object.assign({
    getRoute: utils.createRoute('StudyAssignment')
  }, utils);
  constants = constants;
  _refsManager = new RefsManager();
  $ = refName => {
    return this._refsManager.get(refName);
  };
  $$ = refName => {
    return this._refsManager.getAll(refName);
  };
  _defineDataSourceConfig() {
    const _this = this;
    return {
      list: [{
        id: 'savedata',
        isInit: function () {
          return false;
        },
        isSync: false,
        type: 'fetch',
        options: function () {
          return {
            uri: _this.constants.url + '/video_assignment_detail',
            contentType: 'JSON',
            method: 'POST',
            isCors: true,
            params: {
              timeClassId: _this.props?.timeClassId,
              classId: _this.props?.classId,
              taskLog: JSON.stringify(_this.props?.task),
              fraction: _this.state.fraction,
              vid_status: _this.props?.vid_status
            },
            headers: {}
          };
        },
        willFetch: function willFetch(options) {
          return options;
        },
        dataHandler: function dataHandler(res) {
          _this.setState({
            issave: false
          });
          return res.data;
        }
      }]
    };
  }
  acquisitionState = () => {
    if (this.props?.current_tab == 0) {
      return true;
    }
    return false;
  };
  timeProcessing = () => {
    return this.props?.endTime ? `${this.props?.startTime}-${this.props?.endTime}` : `${this.props?.startTime}`;
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
  buttonClickOperation = index => {
    // if (this.props?.task[index].type == 0) {

    //   if (this.props?.task[index].cont.length < 1) {
    //     this.utils.showToast({
    //       title: '请先填写内容',
    //       icon: 'success',
    //       duration: 2000
    //     })
    //     return
    //   }

    // }

    //处理分数
    if (this.props?.task[index].isok) {
      // console.log(this.props?.task[index].fraction, this.state.fraction)

      let a = parseInt(this.state.fraction) - parseInt(this.props?.task[index].fraction); // 修改副本中的对象属性值

      this.setState({
        fraction: a
      }); // 更新状态变量
    } else {
      let a = parseInt(this.state.fraction) + parseInt(this.props?.task[index].fraction); // 修改副本中的对象属性值

      this.setState({
        fraction: a
      }); // 更新状态变量
    }

    // 验证
    const newArray = this.props?.task; // 创建数组副本

    newArray[index].isok = !this.props?.task[index].isok; // 修改副本中的对象属性值

    this.setState({
      task: newArray
    }); // 更新状态变量
  };

  componentDidMount() {
    this._dataSourceEngine.reloadDataSource();
    console.log(this.props?.issave, this.props?.fraction);
    this.setState({
      showbutton: this.props?.issave,
      fraction: this.props?.fraction
    });
    if (this.props?.issave) {
      if (this.props?.fraction > 0) {
        // 验证
        const newArray = this.props?.task; // 创建数组副本

        const data = newArray?.map(item => {
          if (item.type == 2) {
            item.isok = true;
          }
          return item;
          // 在这里处理每个数组元素
        });

        this.setState({
          task: data
        }); // 更新状态变量
      }
    }
  }

  render() {
    const _this = this;
    return <React.Fragment fill={false}>
        <View ref={this._refsManager.linkRef('view-3a321475')} className='StudyAssignment__vw'>
          <Text className='StudyAssignment__vw__tx'>
            {$eval(() => this.props?.endTime ? `${this.props?.startTime.slice(0, 10)}-${this.props?.endTime.slice(0, 10)}` : `${this.props?.startTime.slice(0, 10)}`)}
          </Text>
          {!!$eval(() => this.props?.task) && <Text ref={this._refsManager.linkRef('text-32c98ea4')} className='StudyAssignment__vw__tx1'>
              {$eval(() => `共计${this.state.fraction}分`)}
            </Text>}
        </View>
        {$evalArray(() => this.props?.task || []).map((item, index) => (_this => <View ref={this._refsManager.linkRef('view-24e9997f')}>
              <View ref={this._refsManager.linkRef('view-a881a8cf')} className='StudyAssignment__vw_1'>
                <Text ref={this._refsManager.linkRef('text-e7f5e22d')} className='StudyAssignment__vw_1__tx'>
                  {$eval(() => item?.title)}
                </Text>
                {!!$eval(() => item?.type == 1) && <Text space='emsp' ref={this._refsManager.linkRef('text-6716196f')} className='StudyAssignment__vw_1__tx1'>
                    {$eval(() => item?.cont)}
                  </Text>}
                {!!$eval(() => item?.type == 0) && <Textarea value={$eval(() => item?.cont)} placeholder='请输入内容' placeholderStyle={{
            padding: px(20)
          }} autoHeight={true} ref={this._refsManager.linkRef('textarea-a8986652')} onBlur={value => {
            // console.log("jinlai", this.index)

            const newArray = _this.props?.task; // 创建数组副本
            // console.log("-1-1",index, newArray[index], newArray[index].cont)

            newArray[index].cont = value.detail.value;
            if (!newArray[index].isok) {
              if (value.detail.value.length > 1) {
                let a = parseInt(_this.state.fraction) + parseInt(_this.props?.task[index].fraction); // 修改副本中的对象属性值
                _this.setState({
                  fraction: a
                }); // 更新状态变量
                newArray[index].isok = true;
              }
            } else {
              if (value.detail.value.length < 1) {
                let a = parseInt(_this.state.fraction) - parseInt(_this.props?.task[index].fraction); // 修改副本中的对象属性值
                _this.setState({
                  fraction: a
                }); // 更新状态变量

                newArray[index].isok = false;
              }
            }
            _this.setState({
              task: newArray
            }); // 更新状态变量

            console.log(_this.props?.task);
          }} className='StudyAssignment__vw_1__Textarea2' />}
                <View ref={this._refsManager.linkRef('view-f4ca69a9')} className='StudyAssignment__vw_1__vw3'>
                  <View ref={this._refsManager.linkRef('view-a5af5863')} className='StudyAssignment__vw_1__vw3__vw M-flex-item'>
                    {!!$eval(() => item?.isok) && <View ref={this._refsManager.linkRef('view-cb44df36')} className='StudyAssignment__vw_1__vw3__vw__vw'>
                        <AtIcon color='#fc0606' size={20} svg={ICONS["svg_kpgz6z"]} />
                        <AtIcon color='#fc0606' size={20} svg={ICONS["svg_3xdv72"]} ref={this._refsManager.linkRef('aticon-90f034e4')} />
                      </View>}
                    {!!$eval(() => !item?.isok) && <View ref={this._refsManager.linkRef('view-eed6236e')} className='StudyAssignment__vw_1__vw3__vw__vw1'>
                        <AtIcon color='#eaa9a9' size={20} svg={ICONS["svg_dpivbe"]} ref={this._refsManager.linkRef('aticon-0f3cf804')} />
                        <AtIcon color='#eaa9a9' size={20} svg={ICONS["svg_279b49"]} ref={this._refsManager.linkRef('aticon-13fbbe46')} />
                      </View>}
                    <Text ref={this._refsManager.linkRef('text-75c7c134')} className='StudyAssignment__vw_1__vw3__vw__tx2'>
                      +
                    </Text>
                    <Text ref={this._refsManager.linkRef('text-4663c35b')} className='StudyAssignment__vw_1__vw3__vw__tx3'>
                      {$eval(() => item?.fraction)}
                    </Text>
                    <Text ref={this._refsManager.linkRef('text-f7ac3a00')} className='StudyAssignment__vw_1__vw3__vw__tx4'>
                      分
                    </Text>
                  </View>
                  {!!$eval(() => _this.props?.task[index].type == 1) && <View inlineStyle={[{
              enable: $eval(() => item?.isok),
              name: '动态样式1',
              style: {
                backgroundColor: '#fc0423'
              }
            }]} ref={this._refsManager.linkRef('view-47fc30f2')} onClick={e => {
              _this.buttonClickOperation(index);

              // if (this.props?.task[this.index].isok) {
              //   console.log(this.props?.task[this.index].fraction, this.state.fraction)

              //   let a = parseInt(this.state.fraction) - parseInt(this.props?.task[this.index].fraction); // 修改副本中的对象属性值

              //   console.log("--", a)
              //   this.setState({ fraction: a }); // 更新状态变量

              // } else {
              //   console.log(this.props?.task[this.index].fraction)
              //   let a = parseInt(this.state.fraction) + parseInt(this.props?.task[this.index].fraction); // 修改副本中的对象属性值

              //   console.log("--", a)

              //   this.setState({ fraction: a }); // 更新状态变量
              // }

              // const newArray = this.props?.task // 创建数组副本

              // newArray[this.index].isok = !this.props?.task[this.index].isok; // 修改副本中的对象属性值

              // this.setState({ task: newArray }); // 更新状态变量
            }} className='StudyAssignment__vw_1__vw3__vw1'>
                      <Text inlineStyle={[{
                enable: $eval(() => _this.props?.current_tab == 1),
                name: '动态样式1',
                style: {
                  color: '#ffffff'
                }
              }]} ref={this._refsManager.linkRef('text-11253ccc')} className='StudyAssignment__vw_1__vw3__vw1__tx'>
                        {$eval(() => item?.isok ? '已完成' : '未完成')}
                      </Text>
                    </View>}
                </View>
              </View>
            </View>)($createChildContext(_this, {
        item,
        index
      })))}
        {!!$eval(() => this.props?.current_tab == 0 & this.props?.issave & this.state.showbutton) && <View ref={this._refsManager.linkRef('view-1935a688')}>
            {!!$eval(() => this.props?.current_tab === 0) && <AtButton size='small' type='primary' onClick={e => {
          this.dataSourceMap['savedata']?.load();
          this.props?.current_tab == 1;
          this.setState({
            showbutton: false
          });
        }} ref={this._refsManager.linkRef('atbutton-a3593316')}>
                保存
              </AtButton>}
          </View>}
      </React.Fragment>;
  }
}
export default StudyAssignment$Page;