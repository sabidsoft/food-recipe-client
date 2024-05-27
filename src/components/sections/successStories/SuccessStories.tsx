import CountUp from 'react-countup';

const SuccessStories = () => {
    return (
        <section className="bg-gray-100 py-16">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-8">Success Stories</h2>
                <div className="flex flex-col md:flex-row justify-around items-stretch">
                    <div className="w-full md:w-1/2 p-4 flex">
                        <div className="bg-white p-8 rounded-lg shadow-lg flex-grow">
                            <div className="text-center mb-5">
                                <CountUp
                                    end={1000}
                                    duration={5}
                                    className='text-3xl font-semibold'
                                />
                                <p className='inline-block ml-1 font-medium'>Recipes</p>
                            </div>
                            <h2 className="text-lg font-semibold mb-4">Discover Delicious Recipes</h2>
                            <p className="text-gray-700 mb-4 text-justify">
                                Discover a treasure trove of 1,000 delicious recipes! Whether you're a beginner or seasoned chef, our platform offers something for everyone. Explore easy-to-follow recipes for mouth-watering appetizers, hearty main courses, and decadent desserts. Join our community today to unlock a world of flavors, tips, and inspiration. Start your culinary adventure with us and turn every meal into a celebration!
                            </p>
                        </div>
                    </div>

                    <div className="w-full md:w-1/2 p-4 flex">
                        <div className="bg-white p-8 rounded-lg shadow-lg flex-grow">
                            <div className="text-center mb-5">
                                <CountUp
                                    end={500}
                                    duration={5}
                                    className='text-3xl font-semibold'
                                />
                                <p className='inline-block ml-1 font-medium'>Users</p>
                            </div>
                            <h2 className="text-lg font-semibold mb-4">Join Our Community</h2>
                            <p className="text-gray-700 mb-4 text-justify">
                                Become a part of our vibrant community of food lovers and culinary creators. With thousands of satisfied users, our platform is the perfect place to share your favorite recipes, gain inspiration, and connect with fellow cooking enthusiasts. Register now to contribute your culinary masterpieces and enjoy exclusive access to a wealth of cooking tips, tricks, and recipes. Share your passion for food and grow with us!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SuccessStories;
