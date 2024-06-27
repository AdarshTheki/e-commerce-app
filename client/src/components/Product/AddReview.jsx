import { Star } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHandleAddReviewMutation } from '../../redux/apiSlice';
import { toasts } from '../../utils';
import { useNavigate } from 'react-router-dom';

const AddReview = ({ productId, user }) => {
    const navigate = useNavigate();
    const [hover, setHover] = useState(0);
    const [rating, setRating] = useState(0);
    const { register, handleSubmit, formState, reset } = useForm();
    const [handleAddReview, { isLoading }] = useHandleAddReviewMutation();

    const onSubmit = async (data) => {
        try {
            if (!rating) return toasts({ type: false, message: 'Please select value of stars' });
            if (!user) return navigate('/');
            const res = await handleAddReview({ productId, star: rating, comment: data.comment });
            if (res.data?.star) {
                toasts({ message: 'reviews added successful' });
                reset();
                setRating(0);
                setHover(0);
            }
        } catch (error) {
            toasts({ type: false, message: error.message || 'Internal server error' });
        }
    };

    function handleClick(getCurrentIndex) {
        setRating(getCurrentIndex);
    }
    function handleMouseEnter(getCurrentIndex) {
        setHover(getCurrentIndex);
    }
    function handleMouseLeave() {
        setHover(rating);
    }

    return (
        <div className='text-xl font-light max-w-lg border p-4 rounded-lg'>
            <form
                className='w-full flex flex-col items-center justify-between'
                onSubmit={handleSubmit(onSubmit)}>
                <h2>Select Stars</h2>
                <div className='flex items-center gap-2'>
                    {[...Array(5)].map((_, index) => {
                        index += 1;
                        return (
                            <Star
                                className='cursor-pointer duration-150 ease-out'
                                key={index}
                                fill={index <= (hover || rating) ? '#FFA534' : '#FFF'}
                                color='#FFA534'
                                onClick={() => handleClick(index)}
                                onMouseEnter={() => handleMouseEnter(index)}
                                onMouseLeave={handleMouseLeave}
                                size={30}
                            />
                        );
                    })}
                </div>
                <br />
                <label htmlFor='message' className='block mb-2'>
                    Your Message
                </label>
                <textarea
                    {...register('comment', { required: true, minLength: 10, maxLength: 200 })}
                    id='comment'
                    rows='3'
                    className='block text-base p-2.5 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    placeholder='Write your thoughts here...'></textarea>
                {formState?.errors.comment ? (
                    <p className='text-sm text-red-500'>
                        Enter valid range with 10 to 200 at least?
                    </p>
                ) : null}
                <button
                    type='submit'
                    className='mt-5 p-2 bg-gray-800 text-white rounded px-6 hover:bg-gray-700'>
                    {isLoading ? 'Loading...' : 'Submit'}
                </button>
            </form>
        </div>
    );
};

export default AddReview;
