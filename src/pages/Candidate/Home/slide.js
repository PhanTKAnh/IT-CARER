import React, { useEffect } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import $ from 'jquery';
import 'slick-carousel';

function Slide() {
    useEffect(() => {
        // Đảm bảo Slick chỉ chạy khi component đã render
        const $slider = $('.inner-slide');

        if ($slider.length) {
            $slider.slick({
              dots: true,
              infinite: true,
              speed: 1000,  // Thời gian chuyển động của mỗi slide
              autoplay: true,  // Bật chế độ tự động
              autoplaySpeed: 3000,  // Thời gian giữa các lần chuyển slide (3000ms = 3 giây)
              fade: true,   // Thêm hiệu ứng fade chuyển slide
              slidesToShow: 1,
              slidesToScroll: 1,
            });
          }

        // Clean up slick initialization when component unmounts
        return () => {
            if ($slider.length) {
                $slider.slick('unslick');
            }
        };
    }, []);

    return (
        <div className="inner-slide">
            <img src="https://static.careerlink.vn/web/images/covers/banner_zalo_oa.jpg" className="slick-lazyload-error" />
            <img src="https://static.careerlink.vn/web/images/covers/mobile_app.jpeg" className="slick-lazyload-error" />
            <img src="https://static.careerlink.vn/web/images/covers/mobile_app.jpeg" className="slick-lazyload-error" />

        </div>
    );
}

export default Slide;
