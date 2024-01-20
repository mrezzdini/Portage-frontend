/* eslint-disable react/jsx-key */
import { DocumentArrowUpIcon } from '@heroicons/react/24/outline';
import { Form, Formik } from 'formik';
import { useEffect } from 'react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { uploadDocument } from '../../../../actions/documentActions';
import { fetchDocuments } from '../../../../actions/documentActions';
import SelectComponent from '../components/SelectComponent';
import Modal from '../Modal';
import Icon from '../table/Icon';

const UploadComponent = () => {
    const dispatch = useDispatch();

    const [reload, setReload] = useState(false);
    useEffect(() => {
        dispatch(fetchDocuments());
    }, [dispatch, reload]);

    const [isOpen, setIsOpen] = useState(false);
    const [documentUpload, setDocumentUpload] = useState(null);
    const [nameFolder, setNameFolder] = useState(null);

    const folders = useSelector((state) => state.folder.folders);
    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'file') {
            setDocumentUpload(e.target.files[0]);
        } else {
            console.log(value);
            setNameFolder(value);
        }
    };

    const handleSubmit = (values, { setSubmitting }) => {
        if (documentUpload && nameFolder) {
            const formData = new FormData();
            formData.append('file', documentUpload);
            formData.append('nameFolder', nameFolder);
            dispatch(uploadDocument(formData));
            setDocumentUpload(null);
            closeModal();
            setReload(true);
        }
        setSubmitting(false);
    };

    return (
        <div>
            <button
                className="btn btn-yellow rounded rounded-r-md bg-primary 
                    px-3 text-indigo-200 focus:outline-none hover:bg-primary-dark"
                onClick={openModal}
            >
                <Icon
                    icon={DocumentArrowUpIcon}
                    className="h-6 w-6 text-gray-500"
                    style={{ color: 'white' }}
                />
            </button>

            <Modal isOpen={isOpen} close={closeModal} title={`Charger un document`}>
                <div className="mb-5 border-b pb-5">
                    <div className="w-full rounded-lg bg-white p-4 shadow dark:bg-gray-700">
                        <Formik initialValues={{}} onSubmit={handleSubmit}>
                            <Form>
                                <h6> Dossier</h6>
                                <SelectComponent
                                    entityName="dossier"
                                    options={folders}
                                    onChange={handleChange}
                                    name="nameFolder"
                                />
                                <h6> Document</h6>
                                <input
                                    style={{
                                        // Add your custom CSS styles here
                                        // For example:
                                        width: '100%',
                                        height: '40px',
                                        fontSize: '16px',
                                        // Add more styles as needed
                                    }}
                                    type="file"
                                    name="file"
                                    label="File"
                                    className="input-select"
                                    onChange={handleChange}
                                />
                                <br></br>
                                <br></br>
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <div style={{ flex: 1 }}>
                                        <button
                                            className="btn btn-warning"
                                            type="reset"
                                            onClick={closeModal}
                                        >
                                            Annuler
                                        </button>{' '}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <button className="btn btn-primary" type="submit">
                                            Charger
                                        </button>{' '}
                                    </div>
                                </div>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default UploadComponent;
