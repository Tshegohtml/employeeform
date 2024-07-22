import React, { useState } from 'react';

function Form() {
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    gender: '',
    email: '',
    phone: '',
    image: '',
    position: '',
    id: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentEmployeeId, setCurrentEmployeeId] = useState('');
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [showList, setShowList] = useState(false);

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
    resetForm();
    alert('Employee successfully added');
  };

  const resetForm = () => {
    setNewEmployee({
      name: '',
      gender: '',
      email: '',
      phone: '',
      image: '',
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
  };

  const handleSubmit = () => {
    if (isEditing) {
      updateEmployee();
    } else {
      addEmployee();
    }
  };

  const handleSearch = () => {
    setFilteredEmployees(employees.filter(employee => employee.name.includes(searchQuery) || employee.id.includes(searchQuery)));
  };

  const handleShowForm = () => {
    setShowForm(true);
    setShowList(false);
  };

  const handleShowList = () => {
    setShowForm(false);
    setShowList(true);
  };

  return (
    <div className="App">
      <h1>EMPLOYEE FORM</h1>

      <div>
        <button className="navButton" onClick={handleShowForm}>Show Employee Form</button>
        <button className="navButton" onClick={handleShowList}>Show Employee List</button>
      </div>

      {showForm && (
        <div>
          {/* <h2>{isEditing ? 'Edit Employee' : 'Add Employee'}</h2> */}
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
          <input
            type="text"
            placeholder="Nationality"
            value={newEmployee.nationality}
            onChange={(e) => setNewEmployee({ ...newEmployee, nationality: e.target.value })}
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
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button className="formButton" onClick={handleSubmit}>{isEditing ? 'Update Employee' : 'Add Employee'}</button>
          {isEditing && <button className="formButton" onClick={resetForm}>Cancel</button>}
        </div>
      )}

      {showList && (
        <div>
          <h2>Employee List</h2>
          <input
            type="text"
            placeholder="Search by ID"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
          {employees.length === 0 ? (
            <p>No employees have been added.</p>
          ) : (
            employees
              .filter(employee => employee.id.includes(searchQuery))
              .map(employee => (
                <div className='info' key={employee.id}>
                  <p>Name: {employee.name}</p>
                  <p>Email: {employee.email}</p>
                  <p>Gender: {employee.gender}</p>
                  <p>Phone: {employee.phone}</p>
                  <p>Position: {employee.position}</p>
                  <p>ID: {employee.id}</p>
                  <button className="listButton" onClick={() => deleteEmployee(employee.id)}>Delete</button>
                  <button className="listButton" onClick={() => editEmployee(employee)}>Edit</button>
                </div>
              ))
          )}
        </div>
      )}
    </div>
  );
}

export default Form;