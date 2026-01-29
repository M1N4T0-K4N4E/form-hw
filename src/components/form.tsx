import { useMemo, useState } from "react";
import type { Calculation } from "../types/calculator";

interface FormProps {
    onSumit?: (result: Calculation) => void;
}

export const Form = ({onSumit} : FormProps) => {
    const [num1, setNum1] = useState('');
    const [num2, setNum2] = useState('');
    const [operation, setOperation] = useState('+');
    const result = useMemo(() => {
        const number1 = parseFloat(num1);
        const number2 = parseFloat(num2);
        if (isNaN(number1) || isNaN(number2)) {
            // return "enter a valid number";
            return 0;
        }
        switch (operation) {
            case '+':
                return number1 + number2;
            case '-':
                return number1 - number2;
            case '*':
                return number1 * number2;
            case '/':
                return number1 / number2;
            default:
                return 0;
        }
    }, [num1, num2, operation]);

    return <div>
        <h1>Form Component</h1>
        <input 
            type="text" 
            placeholder="Number 1" 
            value={num1} 
            onChange={ (e) => {
                setNum1(e.target.value);
        }}/>
        <select 
            value={operation} 
            onChange={ (e) => {
                setOperation(e.target.value);
        }}>
            <option value="+">+</option>
            <option value="-">-</option>
            <option value="*">*</option>
            <option value="/">/</option>
        </select>
        <input 
            type="text" 
            placeholder="Number 2" 
            value={num2}
            onChange={ (e) => {
                setNum2(e.target.value);
        }}/>
        <button onClick={() => {
            onSumit?.({
                uuid: crypto.randomUUID(),
                num1: parseFloat(num1),
                num2: parseFloat(num2),
                operation,
                result
            })
        }}> {num1} {operation} {num2} = {result}</button>
    </div>
}