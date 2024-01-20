/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import { BiEditAlt, ImCancelCircle } from 'react-icons/all';

import avatar from '../../../assets/images/default-avatar.png';
import withAuth from '../../../common/withAuth';
import Button from '../../../components/lib/form/Button';
import addressService from '../../../services/addressService';
import consultantService from '../../../services/consultantService';
import documentService from '../../../services/documentService';
import Consultant from './Editprofil';

const ProfileView = () => {
    const [user, setUser] = useState([]);
    const storage = localStorage.getItem('persist:auth');
    let userId;
    let email;
    let profil;
    if (storage) email = JSON.parse(JSON.parse(storage).email);
    if (storage) userId = JSON.parse(JSON.parse(storage).userId);
    if (storage) profil = JSON.parse(JSON.parse(storage).profile);

    const [showConsultant, setShowConsultant] = useState(false);

    const handleEditProfileClick = () => {
        setShowConsultant(!showConsultant);
    };
    const [address, setAddress] = useState('');
    const [changed, setChanged] = useState(false);
    const [imageid, setImageid] = useState('');

    const [image, setImage] = useState(null); // Initialize with the default profile picture URL
    const fileInputRef = useRef(null); // Ref for file input

    var today = new Date();
    var birth = new Date(user.dateOfBirth);
    var age = today.getFullYear() - birth.getFullYear();

    //*********** send receive data *****************/

    const [messageAdrss, setMessageAdrss] = useState(address);
    const [uploadedImage, setUploadedImage] = useState('');

    const handleImageChange = () => {
        fileInputRef.current.click(); // Programmatically trigger file selection
    };

    const handleFileInputChange = (e) => {
        if (e.target.files[0]) {
            const imageFile = e.target.files[0];
            setImage(imageFile);

            console.log('open image for the first time **************', imageFile);
        }
    };

    useEffect(() => {
        const handleImageUpload = async () => {
            // e.preventDefault();
            try {
                if (image) {
                    // Handle file upload
                    console.log('image from upload function ', image);
                    const formData = new FormData();
                    formData.append('file', image);
                    formData.append('nameFolder', 'consultantImages');
                    const response = await documentService.addImage(formData);
                    console.log('image id ***', response.data);
                    setImageid(response.data);
                    const imid = response.data;
                    const resp = await consultantService.addImageId(user.id, imid, null);
                    console.log('*******////resp//////****', resp);
                    console.log('*******//////////****');
                    window.location.reload();
                }
            } catch (error) {
                console.log(error);
            }
        };

        if (image) {
            handleImageUpload();
        }

        console.log('Image value:', image);
    }, [image, user]);

    //*********** send receive data *****************/

    useEffect(() => {
        const getUserById = async () => {
            try {
                console.log('username', email);

                console.log('profile', profil);
                console.log('userid', userId);

                const response = await consultantService.getConsultantByUserId(userId);
                setUser(response.data);
                console.log('**********start****', response.data.imageId);
                const resptype = {
                    responseType: 'arraybuffer', // Set the responseType to 'arraybuffer'
                };
                const resp = await documentService.getFileByDocId(
                    response.data.imageId,
                    resptype,
                );

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
                <div className="card-body text-center">
                    <div className="profile_img p-4 text-center">
                        <label htmlFor="fileInput" style={{ cursor: 'pointer' }}>
                            <button
                                type="button"
                                className="profile-image-button"
                                onClick={handleImageChange}
                                onKeyDown={handleImageChange}
                                style={{
                                    border: 'none',
                                    background: 'none',
                                    padding: 0,
                                    margin: 0,
                                }}
                            >
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
                            </button>
                        </label>

                        <input
                            type="file"
                            id="fileInput"
                            accept="image/*"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleFileInputChange}
                        />

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

                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            {showConsultant ? (
                                <button
                                    type="button"
                                    color="default"
                                    className="w-40  "
                                    onClick={handleEditProfileClick}
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
                                        marginLeft: '-10px', // Adjust the value to move the button to the left
                                        transform: 'translateX(-50%)',
                                        top: '330px',
                                        background: 'white',
                                        border: '2px solid red',
                                        boxShadow:
                                            '1px 1px 8px rgba(0, 0, 0, 0.3), inset 0px 1px 0px rgba(255, 255, 255, 0.08)',
                                        borderRadius: '5px',
                                    }}
                                >
                                    Annuler
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    color="default"
                                    className="w-40"
                                    onClick={handleEditProfileClick}
                                    style={{
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
                                        background: '#D8D83D',
                                        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                                        borderRadius: '5px',
                                    }}
                                >
                                    <BiEditAlt size={25} />
                                    Modifier
                                </button>
                            )}
                        </div>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginBottom: '2rem',
                        }}
                    >
                        {showConsultant && <Consultant />}
                    </div>
                </div>
            </div>
            {!showConsultant && (
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
                        <p className="text-gray-600">{email}</p>
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
            )}
        </div>

        //         </div>
        //     )}
        // </section>
    );
};

export default withAuth(ProfileView);
