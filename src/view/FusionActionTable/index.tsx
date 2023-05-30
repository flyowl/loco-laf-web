import * as React from 'react';
import { ResponsiveGrid } from '@alifd/next';
import ActionTable from './components/ActionTable';

const { Cell } = ResponsiveGrid;

const FusionActionTable = () => {
  return (
    <ResponsiveGrid gap={20}>


      <Cell colSpan={12}>
        <ActionTable />
      </Cell>
    </ResponsiveGrid>
  );
};

export default FusionActionTable;
