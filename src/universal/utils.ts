import { config } from '@alilc/lowcode-engine';
import { getMenuSchema,getSchema,releaseSaveSchema } from 'src/apis/assets';


export const preview = () => {

  // saveSchema();
  setTimeout(() => {
    const data = config.get('editordata');
    window.open(`/render/${data.schemaid}/`);
  }, 500);
  
};

// export const release = () => {
//   // 发布

//   releaseSaveSchema();

 
  
// };

export const releasepreview = () => {
  // 发布

  // saveSchema();
  setTimeout(() => {
    const data = config.get('editordata');
    window.open(`/release/${data.menuid}/`);

  }, 500);
 
  
};

export const getPageSchema = async (page: Number) => {
  const schema = await getSchema(page);
  const data = JSON.parse(schema.schema)
  return data.componentsTree[0];
};

export const getPageSchemaData = async (id: Number) => {
  const schema = await getMenuSchema(id);
  return {'schema':schema.schema.componentsTree[0],'id':schema.schema_id};
};
