export interface User {
    _id: string;
    displayName: string;
    photoURL: string;
    email: string;
    coin: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface InitialState {
    token: string | null;
    user: User | null;
    isLoading: boolean
}