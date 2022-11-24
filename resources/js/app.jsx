import './bootstrap';
import React from 'react';
import { createRoot } from 'react-dom/client';
import RouterApp from './router';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<RouterApp/>);