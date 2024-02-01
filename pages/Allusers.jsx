import React, { useState, useContext } from 'react';
import { useUsers } from '../hooks/useUser';
import MappedUsers from '../components/users/MappedUsers';
import Nav from '../components/partials/nav';
import BottomBar from '../components/partials/BottomBar';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { ChildFriendlyOutlined, PeopleAlt, Person, PersonAdd, Star } from '@mui/icons-material';
import LoadingChat from '../components/partials/loadingChat';
import { Fade } from 'react-reveal';
import Axios from 'axios';
import { useEffect } from 'react';
import swal from 'sweetalert';
import FollowedUsers from '../components/users/followedUsers';
import { useFetchFollowingUsers } from "../hook/useFollow";
import { userContext } from '../contexts/userContext';
import { useNavigate, useParams } from 'react-router-dom';


function Allusers(props) {
    const [search, setSearch] = useState('')
    const {id} = useParams()
    const userId = id
    const [isLoading, setIsLoading] = useState(false)
    const [users, setUsers] = useState([]);
    const [usersNoSearch, setUsersNoSearch] = useState([]);
    const [recentSearch, setRecentSearch] = useState([])
    const [userDetails, setuserDetails] = useContext(userContext)
    const { followingUsers, loading, error } = useFetchFollowingUsers(userId);

    useEffect(() => {
        if (localStorage.getItem('recentSearch')) {
            setRecentSearch(JSON.parse(localStorage.getItem('recentSearch')))
        }
    }, [])

    useEffect(() => {
        // Fetch users when the component mounts
        const fetchUsers = async () => {
            try {
                setIsLoading(true)
                const response = await Axios.get('http://localhost:4000/user/all-users');
                setUsers(response.data);
                setUsersNoSearch(response.data);
                console.log(response)
                setIsLoading(false)
            } catch (error) {
                console.error('Error fetching users:', error);
                setIsLoading(false)
                swal('Error fetching users!')
            }
        };

        fetchUsers();
    }, []);

    
    return (
        <div>
            <Nav />

            {
                isLoading ? <LoadingChat /> :
                    <div>
                        <Tabs>
                            <TabList className='subAdminTablist tiny'>
                                <Tab>Users <PeopleAlt fontSize='small' /></Tab>
                                <Tab>Followed <PersonAdd fontSize='small' /></Tab>
                            </TabList>

                            <TabPanels style={{ height: '80vh', overflowY: 'scroll' }}>
                                <TabPanel>
                                    <Fade>
                                        <MappedUsers users={users} recentSearch={recentSearch} setRecentSearch={setRecentSearch} setUsers={setUsers} usersNoSearch={usersNoSearch}/>
                                    </Fade>
                                </TabPanel>
                                <TabPanel>
                                    <Fade>
                                        <FollowedUsers followingUsers={followingUsers} loading={loading}/>
                                    </Fade>
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </div>
            }


            <BottomBar />
        </div>
    );
}

export default Allusers;