import { BackwardIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';

import withAuth from '../../../common/withAuth';
import Modal from '../../../components/lib/container/Modal';
import TablePanelEcran from '../../../components/lib/container/table/TablePanelEcran';

import Button from '../../../components/lib/form/Button';
import Input from '../../../components/lib/form/Input';
import useConfirm from '../../../hooks/useConfirm';
import missionService from '../../../services/missionService';
import * as Yup from 'yup';
import './Ecran.css';
import CreateIcon from '@mui/icons-material/Create';

const TypeMission = () => {
    const [totalElements, setTotalElements] = useState([]);
    const [totalPages, setTotalPages] = useState([]);
    const [types, setTypes] = useState([]);
    const [page, setPage] = useState(0);
    const [search, setSearch] = useState(null);
    const [sort, setSort] = useState(null);
    const [changed, setChanged] = useState(true);
    const [openModal, setOpenModal] = useState(false);

    //pour Alerte de sucés
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showDeleteSuccessAlert, setShowDeleteSuccessAlert] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [showEditSuccessAlert, setShowEditSuccessAlert] = useState(false);
    const [showDeleteFailureAlert, setShowDeleteFailureAlert] = useState(false);



    useEffect(() => {
        const fetchTypeData = async () => {
            try {
                const response = await missionService.fetchTypes();
                const types = response.data;

                const formatedTypes = types.map((type) => {
                    return {
                        name: type.name,
                        delete: (
                            <DeleteBtn
                                id={type.id}
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
                                type={type}
                                missionService={missionService}
                                setChanged={setChanged}
                                changed={changed}
                                setShowSuccessAlert={setShowSuccessAlert}
                                showEditSuccessAlert={showEditSuccessAlert}
                                setShowEditSuccessAlert={setShowEditSuccessAlert}
                            />
                        ),
                    };
                });

                setTotalElements(types.length);
                setTotalPages(Math.ceil(types.length / 5));
                setTypes(formatedTypes);
            } catch (error) {
                console.error(error);
            }
        };

        fetchTypeData();
    }, [page, search, sort, changed]);
    const postType = (values) => {
        missionService.postType(values)
          .then((response) => {
            console.log(response.data);
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
      

    return (
        <div className="my-5 border-y py-5">
            <div className="mb-2 mr-3 flex justify-end">
                <Button
                    type="button"
                    color="default"
                    className="w-auto custom-button"
                    onClick={() => setOpenModal(true)}
                >
                    
                    <div className="text-center">
                        <div>
                           Ajouter <br/>
                            un type <br/>
                            de mission 
                        </div>
                        <div className="mt-2">
                        <   CreateIcon className="w-8 h-8 mx-auto" />
                        </div>
                    </div>
                </Button>

                <Modal
                    isOpen={openModal}
                    close={() => setOpenModal(false)}
                    title="Ajouter un  type de mission"
                    style={{ width: '400px', height: '300px' }}
                >
                    <div className="w-full rounded-md">
                        <div className="flex flex-col items-center rounded-lg bg-white p-4 shadow dark:bg-gray-700 sm:flex-row">
                            <Formik
                                initialValues={{
                                    name: '',
                                }}
                                validationSchema={Yup.object().shape({
                                    name: Yup.string().required('Le champ Nom est obligatoire'),
                                  })}
                                onSubmit={(values) => {
                                    postType(values);
                                }}
                            >
                                <Form className="flex flex-col space-y-3 sm:flex-row sm:space-x-2 sm:space-y-0">
                                    <Field
                                        name="name"
                                        component={Input}
                                        placeholder="Taper un Type de mission"
                                        label="Nom* "
                                        variant="outlined"
                                        type="text"
                                        margin="dense"
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
                <div className="alert alert-success" role="alert" style={{
                    backgroundColor: 'green',
                    color: 'white',
                    padding: '10px',
                    borderRadius: '5px',
                    fontSize: '16px',
                    marginBottom: '10px'
                  }}>
                    Le type de mission a été créé avec succès !
                </div>
                )}
           {showDeleteSuccessAlert && !showAlert && (
                <div className="alert alert-success" role="alert" style={{
                    backgroundColor: 'green',
                    color: 'white',
                    padding: '10px',
                    borderRadius: '5px',
                    fontSize: '16px',
                    marginBottom: '10px'
                }}>
                    Le type de mission a été supprimé avec succès !
                </div>
                ) }

                {showDeleteFailureAlert && !showAlert && (
                <div className="alert alert-danger" role="alert" style={{
                    backgroundColor: 'red',
                    color: 'white',
                    padding: '10px',
                    borderRadius: '5px',
                    fontSize: '16px',
                    marginBottom: '10px'
                }}>
                    Échec de la suppression du type de mission.
                </div>
                ) }


            {showEditSuccessAlert && (
                <div className="alert alert-success" role="alert" style={{
                    backgroundColor: 'green',
                    color: 'white',
                    padding: '10px',
                    borderRadius: '5px',
                    fontSize: '16px',
                    marginBottom: '10px'
                }}>
                    La modification a été effectuée avec succès !
                </div>
            )}
            <TablePanelEcran 
                column={[{ name: 'name', label:<span className="label-nom-type">
                                                    <span>N</span>om du type de mission
                                                </span> }
            ]}
                rows={types}
                onSearch={(types) => {
                    setSearch(types.search);
                    setPage(0);
                }}
                onSort={(types) => {
                    setSort(types);
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
const DeleteBtn = ({ id, setChanged, changed, setShowSuccessAlert, showDeleteSuccessAlert, setShowDeleteSuccessAlert, setShowDeleteFailureAlert }) => {
    const confirm = useConfirm();

    const handleDeleteType = async () => {
        const result = await confirm({
            title: 'Supprimer le type de mission ?',
            description: 'le type de mission sera supprimé',
        });
        if (result) {
            try {
                await missionService.deleteType(id);
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
        <div>
            <button onClick={handleDeleteType}
                style={{
                    borderRadius: '50%',
                    backgroundColor: "#FF7676",
                }}
            >
                <TrashIcon  style={{width: '30px',
                height: '30px',fontSize: '80px',color:"#FFFFFF"}}/> 
            </button>
        </div>
    );
};

const EditBtn = ({ type, missionService, setChanged, changed,setShowSuccessAlert, showEditSuccessAlert, setShowEditSuccessAlert }) => {
    const [openModal, setOpenModal] = useState(false);
    const [initialValues, setInitialValues] = useState({});

    const handleEdit = async () => {
        setOpenModal(true);
        // Supposons que vous ayez accès aux données de la mission, définissez les valeurs initiales du formulaire
        const initialFormValues = {
            name: type.name,
        };
        setInitialValues(initialFormValues);
    };

    const UpdateTypeMission = (values) => {
        missionService.updateType(type.id, values)
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

    useEffect(() => {}, [initialValues, changed]);

    return (
        <>
            <button  onClick={handleEdit}
                style={{
                    borderRadius: '50%',
                    backgroundColor: "#D8D83D",
                }}>
                <PencilSquareIcon style={{width: '30px',
                    height: '30px',fontSize: '80px',color:"#FFFFFF"}}/>
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
                                    UpdateTypeMission(values);
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

export default withAuth(TypeMission);
