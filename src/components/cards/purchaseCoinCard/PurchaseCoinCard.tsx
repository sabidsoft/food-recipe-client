import { PurchaseCoinCardProps } from "./types";

export default function PurchaseCoinCard({ coin, doller, onPurchase }: PurchaseCoinCardProps) {
    return (
        <div className="shadow-lg rounded-lg bg-[#F4F4F4] p-8">
            <h4 className="text-center text-xl font-semibold mb-8">{coin} Coins</h4>
            <h2 className="text-center text-8xl font-bold mb-14">${doller}</h2>
            <div className="text-center mb-4">
                <button
                    type="button"
                    onClick={() => onPurchase(coin)}
                    className="text-white bg-[#F3483E] hover:bg-[#c53932] duration-300 font-medium text-md rounded-full px-8 py-2"
                >
                    Buy Now
                </button>
            </div>
        </div>
    );
}