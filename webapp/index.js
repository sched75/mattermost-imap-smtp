import React from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { PluginRegistry } from 'mattermost-webapp/plugins';

import Root from './components/root';
import reducer from './reducers';

// Combine les reducers pour gérer l'état de l'application
const rootReducer = combineReducers({
  'com.example.mattermost-imap-smtp-plugin': reducer,
});

// Crée le store Redux
const store = createStore(rootReducer);

// Composant principal de l'application
class Plugin {
  initialize(registry, store) {
    // Enregistre le composant racine dans Mattermost
    registry.registerRootComponent(
      () => (
        <Provider store={store}>
          <Root />
        </Provider>
      ),
    );

    // Enregistre les reducers pour gérer l'état du plugin
    registry.registerReducer(rootReducer);
  }
}

// Enregistre le plugin dans Mattermost
global.window.registerPlugin('com.example.mattermost-imap-smtp-plugin', new Plugin());
