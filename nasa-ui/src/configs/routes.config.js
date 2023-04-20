import React from 'react'
import AsteroidDetails from 'views/asteroidDetails';

// pages
import Asteroids from 'views/asteroids';

export const publicRoutes = [
  {
    key: 'asteroids',
    path: '/',
    component: <Asteroids />,
  },
  {
    key: 'asteoridDetails',
    path: '/asteroids/:id',
    component: <AsteroidDetails />,
  },
]
