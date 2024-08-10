import React from 'react';
import { ArrowLeft } from 'lucide-react';
import TopSearching from './TopSearching';
import SearchResults from './SearchResults';
import { useSearchQuery } from '../../redux/apiSlice';

export default function SearchBart({ setOpen }) {
    const dropdownRef = React.useRef(null);
    const [query, setQuery] = React.useState('');
    const { data } = useSearchQuery(query);

    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [setOpen]);

    return (
        <div className='inset-0 fixed z-50 bg-black bg-opacity-30 flex items-center justify-center'>
            <div
                ref={dropdownRef}
                className='max-w-[600px] relative h-3/4 bg-white rounded-lg shadow-lg overflow-y-auto m-2'>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        console.log(e.target.query.value);
                        setQuery(e.target.query.value);
                    }}
                    className='sticky flex items-center shadow py-2 text-sm sm:px-4 top-0 bg-white w-full border'>
                    <div
                        onClick={() => setOpen()}
                        className='min-w-8 cursor-pointer hover:bg-gray-200 p-2'>
                        <ArrowLeft />
                    </div>
                    <input
                        autoComplete='off'
                        type='text'
                        name='query'
                        className='border outline-none border-gray-600 py-2 px-5 rounded-s-full w-full max-w-[300px]'
                    />
                    <button
                        type='submit'
                        className='bg-gray-800 h-[38px] hover:bg-opacity-80 px-4 rounded-e-full text-white'>
                        Search
                    </button>
                </form>
                <p className='py-2 pl-5'>
                    {query !== '' ? `Searching result is "${query}"` : 'Top searching products'}
                </p>
                {/* Search Result */}
                <SearchResults searchResults={data} />
                <p className='py-2 pl-5'>Top Products</p>
                {/* Top Searching */}
                <TopSearching />
            </div>
        </div>
    );
}
