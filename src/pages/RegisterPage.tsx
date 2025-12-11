import React from 'react'
import '../css/RegisterPage.css'
import TextField from '@mui/material/TextField';
import { BsPersonCircle } from "react-icons/bs";
import { FaLock } from "react-icons/fa6";
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';

function RegisterPage() {
    return (
        <div className='register'>
            <div className='main'>
                <form className='form-div'>
                    <div>
                        <TextField
                            sx={{ width: '300px', marginBottom: '25px' }}
                            id="userName"
                            placeholder='Kullanıcı Adı'
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
                        />
                        <TextField
                            sx={{ width: '300px', marginBottom: '25px' }}
                            id="userPassword"
                            type='password'
                            placeholder='Şifre'
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
                        />

                        <div className='register-button'>
                            <Button size='small' sx={{ textTransform: 'none', height: '28px', marginRight: '10px' }} variant='contained' color='success'>Kaydol</Button>
                            <Button size='small' sx={{ textTransform: 'none', height: '28px', backgroundColor: '#CDA735' }} variant='contained' >Temizle</Button>
                        </div>

                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage