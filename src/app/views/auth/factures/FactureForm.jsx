import { CheckIcon, PlusIcon } from '@heroicons/react/24/outline';
import { AltRoute } from '@mui/icons-material';
import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { createFacture } from '../../../actions/FactureActions';
import Input from '../../../components/lib/form/Input';

const FactureForm = () => {
    const dispatch = useDispatch();

    const dateCourante = new Date();
    const annee = dateCourante.getFullYear();
    const mois = String(dateCourante.getMonth() + 1).padStart(2, '0');
    const jour = String(dateCourante.getDate()).padStart(2, '0');
    const heure = String(dateCourante.getHours()).padStart(2, '0');
    const minutes = String(dateCourante.getMinutes()).padStart(2, '0');
    const secondes = String(dateCourante.getSeconds()).padStart(2, '0');
    const dateFormatee = `${annee}-${mois}-${jour}T${heure}:${minutes}:${secondes}.000+00:00`;

    const [dueDate, setDueDate] = useState('');
    const [calculationDate, setCalculationDate] = useState('');
    const [descriptionType, setDescriptionType] = useState('');
    const [invoiceName, setInvoiceName] = useState('');
    const handleSubmit = async () => {
        const validationSchema = Yup.object().shape({
            invoiceLines: Yup.array()
                .of(
                    Yup.object().shape({
                        description: Yup.string()
                            .required('Le champ description est obligatoire')
                            .nullable(),
                        quantity: Yup.string()
                            .required('Le champ quantite est obligatoire')
                            .nullable(),
                        unitPrice: Yup.string()
                            .required('Le champ prix unitaire est obligatoire')
                            .nullable(),
                        tva: Yup.string()
                            .required('Le champ taux tva est obligatoire')
                            .nullable(),
                        // Add more validation rules for other properties of each item in the invoiceLines array
                    }),
                )
                .required('Le champ invoiceLines est obligatoire')
                .nullable(),
            dueDate: Yup.string().required('Le champ dueDate est obligatoire').nullable(),
        });

        setCalculationDate(dateFormatee);
        setInvoiceName('FAC_' + consultantName + '_' + calculationDate);
        console.log(calculationDate);
        const facture = {
            invoiceName,
            consultantContact,
            consultantName,
            consultantAddress,
            invoiceLines,
            clientName,
            clientContact,
            clientAddress,
            calculationDate,
            dueDate,
            totalTTC,
        };

        try {
            await validationSchema.validate(facture, { abortEarly: false });
            dispatch(createFacture(facture));
            navigateTo(`/app/facture`);
        } catch (error) {
            // Handle validation errors
            alert('Remplir tous les champs du facture');
            // Optionally, you can display the validation errors to the user
        }
    };

    const [invoiceLines, setInvoiceLines] = useState([
        {
            description: '',
            descriptionType,
            quantity: '',
            unitPrice: '',
            tva: '',
            totalItemHT: '',
        },
    ]);
    const consultantName = 'Jalel Barhoumi';
    const consultantContact = '5621536598';
    const consultantAddress = '75002 Paris';

    const clientName = 'insy2s';
    const clientContact = 'insy2s';
    const clientAddress = '75002 Paris';
    const calculateTotal = () => {
        let totalHT = 0;
        let totalTTC = 0;

        invoiceLines.forEach((invoice) => {
            const montantHT = invoice.quantity * invoice.unitPrice;
            const montantTVA = montantHT * (invoice.tva / 100);
            const montantTTC = montantHT + montantTVA;

            totalHT += montantHT;
            totalTTC += montantTTC;
        });

        return { totalHT, totalTTC };
    };

    const { totalHT, totalTTC } = calculateTotal();

    // const handleTotalTTCChange = (event, index) => {
    //     const newInvoiceLines = [...invoiceLines];
    //     newInvoiceLines[index].totalItemTTC = event.target.value;
    //     setTotalTTC(totalTTC + parseFloat(event.target.value));
    //     setInvoiceLines(newInvoiceLines);
    // };

    const handleDueDateChange = (e) => {
        setDueDate(e.target.value);
    };
    function handleDescriptionTypeChange(event, index) {
        const { value } = event.target;
        // Mettre à jour la valeur de descriptionType dans l'objet invoiceLines
        const updatedInvoiceLines = [...invoiceLines];
        updatedInvoiceLines[index].descriptionType = value;
        setInvoiceLines(updatedInvoiceLines);
    }

    function handleDescriptionPrestationChange(event, index) {
        const { value } = event.target;
        // Mettre à jour la valeur de description dans l'objet invoiceLines
        const updatedInvoiceLines = [...invoiceLines];
        updatedInvoiceLines[index].description = value;
        setInvoiceLines(updatedInvoiceLines);
    }

    function handleDescriptionChange(event, index) {
        const { value } = event.target;
        // Mettre à jour la valeur de description dans l'objet invoiceLines
        const updatedInvoiceLines = [...invoiceLines];
        updatedInvoiceLines[index].description = value;
        setInvoiceLines(updatedInvoiceLines);
    }
    const navigateTo = useNavigate();

    function handleQuantityChange(event, index) {
        const { value } = event.target;
        // Mettre à jour la valeur de quantity dans l'objet invoiceLines
        const updatedInvoiceLines = [...invoiceLines];
        updatedInvoiceLines[index].quantity = value;
        setInvoiceLines(updatedInvoiceLines);
    }

    function handleBack() {
        navigateTo('/app/facture');
    }
    function handleUnitPriceChange(event, index) {
        const { value } = event.target;
        // Mettre à jour la valeur de unitPrice dans l'objet invoiceLines
        const updatedInvoiceLines = [...invoiceLines];
        updatedInvoiceLines[index].unitPrice = value;
        setInvoiceLines(updatedInvoiceLines);
    }

    function handleTvaChange(event, index) {
        const { value } = event.target;
        // Mettre à jour la valeur de tva dans l'objet invoiceLines
        const updatedInvoiceLines = [...invoiceLines];
        updatedInvoiceLines[index].tva = value;
        setInvoiceLines(updatedInvoiceLines);
    }

    const addInvoiceLine = () => {
        setInvoiceLines([
            ...invoiceLines,
            { description: '', quantity: 0, unitPrice: 0, tva: 0, totalItemHT: 0 },
        ]);
    };
    // const [lineStatus, setLineStatus] = useState([]);

    // const handleValidLine = (line, index) => {
    //     console.log(line);
    //     if (
    //         line.quantity != '' &&
    //         line.unitPrice != '' &&
    //         line.description != '' &&
    //         line.tva != ''
    //     ) {
    //         // Créez une copie du tableau d'état actuel
    //         const updatedLineStatus = [...lineStatus];
    //         // Mettez à jour l'état de validation de la ligne spécifiée par l'index
    //         updatedLineStatus[index] = true;
    //         // Mettez à jour le tableau d'état avec la nouvelle valeur
    //         setLineStatus(updatedLineStatus);

    //         // Mettez à jour les montants totaux

    //         invoiceLines.forEach((line, lineIndex) => {
    //             // Calculer le montant TTC de la ligne
    //             const lineTotalTTC =
    //                 line.quantity * line.unitPrice +
    //                 (line.quantity * line.unitPrice * line.tva) / 100;

    //             // Calculer le montant HT de la ligne
    //             const lineTotalHT = line.quantity * line.unitPrice;

    //             // Ajouter le montant de la ligne aux totaux TTC et HT
    //             totalTTC += lineTotalTTC;
    //             totalHT += lineTotalHT;
    //         });
    //     } else {
    //         toast.warning('Veuillez remplir tous les champs de la ligne de facture !!', {
    //             position: toast.POSITION.TOP_CENTER, // Set the position to top center
    //             style: {
    //                 top: '100px',
    //                 transform: 'translateY(-50%)',
    //                 width: '400px',
    //                 height: '130px',
    //                 borderRadius: '15px',
    //                 alignContent: 'center',
    //                 textAlign: 'center',
    //             },
    //         });
    //     }
    // };
    return (
        <Formik
            initialValues={{
                description: '',
                quantity: '',
                unitPrice: '',
                tva: '',
            }}
        >
            <Form>
                <div>
                    <h5
                        style={{
                            textAlign: 'center',
                            color: '#D8D83D',
                            fontWeight: 'bold',
                        }}
                    >
                        {' '}
                        Créer une facture{' '}
                    </h5>
                    <br></br>
                    <div style={{ width: '300px' }}>
                        <div style={{ display: 'flex' }}>
                            <br></br>
                            <div
                                style={{
                                    display: 'flex',
                                    width: '500px',
                                    borderRadius: '15px',
                                }}
                            >
                                <div
                                    style={{
                                        backgroundColor: 'rgba(255, 255, 255, 0.5)',
                                        width: '550px',
                                        height: '110px',
                                        borderRadius: '15px',
                                        justifyContent: 'flex-start',
                                        top: '50px',
                                    }}
                                >
                                    <br></br>
                                    <div style={{ display: 'flex' }}>
                                        <label
                                            style={{
                                                fontSize: '15px',
                                                marginLeft: '20px',
                                            }}
                                        >
                                            {' '}
                                            Nom du consultant{' '}
                                        </label>
                                        <label
                                            style={{
                                                fontWeight: 'bold',
                                                fontSize: '15px',
                                                marginLeft: '20px',
                                            }}
                                        >
                                            {consultantName}
                                        </label>
                                    </div>
                                    <div style={{ display: 'flex' }}>
                                        <label
                                            style={{
                                                fontSize: '15px',
                                                marginLeft: '20px',
                                            }}
                                        >
                                            {' '}
                                            Contact du consultant{' '}
                                        </label>

                                        <label
                                            style={{
                                                fontWeight: 'bold',
                                                fontSize: '15px',
                                                marginLeft: '20px',
                                            }}
                                        >
                                            {consultantContact}
                                        </label>
                                    </div>
                                    <div style={{ display: 'flex' }}>
                                        <label
                                            style={{
                                                fontSize: '15px',
                                                marginLeft: '20px',
                                            }}
                                        >
                                            {' '}
                                            Adresse du consultant{' '}
                                        </label>

                                        <label
                                            style={{
                                                fontWeight: 'bold',
                                                fontSize: '15px',
                                                marginLeft: '20px',
                                            }}
                                        >
                                            {consultantAddress}
                                        </label>
                                    </div>
                                    <br></br>
                                </div>
                            </div>

                            <div
                                style={{
                                    display: 'flex',
                                    width: '500px',
                                    borderRadius: '15px',
                                    marginLeft: '100px',
                                }}
                            >
                                <div
                                    style={{
                                        backgroundColor: 'rgba(255, 255, 255, 0.5)',
                                        width: '550px',
                                        height: '110px',
                                        borderRadius: '15px',
                                        justifyContent: 'flex-start',
                                    }}
                                >
                                    {' '}
                                    <br></br>
                                    <div style={{ display: 'flex' }}>
                                        <label
                                            style={{
                                                fontSize: '15px',
                                                marginLeft: '20px',
                                            }}
                                        >
                                            {' '}
                                            Nom du client{' '}
                                        </label>
                                        <label
                                            style={{
                                                fontWeight: 'bold',
                                                fontSize: '15px',
                                                marginLeft: '20px',
                                            }}
                                        >
                                            {clientName}
                                        </label>
                                    </div>
                                    <div style={{ display: 'flex' }}>
                                        <label
                                            style={{
                                                fontSize: '15px',
                                                marginLeft: '20px',
                                            }}
                                        >
                                            {' '}
                                            Contact du client{' '}
                                        </label>
                                        <label
                                            style={{
                                                width: '100px',
                                                fontWeight: 'bold',
                                                fontSize: '15px',
                                                marginLeft: '20px',
                                            }}
                                        >
                                            {clientName}
                                        </label>
                                    </div>
                                    <div style={{ display: 'flex' }}>
                                        <label
                                            style={{
                                                fontSize: '15px',
                                                marginLeft: '20px',
                                            }}
                                        >
                                            {' '}
                                            Adresse du client{' '}
                                        </label>

                                        <label
                                            style={{
                                                fontWeight: 'bold',
                                                fontSize: '15px',
                                                marginLeft: '20px',
                                            }}
                                        >
                                            {clientAddress}
                                        </label>
                                    </div>
                                    <br></br>
                                </div>
                            </div>
                        </div>
                        <br></br>
                        <div
                            style={{
                                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                                width: '490px',
                                height: '110px',
                                borderRadius: '15px',
                                justifyContent: 'flex-start',
                            }}
                        >
                            <br></br>
                            <br></br>

                            <div style={{ display: 'flex' }}>
                                <label
                                    style={{
                                        fontWeight: 'bold',
                                        fontSize: '15px',
                                        marginLeft: '20px',
                                        width: '200px',
                                    }}
                                >
                                    {' '}
                                    Date d'exigibilité{' '}
                                </label>{' '}
                                <Field
                                    type="date"
                                    style={{
                                        width: '200px',

                                        background: '#FFFFFF',
                                        marginLeft: '30px',
                                        boxShadow:
                                            '1px 1px 6px rgba(126, 126, 126, 0.15)',
                                        borderRadius: '10px',
                                    }}
                                    name="dueDate"
                                    component={Input}
                                    value={dueDate}
                                    onChange={(e) => handleDueDateChange(e)}
                                />
                            </div>
                        </div>
                        <br></br>

                        <div style={{ display: 'flex' }}>
                            <button onClick={addInvoiceLine}>
                                <PlusIcon
                                    style={{
                                        color: '#D8D83D',
                                        width: '30px',
                                        top: '10px',
                                        height: '40px',
                                        borderRadius: '15px',
                                    }}
                                />
                            </button>
                            <table
                                className="invoice-table"
                                style={{
                                    borderCollapse: 'collapse',
                                }}
                            >
                                <thead>
                                    <tr>
                                        <th
                                            style={{
                                                border: '1px solid #ddd',
                                                backgroundColor: '#DBDCE3',
                                            }}
                                        >
                                            Type Désignation
                                        </th>
                                        <th style={{ border: '1px solid #ddd' }}>
                                            Désignation
                                        </th>
                                        <th
                                            style={{
                                                border: '1px solid #ddd',
                                                backgroundColor: '#DBDCE3',
                                            }}
                                        >
                                            Quantite
                                        </th>
                                        <th
                                            style={{
                                                border: '1px solid #ddd',
                                            }}
                                        >
                                            Prix unitaire
                                        </th>
                                        <th
                                            style={{
                                                border: '1px solid #ddd',
                                                backgroundColor: '#DBDCE3',
                                            }}
                                        >
                                            Taux TVA
                                        </th>
                                        <th style={{ border: '1px solid #ddd' }}>
                                            MontantHT
                                        </th>
                                        <th
                                            style={{
                                                border: '1px solid #ddd',
                                                backgroundColor: '#DBDCE3',
                                            }}
                                        >
                                            Montant tva{' '}
                                        </th>
                                        <th
                                            style={{
                                                border: '1px solid #ddd',
                                            }}
                                        >
                                            MontantTTC
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {invoiceLines.map((line, index) => (
                                        <tr key={index}>
                                            <td
                                                style={{
                                                    background: '#FFFFFF',
                                                    backgroundColor: '#DBDCE3',
                                                }}
                                            >
                                                <Field
                                                    style={{
                                                        background: '#FFFFFF',
                                                        boxShadow:
                                                            '1px 1px 6px rgba(126, 126, 126, 0.15)',
                                                        borderRadius: '10px',
                                                        width: '170px',
                                                    }}
                                                    name={`descriptionType-${index}`}
                                                    component="select"
                                                    value={line.descriptionType}
                                                    onChange={(e) =>
                                                        handleDescriptionTypeChange(
                                                            e,
                                                            index,
                                                        )
                                                    }
                                                >
                                                    <option value="">
                                                        Choisir un type
                                                    </option>
                                                    <option value="prestation">
                                                        Prestation
                                                    </option>
                                                    <option value="autre">Autre</option>
                                                </Field>
                                            </td>
                                            <td>
                                                {line.descriptionType === 'prestation' ? (
                                                    <Field
                                                        style={{
                                                            background: '#FFFFFF',
                                                            boxShadow:
                                                                '1px 1px 6px rgba(126, 126, 126, 0.15)',
                                                            borderRadius: '10px',
                                                            border: '1px solid #ddd',
                                                            padding: '8px',
                                                            width: '200px',
                                                        }}
                                                        name={`description-${index}`}
                                                        component="select"
                                                        value={line.description}
                                                        onChange={(e) =>
                                                            handleDescriptionPrestationChange(
                                                                e,
                                                                index,
                                                            )
                                                        }
                                                    >
                                                        <option value="">
                                                            Sélectionnez prestation
                                                        </option>
                                                        <option value=" Developpement du upcofree">
                                                            Developpement du upcofree
                                                        </option>
                                                        <option value="Conception du upcofree">
                                                            Conception du upcofree{' '}
                                                        </option>
                                                        <option value="Deployement du upcofree">
                                                            Deployement du upcofree{' '}
                                                        </option>
                                                    </Field>
                                                ) : (
                                                    <Field
                                                        style={{
                                                            background: '#FFFFFF',
                                                            boxShadow:
                                                                '1px 1px 6px rgba(126, 126, 126, 0.15)',
                                                            borderRadius: '10px',
                                                            border: '1px solid #ddd',
                                                            padding: '8px',
                                                        }}
                                                        type="text"
                                                        name={`description-${index}`}
                                                        value={line.description}
                                                        onChange={(e) =>
                                                            handleDescriptionChange(
                                                                e,
                                                                index,
                                                            )
                                                        }
                                                    />
                                                )}
                                            </td>
                                            <td
                                                style={{
                                                    background: '#FFFFFF',
                                                    backgroundColor: '#DBDCE3',
                                                }}
                                            >
                                                <Field
                                                    style={{
                                                        background: '#FFFFFF',
                                                        boxShadow:
                                                            '1px 1px 6px rgba(126, 126, 126, 0.15)',
                                                        borderRadius: '10px',
                                                        border: '1px solid #ddd',
                                                        padding: '8px',
                                                        width: '100px',
                                                    }}
                                                    type="number"
                                                    name={`quantity-${index}`}
                                                    value={line.quantity}
                                                    onChange={(e) =>
                                                        handleQuantityChange(e, index)
                                                    }
                                                />
                                            </td>
                                            <td
                                                style={{
                                                    left: '10px',
                                                    top: '10px',
                                                    height: '45px',
                                                    background: '#FFFFFF',
                                                    borderRadius: '10px',
                                                    border: '1px solid #ddd',
                                                    padding: '8px',
                                                    width: '80px',
                                                }}
                                            >
                                                <Field
                                                    style={{
                                                        background: '#FFFFFF',
                                                        boxShadow:
                                                            '1px 1px 6px rgba(126, 126, 126, 0.15)',
                                                        borderRadius: '10px',
                                                        border: '1px solid #ddd',
                                                        padding: '8px',
                                                        width: '100px',
                                                    }}
                                                    type="number"
                                                    name={`unitPrice-${index}`}
                                                    value={line.unitPrice}
                                                    onChange={(e) =>
                                                        handleUnitPriceChange(e, index)
                                                    }
                                                />
                                            </td>
                                            <td
                                                style={{
                                                    background: '#FFFFFF',
                                                    backgroundColor: '#DBDCE3',
                                                }}
                                            >
                                                <Field
                                                    style={{
                                                        background: '#FFFFFF',
                                                        boxShadow:
                                                            '1px 1px 6px rgba(126, 126, 126, 0.15)',
                                                        borderRadius: '10px',
                                                        border: '1px solid #ddd',
                                                        padding: '8px',
                                                        width: '100px',
                                                    }}
                                                    type="number"
                                                    name={`tva-${index}`}
                                                    value={line.tva}
                                                    onChange={(e) =>
                                                        handleTvaChange(e, index)
                                                    }
                                                />
                                            </td>
                                            <td
                                                style={{
                                                    background: '#FFFFFF',
                                                    borderRadius: '10px',
                                                    border: '1px solid #ddd',
                                                }}
                                            >
                                                <Field
                                                    style={{
                                                        background: '#FFFFFF',
                                                        boxShadow:
                                                            '1px 1px 6px rgba(126, 126, 126, 0.15)',
                                                        borderRadius: '10px',
                                                        border: '1px solid #ddd',
                                                        padding: '8px',
                                                        width: '100px',
                                                    }}
                                                    type="number"
                                                    value={line.quantity * line.unitPrice}
                                                />
                                            </td>
                                            <td
                                                style={{
                                                    backgroundColor: '#DBDCE3',
                                                }}
                                            >
                                                <Field
                                                    style={{
                                                        background: '#FFFFFF',
                                                        boxShadow:
                                                            '1px 1px 6px rgba(126, 126, 126, 0.15)',
                                                        borderRadius: '10px',
                                                        border: '1px solid #ddd',
                                                        padding: '8px',
                                                        width: '100px',
                                                    }}
                                                    type="number"
                                                    value={
                                                        (line.tva / 100) *
                                                        (line.quantity * line.unitPrice)
                                                    }
                                                />
                                            </td>
                                            <td
                                                style={{
                                                    background: '#FFFFFF',
                                                }}
                                            >
                                                <Field
                                                    style={{
                                                        background: '#FFFFFF',
                                                        boxShadow:
                                                            '1px 1px 6px rgba(126, 126, 126, 0.15)',
                                                        borderRadius: '10px',
                                                        border: '1px solid #ddd',
                                                        padding: '8px',
                                                        width: '100px',
                                                    }}
                                                    type="number"
                                                    value={
                                                        (line.quantity *
                                                            line.unitPrice *
                                                            line.tva) /
                                                            100 +
                                                        line.quantity * line.unitPrice
                                                    }
                                                />
                                            </td>
                                            {/* 
                                            <button
                                                onClick={() =>
                                                    handleValidLine(line, index)
                                                }
                                                style={{
                                                    color: lineStatus[index]
                                                        ? 'green'
                                                        : '#D8D83D',
                                                }}
                                            >
                                                <CheckIcon
                                                    style={{
                                                        width: '30px',
                                                        height: '40px',
                                                        borderRadius: '15px',
                                                    }}
                                                />
                                            </button> */}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <br></br>
                        <div style={{ margin: '0 auto', marginLeft: '800px' }}>
                            <h5 style={{ width: '600px' }}>Montant TT: {totalHT} €</h5>
                            <h5 style={{ width: '600px' }}>Montant TTC: {totalTTC} €</h5>

                            <br></br>
                        </div>
                    </div>
                </div>
                <button
                    type="submit"
                    style={{
                        float: 'right',
                        width: '180px',
                        backgroundColor: '#D8D83D',
                        height: '40px',
                        borderRadius: '15px',
                        margin: '0 auto',
                        fontWeight: 'bold',
                        color: '#6B6D7C',
                    }}
                    onClick={handleSubmit}
                >
                    Valider la facture
                </button>
                <button
                    type="submit"
                    style={{
                        float: 'left',
                        width: '180px',
                        backgroundColor: '#D8D83D',
                        height: '40px',
                        borderRadius: '15px',
                        margin: '0 auto',
                        fontWeight: 'bold',
                        color: '#6B6D7C',
                    }}
                    onClick={handleBack}
                >
                    Revenir{' '}
                </button>
            </Form>
        </Formik>
    );
};
export default FactureForm;
