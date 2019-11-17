import React from "react"
import { Provider } from "react-redux"
import ReduxStore from "../ReduxStore"

import BaseProvider from "./core/BaseProvider";

class ReduxProvider extends BaseProvider
{
    static _instance;

    constructor(appRedux)
    {
        super();

        if (!BaseProvider._instance) BaseProvider._instance = this;

        this._appRedux = appRedux;
    }

    render()
    {
        console.log("ReduxProvider._instance:", BaseProvider._instance)
        return ( React.createElement(Provider, { store:ReduxStore({}) }, [ this._appRedux ]) )
    }
}

export default ReduxProvider