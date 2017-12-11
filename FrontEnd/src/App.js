import React, {Component} from 'react';
import './App.css';

// import HomePage from "./components/HomePage";
// import NewHomePage from "./components/NewHomePage";

import {BrowserRouter} from 'react-router-dom';
import Home from "./components/Home";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


// import HomePage from "./components/HomePage";

    class App extends Component {
        render() {
            return (
                <div className="App">

                    <BrowserRouter>
                    <MuiThemeProvider>
                        <Home/>
                         </MuiThemeProvider>
                    </BrowserRouter>
                </div>
            );
        }
    }

    export default App;
