import React, { useContext, useEffect } from 'react';
import {
  Accessibility,
  AccessibilityOutlined,
  AddBusinessOutlined,
  ChatOutlined,
  FavoriteBorder,
  HomeOutlined,
  Menu,
  PersonOutlineOutlined,
  StoreOutlined,
  Widgets,
  WidgetsOutlined,
} from '@mui/icons-material';
import { NavLink, useLocation } from 'react-router-dom';
import { Fade } from 'react-reveal';
import { userContext } from '../../contexts/userContext';
import { ChatBubble, Home, Shop } from '../../Assets/icons';

function BottomBar() {
  const [userDetails] = useContext(userContext);
  const { pathname } = useLocation();
  const h = '/';
  const s = '/search';
  const f = '/followed-shops';
  const a = '/account';
  const m = '/messages';

  useEffect(() => {
    console.log('path', pathname);
  }, []);

  return (
    <div>
      <nav className=''>
        <br />
        <br />
        <br />
        <br />
        <Fade duration={1500} bottom>
          <div className='fixed-bottom bg-success text-white '>
            <div className='py-3 d-flex actions-bottom shadow2 px-3' style={{ alignItems: 'stretch' }}>
              <NavLink to='/'>
                <div>
                  <Home size='23' />
                  {pathname !== '/' ? (
                    <div className='tiny'>
                      Home
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
              </NavLink>

              <NavLink to="/search" activeClassName="active">
                <div className='bottom-cart-div'>
                  <Shop size='22' />
                  {!pathname.includes('/search') ? (
                    <div className='tiny' style={{marginTop:'0.5px'}}>
                      Shops
                    </div>
                  ) : (
                    <span></span>
                  )}
                </div>
              </NavLink>

              <NavLink to={'/inbox/' + userDetails?._id} >
                <div className='bottom-cart-div straight'>
                  <ChatBubble size='23' />
                  {!pathname.includes('/inbox/') ? (
                    <div className='tiny'>
                      Inbox
                    </div>
                  ) : (
                    <span></span>
                  )}
                </div>
              </NavLink>

              <NavLink to='/menu-page'>
                <div className='bottom-cart-div'>
                  <WidgetsOutlined fontSize='medium' />
                  {!pathname.includes('/menu-page') ? (
                    <div className='tiny'>
                      Menu
                    </div>
                  ) : (
                    <span></span>
                  )}
                </div>
              </NavLink>

              {/* <NavLink to='/followed-shops'>
                <div className='bottom-cart-div'>
                  <WidgetsOutlined fontSize='medium' />
                  {!pathname.includes('/followed-shops') ? (
                    <div className='tiny'>
                      Menu
                    </div>
                  ) : (
                    <span></span>
                  )}
                </div>
              </NavLink> */}

               {/* <NavLink to='/followed-shops'>
                <div className='bottom-cart-div'>
                  <FavoriteBorder fontSize='medium' />
                  {!pathname.includes('/followed-shops') ? (
                    <div className='tiny'>
                      Followed
                    </div>
                  ) : (
                    <span></span>
                  )}
                </div>
              </NavLink> */}

              
            </div>
          </div>
        </Fade>
      </nav>
    </div>
  );
}

export default BottomBar;
