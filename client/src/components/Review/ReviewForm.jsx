import { Star } from 'lucide-react';
import { useState } from 'react';
import { useHandleAddReviewMutation } from '../../redux/apiSlice';
import { useHandleUpdateReviewMutation } from '../../redux/apiSlice';
import { toast } from 'react-hot-toast';

export default function ReviewForm({ id, onClose, ...item }) {
    const [data, setData] = useState({
        rating: item?.rating || null,
        comment: item?.comment || '',
    });

    const [handleAddReview, { isLoading }] = useHandleAddReviewMutation();
    const [handleUpdateReview, { isLoading: updating }] = useHandleUpdateReviewMutation();

    const handleSubmit = async () => {
        const { comment, rating } = data;
        if (!item?._id) {
            // create new review with productId
            const res = await handleAddReview({ productId: id, comment, rating });
            if (res.data) {
                toast.success('review created');
            } else if (res.error) {
                toast.error('review not created');
            }
        } else {
            // update review with reviewId
            const res = await handleUpdateReview({ reviewId: item?._id, comment, rating });
            if (res.data) {
                toast.success('review updated');
            } else if (res.error) {
                toast.error('review not updated');
            }
        }
        setData({ comment: '', rating: null });
        onClose();
    };

    const StarRating = () => {
        return (
            <div className='flex items-center gap-2'>
                {[...Array(5)].map((_, index) => {
                    index += 1;
                    return (
                        <Star
                            className='cursor-pointer duration-150 ease-out'
                            key={index}
                            fill={index <= data.rating ? '#FFA534' : '#FFF'}
                            color='#FFA534'
                            onClick={() => setData({ ...data, rating: index })}
                            size={24}
                        />
                    );
                })}
            </div>
        );
    };

    return (
        <div className='inset-0 w-full fixed z-40 bg-black bg-opacity-30 flex items-center justify-center'>
            <div className='flex flex-col gap-5 items-center w-full max-w-[400px] p-10 rounded-lg justify-between bg-white'>
                <p>Please write a review</p>
                <StarRating />
                <textarea
                    required={true}
                    minLength={10}
                    maxLength={300}
                    onChange={(e) => setData({ ...data, comment: e.target.value })}
                    value={data.comment}
                    id='comment'
                    rows='2'
                    className='w-full p-5 rounded-lg shadow border'
                    placeholder='Write your thoughts here...'></textarea>
                <div className='flex w-full gap-4'>
                    <button
                        onClick={handleSubmit}
                        type='submit'
                        className='w-full py-2 bg-gray-800 text-white rounded-lg hover:bg-opacity-80'>
                        {isLoading ? 'Loading...' : 'Submit'}
                    </button>
                    <button
                        onClick={onClose}
                        type='submit'
                        className='w-full py-2 bg-red-700 text-white rounded-lg hover:bg-opacity-80'>
                        {updating ? 'Loading...' : 'Close'}
                    </button>
                </div>
            </div>
        </div>
    );
}
