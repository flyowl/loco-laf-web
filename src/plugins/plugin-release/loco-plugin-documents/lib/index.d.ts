import { IPublicModelPluginContext } from '@alilc/lowcode-types';
declare const LocoPluginDocuments: {
    (ctx: IPublicModelPluginContext, options: any): {
        init(): void;
    };
    pluginName: string;
    meta: {
        dependencies: any[];
    };
};
export default LocoPluginDocuments;
