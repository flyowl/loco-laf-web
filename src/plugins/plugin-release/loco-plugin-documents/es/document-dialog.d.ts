import * as React from 'react';
declare class DocumentsDialog extends React.Component {
    state: {
        visible: boolean;
        bookUrl: boolean;
    };
    componentDidMount(): void;
    onOpen: () => void;
    onClose: () => void;
    render(): JSX.Element;
}
export default DocumentsDialog;
