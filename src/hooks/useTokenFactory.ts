import { useEffect, useState } from "react";
import { TokenFactory } from "../../wrappers/TokenFactory"; // Adjust the import path as necessary
import { useTonClient } from "./useTonClient";
import { Address, OpenedContract } from "@ton/core";

export function useTokenFactory() {
    const client = useTonClient();
    const [tokenFactory, setTokenFactory] = useState<OpenedContract<TokenFactory> | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const initTokenFactory = async () => {
            if (!client) return;

            try {
                const factoryAddress = Address.parse(import.meta.env.VITE_TOKEN_FACTORY_ADDRESS as string); // Use the environment variable
                const factory = await client.open(await TokenFactory.fromAddress(factoryAddress));
                setTokenFactory(factory);
            } catch (err: any) {
                setError("Failed to initialize TokenFactory: " + err.message);
            }
        };

        initTokenFactory();
    }, [client]);

    return { tokenFactory, error };
} 