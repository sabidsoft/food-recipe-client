/* eslint-disable no-restricted-globals */
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useTitle from "../../hooks/useTitle";
import { useGetRecipeQuery } from "../../redux/features/api/recipeApi/recipeApi";
import Loader from "../../components/loader/Loader";
import ErrorMessage from "../../components/errorMessage/ErrorMessage";
import { useEffect, useRef } from "react";
import { useAppSelector } from "../../redux/app/hooks";
import { toast } from "react-toastify";
import { usePurchasedRecipeMutation } from "../../redux/features/api/userApi/userApi";

export default function Recipe() {
    useTitle('Recipe');
    const navigate = useNavigate();
    const location = useLocation();
    const { recipeId } = useParams();
    const { data, isLoading, isError } = useGetRecipeQuery(recipeId as string);
    const user = useAppSelector(state => state.auth.user);
    const [updateRecipeCreatorCoin] = usePurchasedRecipeMutation();
    const toastShownRef = useRef(false);
    const confirmationShownRef = useRef(false);

    const recipe = data?.data?.recipe;

    console.log(recipe);

    const userId = user?._id || "";
    const email = user?.email;

    useEffect(() => {
        const checkCoins = async () => {
            if (!recipe || !user) return;

            const coin = Number(user.coin);

            if (coin < 10 && !toastShownRef.current) {
                toast.warn('You have not enough coin, please buy coin to see the recipe.');
                navigate('/purchase-coin', { state: location });
                toastShownRef.current = true;
            }

            if (coin >= 10 && !recipe.purchased_by.includes(email as string) && !confirmationShownRef.current) {
                confirmationShownRef.current = true;
                const answer = confirm('You have to expense 10 coins to see this recipe. Do you want to proceed?');
                if (answer) {
                    if (recipe.creatorEmail && recipe._id) {
                        await updateRecipeCreatorCoin({ userId, recipeId: recipe._id, creatorEmail: recipe.creatorEmail });
                    }
                } else {
                    navigate('/recipes');
                }
            }
        }

        checkCoins();
    }, [recipe, user, navigate, location, updateRecipeCreatorCoin, userId, email]);

    if (isLoading) return <Loader />;

    if (!isLoading && isError) return <ErrorMessage message="Something went wrong." />;

    if (!recipe) return <ErrorMessage message="Recipe not found." />;

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="w-full md:w-[80%] lg:w-[65%] xl:w-[50%] mx-auto py-16 px-5">
                <h1 className="text-4xl font-bold text-center pb-8">{recipe.recipeName}</h1>
                <img
                    src={recipe.recipeImage}
                    alt={recipe.recipeName}
                    className="rounded mb-8 w-full h-[500px] object-cover"
                />
                <p className="mb-16"><span className="text-lg font-bold">Recipe Details: </span>{recipe.recipeDetails}</p>

                <h3 className="text-2xl font-semibold text-center mb-4">Video Tutorial</h3>
                <div className="flex justify-center">
                    <iframe
                        width="560"
                        height="315"
                        src={`https://www.youtube.com/embed/${recipe.embededYoutubeVideoCode}`}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    >
                    </iframe>
                </div>

                <p className="mb-1 mt-16"><b>Watch Count: </b>{recipe.watchCount}</p>
                <p className="mb-1"><b>Category: </b>{recipe.category}</p>
                <p className="mb-1"><b>Creator Email: </b>{recipe.creatorEmail}</p>
                <p className="mb-1"><b>Country: </b>{recipe.country}</p>
                <p className="mb-1">
                    <b>Purchased By: </b>
                    {recipe.purchased_by.length === 0 ? 'No one purchased yet' : recipe.purchased_by.join(', ')}
                </p>
            </div>
        </div>
    );
}
