'use client'
import { useFormik, Form, Field, FormikProvider } from 'formik';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const CreateGameForm = () => {
    const router = useRouter();
    const formik = useFormik({
        initialValues: {
            bid: 100,
            numberOfPlayers: 2,
            deckSize: 36,
            speed: 'slow',
            mode: 'throw-in',
            isPrivate: false,
        },
        onSubmit: async (values) => {
            const res = await axios.post('/api/create-game', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values)
            });
            router.push(`/game/${res.data.game._id}`);
        },
    });
    return <>
        <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit} style={{
                display: 'flex',
                flexDirection: 'column',
                width: '200px',
            }}>
                <label htmlFor='bid'>Ставка:
                    <Field as='select' name='bid' onChange={formik.handleChange}>
                        <option value={0}>100</option>
                        <option value={1}>250</option>
                        <option value={2}>500</option>
                        <option value={3}>1000</option>
                    </Field>
                </label>
                <label htmlFor='numberOfPlayers'>Количество игроков:
                    <Field as='select' name='numberOfPlayers' onChange={formik.handleChange}>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                    </Field>
                </label>
                <label htmlFor='deckSize'>Размер колоды:
                    <Field as='select' name='deckSize' onChange={formik.handleChange}>
                        <option value={0}>36</option>
                        <option value={1}>52</option>
                    </Field>
                </label>
                <label htmlFor='speed'>Скорость игры:
                    <Field as='select' name='speed' onChange={formik.handleChange}>
                        <option value={0}>Fast</option>
                        <option value={1}>Slow</option>
                    </Field>
                </label>
                <label htmlFor='mode'>Режим игры:
                    <Field as='select' name='mode' onChange={formik.handleChange}>
                        <option value='throw-in'>Throw-in</option>
                        <option value='transferrable'>Transferrable</option>
                    </Field>
                </label>
                <label htmlFor='isPrivate'>Приватная игра:
                    <Field type='checkbox' name='isPrivate' value='Приватная игра' onChange={formik.handleChange} />
                </label>
                <button type='submit'>Создать игру</button>
            </form>
        </FormikProvider>
    </>

};

export default CreateGameForm;
