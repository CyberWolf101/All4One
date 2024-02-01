import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Avatar } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { ArrowCircleLeft } from '@mui/icons-material';
import Slider from 'react-slick';

function UserChannels({ channels, currentChannel, setViewUserChannels, id }) {
    const nav = useNavigate()
    const filteredChannels = channels.filter((moment) => moment.userId === id);
    const selectedIndex = filteredChannels.findIndex((moment) => moment._id === currentChannel._id);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <div>
            <div
                onClick={() => setViewUserChannels(false)}
                className='btn btn-sm btn-outline-success m-1'
            >
                <ArrowCircleLeft />
            </div>

            <div style={{ width: '100%', float: 'right' }} >
                <Slider {...settings} initialSlide={selectedIndex}>
                    {filteredChannels.map((moment) => (
                        <div key={channel._id} className='position-relative'>

                            <img src={channel.mediaUrl} alt={channel.caption} />

                            <div className='channels-user'>
                                <div className="flex" onClick={() => nav(`/user/profile/${channel.userId}`)}>
                                    <Avatar size='sm' />
                                    <div className="text-success ls mx-1 small">
                                        {channel.userName}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
}

export default UserChannels;