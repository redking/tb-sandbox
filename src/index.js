import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './App';

const widgets = [
    { id: 1, title: 'Tile 1' },
    { id: 2, title: 'Tile 2' },
    { id: 3, title: 'Tile 3' },
    { id: 4, title: 'Tile 4' },
    { id: 5, title: 'Tile 5' },
    { id: 6, title: 'Tile 6' },
    { id: 7, title: 'Tile 7' },
    { id: 8, title: 'Tile 8' }
];

ReactDOM.render(
    <div className="page">
        <App widgets={widgets} />
    </div>,
    document.getElementById('root')
);
