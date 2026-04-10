import {
    createRootRoute,
    createRoute,
    createRouter, Outlet,
} from '@tanstack/react-router'
import { HomePage } from '../pages/home'
import { ProductsPage } from '../pages/products'
import {Header} from "../components/header.tsx";

const rootRoute = createRootRoute({
    component: () => (
        <div>
            <Header />
            <Outlet />
        </div>
    ),
})

const homeRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: HomePage,
})

const productsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/products',
    component: ProductsPage,
})

const routeTree = rootRoute.addChildren([homeRoute, productsRoute])

export const router = createRouter({
    routeTree,
})
