import './Prestation.css';

import { BackwardIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { ListBulletIcon } from '@heroicons/react/24/outline';
import { getMonth, getYear } from 'date-fns';
import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
// import { Controller, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import withAuth from '../../../common/withAuth';
import Modal from '../../../components/lib/container/Modal';
import TablePanel from '../../../components/lib/container/table/TablePanelMission';
import TablePanelPrestation from '../../../components/lib/container/table/TablePanelPrestation';
import Button from '../../../components/lib/form/Button';
import Input from '../../../components/lib/form/Input';
import InputSelect from '../../../components/lib/form/InputSelect';
import useConfirm from '../../../hooks/useConfirm';
import missionService from '../../../services/missionService';
const Prestation = () => {
    const [mission, setMission] = useState(null);
    const [page, setPage] = useState(0);
    const [search, setSearch] = useState(null);
    const [sort, setSort] = useState(null);
    const [activities, setActivities] = useState([]);
    const [clients, setClients] = useState([]);
    const [consultants, setConsultants] = useState([]);
    const [types, setTypes] = useState([]);
    const [natures, setNatures] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const { id } = useParams();
    const [changed, setChanged] = useState([]);
    //pour Alerte de sucés
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showDeleteSuccessAlert, setShowDeleteSuccessAlert] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [showEditSuccessAlert, setShowEditSuccessAlert] = useState(false);
    const [showDeleteFailureAlert, setShowDeleteFailureAlert] = useState(false);
    useEffect(() => {
        const fetchMissionAndActivities = async () => {
            try {
                const mission = await missionService.getMissionByID(id);
                setMission(mission.data);

                const activities = await missionService.fetchActivities();
                setActivities(activities.data);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchClients = async () => {
            try {
                const clients = await missionService.fetchClients();
                setClients(clients.data);
            } catch (error) {
                console.error(error);
            }
        };
        const fetchConsultants = async () => {
            try {
                const consultant = await missionService.fetchConsultants();
                setConsultants(consultant.data);
            } catch (error) {
                console.error(error);
            }
        };
        const fetchTypes = async () => {
            try {
                const type = await missionService.fetchActivitiesType();
                setTypes(type.data);
            } catch (error) {
                console.error(error);
            }
        };
        const fetchNatures = async () => {
            try {
                const nature = await missionService.fetchActivitiesNature();
                setNatures(nature.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchTypes();
        fetchNatures();
        fetchMissionAndActivities();
        fetchClients();
        fetchConsultants();
    }, [id, changed]);
    const formattedTypes = types.map((type) => ({
        value: { id: type.id },
        label: type.name,
    }));
    const formattedNatures = natures.map((nature) => ({
        value: { id: nature.id },
        label: nature.name,
    }));
    const formatMissionData = (mission) => {
        const clientName =
            clients.find((c) => c.id === String(mission.client))?.nomcontact +
                ' ' +
                clients.find((c) => c.id === String(mission.client))?.prenom ?? '';
        const consultantName =
            consultants.find((c) => c.id === mission.consultant)?.firstName +
                ' ' +
                consultants.find((c) => c.id === mission.consultant)?.lastName ?? '';
        return {
            tjm: mission.tjm,
            startDate: mission.startDate,
            endDate: mission.endDate,
            refContrat: mission.refContrat,
            contratDate: mission.contratDate,
            ref: mission.ref,
            taux: mission.taux,
            nb: mission.nb,
            client: clientName,
            consultant: consultantName,
        };
    };

    const formattedMission = mission ? formatMissionData(mission) : null;

    const filteredActivities = activities?.filter(
        (activity) => activity.mission?.id === mission?.id,
    );
    function generateYearOptions(startYear, endYear) {
        const options = [];
        for (let year = startYear; year <= endYear; year++) {
            options.push({ value: year, label: String(year) });
        }
        return options;
    }

    const currentYear = getYear(new Date());
    const currentMonth = getMonth(new Date()) + 1;
    const postActivity = async (values) => {
        const response = await missionService
            .postActivity(values)
            .then((response) => {
                console.log(response);
                setChanged(!changed);
                setOpenModal(false);
                setShowSuccessAlert(true);
                // Afficher l'alerte pour une durée de 3000 millisecondes (3 secondes)
                setShowAlert(true);
                setTimeout(() => {
                    setShowAlert(false);
                }, 3000);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const initialValuePres = {
        name: '',
        type: { id: 0 },
        nature: { id: 0 },
        year: currentYear,
        month: currentMonth,
        valeur: 0,
        mission: { id: parseInt(id) },
    };
    /*  console.log('intiaaaaaaaaaaaaaaal', initialValuePres); */

    return (
        <div className="my-5 border-y py-5">
            <p
                style={{
                    fontFamily: 'Corbel',
                    fontStyle: 'normal',
                    fontWeight: 700,
                    fontSize: '36px',
                    lineHeight: '22px',
                    color: '#2E3249',
                    marginBottom: '25px',
                }}
                className="custom-heading"
            >
                Liste des prestations pour une mission
            </p>
            {formattedMission && (
                <React.Fragment>
                    <TablePanelPrestation
                        column={[
                            { name: 'tjm', label: 'TJM' },
                            { name: 'startDate', label: 'Date de Début' },
                            { name: 'endDate', label: 'Date de Fin' },
                            { name: 'refContrat', label: 'Réference Contrat' },
                            { name: 'contratDate', label: 'Date de Contrat' },
                            { name: 'ref', label: 'Réference de Bon de Commande' },
                            { name: 'taux', label: 'Taux de commission' },
                            { name: 'nb', label: 'Nbre de jour de bon du commande' },
                            { name: 'client', label: 'Client' },
                            { name: 'consultant', label: 'Consultant' },
                        ]}
                        rows={[formattedMission]}
                    />
                    <br></br>
                    <br></br>
                    <div className="flex flex-col ">
                        <p
                            style={{
                                fontFamily: 'Corbel',
                                fontStyle: 'normal',
                                fontWeight: 700,
                                fontSize: '36px',
                                lineHeight: '22px',
                                color: '#2E3249',
                            }}
                            className="custom-heading"
                        >
                            Liste des prestations
                        </p>
                        <div className="mb-2 mr-20 flex justify-end">
                            {' '}
                            {/* Added mb-2 and ml-2 classes */}
                            <Button
                                type="button"
                                color="default"
                                className="w-60"
                                style={{
                                    width: '280px',
                                    height: '45px',
                                    backgroundColor: '#D8D83D',
                                    borderRadius: '15px',
                                    fontFamily: 'Roboto',
                                    fontStyle: 'normal',
                                    fontWeight: 400,
                                    fontSize: '16px',
                                    lineHeight: '19px',
                                    display: 'flex',
                                    color: '#6B6D7C',
                                }}
                                onClick={() => setOpenModal(true)}
                            >
                                Ajouter Une Préstation{' '}
                                <ListBulletIcon
                                    style={{
                                        marginLeft: '20px',
                                        width: '24px',
                                        height: '19.5px',
                                    }}
                                />
                            </Button>
                        </div>
                    </div>

                    <Modal
                        isOpen={openModal}
                        close={() => setOpenModal(false)}
                        title="Ajouter une prestation"
                    >
                        <div className="w-full rounded-md">
                            <div className="flex flex-col items-center rounded-lg bg-white p-4 shadow dark:bg-gray-700 sm:flex-row">
                                <Formik
                                    initialValues={initialValuePres}
                                    onSubmit={(values) => {
                                        console.log(values);
                                        postActivity(values);
                                    }}
                                >
                                    <Form className="flex flex-col space-y-3 sm:flex-row sm:space-x-2 sm:space-y-0">
                                        <div className="flex flex-col ">
                                            <Field
                                                name="name"
                                                component={Input}
                                                label=" Titre de prestation"
                                                placeholder="Taper le titre de prestation"
                                                variant="outlined"
                                                type="text"
                                                margin="dense"
                                                InputLabelProps={{ shrink: true }}
                                                required
                                            />
                                            <Field
                                                name="type"
                                                component={InputSelect}
                                                placeholder="Selectionner un type..."
                                                label="Type"
                                                options={formattedTypes}
                                                InputLabelProps={{ shrink: true }}
                                                required
                                            />
                                            <Field
                                                name="nature"
                                                component={InputSelect}
                                                placeholder="Selectionner nature du Préstation"
                                                label="Nature"
                                                options={formattedNatures}
                                                InputLabelProps={{ shrink: true }}
                                                required
                                            />
                                            <Button
                                                color="pink"
                                                type="submit"
                                                /* className="my-8 w-full self-start sm:w-min sm:self-end" */
                                            >
                                                Créer la Préstation
                                            </Button>
                                        </div>
                                        <div className="flex flex-col ">
                                            <Field
                                                name="year"
                                                component={InputSelect}
                                                placeholder="Selectionner une année"
                                                label="Année"
                                                options={generateYearOptions(2020, 2060)} // Replace the start and end year as needed
                                                InputLabelProps={{ shrink: true }}
                                                required
                                            />
                                            <Field
                                                name="month"
                                                component={InputSelect}
                                                label="Mois"
                                                placeholder="Selectionner un mois"
                                                options={[
                                                    { value: 1, label: 'Janvier' },
                                                    { value: 2, label: 'Février' },
                                                    { value: 3, label: 'Mars' },
                                                    { value: 4, label: 'Avril' },
                                                    { value: 5, label: 'Mai' },
                                                    { value: 6, label: 'Juin' },
                                                    { value: 7, label: 'Juillet' },
                                                    { value: 8, label: 'Août' },
                                                    { value: 9, label: 'Septembre' },
                                                    { value: 10, label: 'Octobre' },
                                                    { value: 11, label: 'Novembre' },
                                                    { value: 12, label: 'Décembre' },
                                                ]}
                                                InputLabelProps={{ shrink: true }}
                                                required
                                            />
                                            <Field
                                                name="valeur"
                                                component={Input}
                                                label=" Valeur d'activité "
                                                placeholder=" taper valeur de prestation"
                                                variant="outlined"
                                                margin="dense"
                                                InputLabelProps={{ shrink: true }}
                                                required
                                            />

                                            <div className="mt-4 flex justify-end">
                                                <span className="ml-3 inline-flex rounded-md shadow-sm">
                                                    <button
                                                        type="button"
                                                        className={`btn btn-green`}
                                                        onClick={() =>
                                                            setOpenModal(false)
                                                        }
                                                    >
                                                        Annuler
                                                    </button>
                                                </span>
                                            </div>
                                        </div>
                                    </Form>
                                </Formik>
                            </div>
                        </div>
                    </Modal>
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
                            La préstation a été créé avec succès !
                        </div>
                    )}
                    {showDeleteSuccessAlert && !showAlert && (
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
                            La préstation a été supprimé avec succès !
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
                            La préstation a été effectuée avec succès !
                        </div>
                    )}
                    <TablePanel
                        className="custom-table-panel1"
                        column={[
                            {
                                name: 'month',
                                label: (
                                    <span className="label-nom-type">
                                        <span>M</span>ois
                                    </span>
                                ),
                            },
                            {
                                name: 'year',
                                label: (
                                    <span className="label-nom-type">
                                        <span>A</span>nnée
                                    </span>
                                ),
                            },
                            {
                                name: 'valeur',
                                label: (
                                    <span className="label-nom-type">
                                        <span>V</span>aleur
                                    </span>
                                ),
                            },
                            {
                                name: 'name',
                                label: (
                                    <span className="label-nom-type">
                                        <span>T</span>itre de préstation
                                    </span>
                                ),
                            },
                            {
                                name: 'type',
                                label: (
                                    <span className="label-nom-type">
                                        <span>T</span>ype de préstation
                                    </span>
                                ),
                            },
                            {
                                name: 'nature',
                                label: (
                                    <span className="label-nom-type">
                                        <span>N</span>ature de préstation
                                    </span>
                                ),
                            },
                        ]}
                        rows={filteredActivities.map((activity) => ({
                            month: activity.month,
                            year: activity.year,
                            valeur: activity.valeur,
                            name: activity.name,
                            type: activity.type?.name,
                            nature: activity.nature?.name,
                            delete: (
                                <DeleteBtn
                                    activityId={activity.id}
                                    setChanged={setChanged}
                                    changed={changed}
                                    setShowSuccessAlert={setShowSuccessAlert}
                                    showDeleteSuccessAlert={showDeleteSuccessAlert}
                                    setShowDeleteSuccessAlert={setShowDeleteSuccessAlert}
                                    setShowDeleteFailureAlert={setShowDeleteFailureAlert}
                                    showDeleteFailureAlert={showDeleteFailureAlert}
                                />
                            ),
                            edit: (
                                <EditBtn
                                    activity={activity}
                                    formattedTypes={formattedTypes}
                                    formattedNatures={formattedNatures}
                                    setChanged={setChanged}
                                    changed={changed}
                                    id={id}
                                    missionService={missionService}
                                    setShowSuccessAlert={setShowSuccessAlert}
                                    showEditSuccessAlert={showEditSuccessAlert}
                                    setShowEditSuccessAlert={setShowEditSuccessAlert}
                                />
                            ),
                        }))}
                        onSearch={(filteredActivities) => {
                            setSearch(filteredActivities.search);
                            setPage(0);
                        }}
                        onSort={(filteredActivities) => {
                            setSort(filteredActivities);
                            setPage(0);
                        }}
                        totalElements={filteredActivities.length}
                        pageSize={5}
                        totalPages={Math.ceil(filteredActivities.length / 5)}
                        onPageChange={setPage}
                        currentPage={page}
                        setCurrentPage={setPage}
                    />
                </React.Fragment>
            )}
            <br></br>
            <br></br>
            <br></br>
            <ViewBtn />
        </div>
    );
};
const ViewBtn = () => {
    const navigate = useNavigate();
    const handleViewMission = () => {
        navigate(`/app/mission`);
    };
    return (
        <div className="flex flex-row ">
            <button className="w-10" onClick={handleViewMission}>
                <BackwardIcon /> {/* Replace "Archiver" with the ChevronLeftIcon */}
            </button>
            <p
                style={{
                    width: '203px',
                    height: '19px',
                    fontFamily: 'Roboto',
                    fontStyle: 'normal',
                    fontWeight: 700,
                    fontSize: '16px',
                    lineHeight: '19px',
                    display: 'flex',
                    alignItems: 'center',
                    textAlign: 'center',
                    textDecorationLine: 'underline',
                    color: '#6B6D7C',
                }}
            >
                Rentourner vers la liste des missions
            </p>
        </div>
    );
};
const DeleteBtn = ({
    activityId,
    setChanged,
    changed,
    setShowSuccessAlert,
    showDeleteSuccessAlert,
    setShowDeleteSuccessAlert,
    setShowDeleteFailureAlert,
}) => {
    const confirm = useConfirm();

    const handleConfirm = async () => {
        const result = await confirm({
            title: 'Supprimer?',
            description: 'Voulez vous supprimer ce prestation?? ',
        });
        if (result) {
            try {
                await missionService.deleteActivity(activityId);
                setChanged(!changed);
                setShowDeleteSuccessAlert(true);
                setShowDeleteFailureAlert(false);
                setShowSuccessAlert(false);
                setTimeout(() => {
                    setShowDeleteSuccessAlert(false);
                }, 3000);
            } catch (error) {
                console.error(error);
                setShowDeleteSuccessAlert(false);
                setShowDeleteFailureAlert(true);
                setShowSuccessAlert(false);
                setTimeout(() => {
                    setShowDeleteFailureAlert(false);
                }, 3000);
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
                style={{ width: '30px', height: '30px', fontSize: '80px', color: '#fff' }}
            />
        </button>
    );
};
const EditBtn = ({
    activity,
    formattedTypes,
    formattedNatures,
    setChanged,
    changed,
    missionService,
    id,
    setShowSuccessAlert,
    showEditSuccessAlert,
    setShowEditSuccessAlert,
}) => {
    const [openModal, setOpenModal] = useState(false);
    const [initialValues, setInitialValues] = useState({});
    const handleEdit = async () => {
        setOpenModal(true);
        const initialFormValues = {
            name: activity.name,
            type: { id: activity.type.id },
            nature: { id: activity.nature.id },
            year: activity.year,
            month: activity.month,
            valeur: activity.valeur,
            mission: { id: parseInt(id) },
        };
        setInitialValues(initialFormValues);
    };
    useEffect(() => {}, [initialValues]);
    const UpdatePrestation = (values) => {
        console.log(values);
        missionService
            .updateActivity(activity.id, values)
            .then(() => {
                setChanged(!changed);
                setOpenModal(false);
                setShowSuccessAlert(false);
                setShowEditSuccessAlert(true); // Définit l'état pour afficher l'alerte de succès
                setTimeout(() => {
                    setShowEditSuccessAlert(false);
                }, 3000);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    function generateYearOptions(startYear, endYear) {
        const options = [];
        for (let year = startYear; year <= endYear; year++) {
            options.push({ value: year, label: String(year) });
        }
        return options;
    }
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
                        color: '#fff ',
                    }}
                />
            </button>
            <Modal
                isOpen={openModal}
                close={() => setOpenModal(false)}
                title="Modifier la Prestation   "
            >
                <div className="w-full rounded-md">
                    <div className="flex flex-col items-center rounded-lg bg-white p-4 shadow dark:bg-gray-700 sm:flex-row">
                        <Formik
                            initialValues={initialValues}
                            onSubmit={(values) => {
                                UpdatePrestation(values);
                            }}
                        >
                            <Form className="flex flex-col space-y-3 sm:flex-row sm:space-x-2 sm:space-y-0">
                                <div className="flex flex-col ">
                                    <Field
                                        name="name"
                                        component={Input}
                                        label=" Titre de prestation"
                                        placeholder="Taper le titre de prestation"
                                        variant="outlined"
                                        type="text"
                                        margin="dense"
                                        InputLabelProps={{ shrink: true }}
                                        required
                                    />
                                    <Field
                                        name="type"
                                        component={InputSelect}
                                        placeholder="Selectionner un type..."
                                        label="Type"
                                        options={formattedTypes}
                                        InputLabelProps={{ shrink: true }}
                                        required
                                    />
                                    <Field
                                        name="nature"
                                        component={InputSelect}
                                        placeholder="Selectionner nature du Préstation"
                                        label="Nature"
                                        options={formattedNatures}
                                        InputLabelProps={{ shrink: true }}
                                        required
                                    />
                                    <Button
                                        color="pink"
                                        type="submit"
                                        /* className="my-8 w-full self-start sm:w-min sm:self-end" */
                                    >
                                        Modifier la prestation
                                    </Button>
                                </div>
                                <div className="flex flex-col ">
                                    <Field
                                        name="year"
                                        component={InputSelect}
                                        placeholder="Selectionner une année"
                                        label="Année"
                                        options={generateYearOptions(2020, 2060)} // Replace the start and end year as needed
                                        InputLabelProps={{ shrink: true }}
                                        required
                                    />
                                    <Field
                                        name="month"
                                        component={InputSelect}
                                        label="Mois"
                                        placeholder="Selectionner un mois"
                                        options={[
                                            { value: 1, label: 'Janvier' },
                                            { value: 2, label: 'Février' },
                                            { value: 3, label: 'Mars' },
                                            { value: 4, label: 'Avril' },
                                            { value: 5, label: 'Mai' },
                                            { value: 6, label: 'Juin' },
                                            { value: 7, label: 'Juillet' },
                                            { value: 8, label: 'Août' },
                                            { value: 9, label: 'Septembre' },
                                            { value: 10, label: 'Octobre' },
                                            { value: 11, label: 'Novembre' },
                                            { value: 12, label: 'Décembre' },
                                        ]}
                                        InputLabelProps={{ shrink: true }}
                                        required
                                    />
                                    <Field
                                        name="valeur"
                                        component={Input}
                                        label=" Valeur d'activité "
                                        placeholder=" taper valeur de prestation"
                                        variant="outlined"
                                        margin="dense"
                                        InputLabelProps={{ shrink: true }}
                                        required
                                    />

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
                            </Form>
                        </Formik>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default withAuth(Prestation);
