import React from 'react';
import ReactDOM from 'react-dom';
import { LoggerExample } from './loggerExample';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<LoggerExample />, document.getElementById('root'));
registerServiceWorker();
