import { useState } from "react";
import useTitle from "../../hooks/useTitle";
import { useGetRecipesQuery } from "../../redux/features/api/recipeApi/recipeApi";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import ErrorMessage from "../../components/errorMessage/ErrorMessage";
import Pagination from "../../components/pagination/Pagination";
import RecipeCard from "../../components/cards/recipeCard/RecipeCard";
import SearchBar from "../../components/searchBar/SearchBar";
import { useAppSelector } from "../../redux/app/hooks";

export default function Recipies() {
    useTitle('Recipies');
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState("");
    const [category, setCategory] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const { data, isLoading, isError } = useGetRecipesQuery(currentPage);
    const authIsLoading = useAppSelector(state => state.auth.isLoading);

    const recipes = data?.data.recipes;

    const pagination = data?.data.pagination;
    const totalPage = pagination?.totalPage || 1;

    // Handle page change
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    // Handle title change
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    };

    // Handle category change
    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCategory(e.target.value);

        navigate(`/recipes/category?category_query=${e.target.value}`);
    };

    // handle submit
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (searchText) {
            navigate(`/recipes/search?search_query=${searchText}`);
        }
    };

    if (authIsLoading) {
        return <Loader />;
    }

    let content;

    if (isLoading)
        content = <Loader />;

    if (!isLoading && isError)
        content = <ErrorMessage message="Something went wrong." />;

    if (!isLoading && !isError && recipes && recipes.length === 0)
        content = <ErrorMessage message='Opps! Sorry! There is no recipe available.' />;

    if (!isLoading && !isError && recipes && recipes.length > 0)
        content =
            <>
                <div>
                    {
                        recipes && recipes
                            .map((recipe: any) => <RecipeCard key={recipe._id} recipe={recipe} />)
                    }
                </div>
                {
                    totalPage > 1 &&
                    <div className="py-8 mt-8 text-center">
                        <Pagination
                            totalPage={totalPage}
                            currentPage={currentPage}
                            handlePageChange={handlePageChange}
                        />
                    </div>
                }
            </>;

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="container mx-auto py-16">
                <h1 className="text-4xl font-bold text-center pb-8">All Recipes</h1>
                <div className="pb-8">
                    <SearchBar
                        searchText={searchText}
                        handleSubmit={handleSubmit}
                        handleTitleChange={handleTitleChange}
                    />
                    <div className="mt-4 mx-5">
                        <label className="block text-gray-700 mb-1">Category:</label>
                        <select
                            value={category}
                            onChange={handleCategoryChange}
                            className="border border-gray-300 rounded-md p-2"
                        >
                            <option value="">All Categories</option>
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
                </div>
                {content}
            </div>
        </div>
    );
}
