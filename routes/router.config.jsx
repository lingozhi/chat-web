// config/router.config.jsx
import React from 'react';
import BasicLayout from '../src/pages/BasicLayout/index.jsx';
import NotFound from '../src/pages/NotFound/index.jsx';

const routes = [
    {
        path: '/*',
        element: <BasicLayout />,
        children: [
            {
                path: '*',
                element: <NotFound />,
            },
        ],
    },
];

export default routes;
