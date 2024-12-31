import React, { useState } from 'react';
import {
    useCategoryCreateMutation,
    useCategoryUpdateMutation,
    useBrandCreateMutation,
    useBrandUpdateMutation,
} from '../../redux/apiSlice';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Form = ({ type = 'category', ...rest }) => {
    const [data, setData] = useState({
        name: rest?.name || '',
        description: rest?.description || '',
    });
    const [image, setImage] = useState('');
    const [preview, setPreview] = useState(rest?.thumbnail || '');
    const [categoryCreate, { isLoading: one }] = useCategoryCreateMutation();
    const [categoryUpdate, { isLoading: two }] = useCategoryUpdateMutation();
    const navigate = useNavigate();

    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
        setPreview(URL.createObjectURL(event.target.files[0]));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Send the image to the server or perform other actions
        if (type === 'category') {
            if (!rest?._id) {
                const category = await categoryCreate({
                    name: data.name,
                    description: data.description,
                    thumbnail: image,
                });
                if (category.data) {
                    toast.success('create category success');
                } else if (category.error) {
                    toast.error('something wrong');
                }
            } else {
                const category = await categoryUpdate({
                    name: data.name,
                    description: data.description,
                    thumbnail: image,
                    _id: rest?._id,
                });
                if (category.data) {
                    toast.success('create category success');
                } else if (category.error) {
                    toast.error('something wrong');
                }
            }
            navigate(`/dashboard/category`);
        } else {
            alert('please enter a type of this components');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className='grid sm:grid-cols-2 gap-5'>
                    <div className='flex flex-col gap-5'>
                        <input
                            name='name'
                            type='text'
                            placeholder='Type here'
                            className='input input-bordered input-ghost w-full max-w-xs'
                            value={data.name}
                            onChange={handleChange}
                        />
                        <textarea
                            name='description'
                            className='textarea textarea-bordered textarea-ghost'
                            placeholder='Description'
                            onChange={handleChange}
                            value={data.description}></textarea>
                    </div>
                    <div className='flex flex-col gap-5'>
                        <input
                            onChange={handleImageChange}
                            type='file'
                            className='file-input file-input-bordered file-input-ghost w-full max-w-xs'
                        />
                        {preview && <img src={preview} alt='Uploaded Image' width={400} />}
                    </div>
                </div>
                <button className='btn btn-neutral mt-5'>Submit</button>
            </form>
        </div>
    );
};

export default Form;
