//  import '../css/RegisterPage.css'
import TextField from '@mui/material/TextField';
import { BsPersonCircle } from "react-icons/bs";
import { FaLock } from "react-icons/fa6";
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import { registerPageSchemas } from '../schemas/RegisterPageSchemas';
import '../css/LoginPage.css'
import loginPageService from '../services/LoginPageService';
import { useDispatch } from 'react-redux';
import { setCurrentUser, setLoading } from '../redux/appSlice';
import type { UserType, CheckUserType } from '../types/Types';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


function LoginPage() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const checkUser = (userList: UserType[], username: string, password: string): CheckUserType => {
        const response: CheckUserType = { result: false, currentUser: null }

        userList.forEach((user: UserType) => {
            if (user.username === username && user.password === password) {
                response.result = true;
                response.currentUser = user;
            }
        })

        return response;
    }

    const submit = async (values: any, action: any) => {
        try {
            dispatch(setLoading(true))
            const response: UserType[] = await loginPageService.login();
            if (response) {
                const checkUserResponse: CheckUserType = checkUser(response, values.username, values.password)
                if (checkUserResponse.result && checkUserResponse.currentUser) {
                    dispatch(setCurrentUser(checkUserResponse.currentUser));
                    localStorage.setItem("currentUser", JSON.stringify(checkUserResponse.currentUser))
                    navigate("/");
                } else {
                    toast.error("Kullanıcı adı veya sifre hatalı")
                }
            }
        } catch (error) {
            toast.error("Giriş yapılırken hata oluştu." + error)
        } finally {
            dispatch(setLoading(false))
        }
    }

    const { values, handleSubmit, handleChange, errors, resetForm } = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        onSubmit: submit,
        validationSchema: registerPageSchemas // bu kısım RegisterPageSchmeas ile eşleşti artık username ve password oradaki kurala uygun harekete geçti
    });

    const clear = () => {
        resetForm();
    }

    return (
        <div className='login'>
            <div className='main'>
                <form onSubmit={handleSubmit}>
                    <div className='form-div'>
                        <TextField
                            sx={{ width: '300px', marginBottom: '25px' }}
                            id="userName"
                            placeholder='Kullanıcı Adı'
                            name='username'
                            value={values.username}
                            onChange={handleChange}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <BsPersonCircle />
                                        </InputAdornment>
                                    ),
                                },
                            }}
                            variant="standard"
                            helperText={errors.username && <span style={{ color: 'red' }}>{errors.username}</span>}
                        />
                        <TextField
                            sx={{ width: '300px', marginBottom: '25px' }}
                            id="userPassword"
                            type='password'
                            placeholder='Şifre'
                            name='password'
                            value={values.password}
                            onChange={handleChange}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <FaLock />
                                        </InputAdornment>
                                    ),
                                },
                            }}
                            variant="standard"
                            helperText={errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}
                        />

                        <div className='register-button'>
                            <Button type='submit' size='small' sx={{ textTransform: 'none', height: '28px', marginRight: '10px' }} variant='contained' color='success'>Giriş Yap</Button>
                            <Button onClick={clear} size='small' sx={{ textTransform: 'none', height: '28px', backgroundColor: '#CDA735' }} variant='contained' >Temizle</Button>
                        </div>

                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage