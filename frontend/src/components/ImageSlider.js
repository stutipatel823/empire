// src/components/ImageSlider.js
import React, { useState } from 'react';
import '../styles/ImageSliderStyles.css';
import {ChevronLeftIcon, ChevronRightIcon} from '@heroicons/react/24/solid';

const ImageSlider = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Go to the next slide
    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    // Go to the previous slide
    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    return (
        <div className="custom-slider ">
            <div className="slider-wrapper">
                <button className="arrow left-arrow" onClick={prevSlide}>
                    <ChevronLeftIcon  className="h-8 w-8" />
                </button>
                <img
                    src={images[currentIndex]}
                    alt={`Slide ${currentIndex}`}
                    className="slider-image"
                />
                <button className="arrow right-arrow" onClick={nextSlide}>
                <ChevronRightIcon  className="h-8 w-8 font-extrabold" />
                </button>
            </div>
        </div>
    );
};

export default ImageSlider;
