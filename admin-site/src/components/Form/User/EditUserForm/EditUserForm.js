import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import SubmitButton from "../../../common/Button/SubmitButton/SubmitButton";
import ResetButton from "../../../common/Button/ResetButton/ResetButton";

const EditUserForm = () => {
    const user = useSelector((state) => state?.user?.detailUser);

    // Derive safe initial values from user (handles first render where user may be undefined)
    const initial = useMemo(
        () => ({
            isActive: Boolean(user?.isActive),
            role: Number.isFinite(user?.role) ? Number(user.role) : 3, // default to "Customer"
        }),
        [user],
    );

    const [isActive, setIsActive] = useState(initial.isActive);
    const [role, setRole] = useState(initial.role);

    // If user changes (e.g., after fetch), sync the form fields
    useEffect(() => {
        setIsActive(initial.isActive);
        setRole(initial.role);
    }, [initial.isActive, initial.role]);

    const reset = () => {
        // Restore to current user's values (previously reloaded the whole page)
        setIsActive(initial.isActive);
        setRole(initial.role);
    };

    return (
        <div>
            <form>
                <div className="max-w">
                    <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-6">
                        <label className="block">
                            <span className="text-gray-700">Is Active</span>
                            <select
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                name="isActive"
                                value={String(isActive)} // select emits strings; normalize to "true"/"false"
                                onChange={(e) =>
                                    setIsActive(e.target.value === "true")
                                }>
                                <option value="" disabled>
                                    Is Active
                                </option>
                                <option value="true">true</option>
                                <option value="false">false</option>
                            </select>
                        </label>

                        <label className="block">
                            <span className="text-gray-700">Role</span>
                            <select
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                name="role"
                                value={String(role)} // normalize to string
                                onChange={(e) =>
                                    setRole(Number(e.target.value))
                                }>
                                <option value="" disabled>
                                    Role
                                </option>
                                <option value="1">Super Admin</option>
                                <option value="2">Admin</option>
                                <option value="3">Customer</option>
                            </select>
                        </label>
                    </div>
                </div>

                <div className="flex my-4">
                    <SubmitButton />
                    <ResetButton onClick={reset} />
                </div>
            </form>
        </div>
    );
};

export default EditUserForm;
