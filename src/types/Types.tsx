export interface UserType {
    id: string,
    username: string,
    password: string,
    balance: number
}


export interface CheckUserType {
    result: boolean,
    currentUser: UserType | null
}


export interface ProductType {
    id: number,
    title: string,
    price: number,
    description: string,
    category: string,
    image: string,
    count?: number
    rating: RatingType
}

interface RatingType {
    rate: number,
    count: number
}

export interface AppSliceType {
    currentUser: UserType | null,
    loading: boolean,
    drawer: boolean,
    product: ProductType[]
}