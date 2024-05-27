import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../../../app/store';

export const apiSlice = createApi({
    reducerPath: 'foodRecipeApi',
    tagTypes: ['User', 'Recipes', 'RecipesBySearch', 'RecipesByCategory', 'Recipe'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://food-recipe-server-mauve.vercel.app',
        prepareHeaders: async (headers, { getState }) => {
            const token = (getState() as RootState).auth.token;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({})
})

