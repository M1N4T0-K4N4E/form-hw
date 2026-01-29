import type { Form } from "../types/form";

interface ResultsProps {
    results: Form[];
}

export const FormResults = ({results}: ResultsProps) => {
    return (
        <>
        <h2>Form Results</h2>
        {results.map( (result, index) => (
            <div key={result.id}>
                <p>Sequence: {index + 1}</p>
                <p>Full name: {result.full_name}</p>
                <p>Email: {result.email}</p>
                <p>Age: {result.age}</p>
                <p>Role: {result.role}</p>
            </div>
        ))}
        </>
    )
}