import type { AxiosResponse } from "axios";
import axios from "../config/AxiosConfig";
import type { UserType } from "../types/Types";

class RegisterPageService {
    // Bu sınıf kayıt işlemleriyle ilgili API çağrılarını tutar.
    // Amaç componentlerde axios yazmamak ve temiz sürdürülebilir kod üretmek
    register(newUser: UserType): Promise<any> {
        return new Promise((resolve: any, reject: any) => {  //bir promise yapısı tanımladım başarılıysa resolve başarısızsa reject dönecek
            axios.post("/users", newUser)
                .then((response: AxiosResponse<any, any>) => resolve(response.data))
                .catch((error: any) => reject(error));
        })
    }
}

export default new RegisterPageService();   