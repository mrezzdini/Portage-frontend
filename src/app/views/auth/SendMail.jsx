/* eslint-disable react/jsx-no-undef */

import { EnvelopeIcon, PaperAirplaneIcon } from '@heroicons/react/24/solid';
import { Field, Form, Formik } from 'formik';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { sendMailAction } from '../../actions/MailAction';
import withAuth from '../../common/withAuth';
import Input from '../../components/lib/form/Input';
import Button from './../../components/lib/form/Button';
const SendMail = () => {
    const [mailTo, setMailTo] = useState('');
    const [cc, setCc] = useState('');
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');
    const [formErrors, setFormErrors] = useState({});

    const handleSubjectContenu = (event) => {
        setBody(event.target.value);
    };

    const handleMailToChange = (event) => {
        setMailTo(event.target.value);
    };

    const handleSubjectChange = (event) => {
        setSubject(event.target.value);
    };

    const handleCcChange = (event) => {
        setCc(event.target.value);
    };

    function sendMail(e) {
        e.preventDefault();
        const errors = {};
        if (!mailTo) {
            errors.mailTo = 'Le champ "Envoyer à" est obligatoire';
        }
        if (!subject) {
            errors.subject = 'Le champ "Objet" est obligatoire';
        }
        setFormErrors(errors);
        if (Object.keys(errors).length === 0) {
            dispatch(
                sendMailAction({
                    mailTo: mailTo,
                    subject: subject,
                    cc: cc,
                    body: body,
                }),
            );
        }
    }

    const dispatch = useDispatch();
    return (
        <div>
            <h2 style={{ fontFamily: 'sansSerif', display: 'flex' }}>
                <span style={{ paddingRight: '25px' }}>
                    {' '}
                    <EnvelopeIcon style={{ width: '50px' }} />
                </span>
                Envoyer un courrier
            </h2>
            <Formik>
                <Form
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        gap: '1rem',
                    }}
                >
                    <Field
                        name="mailTo"
                        component={Input}
                        placeholder="Envoyer à:"
                        label="Envoyer à:"
                        type="text"
                        onChange={handleMailToChange}
                        error={!!formErrors.mailTo}
                        helperText={formErrors.mailTo}
                        style={{ width: '600px' }}
                    />

                    <Field
                        name="cc"
                        component={Input}
                        placeholder="CC"
                        label="CC:"
                        type="text"
                        onChange={handleCcChange}
                        style={{ width: '600px' }}
                    />

                    <Field
                        name="subject"
                        component={Input}
                        placeholder="Objet"
                        label="Objet:"
                        type="text"
                        onChange={handleSubjectChange}
                        error={!!formErrors.subject}
                        helperText={formErrors.subject}
                        style={{ width: '600px' }}
                    />

                    <Field
                        as="textarea"
                        placeholder="Ecrire un message"
                        label="Ecrire un message:"
                        name="body"
                        rows="4"
                        cols="50"
                        onChange={handleSubjectContenu}
                        style={{ width: '600px' }}
                    />

                    <Button style={{ width: '600px' }} onClick={sendMail}>
                        <PaperAirplaneIcon style={{ width: '40px' }} /> Submit
                    </Button>
                </Form>
            </Formik>
        </div>
    );
};

export default withAuth(SendMail);
