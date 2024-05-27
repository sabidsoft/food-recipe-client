export interface PurchaseCoinCardProps {
    coin: number
    doller: number,
    onPurchase: (coin: number) => void;
}