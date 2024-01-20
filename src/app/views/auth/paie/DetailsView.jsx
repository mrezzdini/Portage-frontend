import {
    ArrowDownOnSquareIcon,
    EyeIcon,
    FolderArrowDownIcon,
} from '@heroicons/react/24/outline';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormHelperText,
    IconButton,
    Input,
    InputLabel,
    MenuItem,
    Modal,
    Select,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';

import withAuth from '../../../common/withAuth';
export const DetailsViews = (props) => {
    const { data } = props;
    console.log(data, 'data');
    const [open, setOpen] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [selected, setSelected] = useState([]);
    const handleClose = () => {
        setSelectedItemId(null);
        setOpen(false);
    };

    return (
        <>
            <Button
                style={{ marginTop: '10px' }}
                variant="contained"
                onClick={() => {
                    setOpen(true);
                }}
            >
                <EyeIcon style={{ width: '15px', height: '18px' }} />
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>month year</DialogTitle>
                <DialogContent>
                    <div>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Détails du fiche de paie</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {/* <TableRow>
                                    <TableCell>username</TableCell>

                                    <TableCell>{props.data.consultantId}</TableCell>
                                </TableRow> */}

                                <TableRow>
                                    <TableCell>Salaire brut </TableCell>

                                    <TableCell>{props.data.grossSalary}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell> Salaire net avant IR</TableCell>

                                    <TableCell>{props.data.netSalaryBeforeTax}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>IR</TableCell>

                                    <TableCell>{props.data.incomeTax}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Salaire net</TableCell>

                                    <TableCell>{props.data.netSalary}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell> Charges sociales</TableCell>

                                    <TableCell>
                                        {props.data.socialSecurityContributions}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Charges patronales</TableCell>

                                    <TableCell>
                                        {props.data.employerSocialSecurityContributions}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell> Frais professionnels</TableCell>

                                    <TableCell>
                                        {props.data.professionalExpenses}
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell> Taxes et assurances</TableCell>

                                    <TableCell>{props.data.taxesAndInsurance}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell> Frais de gestion</TableCell>

                                    <TableCell>{props.data.managementFees}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell> Provision pour congés payés</TableCell>

                                    <TableCell>{props.data.provisionPaidleave}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        {' '}
                                        Montant des chèques cadeaux distribués
                                    </TableCell>

                                    <TableCell>{props.data.giftVouchers}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell> Montant des frais de formation</TableCell>

                                    <TableCell>{props.data.trainingExpenses}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell> Montant des achats de matériel</TableCell>

                                    <TableCell>{props.data.equipmentPurchases}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell> Mois du fiche de paie (1-12)</TableCell>

                                    <TableCell>{props.data.month}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell> Année du fiche de paie</TableCell>

                                    <TableCell>{props.data.year}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Facture</TableCell>

                                    <TableCell>{props.data.OtherInvoice}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Réserve</TableCell>

                                    <TableCell>{props.data.reserve}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
