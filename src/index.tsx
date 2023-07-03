import { init, config } from '@alilc/lowcode-engine';
import registerPlugins from './universal/plugin';
import './universal/global.scss';
import DataSourcePanePlugin from 'src/plugins/plugin-datasource-pane';

import { releasepreview } from 'src/universal/utils';
import { tempListSchema, tempDetailSchema, tempPubileSchema } from 'src/apis/assets';
import {
  sys_menuList_edit, low_schema_history_detail, low_schema_history_list, low_schema_history_delete, low_schema_history_detail_id
  , low_typed_tree, low_block_create,
  low_schema_release, low_block_search
} from 'src/apis/lafapi'
import { createAxiosFetchHandler } from 'src/plugins/axiosfatchhandler';
import Apphelp from 'src/utils/public';
// import {GetEditInfo} from 'src/apis/localStorageInfo'
import { GetDictionary } from 'src/apis/localStorageInfo'

const preference = new Map();
preference.set('DataSourcePane', {
  importPlugins: [],
  dataSourceTypes: [
    {
      type: 'fetch',
    },
    {
      type: 'jsonp',
    },
  ],
});
function setupConfig() {
  // 获取文档配置
  // config.set('documentApi', {
  //   url: GetEditInfo("editBookUrl")
  // }),
  //   // 获取文档配置
  //   config.set('aiApi', {
  //     url: GetEditInfo("aiUrl")
  //   }),
  // 区块配置
  config.set('apiList', {
    block: {
      low_block_search,

      low_block_create,
      low_typed_tree,
    },
  }),
    // 发布API
    config.set('releaseApi', {
      block: {

        low_schema_release,
        releasepreview,
      },
    }),
    config.set('pageApi', {
      block: {
        low_schema_history_detail,
        sys_menuList_edit,
        DataSourcePanePlugin
      },
    });
  // 发布API
  config.set('historyApi', {
    block: {
      low_schema_history_list,
      low_schema_history_detail_id,
      low_schema_history_delete
    },
  });
  config.set('templateApi', {
    block: {
      tempListSchema,
      tempDetailSchema,
      tempPubileSchema
    },
  });
}



(async function main() {
  setupConfig()
  await registerPlugins();

  init(
    document.getElementById('lce-container')!,
    {
      // designMode: 'live',
      // locale: 'zh-CN',
      enableCondition: true,
      enableCanvasLock: true,
      // 默认绑定变量
      supportVariableGlobally: true,
      appHelper: Apphelp,
      // simulatorUrl 在当 engine-core.js 同一个父路径下时是不需要配置的！！！
      // 这里因为用的是 alifd cdn，在不同 npm 包，engine-core.js 和 react-simulator-renderer.js 是不同路径
      simulatorUrl: [
        'https://alifd.alicdn.com/npm/@alilc/lowcode-react-simulator-renderer@1.1.8-beta.4/dist/css/react-simulator-renderer.css',
        'https://alifd.alicdn.com/npm/@alilc/lowcode-react-simulator-renderer@1.1.8-beta.4/dist/js/react-simulator-renderer.js',
      ],
      requestHandlersMap: {
        fetch: createAxiosFetchHandler(),
      },
    },
    preference,
  );
})();
