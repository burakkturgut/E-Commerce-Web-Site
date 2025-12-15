import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { ProductType, UserType } from '../types/Types';
import { setCurrentUser, setLoading, setProduct } from '../redux/appSlice';
import productServise from '../services/ProductServise';
import { toast } from 'react-toastify';
import type { RootState } from '../redux/store';
import ProductCard from '../components/ProductCard';

function HomePage() {

    const dispatch = useDispatch();
    const { product } = useSelector((state: RootState) => state.app)

    const getAllProducts = async () => {
        try {
            dispatch(setLoading(true))
            const response: ProductType[] = await productServise.getAllProduct()
            if (response) {
                dispatch(setProduct(response))
            }
        } catch (error) {
            toast.error("Ürün getirimi başarısız " + error)
        } finally {
            dispatch(setLoading(false))
        }
    }

    useEffect(() => {
        getAllProducts();
    }, [])


    useEffect(() => {
        const result = localStorage.getItem("currentUser");
        if (result) {
            const currentUser: UserType = JSON.parse(result) as UserType;
            dispatch(setCurrentUser(currentUser))
        }
    }, [])
    return (
        <div style={{
            display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap'
        }}>
            {
                product && product.map((product: ProductType, index: number) => (
                    <ProductCard key={index} product={product} />
                ))
            }
        </div>
    )
}

export default HomePage