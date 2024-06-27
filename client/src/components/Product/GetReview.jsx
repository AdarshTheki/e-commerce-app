import { Star as StarIcon, GripHorizontal, ThumbsUp, ThumbsDown, X } from 'lucide-react';
import { Star, toasts } from '../../utils';

import {
    useGetReviewsQuery,
    useHandleLikeMutation,
    useHandleDislikeMutation,
    useHandleDeleteReviewMutation,
} from '../../redux/apiSlice';
import { useSelector } from 'react-redux';
import NotFound from '../../assets/notFound.jpg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Reviews({ productId }) {
    const { data, isLoading } = useGetReviewsQuery(productId);

    if (isLoading)
        return (
            <h2 className='h-[300px] flex items-center justify-center font-medium'>Loading...</h2>
        );

    return (
        <>
            <div className='space-y-2 p-4 border rounded-lg max-w-[500px]'>
                <h2 className='font-semibold text-2xl'>Customer Reviews</h2>
                <div className='flex gap-2'>
                    <StarIcon fill='#facc15' color='#facc15' size={18} />
                    <span>4 out of 5 stars Based on 1624 reviews</span>
                </div>
                <div className='grid gap-2'>
                    {[33, 10, 24, 12, 76].map((num, index) => (
                        <div
                            key={index}
                            className='text-gray-800 flex sm:text-lg gap-4 items-center font-semibold'>
                            <p>{index + 1}</p>
                            <StarIcon fill='#facc15' color='#facc15' size={18} />
                            <div className='border bg-gray-100 rounded-lg w-3/4'>
                                <div
                                    className='p-1 bg-[#facc15] rounded-lg'
                                    style={{ width: `${num}%` }}></div>
                            </div>
                            <p className='text-nowrap'>{num} %</p>
                        </div>
                    ))}
                </div>
            </div>
            {/* User Reviews */}
            <div className='grid sm:grid-cols-2 gap-3'>
                <div className='p-2 flex gap-4 items-start border rounded-lg'>
                    <img
                        src='https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixqx=oilqXxSqey&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                        alt='person'
                        className='w-16 rounded-full bg-center'
                    />
                    <div>
                        <div className=' flex items-center justify-between'>
                            <h2 className='text-xl capitalize font-semibold'>Temp User</h2>

                            <GripHorizontal className='cursor-pointer' />
                        </div>
                        <p>March 06, 2024</p>
                        <Star rating={5} />
                        <p className=' text-gray-500 my-2 font-medium sm:line-clamp-2 line-clamp-4'>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis
                            laboriosam quibusdam ipsum nesciunt eius blanditiis sequi nulla aliquid
                            saepe sed?
                        </p>
                        <div className='flex text-sm items-center gap-8'>
                            <button className='flex items-center gap-1'>
                                <ThumbsUp size={18} />
                                #NA
                            </button>
                            <button className='flex items-center gap-1'>
                                <ThumbsDown size={18} />
                                #NA
                            </button>
                        </div>
                    </div>
                </div>
                {data && data?.length
                    ? data?.map((item) => <LikeManage key={item._id} {...item} />)
                    : null}
            </div>
        </>
    );
}

const LikeManage = ({ _id, userId, updatedAt, star, comment, likes, dislikes }) => {
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const [like, setLike] = useState(user?.likedReviews?.includes(_id));
    const [dislike, setDislike] = useState(user?.dislikedReviews?.includes(_id));

    const [handleLike] = useHandleLikeMutation();
    const [handleDislike] = useHandleDislikeMutation();
    const [handleDeleteReview] = useHandleDeleteReviewMutation();

    const onDeleteReview = async (id) => {
        try {
            const res = await handleDeleteReview(id);
            if (res.data.message) {
                toasts({ message: 'User deleted review Successfully \nPlease refresh page' });
            }
        } catch (error) {
            toasts({ type: false, message: 'Internal Server Error' });
        }
    };

    const onLike = async () => {
        try {
            if (!user) return navigate('/login');
            const res = await handleLike(_id);
            if (res.data) {
                toasts({ message: 'User Liked Review' });
                setLike(true);
                setDislike(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const onDislike = async () => {
        try {
            if (!user) return navigate('/login');
            const res = await handleDislike(_id);
            if (res.data) {
                toasts({ message: 'User Disliked Review' });
                setDislike(true);
                setLike(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='p-2 flex gap-4 items-start border rounded-lg'>
            <div className='w-16'>
                <img
                    src={NotFound}
                    alt='person'
                    className='w-full h-16 rounded-full bg-center object-contain'
                />
            </div>
            <div className='w-full'>
                <div className=' flex items-center justify-between'>
                    <h2 className='text-xl capitalize font-semibold'>{userId.username}</h2>
                    {user?._id === userId._id ? (
                        <button
                            className='bg-red-600 p-1 rounded-lg hover:bg-red-800 text-white'
                            onClick={() => onDeleteReview(_id)}>
                            <X />
                        </button>
                    ) : (
                        <GripHorizontal className='cursor-pointer' />
                    )}
                </div>
                <p>{updatedAt}</p>
                <Star rating={star} />
                <p className=' text-gray-500 my-2 font-medium sm:line-clamp-2 line-clamp-4'>
                    {comment}.
                </p>
                <div className='flex text-sm items-center gap-8'>
                    <button onClick={onLike} className='flex items-center gap-1'>
                        <ThumbsUp fill={`${like ? '#0096c7' : '#fff'}`} strokeWidth={1} />
                        {likes}
                    </button>
                    <button onClick={onDislike} className='flex items-center gap-1'>
                        <ThumbsDown fill={`${dislike ? '#0096c7' : '#fff'}`} strokeWidth={1} />
                        {dislikes}
                    </button>
                </div>
            </div>
        </div>
    );
};
