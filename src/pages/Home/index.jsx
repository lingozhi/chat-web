import './index.less';
import React from 'react';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-css';
import 'ace-builds/src-noconflict/theme-github';

class CodeEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            html: '',
            js: '',
            css: '',
        };
    }

    handleHtmlChange = (value) => {
        this.setState({ html: value });
    };

    handleJsChange = (value) => {
        this.setState({ js: value });
    };

    handleCssChange = (value) => {
        this.setState({ css: value });
    };

    download = () => {
        const element = document.createElement('a');
        const file = new Blob([this.state.html + '\n' + this.state.js + '\n' + this.state.css], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = 'myCode.html';
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
    };

    render() {
        return (
            <div>
                <AceEditor
                    mode="html"
                    theme="github"
                    onChange={this.handleHtmlChange}
                    name="htmlEditor"
                    editorProps={{ $blockScrolling: true }}
                />
                <AceEditor
                    mode="javascript"
                    theme="github"
                    onChange={this.handleJsChange}
                    name="jsEditor"
                    editorProps={{ $blockScrolling: true }}
                />
                <AceEditor
                    mode="css"
                    theme="github"
                    onChange={this.handleCssChange}
                    name="cssEditor"
                    editorProps={{ $blockScrolling: true }}
                />
                <button onClick={this.download}>导出1212</button>
            </div>
        );
    }
}

export default CodeEditor;
