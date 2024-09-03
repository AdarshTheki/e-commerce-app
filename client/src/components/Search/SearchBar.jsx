import React, { useState } from 'react';
import { ArrowLeft, Search } from 'lucide-react';
import TopSearching from './TopSearching';
import SearchResults from './SearchResults';
import { useSearchQuery } from '../../redux/apiSlice';

export default function SearchBart() {
    const [open, setOpen] = useState(false);
    const dropdownRef = React.useRef(null);
    const [query, setQuery] = React.useState('');

    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggle = () => setOpen(!open);

    return (
        <div>
            <div
                onClick={toggle}
                className='border-2 hidden text-gray-600 sm:flex cursor-pointer hover:border-blue-600 items-center gap-3 rounded-lg px-5 py-2 w-[300px]'>
                <Search size={18} />
                <span className=''>search</span>
            </div>
            <Search
                size={26}
                onClick={toggle}
                className='hover:text-blue-600 cursor-pointer sm:hidden block'
            />
            {open && (
                <div className='inset-0 fixed z-50 bg-black bg-opacity-50 flex items-center justify-center'>
                    <div
                        ref={dropdownRef}
                        className='max-w-[850px] relative h-3/4 bg-white rounded-lg shadow-lg overflow-y-auto m-2'>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                console.log(e.target.query.value);
                                setQuery(e.target.query.value);
                            }}
                            className='sticky flex items-center shadow py-2 text-sm sm:px-4 top-0 bg-white w-full border'>
                            <div
                                onClick={() => setOpen(false)}
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
                        {/* Search Result */}
                        <SearchResults query={query} />
                        {/* Top Searching */}
                        <TopSearching />
                    </div>
                </div>
            )}
        </div>
    );
}
