import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import Layout from './ui/Layout.tsx'
import Products from './pages/Products.tsx';
import Cart from "./pages/Cart.tsx";
import Category from "./pages/Category.tsx";
import Favorite from "./pages/Favorite.tsx";
import NotFound from "./pages/NotFount.tsx";
import Profile from "./pages/Profile.tsx";
import Cancel from "./pages/Cancel.tsx";
import Success from "./pages/Success.tsx"
import Orders from './pages/Orders.tsx';
import { Outlet , RouterProvider, ScrollRestoration, createBrowserRouter} from 'react-router-dom'

  export const RouterLayout = () => {
  return (
    <Layout>
<ScrollRestoration/>
      <Outlet/>

    </Layout>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <RouterLayout />,
    children: [
      {

        path: '/',
        element:<App/>

      },
      {

        path: '/product',
        element:<Products/>

      },
      {

        path: '/product/:id',
        element:<Products/>

      },
      {

        path: '/cart',
        element:<Cart/>

      },
      {

        path: '/category',
        element: <Category/>

      },
      {

        path: '/category/:id',
        element: <Category/>

      },
      {

        path: '/favorite',
        element:<Favorite/>

      },
      {

        path: '/*',
        element:<NotFound/>

      },
      {

        path: '/success',
        element:<Success/>

      },
      {

        path: '/cancel',
        element:<Cancel/>

      },
      {

        path: '/profile',
        element:<Profile/>

      },
      {

        path: '/orders',
        element: <Orders/>

      },


    ]
}
])


ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider  router={ router} />
)
