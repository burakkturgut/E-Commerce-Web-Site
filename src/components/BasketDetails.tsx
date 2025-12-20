import React, { useEffect } from 'react'
import Drawer from '@mui/material/Drawer';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../redux/store';
import { setDrawer, updateBalance } from '../redux/appSlice';
import type { ProductType, UserType } from '../types/Types';
import Button from '@mui/material/Button';
import { calculateBasket, removeProductFromBasket, setBasket } from '../redux/basketSlice';
import { toast } from 'react-toastify';
import '../css/BasketDetail.css'

function BasketDetails() {

    const { drawer, currentUser } = useSelector((state: RootState) => state.app)
    const { basket, totalAmount } = useSelector((state: RootState) => state.basket)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(calculateBasket())
    }, [basket])

    const closeDrawer = () => {
        dispatch(setDrawer(false))
    }
    const removeProduct = (productID: number) => {
        dispatch(removeProductFromBasket(productID))
    }

    const buy = () => {
        if (currentUser?.balance && currentUser.balance < totalAmount) {
            toast.warn("Bakiyeniz Yeterli Değildir.")
        }
        if (currentUser?.balance) {
            const remaningTotal = currentUser?.balance - totalAmount;
            const payload: UserType = {
                ...currentUser,
                balance: remaningTotal
            }
            dispatch(updateBalance(payload))
            dispatch(setBasket([]));
            localStorage.removeItem("basaket")
            toast.success("Ürünler Satın Alınmıştır.")
        }



    }



    return (
        <Drawer open={drawer} anchor='right' className='drawer' onClose={closeDrawer}>
            {
                basket && basket.map((product: ProductType) => (
                    <>

                        <div className='drawerDivContainer'>
                            <div className='drawerImage'><img src={product.image} width={60} height={60} alt="" /></div>
                            <div style={{ width: '300px' }}>
                                <div className='drawerTitle' >{product.title.substring(0, 30)}</div>
                                <div>{product.description.substring(0, 40)}...</div>
                            </div>
                            <div className='drawerCount'>{product.count}</div>
                            <div className='drawerPrice'>{product.price}₺</div>
                            <div className='drawerDivButton'><Button onClick={() => removeProduct(product.id)} size='small' className='drawerButton' variant='outlined'>Çıkart</Button></div>
                        </div>

                    </>
                ))
            }
            <div className='drawerConsult'>
                <div className='drawerTotalAmount'>Toplam Tutar: {totalAmount}₺</div >
                <div><Button onClick={buy} className='drawerBuyButton' size='small' variant='contained' color='success'>Satın AL</Button></div>
            </div>
        </Drawer >
    )
}

export default BasketDetails