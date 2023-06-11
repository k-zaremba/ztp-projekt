import React, {useEffect, useState} from 'react';
import ClassificationComponent from './ClassificationComponent';
import {Card, Typography} from "@mui/material";

const API_URL = 'http://127.0.0.1:8000/classifications?limit=5';
const REFRESH_INTERVAL = 15000; // 15 sekund

interface ClassificationData {
    _id: string;
    class: number;
    probability: number;
    timestamp: number;
}

const RecentClassificationsComponent: React.FC = () => {
    const [classifications, setClassifications] = useState<ClassificationData[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(API_URL);
                const data = await response.json();
                setClassifications(data);
            } catch (error) {
                console.error('Błąd pobierania danych:', error);
            }
        };

        fetchData();
        const intervalId = setInterval(fetchData, REFRESH_INTERVAL);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return (
        <Card sx={{
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            border: '1px solid #071013',
            marginTop: "32px"
        }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Ostatnie 5 klasyfikacji
            </Typography>
            {classifications.map((classification) => (
                <ClassificationComponent key={classification._id} data={classification}/>
            ))}
        </Card>
    );
};

export default RecentClassificationsComponent;
