import service from './request'
import { config, project } from '@alilc/lowcode-engine';
import { openNotification } from 'src/utils/index'
import { ClearToken } from './localStorageInfo';

import { TransformStage } from '@alilc/lowcode-types';

import {GetEditInfo} from './localStorageInfo';




// 通过菜单ID获取schema
// {menu_id:xxx,id:xxx}
export const low_schemaDetail = async (data: any) => {
  const url = `/lowcode/low_schema_detail`;
  // const res = await service.get(url);
  const res = await service(
    {
      url: url,
      method: 'get',
      params: data
    }
  )
  // if (!data.menu_id) {
  //   const data = JSON.parse(res.data.schema)
  //   return data.componentsTree[0];
  // }
  return res.data

}




// 通过ID获取schema
export const low_assetDetail = async () => {
  const url = `/lowcode/low_asset_detail`;
  const res = await service.get(url);
  // if (res.code) {
  //   console.error('list block failed: ', res);
  //   return;
  // }
  return res.data
}

// 通过ID获取schema
export const sys_menuList = async () => {
  const url = `/system/menu/sys_menu_route`;
  const res = await service.get(url);
  return res.data

}

// 通过ID获取schema
export const sys_menuList_edit = async () => {
  const url = `/system/menu/sys_menu_route_edit`;
  const res = await service.get(url);
  return res.data

}


// 获取历史数据的最新数据
export const low_schema_history_detail = async (id: string) => {
  const url = `/lowcode/low_schema_history_detail`;

  const res = await service(
    {
      url: url,
      method: 'get',
      params: { menu_id: id }
    }
  )
  // if (!id){
  //     const data = JSON.parse(res.data.schema)
  //     return data.componentsTree[0];
  // }
  return res.data
}

// 获取历史数据的最新数据
export const sys_menu_init = async () => {
  const url = `/system/menu/sys_menu_init`;

  const res = await service(
    {
      url: url,
      method: 'get',
    }
  )

  return res.data
}



// 历史数据保存
export const low_schema_history_save = async () => {
  const data = config.get('editordata');

  // const schema = project.exportSchema();
  const schema = project.exportSchema(TransformStage.Save)
  if (!data.schemaid) {
    return
  }
  const url = `/lowcode/low_schema_history`;

  const res = await service.post(
    url,
    {
      'schema': JSON.stringify(schema),
      'menu_id': data.menuid
    }
  )
  if (res.code == 200) {
    config.set('editordata', {
      type: 'menu',
      menuid: data.menuid,
      schemaid: res.data.id,

    });
    openNotification('success', "保存成功")
  }
};



// 获取历史数据的最新数据
export const low_schema_history_list = async () => {
  const url = `/lowcode/low_schema_history`;
  const data = config.get('editordata');

  const res = await service(
    {
      url: url,
      method: 'get',
      params: { menu_id: data.menuid }
    }
  )
  return res.data
}

// 获取历史数据的最新数据
export const low_schema_history_delete = async (id: string) => {
  const url = `/lowcode/low_schema_history?id=` + id;
  const res = await service(
    {
      url: url,
      method: 'delete',
    }
  )
  return res
}
// 根据历史ID获取数据
export const low_schema_history_detail_id = async (id: string) => {
  const url = `/lowcode/low_schema_history_detail?_id=` + id;
  const res = await service(
    {
      url: url,
      method: 'get',
    }
  )
  return res.data
}
// 根据ID获取数据
export const low_schema_history_menu_id = async (id: string) => {
  const url = `/lowcode/low_schema_history_detail?id=` + id;
  const res = await service(
    {
      url: url,
      method: 'get',
    }
  )
  return res.data
}



// 根据ID获取数据
export const low_typed_tree = async () => {
  const url = '/lowcode/low_typed_tree';
  const res = await service(
    {
      url: url,
      method: 'get',
    }
  )
  return res.data
}

// 根据ID获取数据
export const low_block_create = async (data: any) => {
  const url = '/lowcode/low_block';
  const res = await service.post(url, data
  )
  return res.data
}



export const low_schema_release = async () => {
  const data = config.get('editordata');

  const url = `/lowcode/low_schema_release`;

  const res = await service.post(
    url,
    {
      'menu_id': data.menuid,
      'schema_history_id': data.schemaid
    }
  )
  if (res.code == 200) {
    openNotification('success', "发布成功")
  }
};




export const low_api_choice = async (query: any) => {
  const url = `/lowcode/low_api_choice`;

  const res = await service(
    {
      url: url,
      method: 'get',
      params: query
    }
  )
  return res.data
};


export const low_api_create = async (query: any) => {
  const url = `/lowcode/low_api`;
  const res = await service.post(
    url,
    query
  )
  return res.data
};


export const low_block_search = async (query: any) => {
  const url = `/lowcode/low_block_search`;

  const res = await service(
    {
      url: url,
      method: 'get',
      params: query
    }
  )
  return res.data
};


export const low_api = async (query: any) => {
  const url = `/lowcode/low_api`;

  const res = await service.post(url, query
  )
  return res.data
};



export const Logout = async () => {
  const url = `/logout/`;
  const res = await service.post(url).then((res) => {
    const str = JSON.stringify(res);
    ClearToken();
    openNotification('success', '退出成功');
  });
};






export const tempListSchema = async (query:any) => {

  let url = `https://lowcode.flyowl.com.cn/api/lowcode/template/Plubiclist/`;  
  // const cacheurl = GetEditInfo("publicTemplateUrl")
  // if (cacheurl){
  //   url = cacheurl+ 'Plubiclist/'
  // }
  const res = await service(
    {
      url: url,
      method: 'get',
      params:query

    }
  )
  return res.data;
};


export const tempPubileSchema = async () => {
  let url = `https://lowcode.flyowl.com.cn/api/system/dictionary/get_dict_template/`;  
  // let cacheurl = GetEditInfo("publicTempDictUrl")
  // if (cacheurl){
  //   url = cacheurl
  // }
  const res = await service(
    {
      url: url,
      method: 'get',
    }
  )
  return res.data;
};



export const tempDetailSchema = async (id:Number) => {
  
  let url = `https://lowcode.flyowl.com.cn/api/lowcode/template/`+id +'/Publicretrieve/';  
  // let cacheurl = GetEditInfo("publicTemplateUrl")

  // if (cacheurl){
  //   url = cacheurl+id +'/Publicretrieve/'
  // }
  const res = await service(
    {
      url: url,
      method: 'get',
    }
  )
  const data = JSON.parse(res.data.schema)
  project.removeDocument(project.currentDocument as any);
  // const schema = project.exportSchema();
  project.openDocument(data.componentsTree[0]);
  
};