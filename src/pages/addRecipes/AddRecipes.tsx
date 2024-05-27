import { useState, ChangeEvent, FormEvent } from 'react';
import { useAppSelector } from '../../redux/app/hooks';
import { useCreateRecipeMutation } from '../../redux/features/api/recipeApi/recipeApi';
import { Recipe } from './types';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/loader/Loader';

export default function AddRecipes() {
    const [name, setName] = useState<string>('');
    const [image, setImage] = useState<File | null>(null);
    const [details, setDetails] = useState<string>('');
    const [video, setVideo] = useState<string>('');
    const [country, setCountry] = useState<string>('');
    const [category, setCategory] = useState<string>('Beef');
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const user = useAppSelector(state => state.auth.user);
    const [createRecipe] = useCreateRecipeMutation();


    // handle form submit
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setIsLoading(true);

        if (!image) {
            alert('Please select an image');
            return;
        }

        // Upload image to imgbb
        const formData = new FormData();
        formData.append('image', image);

        const imgbbApiKey = '8a7418b5dec829261b316efd94876233';
        const response = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, {
            method: 'POST',
            body: formData
        });

        const data = await response.json();
        const imageUrl = data.data.url;

        const recipe: Recipe = {
            recipeName: name,
            recipeImage: imageUrl,
            recipeDetails: details,
            embededYoutubeVideoCode: video,
            country,
            category,
            creatorEmail: user?.email || '',
            watchCount: 0,
            purchased_by: []
        };

        // Send recipe to server
        createRecipe(recipe);

        setIsLoading(false)
        navigate('/recipes');
    };

    // handleImageChange
    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setImage(event.target.files[0]);
        }
    };

    if (isLoading)
        return <Loader />;

    return (
        <>
            <h1 className="text-4xl font-bold text-center pt-16 bg-gray-100">Add Recipe</h1>
            <div className="flex justify-center items-center pb-16 pt-8 bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                    <h2 className="text-xl font-semibold mb-6">Add a New Recipe</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700">Recipe Name:</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-3 py-2 border rounded"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700">Recipe Image:</label>
                            <input
                                type="file"
                                onChange={handleImageChange}
                                accept="image/*"
                                className="w-full px-3 py-2 border rounded"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700">Recipe Details:</label>
                            <textarea
                                value={details}
                                onChange={(e) => setDetails(e.target.value)}
                                className="w-full px-3 py-2 border rounded"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700">Embeded YouTube Video Code:</label>
                            <input
                                type="text"
                                value={video}
                                onChange={(e) => setVideo(e.target.value)}
                                className="w-full px-3 py-2 border rounded"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700">Country:</label>
                            <input
                                type="text"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                className="w-full px-3 py-2 border rounded"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700">Category:</label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full px-3 py-2 border rounded"
                                required
                            >
                                <option value="Beef">Beef</option>
                                <option value="Chicken">Chicken</option>
                                <option value="Mutton">Mutton</option>
                                <option value="Vegetable">Vegetable</option>
                                <option value="Seafood">Seafood</option>
                                <option value="Salad">Salad</option>
                                <option value="Soup">Soup</option>
                                <option value="Snack">Snack</option>
                                <option value="Burger">Burger</option>
                                <option value="Noodles">Noodles</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};
