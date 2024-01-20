import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { IconButton, MenuItem } from '@mui/material';
import { Dialog, DialogTitle } from '@mui/material';
import Divider from '@mui/material/Divider';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import * as yup from 'yup';

import addressService from '../../../services/addressService';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};
const validationSchema = yup.object({
    addressNotes: yup.string().required('Required'),
    country: yup.mixed().required('Country is required'),
    city: yup.mixed().required('City is required'),
    street: yup.mixed().required('Street is required'),
    postCode: yup.string().required('Postcode is required'),
    streetNumber: yup.string().required('streetNumber is required'),
});
const token = localStorage.getItem('token');
const AddressModal = ({ onClose, open, handleAddressChange }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalCityOpen, setIsModalCityOpen] = useState(false);
    const [isModalStreetOpen, setIsModalStreetOpen] = useState(false);
    const [newCountryName, setNewCountryName] = useState('');
    const [newCityName, setNewCityName] = useState('');
    const [newStreetName, setNewStreetName] = useState('');
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const [streets, setStreets] = useState([]);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('success');
    const [messageSubmit, setMessageSubmit] = useState('');
    const [messageSubmitType, setMessageSubmitType] = useState('success');

    const closeModalCountry = () => {
        setIsModalOpen(false);
        setMessage('');
    };
    const closeModalCity = () => {
        setIsModalCityOpen(false);
        setMessage('');
    };
    const closeModalStreet = () => {
        setIsModalStreetOpen(false);
        setMessage('');
    };

    const handleAddCountry = async () => {
        try {
            const name = { name: newCountryName };
            const response = await addressService.addCountry(name);
            console.log(response.data.country);
            console.log(response.data);
            setNewCountryName('');
            setMessage(response.data.message);
            setMessageType('success');
            setCountries(countries.concat(response.data.country));
            setTimeout(() => {
                setMessage('');
                setMessageType('');
                //onClose();
            }, 3000); // clear message after 5 seconds

            // setIsModalOpen(false);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                // the error message is available in the response data
                console.error(error.response.data.message);
                //setError(error.response.data.message);
                setMessage(error.response.data.message);
                setMessageType('error');
                setMessageType('error');
                setTimeout(() => {
                    setMessage('');
                    setMessageType('');
                    //onClose();
                }, 3000); // clear message after 5 seconds
            } else {
                // something else went wrong
                console.error(error);
                setMessage("Une erreur s'est produite. Veuillez réessayer.");
            }
        }
    };
    const handleAddCity = async () => {
        const city = {
            name: newCityName,
            country: {
                id: formik.values.country.id,
                name: formik.values.country.name,
            },
        };
        addressService
            .addCities(city)
            .then((response) => {
                console.log(response.data);
                console.log(response.data.message);
                console.log(response.data.city);
                setCities(cities.concat(response.data.city));
                //setCities([...cities, response.data.city]);
                //setIsModalOpen(false);
                setNewCityName('');
                setMessage(response.data.message);
                setMessageType('success');
                setTimeout(() => {
                    setMessage('');
                    setMessageType('');
                    //onClose();
                }, 3000); // clear message after 5 seconds
            })
            .catch((error) => {
                if (
                    error.response &&
                    error.response.data &&
                    error.response.data.message
                ) {
                    // the error message is available in the response data
                    console.error(error.response.data.message);
                    setMessage(error.response.data.message);
                    setMessageType('error');
                    setTimeout(() => {
                        setMessage('');
                        setMessageType('');
                        //onClose();
                    }, 3000); // clear message after 5 seconds
                    // handle the error message as appropriate for your application
                } else {
                    console.error(error);
                }
            });
    };
    const handleAddStreet = () => {
        const street = {
            name: newStreetName,
            city: {
                id: formik.values.city.id,
                name: formik.values.city.name,
                country: {
                    id: formik.values.country.id,
                    name: formik.values.country.name,
                },
            },
        };
        addressService
            .addStreet(street)
            .then((response) => {
                console.log(response.data);
                setStreets(streets.concat(response.data.street));
                //setStreets([...streets, response.data.street]);
                setMessage(response.data.message);
                setMessageType('success');
                setNewStreetName('');
                setTimeout(() => {
                    setMessage('');
                    setMessageType('');
                    //onClose();
                }, 3000); // clear message after 5 seconds
            })
            .catch((error) => {
                if (
                    error.response &&
                    error.response.data &&
                    error.response.data.message
                ) {
                    // the error message is available in the response data
                    console.error(error.response.data.message);
                    setMessage(error.response.data.message);
                    setMessageType('error');
                    setTimeout(() => {
                        setMessage('');
                        setMessageType('');
                        //onClose();
                    }, 3000); // clear message after 5 seconds
                    // handle the error message as appropriate for your application
                } else {
                    console.error(error);
                }
            });
    };

    useEffect(() => {
        // fetch countries from backend
        addressService
            .getCountries()
            .then((response) => {
                setCountries(response.data);
                console.log('countries:', JSON.stringify(countries));
            })
            .catch((error) => console.error(error));
    }, []);
    const formik = useFormik({
        initialValues: {
            country: '',
            city: '',
            street: '',
            streetNumber: '',
            postCode: '',
            addressNotes: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const { country, city, street, postCode, streetNumber, addressNotes } =
                values;
            console.log('values:', JSON.stringify(values));
            const address = `${addressNotes}, ${streetNumber}, ${street.name}, ${city.name}, ${postCode}, ${country.name}`;
            // Call the onAdresseChange function with the address value
            console.log('adresse:' + address);
            // Send the data to the server create an address
            const addresss = {
                postCode: postCode,
                streetNumber: streetNumber,
                addressNotes: addressNotes,
                street: {
                    id: street.id,
                    name: street.name,
                    city: {
                        id: city.id,
                        name: city.name,
                        country: {
                            id: country.id,
                            name: country.name,
                        },
                    },
                },
            };
            addressService
                .addAddress(addresss)
                .then((response) => {
                    console.log(response);
                    console.log(response.data);
                    console.log(response.data?.message);
                    const addressId = response.data?.address.id; // Access the "id" field of the response object
                    const message = response.data?.message;
                    const address = response.data?.addressText;
                    handleAddressChange(address, addressId);
                    setMessageSubmit(message);
                    setMessageSubmitType('success');
                    setTimeout(() => {
                        setMessageSubmit('');
                        setMessageSubmitType('');
                        //onClose();
                    }, 5000); // clear message after 5 seconds
                })
                .catch((error) => {
                    if (
                        error.response &&
                        error.response.data &&
                        error.response.data.message
                    ) {
                        // the error message is available in the response data
                        console.error(error.response.data.message);
                        setMessageSubmit(error.response.data.message);
                        setMessageSubmitType('error');
                        setTimeout(() => {
                            setMessageSubmit('');
                            setMessageSubmitType('');
                            //onClose();
                        }, 3000); // clear message after 5 seconds
                        // handle the error message as appropriate for your application
                    } else {
                        console.error(error);
                    }
                });
        },
    });

    const handleCountryChange = (event) => {
        const countryId = event.target.value;
        const selectedCountry = countries.find(
            (country) => country.id === Number(countryId),
        );
        formik.setFieldValue('country', {
            id: selectedCountry.id,
            name: selectedCountry.name,
        });
        formik.setFieldValue('city', '');
        formik.setFieldValue('street', '');
        setCities([]);
        setStreets([]);

        if (countryId) {
            // fetch cities by country id from backend
            addressService.getCitiesByCountryId(countryId).then((response) => {
                setCities(response.data);
            });
        }
    };
    const handleCityChange = (event) => {
        const cityId = event.target.value;
        const selectedCity = cities.find((city) => city.id === Number(cityId));
        formik.setFieldValue('city', { id: selectedCity.id, name: selectedCity.name });
        console.log(city);
        formik.setFieldValue('street', '');
        setStreets([]);

        if (cityId) {
            // fetch streets by city id from backend
            addressService.getStreetsByCityId(cityId).then((response) => {
                setStreets(response.data);
            });
        }
    };
    const handleStreetChange = (event) => {
        const streetId = event.target.value;
        const selectedStreet = streets.find((city) => city.id === Number(streetId));
        formik.setFieldValue('street', {
            id: selectedStreet.id,
            name: selectedStreet.name,
        });
    };
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={modalStyle}>
                <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                    sx={{
                        fontWeight: 'bold',
                        fontSize: '20px',
                        mb: '10px',
                        borderBottom: '1px solid #ccc',
                        color: '#00416a',
                    }}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingTop: 0,
                        paddingBottom: 0,
                        fontFamily: 'Arial',
                    }}
                >
                    <span style={{ flex: 1, textAlign: 'center' }}>
                        Détails de l'adresse:
                    </span>
                </Typography>
                <Divider
                    style={{
                        marginTop: '0px',
                        paddingTop: '0px',
                        marginBottom: '8px',
                        fontWeight: 'bold',
                    }}
                />
                <form onSubmit={formik.handleSubmit}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ marginTop: 5 }}> Ajouter un pays :</span>
                        <div>
                            <Button
                                variant="contained"
                                color="info"
                                onClick={() => setIsModalOpen(true)}
                            >
                                <AddIcon />
                            </Button>
                        </div>
                        <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
                            <DialogTitle
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    color: '#00416a',
                                    justifyContent: 'space-between',
                                    fontWeight: 'bold',
                                    paddingTop: 10,
                                    paddingBottom: 0,
                                    fontFamily: 'Arial',
                                }}
                                sx={{ pr: 1 }}
                            >
                                <span style={{ flex: 1, textAlign: 'center' }}>
                                    Ajouter un pays
                                </span>
                                <IconButton onClick={closeModalCountry}>
                                    <CloseIcon />
                                </IconButton>
                            </DialogTitle>
                            <Divider
                                style={{
                                    marginTop: '0px',
                                    paddingTop: '0px',
                                    marginBottom: '8px',
                                    fontWeight: 'bold',
                                }}
                            />

                            <div
                                style={{
                                    padding: 20,
                                    backgroundColor: 'white',
                                }}
                            >
                                <TextField
                                    label="Nom du pays"
                                    value={newCountryName}
                                    onChange={(event) =>
                                        setNewCountryName(event.target.value)
                                    }
                                    sx={{ mb: 2 }}
                                />
                                <Button
                                    style={{ marginTop: 7, marginLeft: 5 }}
                                    variant="contained"
                                    onClick={handleAddCountry}
                                >
                                    Valider
                                </Button>
                            </div>
                            {message && (
                                <div
                                    style={{
                                        backgroundColor:
                                            messageType === 'success'
                                                ? '#b7e4c7'
                                                : '#ffd6cc',
                                        color:
                                            messageType === 'success'
                                                ? '#1d804f'
                                                : '#9f3a38',
                                        padding: '10px',
                                        borderRadius: '5px',
                                        marginBottom: '10px',
                                    }}
                                >
                                    {message}
                                </div>
                            )}
                        </Dialog>
                    </div>
                    <Box my={0.5} /> {/* Espace vertical entre les deux composants */}
                    <TextField
                        id="country"
                        label="Pays"
                        variant="outlined"
                        required
                        fullWidth
                        select
                        value={formik.values.country ? formik.values.country.id : ''}
                        onChange={handleCountryChange}
                        error={formik.touched.country && Boolean(formik.errors.country)}
                        helperText={formik.touched.country && formik.errors.country}
                        sx={{ mb: 2 }}
                        style={{ display: 'block' }}
                    >
                        <MenuItem value="">---Sélectionner un pays---</MenuItem>
                        {countries.map((country) => (
                            <MenuItem key={country.id} value={country.id}>
                                {country.name}
                            </MenuItem>
                        ))}
                    </TextField>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ marginTop: 5 }}> Ajouter une ville :</span>
                        <div>
                            <Button
                                variant="contained"
                                color="info"
                                onClick={() => setIsModalCityOpen(true)}
                            >
                                <AddIcon />
                            </Button>
                        </div>
                        <Dialog open={isModalCityOpen} onClose={closeModalCity}>
                            <DialogTitle
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    color: '#00416a',
                                    justifyContent: 'space-between',
                                    fontWeight: 'bold',
                                    paddingTop: 10,
                                    paddingBottom: 0,
                                    fontFamily: 'Arial',
                                }}
                                sx={{ pr: 1 }}
                            >
                                <span style={{ flex: 1, textAlign: 'center' }}>
                                    Ajouter une ville
                                </span>
                                <IconButton onClick={() => setIsModalCityOpen(false)}>
                                    <CloseIcon />
                                </IconButton>
                            </DialogTitle>
                            <Divider
                                style={{
                                    marginTop: '0px',
                                    paddingTop: '0px',
                                    marginBottom: '8px',
                                    fontWeight: 'bold',
                                }}
                            />

                            <div
                                style={{
                                    padding: 20,
                                    backgroundColor: 'white',
                                }}
                            >
                                <TextField
                                    label="Nom de la ville"
                                    value={newCityName}
                                    onChange={(event) =>
                                        setNewCityName(event.target.value)
                                    }
                                    sx={{ mb: 2 }}
                                />
                                <Button
                                    style={{ marginTop: 7, marginLeft: 5 }}
                                    variant="contained"
                                    onClick={handleAddCity}
                                >
                                    Valider
                                </Button>
                            </div>
                            {message && (
                                <div
                                    style={{
                                        backgroundColor:
                                            messageType === 'success'
                                                ? '#b7e4c7'
                                                : '#ffd6cc',
                                        color:
                                            messageType === 'success'
                                                ? '#1d804f'
                                                : '#9f3a38',
                                        padding: '10px',
                                        borderRadius: '5px',
                                        marginBottom: '10px',
                                    }}
                                >
                                    {message}
                                </div>
                            )}
                        </Dialog>
                    </div>
                    <Box my={0.5} /> {/* Espace vertical entre les deux composants */}
                    <TextField
                        id="city"
                        label="Ville"
                        variant="outlined"
                        required
                        fullWidth
                        select
                        value={formik.values.city ? formik.values.city?.id : ''}
                        onChange={handleCityChange}
                        disabled={!formik.values.country.id}
                        error={formik.touched.city && Boolean(formik.errors.city)}
                        helperText={formik.touched.city && formik.errors.city}
                        sx={{ mb: 2 }}
                    >
                        <MenuItem value="">---Sélectionner une ville---</MenuItem>
                        {cities.map((city) => (
                            <MenuItem key={city?.id} value={city?.id}>
                                {city?.name}
                            </MenuItem>
                        ))}
                    </TextField>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ marginTop: 5 }}> Ajouter une rue :</span>
                        <div>
                            <Button
                                variant="contained"
                                color="info"
                                onClick={() => setIsModalStreetOpen(true)}
                            >
                                <AddIcon />
                            </Button>
                        </div>
                        <Dialog
                            open={isModalStreetOpen}
                            onClose={() => setIsModalStreetOpen(false)}
                        >
                            <DialogTitle
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    color: '#00416a',
                                    justifyContent: 'space-between',
                                    fontWeight: 'bold',
                                    paddingTop: 10,
                                    paddingBottom: 0,
                                    fontFamily: 'Arial',
                                }}
                                sx={{ pr: 1 }}
                            >
                                <span style={{ flex: 1, textAlign: 'center' }}>
                                    Ajouter une rue
                                </span>
                                <IconButton onClick={closeModalStreet}>
                                    <CloseIcon />
                                </IconButton>
                            </DialogTitle>
                            <Divider
                                style={{
                                    marginTop: '0px',
                                    paddingTop: '0px',
                                    marginBottom: '8px',
                                    fontWeight: 'bold',
                                }}
                            />
                            <div
                                style={{
                                    padding: 20,
                                    backgroundColor: 'white',
                                }}
                            >
                                <TextField
                                    label="Nom de la rue"
                                    value={newStreetName}
                                    onChange={(event) =>
                                        setNewStreetName(event.target.value)
                                    }
                                    sx={{ mb: 2 }}
                                />
                                <Button
                                    style={{ marginTop: 7, marginLeft: 5 }}
                                    variant="contained"
                                    onClick={handleAddStreet}
                                >
                                    Valider
                                </Button>
                            </div>
                            {message && (
                                <div
                                    style={{
                                        backgroundColor:
                                            messageType === 'success'
                                                ? '#b7e4c7'
                                                : '#ffd6cc',
                                        color:
                                            messageType === 'success'
                                                ? '#1d804f'
                                                : '#9f3a38',
                                        padding: '10px',
                                        borderRadius: '5px',
                                        marginBottom: '10px',
                                    }}
                                >
                                    {message}
                                </div>
                            )}
                        </Dialog>
                    </div>
                    <Box my={0.5} /> {/* Espace vertical entre les deux composants */}
                    <TextField
                        id="street"
                        label="Nom de la rue"
                        variant="outlined"
                        required
                        fullWidth
                        select
                        value={formik.values.street ? formik.values.street.id : ''}
                        onChange={handleStreetChange}
                        disabled={!formik.values.city.id}
                        error={formik.touched.street && Boolean(formik.errors.street)}
                        helperText={formik.touched.street && formik.errors.street}
                        sx={{ mb: 2 }}
                    >
                        <MenuItem value="">---Sélectionner une rue--- </MenuItem>
                        {streets.map((street) => (
                            <MenuItem key={street.id} value={street.id}>
                                {street.name}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        id="streetNumber"
                        label="Numéro de la rue"
                        variant="outlined"
                        required
                        fullWidth
                        value={formik.values.streetNumber}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.streetNumber &&
                            Boolean(formik.errors.streetNumber)
                        }
                        helperText={
                            formik.touched.streetNumber && formik.errors.streetNumber
                        }
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        id="postCode"
                        label="Code postal"
                        variant="outlined"
                        required
                        fullWidth
                        value={formik.values.postCode}
                        onChange={formik.handleChange}
                        error={formik.touched.postCode && Boolean(formik.errors.postCode)}
                        helperText={formik.touched.postCode && formik.errors.postCode}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        id="addressNotes"
                        label="Addresse"
                        variant="outlined"
                        required
                        fullWidth
                        value={formik.values.addressNotes}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.addressNotes &&
                            Boolean(formik.errors.addressNotes)
                        }
                        helperText={
                            formik.touched.addressNotes && formik.errors.addressNotes
                        }
                        sx={{ mb: 2 }}
                    />
                    {/* Add a button to validate the form and close the modal */}
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', my: 2 }}>
                        <Button
                            variant="contained"
                            color="info"
                            type="submit"
                            sx={{ mr: 2 }}
                        >
                            Valider
                        </Button>
                        <Button
                            variant="contained"
                            style={{ backgroundColor: '#D6955B', color: '#ffffff' }}
                            onClick={onClose}
                        >
                            Fermer
                        </Button>
                    </Box>
                    {messageSubmit && (
                        <div
                            style={{
                                backgroundColor:
                                    messageSubmitType === 'success'
                                        ? '#b7e4c7'
                                        : '#ffd6cc',
                                color: messageType === 'success' ? '#1d804f' : '#9f3a38',
                                padding: '10px',
                                borderRadius: '5px',
                                marginBottom: '10px',
                            }}
                        >
                            {messageSubmit}
                        </div>
                    )}
                </form>
            </Box>
        </Modal>
    );
};
AddressModal.propTypes = {
    handleAddressChange: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};
export default AddressModal;
