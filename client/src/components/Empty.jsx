const NotFound = ({ message }) => {
    return (
        <div className='flex flex-col items-center gap-5 justify-center min-h-[300px] max-w-[600px] mx-auto'>
            <p className='text-2xl font-medium text-center'>Our e-commerce app, {message}</p>
            <p className='text-sm text-gray-600 text-center'>
                With a user-friendly interface and a variety of products to choose from, Your
                Product is Empty is the perfect destination for all your online shopping needs.
            </p>
        </div>
    );
};
export default NotFound;
