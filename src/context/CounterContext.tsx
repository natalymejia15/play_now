import { createContext, useState, type ReactNode } from "react";
import type { CounterContextType } from "../types/counter";


export const CounterContext = createContext<CounterContextType | undefined>(undefined);


export function CounterProvider({ children }: { children: ReactNode }) {
    const [count, setCount] = useState(0);

    const incrementar = () => setCount((prev) => prev + 1);
    const decrementar = () => setCount((prev) => prev - 1);
    return (
        <CounterContext.Provider value={{ count, incrementar, decrementar }} >
            {children}
        </CounterContext.Provider>
    )
}