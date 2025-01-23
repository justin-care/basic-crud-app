import { useState } from "react";

export const useToast = () => {
    const [toasts, setToasts] = useState([]);
    const addToast = (message, type = 'success') => {
        const id = new Date().getTime();
        setToasts((prev) => [...prev, { id, message, type }]);

        setTimeout(() => {
            setToasts((prev) => prev.filter((toast) => toast.id !== id));
        }, 3000);
    };

    return { toasts, addToast };
}
