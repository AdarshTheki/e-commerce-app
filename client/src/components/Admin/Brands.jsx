import React from 'react';
import { useBrandListQuery } from '../../redux/apiSlice';
import { Pencil, Trash2 } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Brands = () => {
    const { data, isLoading, isError } = useBrandListQuery();

    if (isLoading) return <h2>Loading...</h2>;

    if (isError) return <h2>Error: {JSON.stringify(isError)}</h2>;

    return (
        <div>
            <h2 className='py-5 font-semibold'>All Brands</h2>
            <div className='overflow-x-auto'>
                <table className='table text-base-content'>
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Sr</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {data?.data?.map((item, index) => (
                            <tr key={item?._id}>
                                <td>{index + 1}</td>
                                <th className='flex gap-2 items-center'>
                                    <img
                                        src={item?.thumbnail}
                                        alt={index + 1 + 'image'}
                                        width={50}
                                    />
                                    <p>{item?.name}</p>
                                </th>
                                <td className='w-1/2'>{item?.description?.substring(0, 120)}...</td>
                                <td>
                                    <NavLink
                                        to={`/dashboard/brands/${item?._id}`}
                                        className='link-primary'>
                                        <Pencil size={18} />
                                    </NavLink>
                                </td>
                                <td>
                                    <button className='link-error'>
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Brands;
