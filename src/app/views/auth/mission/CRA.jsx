/* eslint-disable react/jsx-key */

import './CRA.css';

import { Button, Card, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import FileSaver from 'file-saver';
import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';

import withAuth from '../../../common/withAuth';
import missionService from '../../../services/missionService';
const CRA = () => {
    const [activities, setActivities] = useState([]);
    const [date, setDate] = useState(new Date());
    const [consultant, setConsultant] = useState();
    const [missions, setMissions] = useState([]);
    const [selectedMission, setSelectedMission] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [years, setYears] = useState([]);
    const [months, setMonths] = useState([]);

    const storage = localStorage.getItem('persist:auth');
    let userId;
    if (storage) userId = JSON.parse(JSON.parse(storage).userId);

    useEffect(() => {
        const fetchActivities = async () => {
            const response = await missionService.fetchActivities();

            setActivities(response.data);
        };
        fetchActivities();

        const fetchConsultant = async () => {
            const response1 = await missionService.getConsultantByUserId(userId);
            setConsultant(response1);
            getAllMission(response1);
        };
        fetchConsultant();
        const getAllMission = async (consultant) => {
            const response3 = await missionService.getAllmissionByIdConsultant(
                consultant.id,
            );

            setMissions(response3.data);
        };
        const fetchYears = async () => {
            const response4 = await missionService.fetchYears();
            // set the first year as the default selected year
            if (response4.length > 0) {
                // setSelectedYear(response4[0]);
            }
            setYears(response4.data);
        };
        fetchYears();
        const fetchMonths = async () => {
            const response5 = await missionService.fetchMonths();
            setMonths(response5.data);
        };
        fetchMonths();

        const interval = setInterval(() => setDate(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    const handleMissionChange = (event) => {
        setSelectedMission(event.target.value);
    };
    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
    };
    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
    };

    const handleExportExcel = () => {
        // Filter the activities based on the selected mission, year, and month
        const modifiedActivities = activities.map((activity) => {
            return {
                //Idmission: activity.mission?.id,
                Libellé_préstation: activity?.name,
                Type_préstation: activity.type?.name,
                Nature_préstation: activity.nature?.name,
                Année: activity.year,
                Mois: activity.month,
                Valeur: activity.valeur,
            };
        });

        // Create the worksheet
        const worksheet = XLSX.utils.json_to_sheet(modifiedActivities, {
            /* header: ['Mission ID', 'Name', 'Year', 'Month', 'Value', 'Type', 'Nature'], */
        });

        /* // Create the worksheet
    const worksheet = XLSX.utils.json_to_sheet(activities) */ // Create the workbook and add the worksheet
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Activities');

        // Convert the workbook to a binary string
        const excelData = XLSX.write(workbook, { type: 'binary', bookType: 'xlsx' });

        // Create a Blob from the binary string
        const blob = new Blob([s2ab(excelData)], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });

        // Save the file using FileSaver.js
        FileSaver.saveAs(blob, 'activities.xlsx');
    };

    // Utility function to convert a string to ArrayBuffer
    const s2ab = (s) => {
        const buf = new ArrayBuffer(s.length);
        const view = new Uint8Array(buf);
        for (let i = 0; i < s.length; i++) {
            view[i] = s.charCodeAt(i) & 0xff;
        }
        return buf;
    };
    const options = { month: 'long', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('fr-FR', options);
    return (
        <div className="container">
            <div className="mb-5 border-b pb-5">
                <div className="w-full rounded-lg bg-white p-4 shadow dark:bg-gray-700">
                    <br />
                    <h3>Mes CRA</h3>
                </div>
            </div>

            <div className="select-row">
                <h5>Merci de choisir un type de filtrage :</h5>
                <FormControl sx={{ m: 1, minWidth: 400 }}>
                    <InputLabel id="select-mission-label">Mission</InputLabel>
                    <Select
                        labelId="select-mission-label"
                        id="select-mission"
                        value={selectedMission}
                        onChange={handleMissionChange}
                    >
                        <MenuItem value="" disabled>
                            choisir une mission
                        </MenuItem>
                        {missions?.map((mission) => (
                            <MenuItem key={mission.id} value={mission.id}>
                                Mission chez {mission.client}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="select-year-label">Année</InputLabel>
                    <Select
                        labelId="select-year-label"
                        id="select-year"
                        value={selectedYear}
                        onChange={handleYearChange}
                    >
                        <MenuItem value="" disabled>
                            choisir une année
                        </MenuItem>
                        {years.map((year) => (
                            <MenuItem key={year} value={year}>
                                {year}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="select-month-label">Mois</InputLabel>
                    <Select
                        labelId="select-month-label"
                        id="select-month"
                        value={selectedMonth}
                        onChange={handleMonthChange}
                    >
                        <MenuItem value="" disabled>
                            choisir un mois
                        </MenuItem>
                        {months.map((month) => (
                            <MenuItem key={month} value={month}>
                                {month}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button variant="contained" onClick={() => window.location.reload()}>
                    Reset
                </Button>
                <Button variant="contained" onClick={handleExportExcel}>
                    Export Excel
                </Button>
            </div>

            <div className="card-row">
                {activities
                    .filter((activity) => {
                        if (selectedMission && !selectedYear && !selectedMonth) {
                            // Only selectedMission is selected
                            return selectedMission === activity.mission?.id;
                        }
                        /*  if (!selectedMission && !selectedYear && !selectedMonth) {
                  // No filter applied, display all activities
                  return true;
                } */
                        return (
                            (selectedMission === activity.mission?.id &&
                                selectedYear === activity.year) ||
                            selectedMonth === activity.month
                        );
                    })
                    .map((activity, i) => (
                        <FormControl sx={{ m: 1, minWidth: 400 }}>
                            <Card
                                key={i}
                                style={{
                                    backgroundColor: '#EEF1FF',
                                    padding: '20px',
                                    width: '100%',
                                    border: '1px solid #ccc',
                                    marginBottom: '20px',
                                }}
                            >
                                <table
                                    className="table_border"
                                    style={{ border: 'none' }}
                                >
                                    <tbody>
                                        <tr style={{ fontWeight: 'bold' }}>
                                            <td style={{ border: 'none' }}>
                                                Libellé: {activity.name} <br />
                                                Valeur: {activity.valeur}
                                            </td>
                                            <td style={{ border: 'none' }}>
                                                Année: {activity.year} <br />
                                                Mois: {activity.month}
                                            </td>
                                        </tr>
                                        <tr style={{ fontWeight: 'bold' }}>
                                            <td style={{ border: 'none' }}>
                                                Type: {activity.type?.name}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </Card>
                        </FormControl>
                    ))}
            </div>
        </div>
    );
};

export default withAuth(CRA);
