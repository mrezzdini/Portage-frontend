import './Education.css';

import { ListBulletIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { createCertificat } from '../../../actions/CertificatActions';
import { createEducation } from '../../../actions/EducationActions';
import { createExperience } from '../../../actions/ExperienceActions';
import { createSkill } from '../../../actions/SkillActions';
import Button from '../../../components/lib/form/Button';
import useConfirm from '../../../hooks/useConfirm';
import withAuth from './../../../common/withAuth';

const Recapulatif = () => {
    const dispatch = useDispatch();
    const { certificats } = useSelector((state) => state.certificats);
    const { skills } = useSelector((state) => state.skills);
    const { educations } = useSelector((state) => state.educations);
    const { experiences } = useSelector((state) => state.experiences);
    const { id } = useParams();
    const filteredCertificatss = certificats?.filter((certificat) =>
        certificat?.cvs?.some((cv) => cv.id === parseInt(id)),
    );
    const filteredSkillss = skills?.filter((certificat) =>
        certificat?.cvs?.some((cv) => cv.id === parseInt(id)),
    );
    const filteredExperiencess = experiences?.filter((certificat) =>
        certificat?.cvs?.some((cv) => cv.id === parseInt(id)),
    );
    const filteredEducationss = educations?.filter((certificat) =>
        certificat?.cvs?.some((cv) => cv.id === parseInt(id)),
    );
    console.log(filteredCertificatss);
    const navigate = useNavigate();
    const confirm = useConfirm();
    const navigateToCV = async () => {
        const result = await confirm({
            title: 'Ajouter?',
            description: 'Confirmer l ajout?? ',
        });
        if (result) {
            try {
                navigate(`/app/ListCv`);
            } catch (error) {
                console.log(error);
            }
        }
    };
    const navigateToAddCV = async () => {
        navigate(`/app/cv/${id}`);
    };

    const handleDeleteSkillFromCv = async (skill) => {
        const newvalue = {
            id: skill.id,
            name: skill.name,
            type: skill.type,
            level: skill.level,
            consultantId: skill.consultantId,
            cvs: skill.cvs.filter((cv) => cv.id !== parseInt(id)),
        };
        dispatch(createSkill(newvalue));
    };
    const handleDeleteExperienceFromCv = async (experience) => {
        const newvalue = {
            id: experience.id,
            title: experience.title,
            description: experience.description,
            companyName: experience.companyName,
            startDate: experience.startDate,
            endDate: experience.endDate,
            consultantId: experience.consultantId,
            cvs: experience.cvs.filter((cv) => cv.id !== parseInt(id)),
        };
        dispatch(createExperience(newvalue));
    };

    const handleDeleteEducationFromCv = async (education) => {
        const newvalue = {
            id: education.id,
            title: education.title,
            description: education.description,
            school: education.school,
            startDate: education.startDate,
            endDate: education.endDate,
            consultantId: education.consultantId,
            cvs: education.cvs.filter((cv) => cv.id !== parseInt(id)),
        };
        dispatch(createEducation(newvalue));
    };
    const handleDeleteCertificationFromCv = async (certificat) => {
        const newvalue = {
            id: certificat.id,
            title: certificat.title,
            emplacement: certificat.emplacement,
            dateIssuing: certificat.dateIssuing,
            idDoc: certificat.idDoc,
            consultantId: certificat.consultantId,
            cvs: certificat.cvs.filter((cv) => cv.id !== parseInt(id)),
        };
        dispatch(createCertificat(newvalue));
    };
    return (
        <div>
            <h6 className="mb-10 flex justify-center">
                Récapitulatif des éléments choisis pour votre CV
            </h6>

            <div className="education-card-0 flex flex-row">
                <div className="flex flex-col">
                    <h6>Expérience professionnelle </h6>
                    <div className="education-card2">
                        {filteredExperiencess?.map((certificat) => (
                            // eslint-disable-next-line react/jsx-key

                            <div className="education-card3" key={certificat.id}>
                                <h6>{certificat.title}</h6>
                                <button
                                    className="xButton"
                                    onClick={() =>
                                        handleDeleteExperienceFromCv(certificat)
                                    }
                                >
                                    <XMarkIcon
                                        style={{
                                            width: '30px',
                                            height: '30px',
                                            fontSize: '80px',
                                            color: '#FFFFFF',
                                        }}
                                    />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col">
                    <h6>Formations</h6>
                    <div className="education-card2">
                        {filteredEducationss?.map((certificat) => (
                            // eslint-disable-next-line react/jsx-key

                            <div className="education-card3" key={certificat.id}>
                                <h6>{certificat.title}</h6>
                                <button
                                    className="xButton"
                                    onClick={() =>
                                        handleDeleteEducationFromCv(certificat)
                                    }
                                >
                                    <XMarkIcon
                                        style={{
                                            width: '30px',
                                            height: '30px',
                                            fontSize: '80px',
                                            color: '#FFFFFF',
                                        }}
                                    />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col">
                    <h6>Certifications</h6>
                    <div className="education-card2">
                        {filteredCertificatss?.map((certificat) => (
                            // eslint-disable-next-line react/jsx-key

                            <div className="education-card3" key={certificat.id}>
                                <h6>{certificat.title}</h6>

                                <button
                                    className="xButton"
                                    onClick={() =>
                                        handleDeleteCertificationFromCv(certificat)
                                    }
                                >
                                    <XMarkIcon
                                        style={{
                                            width: '30px',
                                            height: '30px',
                                            fontSize: '80px',
                                            color: '#FFFFFF',
                                        }}
                                    />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col">
                    <h6>Compétences</h6>
                    <div className="education-card2">
                        {filteredSkillss?.map((certificat) => (
                            // eslint-disable-next-line react/jsx-key

                            <div className="education-card3" key={certificat.id}>
                                <h6>{certificat.name}</h6>
                                <button
                                    className="xButton"
                                    onClick={() => handleDeleteSkillFromCv(certificat)}
                                >
                                    <XMarkIcon
                                        style={{
                                            width: '30px',
                                            height: '30px',
                                            fontSize: '80px',
                                            color: '#FFFFFF',
                                        }}
                                    />
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 flex flex-row items-end">
                        <Button
                            type="button"
                            color="default"
                            style={{
                                width: '150px',
                                height: '45px',
                                borderRadius: '15px',
                                fontFamily: 'Roboto',
                                fontStyle: 'normal',
                                fontWeight: 400,
                                fontSize: '16px',
                                lineHeight: '19px',
                                display: 'flex',
                                marginRight: '2px',
                                color: '#6B6D7C',
                            }}
                            onClick={() => navigateToAddCV()}
                        >
                            Annuler{' '}
                        </Button>
                        <Button
                            type="button"
                            color="default"
                            style={{
                                width: '150px',
                                height: '45px',
                                backgroundColor: '#D8D83D',
                                borderRadius: '15px',
                                fontFamily: 'Roboto',
                                fontStyle: 'normal',
                                fontWeight: 400,
                                fontSize: '16px',
                                lineHeight: '19px',
                                display: 'flex',
                                marginRight: '2px',
                                color: '#6B6D7C',
                            }}
                            onClick={() => navigateToCV()}
                        >
                            Génerer CV{' '}
                            <ListBulletIcon
                                style={{
                                    marginLeft: '20px',
                                    width: '24px',
                                    height: '19.5px',
                                }}
                            />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default withAuth(Recapulatif);
