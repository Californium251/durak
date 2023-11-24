'use client'
import React from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
    const { login } = useAuth();
    const router = useRouter();
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: async (values) => {
            try {
                const res = await axios.post(`${process.env.SOCKET_IO_URL}/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: { email: values.email, password: values.password }
                })
                const { email, userId, token } = res.data;
                login({ email, userId, token });
                router.push('/');
            } catch (e) {
                console.error('login error:', e);
            }

        }
    });
    return (
        <form onSubmit={formik.handleSubmit}>
            <label htmlFor='email' onChange={formik.handleChange}>Email:
                <input type='email' name='email' />
            </label>
            <label htmlFor='password' onChange={formik.handleChange}>Password:
                <input type='password' name='password' />
            </label>
            <button type='submit'>Log In</button>
        </form>
    );
};

export default LoginForm;