// import React, { useState } from "react";
// import { Line } from "react-chartjs-2";
// import "./FuturePrediction.css";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Tooltip,
//   Legend,
// } from "chart.js";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Tooltip,
//   Legend
// );

// const stateCityMap = {
//   "Andhra Pradesh": ["Visakhapatnam", "Guntur", "Nellore", "Kurnool", "Vijayawada"],
//   "Arunachal Pradesh": ["Tawang", "Pasighat", "Ziro", "Itanagar", "Bomdila"],
//   "Assam": ["Guwahati", "Dibrugarh", "Jorhat", "Silchar", "Tezpur"],
//   "Bihar": ["Muzaffarpur", "Bhagalpur", "Gaya", "Purnia", "Patna"],
//   "Chhattisgarh": ["Rajnandgaon", "Raipur", "Durg", "Korba", "Bilaspur"],
//   "Gujarat": ["Rajkot", "Vadodara", "Bhavnagar", "Ahmedabad", "Surat"],
//   "Haryana": ["Panipat", "Faridabad", "Gurugram", "Ambala", "Hisar"],
//   "Himachal Pradesh": ["Kullu", "Solan", "Mandi", "Dharamshala", "Shimla"],
//   "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad", "Hazaribagh", "Bokaro"],
//   "Karnataka": ["Mysuru", "Bengaluru", "Belagavi", "Hubli", "Mangaluru"],
//   "Kerala": ["Thrissur", "Kozhikode", "Thiruvananthapuram", "Kannur", "Kochi"],
//   "Madhya Pradesh": ["Indore", "Jabalpur", "Bhopal", "Gwalior", "Ujjain"],
//   "Maharashtra": ["Pune", "Nagpur", "Nashik", "Mumbai", "Aurangabad"],
//   "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela", "Sambalpur", "Berhampur"],
//   "Punjab": ["Amritsar", "Jalandhar", "Bathinda", "Patiala", "Ludhiana"],
//   "Rajasthan": ["Kota", "Ajmer", "Jodhpur", "Udaipur", "Jaipur"],
//   "Tamil Nadu": ["Coimbatore", "Madurai", "Salem", "Tiruchirappalli", "Chennai"],
//   "Telangana": ["Khammam", "Karimnagar", "Hyderabad", "Warangal", "Nizamabad"],
//   "Uttar Pradesh": ["Kanpur", "Agra", "Varanasi", "Lucknow", "Meerut"],
//   "West Bengal": ["Siliguri", "Durgapur", "Asansol", "Howrah", "Kolkata"]
// };

// const FuturePrediction = () => {
//   const [state, setState] = useState("");
//   const [city, setCity] = useState("");
//   const [futureData, setFutureData] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const BACKEND_URL = "http://localhost:5000/api/future-forecast";

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!state || !city) return alert("Select State and City");

//     setLoading(true);
//     setFutureData([]);

//     const res = await fetch(BACKEND_URL, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ state, city })
//     });

//     const data = await res.json();
//     if (!res.ok) {
//       alert(data.error);
//     } else {
//       setFutureData(data);
//     }
//     setLoading(false);
//   };

//   const trend =
//     futureData.length > 1 &&
//     futureData.at(-1).Predicted_Avg_Addiction_Score >
//       futureData[0].Predicted_Avg_Addiction_Score
//       ? "Increasing"
//       : "Stable";

//   const growth =
//     futureData.length > 1
//       ? (
//           ((futureData.at(-1).Predicted_Avg_Addiction_Score -
//             futureData[0].Predicted_Avg_Addiction_Score) /
//             futureData[0].Predicted_Avg_Addiction_Score) *
//           100
//         ).toFixed(1)
//       : "0";

//   const chartData = {
//     labels: futureData.map((d) => d.Year),
//     datasets: [
//       {
//         label: "Predicted Addiction Score",
//         data: futureData.map((d) => d.Predicted_Avg_Addiction_Score),
//         borderWidth: 3,
//         tension: 0.4,
//         fill: false
//       }
//     ]
//   };

//   return (
//     <div className="future-container">
//       <div className="future-box">
//         <h1>🔮 Future Addiction Forecast</h1>
//         <p className="subtitle">
//           Forecasting addiction trends using time-series modeling
//         </p>

//         {/* FORM */}
//         <form className="location-form" onSubmit={handleSubmit}>
//           <select value={state} onChange={(e) => {
//             setState(e.target.value);
//             setCity("");
//           }}>
//             <option value="">Select State</option>
//             {Object.keys(stateCityMap).map(st => (
//               <option key={st}>{st}</option>
//             ))}
//           </select>

//           <select value={city} onChange={(e) => setCity(e.target.value)} disabled={!state}>
//             <option value="">Select City</option>
//             {state && stateCityMap[state].map(ct => (
//               <option key={ct}>{ct}</option>
//             ))}
//           </select>

//           <button type="submit">
//             {loading ? "Predicting..." : "Predict Future"}
//           </button>
//         </form>

//         {/* SUMMARY */}
//         {futureData.length > 0 && (
//           <div className="summary">
//             <div className="card"><h3>📍 Location</h3><p>{city}, {state}</p></div>
//             <div className="card"><h3>📈 Trend</h3><p>{trend}</p></div>
//             <div className="card"><h3>🚀 Growth</h3><p>{growth}%</p></div>
//           </div>
//         )}

//         {/* CHART */}
//         {futureData.length > 0 && (
//           <div className="chart-box">
//             <Line data={chartData} />
//           </div>
//         )}

//         {/* TABLE */}
//         {futureData.length > 0 && (
//           <table>
//             <thead>
//               <tr><th>Year</th><th>Predicted Score</th></tr>
//             </thead>
//             <tbody>
//               {futureData.map((row, i) => (
//                 <tr key={i}>
//                   <td>{row.Year}</td>
//                   <td>{row.Predicted_Avg_Addiction_Score.toFixed(2)}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}

//         {/* INSIGHT */}
//         {futureData.length > 0 && (
//           <div className="insight">
//             <h3>🧠 Interpretation</h3>
//             <p>
//               The addiction score in <b>{city}</b> shows a <b>{trend.toLowerCase()}</b> trend.
//               Without intervention, long-term digital well-being risks may rise over
//               the next decade.
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FuturePrediction;
import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import "./FuturePrediction.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
);

const stateCityMap = {
  "Andhra Pradesh": ["Visakhapatnam", "Guntur", "Nellore", "Kurnool", "Vijayawada"],
  "Arunachal Pradesh": ["Tawang", "Pasighat", "Ziro", "Itanagar", "Bomdila"],
  "Assam": ["Guwahati", "Dibrugarh", "Jorhat", "Silchar", "Tezpur"],
  "Bihar": ["Muzaffarpur", "Bhagalpur", "Gaya", "Purnia", "Patna"],
  "Chhattisgarh": ["Rajnandgaon", "Raipur", "Durg", "Korba", "Bilaspur"],
  "Gujarat": ["Rajkot", "Vadodara", "Bhavnagar", "Ahmedabad", "Surat"],
  "Haryana": ["Panipat", "Faridabad", "Gurugram", "Ambala", "Hisar"],
  "Himachal Pradesh": ["Kullu", "Solan", "Mandi", "Dharamshala", "Shimla"],
  "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad", "Hazaribagh", "Bokaro"],
  "Karnataka": ["Mysuru", "Bengaluru", "Belagavi", "Hubli", "Mangaluru"],
  "Kerala": ["Thrissur", "Kozhikode", "Thiruvananthapuram", "Kannur", "Kochi"],
  "Madhya Pradesh": ["Indore", "Jabalpur", "Bhopal", "Gwalior", "Ujjain"],
  "Maharashtra": ["Pune", "Nagpur", "Nashik", "Mumbai", "Aurangabad"],
  "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela", "Sambalpur", "Berhampur"],
  "Punjab": ["Amritsar", "Jalandhar", "Bathinda", "Patiala", "Ludhiana"],
  "Rajasthan": ["Kota", "Ajmer", "Jodhpur", "Udaipur", "Jaipur"],
  "Tamil Nadu": ["Coimbatore", "Madurai", "Salem", "Tiruchirappalli", "Chennai"],
  "Telangana": ["Khammam", "Karimnagar", "Hyderabad", "Warangal", "Nizamabad"],
  "Uttar Pradesh": ["Kanpur", "Agra", "Varanasi", "Lucknow", "Meerut"],
  "West Bengal": ["Siliguri", "Durgapur", "Asansol", "Howrah", "Kolkata"]
};

const FuturePrediction = () => {
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [futureData, setFutureData] = useState([]);
  const [loading, setLoading] = useState(false);

  const BACKEND_URL = "http://localhost:5000/api/future-forecast";

  // Helper function to get level and color
  const getAddictionLevel = (score) => {
    if (score < 40) return { label: "Low", color: "#22c55e" }; // Green
    if (score < 70) return { label: "Medium", color: "#f59e0b" }; // Amber/Orange
    return { label: "High", color: "#ef4444" }; // Red
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!state || !city) return alert("Select State and City");

    setLoading(true);
    setFutureData([]);

    try {
      const res = await fetch(BACKEND_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ state, city })
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.error);
      } else {
        setFutureData(data);
      }
    } catch (err) {
      alert("Error connecting to backend.");
    }
    setLoading(false);
  };

  const startVal = futureData[0]?.Predicted_Avg_Addiction_Score || 0;
  const endVal = futureData.at(-1)?.Predicted_Avg_Addiction_Score || 0;
  const trend = endVal > startVal ? "Increasing" : "Stable/Decreasing";
  const growth = startVal !== 0 ? (((endVal - startVal) / startVal) * 100).toFixed(1) : "0";

  const allPoints = futureData.flatMap(d => [d.Predicted_Avg_Addiction_Score, d.Upper_Bound, d.Lower_Bound]);
  const minVal = Math.min(...allPoints);
  const maxVal = Math.max(...allPoints);

  const chartData = {
    labels: futureData.map((d) => d.Year),
    datasets: [
      {
        label: "Predicted Score",
        data: futureData.map((d) => d.Predicted_Avg_Addiction_Score),
        borderColor: "#6366f1",
        backgroundColor: "#6366f1",
        borderWidth: 4,
        tension: 0.4,
        pointRadius: 5,
        fill: false,
        zIndex: 3
      },
      {
        label: "Upper Bound",
        data: futureData.map((d) => d.Upper_Bound),
        borderColor: "transparent",
        backgroundColor: "rgba(99, 102, 241, 0.1)",
        pointRadius: 0,
        fill: "+1",
        zIndex: 1
      },
      {
        label: "Lower Bound",
        data: futureData.map((d) => d.Lower_Bound),
        borderColor: "transparent",
        backgroundColor: "rgba(99, 102, 241, 0.1)",
        pointRadius: 0,
        fill: false,
        zIndex: 1
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { filter: (item) => !item.text.includes('Bound') }
      },
      tooltip: { mode: 'index', intersect: false }
    },
    scales: {
      y: {
        min: Math.floor(minVal - 5) < 0 ? 0 : Math.floor(minVal - 5),
        max: Math.ceil(maxVal + 5) > 100 ? 102 : Math.ceil(maxVal + 5),
        title: { display: true, text: "Addiction Index (%)" },
        grid: { color: "rgba(0,0,0,0.05)" }
      },
      x: { grid: { display: false } }
    },
    layout: { padding: { top: 10, bottom: 10, left: 10, right: 10 } }
  };

  return (
    <div className="future-container">
      <div className="future-box">
        <h1>🔮 Future Addiction Forecast</h1>
        <p className="subtitle">Forecasting addiction trends using time-series modeling</p>

        <form className="location-form" onSubmit={handleSubmit}>
          <select value={state} onChange={(e) => { setState(e.target.value); setCity(""); }}>
            <option value="">Select State</option>
            {Object.keys(stateCityMap).map(st => <option key={st}>{st}</option>)}
          </select>

          <select value={city} onChange={(e) => setCity(e.target.value)} disabled={!state}>
            <option value="">Select City</option>
            {state && stateCityMap[state].map(ct => <option key={ct}>{ct}</option>)}
          </select>

          <button type="submit">{loading ? "Predicting..." : "Predict Future"}</button>
        </form>

        {futureData.length > 0 && (
          <>
            <div className="summary">
              <div className="card"><h3>📍 Location</h3><p>{city}, {state}</p></div>
              <div className="card"><h3>📈 Trend</h3><p style={{color: trend === "Increasing" ? "#ef4444" : "#22c55e"}}>{trend}</p></div>
              <div className="card"><h3>🚀 Growth</h3><p>{growth}%</p></div>
            </div>

            <div className="chart-box" style={{ height: "400px", marginTop: "20px" }}>
              <Line data={chartData} options={chartOptions} />
            </div>

            <table>
              <thead>
                <tr>
                  <th>Year</th>
                  <th>Predicted Score</th>
                  <th>Addiction Level</th>
                </tr>
              </thead>
              <tbody>
                {futureData.map((row, i) => {
                  const level = getAddictionLevel(row.Predicted_Avg_Addiction_Score);
                  return (
                    <tr key={i}>
                      <td>{row.Year}</td>
                      <td style={{ fontWeight: 'bold' }}>{row.Predicted_Avg_Addiction_Score.toFixed(2)}</td>
                      <td>
                        <span style={{ 
                          color: level.color,  
                          padding: '4px 10px', 
                          fontSize: '0.85em',
                          fontWeight: 'bold',
                          display: 'inline-block',
                          minWidth: '70px',
                          textAlign: 'center'
                        }}>
                          {level.label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className="insight">
              <h3>🧠 Interpretation</h3>
              <p>
                In <b>{city}</b>, addiction levels show an <b>{trend.toLowerCase()}</b> trend. 
                Predicted to reach {endVal.toFixed(1)}% by {futureData.at(-1).Year}.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FuturePrediction;