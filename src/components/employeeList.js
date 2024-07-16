import React, { useState } from "react";
import "./App.css";
import data from "./mock-data.jason";

const App = () => {
    const[contacts,setContacts] = useState(data);

    return
     <div className="app-container">
    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Cellnumber</th>
                <th>ID Number</th>
                <th>Position</th>
            </tr>
        </thead>
        <tbody>
           {contacts.map(() => (
          <tr>
            <td>Ayanda</td>
            <td>ayandasontlhaba6@gmail.com</td>
            <td>0651518227</td>
            <td>9507290240089</td>
            <td>IT Technician</td>
            </tr>
           ))}  
        </tbody>
        </table>
    </div>
};
