import './App.css'
import RouterConfig from './config/RouterConfig'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Spinner from './components/Spinner';
import Navbar from './components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from './redux/store';
import productServise from './services/ProductServise';
import type { ProductType, UserType } from './types/Types';
import { setCurrentUser, setProduct } from './redux/appSlice';
import { useEffect, useEffectEvent } from 'react';
import { setBasket } from './redux/basketSlice';

function App() {

  const { currentUser } = useSelector((state: RootState) => state.app)

  const dispatch = useDispatch()



  const getAllProducts = async () => {
    const products: ProductType[] = await productServise.getAllProduct();
    dispatch(setProduct(products))
  }

  useEffect(() => {
    getAllProducts();
  }, [])

  useEffect(() => {
    const currentUserString: string | null = localStorage.getItem("currentUser");
    if (currentUserString) {
      const currentUser: UserType = JSON.parse(currentUserString) as UserType;
      dispatch(setCurrentUser(currentUser))
    }
  }, [])

  useEffect(() => {
    const basketString = localStorage.getItem("basket")
    if (basketString) {
      const basket: ProductType[] = JSON.parse(basketString) as ProductType[]
      dispatch(setBasket(basket))
    }
  }, [])

  return (
    <div>
      {currentUser && <Navbar />}  {/*Kullanıcı var mı diye kontrol ediyorvarsa navbarı gösterecek yoksa göstermeyecek */}
      <RouterConfig />
      <ToastContainer autoClose={2500} style={{ fontSize: '13px' }} />
      <Spinner />
    </div>
  )
}

export default App
