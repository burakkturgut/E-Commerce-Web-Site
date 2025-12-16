import axios, { type AxiosResponse } from "axios";
import type { ProductType } from "../types/Types";

class ProductService {
    //ürünlerin api istekleri 
    BASE_URL = "https://fakestoreapi.com"

    getAllProduct(): Promise<ProductType[]> {
        return new Promise((resolve: any, reject: any) => {
            axios.get(`${this.BASE_URL}/products`)
                .then((response: AxiosResponse<any, any>) => resolve(response.data))
                .catch((error: any) => reject(error))
        })
    }
}

export default new ProductService();