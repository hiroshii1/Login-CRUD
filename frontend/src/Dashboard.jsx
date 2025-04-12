import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Button } from "@mui/material";
import axios from "axios";
 

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (storedUser) {
      setUser(storedUser);
    } else {
      navigate("/login");
    }
  }, [navigate]);



 const API_URL = "http://localhost:5000/api/items";
 
 
  
 
   // fetch items from API
 
   useEffect(() => {
     axios
       .get(API_URL)
       .then(response => setItems(response.data))
       .catch(error => console.error("Error Fetching Item:", error));
   }, []);
 
   // Add 

   const addItem = () => {
    axios
      .post(API_URL, { name: newItem })
      .then(response => {
        setItems([...items, response.data]); 
        setNewItem(""); 
      })
      .catch(error => console.error("Error Adding Item:", error));
  };
  
 
    // Update 

    const updateItem = (id, name) => {
     axios
       .put(`${API_URL}/${id}`, { name })
       .then(response => {
             setItems(items.map(item => (item.id === id ? response.data : item)));
         })
        .catch(error => console.error("Error updating item:", error));
 };

   // Delete
 
   const deleteItem = (id) => {
     axios
      .delete(`${API_URL}/${id}`)
      .then(() => {
         setItems(items.filter(item => item.id !== id));
       })
      .catch((error) => console.error("Error Deleting Item:", error));
   };
 
   return (
    <div style={{ backgroundColor: "lightblue", minHeight: "100vh", width: "100vw", }}>
       <Typography style={{fontColor: "black"}} variant="h2">Welcome, {user}!</Typography>
       <h1>React + Express REST API</h1>
       
       <input type="text" value={newItem} onChange={(e) => setNewItem(e.target.value)} placeholder="Add Item" />
       <button style={{ 
        backgroundColor: "green"}} 
        onClick={addItem}>Add Item</button>
        
       <ul>
               {items.map(item => (
                   <li key={item.id}>
                    <input
                    type="text"
                    value={item.name}
                    onChange={(e) => updateItem(item.id, e.target.value)}
                    />

                   <button onClick={() => deleteItem(item.id)} style={{ 
                    backgroundColor: "red", 
                    border: "2px solid black"}}>Delete</button>
                </li>
                 ))}
             </ul>
  
    <Button
      variant="contained"
      color="secondary"
      onClick={() => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        navigate("/login");
      }}
    >Logout </Button>
    </div>
   );
 };
 

 export default Dashboard; 