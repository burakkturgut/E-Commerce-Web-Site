import * as yup from 'yup'

export const registerPageSchemas = yup.object().shape({
    // ! username ve password tanımı formikteki yapımıza uygun olmalı
    username: yup.string().required("Kullanıcı adını giriniz"),
    password: yup.string().required("Şifre boş olamaz")
})