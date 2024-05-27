import { apiSlice } from "../apiSlice/apiSlice";

export const tourApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createRecipe: builder.mutation<any, any>({
            query: (formData) => ({
                url: "/api/recipes",
                method: "POST",
                body: formData
            }),
            invalidatesTags: ['Recipes', 'Recipe']
        }),

        getRecipes: builder.query<any, any>({
            query: (page) => ({
                url: `/api/recipes?page=${page}&limit=${10}`,
                method: "GET"
            }),
            keepUnusedDataFor: 600, // default 60 seconds
            providesTags: ['Recipes']
        }),

        getRecipe: builder.query<any, string>({
            query: (recipeId) => ({
                url: `/api/recipes/${recipeId}`
            }),
            providesTags: (result, error, arg) => [{ type: 'Recipe', id: arg }]
        }),

        getRecipesBySearch: builder.query<any, { search: string, page: number }>({
            query: ({ search, page }) => ({
                url: `/api/recipes?search=${search}&page=${page}&limit=${10}`
            }),
            providesTags: (result, error, arg) => [{ type: 'RecipesBySearch', id: arg.search }]
        }),

        getRecipesByCategory: builder.query<any, { category: string, page: number }>({
            query: ({ category, page }) => ({
                url: `/api/recipes?category=${category}&page=${page}&limit=${10}`
            }),
            providesTags: (result, error, arg) => [{ type: 'RecipesByCategory', id: arg.category }]
        }),
    })
})

export const {
    useCreateRecipeMutation,
    useGetRecipesQuery,
    useGetRecipesBySearchQuery,
    useGetRecipesByCategoryQuery,
    useGetRecipeQuery,
} = tourApi;
