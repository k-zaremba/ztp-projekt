import React from 'react';
import {Typography, Grid} from "@mui/material";

interface ClassificationData {
    _id: string;
    class: number;
    probability: number;
    timestamp: number;
}

interface Props {
    data: ClassificationData;
}

const ClassificationComponent: React.FC<Props> = ({data}) => {
    const getClassificationMessage = () => {
        return data.class === 1 ? 'Fałszywy banknot' : 'Autentyczny banknot';
    };

    const getProbabilityPercentage = () => {
        const percentage = (data.probability * 100).toFixed(2);
        return `Prawdopodobieństwo: ${percentage}%`;
    };

    const getFormattedTimestamp = () => {
        const date = new Date(data.timestamp * 1000);
        return `Data klasyfikacji: ${date.toLocaleString()}`;
    };

    return (
        <Grid justifyContent="center">
            <Typography variant="h5" gutterBottom>
                {getFormattedTimestamp()}
            </Typography>
            <Typography variant="body1" gutterBottom>
                {getClassificationMessage()}
            </Typography>
            <Typography variant="body1" gutterBottom>
                {getProbabilityPercentage()}
            </Typography>
        </Grid>
    );
};

export default ClassificationComponent;
