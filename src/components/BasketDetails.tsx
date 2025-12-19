import React, { useEffect } from 'react'
import Drawer from '@mui/material/Drawer';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../redux/store';
import { setDrawer, updateBalance } from '../redux/appSlice';
import type { ProductType, UserType } from '../types/Types';
import Button from '@mui/material/Button';
import { calculateBasket, removeProductFromBasket, setBasket } from '../redux/basketSlice';
import { toast } from 'react-toastify';

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
        <Drawer open={drawer} anchor='right' sx={{ width: '400px' }} onClose={closeDrawer}>
            {
                basket && basket.map((product: ProductType) => (
                    <>

                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', padding: '20px 30px' }}>
                            <div style={{ marginRight: '15px' }}><img src={product.image} width={60} height={60} alt="" /></div>
                            <div style={{ width: '300px' }}>
                                <div style={{ fontFamily: 'arial', fontWeight: 'bold' }}>{product.title.substring(0, 30)}</div>
                                <div>{product.description.substring(0, 40)}</div>
                            </div>
                            <div style={{ marginRight: '40px' }}>{product.count}</div>
                            <div style={{ fontFamily: 'arial', fontSize: '15px', fontWeight: 'bold', width: '70px' }}>{product.price}₺</div>
                            <div style={{ marginLeft: '40px' }}><Button onClick={() => removeProduct(product.id)} size='small' sx={{ textTransform: 'none', height: '25px' }} variant='outlined'>Çıkart</Button></div>
                        </div>

                    </>
                ))
            }
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ fontSize: '18px', fontFamily: 'arial' }}>Toplam Tutar: {totalAmount}₺</div >
                <div><Button onClick={buy} sx={{ textTransform: 'none', height: '25px', marginTop: '20px' }} size='small' variant='contained' color='success'>Satın AL</Button></div>
            </div>
        </Drawer >
    )
}

export default BasketDetails