import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { ProductList } from '../components';
import { instance, toasts } from '../utils';

const Search = () => {
    const { searchTerm } = useParams();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchParams() {
            setLoading(true);
            try {
                const res = await instance.get('/products/search', {
                    params: {
                        q: searchTerm,
                    },
                });
                setData(res.data);
            } catch (error) {
                toasts({ type: false, message: 'you search item does not exists' });
            } finally {
                setLoading(false);
            }
        }
        fetchParams();
    }, [searchTerm]);

    if (!data || data.length === 0) {
        return (
            <div className='bg-white p-4 h-[300px] flex items-center justify-center flex-col'>
                <p className='text-gray-800 font-medium capitalize mb-5 text-2xl'>
                    Search "{searchTerm}"
                </p>
                <p className='text-gray-600 text-xl'>No products found.</p>
            </div>
        );
    }

    return (
        <div className='py-5 bg-gray-100'>
            <ProductList checkStatus={loading} name={`search "${searchTerm}"`} products={data} />
        </div>
    );
};

export default Search;
