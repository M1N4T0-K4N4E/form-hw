import axios from "axios"
import { useEffect, useState } from "react"
import type { Transaction as TransactionType } from "../types/transaction"

export const Transaction = () => {
    const [transactions, setTransactions] = useState<TransactionType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axios.get<TransactionType[]>("http://localhost:40905/transaction/");
                setTransactions(response.data);
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch transactions");
                setLoading(false);
            }
        };

        fetchTransactions();
    }, []);

    if (loading) return <div>Loading transactions...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h3>Transaction</h3>
            {transactions.length === 0 ? (
                <p>No transactions found.</p>
            ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Transaction ID</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>User ID</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Topic ID</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Tested At</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction) => (
                            <tr key={transaction.transactionId}>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{transaction.transactionId}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{transaction.userId}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{transaction.topicId}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                    {new Date(transaction.testedAt).toLocaleString()}
                                </td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{transaction.score}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}