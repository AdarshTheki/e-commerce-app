import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, toasts } from './index';
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
                className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 px-2.5 py-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            />
            <Button className='bg-gray-700 hover:bg-gray-600'>Search</Button>
        </form>
    );
};

export default HeaderSearch;
