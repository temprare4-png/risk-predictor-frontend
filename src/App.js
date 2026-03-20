import { useState } from "react";

function App() {
  const [progress, setProgress] = useState("80");
  const [delay, setDelay] = useState("2");
  const [experience, setExperience] = useState("5");
  const [result, setResult] = useState("");

  const API_URL = 'https://web-production-4bf8.up.railway.app';

  const predict = async () => {
    try {
      const res = await fetch(`${API_URL}/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          progress: parseInt(progress),
          delay: parseInt(delay),
          experience: parseInt(experience)
        })
      });
      
      const data = await res.json();
      setResult(data.risk);
      alert(`✅ ${data.risk} Risk!`);
    } catch (error) {
      alert("❌ Error - check connection");
    }
  };

  const style = {
    backgroundColor:"#121212",
    color:"white",
    minHeight:"100vh",
    padding:"50px 20px",
    textAlign:"center"
  };

  return (
    <div style={style}>
      <h1>🏗️ Project Risk Predictor</h1>
      <p><small>Full-stack ML Demo - Production Ready!</small></p>
      <input style={{display:'block',margin:'10px auto',padding:'10px',width:'250px'}} 
             value={progress} onChange={(e)=>setProgress(e.target.value)} placeholder="Progress % (0-100)"/>
      <input style={{display:'block',margin:'10px auto',padding:'10px',width:'250px'}} 
             value={delay} onChange={(e)=>setDelay(e.target.value)} placeholder="Delay days (0-30)"/>
      <input style={{display:'block',margin:'10px auto',padding:'10px',width:'250px'}} 
             value={experience} onChange={(e)=>setExperience(e.target.value)} placeholder="Experience years (0-10)"/>
      <button style={{padding:'15px 40px',fontSize:'18px',background:'#28a745',color:'white',border:'none',borderRadius:'8px',marginTop:'30px'}} 
              onClick={predict}>🚀 Predict Risk</button>
      {result && (
        <h2 style={{ 
          color: result==="Low" ? "#4CAF50" : result==="Medium" ? "#FF9800" : "#F44336",
          marginTop: "40px",
          fontSize: "2.5em"
        }}>
          {result} Risk ⚠️
        </h2>
      )}
      <div style={{marginTop:"50px", fontSize:"14px"}}>
        <p>Backend: FastAPI + Scikit-learn</p>
        <p>Frontend: React + Vercel</p>
        <p>Hosting: Railway + Vercel</p>
      </div>
    </div>
  );
}

export default App;
