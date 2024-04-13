import React, { useEffect, useState } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { database } from '../../firebase_setup/firebase';
import { useNavigate } from 'react-router-dom';
import { get, ref } from 'firebase/database';
import './Chart.css';

const MeditationChart = () => {
  const [meditationsData, setMeditationsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(new Date('2024-04-01'));
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchData = () => {
      const userToken = localStorage.getItem('userToken');
      if (!userToken) {
        navigate('/signup');
        return;
      }
      const userId = localStorage.getItem('uid');
      const userRef = ref(database, `/users/${userId}/streaks/boxBreathingStreak`);
      get(userRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            const chartDataArray = Object.entries(data)
              .filter(([date]) => new Date(date).getFullYear() === currentMonth.getFullYear() && new Date(date).getMonth() === currentMonth.getMonth())
              .map(([date, count]) => ({
                date,
                count,
              }));
            setMeditationsData(chartDataArray);
            console.log('Meditations data:', chartDataArray[0]);
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
  }, [navigate, currentMonth]);

  const getClassNameForValue = (value) => {
    if (!value || value.count === 0) {
      return 'color-empty';
    } else if (value.count === 1) {
      return 'color-scale-1';
    } else if (value.count === 2) {
      return 'color-scale-2';
    } else if (value.count >= 3) {
      return 'color-scale-3';
    }
  };

  const getTooltipDataAttrs = (value) => {
    return value
      ? {
          'data-count': value.count,
        }
      : {};
  };

  const handlePreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  const startDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
  const endDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
  console.log('startDate:', startDate);

  return (
    <div>
      <h2>My Heatmap</h2>
      <div className="heatmap-container">
        <button onClick={handlePreviousMonth} className="heatmap-button-left">
          Previous Month
        </button>
        <span>{new Date(currentMonth).toLocaleDateString('default', { month: 'long', year: 'numeric' })}</span>
        <button onClick={handleNextMonth} className="heatmap-button-right">
          Next Month
        </button>
        <div className="calendar-heatmap">
        <CalendarHeatmap
          startDate={startDate}
          endDate={endDate}
          values={meditationsData}
          showWeekdayLabels={true}
          horizontal={false}
          titleForValue={(value) => (value ? `${value.date}: ${value.count}` : null)}
          classForValue={getClassNameForValue}
          tooltipDataAttrs={getTooltipDataAttrs}
        />
        </div>
      </div>
    </div>
  );
};

export default MeditationChart;
