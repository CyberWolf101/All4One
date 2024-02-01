import { ArrowCircleLeft } from '@mui/icons-material';
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Avatar } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

function MomentsViewPage({ moments, currentMoment, setViewMoments, id }) {
  const nav = useNavigate()
  const filteredMoments = moments.filter((moment) => moment.userId !== id);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const selectedIndex = filteredMoments.findIndex((moment) => moment._id === currentMoment._id);

  return (
    <div>
      <div
       onClick={() => setViewMoments(false)}
       className='btn btn-sm btn-outline-success m-1'
       >
        <ArrowCircleLeft />
      </div>

      <div style={{ width: '100%', float: 'right' }} >
        <Slider {...settings} initialSlide={selectedIndex}>
          {filteredMoments.map((moment) => (
            <div key={moment._id} className='position-relative'>

              <img src={moment.mediaUrl} alt={moment.caption} />

              <div className='moments-user'>
                <div className="flex" onClick={() => nav(`/user/profile/${moment.userId}`)}>
                  <Avatar size='sm' />
                  <div className="text-success ls mx-1 small">
                    {moment.userName}
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

export default MomentsViewPage;
