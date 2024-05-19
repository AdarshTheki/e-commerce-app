import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toasts } from './index';
import { useForm } from 'react-hook-form';

const HeaderSearch = () => {
    const navigate = useNavigate();
    const { handleSubmit, register, reset } = useForm();

    const onSubmit = (data) => {
        if (data?.search?.length >= 3) {
            navigate(`/search/${data?.search}`);
            reset();
        } else {
            toasts({ type: false, message: 'please enter inputs at least 3 char' });
        }
    };

    return (
        <form className='flex flex-wrap items-center gap-2' onSubmit={handleSubmit(onSubmit)}>
            <input
                placeholder='search items...'
                {...register('search', {
                    required: true,
                })}
                autoComplete='off'
                type='text'
                className='px-5 py-2 rounded-md border border-gray-400 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-gray-800 font-medium'
            />
            <button className='bg-gray-800 text-white font-medium hover:bg-gray-700 px-4 py-2 rounded cursor-pointer border border-gray-400 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'>
                Search
            </button>
        </form>
    );
};

export default HeaderSearch;
