import React, { useState } from 'react';
import { useTonConnect } from '../hooks/useTonConnect';
import { useSell } from '../hooks/useSell';
import { toNano } from '@ton/core';

const SellToken: React.FC = () => {
    const { sender, connected } = useTonConnect();
    const { sell, error: sellError } = useSell();

    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [amount, setAmount] = useState<string>('');
    const [tokenAmount, setTokenAmount] = useState<string>('');
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Only allow numbers and decimal point
        const value = e.target.value.replace(/[^0-9.]/g, '');
        // Prevent multiple decimal points
        if (value.split('.').length > 2) return;
        setAmount(value);
        setTokenAmount((Number(value) * 600 * 0.9).toFixed(9));
    };

    const handleChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Only allow numbers and decimal point
        const value = e.target.value.replace(/[^0-9.]/g, '');
        // Prevent multiple decimal points
        if (value.split('.').length > 2) return;
        setTokenAmount(value);
        setAmount((Number(value) / 600 / 0.9).toFixed(9));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!sender) {
            setError('Please connect your wallet first.');
            return;
        }

        if (!sell) {
            setError('Token sell is not initialized.');
            return;
        }

        try {
            if (Number(amount) < 0.2) {
                setError('Minimum amount is 0.2 TON');
                return;
            }
            await sell.send(
                sender,
                {
                    value: toNano(amount),
                },
                null
            );
            setSuccess('Token purchased successfully!');
            setError(null);
            setAmount('');
        } catch (err) {
            setError('Failed to purchase token: ' + (err as Error).message);
            setSuccess(null);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Buy Aravt Token</h1>
            {sellError && <p className="text-red-500">{sellError}</p>}
            <form onSubmit={handleSubmit} className="grid grid-cols-1 items-center gap-4 max-w-xs mx-auto">
                <input
                    type="text"
                    name="amount"
                    placeholder="Enter amount in TON"
                    value={amount}
                    onChange={handleChange}
                    required
                    className="text-center bg-gray-200 placeholder-gray-800 border py-2 w-full rounded"
                />
                <input
                    type="text"
                    name="tokenAmount"
                    placeholder="Enter amount in Aravt Tokens"
                    value={tokenAmount}
                    onChange={handleChange2}
                    required
                    className="text-center bg-gray-200 placeholder-gray-800 border py-2 w-full rounded"
                />
                <button 
                    type="submit" 
                    disabled={!connected}
                    className={`${
                        connected ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-400'
                    } text-white px-8 py-2 rounded transition-colors w-full`}
                >
                    Buy Aravt Token
                </button>
            </form>
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}
        </div>
    );
};

export default SellToken;