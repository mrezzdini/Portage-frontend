import './app/assets/css/index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import App from './app/App';
import { persistor, store } from './app/store/store';

/**
 * Main entry point of the application.
 * Provider: Provides the store to the application.
 * PersistGate: Provides the persistor to the application. To persist data in the local storage.
 *
 * @author: Peter Mollet
 */
ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <div style={{ backgroundColor: 'red' }}>
                {' '}
                <App />
            </div>
        </PersistGate>
    </Provider>,
);
