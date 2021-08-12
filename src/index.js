import React from 'react';
import ReactDOM from 'react-dom';

import { Application } from './Application';
import reportWebVitals from './reportWebVitals';

import './index.css';

ReactDOM.render(<Application />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
