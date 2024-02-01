import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'
import io from 'socket.io-client'
import Home from './pages/Home'
import RootLayout from './layouts/RootLayout'
import { useContext, useEffect } from 'react'
import SearchPage from './pages/searchPage'
import Inbox from './pages/Inbox'
import FollowedShops from './pages/FollowedShops'
import SinglePost from './pages/singlePost'
import ChatRoom from './pages/chatRoom'
import ClearLayout from './layouts/ClearLayout'
import SingleShop from './pages/singleShop'
import DepositPage from './pages/DepositPage'
import Transactions from './pages/Transactions'
import Authpage from './pages/authpage'
import WithdrawalPage from './pages/withdrawalPage'
import Allusers from './pages/Allusers'
import NotFound from './pages/NotFound'
import NotificationsPage from './pages/notifications'
import SingleNotification from './components/notifications/singleNotification'
import ProfilePage from './pages/profilePage'
import PostDetails from './pages/postDetails'
import CommentPage from './pages/commentPage'
import MenuPage from './pages/MenuPage'
import Transfer from './pages/Transfer'
import Post from './pages/post'
import Help from './components/help/help'
import SearchedUsers from './pages/searchedUsers'
import InboxMessages from './pages/inboxmessages'
import { userContext } from './contexts/userContext'
import Moments from './pages/Moments.jsx'
import CreateMoment from './pages/createMoment'
import ExploreMoments from './pages/exploreMoments'
import Channels from './pages/channels'
import CreateChannel from './pages/createChannel'
import ExploreChannels from './pages/exploreChannels'



// you will have a notificaations table too will have the user id it belongs to and a read property
const router = createBrowserRouter(
  createRoutesFromElements(

    <Route path="/" element={<ClearLayout />} errorElement={<NotFound />}>
      <Route path='/user/chat-room/:senderID/:receiverID/:receiverUserName' element={<ChatRoom />} />
      <Route path='/post-details/:id' element={<PostDetails />} />
      <Route path='/hsh' element={<Help />} />
      <Route path='create-moment/:id' element={<CreateMoment />} />
      <Route path='create-channel/:id' element={<CreateChannel />} />

      <Route path='/auth/user' element={<Authpage />} />
      <Route path='/user/profile/:id' element={<ProfilePage />} />
      <Route path="/" element={<RootLayout />}>
        <Route path='/deposit-amount' element={<DepositPage />} />
        <Route path='/withdraw-amount' element={<WithdrawalPage />} />
        <Route path='explore-moments/:id' element={<ExploreMoments />} />
        <Route path='explore-channels/:id' element={<ExploreChannels />} />
        <Route path='user-transactions/:id' element={<Transactions />} />
        <Route path='searched-users/:keyWord' element={<SearchedUsers />} />
        <Route path='transfer/:id' element={<Transfer />} />
        <Route path='/discover/:id' element={<Allusers />} />
        <Route path='/' element={<Home />} />
        <Route path='notifications/:id' element={<NotificationsPage />} />
        <Route path='post/:id' element={<Post />} />
        <Route path='moments/:id' element={<Moments />} />
        <Route path='channels/:id' element={<Channels />} />
        <Route path='notifications/details' element={<SingleNotification />} />
        <Route path='/search' element={<SearchPage />} />
        <Route path='/menu-page' element={<MenuPage />} />
        <Route path='search/single-shop/:id/:shop' element={<SingleShop />} />
        <Route path='/inbox/:id' element={<Inbox />} />
        <Route path='/messages/:id' element={<InboxMessages />} />
        <Route path='/followed-shops' element={<FollowedShops />} />
        <Route path='/single-post/:id/:type/:collection' element={<SinglePost />} />
        <Route path='/*' element={<NotFound />} />
      </Route >
    </Route >
  )
)

function App() {

  return (
    <RouterProvider router={router} />
  );
}

export default App
// https://uigradients.com/#Twitch

