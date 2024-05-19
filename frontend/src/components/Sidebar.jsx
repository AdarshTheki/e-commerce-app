import React from 'react';
import { IoCloseSharp } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';

import { setSidebar } from '../redux/uiSlice';
import { Button, logo, Search, Navigation, Categories } from '../utils';

const Sidebar = () => {
    const dispatch = useDispatch();
    const isSidebar = useSelector((state) => state.ui.isSidebar);

    return (
        <aside
            className={`bg-gray-900 text-gray-300 w-[250px] h-full fixed top-0 left-0 overflow-y-auto z-10 ${
                isSidebar ? '' : 'hidden'
            } sidebar scrollbar`}>
            <section className='py-4 flex items-center gap-2 justify-center'>
                <img src={logo[1]} alt='lgo' width={20} />
                <p className='text-white font-semibold '>ShopUp</p>
            </section>
            <section className='sm:hidden py-2 px-2'>
                <Search />
            </section>
            <section>
                <Navigation />
                <hr />
            </section>
            <section>
                <h1 className='text-white pl-4 py-2 font-semibold'>All Categories</h1>
                <Categories />
            </section>
            <Button
                Icon={<IoCloseSharp className='text-gray-200 font-bold text-xl' />}
                onClick={() => dispatch(setSidebar())}
                className='absolute top-2 right-2 hover:bg-gray-700'
            />
        </aside>
    );
};

export default Sidebar;
