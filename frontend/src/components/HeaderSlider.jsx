import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { sliderImgs } from '../utils';

const HeaderSlider = () => {
    let settings = {
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <div className='w-full'>
            <Slider {...settings}>
                {sliderImgs?.map((item, index) => (
                    <div key={index}>
                        <img src={item} alt={index} />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default HeaderSlider;
