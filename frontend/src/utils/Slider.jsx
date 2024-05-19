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
        <div className='overflow-hidden py-5'>
            <Slider {...settings}>
                {images?.map((item, index) => (
                    <div key={index}>
                        <img src={item} alt={index} className=' min-h-[130px]'/>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default HeaderSlider;
