import { useState,useEffect } from 'react';
import withAuth from '../../../common/withAuth';
import offerService from '../../../services/offerService';
import OfferDetailsStyle from './OfferDetailsStyle.css';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { useNavigate,useParams } from 'react-router-dom';
import Modal from '../../../components/lib/container/Modal';
import cvService from '../../../services/cvService';
import consultantService from '../../../services/consultantService';
import Button from '../../../components/lib/form/Button';
import { toast } from 'react-toastify';


const AppView = () => {
  const { id } = useParams();
  const [offer,setoffer]=useState([])


    const navigate = useNavigate();
    const handleviewOfferList = () => {
      console.log("id",id);
        navigate(`/app/offerList/`);

    };
    useEffect(() => {

    const fetchofferbyid =async(id) => {
      try {
        const resp = await offerService.getOfferById(id);
        setoffer(resp.data);

  } catch (error) {
    console.log(error);
}}
fetchofferbyid(id);
}, []);


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
const [cvListByTitle,setcvListByTitle] = useState([])
const [selectedCVId, setSelectedCVId] = useState('');
const [openModal,setOpenModal]=useState(false)

const handlePost= async(offer)=>{
  setOffer1(offer);
  setSelectedCVId(''); // Reset the selected CV ID
  setOpenModal(true);
}
    return (
        <div    >
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
           <h1 className='title' style={{ marginleft: '50px' }}>Détails de l'offre</h1>
           <h1 className='title' >recherche</h1>
        </div>
        <div className='container'>
        <div className='container2'>
            <div className='descriptiondiv'>
            <div className="imageDiv"></div>
            <div className="textDiv">
       
          <div className="postename">{offer.name}</div>
          <div className="ville">{offer.location},{offer.mode}</div>
          <div className="ville">entreprise</div>

          <div className="DescriptionOffer">{offer.description} </div>
          <div className="DescriptionOffer">
          {offer.responsibilities && Array.isArray(offer.responsibilities) && (

             <ul>
    {offer.responsibilities.map((responsibility, index) => (
      <li key={index}>• {responsibility}</li>    ))}
  </ul>)}
    {/* {offer.responsibilities.map((responsibility, index) => (
      <div key={index} className="responsibility">{responsibility}</div>
    ))} */}
  </div>

        
        </div>
            </div>
            
            <div className='postuldiv'>
    <div className='top-section'>
    <div className='icon' onClick={()=>handleviewOfferList()}><IoIosCloseCircleOutline /></div>
      <p className='date'>          publié le {new Date(offer.creationDate).toLocaleDateString()}
</p>
    </div>
    <div className='bottom-section'>
      <button className='postuler-button' onClick={()=>handlePost(offer)}>Postuler</button>
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
            return;
          }
        const updatedOffer = {
          ...offer1,
          cvs: [...offer1.cvs, { id: selectedCVId }], // Add the selected CV's ID to the existing cvs array
        };
        console.log("selectedcvid",selectedCVId);

        console.log("updatedOffer",updatedOffer);
        console.log("offer1.id",offer1.id);



        try {
            const response = await offerService.updateOffer(updatedOffer,offer1.id)
            console.log("responseof updateoffer",response);
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
           
            console.log(error)}

    }}
  >
        Postuler
    </Button>
    <Button className="annulerButton" onClick={()=> setOpenModal(false)}>Annuler</Button>
</div>
      </Modal>



            </div>
            </div> 
        </div>



       
        
    );
};

export default withAuth(AppView);