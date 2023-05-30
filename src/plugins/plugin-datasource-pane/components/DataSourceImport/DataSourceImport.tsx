/* eslint-disable @typescript-eslint/indent */
/**
 * 源码导入插件
 * @todo editor 关联 types，并提供详细的出错信息
 */
import { Grid, Input, TreeSelect,Select } from '@alifd/next';
import { RuntimeDataSourceConfig as DataSourceConfig } from '@alilc/lowcode-datasource-types';
import MonacoEditor from '@alilc/lowcode-plugin-base-monaco-editor';
import Ajv from 'ajv';
import _isArray from 'lodash/isArray';
import _isPlainObject from 'lodash/isPlainObject';
import _last from 'lodash/last';
import type { editor } from 'monaco-editor';
import React, { PureComponent } from 'react';
import { ApimanagerTree } from 'src/apis/apimanager';
// import './import-plugins/code.scss';
import { ListTreeDataType } from 'src/apis/block';
import { DataSourcePaneImportPluginComponentProps } from '../../types';

const { Row, Col } = Grid;

export interface DataSourceImportProps extends DataSourcePaneImportPluginComponentProps {
  defaultValue?: DataSourceConfig[];
}

export interface DataSourceImportState {
  code: string;
  isCodeValid: boolean;
}

export class DataSourceImport extends PureComponent<DataSourceImportProps, DataSourceImportState> {
  static defaultProps = {
    defaultValue: [
      {
        type: 'fetch',
        isInit: false,
        options: {
          method: 'GET',
          isCors: true,
          timeout: 30000,
          uri: '/info',
          params: {},
          headers: {},
        },
        id: 'info',
      },
    ],
  };

  state = {
    code: '',
    isCodeValid: true,
    datasource: [{ label: '空', value: 2 }],
    apisource: [{ label: '空', value: 2 }],
    textdata: '',
  };


  private send = (...args: any[]) => {
    this.context.stateService.send(...args);
  };


  submit = () => {
    return new Promise((resolve, reject) => {
      const { isCodeValid, code } = this.state;

      if (!isCodeValid) reject(new Error('导入格式有误'));

      // 只 resolve 通过 schema 校验的数据
      resolve(this.deriveValue(JSON.parse(code)));
    });
  };

  private editMonacoRef: any;

  constructor(props: DataSourceImportProps) {
    super(props);
    this.state.code = JSON.stringify(this.deriveValue(this.props.defaultValue), null, 2);
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.handleComplete = this.handleComplete.bind(this);
  }

  deriveValue = (value: any) => {
    const { dataSourceTypes } = this.props;

    if (!_isArray(dataSourceTypes) || dataSourceTypes.length === 0) return [];

    let result = value;
    if (_isPlainObject(result)) {
      // 如果是对象则转化成数组
      result = [result];
    } else if (!_isArray(result)) {
      return [];
    }

    const ajv = new Ajv();

    return (result as DataSourceConfig[]).filter((dataSource) => {
      if (!dataSource.type) return false;

      const dataSourceType = dataSourceTypes.find((type) => type.type === dataSource.type);

      if (!dataSourceType) return false;

      // 向下兼容
      if (dataSourceType.schema) {
        // 校验失败的数据源，给予用户提示
        const validate = ajv.compile(dataSourceType.schema);
        const valid = validate(dataSource);
        if (!valid) console.warn(validate.errors);
        return valid;
      } else {
        // 用户不传入 schema 校验规则，默认返回 true
        return true;
      }
    });
  };

  /**
   * 看代码是未使用到
   * @deprecated
   */
  handleComplete = () => {
    if (this.editMonacoRef) {
      if (
        !this.editMonacoRef.getModelMarkers().find((marker: editor.IMarker) => marker.owner === 'json')
      ) {
        this.setState({ isCodeValid: true });
        const model: any = _last(this.editMonacoRef.getModels());
        if (!model) return;
        this.props.onImport?.(this.deriveValue(JSON.parse(model.getValue())));
        return;
      }
    }
    this.setState({ isCodeValid: false });
  };

  handleEditorChange = (newValue: string) => {
    if (this.editMonacoRef) {
      if (
        !this.editMonacoRef.getModelMarkers().find((marker: editor.IMarker) => marker.owner === 'json')
      ) {
        this.setState({ isCodeValid: true, code: newValue });
      }
    }
  };
  componentDidMount() {
    this.handleEditorDidMount = this.handleEditorDidMount.bind(this);

  }
  componentWillUnmount() {

  }

  handleEditorDidMount = (editor: MonacoEditor, monaco: MonacoEditor) => {
    this.editMonacoRef = editor?.editor;
  };


  getdatatype = async (url: string) => {
    const schema = await ListTreeDataType();
    this.setState({
      datasource: schema.data,
    });
  };

  getapidata = async (typed: string) => {
    const schema = await ApimanagerTree({ typed: typed });
    this.setState({
      apisource: schema.data,
    });
  };

  componentDidMount() {
    this.getdatatype();
  }

  handleChange = (value: any) => {
    this.getapidata(value);
  };
  handleChange2 = (value: any, data: any) => {
    this.state.apisource.map((api: any, index: number) => {
      if (value == api.id) {
          // console.log(this.editMonacoRef)
          // this.send({
          //   type: 'SHOW_EXPORT_DETAIL',
          //   payload: { dataSourceList: api.schema },
          // });

          // if (this.editMonacoRef) {
          //   this.editMonacoRef.getModels()?.[0]?.setValue?.(api.schema);
          // }
        this.setState({ textdata: api.description,code:api.schema });
        return;
      }
    });
  };
  render() {
    const { code, isCodeValid } = this.state;

    // @todo
    // formatOnType formatOnPaste
    return (
      <div className="lowcode-plugin-datasource-import-plugin-code">
        {/* <Cascader dataSource={this.state.datasource} onChange={this.handleChange} /> */}

        <Row gutter={10}>
          <Col span="12">
            <div className="demo-col-inset">
              <Select
                // treeDefaultExpandAll
                hasClear
                placeholder="类型选择"
                onChange={this.handleChange}
                dataSource={this.state.datasource}
                style={{ width: '100%' }}
              />
            </div>
          </Col>
          <Col span="12">
            <div className="demo-col-inset">
              <TreeSelect
              showSearch
                
                hasClear
                placeholder="接口选择"
                onChange={this.handleChange2}
                dataSource={this.state.apisource}
                style={{ width: '100%' }}
              />
            </div>
          </Col>
        </Row>

        <Row style={{ marginTop: 20 }}>
          <Input.TextArea
            placeholder=""
            aria-label="TextArea"
            value={this.state.textdata}
            style={{ width: '100%' }}
          />
        </Row>

        <Row style={{ marginTop: 20 }}>
          <MonacoEditor
            theme="vs-vision"
            width={800}
            height={400}
            value={code}
            language="json"
            onChange={this.handleEditorChange}
            editorDidMount={this.handleEditorDidMount}
          />
          {!isCodeValid && <p className="error-msg">格式有误</p>}
        </Row>
      </div>
    );
  }
}
