import "./styles.css"
import { FormControl, InputLabel, TextField, FormLabel, Slider, Box, RadioGroup, FormControlLabel, Radio, Select, OutlinedInput, MenuItem, SelectChangeEvent, Button } from '@mui/material';
import React, { useEffect } from "react";
import axios from 'axios';
import TutorCard from "../components/tutorCard";

export default function RecommendationScreen() {


    const [recommendedTutors, setRecommendedTutors] = React.useState({ recommendations: [] });

    useEffect(() => {

    }, [recommendedTutors])


    return (
        <center>
            <Button
                onClick={() => {
                    axios.post("http://localhost:3002/api/users/659c59916d3be2acefe752ef/recommendation").then((res) => {
                        console.log(res.data.content);
                        setRecommendedTutors(JSON.parse(res.data.content));
                        console.log(recommendedTutors);
                    })
                }}>Get Recommendations</Button>
            {recommendedTutors.recommendations.map((rec: any) => { return <TutorCard tutor={rec} /> })}
        </center>
    );
}




