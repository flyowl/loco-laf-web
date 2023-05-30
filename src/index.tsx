import { init, config } from '@alilc/lowcode-engine';
import { listBlocks, createBlock, getTreeblock } from './apis/block';
import registerPlugins from './universal/plugin';
import './universal/global.scss';
import { releasepreview, getPageSchemaData } from 'src/universal/utils';
import { releaseSaveSchema,getHisySchema,getOneSchema,DelOneSchema,getAssetForApp,tempSaveSchema,tempListSchema,tempDetailSchema,tempPubileSchema  } from 'src/apis/assets';
import { OneMenus,listMenus, listAppchoice } from 'src/apis/menu';
import {sys_menuList,low_schema_history_detail,low_schema_history_list,low_schema_history_delete,low_schema_history_detail_id
  ,low_typed_tree,low_block_create,
  low_schema_release,
} from 'src/apis/lafapi'
import { createAxiosFetchHandler } from 'src/plugins/axiosfatchhandler';
import Apphelp from 'src/utils/public';
import {GetEditInfo} from 'src/apis/localStorageInfo'
import {GetDictionary} from 'src/apis/localStorageInfo'

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
  config.set('documentApi', {
    url: GetEditInfo("editBookUrl")
  }),
    // 获取文档配置
    config.set('aiApi', {
      url: GetEditInfo("aiUrl")
    }),
  // 区块配置
  config.set('apiList', {
    block: {

      listBlocks,
      low_block_create,
      low_typed_tree,
    },
  }),
    // 发布API
    config.set('releaseApi', {
      block: {

        low_schema_release,
        tempSaveSchema,
        releasepreview,
        GetDictionary
      },
    }),
    config.set('pageApi', {
      block: {
        low_schema_history_detail,
        sys_menuList,
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
        'https://alifd.alicdn.com/npm/@alilc/lowcode-react-simulator-renderer@1.0.18/dist/css/react-simulator-renderer.css',
        'https://alifd.alicdn.com/npm/@alilc/lowcode-react-simulator-renderer@1.0.18/dist/js/react-simulator-renderer.js',
      ],
      requestHandlersMap: {
        fetch: createAxiosFetchHandler(),
      },
    },
    preference,
  );
})();
