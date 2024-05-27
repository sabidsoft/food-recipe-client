import { signInWithPopup } from "firebase/auth";
import { useAppSelector } from "../../../redux/app/hooks";
import { GoogleLoginData, RecipeCardProps } from "./types";
import { toast } from 'react-toastify';
import { auth, googleProvider } from "../../../firebase/firebase.config";
import { useGoogleSignInMutation } from "../../../redux/features/api/userApi/userApi";
import { useNavigate } from "react-router-dom";

export default function RecipeCard({ recipe }: RecipeCardProps) {
    const navigate = useNavigate();
    const [googleSignIn] = useGoogleSignInMutation();
    const user = useAppSelector(state => state.auth.user);

    // handleGoogleLogin
    const handleGoogleLogin = async (recipeId: string) => {
        try {
            toast.warn("You must be logged in to access this page.");

            const result = await signInWithPopup(auth, googleProvider);
            const { displayName, photoURL, email } = result.user;

            const data: GoogleLoginData = { displayName, photoURL, email };

            await googleSignIn(data);

            navigate(`/recipe/${recipeId}`, { state: recipe });
        } catch (error) {
            console.log(error);
        }
    }

    // redirect to recipe page
    const goToRecipePage = (recipeId: string) => {
        navigate(`/recipe/${recipeId}`, { state: recipe });
    }

    return (
        <div className="flex justify-center items-center mb-8">
            <div className="bg-white p-8 rounded-lg shadow-md w-full md:w-1/2 mx-5">
                <h1 className="text-2xl text-center font-bold mb-6">{recipe.recipeName}</h1>
                <img
                    src={recipe.recipeImage}
                    alt={recipe.recipeName}
                    className="w-full mb-6 rounded"
                />

                <p className="mb-1">
                    <b>Purchased By: </b>
                    {recipe.purchased_by.length === 0 ? 'No one purchased yet' : recipe.purchased_by.join(', ')}
                </p>
                <p className="mb-1"><b>Creator Email: </b>{recipe.creatorEmail}</p>
                <p className="mb-8"><b>Country: </b>{recipe.country}</p>

                <div className="text-center">
                    <button
                        type="button"
                        onClick={() => user ? goToRecipePage(recipe._id) : handleGoogleLogin(recipe._id)}
                        className="text-white bg-[#F3483E] hover:bg-[#c53932] duration-300 font-medium text-md rounded-full px-5 py-1.5"
                    >
                        View The Recipe
                    </button>
                </div>
            </div>
        </div>
    );
}
