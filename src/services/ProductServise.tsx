import axios, { type AxiosResponse } from "axios";
import type { ProductType } from "../types/Types";

class ProductService {
    //ürünlerin api istekleri 
    BASE_URL = "https://fakestoreapi.com"

    getAllProduct(): Promise<ProductType[]> {
        return new Promise((resolve: any, reject: any) => {
            axios.get(`${this.BASE_URL}/products`) //burada axios ile çağırıdığım axiosun kendisi axiosConfigte oluşturduğum değil bunun sebebi attığım isteklerin farklı bir url e gitmesi
                .then((response: AxiosResponse<any, any>) => resolve(response.data))
                .catch((error: any) => reject(error))
        })
    }
    getProductById(productId: number): Promise<ProductType> {
        return new Promise((resolve: any, reject: any) => {
            axios.get(`${this.BASE_URL}/products/${productId}`)
                .then((response: AxiosResponse<any, any>) => resolve(response.data))
                .catch((error: any) => reject(error))
        })
    }
}

export default new ProductService();