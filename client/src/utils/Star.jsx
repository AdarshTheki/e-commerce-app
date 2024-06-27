import React from 'react';
import { Star as StarIcon } from 'lucide-react';

// StarRating component
const StarRating = ({ limit = 5, rating = 4, size = 16 }) => {
    const Star = ({ filled }) => {
        let color = filled ? '#facc15' : '#999';
        return (
            <>
                <StarIcon fill={color} color={color} size={size} />
            </>
        );
    };

    rating = rating.toFixed(1);

    return (
        <>
            <p className='flex gap-1 items-center'>
                {[...Array(limit)].map((_, index) => (
                    <Star key={index} filled={index < rating} />
                ))}
                <span className='ml-3'>
                    {rating}/{limit}
                </span>
            </p>
        </>
    );
};

export default StarRating;
