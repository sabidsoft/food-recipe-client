import { useLocation, useNavigate } from "react-router-dom";
import PurchaseCoinCard from "../../components/cards/purchaseCoinCard/PurchaseCoinCard";
import useTitle from "../../hooks/useTitle";
import { useAppSelector } from "../../redux/app/hooks";
import { useUpdateUserCoinMutation } from "../../redux/features/api/userApi/userApi";

export default function PurchaseCoin() {
    useTitle('Purchase Coin');
    const navigate = useNavigate();
    const user = useAppSelector(state => state.auth.user);
    const [updateUserCoin] = useUpdateUserCoinMutation();
    const location = useLocation();

    const userId = user?._id || "";

    // handle onPurchase
    const handleOnPurchase = async (coin: number) => {
        if (Number(user?.coin) === 0 || Number(user?.coin) > 0) {
            const totalCoin = Number(user?.coin) + coin;
            await updateUserCoin({ userId, coin: totalCoin });
            navigate(location.state?.pathname || '/recipes');
        }
    }

    return (
        <section className="bg-gray-100 pb-16">
            <div className="container mx-auto py-16">
                <h1 className="text-4xl font-bold text-center pb-16">Purchase Coin</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-10  mx-5 md:mx-0">
                    <PurchaseCoinCard
                        coin={100}
                        doller={1}
                        onPurchase={handleOnPurchase}
                    />
                    <PurchaseCoinCard
                        coin={500}
                        doller={5}
                        onPurchase={handleOnPurchase}
                    />
                    <PurchaseCoinCard
                        coin={1000}
                        doller={10}
                        onPurchase={handleOnPurchase}
                    />
                </div>
            </div>
        </section>
    );
}
