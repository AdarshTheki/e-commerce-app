export default function AboutMe() {
    const skills = [
        'HTML/CSS',
        'Javascript',
        'React.js',
        'Node.js',
        'MongoDB',
        'Express.js',
        'Next.js',
        'Tailwind CSS',
        'Database (NoSQL)',
        'Rest API',
        'Responsive Deign',
        'Figma',
    ];
    const hobbies = [
        'Football',
        'Dogs',
        'Gaming',
        'Movies',
        'Travelling',
        'Surf',
        'Ice Skating',
        'The Witcher',
    ];
    return (
        <main className='text-gray-700 space-y-2'>
            <section className='bg-white p-4 rounded-lg shadow-lg space-y-3'>
                <div className='flex items-center gap-10'>
                    <img
                        src='https://res.cloudinary.com/dlf3lb48n/image/upload/v1724435726/i0t6x5otv6fenzm73bck.jpg'
                        alt='adarshverma'
                        className='h-[200px] rounded-full'
                    />
                    <ul>
                        <li className='mb-4 text-lg capitalize'>
                            <strong>Information about Owner</strong>
                        </li>
                        <li>
                            <strong>Name: </strong> Adarsh P. Verma
                        </li>
                        <li>
                            <strong>Address: </strong>
                            Plt. No. 706 Kachipura Ramdaspeth, Nagpur 440010, Maharashtra
                        </li>
                        <li>
                            <strong>Email: </strong>
                            <a
                                className='text-blue-600'
                                href='mailto:adarshverma549@gmail.com'
                                target='__blank'>
                                adarshverma549@gmail.com
                            </a>
                        </li>
                        <li>
                            <strong>Github: </strong>
                            <a
                                className='text-blue-600'
                                href='https://github.com/AdarshTheki'
                                target='__blank'>
                                @AdarshTheki
                            </a>
                        </li>
                        <li>
                            <strong>LinkedIn: </strong>
                            <a
                                className='text-blue-600'
                                href='https://www.linkedin.com/in/adarshvermadeveloper'
                                target='__blank'>
                                @adarshvermadeveloper
                            </a>
                        </li>
                    </ul>
                </div>
                <h2 className='font-bold'>About me</h2>
                <p>
                    With one year of experience as a front-end programmer specializing in Javascript
                    and React.js, I have a proven track record of delivering exceptional customer
                    experiences.
                </p>
                <p>
                    I excel at creating a collaborative work environment, problem-solving, and
                    ensuring customer satisfaction.
                </p>
            </section>
            <section className='sm:flex gap-5'>
                <div className='flex-1 bg-white p-4 rounded-lg shadow-lg'>
                    <h2 className='py-2 font-bold'>Skill</h2>
                    <div className=' flex flex-wrap gap-2'>
                        {skills.map((item) => (
                            <button
                                key={item}
                                className='p-2 rounded-lg bg-green-100 text-sm flex-1 text-nowrap font-bold text-green-600'>
                                {item}
                            </button>
                        ))}
                    </div>
                </div>
                <div className='flex-1 bg-white p-4 rounded-lg shadow-lg'>
                    <h2 className='py-2 font-bold'>Hobbies</h2>
                    <div className=' flex flex-wrap gap-2'>
                        {hobbies.map((item) => (
                            <button
                                key={item}
                                className='p-2 rounded-lg bg-blue-100 text-sm flex-1 text-nowrap font-bold text-blue-600'>
                                {item}
                            </button>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
