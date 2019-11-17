import 'react-app-polyfill/ie11';       // For IE 11 Support!

import React from "react"
import ReactDOM from "react-dom"

import AppRedux from './AppRedux';
import util from './utils/util';

import { 
    APP_REDUX
} from "./data/providers/core/ServiceModes"

import ReduxProvider from './data/providers/ReduxProvider';

const ServiceMode = APP_REDUX;
const appId = "app_" + util.getUniqueString();
let app = null, provider = null;

switch (ServiceMode)
{
    case APP_REDUX:
        provider = new ReduxProvider( <AppRedux key={appId} /> )
        app = provider.render()  
        break;
    
    default:
}

ReactDOM.render(app, document.getElementById('root'));