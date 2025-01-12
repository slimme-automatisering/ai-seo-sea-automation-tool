import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const KeywordRankings = () => {
  const data = [
    { date: '2024-01-01', position: 12, visibility: 65 },
    { date: '2024-01-02', position: 10, visibility: 68 },
    // ... meer data
  ];

  return (
    <>
      <h6>Keyword Rankings Trend</h6>
      <LineChart width={800} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis yAxisId="left" />
        <YAxis yAxisId="right" orientation="right" />
        <Tooltip />
        <Legend />
        <Line 
          yAxisId="left"
          type="monotone" 
          dataKey="position" 
          stroke="#2196f3" 
          name="Positie"
        />
        <Line 
          yAxisId="right"
          type="monotone" 
          dataKey="visibility" 
          stroke="#ff9800" 
          name="Zichtbaarheid"
        />
      </LineChart>
    </>
  );
};

export default KeywordRankings;
