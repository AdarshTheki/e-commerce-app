import React, { useState, useEffect, useRef } from 'react';

const LazyImage = ({ src, className = '', alt = 'img', ...props }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const imgRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const imgElement = entry.target;
                    imgElement.src = src;
                    imgElement.onload = () => setIsLoaded(true);
                    observer.unobserve(imgElement);
                }
            });
        });

        if (imgRef.current) {
            observer.observe(imgRef.current);
        }

        return () => {
            if (imgRef.current) {
                observer.unobserve(imgRef.current);
            }
        };
    }, [src]);

    return (
        <img
            ref={imgRef}
            alt={alt}
            {...props}
            className={`lazy-image ${className} ${isLoaded ? 'loaded' : ''}`}
            style={{ opacity: isLoaded ? 1 : 0 }}
        />
    );
};

export default LazyImage;
