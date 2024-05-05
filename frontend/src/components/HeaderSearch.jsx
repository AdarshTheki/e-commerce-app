import React from 'react';

const HeaderSearch = () => {
    return (
        <>
            <input
                type='text'
                placeholder='Search...'
                className='px-4 py-2 rounded-md bg-gray-800 text-white focus:outline-none'
            />
            <button className='ml-2 px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 focus:outline-none'>
                Search
            </button>
        </>
    );
};

export default HeaderSearch;
