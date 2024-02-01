import { ArrowCircleLeft } from '@mui/icons-material';
import React from 'react';
import { Fade } from 'react-reveal';
import { userContext } from '../../../contexts/userContext';
import { useContext } from 'react';
import { format } from 'date-fns';

function Info({ setCurrentView }) {
    const [userDetails, setuserDetails] = useContext(userContext)

    return (
        <div>
            <div className='bg-white rounded p-2'>
                <Fade>
                    <div className="grid3">
                        <div onClick={() => setCurrentView('')}
                            style={{ color: 'teal' }}
                            className='rounded-pill py-2'
                        >
                            <ArrowCircleLeft />
                        </div>

                        <div className='tiny text-teal straight'>
                            INFO
                        </div>
                    </div>
                    <br />
                    <div>
                        <div>
                            <div className="tiny faint">Name</div>
                            <div className="tiny text-teal fw-bold" style={{ letterSpacing: '1px' }}>{userDetails.firstName + " " + userDetails.lastName}</div>
                        </div>
                        <hr />
                        <div>
                            <div className="tiny faint">Username</div>
                            <div className="tiny text-teal fw-bold" style={{ letterSpacing: '1px' }}>{userDetails.userName}</div>
                        </div>
                        <hr />
                        <div>
                            <div className="tiny faint">Gender</div>
                            <div className="tiny text-teal fw-bold" style={{ letterSpacing: '1px' }}>{userDetails.sex}</div>
                        </div>
                        <hr />
                        <div>
                            <div className="tiny faint">Joined</div>
                            <div className="tiny text-teal fw-bold" style={{ letterSpacing: '1px' }}>{userDetails.joined && format(userDetails.joined, "do MMMM yyyy")}</div>
                        </div>
                        <hr />
                    </div>
                </Fade>
            </div>
        </div>
    );
}

export default Info;