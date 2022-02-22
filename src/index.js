import React from 'react';
import { hydrateRoot } from 'react-dom';
import './index.css';
import { App } from './App';

const node = document.getElementById('root');

hydrateRoot(node, <App />);
