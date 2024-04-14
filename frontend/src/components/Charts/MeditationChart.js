import React, { useEffect, useState } from 'react';
import { database } from '../../firebase_setup/firebase';
import { useNavigate } from 'react-router-dom';
import { get, ref } from 'firebase/database';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import './Chart.css';

const MeditationChart = () => {
  const [meditationsData, setMeditationsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState(new Date('2024-01-01'));
  const [endDate, setEndDate] = useState(new Date('2024-04-30')); // Adjust as needed
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = () => {
      const userToken = localStorage.getItem('userToken');
      if (!userToken) {
        navigate('/signup');
        return;
      }
      const userId = localStorage.getItem('uid');
      const userRef = ref(database, `/users/${userId}/streaks/boxBreathingstreak`);

      get(userRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            const formattedData = Object.values(data).map(({ date, count }) => ({
              date,
              count: parseInt(count),
            }));
            setMeditationsData(formattedData);
          } else {
            console.log('No data available');
            setMeditationsData([]);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching meditation data:', error);
          setLoading(false);
        });
    };
    fetchData();
  }, [navigate]);

  const handlePreviousMonths = () => {
    const newStartDate = new Date(startDate);
    const newEndDate = new Date(endDate);
    newStartDate.setMonth(newStartDate.getMonth() - 3);
    newEndDate.setMonth(newEndDate.getMonth() - 3);
    setStartDate(newStartDate);
    setEndDate(newEndDate);
  };

  const handleNextMonths = () => {
    const newStartDate = new Date(startDate);
    const newEndDate = new Date(endDate);
    newStartDate.setMonth(newStartDate.getMonth() +3);
    newEndDate.setMonth(newEndDate.getMonth() +3);
    setStartDate(newStartDate);
    setEndDate(newEndDate);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className='custom-container'>
        <button onClick={handlePreviousMonths} className='heatmap-button'>{'<'}</button>
        <CalendarHeatmap
          startDate={startDate}
          endDate={endDate}
          values={meditationsData}
          classForValue={(value) => {
            if (!value) {
              return 'color-empty';
            }
            if (value.count === 0) {
              return 'color-no-contribution';
            }
            if (value.count < 3) {
              return 'color-low-contribution';
            }
            if (value.count < 5) {
              return 'color-medium-contribution';
            }
            return 'color-high-contribution';
          }}
          titleForValue={(value) => (value ? `${value.date}: ${value.count}` : `No data`)}
        />
        <button onClick={handleNextMonths} className='heatmap-button'>{'>'}</button>
    </div>
  );
};

export default MeditationChart;
