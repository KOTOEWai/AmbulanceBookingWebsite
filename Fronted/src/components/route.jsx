import Home from './Home'
import SignUp from './SignUp'
import Login from './Login'
import TqLetter from './TqLetter'
import { createBrowserRouter, RouterProvider ,Navigate} from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from './AuthContext'
import GoogleMap from './googleMap'

function Index() {
    const { user} = useContext(AuthContext)
   
   const routes =[
    {
        path: '/',
        element: user ? <Home/> :  <Navigate to={'/signup'} />
    },
    {
        path: '/signup',
        element: !user ? <SignUp/> : <Navigate to={'/'} />
    },
    {
        path: '/login',
        element:  !user ? <Login/> : <Navigate to={'/'} />
    },
    {
        path: '/tqletter',
        element: user ?<TqLetter/>: <Navigate to={'/signup'} />
    },
    {
        path: '/googleMap',
        element: user ? <GoogleMap/>: <Navigate to={'/signup'} />
    }
   ];
   const router = createBrowserRouter(
       routes,
   );

   return <RouterProvider router={router}/>
}

export default Index;