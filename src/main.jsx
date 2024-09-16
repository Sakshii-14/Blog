import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import store from "./store/store";
import { Provider } from "react-redux";
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import AuthLayout from './components/AuthLayout.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Home from './pages/Home.jsx';
import Post from './pages/Post.jsx'
import EditPost from './pages/EditPost'
import AllPosts from './pages/AllPosts'
import AddPost from './pages/AddPost'
import { AnimatePresence } from 'framer-motion';
import UserPost from './pages/UserPost.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        ),
      },
      {
        path: "/my-posts",
        element: (
          <AuthLayout authentication>
            <AllPosts />
          </AuthLayout>
        ),
      },

      {
        path: "/add-post",
        element: (
          <AuthLayout authentication>
            <AddPost />
          </AuthLayout>
        ),
      },
      {
        path: "/edit-post/:slug",
        element: (
          <AuthLayout authentication>
            <EditPost />
          </AuthLayout>
        ),
      },
      {
        path: "/post/:slug",
        element: <Post />,
      },
      {
        path: "/userpost/:userid",
        element: <UserPost />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <AnimatePresence mode='wait'>
     <Provider store={store}>
     <RouterProvider router={router} />
     </Provider>
     </AnimatePresence>
    
  </React.StrictMode>
  
  
)
