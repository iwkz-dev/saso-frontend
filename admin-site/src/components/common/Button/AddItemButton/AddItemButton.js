import React from "react";
import { IoMdAddCircle } from "react-icons/io";
import Link from "next/link";

const AddItemButton = ({ hrefLink, text }) => {
    return (
        <Link href={hrefLink} className="cursor-pointer">
            <a className="flex items-center rounded-lg p-2 border rounded-xl border-emerald-700">
                <IoMdAddCircle className="pr-1" color="#047857" size={30} />
                <span className="text-emerald-700">{text}</span>
            </a>
        </Link>
    );
};

export default AddItemButton;
