import { useState } from "react";
import axios from "axios";

function App() {
  const [user,setUser] = useState("");
  const [pass,setPass] = useState("");
  const [logged,setLogged] = useState(false);
  const [progress, setProgress] = useState("");
  const [delay, setDelay] = useState("");
  const [experience, setExperience] = useState("");
  const [result, setResult] = useState("");

  const API_URL = 'https://web-production-4bf8.up.railway.app';

  const login = async () => {
    try {
      const res = await axios.post(`${API_URL}/login?username=${user}&password=${pass}`);
      localStorage.setItem("token", res.data.token);
      setLogged(true);
    } catch {
      alert("Login failed! Try: admin / 1234");
    }
  };

  const predict = async () => {
    try {
      const res = await axios.post(`${API_URL}/predict`, {
        progress: parseInt(progress),
        delay: parseInt(delay),
        experience: parseInt(experience),
      }, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
      });
      setResult(res.data.risk);
    } catch {
      alert("Prediction failed!");
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
             placeholder="Progress % (0-100)" onChange={(e)=>setProgress(e.target.value)} />
      <input style={{display:'block',margin:'10px auto',padding:'10px',width:'250px'}} 
             placeholder="Delay days (0-30)" onChange={(e)=>setDelay(e.target.value)} />
      <input style={{display:'block',margin:'10px auto',padding:'10px',width:'250px'}} 
             placeholder="Experience years (0-10)" onChange={(e)=>setExperience(e.target.value)} />
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
    </div>
  );
}

export default App;
