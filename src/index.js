import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Dashboard from './dashboard';
import * as serviceWorker from './serviceWorker';
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from 'redux-persist/lib/integration/react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

class ReduxAppWrapper extends React.Component{
  render(){
    return(
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Dashboard />
        </PersistGate>
      </Provider>
    )
  }
}
ReactDOM.render(<ReduxAppWrapper />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
