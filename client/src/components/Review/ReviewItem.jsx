import React from 'react';
import ReviewForm from './ReviewForm';
import { EllipsisVertical } from 'lucide-react';
import { StarRating } from '../../utils';
import { useSelector } from 'react-redux';
import { useHandleDeleteReviewMutation } from '../../redux/apiSlice';
import toast from 'react-hot-toast';

export default function ReviewItem({ ...rest }) {
    const { _id, userId, rating, comment, date } = rest;
    const [edit, setEdit] = React.useState(false);
    const { user } = useSelector((state) => state.auth);
    const [handleDeleteReview, { isLoading }] = useHandleDeleteReviewMutation();

    async function handleDelete() {
        const res = await handleDeleteReview(_id);
        if (res.data) {
            toast.success('review item deleted');
        } else if (res.error) {
            toast.error('review item not deleted properly');
        }
    }

    if (edit) return <ReviewForm onClose={() => setEdit(false)} {...rest} />;

    return (
        <div className='p-2 flex gap-4 items-start border rounded-lg'>
            <h2 className='flex items-center text-center font-semibold bg-gray-300 justify-center uppercase border rounded-full h-10 w-12'>
                {userId?.username.slice(0, 1)}
            </h2>
            <div className='w-full relative'>
                <h2 className='capitalize font-medium'>{userId.username}</h2>
                {user?._id === userId?._id && (
                    <div tabIndex={20} className='absolute group right-0 top-0 focus:outline-none'>
                        <EllipsisVertical />
                        <div className='group-hover:grid shadow-lg group-focus:grid hidden text-base top-0 right-0 rounded-lg border absolute bg-white'>
                            <button
                                onClick={() => setEdit(true)}
                                className='py-2 px-3 hover:bg-gray-200'>
                                Edit
                            </button>
                            <button onClick={handleDelete} className='py-2 px-3 hover:bg-gray-200'>
                                Delete
                            </button>
                        </div>
                    </div>
                )}
                <StarRating rating={rating} />
                <p className=' text-gray-500 my-2 font-medium line-clamp-3'>
                    {comment} <br />
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero voluptatem
                    veritatis facilis ipsa velit, ad nostrum provident esse accusamus voluptas quia
                    veniam quaerat consequuntur quo quas aliquid ullam quidem debitis?
                </p>
                <p className='text-sm'>{new Date(date)?.toDateString()}</p>
            </div>
        </div>
    );
}
