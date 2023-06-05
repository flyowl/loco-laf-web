import service from './request'
import { config, project } from '@alilc/lowcode-engine';
import { openNotification } from 'src/utils/index'

import { TransformStage } from '@alilc/lowcode-types';





// 通过菜单ID获取schema
// {menu_id:xxx,id:xxx}
export const low_schemaDetail = async (data: any) => {
  const url = `low_schema_detail`;
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
  const url = `low_asset_detail`;
  const res = await service.get(url);
  // if (res.code) {
  //   console.error('list block failed: ', res);
  //   return;
  // }
  return res.data
}

// 通过ID获取schema
export const sys_menuList = async () => {
  const url = `sys_menu_route`;
  const res = await service.get(url);
  return res.data

}


// 获取历史数据的最新数据
export const low_schema_history_detail = async (id: string) => {
  const url = `low_schema_history_detail`;

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



// 历史数据保存
export const low_schema_history_save = async () => {
  const data = config.get('editordata');

  // const schema = project.exportSchema();
  const schema = project.exportSchema(TransformStage.Save)
  if (!data.schemaid) {
    return
  }
  const url = `low_schema_history`;

  const res = await service.post(
    url,
    {
      'schema': JSON.stringify(schema),
      'menu_id': data.menuid
    }
  )
  if (res.code == 2000) {
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
  const url = `low_schema_history`;
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
  const url = `low_schema_history?id=` + id;
  const res = await service(
    {
      url: url,
      method: 'delete',
    }
  )
  return res
}
// 根据ID获取数据
export const low_schema_history_detail_id = async (id: string) => {
  const url = `low_schema_history_detail?id=` + id;
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
  const url = 'low_typed_tree';
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
  const url = 'low_block';
  const res = await service.post(url, data
  )
  return res.data
}



export const low_schema_release = async () => {
  const data = config.get('editordata');

  const url = `low_schema_release`;

  const res = await service.post(
    url,
    {
      'menu_id': data.menuid,
      'schema_history_id': data.schemaid
    }
  )
  if (res.code == 2000) {
    openNotification('success', "发布成功")
  }
};




export const low_api_choice = async (query: any) => {
  const url = `low_api_choice`;

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
  const url = `low_api`;
  const res = await service.post(
    url,
    query
  )
  return res.data
};


export const low_block_search = async (query: any) => {
  const url = `low_block_search`;

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
  const url = `low_api`;

  const res = await service.post(url, query
  )
  return res.data
};





