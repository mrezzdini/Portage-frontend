import './Education.css';

import { TrashIcon } from '@heroicons/react/24/outline';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { ArrowsPointingOutIcon } from '@heroicons/react/24/outline';
import { Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import {
    getCertificatsAction,
    UpdateCertificat,
} from '../../../actions/CertificatActions';
import { createCertificat } from '../../../actions/CertificatActions';
import { deleteCertificat } from '../../../actions/CertificatActions';
import Modal from '../../../components/lib/container/Modal';
import Modal1 from '../../../components/lib/container/Modal';
import Input from '../../../components/lib/form/Input';
import useConfirm from '../../../hooks/useConfirm';
import ConsultantService from '../../../services/ConsultantService';
import documentService from '../../../services/documentService';
const Certificat = () => {
    const [openModal1, setOpenModal1] = useState(false);
    const [certificat, setCertificat] = useState({});
    const { id } = useParams();
    console.log(id);
    const dispatch = useDispatch();
    const [openModal, setOpenModal] = useState(false);
    const [imageId, setImageid] = useState('');
    const { certificats } = useSelector((state) => state.certificats);
    const storage = localStorage.getItem('persist:auth');
    let userId;
    const [idConsultant, SetIdConsultant] = useState(null);
    console.log(idConsultant);
    if (storage) userId = JSON.parse(JSON.parse(storage).userId);

    const getUserById = async () => {
        try {
            const response1 = await ConsultantService.getConsultantByUserId(userId);
            SetIdConsultant(response1.data.id);
            dispatch(getCertificatsAction(response1.data.id));
        } catch (error) {
            console.error(error);
        }
    };
    const filteredCertificatss = certificats?.filter((certificat) =>
        certificat?.cvs?.some((cv) => cv.id === parseInt(id)),
    );

    /* setfilteredCertificats(filteredCertificatss);
    console.log('mamamamam', filtredCertificats); */
    const initialValue = {
        title: '',
        emplacement: '',
        dateIssuing: '',
        idDoc: '',
        consultant_id: parseInt(idConsultant),
    };

    console.log(initialValue);
    useEffect(() => {
        getUserById();
    }, [dispatch, userId]);
    const postCertificat = async (certificat) => {
        console.log(image);

        try {
            if (image) {
                // Handle file upload
                const formData = new FormData();
                formData.append('file', image);
                formData.append('nameFolder', 'certifications');
                const response = await documentService.addImage(formData);
                console.log('image id ***', response.data);
                setImageid(response.data);
            }
        } catch (error) {
            console.log(error);
        }
        const newvalue = {
            id: certificat.id,
            title: certificat.title,
            emplacement: certificat.emplacement,
            dateIssuing: certificat.dateIssuing,
            idDoc: imageId,
            cvs: certificat.cvs,
            consultantId: certificat.consultantId,
        };
        dispatch(createCertificat(newvalue));
    };
    const confirm = useConfirm();
    const handleDeleteCertificat = async (id) => {
        const result = await confirm({
            title: 'Supprimer?',
            description: 'Voulez vous supprimer ce prestation?? ',
        });
        if (result) {
            try {
                dispatch(deleteCertificat(id));
            } catch (error) {
                console.log(error);
            }
        }
    };
    const handleUpdateCertificat = async (educ) => {
        setCertificat(educ);

        setOpenModal1(true);
    };
    const handleUpdateCertificat1 = async (certificat) => {
        const newvalue = {
            id: certificat.id,
            title: certificat.title,
            emplacement: certificat.emplacement,
            dateIssuing: certificat.dateIssuing,
            idDoc: certificat.idDoc,
            cvs: [...certificat.cvs, { id: parseInt(id) }],
            consultantId: certificat.consultantId,
        };
        dispatch(createCertificat(newvalue));
    };
    const handleDeleteCertificatFromCv = async (certificat) => {
        const newvalue = {
            id: certificat.id,
            title: certificat.title,
            emplacement: certificat.emplacement,
            dateIssuing: certificat.dateIssuing,
            idDoc: certificat.idDoc,
            consultantId: certificat.consultantId,
            cvs: certificat.cvs.filter((cv) => cv.id !== parseInt(id)),
        };
        dispatch(createCertificat(newvalue));
    };
    const EditCertificat = async (value) => {
        dispatch(UpdateCertificat(value));
        setOpenModal1(false);
    };
    const [image, setImage] = useState(null);
    const handleFileInputChange = (e) => {
        if (e.target.files[0]) {
            const imageFile = e.target.files[0];
            setImage(imageFile);
        }
    };
    const navigate = useNavigate();
    const handleNext = (e) => {
        navigate(`/app/recap/${id}`);
    };

    return (
        <div className="flex min-h-screen">
            <div className="flex flex-row justify-between">
                <div>
                    <div className="flex flex-row">
                        <p className="para">Mes certificats</p>
                        <button
                            className="formation-button"
                            onClick={() => setOpenModal(true)}
                        >
                            Créer une certificat
                        </button>
                    </div>

                    <div className="">
                        {certificats?.map((certificat) => (
                            // eslint-disable-next-line react/jsx-key
                            <div>
                                <h6>{certificat.title}</h6>
                                <div className="education-card" key={certificat.id}>
                                    <p>{certificat.dateIssuing}</p>
                                    <p>{certificat.emplacement}</p>
                                    <p>{certificat.idDoc}</p>
                                    <div
                                        style={{ marginLeft: 'auto' }}
                                        className="felx-row flex"
                                    >
                                        <button
                                            className="mr-4 flex"
                                            onClick={() =>
                                                handleDeleteCertificat(certificat)
                                            }
                                            style={{
                                                borderRadius: '50%',
                                                backgroundColor: '#FF7676',
                                            }}
                                        >
                                            <TrashIcon
                                                style={{
                                                    width: '30px',
                                                    height: '30px',
                                                    fontSize: '80px',
                                                    color: '#FFFFFF',
                                                }}
                                            />
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleUpdateCertificat(certificat)
                                            }
                                            style={{
                                                borderRadius: '50%',
                                                backgroundColor: '#D8D83D',
                                            }}
                                        >
                                            <PencilSquareIcon
                                                style={{
                                                    width: '30px',
                                                    height: '30px',
                                                    fontSize: '80px',
                                                    color: '#FFFFFF',
                                                }}
                                            />
                                        </button>
                                        <Modal1
                                            isOpen={openModal1}
                                            close={() => setOpenModal(false)}
                                            title="Modifier la certificat  "
                                        >
                                            <div className="w-full rounded-md">
                                                <div className="flex flex-col items-center rounded-lg bg-white p-4 shadow dark:bg-gray-700 sm:flex-row">
                                                    <Formik
                                                        initialValues={certificat}
                                                        onSubmit={(values) => {
                                                            EditCertificat(values);
                                                        }}
                                                    >
                                                        <Form className="flex flex-col space-y-3 sm:flex-row sm:space-x-2 sm:space-y-0">
                                                            <div className="flex flex-col ">
                                                                <div className="flex flex-row">
                                                                    <div className="ml-2  flex">
                                                                        <Field
                                                                            name="title"
                                                                            component={
                                                                                Input
                                                                            }
                                                                            label="Dénomination du certificat"
                                                                            variant="outlined"
                                                                            type="text"
                                                                            margin="dense"
                                                                            InputLabelProps={{
                                                                                shrink: true,
                                                                            }}
                                                                            required
                                                                            className="customField"
                                                                        />
                                                                    </div>
                                                                    <div className=" ml-4">
                                                                        <Field
                                                                            name="dateIssuing"
                                                                            component={
                                                                                Input
                                                                            }
                                                                            label="Date d'acquisition du certificat "
                                                                            variant="outlined"
                                                                            type="date"
                                                                            fullWidth
                                                                            margin="dense"
                                                                            InputLabelProps={{
                                                                                shrink: true,
                                                                            }}
                                                                            required
                                                                            className="customField"
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="flex flex-row">
                                                                    <div className="ml-2  flex">
                                                                        <Field
                                                                            name="emplacement"
                                                                            component={
                                                                                Input
                                                                            }
                                                                            label="Organisme de formation"
                                                                            variant="outlined"
                                                                            type="text"
                                                                            margin="dense"
                                                                            InputLabelProps={{
                                                                                shrink: true,
                                                                            }}
                                                                            required
                                                                            className="customField"
                                                                        />
                                                                    </div>
                                                                    <div className="ml-2  flex">
                                                                        <Field
                                                                            name="idDoc"
                                                                            component={
                                                                                Input
                                                                            }
                                                                            label="Télécharger un certificat"
                                                                            variant="outlined"
                                                                            type="file"
                                                                            margin="dense"
                                                                            InputLabelProps={{
                                                                                shrink: true,
                                                                            }}
                                                                            required
                                                                            className="customField"
                                                                        />
                                                                    </div>
                                                                </div>

                                                                <div className="mt-8 flex flex-row">
                                                                    <button
                                                                        type="submit"
                                                                        color="default"
                                                                        className="validerBtn  ml-3 mr-4 w-40"
                                                                        style={{
                                                                            display:
                                                                                'flex',
                                                                            justifyContent:
                                                                                'center',
                                                                            alignItems:
                                                                                'center',
                                                                            width: '100px',
                                                                            height: '40px',
                                                                            background:
                                                                                'linear-gradient(178.36deg, #D8D83D 0%, #BDBD02 98.61%)',
                                                                            border: '2px solid #EEEEEE',
                                                                            boxShadow:
                                                                                '1px 1px 8px rgba(0, 0, 0, 0.3), inset 0px 1px 0px rgba(255, 255, 255, 0.08)',
                                                                            borderRadius:
                                                                                '5px',
                                                                        }}
                                                                    >
                                                                        Valider
                                                                    </button>

                                                                    <button
                                                                        type="button"
                                                                        color="default"
                                                                        onClick={() =>
                                                                            setOpenModal1(
                                                                                false,
                                                                            )
                                                                        }
                                                                        style={{
                                                                            display:
                                                                                'flex',
                                                                            justifyContent:
                                                                                'center',
                                                                            alignItems:
                                                                                'center',
                                                                            width: '100px',
                                                                            height: '40px',
                                                                            background:
                                                                                'white',
                                                                            border: '2px solid red',
                                                                            boxShadow:
                                                                                '1px 1px 8px rgba(0, 0, 0, 0.3), inset 0px 1px 0px rgba(255, 255, 255, 0.08)',
                                                                            borderRadius:
                                                                                '5px',
                                                                        }}
                                                                    >
                                                                        Annuler
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </Form>
                                                    </Formik>
                                                </div>
                                            </div>
                                        </Modal1>
                                        <button
                                            className="ml-4 flex"
                                            style={{
                                                borderRadius: '50%',
                                                backgroundColor: '#D2FFB6',
                                            }}
                                        >
                                            <ArrowsPointingOutIcon
                                                onClick={() =>
                                                    handleUpdateCertificat1(certificat)
                                                }
                                                style={{
                                                    width: '30px',
                                                    height: '30px',
                                                    fontSize: '80px',
                                                    color: '#FFFFFF',
                                                }}
                                            />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <Modal
                    isOpen={openModal}
                    close={() => setOpenModal(false)}
                    title="Ajouter une certificat"
                >
                    <div className="w-full rounded-md">
                        <div className="flex flex-col items-center rounded-lg bg-white p-4 shadow dark:bg-gray-700 sm:flex-row">
                            <Formik
                                initialValues={{
                                    title: '',
                                    emplacement: '',
                                    dateIssuing: null,
                                    consultantId: parseInt(idConsultant),
                                    idDoc: '',
                                }}
                                onSubmit={(values) => {
                                    postCertificat(values);
                                    /* handleDoc(values); */
                                }}
                            >
                                <Form className="flex flex-col space-y-3 sm:flex-row sm:space-x-2 sm:space-y-0">
                                    <div className="flex flex-col ">
                                        <div className="flex flex-row">
                                            <div className="ml-2  flex">
                                                <Field
                                                    name="title"
                                                    component={Input}
                                                    label="Dénomination du certificat"
                                                    variant="outlined"
                                                    type="text"
                                                    margin="dense"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    required
                                                    className="customField"
                                                />
                                            </div>
                                            <div className=" ml-4">
                                                <Field
                                                    name="dateIssuing"
                                                    component={Input}
                                                    label="Date d'acquisition du certificat "
                                                    variant="outlined"
                                                    type="date"
                                                    fullWidth
                                                    margin="dense"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    required
                                                    className="customField"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex flex-row">
                                            <div className="ml-2  flex">
                                                <Field
                                                    name="emplacement"
                                                    component={Input}
                                                    label="Organisme de formation"
                                                    variant="outlined"
                                                    type="text"
                                                    margin="dense"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    required
                                                    className="customField"
                                                />
                                            </div>
                                            <div className="ml-2  flex">
                                                <Field
                                                    name="peace"
                                                    component={Input}
                                                    label="Télécharger un certificat"
                                                    variant="outlined"
                                                    type="file"
                                                    margin="dense"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    required
                                                    className="customField"
                                                    onChange={handleFileInputChange}
                                                />
                                            </div>
                                        </div>

                                        <div className="mt-8 flex flex-row">
                                            <button
                                                type="submit"
                                                color="default"
                                                className="validerBtn  ml-3 mr-4 w-40"
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    width: '100px',
                                                    height: '40px',
                                                    background:
                                                        'linear-gradient(178.36deg, #D8D83D 0%, #BDBD02 98.61%)',
                                                    border: '2px solid #EEEEEE',
                                                    boxShadow:
                                                        '1px 1px 8px rgba(0, 0, 0, 0.3), inset 0px 1px 0px rgba(255, 255, 255, 0.08)',
                                                    borderRadius: '5px',
                                                }}
                                            >
                                                Valider
                                            </button>

                                            <button
                                                type="button"
                                                color="default"
                                                onClick={() => setOpenModal(false)}
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    width: '100px',
                                                    height: '40px',
                                                    background: 'white',
                                                    border: '2px solid red',
                                                    boxShadow:
                                                        '1px 1px 8px rgba(0, 0, 0, 0.3), inset 0px 1px 0px rgba(255, 255, 255, 0.08)',
                                                    borderRadius: '5px',
                                                }}
                                            >
                                                Annuler
                                            </button>
                                        </div>
                                    </div>
                                </Form>
                            </Formik>
                        </div>
                    </div>
                </Modal>
            </div>
            <div className="homediv ml-4 flex flex-col">
                <p className="para1 mt-4">Formations ajoutées</p>
                <div className="ml-2 mt-6">
                    {filteredCertificatss?.map((certificat) => (
                        // eslint-disable-next-line react/jsx-key
                        <div className="smalldiv mb-2">
                            <h6>{certificat.title}</h6>
                            <button
                                className="mr-4 flex"
                                onClick={() => handleDeleteCertificatFromCv(certificat)}
                                style={{
                                    borderRadius: '50%',
                                    backgroundColor: '#FF7676',
                                }}
                            >
                                <TrashIcon
                                    style={{
                                        width: '30px',
                                        height: '30px',
                                        fontSize: '80px',
                                        color: '#FFFFFF',
                                    }}
                                />
                            </button>
                        </div>
                    ))}
                </div>
                <button
                    type="submit"
                    color="default"
                    onClick={()=>handleNext()}
                    className="validerBtn  ml-3 mr-4 w-40"
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100px',
                        height: '40px',
                        background:
                            'linear-gradient(178.36deg, #D8D83D 0%, #BDBD02 98.61%)',
                        border: '2px solid #EEEEEE',
                        boxShadow:
                            '1px 1px 8px rgba(0, 0, 0, 0.3), inset 0px 1px 0px rgba(255, 255, 255, 0.08)',
                        borderRadius: '5px',
                    }}
                >
                    Génerer CV
                </button>
            </div>
        </div>
    );
};

export default Certificat;
