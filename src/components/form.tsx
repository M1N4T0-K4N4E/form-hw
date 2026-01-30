import { useFormik } from "formik";
import * as yup from "yup";
import type { Form } from "../types/form";


interface FormProps {
    onFormSubmit?: (form: Form) => void;
}

export const FormInput = ({onFormSubmit} : FormProps) => {
    const formik = useFormik({
        initialValues: {
            fullName: '',
            email: '',
            age: '',
            role: '',
        },
        validationSchema: yup.object({
            fullName: yup.string().required('Full name is required'),
            email: yup.string().email('Invalid email format').required('Email is required'),
            age: yup.number().min(10, 'Age must be between 10 and 99').max(99, 'Age must be between 10 and 99').required('Age is required'),
            role: yup.string().oneOf(['front end', 'back end', 'designer']).required('Role is required'),
        }),
        onSubmit: (values) => {
            onFormSubmit?.({
                id: Math.random().toString(36),
                fullName: values.fullName,
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
                name="fullName"
                aria-label="fullName"
                placeholder="Full Name" 
                value={formik.values.fullName} 
                onChange={formik.handleChange}
            />
            {formik.errors.fullName && (
                <div style={{color: 'red'}}>{formik.errors.fullName}</div>
            )}
            <p>Email</p>
            <input 
                type="email" 
                name="email"
                aria-label="email"
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
                aria-label="age"
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
                aria-label="role"
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
                aria-label="submit"
                disabled={!formik.values.fullName || 
                          !formik.values.email || 
                          !formik.values.age || 
                          !formik.values.role}
            >Submit</button>
        </form>
    </div>
}
