import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { Provider } from 'mobx-react';
import { Store } from './stores/store';

ReactDOM.render(
    <Provider store={new Store()}>
        <App />
    </Provider>,
    document.getElementById('root') as HTMLElement
);
registerServiceWorker();
