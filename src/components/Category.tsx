import { useEffect, useState } from 'react'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useDispatch } from 'react-redux';
import { setLoading, setProduct } from '../redux/appSlice';
import { toast } from 'react-toastify';
import categoryService from '../services/CategoryService';
import productServise from '../services/ProductServise';
import type { ProductType } from '../types/Types';

function Category() {

    const dispatch = useDispatch();
    const [categori, setCategories] = useState<string[]>()

    const getAllCategories = async () => {
        try {
            dispatch(setLoading(true))
            const categories: string[] = await categoryService.getAllCategories();
            setCategories(categories)
        } catch (error) {
            toast.error("Kategori işleminde hata oluştu " + error)
        } finally {
            dispatch(setLoading(false))
        }
    }


    const handleCategory = async (e: React.ChangeEvent<HTMLInputElement>, categoryName: string) => {
        try {
            dispatch(setLoading(true))
            if (e.target.checked) {
                const productNameByCategory: ProductType[] = await categoryService.getProductByCategoryName(categoryName)
                dispatch(setProduct(productNameByCategory))
            } else {
                // Bütün ürünler listelenecek
                const product: ProductType[] = await productServise.getAllProduct();
                dispatch(setProduct(product))
            }
        } catch (error) {
            toast.error("Kategoriler alınırken hata oluştu" + error)
        } finally {
            dispatch(setLoading(false))
        }
    }

    useEffect(() => {
        getAllCategories();
    }, [])

    return (
        <div style={{ marginTop: '60px', marginLeft: '20px' }}>
            <FormGroup>
                {
                    categori && categori.map((category: string, index: number) => (
                        < FormControlLabel key={index} control={
                            < Checkbox onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCategory(e, category)} />} label={category} />
                    ))
                }
            </FormGroup>
        </div>
    )
}

export default Category