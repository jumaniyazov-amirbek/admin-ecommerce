import { Banners, Brands, Categories, Home, Products } from "../pages";

export const routes = [
    {
        id: 1,
        path: '/',
        component: <Home/>
    },
    {
        id:2,
        path: '/products',
        component: <Products/>
    },
    {
        id: 3,
        path: '/categories',
        component: <Categories/>
    },
    {
        id: 4,
        path: '/banners',
        component: <Banners/>
    },
    {
        id: 5,
        path: '/brand',
        component: <Brands/>
    },
    {
        id:6,
        path: '*',
        component: <Home/>
    },
]