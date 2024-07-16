import React, { useState } from "react";
import FormInput from "./components/formInput";
import "./App.css";


const App = () => {
    const [employees, setEmployees] = useState([]);
    const [value, setValue] = useState({
        Name: "",
        Email: "",
        Cellnumber: "",
        Id: "",
        Position: "",
    });

    const inputFields = [
        {
            id: 1,
            name: "Name",
            type: "text",
            placeholder: "Name",
            errorMessage: "Name spelling is incorrect",
            label: "Name",
            pattern: "^[-Za-z0-9]{3,16}$",
            required: true,
        },
        {
            id: 2,
            name: "Email",
            type: "text",
            placeholder: "Email",
            errorMessage: "Email should be a valid email address!",
            label: "Email",
            required: true,
        },
        {
            id: 3,
            name: "Cellnumber",
            type: "text",
            placeholder: "Cellnumber",
            errorMessage: "Enter only 10 digits!",
            label: "Cellnumber",
            required: true,
        },
        {
            id: 4,
            name: "Id",
            type: "text",
            placeholder: "ID Number",
            errorMessage: "Enter the correct ID number!",
            label: "ID Number",
            required: true,
        },
        {
            id: 5,
            name: "Position",
            type: "text",
            placeholder: "Position",
            errorMessage: "Please enter the correct position!",
            label: "Position",
            required: true,
        },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        if (value.editing) {
            setEmployees(
                employees.map((emp) =>
                    emp.Id === value.Id ? { ...value, editing: false } : emp
                )
            );
        } else {
            setEmployees([...employees, value]);
        }
        setValue({
            Name: "",
            Email: "",
            Cellnumber: "",
            Id: "",
            Position: "",
        });
    };

    const onChange = (e) => {
        setValue({ ...value, [e.target.name]: e.target.value });
    };

    const handleEdit = (id) => {
        const employee = employees.find((emp) => emp.Id === id);
        setValue({ ...employee, editing: true });
    };

    const handleDelete = (id) => {
        setEmployees(employees.filter((emp) => emp.Id !== id));
    };

    return (
        <div className="App">
            <form onSubmit={handleSubmit}>
                <h1>Employee Registration Form</h1>
                {inputFields.map((input) => (
                    <FormInput
                        key={input.id}
                        label={input.label}
                        errorMessage={input.errorMessage}
                        name={input.name}
                        value={value[input.name]}
                        onChange={onChange}
                        required={input.required}
                    />
                ))}
                <button type="submit">
                    {value.editing ? "Update" : "Submit"}
                </button>
            </form>
            <div>
                <h1>Employee List</h1>
                {employees.map((employee) => (
                    <div key={employee.Id}>
                        <p>
                            {employee.Name} - {employee.Position}
                        </p>
                        <button onClick={() => handleEdit(employee.Id)}>
                            Edit
                        </button>
                        <button onClick={() => handleDelete(employee.Id)}>
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default App;
