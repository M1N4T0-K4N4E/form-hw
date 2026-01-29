import { useFormik } from "formik";
import * as yup from "yup";
import type { Calculation } from "../types/calculator";
import type { Form } from "../types/form";
import { Results } from "./results";
import { useState } from "react";

interface FormValidatedProps {
    onButtonSubmit?: (result: Calculation) => void;
}

interface FormValidatorProps {
    onFormSubmit?: (form: Form) => void;
}

export const FormValidated = ({onButtonSubmit} : FormValidatedProps) => {
    const [results, setResults] = useState<number>(0);
    const formik = useFormik({
        initialValues: {
            num1: '',
            num2: '',
            operation: '+',

        },
        validationSchema: yup.object({
            num1: yup.number().required('Number 1 is required'),
            num2: yup.number().required('Number 2 is required'),
            operation: yup.string().oneOf(['+', '-', '*', '/']).required('Operation is required'),
        }),
        onSubmit: (values) => {
            const number1 = parseFloat(values.num1);
            const number2 = parseFloat(values.num2);
            let result = 0;
            switch (values.operation) {
                case '+':
                    result = number1 + number2;
                    break;
                case '-':
                    result = number1 - number2;
                    break;
                case '*':
                    result = number1 * number2;
                    break;
                case '/':
                    result = number1 / number2;
                    break;
            }

            setResults(result);

            onButtonSubmit?.({
                uuid: crypto.randomUUID(),
                num1: number1,
                num2: number2,
                operation: formik.values.operation,
                result: result,
            });
            formik.resetForm();
        }
    });

    return <div>
        <h1>Form Component</h1>
        <form onSubmit={formik.handleSubmit}>
        
        {formik.errors.num1 && (
            <div style={{color: 'red'}}>{formik.errors.num1}</div>
        )}
        
        {formik.errors.num2 && (
            <div style={{color: 'red'}}>{formik.errors.num2}</div>
        )}
        
        <input 
            type="text" 
            name="num1"
            placeholder="Number 1" 
            value={formik.values.num1} 
            onChange={formik.handleChange}
        />
        <select 
            name="operation"
            value={formik.values.operation} 
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
        >
            <option value="+">+</option>
            <option value="-">-</option>
            <option value="*">*</option>
            <option value="/">/</option>
        </select>
        <input 
            type="text" 
            name="num2"
            placeholder="Number 2" 
            value={formik.values.num2}
            onChange={formik.handleChange}
        />
        <button type="submit"> {formik.values.num1} {formik.values.operation} {formik.values.num2} = {results}</button> 
        </form>
    </div>
}

export const FormValidator = ({onFormSubmit} : FormValidatorProps) => {
    const formik = useFormik({
        initialValues: {
            full_name: '',
            email: '',
            age: '',
            role: '',
        },
        validationSchema: yup.object({
            full_name: yup.string().required('Full name is required'),
            email: yup.string().email('Invalid email format').required('Email is required'),
            age: yup.number().min(10, 'Age must be between 10 and 99').max(99, 'Age must be between 10 and 99').required('Age is required'),
            role: yup.string().oneOf(['front end', 'back end', 'designer']).required('Role is required'),
        }),
        onSubmit: (values) => {
            onFormSubmit?.({
                id: Math.random().toString(36),
                full_name: values.full_name,
                email: values.email,
                age: parseInt(values.age),
                role: values.role,
            });
            formik.resetForm();
        }
    });

    return <div>
        <h1>Form</h1>
        <form onSubmit={formik.handleSubmit}>
            <p>Full name</p>
            <input 
                type="text" 
                name="full_name"
                placeholder="Full Name" 
                value={formik.values.full_name} 
                onChange={formik.handleChange}
            />
            {formik.errors.full_name && (
                <div style={{color: 'red'}}>{formik.errors.full_name}</div>
            )}
            <p>Email</p>
            <input 
                type="email" 
                name="email"
                placeholder="Email" 
                value={formik.values.email} 
                onChange={formik.handleChange}
            />
            {formik.errors.email && (
                <div style={{color: 'red'}}>{formik.errors.email}</div>
            )}
            <p>Age</p>
            <input 
                type="text" 
                name="age"
                placeholder="Age" 
                value={formik.values.age} 
                onChange={formik.handleChange}
            />
            {formik.errors.age && (
                <div style={{color: 'red'}}>{formik.errors.age}</div>
            )}
            <p>Role</p>
            <select 
                name="role"
                value={formik.values.role} 
                onChange={formik.handleChange}
                style={{marginBottom: '10px'}}
            >
                <option value="" label="Select role" />
                <option value="front end" label="Front End" />
                <option value="back end" label="Back End" />
                <option value="designer" label="Designer" />
            </select>
            {formik.errors.role && (
                <div style={{color: 'red'}}>{formik.errors.role}</div>
            )}
            <br/>
            <button type="submit" 
                disabled={!formik.values.full_name || 
                          !formik.values.email || 
                          !formik.values.age || 
                          !formik.values.role}
            >Submit</button>
        </form>
    </div>
}
