import {
    ArchiveBoxArrowDownIcon,
    EyeIcon,
    PencilSquareIcon,
} from '@heroicons/react/24/outline';
import { Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import withAuth from '../../../common/withAuth';
import Modal from '../../../components/lib/container/Modal';
import TablePanelMission from '../../../components/lib/container/table/TablePanelMission';
import Button from '../../../components/lib/form/Button';
import Input from '../../../components/lib/form/Input';
import InputSelect from '../../../components/lib/form/InputSelect';
import useConfirm from '../../../hooks/useConfirm';
import missionService from '../../../services/missionService';

const Mission = () => {
    const [missions, setMissions] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [search, setSearch] = useState(null);
    const [sort, setSort] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [client, setClient] = useState([]);
    const [types, setTypes] = useState([]);
    const [changed, setChanged] = useState([]);
    const [consultant, setConsultant] = useState([]);
    const [clients, setClients] = useState([]);
    const [consultants, setConsultants] = useState([]);

    //pour Alerte de sucés
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showDeleteSuccessAlert, setShowDeleteSuccessAlert] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [showEditSuccessAlert, setShowEditSuccessAlert] = useState(false);
    const [showDeleteFailureAlert, setShowDeleteFailureAlert] = useState(false);
    useEffect(() => {
        const fetchDataAndClients = async () => {
            try {
                const [clientsResponse, typesResponse, consultantsResponse, back] =
                    await Promise.all([
                        missionService.fetchClients(),
                        missionService.fetchTypes(),
                        missionService.fetchConsultants(),
                        missionService.getAllMission(),
                    ]);

                const clients = clientsResponse.data;
                const formattedClients = clients.map((client) => ({
                    value: client.id,
                    label: client.firstName + ' ' + client.lastName,
                }));

                const types = typesResponse.data;
                const formattedTypes = types.map((type) => ({
                    value: { id: type.id },
                    label: type.name,
                }));

                const consultants = consultantsResponse.data;
                const formattedConsultants = consultants.map((consultant) => ({
                    value: consultant.id,
                    label: consultant.firstName + ' ' + consultant.lastName,
                }));

                setClients(clients);
                setClient(formattedClients);
                setTypes(formattedTypes);
                setConsultants(consultants);
                setConsultant(formattedConsultants);

                const slicedMissions = back.data.slice(page * 5, (page + 1) * 5);
                const currentDate = new Date(); // Current date

                const missionData = slicedMissions.map((d) => {
                    const startDate = new Date(d.startDate);
                    const endDate = new Date(d.endDate);
                    let status = 'Non commencé';

                    if (currentDate > startDate && currentDate < endDate) {
                        status = 'En cours';
                    } else if (currentDate > endDate) {
                        status = 'Terminé';
                    }
                    return {
                        tjm: d.tjm,
                        date_debut: d.startDate,
                        date_fin: d.endDate,
                        date_contrat: d.contratDate,
                        clients:
                            clients.find((c) => c.id === String(d.client))?.nomcontact +
                                ' ' +
                                clients.find((c) => c.id === String(d.client))?.prenom ??
                            '',
                        consultants:
                            consultants.find((c) => c.id === d.consultant)?.firstName +
                                ' ' +
                                consultants.find((c) => c.id === d.consultant)
                                    ?.lastName ?? '',
                        type: d.typeMission.name,
                        status: <StatusBadge status={status} />,
                        edit: (
                            <EditBtn
                                d={d}
                                client={client}
                                consultant={consultant}
                                types={types}
                                missionService={missionService}
                                setChanged={setChanged}
                                changed={changed}
                                setShowSuccessAlert={setShowSuccessAlert}
                                showEditSuccessAlert={showEditSuccessAlert}
                                setShowEditSuccessAlert={setShowEditSuccessAlert}
                            />
                        ),
                        delete: (
                            <DeleteBtn
                                missionId={d.id}
                                setChanged={setChanged}
                                changed={changed}
                                setShowSuccessAlert={setShowSuccessAlert}
                                showDeleteSuccessAlert={showDeleteSuccessAlert}
                                setShowDeleteSuccessAlert={setShowDeleteSuccessAlert}
                                setShowDeleteFailureAlert={setShowDeleteFailureAlert}
                                showDeleteFailureAlert={showDeleteFailureAlert}
                            />
                        ),
                        view: <ViewBtn missionId={d.id} />,
                    };
                });

                setTotalElements(back.data.length);
                setTotalPages(Math.ceil(back.data.length / 5));
                setMissions(missionData);
            } catch (error) {
                // Handle error
            }
        };

        fetchDataAndClients();
    }, [page, search, sort, changed]);

    const postMission = async (values) => {
        const response = await missionService
            .createMission(values)
            .then((response) => {
                console.log(response);
                setChanged(!changed);
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
    const StatusBadge = ({ status }) => {
        let badgeStyle = '';
        let badgeText = '';

        if (status === 'Non commencé') {
            badgeStyle = 'bg-red-100 text-red-800';
            badgeText = 'Non commencé';
        } else if (status === 'En cours') {
            badgeStyle = 'bg-yellow-100 text-yellow-800';
            badgeText = 'En cours';
        } else if (status === 'Terminé') {
            badgeStyle = 'bg-green-100 text-green-800';
            badgeText = 'Terminé';
        }

        return (
            <span
                className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${badgeStyle}`}
            >
                {badgeText}
            </span>
        );
    };
    return (
        <div className="my-5 border-y py-5">
            {/**********************  Add Mission  section*********************/}
            <p
                className="text-[#D8D83D]"
                style={{
                    fontFamily: 'Corbel',
                    fontSize: '36px',
                    fontWeight: 700,
                    lineHeight: '43px',
                    letterSpacing: '0em',
                    textAlign: 'left',
                }}
            >
                Missions des Consultants
            </p>

            <div className="mb-2 mr-20 flex justify-end">
                <Button
                    type="button"
                    color="default"
                    className="w-40"
                    onClick={() => setOpenModal(true)}
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '20px 50px',
                        gap: '20px',
                        position: 'absolute',
                        width: '283px',
                        height: '45px',
                        left: '86%',
                        transform: 'translateX(-50%)',
                        top: '210px',
                        background: '#D8D83D',
                        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                        borderRadius: '5px',
                    }}
                >
                    Ajouter une mission
                </Button>
            </div>
            <Modal
                isOpen={openModal}
                close={() => setOpenModal(false)}
                title="Ajouter une mission"
            >
                <div className="w-full rounded-md">
                    <div className="flex flex-col flex-wrap items-center rounded-lg bg-white p-4 shadow dark:bg-gray-700 sm:flex-row">
                        <Formik
                            initialValues={{
                                client: 0,
                                consultant: 0,
                                refContrat: '',
                                contratDate: '',
                                ref: '',
                                nb: '',
                                startDate: '',
                                endDate: '',
                                tjm: '',
                                taux: '',
                                typeMission: { id: 0 },
                            }}
                            onSubmit={(values) => {
                                postMission(values);
                            }}
                        >
                            <Form className="flex flex-col space-y-3 sm:flex-row sm:space-x-2 sm:space-y-0">
                                <div className="flex w-full flex-col sm:w-1/3">
                                    {/* Fields for the first row */}
                                    <Field
                                        name="client"
                                        component={InputSelect}
                                        placeholder="Selectionner un client..."
                                        label="Client"
                                        options={client}
                                        InputLabelProps={{ shrink: true }}
                                        required
                                    />
                                    <Field
                                        name="tjm"
                                        component={Input}
                                        label="TJM"
                                        variant="outlined"
                                        type="text"
                                        margin="dense"
                                        InputLabelProps={{ shrink: true }}
                                        required
                                    />
                                    <Field
                                        name="contratDate"
                                        component={Input}
                                        label="Date du contrat"
                                        type="date"
                                        InputLabelProps={{ shrink: true }}
                                        required
                                    />
                                    <Field
                                        name="taux"
                                        component={Input}
                                        label=" Taux de commission en %"
                                        variant="outlined"
                                        type="text"
                                        margin="dense"
                                        InputLabelProps={{ shrink: true }}
                                        required
                                    />
                                    <Button
                                        type="submit"
                                        className="my-8 ml-4 "
                                        style={{
                                            background: '#8EE359',
                                            borderRadius: '15px',
                                            width: '150px',
                                            height: '30px',
                                            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.50)',
                                        }}
                                    >
                                        Créer
                                    </Button>
                                </div>
                                <div className="flex w-full flex-col sm:w-1/3">
                                    {/* Fields for the second row */}
                                    <Field
                                        name="consultant"
                                        component={InputSelect}
                                        placeholder="Selectionner un consultant..."
                                        label="Consultant"
                                        options={consultant}
                                        InputLabelProps={{ shrink: true }}
                                        required
                                    />
                                    <Field
                                        name="ref"
                                        component={Input}
                                        label="Ref.bon de commande"
                                        variant="outlined"
                                        type="text"
                                        margin="dense"
                                        InputLabelProps={{ shrink: true }}
                                        required
                                    />
                                    <Field
                                        name="startDate"
                                        component={Input}
                                        label="Date de début de contrat"
                                        variant="outlined"
                                        type="date"
                                        fullWidth
                                        margin="dense"
                                        InputLabelProps={{ shrink: true }}
                                        required
                                    />
                                    <Field
                                        name="nb"
                                        component={Input}
                                        label="Nbre de jour bon de commande"
                                        variant="outlined"
                                        type="text"
                                        margin="dense"
                                        InputLabelProps={{ shrink: true }}
                                        required
                                    />
                                    <Button
                                        type="button"
                                        className="mt-4 "
                                        onClick={() => setOpenModal(false)}
                                        style={{
                                            background: '#FF7676',
                                            borderRadius: '15px',
                                            width: '150px',
                                            height: '30px',
                                            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.50)',
                                        }}
                                    >
                                        Annuler
                                    </Button>
                                </div>
                                <div className="flex w-full flex-col sm:w-1/3">
                                    {/* Fields for the third row */}
                                    <Field
                                        name="typeMission"
                                        component={InputSelect}
                                        placeholder="Selectionner un type de mission..."
                                        label="Type Mission"
                                        options={types}
                                        onChange={(selectedOption, { setValue }) => {
                                            setValue('typeMission', {
                                                id: selectedOption.value,
                                            });
                                        }}
                                        InputLabelProps={{ shrink: true }}
                                        required
                                    />
                                    <Field
                                        name="refContrat"
                                        component={Input}
                                        placeholder="Refcontrat"
                                        label="Ref du contrat"
                                        type="text"
                                        margin="dense"
                                        InputLabelProps={{ shrink: true }}
                                        required
                                    />
                                    <Field
                                        name="endDate"
                                        component={Input}
                                        label="Date de fin de contrat"
                                        variant="outlined"
                                        type="date"
                                        fullWidth
                                        margin="dense"
                                        InputLabelProps={{ shrink: true }}
                                        required
                                    />
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
                    La mission a été crée avec succès !
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
                    La mission a été archivée avec succès !
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
            {/**********************  Mission List  section*********************/}
            <div className="my-5 rounded-md border-y py-5">
                <TablePanelMission
                    column={[
                        { name: 'tjm', label: 'TJM' },
                        { name: 'date_debut', label: 'Date de debut' },
                        { name: 'date_fin', label: 'Date de fin' },
                        { name: 'date_contrat', label: 'Date de contrat' },
                        /*  { name: 'ref', label: 'Ref du bon de commande' },
      { name: 'taux', label: 'Taux de commision' },
      { name: 'nb', label: 'NB de jour du bon de commande' }, */
                        { name: 'clients', label: 'Clients ' },
                        { name: 'consultants', label: 'Consultants  ' },
                        { name: 'typeMission', label: 'type mission' },
                        { name: 'status', label: 'Status' },
                        { name: 'edit', label: 'Modifier' },
                        { name: 'delete', label: 'Archiver' },
                        { name: 'view', label: 'Consulter mission' },
                    ]}
                    rows={missions}
                    onSearch={(values) => {
                        setSearch(values.search);
                        setPage(0);
                    }}
                    onSort={(values) => {
                        setSort(values);
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
        </div>
    );
};
const EditBtn = ({
    d,
    client,
    consultant,
    types,
    missionService,
    setChanged,
    changed,
    setShowSuccessAlert,
    showEditSuccessAlert,
    setShowEditSuccessAlert,
}) => {
    const [openModal, setOpenModal] = useState(false);
    const [initialValues, setInitialValues] = useState({});
    const handleEdit = async () => {
        setOpenModal(true);
        // Assuming you have access to the mission data, set the initial form values
        const initialFormValues = {
            client: d.client,
            consultant: d.consultant,
            refContrat: d.refContrat,
            contratDate: d.contratDate,
            ref: d.ref,
            nb: d.nb,
            startDate: d.startDate,
            endDate: d.endDate,
            tjm: d.tjm,
            taux: d.taux,
            typeMission: { id: d.typeMission.id },
        };
        setInitialValues(initialFormValues);
    };
    const updateMission = (values) => {
        console.log('new values', values);
        missionService
            .updateMission(d.id, values)
            .then(() => {
                setChanged(!changed);
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

    useEffect(() => {}, [initialValues]);

    return (
        <>
            <button
                className="btn btn-primary flex h-10 w-12 items-center justify-center rounded-full"
                onClick={handleEdit}
            >
                <PencilSquareIcon />
            </button>
            <Modal
                isOpen={openModal}
                close={() => setOpenModal(false)}
                title="Modifier la mission"
            >
                <div className="w-full rounded-md">
                    <div className="flex flex-col items-center rounded-lg bg-white p-4 shadow dark:bg-gray-700 sm:flex-row">
                        {initialValues && (
                            <Formik
                                initialValues={initialValues}
                                onSubmit={(values) => {
                                    // Handle the form submission (update the mission)
                                    // You need to implement the logic to update the mission based on the form values
                                    // updateMission(values);
                                    setOpenModal(false);
                                    updateMission(values);
                                }}
                            >
                                <Form className="flex flex-col space-y-3 sm:flex-row sm:space-x-2 sm:space-y-0">
                                    <div className="flex flex-col sm:w-1/3">
                                        <Field
                                            name="client"
                                            component={InputSelect}
                                            placeholder="Selectionner un client..."
                                            label="Client"
                                            options={client}
                                        />
                                        <Field
                                            name="consultant"
                                            component={InputSelect}
                                            placeholder="Selectionner un consultant..."
                                            label="Consultant"
                                            options={consultant}
                                        />
                                        <Field
                                            name="typeMission"
                                            component={InputSelect}
                                            placeholder="Selectionner un type de mission..."
                                            label="Type Mission"
                                            options={types}
                                            onChange={(selectedOption, { setValue }) => {
                                                setValue('typeMission', {
                                                    id: selectedOption.value,
                                                });
                                            }}
                                        />
                                    </div>
                                    <div className="flex flex-col sm:w-1/3">
                                        <Field
                                            name="ref"
                                            component={Input}
                                            label="Ref du bon de commande"
                                            variant="outlined"
                                            type="text"
                                            margin="dense"
                                        />
                                        <Field
                                            name="startDate"
                                            component={Input}
                                            label="Date de début"
                                            variant="outlined"
                                            type="date"
                                            fullWidth
                                            margin="dense"
                                            InputLabelProps={{ shrink: true }}
                                        />
                                        <Field
                                            name="nb"
                                            component={Input}
                                            label="Nb de jour du bon de commande"
                                            variant="outlined"
                                            type="text"
                                            margin="dense"
                                        />
                                        <Field
                                            name="taux"
                                            component={Input}
                                            label="Taux de commission d'Insy2s"
                                            variant="outlined"
                                            type="text"
                                            margin="dense"
                                        />
                                    </div>
                                    <div className="flex flex-col sm:w-1/3">
                                        <Field
                                            name="refContrat"
                                            component={Input}
                                            placeholder="reference contrat"
                                            label="Ref du contrat"
                                            type="text"
                                            margin="dense"
                                        />
                                        <Field
                                            name="endDate"
                                            component={Input}
                                            label="Date de fin"
                                            variant="outlined"
                                            type="date"
                                            fullWidth
                                            margin="dense"
                                            InputLabelProps={{ shrink: true }}
                                        />
                                        <Field
                                            name="tjm"
                                            component={Input}
                                            label="TJM"
                                            variant="outlined"
                                            type="text"
                                            margin="dense"
                                        />
                                        <Field
                                            name="contratDate"
                                            component={Input}
                                            label="Date de contrat"
                                            type="date"
                                            InputLabelProps={{ shrink: true }}
                                        />
                                        <Button
                                            color="pink"
                                            type="submit"
                                            className="my-8 w-full self-start sm:w-min sm:self-end"
                                        >
                                            Valider
                                        </Button>
                                    </div>
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
const ViewBtn = ({ missionId }) => {
    const navigate = useNavigate();
    const handleViewMission = () => {
        navigate(`/app/prestation/${missionId}`);
    };
    return (
        <Button
            className="btn btn-transparent flex h-10 w-12 items-center justify-center rounded-full"
            onClick={handleViewMission}
            style={{ backgroundColor: 'transparent' }}
        >
            <EyeIcon style={{ color: 'blue' }} />
            {/* Replace "Archiver" with the ChevronLeftIcon */}
        </Button>
    );
};

const DeleteBtn = ({
    missionId,
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
            title: 'Archiver la mission ?',
            description: 'la mission sera archiver ',
        });
        if (result) {
            try {
                await missionService.deleteMission(missionId);
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
            }
        }
        console.log(result);
    };

    return (
        <button
            className="btn btn-primary flex h-10 w-12 items-center justify-center rounded-full"
            onClick={handleConfirm}
        >
            <ArchiveBoxArrowDownIcon />
        </button>
    );
};
export default withAuth(Mission);
