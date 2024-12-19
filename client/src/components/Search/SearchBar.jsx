import React, { useState } from 'react';
import { ArrowLeft, Search } from 'lucide-react';
import TopSearching from './TopSearching';
import SearchResults from './SearchResults';

export default function SearchBart() {
    const [query, setQuery] = React.useState('');

    return (
        <div>
            <button
                onClick={() => document.getElementById('search_modal').showModal()}
                className='btn'>
                <Search />
                search category, brand...
            </button>

            <dialog id='search_modal' className='modal'>
                <div className='modal-box'>
                    <label className='input input-bordered flex items-center gap-2'>
                        <input type='text' className='grow' placeholder='Search' />
                        <Search size={16} />
                    </label>

                    {/* Search Result */}
                    <SearchResults query={query} />
                    {/* Top Searching */}
                    <TopSearching />
                </div>
                <form method='dialog' className='modal-backdrop'>
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );
}
