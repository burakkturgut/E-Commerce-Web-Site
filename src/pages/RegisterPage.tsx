import React from 'react'
import '../css/RegisterPage.css'
import TextField from '@mui/material/TextField';
import { BsPersonCircle } from "react-icons/bs";
import { FaLock } from "react-icons/fa6";
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import { registerPageSchemas } from '../schemas/RegisterPageSchemas';
import type { UserType } from '../types/Types';
import registerPageService from '../services/RegisterPageService';
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';

function RegisterPage() {

    const navigate = useNavigate();

    const submit = async (values: any, actions: any) => {
        try {
            const payload: UserType = {
                id: String(Math.floor(Math.random() * 999999)),
                username: values.username,
                password: values.password,
                balance: 1000
            }
            const response = await registerPageService.register(payload)
            if (response) {
                clear();
                toast.success("Kullanıcı kaydedildi");
                navigate("/login");
            }
        } catch (error) {
            toast.error("Kullanıcı kaydedilirken hata oluştu");
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
        <div className='register'>
            <div className='main'>
                <form onSubmit={handleSubmit} >
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
                            <Button type='submit' size='small' sx={{ textTransform: 'none', height: '28px', marginRight: '10px' }} variant='contained' color='success'>Kaydol</Button>
                            <Button onClick={clear} size='small' sx={{ textTransform: 'none', height: '28px', backgroundColor: '#CDA735' }} variant='contained' >Temizle</Button>
                        </div>

                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage