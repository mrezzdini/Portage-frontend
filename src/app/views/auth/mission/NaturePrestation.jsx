import './Ecran.css';

import { BackwardIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { PresentationChartBarIcon } from '@heroicons/react/24/outline';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';

import withAuth from '../../../common/withAuth';
import Modal from '../../../components/lib/container/Modal';
import TablePanelEcran from '../../../components/lib/container/table/TablePanelEcran';
import Button from '../../../components/lib/form/Button';
import Input from '../../../components/lib/form/Input';
import InputSelect from '../../../components/lib/form/InputSelect';
import useConfirm from '../../../hooks/useConfirm';
import missionService from '../../../services/missionService';

const NaturePrestation = () => {
    const [totalElements, setTotalElements] = useState([]);
    const [totalPages, setTotalPages] = useState([]);
    const [natures, setNatures] = useState([]);
    const [page, setPage] = useState(0);
    const [search, setSearch] = useState(null);
    const [sort, setSort] = useState(null);
    const [changed, setChanged] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    const [types, setTypes] = useState([]);
    const [formattedTypes, setFormattedTypes] = useState([]);
    //pour Alerte de sucés
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showDeleteSuccessAlert, setShowDeleteSuccessAlert] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [showEditSuccessAlert, setShowEditSuccessAlert] = useState(false);
    //Validation des champs
    const validateForm = (values) => {
        const errors = {};

        if (!values.name) {
            errors.name = 'Le champ Nature Préstation est obligatoire';
        }

        if (!values.type.id) {
            errors.type = 'Le champ Type est obligatoire';
        }

        return errors;
    };

    useEffect(() => {
        const fetchTypes = async () => {
            try {
                const type = await missionService.fetchActivitiesType();
                setTypes(type.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchTypes();
        const formattedTypes = types.map((type) => ({
            value: { id: type.id },
            label: type.name,
        }));
        setFormattedTypes(formattedTypes);
        const fetchNaturesData = async () => {
            try {
                const response = await missionService.fetchActivitiesNature();
                const natures = response.data;

                const formatedNatures = natures.map((nature) => {
                    return {
                        name: nature?.name,
                        type: nature?.type?.name,

                        delete: (
                            <DeleteBtn
                                id={nature.id}
                                setChanged={setChanged}
                                changed={changed}
                                setShowSuccessAlert={setShowSuccessAlert}
                                showDeleteSuccessAlert={showDeleteSuccessAlert}
                                setShowDeleteSuccessAlert={setShowDeleteSuccessAlert}
                            />
                        ),
                        edit: (
                            <EditBtn
                                nature={nature}
                                missionService={missionService}
                                setChanged={setChanged}
                                changed={changed}
                                formattedTypes={formattedTypes}
                                setShowSuccessAlert={setShowSuccessAlert}
                                showEditSuccessAlert={showEditSuccessAlert}
                                setShowEditSuccessAlert={setShowEditSuccessAlert}
                            />
                        ),
                    };
                });

                setTotalElements(natures.length);
                setTotalPages(Math.ceil(natures.length / 5));
                setNatures(formatedNatures);
            } catch (error) {
                console.error(error);
            }
        };

        fetchNaturesData();
    }, [page, search, sort, changed]);
    const postNatures = (values) => {
        missionService
            .postActivitiesNature(values)
            .then((response) => {
                console.log(response.data);
                setChanged(!changed);
                setOpenModal(false);
                setShowSuccessAlert(true);
                setShowAlert(true);
                setTimeout(() => {
                    setShowAlert(false);
                }, 3000);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="my-5 border-y py-5">
            <div className="mb-2 mr-3 flex justify-end">
                <Button
                    type="button"
                    color="default"
                    className="custom2-button w-auto"
                    onClick={() => setOpenModal(true)}
                >
                    <div className="text-center">
                        <div>
                            Ajouter <br />
                            une nature <br />
                            de préstation
                        </div>
                        <div className="mt-2">
                            <PresentationChartBarIcon className="mx-auto h-8 w-8" />
                        </div>
                    </div>
                </Button>
                <Modal
                    isOpen={openModal}
                    close={() => setOpenModal(false)}
                    title="Ajouter une nature de prestation"
                >
                    <div className="w-full rounded-md">
                        <div className="flex flex-col items-center rounded-lg bg-white p-4 shadow dark:bg-gray-700 sm:flex-row">
                            <Formik
                                initialValues={{
                                    name: '',
                                    type: { id: 0 },
                                }}
                                validate={validateForm}
                                onSubmit={(values) => {
                                    postNatures(values);
                                }}
                            >
                                <Form className="flex flex-col space-y-3 sm:flex-row sm:space-x-2 sm:space-y-0">
                                    <Field
                                        name="name"
                                        component={Input}
                                        placeholder="Taper une nature de préstation"
                                        label="Nature préstation*"
                                        variant="outlined"
                                        type="text"
                                        margin="dense"
                                    />
                                    <Field
                                        name="type"
                                        component={InputSelect}
                                        placeholder="Selectionner un type..."
                                        label="Type*"
                                        options={formattedTypes}
                                        InputLabelProps={{ shrink: true }}
                                    />
                                    <Button
                                        color="pink"
                                        type="submit"
                                        className="my-8 w-full self-start sm:w-min sm:self-end"
                                    >
                                        Valider
                                    </Button>
                                </Form>
                            </Formik>
                        </div>
                        <div className="mt-4 flex justify-end">
                            <span className="ml-3 inline-flex rounded-md shadow-sm">
                                <button
                                    type="button"
                                    className={`btn btn-green`}
                                    onClick={() => setOpenModal(false)}
                                >
                                    Annuler
                                </button>
                            </span>
                        </div>
                    </div>
                </Modal>
            </div>
            {showAlert && (
                <div
                    className="alert alert-success"
                    role="alert"
                    style={{
                        backgroundColor: 'green',
                        color: 'white',
                        padding: '10px',
                        borderRadius: '5px',
                        fontSize: '16px',
                        marginBottom: '10px',
                    }}
                >
                    La nature de préstation a été créé avec succès !
                </div>
            )}
            {showDeleteSuccessAlert && (
                <div
                    className="alert alert-success"
                    role="alert"
                    style={{
                        backgroundColor: 'green',
                        color: 'white',
                        padding: '10px',
                        borderRadius: '5px',
                        fontSize: '16px',
                        marginBottom: '10px',
                    }}
                >
                    La nature de préstation a été supprimé avec succès !
                </div>
            )}
            {showEditSuccessAlert && (
                <div
                    className="alert alert-success"
                    role="alert"
                    style={{
                        backgroundColor: 'green',
                        color: 'white',
                        padding: '10px',
                        borderRadius: '5px',
                        fontSize: '16px',
                        marginBottom: '10px',
                    }}
                >
                    La modification a été effectuée avec succès !
                </div>
            )}
            <TablePanelEcran
                column={[
                    {
                        name: 'name',
                        label: (
                            <span className="label-nom-type">
                                <span>N</span>om nature
                            </span>
                        ),
                    },
                    {
                        name: 'type',
                        label: (
                            <span className="label-nom-type">
                                <span>N</span>om type
                            </span>
                        ),
                    },
                ]}
                rows={natures}
                onSearch={(natures) => {
                    setSearch(natures.search);
                    setPage(0);
                }}
                onSort={(natures) => {
                    setSort(natures);
                    setPage(0);
                }}
                totalElements={totalElements}
                pageSize={5}
                totalPages={totalPages}
                onPageChange={setPage}
                currentPage={page}
                setCurrentPage={setPage}
            />
        </div>
    );
};
const DeleteBtn = ({
    id,
    setChanged,
    changed,
    setShowSuccessAlert,
    showDeleteSuccessAlert,
    setShowDeleteSuccessAlert,
}) => {
    const [localChanged, setLocalChanged] = useState(changed);

    useEffect(() => {
        setLocalChanged(changed);
    }, [changed]);

    const confirm = useConfirm();

    const handleConfirm = async () => {
        const result = await confirm({
            title: 'Supprimer la nature de prestation ?',
            description: 'la nature de préstation sera supprimer ',
        });
        if (result) {
            try {
                await missionService.deleteActivitiesNature(id);
                setChanged((prevChanged) => !prevChanged); // Update the parent component's `changed` state
                setShowSuccessAlert(false); // Définit l'état pour afficher l'alerte de succès
                setShowDeleteSuccessAlert(true); // Définit l'état pour afficher l'alerte de suppression réussie
                setTimeout(() => {
                    setShowDeleteSuccessAlert(false);
                }, 3000);
            } catch (error) {
                console.error(error);
                // Display an error message or perform error handling here
            }
        }
        console.log(result);
    };

    return (
        <button
            onClick={handleConfirm}
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
    );
};

const EditBtn = ({
    nature,
    missionService,
    setChanged,
    changed,
    formattedTypes,
    setShowSuccessAlert,
    showEditSuccessAlert,
    setShowEditSuccessAlert,
}) => {
    const [openModal, setOpenModal] = useState(false);
    const [initialValues, setInitialValues] = useState({});
    const [localChanged, setLocalChanged] = useState(changed);

    useEffect(() => {
        setLocalChanged(changed);
    }, [changed]);

    const handleEdit = async () => {
        setOpenModal(true);
        // Assuming you have access to the mission data, set the initial form values
        const initialFormValues = {
            name: nature.name,
            type: { id: nature.type.id, name: nature.type.name }, // Utilisez l'objet du type complet
        };
        setInitialValues(initialFormValues);
    };

    return (
        <>
            <button
                onClick={handleEdit}
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
            <Modal
                isOpen={openModal}
                close={() => setOpenModal(false)}
                title="Modifier la Nature de préstation"
            >
                <div className="w-full rounded-md">
                    <div className="flex flex-col items-center rounded-lg bg-white p-4 shadow dark:bg-gray-700 sm:flex-row">
                        {initialValues && (
                            <Formik
                                initialValues={initialValues}
                                onSubmit={(values) => {
                                    missionService
                                        .updateActivitiesNature(nature.id, values)
                                        .then(() => {
                                            setChanged((prevChanged) => !prevChanged); // Update the parent component's `changed` state
                                            setShowSuccessAlert(false);
                                            setShowEditSuccessAlert(true); // Définit l'état pour afficher l'alerte de succès
                                            setTimeout(() => {
                                                setShowEditSuccessAlert(false);
                                            }, 3000);
                                        })
                                        .catch((error) => {
                                            console.log(error);
                                        });
                                    setOpenModal(false);
                                }}
                            >
                                <Form className="flex flex-col space-y-3 sm:flex-row sm:space-x-2 sm:space-y-0">
                                    <Field
                                        name="name"
                                        component={Input}
                                        placeholder="Modifier Type de mission"
                                        label="Nom"
                                        variant="outlined"
                                        type="text"
                                        margin="dense"
                                    />
                                    <Field
                                        name="type"
                                        component={InputSelect}
                                        placeholder="Selectionner un type..."
                                        label="Type"
                                        options={formattedTypes}
                                        InputLabelProps={{ shrink: true }}
                                        required
                                        value={initialValues.type}
                                    />
                                    <Button
                                        color="pink"
                                        type="submit"
                                        className="my-8 w-full self-start sm:w-min sm:self-end"
                                    >
                                        Valider
                                    </Button>
                                </Form>
                            </Formik>
                        )}
                    </div>
                    <div className="mt-4 flex justify-end">
                        <span className="ml-3 inline-flex rounded-md shadow-sm">
                            <button
                                type="button"
                                className="btn btn-green"
                                onClick={() => setOpenModal(false)}
                            >
                                Annuler
                            </button>
                        </span>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default withAuth(NaturePrestation);
