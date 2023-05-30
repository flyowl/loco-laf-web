import React, { PureComponent } from 'react';
import { Select } from '@alifd/next';

interface SelectSetterProps {
  onChange: (value: string) => undefined;
  value?: any;
  defaultValue?: any;
  options: any[];
  /**
   * 展开后是否能搜索
   */
  showSearch?: boolean;
}

interface SelectSetterState {
  setterValue: string | null;
}



export default class SelectSetter extends PureComponent<SelectSetterProps, SelectSetterState> {
  static defaultProps = {
    placeholder: '请选择',
    options: [{ label: '-', value: '' }],
    defaultValue: null as any,
    onChange: () => undefined as any,
  };

  static displayName = 'AuthSetter';

  state: SelectSetterState = {
    setterValue: null,
  };

  render() {
    const { options, onChange, mode, value, showSearch } = this.props;
    return (
      <Select
        autoWidth={false}
        size="small"
        value={value}
        // dataSource={}
        mode={mode}
        onChange={(val) => {
          onChange && onChange(val);
        }}
        style={{ width: '100%' }}
        showSearch={showSearch}
      />
    );
  }
}
