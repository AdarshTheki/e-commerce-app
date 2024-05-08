import React, { useState, useId } from 'react';
import { useNavigate } from 'react-router-dom';
import { toasts } from './index';

const HeaderSearch = () => {
    const [input, setInput] = useState('');
    const navigate = useNavigate();

    const onSubmit = () => {
        if (input.length > 3) {
            navigate(`/search/${input}`);
            setInput('');
        } else {
            toasts({ type: false, message: 'please enter inputs at least 3 char' });
        }
    };

    const id = useId();

    return (
        <>
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                type='text'
                id={id}
                placeholder='Search...'
                className='px-4 py-2 rounded-md bg-gray-800 text-white focus:outline-none'
            />
            <button
                onClick={onSubmit}
                className='ml-2 px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 focus:outline-none'>
                Search
            </button>
        </>
    );
};

export default HeaderSearch;
