import './Education.css';

import { TrashIcon } from '@heroicons/react/24/outline';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { ArrowsPointingOutIcon } from '@heroicons/react/24/outline';
import { Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getSkillsAction, UpdateSkill } from '../../../actions/SkillActions';
import { createSkill } from '../../../actions/SkillActions';
import { deleteSkill } from '../../../actions/SkillActions';
import Modal from '../../../components/lib/container/Modal';
import Modal1 from '../../../components/lib/container/Modal';
import Input from '../../../components/lib/form/Input';
import InputSelect from '../../../components/lib/form/InputSelect';
import useConfirm from '../../../hooks/useConfirm';
import ConsultantService from '../../../services/ConsultantService';
const Skill = () => {
    const [openModal1, setOpenModal1] = useState(false);
    const [skill, setSkill] = useState({});
    const { id } = useParams();
    console.log(id);
    const dispatch = useDispatch();
    const [openModal, setOpenModal] = useState(false);
    const { skills } = useSelector((state) => state.skills);
    const storage = localStorage.getItem('persist:auth');
    let userId;
    const [idConsultant, SetIdConsultant] = useState(null);
    if (storage) userId = JSON.parse(JSON.parse(storage).userId);

    const getUserById = async () => {
        try {
            const response1 = await ConsultantService.getConsultantByUserId(userId);
            SetIdConsultant(response1.data.id);
            dispatch(getSkillsAction(response1.data.id));
        } catch (error) {
            console.error(error);
        }
    };

    console.log(skills);
    const filteredSkillss = skills?.filter((skill) =>
        skill?.cvs?.some((cv) => cv.id === parseInt(id)),
    );
    /* setfilteredSkills(filteredSkillss);
    console.log('mamamamam', filtredSkills); */

    const initialValue = {
        name: '',
        type: '',
        level: '',
        cvs: [],
        consultant_id: parseInt(idConsultant),
    };
    const Types = [
        { label: 'HardSkill', value: 'HardSkill' },
        { label: 'SoftSkill', value: 'SoftSkill' },
        { label: 'langue', value: 'langue' },
    ];

    console.log(initialValue);
    useEffect(() => {
        getUserById();
    }, [dispatch, userId]);
    const postSkill = async (values) => {
        console.log('hahahah', values);
        dispatch(createSkill(values));
        setOpenModal(false);
    };
    const confirm = useConfirm();
    const handleDeleteSkill = async (id) => {
        const result = await confirm({
            title: 'Supprimer?',
            description: 'Voulez vous supprimer cettte competence?? ',
        });
        if (result) {
            try {
                dispatch(deleteSkill(id));
            } catch (error) {
                console.log(error);
            }
        }
    };
    const handleUpdateSkill = async (skill) => {
        setSkill(skill);

        setOpenModal1(true);
    };
    const handleUpdateSkill1 = async (skill) => {
        const newvalue = {
            id: skill.id,
            name: skill.name,
            type: skill.type,
            level: skill.level,
            cvs: [...skill.cvs, { id: parseInt(id) }],
            consultantId: skill.consultantId,
        };
        dispatch(createSkill(newvalue));
    };
    const handleDeleteSkillFromCv = async (skill) => {
        const newvalue = {
            id: skill.id,
            name: skill.name,
            type: skill.type,
            level: skill.level,
            consultantId: skill.consultantId,
            cvs: skill.cvs.filter((cv) => cv.id !== parseInt(id)),
        };
        dispatch(createSkill(newvalue));
    };
    const EditSkill = async (value) => {
        dispatch(UpdateSkill(value));
        setOpenModal1(false);
    };

    return (
        <div className="flex min-h-screen">
            <div className="flex flex-row justify-between">
                <div>
                    <div className="flex flex-row">
                        <p className="para">Mes Competences</p>
                        <button
                            className="formation-button"
                            onClick={() => setOpenModal(true)}
                        >
                            Créer une Competence
                        </button>
                    </div>

                    <div className="flex flex-row">
                    <div className='education-card4'>
                            <h4 className="mb-4 mt-4 flex">Hard Skills</h4>
                            {skills?.map(
                                (skill) =>
                                    skill.type === 'HardSkill' && (
                                        // eslint-disable-next-line react/jsx-key
                                        <div>
                                            <div
                                                className="education-card1"
                                                key={skill.id}
                                            >
                                                <h6>
                                                    {skill.name} {skill.level}/5
                                                </h6>

                                                <div
                                                    style={{ marginLeft: 'auto' }}
                                                    className="felx-row flex"
                                                >
                                                    <button
                                                        className="mr-4 flex"
                                                        onClick={() =>
                                                            handleDeleteSkill(skill)
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
                                                            handleUpdateSkill(skill)
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
                                                    <button
                                                        className="ml-4 flex"
                                                        style={{
                                                            borderRadius: '50%',
                                                            backgroundColor: '#D2FFB6',
                                                        }}
                                                    >
                                                        <ArrowsPointingOutIcon
                                                            onClick={() =>
                                                                handleUpdateSkill1(skill)
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
                                    ),
                            )}
                        </div>
                        <div className='education-card4'>
                            <h4 className="mb-4 mt-4 flex">Soft Skills</h4>
                            {skills?.map(
                                (skill) =>
                                    skill.type === 'SoftSkill' && (
                                        // eslint-disable-next-line react/jsx-key
                                        <div>
                                            <div
                                                className="education-card1"
                                                key={skill.id}
                                            >
                                                <h6>
                                                    {skill.name} {skill.level} /5
                                                </h6>

                                                <div
                                                    style={{ marginLeft: 'auto' }}
                                                    className="felx-row flex"
                                                >
                                                    <button
                                                        className="mr-4 flex"
                                                        onClick={() =>
                                                            handleDeleteSkill(skill)
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
                                                            handleUpdateSkill(skill)
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
                                                    <button
                                                        className="ml-4 flex"
                                                        style={{
                                                            borderRadius: '50%',
                                                            backgroundColor: '#D2FFB6',
                                                        }}
                                                    >
                                                        <ArrowsPointingOutIcon
                                                            onClick={() =>
                                                                handleUpdateSkill1(skill)
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
                                    ),
                            )}
                        </div>
                        <div className='education-card4'>
                            <h4 className="mb-4 mt-4 flex"> Langue</h4>
                            {skills?.map(
                                (skill) =>
                                    skill.type === 'langue' && (
                                        // eslint-disable-next-line react/jsx-key
                                        <div>
                                            <div
                                                className="education-card1"
                                                key={skill.id}
                                            >
                                                <h6>
                                                    {skill.name} {skill.level} /5
                                                </h6>

                                                <div
                                                    style={{ marginLeft: 'auto' }}
                                                    className="felx-row flex"
                                                >
                                                    <button
                                                        className="mr-4 flex"
                                                        onClick={() =>
                                                            handleDeleteSkill(skill)
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
                                                            handleUpdateSkill(skill)
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
                                                    <button
                                                        className="ml-4 flex"
                                                        style={{
                                                            borderRadius: '50%',
                                                            backgroundColor: '#D2FFB6',
                                                        }}
                                                    >
                                                        <ArrowsPointingOutIcon
                                                            onClick={() =>
                                                                handleUpdateSkill1(skill)
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
                                    ),
                            )}
                        </div>
                    </div>
                </div>
                <Modal1
                    isOpen={openModal1}
                    close={() => setOpenModal(false)}
                    title="Modifier la formation  "
                >
                    <div className="w-full rounded-md">
                        <div className="flex flex-col items-center rounded-lg bg-white p-4 shadow dark:bg-gray-700 sm:flex-row">
                            <Formik
                                initialValues={skill}
                                onSubmit={(values) => {
                                    EditSkill(values);
                                }}
                            >
                                <Form className="flex flex-col space-y-3 sm:flex-row sm:space-x-2 sm:space-y-0">
                                    <div className="flex flex-col ">
                                        <div className="flex flex-row">
                                            <div className="ml-2  flex">
                                                <Field
                                                    name="name"
                                                    component={Input}
                                                    label="Nom de la competence"
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
                                                    name="type"
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
                                        </div>
                                        <div className="flex flex-row">
                                            <div className="ml-2  flex">
                                                <div className="flex flex-col">
                                                    <label htmlFor="level">Niveau</label>
                                                    <Field
                                                        name="level"
                                                        component="input"
                                                        label="Niveau"
                                                        variant="outlined"
                                                        type="range"
                                                        min="0"
                                                        max="5"
                                                        step="1"
                                                        margin="dense"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        required
                                                        className="customField"
                                                    />
                                                </div>
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
                                                onClick={() => setOpenModal1(false)}
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
                </Modal1>
                <Modal
                    isOpen={openModal}
                    close={() => setOpenModal(false)}
                    title="Ajouter une competance"
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
                                    postSkill(values);
                                }}
                            >
                                <Form className="flex flex-col space-y-3 sm:flex-row sm:space-x-2 sm:space-y-0">
                                    <div className="flex flex-col ">
                                        <div className="flex flex-row">
                                            <div className="ml-2  flex">
                                                <Field
                                                    name="name"
                                                    component={Input}
                                                    label="Nom de la competence"
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
                                                    name="type"
                                                    component={InputSelect}
                                                    placeholder="Selectionner un type..."
                                                    label="Type"
                                                    options={Types}
                                                    InputLabelProps={{ shrink: true }}
                                                    required
                                                    className="customField"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex flex-row">
                                            <div className="ml-2  flex">
                                                <div className="flex flex-col">
                                                    <label htmlFor="level">Niveau</label>
                                                    <Field
                                                        name="level"
                                                        component="input"
                                                        label="Niveau"
                                                        variant="outlined"
                                                        type="range"
                                                        min="0"
                                                        max="5"
                                                        step="1"
                                                        margin="dense"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        required
                                                        className="customField"
                                                    />
                                                </div>
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
                <p className="para1 mt-4">Skills ajoutées</p>
                <div className="ml-2 mt-6">
                    {filteredSkillss?.map((skill) => (
                        // eslint-disable-next-line react/jsx-key
                        <div className="smalldiv mb-2">
                            <div className="flex flex-row" key={skill.id}>
                                <h6>
                                    {skill.name} {skill.level} %
                                </h6>
                            </div>
                            <button
                                className="mr-4 flex"
                                onClick={() => handleDeleteSkillFromCv(skill)}
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
                {/* <button
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

export default Skill;
