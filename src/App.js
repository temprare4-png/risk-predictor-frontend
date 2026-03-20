import { useState } from "react";

function App() {
  const [user,setUser] = useState("");
  const [pass,setPass] = useState("");
  const [logged,setLogged] = useState(false);
  const [progress, setProgress] = useState("80");
  const [delay, setDelay] = useState("2");
  const [experience, setExperience] = useState("5");
  const [result, setResult] = useState("");

  const API_URL = 'https://web-production-4bf8.up.railway.app';

  const login = async () => {
    try {
      const res = await fetch(`${API_URL}/login?username=${user}&password=${pass}`);
      const data = await res.json();
      localStorage.setItem("token", data.token);
      setLogged(true);
      alert("✅ Login success!");
    } catch {
      alert("❌ Login failed! admin/1234");
    }
  };

  const predict = async () => {
    const token = localStorage.getItem("token");
    alert(`Token: ${token ? "✅ OK" : "❌ MISSING"}`);
    
    try {
      const res = await fetch(`${API_URL}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
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
      alert("❌ Prediction failed - check backend!");
    }
  };

  const style = {
    backgroundColor:"#121212",
    color:"white",
    minHeight:"100vh",
    padding:"50px 20px",
    textAlign:"center"
  };

  if(!logged){
    return (
      <div style={style}>
        <h1>🔐 Login</h1>
        <p><small>admin / 1234</small></p>
        <input style={{display:'block',margin:'10px auto',padding:'10px',width:'250px'}} 
               placeholder="Username" onChange={(e)=>setUser(e.target.value)} />
        <input style={{display:'block',margin:'10px auto',padding:'10px',width:'250px'}} 
               type="password" placeholder="Password" onChange={(e)=>setPass(e.target.value)} />
        <button style={{padding:'12px 30px',fontSize:'16px',background:'#007bff',color:'white',border:'none',borderRadius:'5px'}} 
                onClick={login}>Login</button>
      </div>
    );
  }

  return (
    <div style={style}>
      <h1>🏗️ Project Risk Predictor</h1>
      <input style={{display:'block',margin:'10px auto',padding:'10px',width:'250px'}} 
             value={progress} onChange={(e)=>setProgress(e.target.value)} placeholder="Progress %"/>
      <input style={{display:'block',margin:'10px auto',padding:'10px',width:'250px'}} 
             value={delay} onChange={(e)=>setDelay(e.target.value)} placeholder="Delay days"/>
      <input style={{display:'block',margin:'10px auto',padding:'10px',width:'250px'}} 
             value={experience} onChange={(e)=>setExperience(e.target.value)} placeholder="Experience"/>
      <button style={{padding:'12px 30px',fontSize:'16px',background:'#28a745',color:'white',border:'none',borderRadius:'5px',marginTop:'20px'}} 
              onClick={predict}>Predict Risk 🚀</button>
      {result && (
        <h2 style={{ 
          color: result==="Low" ? "green" : result==="Medium" ? "orange" : "red",
          marginTop: "30px"
        }}>
          {result} Risk ⚠️
        </h2>
      )}
      <button style={{padding:'8px 20px',background:'#6c757d',color:'white',border:'none',borderRadius:'5px',marginTop:'20px'}} 
              onClick={() => {localStorage.clear(); window.location.reload();}}>Logout</button>
    </div>
  );
}

export default App;
