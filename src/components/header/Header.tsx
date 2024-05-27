import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiMenu } from 'react-icons/bi';
import { RxCross2 } from 'react-icons/rx';
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import { userLoggedOut } from "../../redux/features/auth/authSlice";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase/firebase.config";
import { useGoogleSignInMutation } from "../../redux/features/api/userApi/userApi";
import { GoogleLoginData } from "./types";
import logo from "../../assets/images/logo.png";
import coin from "../../assets/images/coin.png";
import { MoonLoader } from "react-spinners";

const mobileNavigationMenuClassName = "text-[#F3483E] font-medium text-lg text-center py-3 hover:bg-slate-500 d duration-300";

export default function Header() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const user = useAppSelector(state => state.auth.user);
    const [googleSignIn, { isLoading }] = useGoogleSignInMutation();

    // handling logout
    const logout = () => {
        dispatch(userLoggedOut());
        localStorage.clear();
        navigate('/');
    }

    // handleGoogleLogin
    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const { displayName, photoURL, email } = result.user;

            const data: GoogleLoginData = { displayName, photoURL, email }

            await googleSignIn(data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <nav className="sticky top-0 z-50 shadow bg-[#fff]">
            {/* Desktop Navigation */}
            <div className="bg-gray-100">
                <div className="w-[100%] lg:w-[80%] mx-auto hidden lg:flex justify-between items-center py-4">
                    <Link to="/" className="flex items-center">
                        <img
                            src={logo}
                            alt="Brand_Logo"
                            width={36}
                            height={36}
                        />
                        <p className="text-[#F3483E] font-bold text-2xl ml-2">Food Recipe</p>
                    </Link>

                    {user ? (
                        <div className="flex justify-center items-center">
                            <Link to='/' className="text-[#F3483E] font-medium text-lg mr-5">Home</Link>
                            <Link to='/recipes' className="text-[#F3483E] font-medium text-lg mr-5">Recipes</Link>
                            <Link to='/add-recipes' className="text-[#F3483E] font-medium text-lg mr-5">Add Recipies</Link>

                            <div className="flex justify-center items-center font-medium text-lg bg-[#F3483E] px-2 py-1 rounded-full">
                                <img
                                    src={coin}
                                    alt="Coin"
                                    width={24}
                                    height={24}
                                />
                                <p className="ml-2 text-white">{user.coin}</p>
                            </div>

                            <img
                                src={user.photoURL}
                                alt="Coin"
                                width={36}
                                height={36}
                                className="rounded-full mx-2"
                            />

                            <button onClick={logout} className="text-white bg-[#F3483E] hover:bg-[#c53932] duration-300 font-medium text-lg rounded-full px-4 py-1">Logout</button>
                        </div>
                    ) : (
                        <div className="flex justify-center items-center">
                            <Link to='/' className="text-[#F3483E] font-medium text-lg mr-5">Home</Link>
                            <Link to='/recipes' className="text-[#F3483E] font-medium text-lg mr-5">Recipes</Link>
                            {
                                isLoading ?
                                    <MoonLoader color="#F3483E" size={20} /> :
                                    <button onClick={handleGoogleLogin} className="text-[#F3483E] font-medium text-lg">Google Login</button>
                            }
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile and Tab Navigation */}
            <div className="lg:hidden bg-gray-100">
                <div className="flex justify-between items-center px-4 py-4">
                    <Link to='/' className="flex items-center">
                        <img
                            src={logo}
                            alt="Brand_Logo"
                            width={36}
                            height={36}
                        />
                        <p className="text-[#F3483E] font-bold text-3xl ml-2">Food Recipe</p>
                    </Link>

                    {isMenuOpen ? (
                        <RxCross2
                            size={30}
                            color="#F3483E"
                            cursor='pointer'
                            onClick={() => setIsMenuOpen((prevState) => !prevState)}
                        />
                    ) : (
                        <BiMenu
                            size={30}
                            color="#F3483E"
                            cursor='pointer'
                            onClick={() => setIsMenuOpen((prevState) => !prevState)}
                        />
                    )}
                </div>

                {user ? (
                    <div className={`${isMenuOpen ? 'flex flex-col mt-4' : 'hidden'}`}>
                        <Link
                            to='/'
                            onClick={() => setIsMenuOpen((prevState) => !prevState)}
                            className={mobileNavigationMenuClassName}
                        >
                            Home
                        </Link>

                        <Link
                            to='/recipes'
                            onClick={() => setIsMenuOpen((prevState) => !prevState)}
                            className={mobileNavigationMenuClassName}
                        >
                            Recipes
                        </Link>

                        <Link
                            to='/add-recipes'
                            onClick={() => setIsMenuOpen((prevState) => !prevState)}
                            className={mobileNavigationMenuClassName}
                        >
                            Add Recipies
                        </Link>

                        <div className="flex justify-center items-center my-5">
                            <div className="flex justify-center items-center font-medium text-lg bg-[#F3483E] px-2 py-1 rounded-full">
                                <img
                                    src={coin}
                                    alt="Coin"
                                    width={24}
                                    height={24}
                                />
                                <p className="ml-2 text-white">{user.coin}</p>
                            </div>

                            <img
                                src={user.photoURL}
                                alt="Coin"
                                width={36}
                                height={36}
                                className="rounded-full mx-2"
                            />
                            <button
                                onClick={logout}
                                className="text-white bg-[#F3483E] hover:bg-[#c53932] duration-300 font-medium text-lg rounded-full px-4 py-1"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className={`${isMenuOpen ? 'flex flex-col mt-4' : 'hidden'}`}>
                        <Link
                            to='/'
                            onClick={() => setIsMenuOpen((prevState) => !prevState)}
                            className={mobileNavigationMenuClassName}
                        >
                            Home
                        </Link>

                        <Link
                            to='/recipes'
                            onClick={() => setIsMenuOpen((prevState) => !prevState)}
                            className={mobileNavigationMenuClassName}
                        >
                            Recipes
                        </Link>

                        {
                            isLoading ?
                                <MoonLoader color="#F3483E" size={20} className="self-center mb-8 mt-4" /> :
                                <Link
                                    to='/'
                                    onClick={handleGoogleLogin}
                                    className={mobileNavigationMenuClassName}
                                >
                                    Google Login
                                </Link>
                        }

                    </div>
                )}
            </div>
        </nav>
    );
}
