import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';

import Input from '../../form/Input';
import SelectComponent from '../components/SelectComponent';
import Modal from '../Modal';
import Icon from './Icon';

const CreateEntityModal = ({
    icon: IconComponent,
    className,
    entityName,
    fields,
    onCreate,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };
    const validationSchema = Yup.object().shape(
        fields.reduce((schema, field) => {
            schema[field.name] = Yup.string()
                .required(`Le champ ${field.label} est obligatoire`)
                .nullable();
            return schema;
        }, {}),
    );

    const initialValues = {};

    const handleSubmit = async (values, { setSubmitting }) => {
        await validationSchema.validate(values, { abortEarly: false });
        console.log(values);
        onCreate(values);
        closeModal();
        setSubmitting(false);
    };

    return (
        <div>
            <button
                onClick={openModal}
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    color: '#6B6D7C',
                    left: '20px',
                    height: '50px',
                    backgroundColor: '#D8D83D',
                    width: '220px',
                    borderRadius: '15px',
                    alignItems: 'center',
                    textAlign: 'center',
                    fontWeight: 'bold',

                    marginRight:
                        '10px' /* Ajoute 10 pixels d'espace à droite de l'élément 1 */,
                }}
            >
                {entityName}
                <Icon
                    icon={IconComponent}
                    className={className}
                    style={{
                        color: '#6B6D7C',
                        height: '40px',
                        width: '30px',
                        top: '20px',
                        marginLeft:
                            '10px' /* Ajoute 10 pixels d'espace à gauche de l'élément 2 */,
                    }}
                />
            </button>

            <Modal isOpen={isOpen} close={closeModal} title={` ${entityName}`}>
                <div>
                    <br></br>

                    <Formik
                        initialValues={initialValues}
                        onSubmit={handleSubmit}
                        validationSchema={validationSchema}
                    >
                        {({ handleChange, errors, isSubmitting }) => (
                            <Form>
                                {fields.map((field) => (
                                    <div key={field.name}>
                                        <label
                                            style={{
                                                background: '#FFFFFF',
                                                marginLeft: '100px',
                                            }}
                                        >
                                            {' '}
                                            {field.label}
                                        </label>
                                        {field.type === 'select' ? (
                                            <div>
                                                <SelectComponent
                                                    entityName={field.name}
                                                    options={field.data}
                                                    onChange={handleChange}
                                                    name={field.name}
                                                    style={{
                                                        textAlign: 'center',
                                                        fontSize: '12px',
                                                        fontWeight: 'bold',
                                                        color: 'black',
                                                        backgroundColor: 'white',
                                                        left: '100px',
                                                        width: '350px',
                                                        height: '45px',
                                                        background: '#FFFFFF',
                                                        boxShadow:
                                                            '1px 1px 6px rgba(126, 126, 126, 0.15)',
                                                        borderRadius: '10px',
                                                    }}
                                                />
                                                {errors[field.name] && (
                                                    <div
                                                        style={{
                                                            color: 'red',
                                                            textAlign: 'right',
                                                            fontSize: '12px',
                                                            top: '30px',
                                                            fontFamily: 'Arial',
                                                        }}
                                                    >
                                                        {errors[field.name]}
                                                    </div>
                                                )}
                                            </div>
                                        ) : field.type === 'file' ? (
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                }}
                                            >
                                                <Field
                                                    name={field.name}
                                                    component="input"
                                                    type="file"
                                                    onChange={handleChange}
                                                />
                                                {errors[field.name] && (
                                                    <div
                                                        style={{
                                                            color: 'red',
                                                            textAlign: 'right',
                                                            fontSize: '12px',
                                                            top: '30px',
                                                            fontFamily: 'Arial',
                                                        }}
                                                    >
                                                        {errors[field.name]}
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <div>
                                                <Field
                                                    style={{
                                                        left: '100px',
                                                        width: '350px',
                                                        height: '45px',
                                                        background: '#FFFFFF',
                                                        boxShadow:
                                                            '1px 1px 6px rgba(126, 126, 126, 0.15)',
                                                        borderRadius: '10px',
                                                    }}
                                                    name={field.name}
                                                    component={Input}
                                                    type={field.type}
                                                />
                                                {errors[field.name] && (
                                                    <div
                                                        style={{
                                                            color: 'red',
                                                            textAlign: 'right',
                                                            fontSize: '12px',
                                                            top: '30px',
                                                            fontFamily: 'Arial',
                                                        }}
                                                    >
                                                        {errors[field.name]}
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ))}
                                <br></br>
                                <br></br>

                                <div className="flex justify-between bg-transparent">
                                    <button
                                        style={{
                                            width: '120px',
                                            backgroundColor: '#D8D83D',
                                            height: '40px',
                                            marginLeft: '120px',
                                            borderRadius: '15px',
                                        }}
                                        type="submit"
                                        disabled={isSubmitting}
                                    >
                                        Valider
                                    </button>{' '}
                                    <button
                                        onClick={() => closeModal()}
                                        style={{
                                            width: '120px',
                                            marginRight: '100px',
                                            height: '40px',
                                            backgroundColor: '#FAFAFA',
                                            borderRadius: '15px',
                                            border: '2px solid #FF7676',
                                            boxShadow:
                                                '1px 1px 8px rgba(0, 0, 0, 0.3), inset 0px 1px 0px rgba(255, 255, 255, 0.08)',
                                        }}
                                        type="reset"
                                    >
                                        Annuler
                                    </button>{' '}
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </Modal>
        </div>
    );
};

export default CreateEntityModal;
