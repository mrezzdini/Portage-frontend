import html2pdf from 'html2pdf.js'
import React from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { deleteInvoice } from '../../../actions/FactureActions';
import logo1 from '../../../assets/images/logo1.png';

const DetailsFactures = () => {
    const dispatch = useDispatch();

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const invoiceParam = searchParams.get('invoice');
    const invoice = invoiceParam ? JSON.parse(decodeURIComponent(invoiceParam)) : null;

    console.log(invoice?.invoiceNumber);
    const navigateTo = useNavigate();

    function handleBack() {
        navigateTo('/app/facture');
    }

    const handleDownloadFacture = () => {
        const factureHTML = generateFactureHTML({ invoice }); // Utilisez votre propre fonction pour générer le contenu HTML de la facture
        const options = {
            filename: `${invoice.invoiceName}`,
            margin: 10,
            html2canvas: { scale: 2 },
            jsPDF: { format: 'a4', orientation: 'portrait' },
        };

        // Convertir le contenu HTML en PDF et le télécharger
        html2pdf().set(options).from(factureHTML).save();
    };
    const handleUpdateFacture = () => {
        const queryString = `invoice=${encodeURIComponent(JSON.stringify(invoice))}`;
        navigateTo(`/app/updateFacture?${queryString}`);

        console.log(invoice);
    };
    const handleDeleteFacture = () => {
        dispatch(deleteInvoice(invoice.id));
        navigateTo('/app/facture');
    };
    return (
        <div id="detailsFacture">
            <div
                style={{
                    width: '500px',
                    borderRadius: '15px',
                    justifyContent: 'space-between',
                    float: 'right',
                    marginRight: '60px',
                }}
            >
                <br />
                <br />
                <div
                    style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.5)',
                        width: '300px',
                        height: '450px',
                        justifyContent: 'center',
                        display: 'flex',
                        borderRadius: '15px',
                        justifyItems: 'center',
                        marginLeft: '260px',
                    }}
                >
                    <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
                        <br></br>

                        <p
                            style={{
                                borderRadius: '15px',

                                textAlign: 'center',
                                marginBottom: '20px',
                                width: '270px',
                                height: '50px',
                                marginLeft: '90px',
                                top: '30px',
                                fontWeight: 'bold',
                            }}
                        >
                            {invoice.consultantName}
                            <br></br>
                            <br></br>
                        </p>
                        <p
                            style={{
                                marginBottom: '20px',
                                marginLeft: '65px',
                                top: '30px',
                                fontWeight: 'bold',
                            }}
                        >
                            Montant HT : {invoice.totalHT}$<br></br> Montant TTC :{' '}
                            {invoice.totalTTC}$<br></br> Montant Tva : {invoice.totalTVA}
                            <br></br>{' '}
                        </p>
                        <li
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                marginBottom: '10px',
                                marginRight: '80px',
                            }}
                        >
                            <button
                                onClick={() => {
                                    handleDownloadFacture();
                                }}
                                style={{
                                    borderRadius: '15px',

                                    alignItems: 'center',
                                    marginBottom: '20px',
                                    backgroundColor:
                                        '#D8D83D                            ',
                                    width: '270px',
                                    height: '50px',
                                    marginLeft: '70px',
                                    top: '30px',
                                }}
                            >
                                Télécharger
                            </button>
                        </li>
                        {invoice.status === 'En_Cours' && (
                            <li
                                style={{
                                    borderRadius: '15px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    marginBottom: '10px',
                                }}
                            >
                                <button
                                    onClick={handleUpdateFacture}
                                    style={{
                                        borderRadius: '15px',
                                        alignItems: 'center',
                                        marginBottom: '20px',
                                        backgroundColor: '#D8D83D ',
                                        width: '270px',
                                        height: '50px',
                                        marginLeft: '70px',
                                        top: '30px',
                                    }}
                                    // disabled={testResult !== false}
                                >
                                    Modifier
                                </button>
                            </li>
                        )}

                        <li
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                marginBottom: '20px',
                            }}
                        >
                            <button
                                onClick={() => {
                                    handleDeleteFacture();
                                }}
                                style={{
                                    borderRadius: '15px',

                                    alignItems: 'center',
                                    marginBottom: '10px',
                                    backgroundColor: '#D8D83D ',
                                    width: '270px',
                                    height: '50px',
                                    marginLeft: '70px',
                                    top: '30px',
                                }}
                            >
                                Supprimer
                            </button>
                        </li>
                    </ul>
                </div>{' '}
            </div>
            <div
                style={{
                    width: '400px',
                    textAlign: 'center',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        width: '500px',
                        borderRadius: '15px',
                        textAlign: 'center',
                    }}
                >
                    <div
                        style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.5)',
                            width: '400px',
                            height: '140px',
                            borderRadius: '15px',
                            justifyContent: 'flex-start',
                            textAlign: 'center',
                        }}
                    >
                        <br></br>

                        <div style={{ display: 'flex' }}>
                            <label
                                style={{
                                    textAlign: 'center',

                                    fontSize: '15px',
                                    marginLeft: '20px',
                                }}
                            >
                                {' '}
                                Numéro facture{' '}
                            </label>
                            <label
                                style={{
                                    textAlign: 'center',

                                    fontWeight: 'bold',
                                    fontSize: '15px',
                                    marginLeft: '20px',
                                }}
                            >
                                {invoice.invoiceNumber}
                            </label>
                        </div>

                        <div style={{ display: 'flex', textAlign: 'center' }}>
                            <label
                                style={{
                                    fontSize: '15px',
                                    marginLeft: '20px',
                                    textAlign: 'center',
                                }}
                            >
                                {' '}
                                Nom du facture{' '}
                            </label>
                            <label
                                style={{
                                    textAlign: 'center',

                                    fontWeight: 'bold',
                                    fontSize: '15px',
                                    marginLeft: '20px',
                                }}
                            >
                                {invoice.invoiceName}
                            </label>
                        </div>
                        <div style={{ display: 'flex', textAlign: 'center' }}>
                            <label
                                style={{
                                    fontSize: '15px',
                                    marginLeft: '20px',
                                    textAlign: 'center',
                                }}
                            >
                                {' '}
                                Nom du client{' '}
                            </label>
                            <label
                                style={{
                                    textAlign: 'center',

                                    fontWeight: 'bold',
                                    fontSize: '15px',
                                    marginLeft: '20px',
                                }}
                            >
                                {invoice.clientName}
                            </label>
                        </div>
                        <div style={{ display: 'flex', textAlign: 'center' }}>
                            <label
                                style={{
                                    fontSize: '15px',
                                    marginLeft: '20px',
                                    textAlign: 'center',
                                }}
                            >
                                {' '}
                                Date du calcul{' '}
                            </label>
                            <label
                                style={{
                                    textAlign: 'center',

                                    fontWeight: 'bold',
                                    fontSize: '15px',
                                    marginLeft: '20px',
                                }}
                            >
                                {invoice.calculationDate}
                            </label>
                        </div>

                        <br></br>
                    </div>
                </div>
                <br></br>
                <br></br>
                <table
                    className="invoice-table"
                    style={{
                        borderCollapse: 'collapse',
                        marginLeft: '6px',
                        width: '700px',
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
                                Désignation
                            </th>
                            <th
                                style={{
                                    border: '1px solid #ddd',
                                }}
                            >
                                Quantite
                            </th>
                            <th
                                style={{
                                    border: '1px solid #ddd',
                                    backgroundColor: '#DBDCE3',
                                }}
                            >
                                Prix unitaire
                            </th>
                            <th
                                style={{
                                    border: '1px solid #ddd',
                                }}
                            >
                                Taux TVA
                            </th>
                            <th
                                style={{
                                    border: '1px solid #ddd',
                                    backgroundColor: '#DBDCE3',
                                }}
                            >
                                MontantHT
                            </th>
                            <th
                                style={{
                                    border: '1px solid #ddd',
                                }}
                            >
                                MontantTva
                            </th>
                            <th
                                style={{
                                    border: '1px solid #ddd',
                                    backgroundColor: '#DBDCE3',
                                }}
                            >
                                MontantTTC
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoice.items.map((item, index) => (
                            <tr key={index}>
                                <td
                                    style={{
                                        background: '#FFFFFF',
                                        backgroundColor: '#DBDCE3',
                                    }}
                                >
                                    {item.description}
                                </td>
                                <td
                                    style={{
                                        background: '#FFFFFF',
                                    }}
                                >
                                    {item.quantity}
                                </td>
                                <td
                                    style={{
                                        background: '#FFFFFF',
                                        backgroundColor: '#DBDCE3',
                                    }}
                                >
                                    {item.unitPrice}
                                </td>
                                <td
                                    style={{
                                        background: '#FFFFFF',
                                    }}
                                >
                                    {item.tva}
                                </td>
                                <td
                                    style={{
                                        background: '#FFFFFF',
                                        backgroundColor: '#DBDCE3',
                                    }}
                                >
                                    {item.totalHt}
                                </td>
                                <td
                                    style={{
                                        background: '#FFFFFF',
                                    }}
                                >
                                    {(item.unitPrice * item.quantity * item.tva) / 100}
                                </td>
                                <td
                                    style={{
                                        background: '#FFFFFF',
                                        backgroundColor: '#DBDCE3',
                                    }}
                                >
                                    {item.totalTTC}
                                </td>
                                {/* Autres cellules de données */}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <br></br>
                <br></br>
            </div>
            <div>
                <button
                    style={{
                        float: 'bottom',
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
            </div>
        </div>
    );
};

export default DetailsFactures;
const generateFactureHTML = ({ invoice }) => {
    // Générer le contenu HTML de la facture
    let html = `
    <html>
    <head>
    </head>
    <body>
      <div>
        <img src=${logo1} alt="Logo" style="max-width: 150px; max-height: 100px; float: right; margin-right: 50px; top: 100px;" />
      </div>
      <br></br>
      <br></br>

      <div style="width: 400px; text-align: center;justify-content: center">
        <div style="display: flex; width: 500px; border-radius: 15px; text-align: center;">
          <div style="background-color: #DBDCE3
; width: 400px; height: 170px; border-radius: 15px; justify-content: flex-start; text-align: center;">
            <br>
            <div style="display: flex;">
              <label style="text-align: center; font-size: 15px;margin-left: 20px; " >Réference du facture</label>
              <label style="text-align: center; font-weight: bold; font-size: 15px; margin-left: 15px;">
                ${invoice.invoiceNumber}
              </label>
            </div>
            <div style="display: flex; text-align: center;">
              <label style="font-size: 15px;  text-align: center;margin-left: 20px;">Date du calcul</label>
              <label style="text-align: center; font-weight: bold; font-size: 15px; margin-left: 51px;">
                ${invoice.calculationDate}
              </label>
            </div>
          <div style="display: flex; text-align: center;">
              <label style="font-size: 15px;  text-align: center;margin-left: 20px;">Nom  du client </label>
              <label style="text-align: center; font-weight: bold; font-size: 15px; margin-left: 50px;">
                ${invoice.clientName}
              </label>
         
            </div>
              <div style="display: flex; text-align: center;">
              <label style="font-size: 15px;  text-align: center;margin-left: 20px;">Contact  du client </label>
              <label style="text-align: center; font-weight: bold; font-size: 15px; margin-left: 33px;">
                ${invoice.clientContact}
              </label>
         
            </div>
              <div style="display: flex; text-align: center;">
              <label style="font-size: 15px; text-align: center;margin-left: 20px;">Adresse  du client </label>
              <label style="text-align: center; font-weight: bold; font-size: 15px; margin-left: 33px;">
                ${invoice.clientAddress}
              </label>
         
            </div>
          </div>
        </div>
      </div>
  
  
          
        </div>
     <br></br>
    
     <div style="width: 300px; margin: 0 auto; text-align: center;background-color: #D8D83D;;border-radius: 15px;
   ">
       <div ">
         <div style=" width: 400px; height: 120px; border-radius: 15px; justify-content: flex-start; text-align: center;">
           <br>
           <div style="display: flex; text-align: center;">
           <label style="font-size: 15px; margin-left: 20px; text-align: center;">Nom : ${
               invoice.consultantName
           }</label>
         </div>
         <div style="display: flex; text-align: center;">
             <label style="font-size: 15px; margin-left: 20px; text-align: center;">Contact : ${
                 invoice.consultantContact
             }</label>
           </div>
           <div style="display: flex; text-align: center;">
             <label style="font-size: 15px; margin-left: 20px; text-align: center;">Adresse : ${
                 invoice.consultantAddress
             }</label>
           </div>
           <br>
         </div>
       </div>
     </div>
    
   </div>
   
      <br>
      <table class="invoice-table" style="border-collapse: collapse; margin-left: 6px; width: 700px;">
        <thead>
          <tr>
            <th style="background-color: #DBDCE3;">Désignation</th>
            <th style=";">Quantite</th>
            <th style=" background-color: #DBDCE3;">Prix unitaire</th>
            <th style="">Taux TVA</th>
            <th style=" background-color: #DBDCE3;">Montant HT</th>
            <th style=" ">Montant Tva </th>

            <th style=";background-color: #DBDCE3;">Montant TTC</th>
          </tr>
        </thead>
        <tbody>
          <!-- Boucle pour générer les lignes de la facture -->
          ${invoice.items
              .map(
                  (item, index) => `
              <tr key=${index}>
                <td style="background: #FFFFFF; background-color: #DBDCE3;text-align: center;">${
                    item.description
                }</td>
                <td style="background: #FFFFFF;text-align: center;">${item.quantity}</td>
                <td style="background: #FFFFFF; background-color: #DBDCE3;text-align: center;">${
                    item.unitPrice
                }</td>
                <td style="background: #FFFFFF;text-align: center;">${item.tva}</td>
                <td style="background: #FFFFFF; background-color: #DBDCE3;text-align: center;">${
                    item.totalHt
                }$</td>
                <td style="background: #FFFFFF;text-align: center;">${
                    (item.quantity * item.unitPrice * item.tva) / 100
                }$</td>

                <td style="background: #FFFFFF;text-align: center;background-color: #DBDCE3">${
                    item.totalTTC
                }$</td>
              </tr>
            `,
              )
              .join('')}
        </tbody> 
      </table>
  
      <br></br>
      <div style="float: right; margin-left: 20px;font-weight: bold;">
        <p style="font-weight: bold;">Montant TVA: &nbsp;${invoice.totalTVA}</p>
        <p style="font-weight: bold;">Montant HT: &nbsp;${invoice.totalHT}$</p>
        <br>
        <hr style="width: 100%; height: 1px; background-color: #000000; border: none;">
        <p style="font-weight: bold;">Montant TTC: &nbsp;${invoice.totalTTC}$</p>
        <br></br>
        <br></br>
        <br></br>
      </div>
    </body>
  
    </html>
  
    `;

    return html;
};
