import type { Form } from "../types/form";

interface ResultsProps {
    results: Form[];
    onRemove?: (id: string) => void;
    buttonText?: string;
    result?: string;
}

export const FormResults = ({results, onRemove, buttonText, result}: ResultsProps) => {
    return (
        <>
        <h2>Form {result}</h2>
        {results.length === 0 && 
            <p>No results to display.</p>
        }
        {results.map( (result, index) => (
            <div 
                key={result.id}
                style={{border: '1px solid black', marginBottom: '10px', padding: '10px'}}
            >
                <p>Sequence: {index + 1}</p>
                <p>Id: {result.id}</p>
                <p>Full name: {result.fullName}</p>
                <p>Email: {result.email}</p>
                <p>Age: {result.age}</p>
                <p>Role: {result.role}</p>
                { onRemove && buttonText &&
                    <button 
                    key={result.id}
                    aria-label={buttonText}
                    onClick={ () => {
                        onRemove?.(result.id);
                    }}
                >{buttonText}</button>}
            </div>
        ))}
        </>
    )
}
