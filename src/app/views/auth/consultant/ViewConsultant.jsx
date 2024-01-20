import { Box } from '@mui/material';
import Paper from '@mui/material/Paper';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import avatar from '../../../assets/images/default-avatar.png';
import addressService from '../../../services/addressService';
import ConsultantService from '../../../services/ConsultantService';
import documentService from '../../../services/documentService';
import withAuth from './../../../common/withAuth';
import Consultant from './Editprofil';

const ViewConsultant = () => {
    const { consultantId } = useParams();
    console.log('consid', consultantId);
    const [user, setUser] = useState([]);
    //  console.log("userId"+userId)

    const [showConsultant, setShowConsultant] = useState(false);
    const [uploadedImage, setUploadedImage] = useState('');

    const handleEditProfileClick = () => {
        setShowConsultant(!showConsultant);
    };
    const [address, setAddress] = useState('');
    const [changed, setChanged] = useState(false);

    //*********** send receive data *****************/

    const [messageAdrss, setMessageAdrss] = useState(address);

    const changeAdresse = (messageAdrss) => {
        setMessageAdrss(messageAdrss);
    };

    var today = new Date();
    var birth = new Date(user.dateOfBirth);
    var age = today.getFullYear() - birth.getFullYear();
    //*********** send receive data *****************/

    useEffect(() => {
        const getUserById = async () => {
            try {
                const response1 = await ConsultantService.getConsultantByConsultantId(
                    consultantId,
                );
                console.log(response1.data);

                //  const userid =response1.data.userId

                // const response = await ConsultantService.getConsultantByUserId(userid);
                setUser(response1.data);
                console.log('imid', response1.data.imageId);
                const resptype = {
                    responseType: 'arraybuffer', // Set the responseType to 'arraybuffer'
                };
                const resp = await documentService.getFileByDocId(
                    response1.data.imageId,
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
        console.log('user.addressid', user.addressId);
        getUserById();
    }, []);

    useEffect(() => {
        displayAddress(user.addressId);
        console.log('adresse from useEffect', address);
    }, [changed]);

    const displayAddress = async (addressId) => {
        let ad;
        try {
            const response = await addressService.getAddressByAddressId(addressId);

            ad = response.data.addressText;
            console.log('add from profileUser  ', ad);

            setAddress(ad);
        } catch (error) {
            console.error(error);
        }

        setChanged(!false);
        console.log(changed);
        console.log('addres text from displayAddress after set  ', address);
        return ad;
    };

    console.log('profiluser', user);

    return (
        <div className="row">
            <div className="row-lg-8">
                {/* <div className="card mb-4"> */}
                <div className="card-body text-center">
                    <div className="profile_img p-4 text-center">
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            {uploadedImage ? (
                                <img
                                    src={uploadedImage}
                                    alt="Profile"
                                    className="rounded-circle border-3 border-yellow-500"
                                    style={{
                                        width: '137.14px',
                                        height: '131.57px',
                                        background:
                                            'url(portrait-selfie-pour-appel-video)',
                                        border: '3.48058px solid #D8D83D',
                                        borderRadius: '50%',
                                        flex: 'none',
                                        order: 0,
                                        flexGrow: 0,
                                    }}
                                />
                            ) : (
                                <img
                                    src={avatar}
                                    alt="Profile"
                                    className="rounded-circle border-3 border-yellow-500"
                                    style={{
                                        width: '137.14px',
                                        height: '131.57px',
                                        background:
                                            'url(portrait-selfie-pour-appel-video)',
                                        border: '3.48058px solid #D8D83D',
                                        borderRadius: '50%',
                                        flex: 'none',
                                        order: 0,
                                        flexGrow: 0,
                                    }}
                                />
                            )}
                        </div>
                    </div>

                    <p
                        className="my-3"
                        style={{
                            fontStyle: 'normal',
                            fontWeight: 700,
                            color: '#D8D83D',
                            fontSize: '25.0602px',
                            lineHeight: '29px',
                        }}
                    >
                        {user.firstName} {user.lastName}
                    </p>
                    <h5 className="my-3" style={{ color: '#D8D83D' }}>
                        {user.poste}
                    </h5>
                </div>
            </div>

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
                <div className="mb-4 flex">
                    <p className="mr-2 font-bold">Nom et prénom</p>
                    <div className="flex items-center">
                        <p className="text-gray-600">{user.firstName}</p>
                        <p className="mx-2 text-gray-600">{user.lastName}</p>
                    </div>
                </div>
                <hr className="my-4" />
                <div className="mb-4 flex">
                    <p className="mr-2 font-bold">Adresse é-mail</p>
                    <p className="text-gray-600">{user.email}</p>
                </div>
                <hr className="my-4" />
                <div className="mb-4 flex">
                    <p className="mr-2 font-bold">Titre du poste</p>
                    <p className="text-gray-600">{user.poste}</p>
                </div>
                <hr className="my-4" />
                <div className="mb-4 flex">
                    <p className="mr-2 font-bold">Adresse</p>
                    <p className="text-gray-600">{address}</p>
                </div>
                <hr className="my-4" />
                <div className="mb-4 flex">
                    <p className="mr-2 font-bold">Numéro Sécurité Social</p>
                    <p className="text-gray-600">{user.secNum}</p>
                </div>
                <hr className="my-4" />
                <div className="mb-4 flex">
                    <p className="mr-2 font-bold">Numéro téléphone</p>
                    <p className="text-gray-600">{user.phoneNumber}</p>
                </div>
                <hr className="my-4" />
                <div className="mb-4 flex">
                    <p className="mr-2 font-bold">Âge</p>
                    <p className="text-gray-600">{age} ans</p>
                </div>
                <hr className="my-4" />
            </div>
        </div>
    );
};

export default withAuth(ViewConsultant);
