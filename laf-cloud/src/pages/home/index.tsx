import React from 'react';
import { Page, TabView, View } from 'cross-ui';
import HomePage from "@/pages/components/HomePage";
import Study from "@/pages/components/Study";
import Mine from "@/pages/components/Mine";
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
class Home$Page extends React.Component<any, any> {
  constructor(props, context) {
    super(props);
    this.state = {
      newLiveBroadcast: [{
        title: '直播',
        time: ' · 07月09日 19:00',
        list: [{
          url: 'https://img1.baidu.com/it/u=3539595421,754041626&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500',
          title: '阳明心学',
          content: '毕业歌',
          num: '155人观看',
          state: 0,
          btnname: '预告'
        }]
      }, {
        title: '直播回放',
        time: '',
        list: [{
          url: 'https://img1.baidu.com/it/u=3539595421,754041626&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500',
          title: '战略',
          content: '毕业歌',
          num: '155人观看',
          state: 0,
          btnname: '回放'
        }]
      }],
      Todayscourse: [{
        url: 'https://img1.baidu.com/it/u=413643897,2296924942&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1689094800&t=cc8963e21cd3fa158054defdd2b8e3a2',
        title: '标题',
        cont: 'fdafdafdsafdasf'
      }],
      newrelease: {
        titles: '最新发布',
        list: [{
          url: 'https://img2.baidu.com/it/u=638285213,1746517464&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1689094800&t=3959cff90b7aecab3ef95f7c862b94b7',
          title: '道领导力',
          cont: 'fdafadfdasfvdskafdafdas'
        }, {
          url: 'https://img2.baidu.com/it/u=638285213,1746517464&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1689094800&t=3959cff90b7aecab3ef95f7c862b94b7',
          title: '道领导力',
          cont: 'fdafadfdasfvdskafdafdas'
        }]
      },
      classicCourses: {
        titles: '经典课程',
        urllist: [{
          url: 'https://img2.baidu.com/it/u=2537370952,3446004972&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1689094800&t=c3a3ce68a828707f2bf4aa8e49ac2e34',
          href: ''
        }, {
          url: 'https://img2.baidu.com/it/u=2537370952,3446004972&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1689094800&t=c3a3ce68a828707f2bf4aa8e49ac2e34',
          href: ''
        }]
      },
      recommend: [{
        url: 'https://img1.baidu.com/it/u=413643897,2296924942&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1689094800&t=cc8963e21cd3fa158054defdd2b8e3a2',
        title: '标题1',
        cont: 'fdafdafdsafdasf'
      }, {
        url: 'https://img1.baidu.com/it/u=413643897,2296924942&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1689094800&t=cc8963e21cd3fa158054defdd2b8e3a2',
        title: '标题2',
        cont: 'fdafdafdsafdasf'
      }]
    };
  }
  utils = Object.assign({
    getRoute: utils.createRoute('home')
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
    return <Page keyboard={false} absolute={true} statusBarMode='light' backgroundImage='' className='home_page'>
        <TabView list={[{
        text: '首页',
        name: 'home',
        width: 24,
        height: 24,
        view: <HomePage title='' ref={this._refsManager.linkRef('homepage-9b7602d6')} />,
        iconPath: 'https://file.mengti.cc/FtBhQcKWP1SK3Ef0C-zg2t9MJGgw',
        selectedIconPath: 'https://file.mengti.cc/FnzgyFi5BiedA6oZx-Fajl6M_H8J'
      }, {
        text: '学习',
        name: 'study',
        width: 24,
        height: 24,
        view: <Study title='' ref={this._refsManager.linkRef('study-5d63726f')} />,
        iconPath: 'https://file.mengti.cc/FkD_M6JKxD5Iy0YyLgmVEPsgIHvw',
        selectedIconPath: 'https://file.mengti.cc/FnxetoQ2KE_DqFV4UZq_EDj4g3PE'
      }, {
        text: '我的',
        name: 'my',
        width: 24,
        height: 24,
        view: <View style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#ffffff'
        }} ref={this._refsManager.linkRef('view-7b56d7e6')}>
                  <Mine title='' ref={this._refsManager.linkRef('mine-4f2a605e')} />
                </View>,
        iconPath: 'https://file.mengti.cc/FtfSO3ZpDQND3cJcHaEx46KPdN69',
        selectedIconPath: 'https://file.mengti.cc/FmRAquM0RW0REH2du3840DKphUJq'
      }]} color='#666' selectedColor='#0ebd8d' ref={this._refsManager.linkRef('tabview-41b57228')} className='home_page__TabView' />
      </Page>;
  }
}
export default Home$Page;