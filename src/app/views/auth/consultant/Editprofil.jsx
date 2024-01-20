import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { IoCheckmarkDoneCircleSharp } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import withAuth from '../../../common/withAuth';
import addressService from '../../../services/addressService';
import consultantService from '../../../services/consultantService';
import AddressModal from './AddressModal';

const validationSchema = yup.object({
    firstName: yup.string().required('Nom est obligatoire '),
    lastName: yup.string().required('Prénom est obligatoire '),
    username: yup.string().email('Enter a valid email').required('Email est obligatoire'),
    poste: yup.string().required('Poste est obligatoire'),

    secNum: yup.string().matches(/^\d{9}$/, 'Numéro SS doit contenir exactement 9 chiffres')
    .matches(/^\d+$/, 'Le numéro de téléphone doit contenir uniquement des chiffres')
    .required('Numéro SS est obligatoire'),
    phoneNumber: yup.string()
    .matches(/^(00\d+)$/, 'Numéro de téléphone invalide').required('Numéro de téléphone est obligatoire'),
    address: yup.string().required('Adresse est obligatoire'),
});
const CustomTextField = styled(TextField)(({ theme }) => ({
    '& .MuiInputLabel-root': {
        color: '#D8D83D', // Color of the field name
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#D8D83D', // Color of the field's outline
        },
        '&:hover fieldset': {
            borderColor: '#D8D83D', // Color of the field's outline on hover
        },
        '&.Mui-focused fieldset': {
            borderColor: '#D8D83D', // Color of the field's outline when focused
        },
    },
}));

const Editprofil = () => {
    let navigate = useNavigate();

    const storage = localStorage.getItem('persist:auth');
    let userId;
    let email;
    let profil;
    if (storage) email = JSON.parse(JSON.parse(storage).email);
    if (storage) userId = JSON.parse(JSON.parse(storage).userId);
    if (storage) profil = JSON.parse(JSON.parse(storage).profile);

    const [test, setTest] = useState(false);

    const [open, setOpen] = useState(false);
    const [address, setAddress] = useState('');
    const [addressText, setAddressText] = useState('');
    const [addressId, setAddressId] = useState('');
    const handleAddressChange = (newAddress, addressId) => {
        setAddress(newAddress);
        formik.setFieldValue('address', address);
        setAddressId(addressId);
        console.log('New address ID:', addressId);
        console.log('New addresSSSSSSSs:', address);

        setUser((prev) => ({
            ...prev,
            addressId: addressId,
        }));
    };

    const [user, setUser] = useState({
        email: email,
        firstName: '',
        lastName: '',
        userId: '',
        poste: '',
        dateOfBirth: '',
        secNum: '',
        phoneNumber: '',
        // addressId:""    ,
    });

    const formik = useFormik({
        initialValues: user,
        validationSchema,
    });

    console.log('userrrrrr', user);
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const displayAddress = async (addressId) => {
        let ad;
        try {
            console.log('*attttttttttention', addressId);

            const response = await addressService.getAddressByAddressId(addressId);
            console.log('response from displayAddress   ', response);
            console.log('address text from displayAddress  ', response.data.addressText);

            formik.setValues((prevValues) => ({
                ...prevValues,
                address: response.data.addressText,
            }));

            console.log('user from displayAddress  ', user);

            ad = response.data.addressText;
            console.log('add from displayAddress  ', ad);

            setAddressText(ad);
            console.log('addres text from displayAddress after set  ', addressText);
        } catch (error) {
            console.error(error);
        }
        return ad;
    };

    //DISPLAY USER
    const displayeUser = async (userId) => {
        try {
            const response = await consultantService.getConsultantByUserId(userId);
            console.log('userid11111111111', userId);
            const userData = response.data;
            // const userWithAdress={...userData,address:displayAddress(userData.addressId)}

            const address = await displayAddress(userData.addressId);

            console.log('userData from display user', userData);

            setUser(userData);

            console.log('addressid from display user', userData.addressId);

            formik.setValues(
                (prevValues) => ({
                    ...prevValues,
                    firstName: userData.firstName,

                    lastName: userData.lastName,
                    userId: userData.userId,
                    poste: userData.poste,
                    dateOfBirth: userData.dateOfBirth,
                    secNum: userData.secNum,
                    phoneNumber: userData.phoneNumber,
                    // address:address
                }),
                setAddressText(address),

                console.log('adress text from dislayuser AFTER SETADDRESS ', addressText),
            );

            // setUpdateUserId(user.id);
        } catch (error) {
            console.error(error);
        }
    };

    //UPDATE USER

    const updateUser = async (userId, user) => {
        try {
            const updatedUser = {
                ...user,
                email: email,
                firstName: formik.values.firstName,
                lastName: formik.values.lastName,
                userId: formik.values.userId,
                poste: formik.values.poste,
                dateOfBirth: formik.values.dateOfBirth,
                secNum: formik.values.secNum,
                phoneNumber: formik.values.phoneNumber,
                addressId: user.addressId,
            };

            const res = await consultantService.updateConsultant(updatedUser, userId);
            console.log(res);
            setTest(!test);
            window.location.reload();
            // setchanged(!changed);
        } catch (error) {
            console.error(error);
        }
        //sthg was updated
        // setchanged(!changed);

        console.log('*******finish*****', user);
    };

    useEffect(() => {
        displayeUser(userId);
    }, [userId, test]);

    ///use effect Adress //////

    useEffect(() => {
        const add = user.addressId;
        console.log('adress from use Effect', user.addressId);
        // if (add) {
        displayAddress(user.addressId);
        // }
    }, [addressId]);

    console.log('display user lbarra *******************************', user);
    console.log(
        'display addressid lbarra *******************************',
        user.addressId,
    );
    console.log('address text  *******************************', addressText);
    console.log('email lbarra   *******************************', email);

    return (
        <>
            <div
                className="box-border"
                style={{
                    width: '1010px',
                    height: '629px',
                    margin: '0 auto', // Add this property to move the box to the right
                    background: '#FFFFFF',
                    border: '1px solid #ECEDF8',
                    boxShadow: '1px 1px 6px rgba(126, 126, 126, 0.15)',
                    borderRadius: '20px',
                    padding: '24px', // Adjust the padding as per your requirements
                }}
            >
                <Grid container spacing={3}>
                    <Grid item xs={12}>
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
                            <div className="d-flex justify-content-end mb-2">
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                    }}
                                >
                                    <button
                                        type="button"
                                        color="default"
                                        className="w-40  "
                                        onClick={() => updateUser(userId, user)}
                                        style={{
                                            boxSizing: 'border-box',
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            padding: '15px 40px',
                                            gap: '20px',
                                            width: '200px',
                                            height: '40px',
                                            left: '86%',
                                            transform: 'translateX(-50%)',
                                            top: '330px',
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
                                </div>
                            </div>
                            <CustomTextField
                                id="email"
                                label="Email"
                                variant="outlined"
                                required
                                email="Enter a valid mail"
                                value={email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />

                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    gap: '16px',
                                }}
                            >
                                <CustomTextField
                                    id="firstName"
                                    label="Nom"
                                    variant="outlined"
                                    required
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.firstName}
                                    helperText={
                                        formik.touched.firstName &&
                                        formik.errors.firstName
                                    }
                                />

                                <CustomTextField
                                    id="lastName"
                                    label="Prénom"
                                    variant="outlined"
                                    required
                                    value={formik.values.lastName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    helperText={
                                        formik.touched.lastName && formik.errors.lastName
                                    }
                                />
                            </Box>

                            <CustomTextField
                                id="address"
                                label="Adresse"
                                // ref={refAddress}
                                variant="outlined"
                                required
                                value={addressText}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                helperText={
                                    formik.touched.address && formik.errors.address
                                }
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <HelpOutlineIcon onClick={handleOpen} />
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <Box sx={{ m: 2 }}>
                                <AddressModal
                                    open={open}
                                    onClose={handleClose}
                                    handleAddressChange={handleAddressChange}
                                />
                            </Box>

                            <CustomTextField
                                id="poste"
                                label="Poste"
                                variant="outlined"
                                required
                                value={formik.values.poste}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                helperText={formik.touched.poste && formik.errors.poste}
                            />

                            <CustomTextField
                                id="phoneNumber"
                                label="Numéro de téléphone"
                                variant="outlined"
                                required
                                onChange={(e) => {
                                    const onlyNums = e.target.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
                                    formik.handleChange(e); // Handle formik change event
                                    formik.setFieldValue('phoneNumber', onlyNums); // Set the field value to only numbers
                                  }}
                                value={formik.values.phoneNumber}
                                onBlur={formik.handleBlur}
                                type="text" // Set the input type to "text" to treat the value as a string
                                helperText={
                                    formik.touched.phoneNumber &&
                                    formik.errors.phoneNumber
                                }
                            />

                            <CustomTextField
                                id="secNum"
                                label="Numéro SS"
                                variant="outlined"
                                required
                                value={formik.values.secNum}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                helperText={formik.touched.secNum && formik.errors.secNum}
                            />

                            <CustomTextField
                                sx={{ mt: 1 }}
                                id="dateOfBirth"
                                type="date"
                                variant="outlined"
                                required
                                value={formik.values.dateOfBirth}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                helperText={
                                    formik.touched.dateOfBirth &&
                                    formik.errors.dateOfBirth
                                }
                            />
                        </Box>
                    </Grid>
                </Grid>
            </div>

            {/* </Dialog> */}
        </>
    );
};
export default withAuth(Editprofil);
