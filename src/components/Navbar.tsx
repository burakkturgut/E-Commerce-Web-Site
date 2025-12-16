import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ecommerce from '../images/ecommerce.png';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { useDispatch } from 'react-redux';
import { filterProduct, setCurrentUser, setProduct } from '../redux/appSlice';
import { toast } from 'react-toastify';
import productServise from '../services/ProductServise';
import type { ProductType } from '../types/Types';

function Navbar() {
    const navigate = useNavigate()
    const dispatch = useDispatch()


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

    return (
        <AppBar position="static" sx={{ backgroundColor: '#047083ff' }}>
            <Toolbar>
                <IconButton
                    onClick={() => navigate("/")}
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    <img src={ecommerce} width={130} height={60} />
                </IconButton>
                <Typography onClick={() => navigate("/")} variant="h6" component="div" sx={{ flexGrow: 1, cursor: 'pointer' }}>
                    Kapış Kapış
                </Typography>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <TextField
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFilter(e)}
                        sx={{ width: '300px', marginBottom: '25px' }}
                        id="searchInput"
                        placeholder='Arama yapınız...'
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                    </InputAdornment>
                                ),
                                style: {
                                    color: 'lightgrey',
                                    borderBottom: '1px solid lightgrey'
                                }
                            }
                        }
                        }
                        variant="standard"
                    />
                    <Button onClick={logout} sx={{ textTransform: 'none', color: 'lightgrey' }} color="inherit">Çıkış Yap</Button>
                </div>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar