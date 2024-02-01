import { ArrowCircleLeft } from '@mui/icons-material';
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Avatar } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

function ChannelsViewPage({ channels, currentChannel, setViewChannels, id }) {
  const nav = useNavigate()
  const filteredChannels = channels.filter((channel) => channel.userId !== id);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const selectedIndex = filteredChannels.findIndex((channel) => channel._id === currentChannel._id);

  return (
    <div className=''>
      <div
       onClick={() => setViewChannels(false)}
       className='btn btn-sm btn-outline-success m-1'
       >
        <ArrowCircleLeft />
      </div>

      <div style={{ width: '100%', float: 'right', height:'100dvh', background:'#2D3748' }} >
        <Slider {...settings} initialSlide={selectedIndex} style={{margin:'0px', background:'red', width:'100%', paddingRight:'10px', paddingLeft:'10px'}}>
          {filteredChannels.map((channel) => (
            <div key={channel._id} className='position-relative'>

              <img src={channel.mediaUrl} alt={channel.caption} />

              <div className='moments-user'>
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

export default ChannelsViewPage;
