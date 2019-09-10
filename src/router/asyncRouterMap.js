import _import from '../utils/import'

const Layout = _import('layout/layout')

// 动态路由表，全部的。服务返回的json结构与此判断，生成该用户对应的路由表
export const asyncRouterMap = [
    {
        path: '/dashboard',
        name: 'dashboard',
        component: Layout,
        meta: {
            title: '控制台',
            icon: 'comp',
        },
        children: [
            {
                path: 'index',
                name: 'DashboardIndex',
                component: _import('dashboard/Index'),
                hidden: false,
                meta: {
                    title: '控制台',
                    icon: 'comp',
                },
            },
        ],
    },
    {
        path: '/article',
        name: 'article',
        component: Layout,
        hidden: false,
        meta: {
            title: '文章',
            icon: 'comp',
        },
        children: [
            {
                path: 'index',
                name: 'index',
                component: _import('article/index'),
                hidden: false,
                meta: {
                    title: '文章列表',
                    icon: 'comp',
                },
            },
            {
                path: 'create',
                name: 'create',
                component: _import('article/create'),
                hidden: true,
                meta: {
                    title: ' 创建',
                    icon: 'comp',
                },
            },
            {
                path: 'detail',
                name: 'detail',
                component: _import('article/detail'),
                hidden: true,
                meta: {
                    title: ' 详情',
                    icon: 'comp',
                }
            }
        ],
    },
    {
        path: '/category',
        name: 'category',
        component: Layout,
        hidden: false,
        meta: {
            title: '分类',
            icon: 'comp',
        },
        children: [
            {
                path: 'index',
                name: 'category-index',
                component: _import('category/index'),
                hidden: false,
                meta: {
                    title: '分类列表',
                    icon: 'comp',
                },
            },
            {
                path: 'create',
                name: 'category-create',
                component: _import('category/create'),
                hidden: true,
                meta: {
                    title: ' 创建',
                    icon: 'comp',
                },
            }
        ],
    },
    {
        path: '/tag',
        name: 'tag',
        component: Layout,
        hidden: false,
        meta: {
            title: '标签',
            icon: 'comp',
        },
        children: [
            {
                path: 'index',
                name: 'tag-index',
                component: _import('tag/index'),
                hidden: false,
                meta: {
                    title: '标签列表',
                    icon: 'comp',
                },
            },
            {
                path: 'create',
                name: 'tag-create',
                component: _import('tag/create'),
                hidden: true,
                meta: {
                    title: ' 创建',
                    icon: 'comp',
                },
            }
        ],
    }, {
        path: '/profile',
        name: 'profile',
        component: Layout,
        hidden: true,
        meta: {
            title: '首页',
            icon: 'comp',
        },
        children: [
            {
                path: 'index',
                name: 'index',
                component: _import('profile/index'),
                hidden: false,
                meta: {
                    title: '个人中心',
                    icon: 'comp',
                },
            },
        ],
    },
]
export default {}
