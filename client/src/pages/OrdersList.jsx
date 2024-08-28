import { ProductEmpty } from '../components';
import { Loader, formatPrice } from '../utils';
import { useOrderQuery } from '../redux/apiSlice';

export default function OrderHistory() {
    const { data, isLoading } = useOrderQuery();
    if (isLoading) return <Loader />;

    if (!data.length) return <ProductEmpty />;

    return (
        <>
            <h2 className='my-5 text-center font-semibold text-xl'>
                Explore customers all order lists
            </h2>
            <div className='grid gap-4 text-gray-700 max-w-screen-lg mx-auto'>
                {data?.map((order) => (
                    <OrderItem key={order._id} {...order} />
                ))}
            </div>
        </>
    );
}

function OrderItem({
    username,
    email,
    address,
    createdAt,
    items = [{ price: 0, name: '', quantity: 0, _id: '' }],
}) {
    const totals = items.reduce((prev, curr) => curr.price * curr.quantity + prev, 0);

    return (
        <div className='py-4 px-8 bg-white shadow'>
            <div className='flex items-center justify-between'>
                <h2 className='capitalize font-bold text-blue-600'>{username}</h2>
                <p className='text-sm'>{new Date(createdAt).toDateString()}</p>
            </div>
            <p>
                <strong>Email: </strong>
                {email}
            </p>
            <p>
                <strong>Address: </strong>
                {address}
            </p>
            <p className='mb-2'>
                <strong>Total: </strong>
                {formatPrice(totals / 80)}
            </p>
            <strong>Item lists:</strong>
            <ul className='list-disc list-inside'>
                {items.map((item) => (
                    <li key={item._id}>{item.name}</li>
                ))}
            </ul>
        </div>
    );
}
