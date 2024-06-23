import React from 'react';
import { useParams } from 'react-router-dom';

import ItemList from '../components/ItemList';
import { useSearchQuery } from '../redux/apiSlice';

const Search = () => {
    const { searchTerm } = useParams();
    const { data, isLoading } = useSearchQuery();

    return (
        <div className='py-5 bg-gray-100'>
            <ItemList checkStatus={isLoading} name={searchTerm} products={data} />
        </div>
    );
};

export default Search;
