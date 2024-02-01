import { NotificationAddOutlined } from '@mui/icons-material';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Nav from '../components/partials/nav';
import { Post, View } from '../Assets/icons';
import { Fade } from 'react-reveal';

function Moments(props) {
    const { id } = useParams()
    return (
        <div>
            <Nav />
            <Fade>
                <div className='center-page'>
                    <div className="straight my-4">
                        <Link to={`/create-moment/${id}`}>
                            <div
                                style={{ width: '300px ', fontSize: '14px' }}
                                className='border border-success text-success straight flex-column py-4 rounded'
                            >
                                <div className='ls'>
                                    CREATE MOMENT
                                </div>
                                <Post size='23' />
                            </div>

                        </Link>
                    </div>
                    <div className="straight my-4">
                        <Link to={`/explore-moments/${id}`}>
                            <div
                                style={{ width: '300px ', fontSize: '14px' }}
                                className='border border-success text-success straight flex-column py-4 rounded'
                            >
                                <div className='ls'>
                                    EXPLORE MOMENTS
                                </div>
                                <View size='23' />
                            </div>

                        </Link>
                    </div>
                </div>
            </Fade>
        </div>
    );
}

export default Moments;