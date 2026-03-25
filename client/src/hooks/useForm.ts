import { useState } from "react";

/**
 * Generic form-state hook.
 *
 * Provides `formData`, a `handleChange` handler compatible with
 * <input>, <select>, and <textarea>, and a `setFormData` setter for
 * manual resets.
 *
 * @example
 * const { formData, handleChange, setFormData } = useForm({ phone: "", password: "" });
 */
function useForm<T extends Record<string, string>>(initialState: T) {
    const [formData, setFormData] = useState<T>(initialState);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return { formData, handleChange, setFormData };
}

export default useForm;
