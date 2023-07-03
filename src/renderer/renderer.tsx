import { Loading,Tag } from '@alifd/next';
import ReactRenderer from '@alilc/lowcode-react-renderer';
import { ProjectSchema } from '@alilc/lowcode-types';
import { buildComponents, assetBundle, AssetLevel, AssetLoader } from '@alilc/lowcode-utils';

import React, { useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import {  getFullSchema as getFullSchemaByUrl,getSchema ,getPathSchema,getReleaseSchema} from 'src/apis/assets';
import  Apphelp  from 'src/utils/public';
import { injectComponents } from '@alilc/lowcode-plugin-inject';

import {low_schema_history_menu_id,low_assetDetail,low_schemaDetail} from 'src/apis/lafapi';
// import '../index'
interface PortalRendererProps {
  type?: string;
  setUrl?: string | 'home';
  schema?: ProjectSchema;
}



const PortalRenderer = (props: PortalRendererProps) => {
  const navigate = useNavigate();
  Apphelp.utils.nav = navigate


  // 获取路径数据ß              
  const schemaUrl = useParams()['*']|| "/";
  console.log("==",schemaUrl)
  // 传去传递的参数
  const { type, setUrl, schema: propSchema } = props;
  // 获取params 的get参数ß
  const {schemaid} = useParams<{ id: string }>();

  const [previousSchemaUrl, setPreviousSchemaUrl] = useState("/"+schemaUrl);
  const [assets, setAssets] = useState();
  const [schema, setSchema] = useState(propSchema);
  const [loadingstatus, setLoading] = useState(true);
  const [components, setComponents] = useState();
  const fetchpathSchema = async (url: string) => {


    const res = propSchema ? propSchema : await low_schemaDetail({path:url});   
    setAssets(res.assets)  
    setSchema(JSON.parse(res.schema));

    setLoading(false)
    
  };

  const getAssets = async () =>{
    const schema = propSchema ? propSchema : await low_assetDetail();

    setAssets(JSON.parse(schema.data))

  }
  const fetchSchema = async (url: string) => {
    const res = propSchema ? propSchema : await low_schemaDetail({path:url});
    setAssets(res.assets)  
    setSchema(JSON.parse(res.schema));
    setLoading(false)

  };
  const fetchSchemaOne = async (id: string) => {
    const res = propSchema ? propSchema : await low_schema_history_menu_id(id);
    
    setAssets(res.assets)  
    setSchema(JSON.parse(res.schema));
    
    setLoading(false)
  };

  const fetchReleaseSchemaOne = async (id: Number) => {
    const res = propSchema ? propSchema : await low_schemaDetail({menu_id:id});
    setAssets(res.assets)  
    setSchema(JSON.parse(res.schema));
    setLoading(false)
  };

  useEffect(() => {
    // getAssets();

    // 根据不同的类型获取不同的url进行返回
    if (type == 'defaultmenu') {
      // 获取登入页面
      fetchpathSchema("/"+schemaUrl);
    } else if (type == 'login') {
      // localStorage.removeItem('Authorization')
      // 根据url路径获取登入页面菜单
      fetchSchema(setUrl);
    }else if (type == 'params'){
      // 测试渲染 获取参数菜单
      fetchSchemaOne(schemaid)
    }else if (type == 'releaseparams'){
      // 获取参数菜单
      fetchReleaseSchemaOne(schemaid)
    }
  }, [schemaUrl]);

  useEffect(() => {
    if (assets && schema) {


      setComponents(undefined);
      getComponents();
    }
  }, [ schema]);

  async function getComponents() {
    const { packages } = assets;
    const componentsMap: any = {};
    const { componentsMap: componentsMapArray } = schema;
    
    componentsMapArray.forEach((component: any) => {
      componentsMap[component.componentName] = component;
    });

    const libraryMap = {};
    const libraryAsset = [];
    packages.forEach(({ package: _package, library, urls, renderUrls }) => {
      libraryMap[_package] = library;
      if (renderUrls) {
        libraryAsset.push(renderUrls);
      } else if (urls) {
        libraryAsset.push(urls);
      }
    });

    
    // TODO asset may cause pollution
    const assetLoader = new AssetLoader();
    await assetLoader.load(libraryAsset);
    const components = await injectComponents(buildComponents(libraryMap, componentsMap));
    setPreviousSchemaUrl(schemaUrl);
    setComponents(components);

 
  }

  if (!components || !schema || previousSchemaUrl !== schemaUrl) {
    return <Loading className='loading-style' 
    />;
    setLoading(true)
  }
  return (
    <Loading
    visible={loadingstatus}
    style={{ display: 'block' }}
  >

<div className="lowcode-plugin-sample-preview">
      <ReactRenderer
        className="lowcode-plugin-sample-preview-content"
        schema={schema.componentsTree[0]}
        components={components}
        locale={'zh-CN'}
        messages={schema.i18n}
  
        appHelper={Apphelp}
      />
    </div>

  </Loading>
    
  );
};

export default PortalRenderer;