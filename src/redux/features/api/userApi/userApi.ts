import { getToken } from "../../../../utils/getToken";
import { userLoggedIn, setLoading } from "../../auth/authSlice";
import { apiSlice } from "../apiSlice/apiSlice";
import { GoogleSignIn } from "./types";

export const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        googleSignIn: builder.mutation<any, GoogleSignIn>({
            query: (data) => ({
                url: '/api/users/create-new-user',
                method: 'POST',
                body: data
            }),

            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    // Set loading state to true before making the request
                    dispatch(setLoading(true));

                    const response = await queryFulfilled;

                    // storing on localstorage
                    localStorage.setItem('auth', JSON.stringify({
                        token: response.data.data.token,
                        user: response.data.data.user
                    }));

                    // updating redux store
                    dispatch(userLoggedIn({
                        token: response.data.data.token,
                        user: response.data.data.user
                    }));

                    // Set loading state to false after the request is successful
                    dispatch(setLoading(false));
                }
                catch (err) {
                    // Set loading state to false in case of error
                    dispatch(setLoading(false));
                }
            }
        }),

        updateUserCoin: builder.mutation<any, { userId: string, coin: number }>({
            query: ({ userId, coin }) => ({
                url: `/api/users/${userId}`,
                method: "PATCH",
                body: { coin }
            }),
            invalidatesTags: ['User'],

            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    // Set loading state to true before making the request
                    dispatch(setLoading(true));

                    const response = await queryFulfilled;

                    // storing on localstorage
                    localStorage.setItem('auth', JSON.stringify({
                        token: getToken(),
                        user: response.data.data.user
                    }));

                    // updating redux store
                    dispatch(userLoggedIn({
                        token: getToken(),
                        user: response.data.data.user
                    }));

                    // Set loading state to false after the request is successful
                    dispatch(setLoading(false));
                }
                catch (err) {
                    // Set loading state to false in case of error
                    dispatch(setLoading(false));
                }
            }
        }),

        purchasedRecipe: builder.mutation<any, { userId: string, recipeId: string, creatorEmail: string }>({
            query: ({ userId, recipeId, creatorEmail }) => {
                return ({
                    url: `/api/users/purchased-recipe`,
                    method: "PATCH",
                    body: { userId, recipeId, creatorEmail }
                })
            },
            invalidatesTags: ['User', 'Recipe', 'Recipes'],

            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    // Set loading state to true before making the request
                    dispatch(setLoading(true));

                    const response = await queryFulfilled;

                    // storing on localstorage
                    localStorage.setItem('auth', JSON.stringify({
                        token: getToken(),
                        user: response.data.data.user
                    }));

                    // updating redux store
                    dispatch(userLoggedIn({
                        token: getToken(),
                        user: response.data.data.user
                    }));

                    // Set loading state to false after the request is successful
                    dispatch(setLoading(false));
                }
                catch (err) {
                    // Set loading state to false in case of error
                    dispatch(setLoading(false));
                }
            }
        }),
    })
})

export const {
    useGoogleSignInMutation,
    useUpdateUserCoinMutation,
    usePurchasedRecipeMutation
} = userApi;
