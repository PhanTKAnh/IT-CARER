import React, { useEffect } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import $ from 'jquery';
import 'slick-carousel';
import FormSearch from '../../../components/Candidate/FormSearch';
import { useSettings } from '../../../context/SettingGsneral';
import { useMemo } from 'react';

function Slide() {
    const { settings } = useSettings();

    const slideImages = useMemo(() => {
        return settings?.sliderImages || [];
    }, [settings]);


    useEffect(() => {
        const $slider = $('.inner-slide');

        if ($slider.length && slideImages.length && !$slider.hasClass('slick-initialized')) {
            $slider.slick({
                dots: true,
                infinite: true,
                speed: 1000,
                autoplay: true,
                autoplaySpeed: 3000,
                fade: true,
                slidesToShow: 1,
                slidesToScroll: 1,
            });
        }

        return () => {
            if ($slider.length && $slider.hasClass('slick-initialized')) {
                $slider.slick('unslick');
            }
        };
    }, [slideImages]);
    return (
        <div className="slide-container">
            <FormSearch />
            <div className="inner-slide">
                {slideImages.length > 0 ? (
                    slideImages.map((img, index) => (
                        <img
                            key={index}
                            src={img}
                            alt={`Slide ${index + 1}`}
                            loading="lazy"
                        />
                    ))
                ) : (
                    <p style={{ textAlign: 'center', padding: '20px' }}>Đang tải slide...</p>
                )}
            </div>
        </div>
    );
}

export default Slide;
