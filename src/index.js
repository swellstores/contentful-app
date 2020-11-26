import React from 'react';
import { render } from 'react-dom';

import { init, locations } from 'contentful-ui-extensions-sdk';
import '@contentful/forma-36-react-components/dist/styles.css';
import '@contentful/forma-36-fcss/dist/styles.css';
import './index.css';

import Config from './containers/Config';
import EntryField from './containers/EntryField';
import ProductsDialog from './containers/ProductsDialog';
import LocalhostWarning from './containers/LocalhostWarning';

const root = document.getElementById('root');

if (process.env.NODE_ENV === 'development' && window.self === window.top) {
  render(<LocalhostWarning />, root);
} else {
  init((sdk) => {
    const ComponentLocationSettings = [
      {
        location: locations.LOCATION_APP_CONFIG,
        component: <Config sdk={sdk} />,
      },
      {
        location: locations.LOCATION_ENTRY_FIELD,
        component: <EntryField sdk={sdk} />,
        autoResizer: true,
      },
      {
        location: locations.LOCATION_DIALOG,
        component: <ProductsDialog sdk={sdk} />,
      },
    ];
    ComponentLocationSettings.forEach((componentLocationSetting) => {
      if (sdk.location.is(componentLocationSetting.location)) {
        render(componentLocationSetting.component, root);
      }
      if (sdk.window && componentLocationSetting.autoResizer) {
        sdk.window.startAutoResizer();
      }
    });
  });
}
