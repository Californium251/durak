'use client'
import { useFormik, Form, Field } from 'formik';

const CreateGameForm = () => {
    const formik = useFormik({
        initialValues: {
            bid: 0,
            numberOfPlayers: 0,
            deckSize: 0,
            speed: 0,
            mode: '',
            isPrivate: false,
        },
        onSubmit: (values) => {
            console.log(values);
        },
    });
    return <>
    <form>
        
    </form>
    </>

};

export default CreateGameForm;
