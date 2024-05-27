import { Link, useNavigate } from 'react-router-dom';
import bannerImage from '../../../assets/images/banner.jpg';
import { useGoogleSignInMutation } from '../../../redux/features/api/userApi/userApi';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../../../firebase/firebase.config';
import { GoogleLoginData } from './types';
import { useAppSelector } from '../../../redux/app/hooks';
import { toast } from 'react-toastify';
import Loader from '../../loader/Loader';

export default function Banner() {
    const navigate = useNavigate();
    const [googleSignIn] = useGoogleSignInMutation();
    const user = useAppSelector(state => state.auth.user);
    const authIsLoading = useAppSelector(state => state.auth.isLoading);

    // handleGoogleLogin
    const handleGoogleLogin = async () => {
        try {
            toast.warn("You must be logged in to access this page.");

            const result = await signInWithPopup(auth, googleProvider);
            const { displayName, photoURL, email } = result.user;

            const data: GoogleLoginData = { displayName, photoURL, email };

            await googleSignIn(data);
            navigate('/add-recipes');
        } catch (error) {
            console.log(error);
        }
    }

    if (authIsLoading) {
        return <Loader />;
    }

    return (
        <section
            style={{
                position: 'relative',
                height: '600px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                paddingLeft: '10px',
                paddingRight: '10px',
                backgroundImage: `url(${bannerImage})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                zIndex: 1
            }}></div>
            <div style={{ zIndex: 2, textAlign: 'center', color: 'white' }}>
                <h1 className='text-5xl text-white font-bold mb-6'>Food Recipe</h1>
                <p className='text-white'>Savor the Flavor, Where Every Bite Tells a Tale</p>
                <p className='text-white mb-10'>Feast Your Senses, Where Every Recipe Tells a Story</p>

                <Link
                    to='/recipes'
                    className="bg-[#F3483E] hover:bg-[#c53932] duration-300 text-white font-medium text-lg px-5 py-2 mr-5 rounded-full"
                >
                    <button>See Recipes</button>
                </Link>

                <Link
                    to='/add-recipes'
                    className="bg-[#F3483E] hover:bg-[#c53932] duration-300 text-white font-medium text-lg px-5 py-2 rounded-full"
                    onClick={() => user ? null : handleGoogleLogin()}
                >
                    <button>Add Recipes</button>
                </Link>
            </div>
        </section>
    );
}
