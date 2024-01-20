import './Education.css';

import { TrashIcon } from '@heroicons/react/24/outline';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { ArrowsPointingOutIcon } from '@heroicons/react/24/outline';
import { Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getEducationsAction, UpdateEducation } from '../../../actions/EducationActions';
import { createEducation } from '../../../actions/EducationActions';
import { deleteEducation } from '../../../actions/EducationActions';
import Modal from '../../../components/lib/container/Modal';
import Modal1 from '../../../components/lib/container/Modal';
import Input from '../../../components/lib/form/Input';
import useConfirm from '../../../hooks/useConfirm';
import ConsultantService from '../../../services/ConsultantService';
const Education = () => {
    const [openModal1, setOpenModal1] = useState(false);
    const [education, setEducation] = useState({});
    const { id } = useParams();
    console.log(id);
    const dispatch = useDispatch();
    const [openModal, setOpenModal] = useState(false);
    const { educations } = useSelector((state) => state.educations);
    const storage = localStorage.getItem('persist:auth');
    let userId;
    const [idConsultant, SetIdConsultant] = useState(null);
    if (storage) userId = JSON.parse(JSON.parse(storage).userId);

    const getUserById = async () => {
        try {
            const response1 = await ConsultantService.getConsultantByUserId(userId);
            SetIdConsultant(response1.data.id);
            dispatch(getEducationsAction(response1.data.id));
        } catch (error) {
            console.error(error);
        }
    };
    const filteredEducationss = educations?.filter((education) =>
        education?.cvs?.some((cv) => cv.id === parseInt(id)),
    );
    /* setfilteredEducations(filteredEducationss);
    console.log('mamamamam', filtredEducations); */

    const initialValue = {
        title: '',
        description: '',
        school: '',
        startDate: null,
        endDate: null,
        consultant_id: parseInt(idConsultant),
    };

    console.log(initialValue);
    useEffect(() => {
        getUserById();
    }, [dispatch, userId]);
    const postEducation = async (values) => {
        console.log('hahahah', values);
        dispatch(createEducation(values));
    };
    const confirm = useConfirm();
    const handleDeleteEducation = async (id) => {
        const result = await confirm({
            title: 'Supprimer?',
            description: 'Voulez vous supprimer ce prestation?? ',
        });
        if (result) {
            try {
                dispatch(deleteEducation(id));
            } catch (error) {
                console.log(error);
            }
        }
    };
    const handleUpdateEducation = async (educ) => {
        setEducation(educ);

        setOpenModal1(true);
    };
    const handleUpdateEducation1 = async (education) => {
        const newvalue = {
            id: education.id,
            title: education.title,
            description: education.description,
            school: education.school,
            startDate: education.startDate,
            endDate: education.endDate,
            cvs: [...education.cvs, { id: parseInt(id) }],
            consultantId: education.consultantId,
        };
        dispatch(createEducation(newvalue));
    };
    const handleDeleteEducationFromCv = async (education) => {
        const newvalue = {
            id: education.id,
            title: education.title,
            description: education.description,
            school: education.school,
            startDate: education.startDate,
            endDate: education.endDate,
            consultantId: education.consultantId,
            cvs: education.cvs.filter((cv) => cv.id !== parseInt(id)),

        };
        dispatch(createEducation(newvalue));
    };
    const EditEducation = async (value) => {
        dispatch(UpdateEducation(value));
        setOpenModal1(false);
    };

    return (
        <div className="flex min-h-screen">
            <div className="flex flex-row justify-between">
                <div>
                    <div className="flex flex-row">
                        <p className="para">Mes formations</p>
                        <button
                            className="formation-button"
                            onClick={() => setOpenModal(true)}
                        >
                            Créer une formation
                        </button>
                    </div>

                    <div className="">
                        {educations?.map((education) => (
                            // eslint-disable-next-line react/jsx-key
                            <div>
                                <h6>{education.title}</h6>
                                <div className="education-card" key={education.id}>
                                    <p>{education.school}</p>
                                    <p>
                                        Entre {education.startDate} et {education.endDate}
                                    </p>
                                    <p>{education.description}</p>

                                    <div
                                        style={{ marginLeft: 'auto' }}
                                        className="felx-row flex"
                                    >
                                        <button
                                            className="mr-4 flex"
                                            onClick={() =>
                                                handleDeleteEducation(education)
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
                                                handleUpdateEducation(education)
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
                                            title="Modifier la formation  "
                                        >
                                            <div className="w-full rounded-md">
                                                <div className="flex flex-col items-center rounded-lg bg-white p-4 shadow dark:bg-gray-700 sm:flex-row">
                                                    <Formik
                                                        initialValues={education}
                                                        onSubmit={(values) => {
                                                            EditEducation(values);
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
                                                                            label="Nom de la formation"
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
                                                                            name="startDate"
                                                                            component={
                                                                                Input
                                                                            }
                                                                            label="Début de la formation"
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
                                                                            name="school"
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
                                                                    <div className=" ml-4">
                                                                        <Field
                                                                            name="endDate"
                                                                            component={
                                                                                Input
                                                                            }
                                                                            label="Fin de la formation"
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
                                                                            name="description"
                                                                            component={
                                                                                Input
                                                                            }
                                                                            label="Description de la formation"
                                                                            variant="outlined"
                                                                            type="text"
                                                                            margin="dense"
                                                                            InputLabelProps={{
                                                                                shrink: true,
                                                                            }}
                                                                            required
                                                                            className="customField1"
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
                                                    handleUpdateEducation1(education)
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
                    title="Ajouter une formation"
                >
                    <div className="w-full rounded-md">
                        <div className="flex flex-col items-center rounded-lg bg-white p-4 shadow dark:bg-gray-700 sm:flex-row">
                            <Formik
                                initialValues={{
                                    title: '',
                                    description: '',
                                    school: '',
                                    startDate: null,
                                    consultantId: parseInt(idConsultant),
                                }}
                                onSubmit={(values) => {
                                    postEducation(values);
                                }}
                            >
                                <Form className="flex flex-col space-y-3 sm:flex-row sm:space-x-2 sm:space-y-0">
                                    <div className="flex flex-col ">
                                        <div className="flex flex-row">
                                            <div className="ml-2  flex">
                                                <Field
                                                    name="title"
                                                    component={Input}
                                                    label="Nom de la formation"
                                                    variant="outlined"
                                                    type="text"
                                                    margin="dense"
                                                    InputLabelProps={{ shrink: true }}
                                                    required
                                                    className="customField"
                                                />
                                            </div>
                                            <div className=" ml-4">
                                                <Field
                                                    name="startDate"
                                                    component={Input}
                                                    label="Début de la formation"
                                                    variant="outlined"
                                                    type="date"
                                                    fullWidth
                                                    margin="dense"
                                                    InputLabelProps={{ shrink: true }}
                                                    required
                                                    className="customField"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex flex-row">
                                            <div className="ml-2  flex">
                                                <Field
                                                    name="school"
                                                    component={Input}
                                                    label="Organisme de formation"
                                                    variant="outlined"
                                                    type="text"
                                                    margin="dense"
                                                    InputLabelProps={{ shrink: true }}
                                                    required
                                                    className="customField"
                                                />
                                            </div>
                                            <div className=" ml-4">
                                                <Field
                                                    name="endDate"
                                                    component={Input}
                                                    label="Fin de la formation"
                                                    variant="outlined"
                                                    type="date"
                                                    fullWidth
                                                    margin="dense"
                                                    InputLabelProps={{ shrink: true }}
                                                    required
                                                    className="customField"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex flex-row">
                                            <div className="ml-2  flex">
                                                <Field
                                                    name="description"
                                                    component={Input}
                                                    label="Description de la formation"
                                                    variant="outlined"
                                                    type="text"
                                                    margin="dense"
                                                    InputLabelProps={{ shrink: true }}
                                                    required
                                                    className="customField1"
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
                    {filteredEducationss?.map((education) => (
                        // eslint-disable-next-line react/jsx-key
                        <div className="smalldiv mb-2">
                            <h6>{education.title}</h6>
                            <div className="flex flex-col" key={education.id}>
                                <p>{education.school}</p>
                                <p>
                                    {education.startDate} - {education.endDate}
                                </p>
                            </div>
                            <button
                                className="mr-4 flex"
                                onClick={() => handleDeleteEducationFromCv(education)}
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
              {/*   <button
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
                </button> */}
            </div>
        </div>
    );
};

export default Education;
