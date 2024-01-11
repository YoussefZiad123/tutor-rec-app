import "./styles.css"
import { FormControl, InputLabel, TextField, FormLabel, Slider, Box, RadioGroup, FormControlLabel, Radio, Select, OutlinedInput, MenuItem, SelectChangeEvent, Button } from '@mui/material';
import React, { useEffect } from "react";
import axios from 'axios';

export default function TutorPreferenceScreen() {

    var allLanguages: any[] = []

    const [suitableTimes, setSuitableTimes] = React.useState("");
    const [unsuitableTimes, setUnsuitableTimes] = React.useState("");
    const [additionalComments, setAdditionalComments] = React.useState("");

    const [age, setAge] = React.useState<number[]>([18, 120]);
    const [gender, setGender] = React.useState('female');

    const [languages, setLanguages] = React.useState<string[]>([]);
    const [countries, setCountries] = React.useState<string[]>([]);
    const [educations, setEducations] = React.useState<string[]>([]);
    const [certifications, setCertifications] = React.useState<string[]>([]);

    const handleAgeChange = (event: Event, newAge: number | number[]) => {
        setAge(newAge as number[]);
    };



    const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGender((event.target as HTMLInputElement).value);
    };

    const handleLanguagesChange = (event: SelectChangeEvent<typeof languages>) => {
        const {
            target: { value },
        } = event;
        setLanguages(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleCountriesChange = (event: SelectChangeEvent<typeof countries>) => {
        const {
            target: { value },
        } = event;
        setCountries(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleEducationsChange = (event: SelectChangeEvent<typeof educations>) => {
        const {
            target: { value },
        } = event;
        setEducations(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleCertificationsChange = (event: SelectChangeEvent<typeof certifications>) => {
        const {
            target: { value },
        } = event;
        setCertifications(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const populateLanguages = async () => {
        axios.get("http://localhost:3002/api/languages").then((res) => {
            allLanguages = res.data;
            console.log(allLanguages)
        })
    };

    useEffect(() => {
        populateLanguages();
    })


    return (
        <center>
            <FormControl>
                <FormLabel htmlFor="suitable-times" focused={false}>
                    Describe what time of the week is most suitable for your lessons
                </FormLabel>
                <TextField id="suitable-times" value={suitableTimes} onChange={(e) => { setSuitableTimes(e.target.value) }} />
                <FormLabel htmlFor="unsuitable-times" focused={false}>
                    Describe what time of the week is not suitable for your lessons
                </FormLabel>
                <TextField id="unsuitable-times" value={unsuitableTimes} onChange={(e) => { setUnsuitableTimes(e.target.value) }} />
                <div className="rowC">
                    <FormLabel focused={false}>
                        Age
                    </FormLabel>
                    <Box sx={{ width: '85%' }} margin={2}>
                        <Slider min={18} max={120} value={age} onChange={handleAgeChange} valueLabelDisplay="auto" />
                    </Box>
                </div>
                <div className="rowC">
                    <FormLabel focused={false}>
                        Gender
                    </FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={gender}
                        onChange={handleGenderChange}
                    >
                        <div className="rowC">
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                        </div>
                    </RadioGroup>
                </div>
                <div className="rowC">
                    <FormLabel focused={false}>
                        Languages
                    </FormLabel>
                    <Select
                        multiple
                        value={languages}
                        onChange={handleLanguagesChange}

                    >
                        <MenuItem key="Arabic" value="Arabic">
                            Arabic
                        </MenuItem>
                        <MenuItem key="English" value="English">
                            English
                        </MenuItem>
                    </Select>
                </div>
                <div className="rowC">
                    <FormLabel focused={false}>
                        Countries
                    </FormLabel>
                    <Select
                        multiple
                        value={countries}
                        onChange={handleCountriesChange}

                    >
                        <MenuItem key="Egypt" value="Egypt">
                            Egypt
                        </MenuItem>
                        <MenuItem key="Syria" value="Syria">
                            Syria
                        </MenuItem>
                        <MenuItem key="UK" value="UK">
                            UK
                        </MenuItem>
                        <MenuItem key="USA" value="USA">
                            USA
                        </MenuItem>
                    </Select>
                </div>
                <div className="rowC">
                    <FormLabel focused={false}>
                        Education
                    </FormLabel>
                    <Select
                        multiple
                        value={educations}
                        onChange={handleEducationsChange}

                    >
                        <MenuItem key="Azhari" value="Azhari">
                            Azhari
                        </MenuItem>
                        <MenuItem key="IG" value="IG">
                            IG
                        </MenuItem>
                    </Select>
                </div>
                <div className="rowC">
                    <FormLabel focused={false}>
                        Certifications
                    </FormLabel>
                    <Select
                        multiple
                        value={certifications}
                        onChange={handleCertificationsChange}

                    >
                        <MenuItem key="Hafs" value="Hafs">
                            Hafs
                        </MenuItem>
                        <MenuItem key="Warsh" value="Warsh">
                            Warsh
                        </MenuItem>
                    </Select>
                </div>
                <FormLabel htmlFor="additional-comments" focused={false}>
                    Describe, in your own words, any additional comments about how you would like your tutor to be
                </FormLabel>
                <TextField id="additional-comments" value={additionalComments} onChange={(e) => { setAdditionalComments(e.target.value) }} />
                <Button
                    onClick={() => {
                        axios.patch("http://localhost:3002/api/users/659c59916d3be2acefe752ef/user-tutor-preferences",
                            {
                                "suitableTimes": suitableTimes,
                                "unsuitableTimes": unsuitableTimes,
                                "lowerAgeBound": age[0],
                                "upperAgeBound": age[1],
                                "gender": "MALE",
                                "languages": languages,
                                "countries": countries,
                                "educations": educations,
                                "certifications": certifications,
                                "additionalComments": additionalComments
                            })
                    }}
                >Submit</Button>
            </FormControl>
        </center>
    );
}




