import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import WeeklyForecast from '../components/WeeklyForecast/WeeklyForecast';
import TodayWeather from '../components/TodayWeather/TodayWeather';
import { fetchWeatherData } from '../api/OpenWeatherService';
import { transformDateFormat } from '../utilities/DatetimeUtils';
import LoadingBox from '../components/Reusable/LoadingBox';
import { ALL_DESCRIPTIONS } from '../utilities/DateConstants';
import {
    getTodayForecastWeather,
    getWeekForecastWeather,
} from '../utilities/DataUtils';

const Weather = () => {
    const [todayWeather, setTodayWeather] = useState(null);
    const [todayForecast, setTodayForecast] = useState([]);
    const [weekForecast, setWeekForecast] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const searchChangeHandler = async (enteredData = {
        label: "Lahore, PK",
        value: "31.549722222 74.343611111"
    }) => {
        const [latitude, longitude] = enteredData.value.split(' ');

        setIsLoading(true);

        const currentDate = transformDateFormat();
        const date = new Date();
        let dt_now = Math.floor(date.getTime() / 1000);

        try {
            const [todayWeatherResponse, weekForecastResponse] =
                await fetchWeatherData(latitude, longitude);
            const all_today_forecasts_list = getTodayForecastWeather(
                weekForecastResponse,
                currentDate,
                dt_now
            );

            const all_week_forecasts_list = getWeekForecastWeather(
                weekForecastResponse,
                ALL_DESCRIPTIONS
            );

            setTodayForecast([...all_today_forecasts_list]);
            setTodayWeather({ city: enteredData.label, ...todayWeatherResponse });
            setWeekForecast({
                city: enteredData.label,
                list: all_week_forecasts_list,
            });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        searchChangeHandler();
    }, [])


    let appContent = (
        <></>
    );

    if (todayWeather && todayForecast && weekForecast) {
        appContent = (
            <React.Fragment>
                <Grid item xs={12} md={todayWeather ? 6 : 12}>
                    <Grid item xs={12}>
                        <TodayWeather data={todayWeather} forecastList={todayForecast} />
                    </Grid>
                </Grid>
                <Grid item xs={12} md={6}>
                    <WeeklyForecast data={weekForecast} />
                </Grid>
            </React.Fragment>
        );
    }

    if (isLoading) {
        appContent = (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    minHeight: '500px',
                }}
            >
                <LoadingBox value="1">
                    <Typography
                        variant="h3"
                        component="h3"
                        sx={{
                            fontSize: { xs: '10px', sm: '12px' },
                            color: 'rgba(255, 255, 255, .8)',
                            lineHeight: 1,
                            fontFamily: 'Poppins',
                        }}
                    >
                        Loading...
                    </Typography>
                </LoadingBox>
            </Box>
        );
    }

    return (
        <Container
            sx={{
                maxWidth: { xs: '95%', sm: '80%', md: '1100px' },
                width: '100%',
                height: '100%',
                margin: '0 auto',
                marginTop: '50px',
                padding: '1rem 0 3rem',
                marginBottom: '1rem',
                borderRadius: {
                    xs: 'none',
                    sm: '1rem 1rem',
                },
                boxShadow: {
                    xs: 'none',
                    sm: 'rgba(0,0,0, 0.5) 0px 10px 15px 1px, rgba(0,0,0, 0.5) 0px 4px 6px 1px',
                },
            }}
        >
            <Grid container columnSpacing={2}>
                {appContent}
            </Grid>
        </Container>
    );
}

export default Weather;
