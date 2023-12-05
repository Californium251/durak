import React, { FC } from 'react';
import { useFormik, FormikProvider } from 'formik';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import { Form } from 'react-bootstrap';
import useAuth from '@/hooks/useAuth';

const EnterNameForm: FC = () => {
    const { login } = useAuth();
    const formik = useFormik({
        initialValues: {
            name: '',
        },
        onSubmit: async (values) => {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_SOCKET_IO_URL}/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: { name: values.name }
            });
            login({ name: res.data.name, token: res.data.token, userId: res.data.userId })
        }
    });
    return (
        <FormikProvider value={formik}>
            <Form onSubmit={formik.handleSubmit}>
                <label htmlFor='name'>Имя:
                    <input
                        id='name'
                        name='name'
                        type='text'
                        onChange={formik.handleChange}
                        value={formik.values.name}
                    />
                </label>
                <button type='submit'>Войти</button>
            </Form>
        </FormikProvider>
    );
};

export default EnterNameForm;