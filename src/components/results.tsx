import type { Calculation } from "../types/calculator";

interface ResultsProps {
    results: Calculation[];
    buttonText: string;
    onRemove?: (uuid: string) => void;
}

export const Results = ({results, buttonText, onRemove}: ResultsProps) => {
    return (
        <>
        {results.map( (result) => (
            <div key={result.uuid}>{result.num1} {result.operation} {result.num2} = {result.result} 
                <button 
                    key={result.uuid}
                    onClick={ () => {
                        onRemove?.(result.uuid);
                    }}
                >{buttonText}</button>
            </div>
            
        ))}
        </>
    )
}