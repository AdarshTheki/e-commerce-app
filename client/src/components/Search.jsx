import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useSearchQuery } from '../redux/apiSlice';
import { NavLink } from 'react-router-dom';

const SearchComponent = ({ open, setOpen }) => {
    const dropdownRef = React.useRef(null);
    const [query, setQuery] = useState('');

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
    }, [dropdownRef, setOpen]);

    if (!open) return null;

    return (
        <div className='fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24'>
            <div className='fixed inset-0 bg-slate-900/25 backdrop-blur transition-opacity opacity-100'>
                {/*  Outside click to close */}
                <div
                    ref={dropdownRef}
                    className='relative max-w-lg mx-auto pt-10 transform px-4 transition-all opacity-100 scale-100'>
                    <div className='overflow-hidden rounded-lg bg-white shadow-md'>
                        {/* Search Product */}
                        <div className='relative'>
                            <input
                                className='block w-full appearance-none sm:text-xl bg-transparent py-4 pl-4 pr-12 text-base text-slate-900 placeholder:text-slate-600 focus:outline-none sm:leading-6'
                                placeholder='Find anything...'
                                type='text'
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            <Search className=' absolute top-3 right-10' />
                        </div>
                        {/* Product Container */}
                        {query.length ? (
                            <ProductContainer setIsOpen={setOpen} search={query} />
                        ) : null}
                        {/* Product listing */}
                        {/* Product NotFound  */}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default SearchComponent;

const ProductContainer = ({ search, setIsOpen }) => {
    const { data, isLoading } = useSearchQuery(search);

    if (isLoading)
        return <h2 className='px-16 py-20 text-center text-xl font-semibold'>Loading...</h2>;

    if (!data) {
        return (
            <div className='bg-slate-50 px-16 py-20 text-center'>
                <h2 className='font-semibold text-slate-900'>No results found</h2>
                <p className='mt-2 text-sm leading-6 text-slate-600'>
                    We can’t find anything with that term at the moment, try searching something
                    else.
                </p>
            </div>
        );
    }

    return (
        <div className='max-h-[18.375rem] divide-y divide-slate-200 overflow-y-auto rounded-b-lg border-t border-slate-200 text-sm leading-6'>
            {data.map((item) => (
                <NavLink
                    to={`/product/${item._id}`}
                    key={item._id}
                    onClick={() => setIsOpen(false)}
                    className='p-2 block hover:bg-gray-100 space-y-0'>
                    <p className='sm:text-lg font-semibold'>{item.title}</p>
                    <p className='text-gray-400'>brand / {item.brand}</p>
                </NavLink>
            ))}
        </div>
    );
};
