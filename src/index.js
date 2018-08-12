import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { createMuiTheme } from 'material-ui/styles';
import { indigo500, red500 } from 'material-ui/colors';
import App from './App';
import store from './store';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

injectTapEventPlugin();

const muitheme = createMuiTheme({
    palette: {
        primary: red500,
        secondary: indigo500,
    },
});

ReactDOM.render(
    <Provider store={store} >
        <MuiThemeProvider theme={muitheme}>
            <App/>
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
