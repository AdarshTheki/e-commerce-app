import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const lists = [
    {
        name: 'feature',
        description: [
            'Multiple strap configurations',
            'Spacious interior with top zip',
            'Leather handle and tabs',
            'Interior dividers',
            'Stainless strap loops',
            'Double stitched construction',
            'Water-resistant',
        ],
    },
    {
        name: 'Care',
        description: [
            'Spot clean as needed',
            'Hand wash with mild soap',
            'Machine wash interior dividers',
            'Treat handle and tabs with leather conditioner',
        ],
    },
    {
        name: 'Shipping',
        description: [
            'Spot clean as needed',
            'Hand wash with mild soap',
            'Machine wash interior dividers',
            'Treat handle and tabs with leather conditioner',
        ],
    },
    {
        name: 'return',
        description: [
            'Spot clean as needed',
            'Hand wash with mild soap',
            'Machine wash interior dividers',
            'Treat handle and tabs with leather conditioner',
        ],
    },
];

const Lists = ({ name = '', description = [] }) => {
    const [selected, setSelected] = useState(false);
    return (
        <div className='border-b px-4 border-gray-300'>
            <button
                onClick={() => setSelected(!selected)}
                className={`font-extrabold capitalize hover:text-blue-600 pb-2 w-full text-lg flex items-center justify-between ${
                    selected ? 'text-blue-600' : 'text-gray-700'
                }`}>
                <span>{name}</span>
                <span>{selected ? <Minus /> : <Plus />}</span>
            </button>
            <ul className={`list-disc text-gray-600 px-8 ${!selected ? 'hidden' : ''}`}>
                {description.map((i) => (
                    <li key={i}>{i}</li>
                ))}
            </ul>
        </div>
    );
};

export default function DetailList() {
    return (
        <>
            {lists.map((item) => (
                <Lists key={item.name} {...item} />
            ))}
        </>
    );
}
