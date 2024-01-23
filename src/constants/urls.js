export const domain = 'https://ecommerce.main-gate.appx.uz'
export const API_MODE = '/dev/adminka'

export const urls = {
    auth: {
        login: '/auth/login',
        refresh: '/auth/refresh',
    },
    categories:{
        getList: '/category/list',
        post: '/category/add',
        delete: (id) => `/category/${id}`,
        put: (id) => `/category/edit/${id}`
    },
    brand:{
        getList: '/brand/list',
        post: '/brand/add',
        delete: (id) => `/brand/delete/${id}`,
        put: (id) => `/brand/update/${id}`
    }
} 