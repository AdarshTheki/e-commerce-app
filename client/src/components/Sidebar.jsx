import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { X } from 'lucide-react';

import { setSidebar } from '../redux/uiSlice';
import { Button, logo, Search, Navigation, Categories } from '../utils';

const Sidebar = () => {
    const dispatch = useDispatch();
    const isSidebar = useSelector((state) => state.ui.isSidebar);

    return (
        <aside
            className={`bg-gray-900 pt-5 md:hidden pb-10 text-gray-300 w-[250px] h-full fixed top-0 left-0 overflow-y-auto z-40 ${
                isSidebar ? '' : 'hidden'
            } sidebar scrollbar`}>
            <section className='flex items-center gap-2 px-5'>
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
                leftIcon={<X />}
                onClick={() => dispatch(setSidebar())}
                className='absolute top-1 right-0 text-white'
            />
        </aside>
    );
};

export default Sidebar;
