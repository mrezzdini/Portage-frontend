import './Education.css';

import { TrashIcon } from '@heroicons/react/24/outline';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { ArrowsPointingOutIcon } from '@heroicons/react/24/outline';
import { Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
    getExperiencesAction,
    UpdateExperience,
} from '../../../actions/ExperienceActions';
import { createExperience } from '../../../actions/ExperienceActions';
import { deleteExperience } from '../../../actions/ExperienceActions';
import Modal from '../../../components/lib/container/Modal';
import Modal1 from '../../../components/lib/container/Modal';
import Input from '../../../components/lib/form/Input';
import useConfirm from '../../../hooks/useConfirm';
import ConsultantService from '../../../services/ConsultantService';
const Experience = () => {
    const [openModal1, setOpenModal1] = useState(false);
    const [experience, setExperience] = useState({});
    const { id } = useParams();
    console.log(id);
    const dispatch = useDispatch();
    const [openModal, setOpenModal] = useState(false);
    const { experiences } = useSelector((state) => state.experiences);
    const storage = localStorage.getItem('persist:auth');
    let userId;
    const [idConsultant, SetIdConsultant] = useState(null);
    if (storage) userId = JSON.parse(JSON.parse(storage).userId);

    const getUserById = async () => {
        try {
            const response1 = await ConsultantService.getConsultantByUserId(userId);
            SetIdConsultant(response1.data.id);
            dispatch(getExperiencesAction(response1.data.id));
        } catch (error) {
            console.error(error);
        }
    };

    console.log(experiences);
    const filteredExperiencess = experiences?.filter((experience) =>
        experience?.cvs?.some((cv) => cv.id === parseInt(id)),
    );
    /* setfilteredExperiences(filteredExperiencess);
    console.log('mamamamam', filtredExperiences); */

    const initialValue = {
        title: '',
        description: '',
        companyName: '',
        startDate: null,
        endDate: null,
        cvs: [],
        consultant_id: parseInt(idConsultant),
    };

    console.log(initialValue);
    useEffect(() => {
        getUserById();
    }, [dispatch, userId]);
    const postExperience = async (values) => {
        console.log('hahahah', values);
        dispatch(createExperience(values));
    };
    const confirm = useConfirm();
    const handleDeleteExperience = async (id) => {
        const result = await confirm({
            title: 'Supprimer?',
            description: 'Voulez vous supprimer ce prestation?? ',
        });
        if (result) {
            try {
                dispatch(deleteExperience(id));
            } catch (error) {
                console.log(error);
            }
        }
    };
    const handleUpdateExperience = async (educ) => {
        setExperience(educ);

        setOpenModal1(true);
    };
    const handleUpdateExperience1 = async (experience) => {
        const newvalue = {
            id: experience.id,
            title: experience.title,
            description: experience.description,
            companyName: experience.companyName,
            startDate: experience.startDate,
            endDate: experience.endDate,
            cvs: [...experience.cvs, { id: parseInt(id) }],
            consultantId: experience.consultantId,
        };
        dispatch(createExperience(newvalue));
    };
    const handleDeleteExperienceFromCv = async (experience) => {
        const newvalue = {
            id: experience.id,
            title: experience.title,
            description: experience.description,
            companyName: experience.companyName,
            startDate: experience.startDate,
            endDate: experience.endDate,
            consultantId: experience.consultantId,
            cvs: experience.cvs.filter((cv) => cv.id !== parseInt(id)),
        };
        dispatch(createExperience(newvalue));
    };
    const EditExperience = async (value) => {
        dispatch(UpdateExperience(value));
        setOpenModal1(false);
    };

    return (
        <div className="flex min-h-screen">
            <div className="flex flex-row justify-between">
                <div>
                    <div className="flex flex-row">
                        <p className="para">Mes Experiences</p>
                        <button
                            className="formation-button"
                            onClick={() => setOpenModal(true)}
                        >
                            Créer une experience
                        </button>
                    </div>

                    <div className="">
                        {experiences?.map((experience) => (
                            // eslint-disable-next-line react/jsx-key
                            <div>
                                <h6>{experience.title}</h6>
                                <div className="education-card" key={experience.id}>
                                    <p>{experience.companyName}</p>
                                    <p>
                                        Entre {experience.startDate} et{' '}
                                        {experience.endDate}
                                    </p>
                                    <p>{experience.description}</p>

                                    <div
                                        style={{ marginLeft: 'auto' }}
                                        className="felx-row flex"
                                    >
                                        <button
                                            className="mr-4 flex"
                                            onClick={() =>
                                                handleDeleteExperience(experience)
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
                                                handleUpdateExperience(experience)
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
                                            title="Modifier la experience  "
                                        >
                                            <div className="w-full rounded-md">
                                                <div className="flex flex-col items-center rounded-lg bg-white p-4 shadow dark:bg-gray-700 sm:flex-row">
                                                    <Formik
                                                        initialValues={experience}
                                                        onSubmit={(values) => {
                                                            EditExperience(values);
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
                                                                            label="Nom d'experience"
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
                                                                            label="Début dee debut"
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
                                                                            name="companyName"
                                                                            component={
                                                                                Input
                                                                            }
                                                                            label="Organisme de travail"
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
                                                                            label="Date de fin"
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
                                                                            label="Description d'experience"
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
                                                    handleUpdateExperience1(experience)
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
                    title="Ajouter une experience"
                >
                    <div className="w-full rounded-md">
                        <div className="flex flex-col items-center rounded-lg bg-white p-4 shadow dark:bg-gray-700 sm:flex-row">
                            <Formik
                                initialValues={{
                                    title: '',
                                    description: '',
                                    companyName: '',
                                    startDate: null,
                                    consultantId: parseInt(idConsultant),
                                }}
                                onSubmit={(values) => {
                                    postExperience(values);
                                }}
                            >
                                <Form className="flex flex-col space-y-3 sm:flex-row sm:space-x-2 sm:space-y-0">
                                    <div className="flex flex-col ">
                                        <div className="flex flex-row">
                                            <div className="ml-2  flex">
                                                <Field
                                                    name="title"
                                                    component={Input}
                                                    label="Nom d'experience"
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
                                                    label="Date de début"
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
                                                    name="companyName"
                                                    component={Input}
                                                    label="Organisme de travail"
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
                                                    label="Date de fin"
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
                                                    label="Description de l'experience"
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
                <p className="para1 mt-4">Experiences ajoutées</p>
                <div className="ml-2 mt-6">
                    {filteredExperiencess?.map((experience) => (
                        // eslint-disable-next-line react/jsx-key
                        <div className="smalldiv mb-2">
                            <h6>{experience.title}</h6>
                            <div className="flex flex-col" key={experience.id}>
                                <p>{experience.companyName}</p>
                                <p>
                                    {experience.startDate} - {experience.endDate}
                                </p>
                            </div>
                            <button
                                className="mr-4 flex"
                                onClick={() => handleDeleteExperienceFromCv(experience)}
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

export default Experience;
