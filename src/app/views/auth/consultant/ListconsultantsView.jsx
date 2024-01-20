import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { BiUserPlus } from 'react-icons/bi';
import { FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import avatr from '../../../assets/images/default-avatar.png';
import Modal from '../../../components/lib/container/Modal';
import consultantService from '../../../services/ConsultantService';
import documentService from '../../../services/documentService';
import withAuth from './../../../common/withAuth';
import TablePanelO from './../../../components/lib/container/table/TablePanelO';
import Button from './../../../components/lib/form/Button';

/**
 * AppView component: view for the app page. with authentication.
 *
 * @author Peter Mollet
 */
const AppView = () => {
    return (
        <div>
            <div className="flex items-center justify-between">
                <div>
                    <h3>Liste des consultants</h3>
                </div>
                <TestModal />
            </div>
            <TestList />
        </div>
    );
};

export default withAuth(AppView);

const TestList = () => {
    const [people, setPeople] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [search, setSearch] = useState(null);
    const [sort, setSort] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const consultants = await consultantService.getAllConsultants();
            const consultantData = consultants.data;

            setTotalElements(consultantData.length);
            setTotalPages(Math.ceil(consultantData.length / 5));

            const slicedConsultants = consultantData.slice(page * 5, (page + 1) * 5);

            setPeople(
                slicedConsultants.map((d) => {
                    return {
                        nom: <Name person={d} />,
                        username: d.username,
                        poste: d.poste,
                        edit: <EditBtn id={d.id} />,
                    };
                }),
            );
        };

        fetchData();
    }, [page, search, sort]);

    return (
        <div className="my-5 border-y py-5">
            <TablePanelO
                column={[
                    { name: 'firstName', label: 'Nom', sortable: true },
                    { name: 'username', label: 'Username' },
                    { name: 'poste', label: 'Poste' },
                    { name: '', label: '' },
                ]}
                rows={people}
                onSearch={(values) => {
                    setSearch(values.search);
                    setPage(0);
                }}
                onSort={(values) => {
                    setSort(values);
                    setPage(0);
                }}
                totalElements={totalElements}
                pageSize={5} // Update the page size to 5
                totalPages={totalPages}
                onPageChange={setPage}
                currentPage={page}
                setCurrentPage={setPage}
                onClick={() => setOpenModal(true)}
            />
        </div>
    );
};

const Name = ({ person }) => {
    const [uploadedImage, setUploadedImage] = useState('');

    useEffect(() => {
        const fetchConsultantImage = async () => {
            try {
                console.log('userid', person.userId);

                const response = await consultantService.getConsultantByUserId(
                    person.userId,
                );
                console.log('imid', response.data.imageId);
                const resptype = {
                    responseType: 'arraybuffer', // Set the responseType to 'arraybuffer'
                };
                const resp = await documentService.getFileByDocId(
                    response.data.imageId,
                    resptype,
                );
                console.log('resp', resp);

                const imageBlob = new Blob([resp.data], {
                    type: resp.headers['content-type'],
                });
                const imageURL = URL.createObjectURL(imageBlob);
                setUploadedImage(imageURL);
            } catch (error) {
                console.log(error);
            }
        };
        fetchConsultantImage();
    }, [person.userId]);

    return (
        <div className="flex items-center">
            <div className="h-10 w-10 flex-shrink-0">
                {uploadedImage ? (
                    <img
                        className="border-3 h-10 w-10  rounded-full border-yellow-500"
                        src={uploadedImage}
                        alt=""
                    />
                ) : (
                    <img
                        className="border-3 h-10 w-10  rounded-full border-yellow-500 "
                        src={avatr}
                        alt=""
                    />
                )}
            </div>
            <div className="ml-4">
                <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {person.firstName} {person.lastName}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                    <u> {person.email}</u>
                </div>
            </div>
        </div>
    );
};
const EditBtn = ({ id }) => {
    const navigate = useNavigate();
    console.log('iiiiiiiiiid', id);
    const handleViewConsultant = (id) => {
        navigate(`/app/viewConsultant/${id}`);
    };
    return (
        <button
            type="button"
            onClick={() => handleViewConsultant(id)}
            className="btn-link-primary"
        >
            <FaEye /> View
        </button>
    );
};

const TestModal = () => {
    const [openModal, setOpenModal] = useState(false);

    const validationSchema = yup.object({
        firstName: yup.string().required('Prénom est obligatoire '),
        username: yup.string().required('username est obligatoire '),

        lastName: yup.string().required('Nom est obligatoire'),
        email: yup
            .string()
            .email('Entrez un email valide ')
            .required('Email est obligatoire '),
    });

    let navigate = useNavigate();
    const [error, setError] = useState(null);

    const [consultant, setConsultant] = useState({
        firstName: '',
        username: '',
        lastName: '',
        email: '',
    });

    const formik = useFormik({
        initialValues: {
            firstName: '',
            username: '',
            lastName: '',
            email: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                console.log(values);
                const response = await consultantService.addConsultant(values);
                console.log('response', response);
                if (response.status == 200) {
                    toast.success('Consultant ajouté avec succès', {
                        position: toast.POSITION.TOP_CENTER,
                        style: { top: '100%', transform: 'translateY(-10%)' },
                    });
                     setOpenModal(false)

                } else {
                    toast.warning('Email ou username existe déja ', {
                        position: toast.POSITION.TOP_CENTER,
                        style: { top: '100%', transform: 'translateY(-10%)' },
                    });
                }
                // else if(response.status==403)
                // {
                //   toast.error("Username existe déja ", {
                //     position: toast.POSITION.TOP_CENTER,
                //     style: { top: '100%', transform: 'translateY(-10%)' },
                //   });
                // }
            } catch (error) {
                toast.error("Erreur dans l'ajout du consultant", {
                    position: toast.POSITION.TOP_CENTER,
                    style: { top: '10%', transform: 'translateY(-10%)' },
                });
            }
        },
    });
    const { handleChange, handleBlur, errors } = formik;

    return (
        <>
            <Button
                type="button"
                color="default"
                className="w-40"
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    color: '#6B6D7C',
                    left: '20px',
                    height: '50px',
                    backgroundColor: '#D8D83D',
                    width: '220px',
                    borderRadius: '15px',
                    alignItems: 'center',
                    textAlign: 'center',
                    marginRight:
                        '10px' /* Ajoute 10 pixels d'espace à droite de l'élément 1 */,
                }}
                onClick={() => setOpenModal(true)}
            >
                Ajouter un consultant
                <BiUserPlus className="ml-2" />
            </Button>

            <Modal isOpen={openModal} close={() => setOpenModal(false)}>
                <div className="rounded-md">
                    <Box
                        component="form"
                        onSubmit={formik.handleSubmit}
                        sx={{
                            '& > :not(style)': { m: 1 },
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <h3>Ajouter un consultant:</h3>

                        <TextField
                            id="email"
                            label="Email"
                            variant="outlined"
                            required
                            email="entrez un email valide"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={!!errors.email}
                            helperText={errors.email}
                        />

                        {error && <div style={{ color: 'red' }}>{error}</div>}

                        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
                            <TextField
                                id="firstName"
                                label="Nom"
                                variant="outlined"
                                required
                                fullWidth
                                onChange={formik.handleChange}
                                value={formik.values.firstName}
                                error={
                                    formik.touched.firstName &&
                                    Boolean(formik.errors.firstName)
                                }
                                helperText={
                                    formik.touched.firstName && formik.errors.firstName
                                }
                            />

                            <TextField
                                id="lastName"
                                label="Prénom"
                                variant="outlined"
                                required
                                fullWidth
                                value={formik.values.lastName}
                                onChange={formik.handleChange}
                                error={
                                    formik.touched.lastName &&
                                    Boolean(formik.errors.lastName)
                                }
                                helperText={
                                    formik.touched.lastName && formik.errors.lastName
                                }
                            />
                            <TextField
                                id="username"
                                label="Username"
                                variant="outlined"
                                required
                                fullWidth
                                onChange={formik.handleChange}
                                value={formik.values.username}
                                error={
                                    formik.touched.username &&
                                    Boolean(formik.errors.username)
                                }
                                helperText={
                                    formik.touched.username && formik.errors.username
                                }
                            />
                        </Box>
                        <div className="flex justify-between bg-transparent">
                            <Button
                                type="submit"
                                variant="contained"
                                style={{
                                    width: '120px',
                                    backgroundColor: '#D8D83D',
                                    height: '40px',
                                    marginLeft: '120px',
                                    borderRadius: '15px',
                                }}

                            >
                                Valider{' '}
                            </Button>
                            <button
                                onClick={() => setOpenModal(false)}
                                style={{
                                    width: '120px',
                                    marginRight: '100px',
                                    height: '40px',
                                    backgroundColor: '#FAFAFA',
                                    borderRadius: '15px',
                                    border: '2px solid #FF7676',
                                    boxShadow:
                                        '1px 1px 8px rgba(0, 0, 0, 0.3), inset 0px 1px 0px rgba(255, 255, 255, 0.08)',
                                }}
                                type="reset"
                            >
                                Annuler
                            </button>{' '}
                        </div>
                    </Box>
                </div>
            </Modal>
        </>
    );
};