import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ecommerce from '../images/ecommerce.png';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { useDispatch, useSelector } from 'react-redux';
import { filterProduct, setCurrentUser, setDrawer, setProduct } from '../redux/appSlice';
import { toast } from 'react-toastify';
import productServise from '../services/ProductServise';
import type { ProductType } from '../types/Types';
import { FaBasketShopping } from "react-icons/fa6";
import Badge from '@mui/material/Badge';
import type { RootState } from '../redux/store';
import '../css/Navbar.css';

function Navbar() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { basket } = useSelector((state: RootState) => state.basket)

    const logout = () => {
        localStorage.removeItem("currentUser")
        dispatch(setCurrentUser(null))
        navigate("/login")
        toast.success("Çıkış Başarılı")
    }

    const handleFilter = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            if (e.target.value) {
                dispatch(filterProduct(e.target.value))
            } else {
                const product: ProductType[] = await productServise.getAllProduct()
                dispatch(setProduct(product))
            }
        } catch (error) {
            toast.error("Filtreleme yaparken hata oluştu" + error)
        }
    }

    const openDrawer = () => {
        dispatch(setDrawer(true))
    }

    return (
        <AppBar position="static" className='navbarAppBar'>
            <Toolbar>
                <IconButton
                    onClick={() => navigate("/")}
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    className='navbarIconButton'
                >
                    <img src={ecommerce} width={130} height={60} />
                </IconButton>
                <Typography onClick={() => navigate("/")} variant="h6" component="div" className='navbarTypography'>
                    Kapış Kapış
                </Typography>
                <div className='navbarDiv'>
                    <TextField
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFilter(e)}
                        className='navbarTextField'
                        id="searchInput"
                        placeholder='Arama yapınız...'
                        slotProps={{
                            input: {
                                className: "navbarTextFieldInput",
                                startAdornment: (
                                    <InputAdornment position="start">
                                    </InputAdornment>
                                )
                            }
                        }
                        }
                        variant="standard"
                    />
                    <Badge onClick={openDrawer} badgeContent={basket.length} color='warning' className='navbarBadge'>
                        <FaBasketShopping className='navbarBasketIcon' />
                    </Badge>
                    <Button onClick={logout} className='navbarButton' color="inherit">Çıkış Yap</Button>
                </div>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar