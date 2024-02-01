import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap/dist/js/bootstrap.bundle"
import './StyleSheets/index.css'
import './StyleSheets/responsive.css'
import './StyleSheets/animation.css'
import './StyleSheets/classified.css'
import './StyleSheets/all4one.css'
import { ChakraProvider } from '@chakra-ui/react';
import UserContextProvider from './contexts/userContext'
import UnverifiedContextProvider from './contexts/unVerifiedContext'
import GeneralNotificationProvider from './contexts/generalNotificationContext'
import UpdateContextProvider from './contexts/updateContext'
import ShopWigetContextProvider from './contexts/shopWigetContext'
import AllShopsContextProvider from './contexts/allShopsContext'
import CommentsContextProvider from './contexts/commentsContext'
import PostContextProvider from './contexts/postContext'
// import 'bootstrap/dist/js/bootstrap.bundle.js';


const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <ChakraProvider>
    <UserContextProvider>
      <CommentsContextProvider>
        <PostContextProvider>
          <UpdateContextProvider>
            <AllShopsContextProvider>
              <ShopWigetContextProvider>
                <GeneralNotificationProvider>
                  <UnverifiedContextProvider>
                    <React.StrictMode>
                      <App />
                    </React.StrictMode>
                  </UnverifiedContextProvider>
                </GeneralNotificationProvider>
              </ShopWigetContextProvider>
            </AllShopsContextProvider>
          </UpdateContextProvider>
        </PostContextProvider>
      </CommentsContextProvider>
    </UserContextProvider>
  </ChakraProvider >
)

