import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import useInitialAuthCheck from "./hooks/useInitialAuthCheck";
import Loader from "./components/loader/Loader";
import Header from "./components/header/Header";
import Home from "./pages/home/Home";
import NotFound from "./pages/notFound/NotFound";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import Recipe from "./pages/recipe/Recipe";
import Recipies from "./pages/recipes/Recipies";
import AddRecipes from "./pages/addRecipes/AddRecipes";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RecipesBySearch from "./pages/recipesBySearch/RecipesBySearch";
import RecipesByCategory from "./pages/recipesByCategory/RecipesByCategory";
import PurchaseCoin from "./pages/purchaseCoin/PurchaseCoin";
import Footer from "./components/footer/Footer";

export default function App() {
  const initialAuthChecked = useInitialAuthCheck();

  return !initialAuthChecked ? (
    <Loader />
  ) : (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<Recipies />} />
        <Route path="/recipe/:recipeId" element={<PrivateRoute><Recipe /></PrivateRoute>} />
        <Route path="/add-recipes" element={<PrivateRoute><AddRecipes /></PrivateRoute>} />
        <Route path="/recipes/search" element={<RecipesBySearch />} />
        <Route path="/recipes/category" element={<RecipesByCategory />} />
        <Route path="/purchase-coin" element={<PrivateRoute><PurchaseCoin /></PrivateRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <ToastContainer />
    </Router>
  );
}
