import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const HeaderSlider = ({ images = [] }) => {
    let settings = {
        autoplay: true,
        autoplaySpeed: 2000,
        arrow: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
    };

    return (
        <div className='pb-10 overflow-hidden'>
            <Slider {...settings}>
                {images?.map((item, index) => (
                    <div key={index}>
                        <img src={item} alt={index} className=' h-[140%]' />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default HeaderSlider;
