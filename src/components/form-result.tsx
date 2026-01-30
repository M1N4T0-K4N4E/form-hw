import type { Form } from "../types/form";

interface ResultsProps {
    results: Form[];
}

export const FormResults = ({results}: ResultsProps) => {
    return (
        <>
        <h2>Form Results</h2>
        {results.length === 0 && 
            <p>No results to display.</p>
        }
        {results.map( (result, index) => (
            <div key={result.id}>
                <p>Sequence: {index + 1}</p>
                <p>Id: {result.id}</p>
                <p>Full name: {result.fullName}</p>
                <p>Email: {result.email}</p>
                <p>Age: {result.age}</p>
                <p>Role: {result.role}</p>
            </div>
        ))}
        </>
    )
}