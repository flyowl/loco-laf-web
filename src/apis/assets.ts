import { config, project } from '@alilc/lowcode-engine';
import { TransformStage } from '@alilc/lowcode-types';

import {openNotification} from 'src/utils/index'

import {GetEditInfo} from './localStorageInfo';
// import { BASE_URL } from "./config";
import service from './request'



export const getAssets = async () => {
    const url = `/api/lowcode/getassets/`;
    const res = await service.get(url);
    // if (res.code) {
    //   console.error('list block failed: ', res);
    //   return;
    // }
    return res.data;
  }



export const getFullSchema = async (page: string) => {
    const url = `/api/lowcode/schemas?page=${page}`;

    const res = await service.get(url);
    return res.data;
  }


// 通过ID获取schema
  export const getSchema = async (id: Number) => {
    const url = `/api/lowcode/schemadata/${id}/renderschema/`;
    const res = await service.get(url);
    // if (res.code) {
    //   console.error('list block failed: ', res);
    //   return;
    // }
    return res.data;
  }


  export const getOneSchema = async (id: Number) => {
    const url = `/api/lowcode/schemadata/${id}/`;
    const res = await service.get(url);
    // if (res.code) {
    //   console.error('list block failed: ', res);
    //   return;
    // }
    return res.data;
  }

  export const getAssetForApp = async (id: any) => {
    const url = `/api/lowcode/asset/getassetsformenu/?app_id=`+id;
    const res = await service.get(url);
    
    return res.data;
  }



  export const DelOneSchema = async (id: Number) => {
    const url = `/api/lowcode/schemadata/${id}/`;
    const res = await service.delete(url);
    // if (res.code) {
    //   console.error('list block failed: ', res);
    //   return;
    // }
    return res
  }

  // 通过ID获取schema
  export const getReleaseSchema = async (id: Number) => {
    const url = `/api/lowcode/schemadata/releaseschema/?menuid=`+id;
    const res = await service.get(url);
    // if (res.code) {
    //   console.error('list block failed: ', res);
    //   return;
    // }
    return res.data;
  }


    // 通过ID获取所有的历史schema
    export const getHisySchema = async (id: any) => {
      const url = `/api/lowcode/schemadata/`;
      // const res = await service.get(url);
      // if (res.code) {
      //   console.error('list block failed: ', res);
      //   return;
      // }

      const res = await service(
        {
          url: url,
          method: 'get',
          params:{menu_id:id,limit:999}

        }
      )
      return res.data;
    }
  


// 通过路径获取schema
  export const getPathSchema = async (path: string) => {
    const url = `/api/system/menu/pathgetschema/?page=${path}`;
    const res = await service.get(url);
    return res.data;
  }

// 通过路径获取schema
export const getrenderSchema = async (path: string) => {
  const url = `/api/system/menu/getrenderschema/?page=${path}`;
  const res = await service.get(url);
  return res.data;
}




  export const saveSchema = async () => {
    const data = config.get('editordata');

    // const schema = project.exportSchema();
    const schema = project.exportSchema(TransformStage.Save)
    if (!data.schemaid){
      return
    }
    const url = `/api/lowcode/schemadata/`;  

    const res = await service.post(
      url,
          {
            'schema':JSON.stringify(schema),
            'menu_id':data.menuid
          }
    )
    if (res.code ==2000){
      config.set('editordata', {
        type: 'menu',
        menuid: res.data.menu_id,
        schemaid: res.data.id,
        
      });
      openNotification('success',"保存成功")
    }
  };


  export const releaseSaveSchema = async () => {
    const data = config.get('editordata');

    const url = `/api/lowcode/schemadata/releasesave/`;  

    const res = await service.post(
      url,
          {
            'menuid':data.menuid,
            'schemaid':data.schemaid
          }
    )
    if (res.code ==2000){
      openNotification('success',"发布成功")

    }
  };

  
  export const reLoadSchema = async () => {

    const schema = project.exportSchema(TransformStage.Save)
    project.removeDocument(project.currentDocument as any);
    // const schema = project.exportSchema();
    project.openDocument(schema.componentsTree[0]);
    openNotification('success',"重载成功")

  };
  

  export const getMenuSchema = async (id: Number) => {
    const url = `/api/system/menu/${id}/getschema/`;
    const res = await service.get(url);
    // if (res.code) {
    //   console.error('list block failed: ', res);
    //   return;
    // }
    return res.data;
  }


  export const tempSaveSchema = async (data:any) => {
    const schema = project.exportSchema(TransformStage.Save)

    const url = `/api/lowcode/template/`;  

    const res = await service.post(
      url,{
        schema:JSON.stringify(schema),
        ...data
      }
    )
    if (res.code == 2000){
      openNotification('success',"发布成功")
    }

  };



  export const tempListSchema = async (query:any) => {

    let url = `/api/lowcode/template/Plubiclist/`;  
    const cacheurl = GetEditInfo("publicTemplateUrl")
    if (cacheurl){
      url = cacheurl+ 'Plubiclist/'
    }
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
    let url = `/api/system/dictionary/get_dict_template/`;  
    let cacheurl = GetEditInfo("publicTempDictUrl")
    if (cacheurl){
      url = cacheurl
    }
    const res = await service(
      {
        url: url,
        method: 'get',
      }
    )
    return res.data;
  };



  export const tempDetailSchema = async (id:Number) => {
    
    let url = `/api/lowcode/template/`+id +'/Publicretrieve/';  
    let cacheurl = GetEditInfo("publicTemplateUrl")

    if (cacheurl){
      url = cacheurl+id +'/Publicretrieve/'
    }
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


  
