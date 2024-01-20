import { ListBulletIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { createCv, deleteCv, getCvsAction } from '../../../actions/CvAction';
import Modal from '../../../components/lib/container/Modal';
import TablePanel from '../../../components/lib/container/table/TablePanelPrestation';
import Button from '../../../components/lib/form/Button';
import Input from '../../../components/lib/form/Input';
import useConfirm from '../../../hooks/useConfirm';
import ConsultantService from '../../../services/ConsultantService';
import withAuth from './../../../common/withAuth';

const ListCv = () => {
    const [openModal, setOpenModal] = useState(false);
    const [idConsultant, setIdConsultant] = useState(null);
    const storage = localStorage.getItem('persist:auth');
    let userId;

    const { cvs } = useSelector((state) => state.cvs);
    const dispatch = useDispatch();

    if (storage) userId = JSON.parse(JSON.parse(storage).userId);

    useEffect(() => {
        const getUserById = async () => {
            try {
                const response1 = await ConsultantService.getConsultantByUserId(userId);
                dispatch(getCvsAction(response1.data.id));
                setIdConsultant(response1.data.id);
                console.log(cvs);
            } catch (error) {
                console.error(error);
            }
        };
        getUserById();
    }, [dispatch, userId]);

    /*   const handleViewCv = () => {
        navigate(`/app/cv/3`);
    }; */

    const PostCV = async (values) => {
        dispatch(createCv(values));
        setOpenModal(false);
    };
    return (
        <div className="flex flex-col text-blue-500">
            <div className="mt-4 flex flex-col items-end">
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
                    Ajouter Un CV{' '}
                    <ListBulletIcon
                        style={{
                            marginLeft: '20px',
                            width: '24px',
                            height: '19.5px',
                        }}
                    />
                </Button>
            </div>

            <Modal
                isOpen={openModal}
                close={() => setOpenModal(false)}
                title="Créér un nouveau CV"
            >
                <div className="w-full rounded-md">
                    <div className="flex flex-col items-center rounded-lg bg-white p-4 shadow dark:bg-gray-700 sm:flex-row">
                        <Formik
                            initialValues={{
                                title: '',
                                description: '',
                                consultantId: idConsultant,
                            }}
                            onSubmit={(values) => {
                                PostCV(values);
                            }}
                        >
                            <Form className="flex flex-col space-y-3 sm:flex-row sm:space-x-2 sm:space-y-0">
                                <div className="flex flex-col ">
                                    <div className="flex flex-row">
                                        <div className="ml-2  flex">
                                            <Field
                                                name="title"
                                                component={Input}
                                                label="Titre de CV"
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
                                                name="description"
                                                component={Input}
                                                label="Description"
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
                                            Next
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
            <TablePanel
                className="custom-table-panel1"
                column={[
                    {
                        name: 'title',
                        label: (
                            <span className="label-nom-type">
                                <span>T</span>itre
                            </span>
                        ),
                    },
                    {
                        name: 'description',
                        label: (
                            <span className="label-nom-type">
                                <span>d</span>escription
                            </span>
                        ),
                    },
                ]}
                rows={cvs?.map((activity) => ({
                    title: activity.title,
                    description: activity.description,
                    delete: (
                        <>
                            <DeleteBtn activity={activity} />
                            <EditBtn activity={activity} />
                        </>
                    ),
                }))}
            />
        </div>
    );
};
const EditBtn = ({ activity }) => {
    const navigate = useNavigate();
    const handleEdit = async () => {
        navigate(`/app/cv/${activity.id}`);
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
                        color: '#fff ',
                    }}
                />
            </button>
        </>
    );
};
const DeleteBtn = ({ activity }) => {
    const dispatch = useDispatch();
    const confirm = useConfirm();
    const handleDelete = async () => {
        const result = await confirm({
            title: 'Supprimer?',
            description: 'Voulez vous supprimer le CV? ',
        });
        if (result) {
            try {
                dispatch(deleteCv(activity));
            } catch (error) {
                console.log(error);
            }
        }
    };
    return (
        <>
            <button
                onClick={handleDelete}
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
                        color: '#fff',
                    }}
                />
            </button>
        </>
    );
};
export default withAuth(ListCv);
