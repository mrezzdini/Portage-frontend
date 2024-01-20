import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { HiOutlineDownload } from 'react-icons/hi';

// const AppView = () => {
//     return (
//              useEffect(() => {
//     const fetchData = async () => {
//       const payslips = await payslipService.getAllPayslips();
//       const payslipData = payslips.data;
//       console.log(payslipData)
//     }
//       fetchData();
//     },[])
//     );
// };
import withAuth from '../../../common/withAuth';
import consultantService from '../../../services/ConsultantService';
import payslipService from '../../../services/payslipService';

function FicheDePaieTable() {
    // const userId= localStorage.getItem('userId')
    // const userprofile = localStorage.getItem('profile');
    // const [isAdmin, setIsAdmin] = useState(userprofile === 'ADMIN'); // Check if user is an admin
    // // Get the user type from local storage
    const storage = localStorage.getItem('persist:auth');
    let userId;
    let userprofile;
    if (storage) userprofile = JSON.parse(JSON.parse(storage).profile);
    if (storage) userId = JSON.parse(JSON.parse(storage).userId);
    const [isAdmin, setIsAdmin] = useState(userprofile === 'ADMIN'); // Check if user is an admin

    const [isExpanded, setIsExpanded] = useState(false);
    const [consultants, setConsultants] = useState([]);
    const [isExpandedAutres, setIsExpandedAutres] = useState(false);
    const [yearsList, setYearsList] = useState([]);

    // GET  CONSULTANTS
    const getConsultants = async () => {
        const response = await consultantService.getAllConsultants();

        setConsultants(response.data);
        console.log('ALL CONSULTANT', consultants);
    };

    const getfichedepaieparUserId = async (userId) => {
        let response;
        if (isAdmin) {
            // If user is an admin, get all payslips for all consultants
            response = await payslipService.getAllPayslips();

            // if( id!= null){
            //         fetchconsultantbyid(id); }
        } else {
            const responsee = await consultantService.getConsultantByUserId(userId);

            const consultantid = responsee.data.id;
            response = await payslipService.getAllPayslipsByConsultantId(consultantid);
        }

        const payslips = response.data;
        console.log('tous les fiche de paie du consultnat:', payslips);

        const years = {};
        payslips.forEach((payslip) => {
            if (!years[payslip.year]) {
                years[payslip.year] = { year: payslip.year, month: [] };
            }

            years[payslip.year].month.push({
                month: payslip.month,
                consultantId: payslip.consultantId,
                grossSalary: payslip.grossSalary,
                netSalaryBeforeTax: payslip.netSalaryBeforeTax,
                incomeTax: payslip.incomeTax,
                netSalary: payslip.netSalary,
                socialSecurityContributions: payslip.socialSecurityContributions,
                employerSocialSecurityContributions:
                    payslip.employerSocialSecurityContributions,
                professionalExpenses: payslip.professionalExpenses,
                taxesAndInsurance: payslip.taxesAndInsurance,
                managementFees: payslip.managementFees,
                provisionPaidleave: payslip.provisionPaidleave,
                giftVouchers: payslip.giftVouchers,
                trainingExpenses: payslip.trainingExpenses,
                equipmentPurchases: payslip.equipmentPurchases,
                otherInvoice: payslip.otherInvoice,
                reserve: payslip.reserve,
                docId: payslip.docId,
            });
        });

        const yearsList = Object.values(years);
        console.log('??????????????????????', yearsList);
        console.log('??????????????????length????', yearsList.length);

        return yearsList;
    };

    useEffect(() => {
        const fetchData = async () => {
            const data = await getfichedepaieparUserId();
            setYearsList(data);
            setyearSelectionnee(data[data.length - 3]?.year || 0);
            getConsultants();
        };
        fetchData();
    }, []);
    //   console.log("************LISTYEAR*****",yearsList)
    console.log('*******************', yearsList);

    console.log('********', yearsList[yearsList.length - 1]);

    const [yearSelectionnee, setyearSelectionnee] = useState(
        yearsList[yearsList.length - 3]?.year || 0,
    ); // l'année 2023 sera sélectionnée par défaut

    const handeyearState = (year) => {
        if (yearSelectionnee === year) {
            return setyearSelectionnee(null);
        } else {
            return setyearSelectionnee(year);
        }
    };

    const afficherDonneesmonth = (month) => {
        alert(
            `salaireNet:${month.grossSalary}\nNet avant IR : ${month.netSalaryBeforeTax}`,
        );
    };

    return (
        <TableContainer
            component={Paper}
            Style={{ maxWidth: 800, margin: 'auto', marginTop: 50 }}
        >
            <Table aria-label="fiche de paie table">
                <TableHead>
                    <>
                        <TableRow>
                            <TableCell
                                style={{
                                    fontWeight: 'bold',
                                    color: '#D8D83D', //
                                }}
                                rowSpan={3}
                            >
                                Année
                            </TableCell>
                            <TableCell
                                align={isExpanded ? 'center' : 'left'}
                                onClick={() => {
                                    setIsExpandedAutres(false);
                                    setIsExpanded(!isExpanded);
                                }}
                                colSpan={isExpandedAutres ? 13 : 10}
                                style={{
                                    position: 'relative',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    color: '#D8D83D',
                                }}
                            >
                                Cout
                                {isExpanded ? (
                                    <span
                                        style={{
                                            position: 'absolute',
                                            top: '18px',
                                            marginLeft: '10px',
                                        }}
                                    >
                                        <ExpandLessIcon fontSize="medium" />
                                    </span>
                                ) : (
                                    <span
                                        style={{
                                            position: 'absolute',
                                            top: '18px',
                                            marginLeft: '10px',
                                        }}
                                    >
                                        <ExpandMoreIcon fontSize="medium" />
                                    </span>
                                )}
                            </TableCell>
                            <TableCell></TableCell>
                            <TableCell
                                rowSpan={3}
                                style={{ fontWeight: 'bold', color: '#D8D83D' }}
                            >
                                Facture
                            </TableCell>
                            <TableCell
                                rowSpan={3}
                                style={{ fontWeight: 'bold', color: '#D8D83D' }}
                            >
                                Réserve
                            </TableCell>
                            {userprofile === 'ADMIN' &&
                            yearSelectionnee !== undefined &&
                            yearSelectionnee !== null ? (
                                <TableCell
                                    rowSpan={3}
                                    style={{ fontWeight: 'bold', color: '#D8D83D' }}
                                >
                                    nom et prénom
                                </TableCell>
                            ) : (
                                <></>
                            )}
                        </TableRow>
                        {isExpanded && (
                            <>
                                <TableRow>
                                    <>
                                        <TableCell
                                            rowSpan={2}
                                            style={{
                                                fontWeight: 'bold',
                                                color: '#D8D83D',
                                            }}
                                        >
                                            Salaire brut{' '}
                                        </TableCell>
                                        <TableCell
                                            rowSpan={2}
                                            style={{
                                                fontWeight: 'bold',
                                                color: '#D8D83D',
                                            }}
                                        >
                                            Net avant IR{' '}
                                        </TableCell>
                                        <TableCell
                                            rowSpan={2}
                                            style={{
                                                fontWeight: 'bold',
                                                color: '#D8D83D',
                                            }}
                                        >
                                            IR{' '}
                                        </TableCell>
                                        <TableCell
                                            rowSpan={2}
                                            style={{
                                                fontWeight: 'bold',
                                                color: '#D8D83D',
                                            }}
                                        >
                                            net après IR{' '}
                                        </TableCell>
                                        <TableCell
                                            rowSpan={2}
                                            style={{
                                                fontWeight: 'bold',
                                                color: '#D8D83D',
                                            }}
                                        >
                                            Charge sociale{' '}
                                        </TableCell>
                                        <TableCell
                                            rowSpan={2}
                                            style={{
                                                fontWeight: 'bold',
                                                color: '#D8D83D',
                                            }}
                                        >
                                            Charge patronale{' '}
                                        </TableCell>
                                        <TableCell
                                            rowSpan={2}
                                            style={{
                                                fontWeight: 'bold',
                                                color: '#D8D83D',
                                            }}
                                        >
                                            Frais professionnels{' '}
                                        </TableCell>
                                        <TableCell
                                            rowSpan={2}
                                            style={{
                                                fontWeight: 'bold',
                                                color: '#D8D83D',
                                            }}
                                        >
                                            Taxe et assurance{' '}
                                        </TableCell>
                                        <TableCell
                                            rowSpan={2}
                                            style={{
                                                fontWeight: 'bold',
                                                color: '#D8D83D',
                                            }}
                                        >
                                            Frais de gestion{' '}
                                        </TableCell>
                                        <TableCell
                                            rowSpan={2}
                                            style={{
                                                fontWeight: 'bold',
                                                color: '#D8D83D',
                                            }}
                                        >
                                            Provision CP{' '}
                                        </TableCell>
                                        <TableCell
                                            colSpan={isExpandedAutres ? 3 : 0}
                                            style={{
                                                fontWeight: 'bold',
                                                color: '#D8D83D',
                                            }}
                                        >
                                            <span
                                                aria-hidden="true"
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: isExpandedAutres
                                                        ? 'center'
                                                        : 'left',
                                                    alignItems: 'center',
                                                    cursor: 'pointer',
                                                    gap: '6px',
                                                }}
                                                onClick={() =>
                                                    setIsExpandedAutres(!isExpandedAutres)
                                                }
                                            >
                                                Autres
                                                <AiOutlinePlus size={18} />
                                            </span>
                                        </TableCell>
                                    </>
                                </TableRow>
                                {isExpanded && isExpandedAutres && (
                                    <TableRow>
                                        <TableCell
                                            style={{
                                                fontWeight: 'bold',
                                                color: '#D8D83D',
                                            }}
                                        >
                                            Cheque Cadeau
                                        </TableCell>
                                        <TableCell
                                            style={{
                                                fontWeight: 'bold',
                                                color: '#D8D83D',
                                            }}
                                        >
                                            Formation
                                        </TableCell>
                                        <TableCell
                                            style={{
                                                fontWeight: 'bold',
                                                color: '#D8D83D',
                                            }}
                                        >
                                            Achat matériel
                                        </TableCell>
                                    </TableRow>
                                )}
                            </>
                        )}
                    </>
                </TableHead>
                <TableBody>
                    {yearsList.map((year) => {
                        return (
                            <>
                                <TableRow
                                    hover
                                    onClick={() => handeyearState(year.year)}
                                    sx={{ '&:hover': { cursor: 'pointer' } }}
                                >
                                    <TableCell
                                        sx={{ postion: 'relative', color: '#D8D83D' }}
                                    >
                                        {year.year}
                                        {yearSelectionnee === year.year ? (
                                            <span
                                                style={{
                                                    position: 'absolute',
                                                    top: '18px',
                                                    marginLeft: '10px',
                                                }}
                                            >
                                                <ExpandMoreIcon fontSize="medium" />
                                            </span>
                                        ) : (
                                            <span
                                                style={{
                                                    position: 'absolute',
                                                    top: '18px',
                                                    marginLeft: '10px',
                                                }}
                                            >
                                                <ExpandLessIcon fontSize="medium" />
                                            </span>
                                        )}
                                    </TableCell>

                                    {isExpanded ? (
                                        <React.Fragment>
                                            <TableCell>
                                                {year.month.reduce(
                                                    (acc, cur) => acc + cur.grossSalary,
                                                    0,
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {year.month.reduce(
                                                    (acc, cur) =>
                                                        acc + cur.netSalaryBeforeTax,
                                                    0,
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {year.month.reduce(
                                                    (acc, cur) => acc + cur.incomeTax,
                                                    0,
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {year.month.reduce(
                                                    (acc, cur) => acc + cur.netSalary,
                                                    0,
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {year.month.reduce(
                                                    (acc, cur) =>
                                                        acc +
                                                        cur.socialSecurityContributions,
                                                    0,
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {year.month.reduce(
                                                    (acc, cur) =>
                                                        acc +
                                                        cur.employerSocialSecurityContributions,
                                                    0,
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {year.month.reduce(
                                                    (acc, cur) =>
                                                        acc + cur.professionalExpenses,
                                                    0,
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {year.month.reduce(
                                                    (acc, cur) =>
                                                        acc + cur.taxesAndInsurance,
                                                    0,
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {year.month.reduce(
                                                    (acc, cur) =>
                                                        acc + cur.managementFees,
                                                    0,
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {year.month.reduce(
                                                    (acc, cur) =>
                                                        acc + cur.provisionPaidleave,
                                                    0,
                                                )}
                                            </TableCell>
                                            {isExpandedAutres && (
                                                <>
                                                    <TableCell>
                                                        {year.month.reduce(
                                                            (acc, cur) =>
                                                                acc + cur.giftVouchers,
                                                            0,
                                                        )}
                                                    </TableCell>
                                                    <TableCell>
                                                        {year.month.reduce(
                                                            (acc, cur) =>
                                                                acc +
                                                                cur.trainingExpenses,
                                                            0,
                                                        )}
                                                    </TableCell>
                                                    <TableCell>
                                                        {year.month.reduce(
                                                            (acc, cur) =>
                                                                acc +
                                                                cur.equipmentPurchases,
                                                            0,
                                                        )}
                                                    </TableCell>
                                                </>
                                            )}
                                        </React.Fragment>
                                    ) : (
                                        <TableCell colspan={isExpandedAutres ? 13 : 10}>
                                            {year.month.reduce(
                                                (acc, cur) => acc + cur.grossSalary,
                                                0,
                                            ) +
                                                year.month.reduce(
                                                    (acc, cur) =>
                                                        acc + cur.netSalaryBeforeTax,
                                                    0,
                                                ) +
                                                year.month.reduce(
                                                    (acc, cur) => acc + cur.incomeTax,
                                                    0,
                                                ) +
                                                year.month.reduce(
                                                    (acc, cur) => acc + cur.netSalary,
                                                    0,
                                                ) +
                                                year.month.reduce(
                                                    (acc, cur) =>
                                                        acc +
                                                        cur.socialSecurityContributions,
                                                    0,
                                                ) +
                                                year.month.reduce(
                                                    (acc, cur) =>
                                                        acc +
                                                        cur.employerSocialSecurityContributions,
                                                    0,
                                                ) +
                                                year.month.reduce(
                                                    (acc, cur) =>
                                                        acc + cur.professionalExpenses,
                                                    0,
                                                ) +
                                                year.month.reduce(
                                                    (acc, cur) =>
                                                        acc + cur.taxesAndInsurance,
                                                    0,
                                                ) +
                                                year.month.reduce(
                                                    (acc, cur) =>
                                                        acc + cur.managementFees,
                                                    0,
                                                ) +
                                                year.month.reduce(
                                                    (acc, cur) =>
                                                        acc + cur.provisionPaidleave,
                                                    0,
                                                ) +
                                                year.month.reduce(
                                                    (acc, cur) => acc + cur.giftVouchers,
                                                    0,
                                                ) +
                                                year.month.reduce(
                                                    (acc, cur) =>
                                                        acc + cur.trainingExpenses,
                                                    0,
                                                ) +
                                                year.month.reduce(
                                                    (acc, cur) =>
                                                        acc + cur.equipmentPurchases,
                                                    0,
                                                )}
                                        </TableCell>
                                    )}
                                    <TableCell></TableCell>
                                    <TableCell>
                                        {year.month.reduce(
                                            (acc, cur) => acc + cur.otherInvoice,
                                            0,
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {year.month.reduce(
                                            (acc, cur) => acc + cur.reserve,
                                            0,
                                        )}
                                    </TableCell>
                                </TableRow>

                                {yearSelectionnee === year.year &&
                                    year.month.map((month) => {
                                        // Find the corresponding consultant object by matching the consultantId
                                        const consultant = consultants.find(
                                            (c) => c.id === month.consultantId,
                                        );
                                        return (
                                            <TableRow
                                                sx={{ 'background-color': '#f5f5f5' }}
                                                key={`${year.year}-${month.month}`}
                                                onClick={() =>
                                                    afficherDonneesmonth(month)
                                                }
                                            >
                                                <TableCell sx={{ position: 'relative' }}>
                                                    {month.month}
                                                    <span
                                                        aria-hidden="true"
                                                        style={{
                                                            position: 'absolute',
                                                            top: '12px',
                                                            marginLeft: 'px',
                                                            cursor: 'pointer',
                                                        }}
                                                        onClick={() =>
                                                            handleDownloadFicheDePaie(
                                                                year.month.docId,
                                                            )
                                                        }
                                                    >
                                                        <HiOutlineDownload size={18} />
                                                    </span>
                                                </TableCell>
                                                {isExpanded ? (
                                                    <>
                                                        <TableCell>
                                                            {month.grossSalary}
                                                        </TableCell>
                                                        <TableCell>
                                                            {month.netSalaryBeforeTax}
                                                        </TableCell>
                                                        <TableCell>
                                                            {month.incomeTax}
                                                        </TableCell>
                                                        <TableCell>
                                                            {month.netSalary}
                                                        </TableCell>
                                                        <TableCell>
                                                            {
                                                                month.socialSecurityContributions
                                                            }
                                                        </TableCell>
                                                        <TableCell>
                                                            {
                                                                month.employerSocialSecurityContributions
                                                            }
                                                        </TableCell>
                                                        <TableCell>
                                                            {month.professionalExpenses}
                                                        </TableCell>
                                                        <TableCell>
                                                            {month.taxesAndInsurance}
                                                        </TableCell>
                                                        <TableCell>
                                                            {month.managementFees}
                                                        </TableCell>
                                                        <TableCell>
                                                            {month.provisionPaidleave}
                                                        </TableCell>
                                                        {isExpandedAutres && (
                                                            <>
                                                                <TableCell>
                                                                    {month.giftVouchers}
                                                                </TableCell>
                                                                <TableCell>
                                                                    {
                                                                        month.trainingExpenses
                                                                    }
                                                                </TableCell>
                                                                <TableCell>
                                                                    {
                                                                        month.equipmentPurchases
                                                                    }
                                                                </TableCell>
                                                            </>
                                                        )}
                                                    </>
                                                ) : (
                                                    <TableCell
                                                        colSpan={
                                                            isExpandedAutres ? 13 : 10
                                                        }
                                                    >
                                                        {[
                                                            month.grossSalary,
                                                            month.netSalaryBeforeTax,
                                                            month.incomeTax,
                                                            month.netSalary,
                                                            month.socialSecurityContributions,
                                                            month.employerSocialSecurityContributions,
                                                            month.professionalExpenses,
                                                            month.taxesAndInsurance,
                                                            month.managementFees,
                                                            month.provisionPaidleave,
                                                            month.giftVouchers,
                                                            month.trainingExpenses,
                                                            month.equipmentPurchases,
                                                        ].reduce(
                                                            (total, currentValue) =>
                                                                total + currentValue,
                                                        )}
                                                    </TableCell>
                                                )}
                                                <TableCell></TableCell>
                                                <TableCell>
                                                    {month.otherInvoice}
                                                </TableCell>
                                                <TableCell>{month.reserve}</TableCell>

                                                {/* <TableCell>{ fetchconsultantbyid(month.consultantId)}</TableCell> */}
                                                {userprofile === 'ADMIN' ? (
                                                    <TableCell>
                                                        {consultant
                                                            ? consultant.firstName
                                                            : ''}{' '}
                                                        {consultant
                                                            ? consultant.lastName
                                                            : ''}{' '}
                                                    </TableCell>
                                                ) : (
                                                    <></>
                                                )}
                                            </TableRow>
                                        );
                                    })}
                            </>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default withAuth(FicheDePaieTable);
