import React, { useContext } from 'react';
import Nav from '../components/partials/nav';
import { menuWigets } from '../data';
import { ArrowForwardIos } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { userContext } from '../contexts/userContext';

function MenuPage(props) {
    // followed users page, profile page, followed users posts, make post, account balance page, send money page. 

    const [userDetails] = useContext(userContext)

    return (
        <div>
            <Nav />
            <div className="mt-2 mx-2">
                {
                    menuWigets.map((wiget, index) => (
                        <Link to={wiget.adOn ? `${wiget.link}${userDetails._id}` : wiget.link} key={index} >
                            <div className='shadow2 py-4 my-3 px-2 rounded flex_normal text-success'>
                                <div className="flex">
                                    <div className='ls'>
                                        {wiget.title}
                                    </div>
                                    <div className='mx-2'>
                                        {
                                            wiget.icon
                                        }
                                    </div>
                                </div>

                                <div>
                                    <ArrowForwardIos fontSize='small' />
                                </div>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </div>
    );
}

export default MenuPage;