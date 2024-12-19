import React, { useState } from 'react';

const cards = [
    {
        title: 'Forest Adventure',
        src: 'https://images.unsplash.com/photo-1518710843675-2540dd79065c?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
        title: 'Valley of life',
        src: 'https://images.unsplash.com/photo-1600271772470-bd22a42787b3?q=80&w=3072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
        title: 'Sala behta hi jayega',
        src: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?q=80&w=3070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
        title: 'Camping is for pros',
        src: 'https://images.unsplash.com/photo-1486915309851-b0cc1f8a0084?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
        title: 'The road not taken',
        src: 'https://images.unsplash.com/photo-1507041957456-9c397ce39c97?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
        title: 'The First Rule',
        src: 'https://assets.aceternity.com/the-first-rule.png',
    },
];

const FocusCard = () => {
    const [hovered, setHovered] = useState();

    return (
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto w-full'>
            {cards.map((card, index) => (
                <Card
                    key={card.title}
                    card={card}
                    index={index}
                    hovered={hovered}
                    setHovered={setHovered}
                />
            ))}
        </div>
    );
};

export default FocusCard;

// use memo used
const Card = ({ card, index, hovered, setHovered }) => {
    return (
        <div
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
            className={`
                rounded-lg relative bg-gray-100 dark:bg-neutral-900 overflow-hidden h-[200px] w-full transition-all duration-300 ease-out
                ${hovered !== null && hovered !== index && 'blur-sm scale-[0.98]'}
            `}>
            <img src={card.src} alt={card.title} className='object-cover absolute inset-0' />
            <div
                className={`
                    absolute inset-0 bg-black/50 flex items-end py-8 px-4 transition-opacity duration-300
                    ${hovered === index ? 'opacity-100' : 'opacity-0'}
                `}>
                <div className='text-xl md:text-2xl font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-200'>
                    {card.title}
                </div>
            </div>
        </div>
    );
};
