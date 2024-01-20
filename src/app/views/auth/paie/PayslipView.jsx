import {
    ArrowDownOnSquareIcon,
    EyeIcon,
    FolderArrowDownIcon,
} from '@heroicons/react/24/outline';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getPayslipsAction } from '../../../../app/actions/PayslipsActions';
import tabMonths from '../../../../app/components/res/MonthTab';
import withAuth from '../../../common/withAuth';
import TablePanelPayslip from '../../../components/lib/container/table/TablePanelPayslip';
import InputSelect from '../../../components/lib/form/InputSelect';
import ConsultantService from '../../../services/ConsultantService';
import payslipsService from '../../../services/ConsultantService';
import { DetailsViews } from './DetailsView';

const PayslipView = () => {
    var filteredData = [];
    const [payslips, setPayslips] = useState([]);
    const [totalPagesState, settotalPagesState] = useState();
    const [showPayslip, setShowPayslip] = useState({});
    const [downloadPayslip, setDownloadPayslip] = useState({});
    const [page, setPage] = useState(0);
    const [filteredPagination, setFilterdPagination] = useState(0);
    const dispatch = useDispatch();
    const payslipsState = useSelector((state) => state.payslips.payslips);
    console.log(payslipsState, 'e');
    const [totalPages, setTotalPages] = useState(0);
    //const [totalElements, setTotalElements] = useState(0);
    const [search, setSearch] = useState(null);
    const [sort, setSort] = useState(null);
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [searchYears, setSearchYears] = useState('');
    const [searchMonths, setSearchMonths] = useState('');
    const [searchConsultant, setSearchConsultant] = useState('');
    const [selectedValueMonths, setSelectedValueMonths] = useState('');
    const [selectedValueYears, setSelectedValueYears] = useState('');
    useEffect(() => {
        dispatch(getPayslipsAction());
    }, []);
    useEffect(() => {
        console.log('1111111', payslipsState);
        // const slicedPayslips = payslipsState.slice(page * 5, (page + 1) * 5);
        var paySlipArray = [];
        let y = payslipsState   
            .filter((el) => {
                if (searchMonths) {
                    return el.month.toLowerCase().includes(searchMonths.toLowerCase());
                } else {
                    return true;
                }
            })
            .filter((el) => {
                if (searchYears) {
                    return el.year.toString().includes(searchYears);
                } else {
                    return true;
                }
            });
        filteredData = y;
        console.log('2222222', y, filteredData);

        let x = [...filteredData];

        x.slice(page * 5, (page + 1) * 5).map((data) => {
            console.log('BBBBBBBB');
            paySlipArray.push({
                nameFile: `Fiche de paie du ${data.month} `,
                payDate: `${data.month}/ ${data.year}`,
                show: <DetailsViews data={data} />,
                download: (
                    <Button
                        style={{ width: '15px', height: '18px' }}
                        onClick={() => {
                            setDownloadPayslip(data);
                        }}
                    >
                        <ArrowDownOnSquareIcon />
                    </Button>
                ),
            });
            return data;
        });

        setPayslips(paySlipArray);
        setTotalPages(Math.ceil(filteredData.length / 5));
        setFilterdPagination(filteredData.length);
    }, [page, search, sort, searchMonths, searchYears, payslipsState]);
    const DownloadBtn = () => (
        <button type="button" className="btn-link-primary">
            <FolderArrowDownIcon className="h-6 w-6 text-gray-500" />
        </button>
    );
    /**** filter */
    const handleMonthChange = (event) => {
        setMonth(event.target.value);
    };
    const handleYearChange = (event) => {
        setYear(event.target.value);
    };

    const handleChangeConsultant = (event) => {
        setSearchConsultant(event.target.value);
    };

    const handleResetMonths = () => {
        setSearchMonths('');
    };
    const handleResetYears = () => {
        setSearchYears('');
    };

    const handleChangeMonths = (event) => {
        setSearchMonths(event.target.value);
    };
    const handleChangeYears = (event) => {
        setSearchYears(event.target.value);
    };
    const currentYear = new Date().getFullYear();
    const tabyears = Array.from({ length: currentYear - 1900 }, (v, i) => i + 1900 + 1);
    const filteredYears = tabyears.filter((y) => y <= currentYear);

    const [paySlipConsultant, setpaySlipConsultant] = useState([]);
    var userId = localStorage.getItem('userId');

    return (
        <>
            <button>
                <DownloadBtn />
            </button>
            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                {/* <FormControl fullWidth style={{ display: 'flex', flexFlow: 'row wrap' }}>
                    <InputLabel id="demo-simple-select-label-year">Consultant</InputLabel>

                    <Select
                        labelId="demo-simple-select-label-year"
                        id="demo-simple-select"
                        value={searchYears}
                        label="Année"
                        style={{ marginBottom: '15px', width: '150px' }}
                        onChange={handleChangeYears}
                    >
                
                            <MenuItem ></MenuItem>
                   
                    </Select>
                    <Button onClick={handleResetYears}>reset</Button>
                </FormControl> */}
                <FormControl fullWidth style={{ display: 'flex', flexFlow: 'row wrap' }}>
                    <InputLabel id="demo-simple-select-label-year">Years</InputLabel>

                    <Select
                        labelId="demo-simple-select-label-year"
                        id="demo-simple-select"
                        value={searchYears}
                        label="Année"
                        style={{ marginBottom: '15px', width: '150px' }}
                        onChange={handleChangeYears}
                    >
                        {filteredYears.map((el) => (
                            <MenuItem value={el}>{el}</MenuItem>
                        ))}
                    </Select>
                    <Button onClick={handleResetYears}>reset</Button>
                </FormControl>
                <FormControl fullWidth style={{ display: 'flex', flexFlow: 'row wrap' }}>
                    <InputLabel id="demo-simple-select-label">Mois</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        style={{ marginBottom: '15px', width: '250px' }}
                        value={searchMonths}
                        label="Mois"
                        onChange={(e) => {
                            handleChangeMonths(e);
                        }}
                    >
                        {tabMonths.map((el) => (
                            <MenuItem value={el.value}>{el.contnue}</MenuItem>
                        ))}
                    </Select>
                    <Button onClick={handleResetMonths}>reset</Button>
                </FormControl>
            </div>{' '}
            {console.log(payslipsState, 'DATAA')}
            {console.log(payslips, 'DATAA222')}
            {console.log(totalPages, 'TOTAL PAGES')}
            <TablePanelPayslip
                column={[
                    { name: 'nameFile', label: 'Nom de fichier' },
                    { name: 'payDate', label: 'Date de Paie' },
                    { name: 'show', label: 'Afficher Détail' },
                    { name: 'download', label: 'Télécharger ' },
                ]}
                rows={payslips}
                onSearch={(values) => {
                    setSearch(values.search);
                    setPage(0);
                }}
                onSort={(values) => {
                    setSort(values);
                    setPage(0);
                }}
                totalElements={filteredPagination}
                pageSize={5}
                totalPages={totalPages}
                onPageChange={setPage}
                currentPage={page}
                setCurrentPage={setPage}
            />
        </>
    );
};

export default withAuth(PayslipView);
