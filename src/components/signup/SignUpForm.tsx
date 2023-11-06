'use client'
import React, { use } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';
import bcrypt from 'bcryptjs'

const SignUpForm = () => {
    const router = useRouter();
    const { login } = useAuth();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            passwordConfirm: '',
        },
        onSubmit: async (values) => {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(values.password, salt);
            try {
                const res = await axios.post('/api/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: values.email, password: hashedPassword })
                });
                login({ username: res.data.username, token: res.data.token });
                router.push('/');
            } catch (e) {
                console.error(e.message);
            }
        }
    });
    return (
        <form onSubmit={formik.handleSubmit}>
            <label htmlFor='email'>Email:
                <input type='email' name='email' onChange={formik.handleChange} value={formik.values.email} />
            </label>
            <label htmlFor='password'>Password:
                <input type='password' name='password' onChange={formik.handleChange} value={formik.values.password} />
            </label>
            <label htmlFor='passwordConfirm'>Confirm Password:
                <input type='password' name='passwordConfirm' onChange={formik.handleChange} value={formik.values.passwordConfirm} />
            </label>
            <button type='submit'>Sign Up</button>
        </form>
    );
};

export default SignUpForm;
