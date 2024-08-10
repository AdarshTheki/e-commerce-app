import React from 'react';
import { Star } from 'lucide-react';

// StarRating component
const StarRating = ({ limit = 5, rating = 4, size = 16 }) => {
    const StarPrint = ({ filled }) => {
        let color = filled ? '#facc15' : '#999';
        return <Star fill={color} color={color} size={size} />;
    };

    return (
        <p className='flex gap-1 items-center'>
            {[...Array(limit)].map((_, index) => (
                <StarPrint key={index} filled={index < rating} />
            ))}
        </p>
    );
};

export default StarRating;
