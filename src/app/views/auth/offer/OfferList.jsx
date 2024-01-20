/* eslint-disable react/jsx-key */

import React, { useEffect, useState  } from 'react';
import { useNavigate } from 'react-router-dom';
import  moment from 'moment'; // Update the import statement
import withAuth from './../../../common/withAuth';
import {
    EyeIcon,
} from '@heroicons/react/24/outline';
import Button from '../../../components/lib/form/Button';
import OfferListStyle from './OfferListStyle.css';
import Modal from '../../../components/lib/container/Modal';
import { useDispatch,useSelector } from 'react-redux';
import { getOffersAction } from '../../../actions/offersActions';
import cvService from '../../../services/cvService';
import consultantService from '../../../services/consultantService';
import offerService from '../../../services/offerService';
import { toast } from 'react-toastify';

const OfferList = () => {
   
    return(
        <div>
     <div className="flex min-h-screen flex-col ">   
      <h3>Liste d'offres</h3>
      <OfferListbody/>
</div>
     </div>
     );
};
export default withAuth(OfferList);

const OfferListbody  = () => {
    const dispatch = useDispatch();
    const {offers}= useSelector((state)=>state.offers);
    console.log("offers voila",offers);
    useEffect(()=> {
        dispatch(getOffersAction());
    },[dispatch]);
    const [openModal,setOpenModal]=useState(false)
    const navigate = useNavigate();
    const handleviewDetailsOffer = (id) => {
        navigate(`/app/detailsOffre/${id}`);
    };
    const [cvListByTitle,setcvListByTitle] = useState([])
    const calculateDuration = (datecreation) => {
        const currentDate = moment();
        const creationDate = moment(datecreation);
        const duration = currentDate.diff(creationDate, 'days'); // Change 'days' to 'weeks' or 'months' for different duration units
        return duration;
      };
      const [offer1,setOffer1]=useState({})
      const storage = localStorage.getItem('persist:auth');
     let userId;
    if (storage) userId = JSON.parse(JSON.parse(storage).userId);
    console.log(userId)
    useEffect(() => {
      const fetchAllCV= async () => {
        try {
      const response = await consultantService.getConsultantByUserId(userId);

      const resp= await cvService.getAllCvByConsultant(response.data.id)
      setcvListByTitle(resp.data)
        }catch(error){
            console.log(error)
        }
    }
    fetchAllCV();
}, [userId]);

    const [selectedCVId, setSelectedCVId] = useState('');

     const handlePost= async(offer)=>{
        setOffer1(offer);
        setSelectedCVId(''); // Reset the selected CV ID
        setOpenModal(true);
     }
    return( 
        <div
        className="box-border"  >
{
        offers.map((offer) => (
         
        <div className="containerWithElevation flex mt-2" key={offer.id}> 
        
        <div className="customDiv">
                
                <Button
            className="btn btn-transparent flex h-10 w-12 items-center justify-center rounded-full viewButton"
            onClick={() => handleviewDetailsOffer(offer.id)} >
                 <EyeIcon className='viewButtonIcon' />
        </Button>
        <div className="customDivContent  "   >
        <div className="postetitre">{offer.name}</div>
        
        <div className="locationmode">{offer.location},{offer.mode} </div>

        <div className="description">{offer.description} </div>

        </div>       
            </div>
            <div className="v-banner__actions">
            <div className="publicationDate">il y'a {calculateDuration(offer.creationDate)} jours</div>

            <div class="numberOfCandidates">Candidatures reçues {offer.cvs.length}</div>
        
            <div className="btn btn-transparent flex items-center justify-center postulerButton "
         onClick={()=>handlePost(offer)} >Postuler
        </div>
        </div>

<Modal 
     isOpen={openModal} close={() => setOpenModal(false)}  >

<div className='framemodal'>
<div className='modaltitle'>Envoyez votre candidature</div >
     <p className="postetitre">Poste</p>
     <p className="title" ><u>{offer1.name}</u></p>
      <p className="postetitre">Offre Numéro</p>
      <p className="title flex mb-8">{offer1.id}</p>
     </div>

     <div class="modal-buttons">
     <select
  className="modal-button"
  value={selectedCVId}
  onChange={(e) => setSelectedCVId(e.target.value)}
>
  <option value="">Sélectionner un CV</option>
  {cvListByTitle.map((cv) => (
    <option key={cv.id} value={cv.id}>
      {cv.title}
    </option>
  ))}
</select>

    <button class="modal-button">Choisir Doc</button>
  </div>

     {/* </div> */}

    

<div className="button-row">
    <Button className="validerbuttonModal"
     onClick={async() => {
        // Perform the offer update action with the selected CV ID
        if (!selectedCVId) {
            console.log('No CV selected');
            
            toast.warning('sélectionner un CV', {
                position: toast.POSITION.TOP_CENTER,
                style: { top: '100px', transform: 'translateY(-50%)' },
            });
            return;
          }
        const updatedOffer = {
          ...offer1,
          cvs: [...offer1.cvs, { id: selectedCVId }], // Add the selected CV's ID to the existing cvs array
        };
      



        try {
            const response = await offerService.updateOffer(updatedOffer,offer1.id)
            if (response.status === 200) {
                toast.success('candidature envoyé avec succés', {
                    position: toast.POSITION.TOP_CENTER,
                    style: {
                        top: '100px',
                        transform: 'translateY(-50%)',
                        width: '400px',
                        height: '130px',
                        borderRadius: '15px',
                        alignContent: 'center',
                        textAlign: 'center',
                    },
                });
            }
            else {
              toast.warning('candidature déjà envoyé', {
                position: toast.POSITION.TOP_CENTER,
                style: { top: '100px', transform: 'translateY(-50%)' },
            });
            }
      
            setOpenModal(false); // Close the modal after the update
          } catch (error) {
            // Handle the error
            console.log(error)}
    }}
  >
        Postuler
    </Button>
    <Button className="annulerButton" onClick={()=> setOpenModal(false)}>Annuler</Button>
</div>
      </Modal>
     

        </div>
       

    )) }</div>
    
    
    
    )};

