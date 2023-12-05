'use client'
import React from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
    const { login } = useAuth();
    const router = useRouter();
    const serverAddress = process.env.NEXT_PUBLIC_SOCKET_IO_URL || 'http://localhost:3001';
    const formik = useFormik({
        initialValues: {
            name: '',
            password: ''
        },
        onSubmit: async (values) => {
            try {
                const res = await axios.post(`${serverAddress}/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: { name: values.name, password: values.password }
                })
                const { name, userId, token } = res.data;
                login({ name, userId, token });
                router.push('/');
            } catch (e) {
                console.error('login error:', e);
            }

        }
    });
    return (
        <form onSubmit={formik.handleSubmit}>
            <label htmlFor='name' onChange={formik.handleChange}>name:
                <input type='name' name='name' />
            </label>
            <label htmlFor='password' onChange={formik.handleChange}>Password:
                <input type='password' name='password' />
            </label>
            <button type='submit'>Log In</button>
        </form>
    );
};

export default LoginForm;