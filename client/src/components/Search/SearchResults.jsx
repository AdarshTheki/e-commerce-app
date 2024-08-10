import React from 'react';
import { NavLink } from 'react-router-dom';

export default function SearchResults({ searchResults = [] }) {
    return (
        <div>
            {!searchResults.length && (
                <h2 className='py-10 pl-5'>Product not found! Please another topic search.</h2>
            )}
            {searchResults?.map((item) => (
                <NavLink
                    to={`/product/${item._id}`}
                    key={item._id}
                    className='py-1 hover:bg-gray-200 flex items-center gap-2 border-b'>
                    <img src={item.thumbnail} alt={item.title} className='max-h-6 ml-5' />
                    <span className='text-sm'>{item.title}</span>
                </NavLink>
            ))}
        </div>
    );
}
