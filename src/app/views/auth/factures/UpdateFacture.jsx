import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

function InvoiceEditor() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const invoiceParam = searchParams.get('invoice');
    const invoice = invoiceParam ? JSON.parse(decodeURIComponent(invoiceParam)) : null;
    const [modifiedInvoice, setModifiedInvoice] = useState(invoice);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setModifiedInvoice((prevInvoice) => ({
            ...prevInvoice,
            [name]: value,
        }));
    };

    const handleSave = () => {
        // Effectuez ici votre logique d'enregistrement de la facture modifiée
        console.log('Facture modifiée :', modifiedInvoice);
    };

    return (
        <div>
            <h2>Modifier la facture</h2>
            {invoice ? (
                <form>
                    <div>
                        <label htmlFor="invoiceNumber">Numéro de facture :</label>
                        <input
                            type="text"
                            id="invoiceNumber"
                            name="invoiceNumber"
                            value={modifiedInvoice.invoiceNumber}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="totalHT">Montant HT :</label>
                        <input
                            type="number"
                            id="totalHT"
                            name="totalHT"
                            value={modifiedInvoice.totalHT}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="totalTVA">Montant TVA :</label>
                        <input
                            type="number"
                            id="totalTVA"
                            name="totalTVA"
                            value={modifiedInvoice.totalTVA}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="totalTTC">Montant TTC :</label>
                        <input
                            type="number"
                            id="totalTTC"
                            name="totalTTC"
                            value={modifiedInvoice.totalTTC}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="button" onClick={handleSave}>
                        Enregistrer
                    </button>
                </form>
            ) : (
                <p>Aucune facture à afficher</p>
            )}
        </div>
    );
}

export default InvoiceEditor;
