import React, { useState, useEffect } from 'react';
import "./form.css";


function Form() {
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    gender: '',
    email: '',
    phone: '',
    position: '',
    id: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentEmployeeId, setCurrentEmployeeId] = useState('');
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(true);
  const [showList, setShowList] = useState(false);

  // Load employees from local storage on component mount
  useEffect(() => {
    const storedEmployees = JSON.parse(localStorage.getItem('employees')) || [];
    setEmployees(storedEmployees);
  }, []);

  // Save employees to local storage whenever the employees state changes
  useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(employees));
  }, [employees]);

  const validateInputs = () => {
    if (!newEmployee.name) return 'Name is required.';
    if (!newEmployee.email || !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(newEmployee.email)) return 'Invalid email address.';
    if (!newEmployee.phone || !/^\d+$/.test(newEmployee.phone)) return 'Phone number should contain only digits.';
    if (!newEmployee.gender) return 'Gender is required.';
    if (!newEmployee.position) return 'Position is required.';
    if (!newEmployee.id || !/^\d{13}$/.test(newEmployee.id)) return 'ID should be exactly 13 digits.';
    return '';
  };

  const addEmployee = () => {
    const errorMsg = validateInputs();
    if (errorMsg) {
      setError(errorMsg);
      return;
    }
    if (employees.some(employee => employee.id === newEmployee.id)) {
      alert('Duplicate detected.');
      return;
    }
    setEmployees([...employees, newEmployee]);
    resetForm();  // Keep the form visible to add more employees
    alert('Employee successfully added');
  };

  const resetForm = () => {
    setNewEmployee({
      name: '',
      gender: '',
      email: '',
      phone: '',
      position: '',
      id: ''
    });
    setIsEditing(false);
    setCurrentEmployeeId('');
    setError('');
  };

  const deleteEmployee = (id) => {
    setEmployees(employees.filter(employee => employee.id !== id));
  };

  const editEmployee = (employee) => {
    setNewEmployee(employee);
    setIsEditing(true);
    setCurrentEmployeeId(employee.id);
  };

  const updateEmployee = () => {
    const errorMsg = validateInputs();
    if (errorMsg) {
      setError(errorMsg);
      return;
    }
    setEmployees(employees.map(employee => (employee.id === currentEmployeeId ? newEmployee : employee)));
    resetForm();
    alert('Employee information updated successfully!');
  };

  const handleSubmit = () => {
    if (isEditing) {
      updateEmployee();
    } else {
      addEmployee();
    }
  };

  return (
    <div className="App">
      <h1>EMPLOYEE FORM</h1>

      <div className="buttonContainer">
        <button className="navButton" onClick={() => setShowForm(true)}>Show Employee Form</button>
        <button className="navButton" onClick={() => setShowList(true)}>Show Employee List</button>
      </div>

      {showForm && (
        <div className='employeeform-container'>
          <input
            type="text"
            placeholder="Name"
            value={newEmployee.name}
            onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            value={newEmployee.email}
            onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
          />
          <input
            type="text"
            placeholder="Phone number"
            value={newEmployee.phone}
            onChange={(e) => setNewEmployee({ ...newEmployee, phone: e.target.value })}
          />
          <select
            value={newEmployee.gender}
            onChange={(e) => setNewEmployee({ ...newEmployee, gender: e.target.value })}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <input
            type="text"
            placeholder="Position"
            value={newEmployee.position}
            onChange={(e) => setNewEmployee({ ...newEmployee, position: e.target.value })}
          />
          <input
            type="text"
            placeholder="ID"
            value={newEmployee.id}
            onChange={(e) => setNewEmployee({ ...newEmployee, id: e.target.value })}
          />
          {error && <p className="error">{error}</p>}
          <button className="formButton" onClick={handleSubmit}>
            {isEditing ? 'Update Employee' : 'Add Employee'}
          </button>
          {isEditing && <button className="formButton" onClick={resetForm}>Cancel</button>}
        </div>
      )}

      {showList && (
        <div>
          <h2>Employee List</h2>
          {employees.length === 0 ? (
            <p>No employees have been added.</p>
          ) : (
            <div className="employeeContainer">
              {employees.map(employee => (
                <div className="employeeCard" key={employee.id}>
                  <p>Name: {employee.name}</p>
                  <p>Email: {employee.email}</p>
                  <p>Gender: {employee.gender}</p>
                  <p>Phone: {employee.phone}</p>
                  <p>Position: {employee.position}</p>
                  <p>ID: {employee.id}</p>
                  <button className="listButton" onClick={() => editEmployee(employee)}>Edit</button>
                  <button className="listButton" onClick={() => deleteEmployee(employee.id)}>Delete</button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Form;
