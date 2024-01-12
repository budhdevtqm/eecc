'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Loader from './Loader';
import useDelete from '../custom-hooks/useDelete';
import useFetch from '../custom-hooks/useFetch';
import { cancelOrder, getMyOrders } from '../redux/orderSlice';

interface PropsType {
    image: string;
    id: number;
    name: string;
    amount: number;
    is_cancelled: number;
    quantity: number; handleOpen: (id: number) => void
}

const OrderRow: React.FC<PropsType> = ({ image, id, name, amount, quantity, is_cancelled, handleOpen, }) => {
    const [loader, setLoader] = useState(false);
    const handleDelete = useDelete();
    const { handleFetch } = useFetch();

    const handleOrderCancel = async (id: number) => {
        setLoader(true);
        await handleDelete(cancelOrder, id as number);
        await handleFetch(getMyOrders);
        setLoader(false);
    };


    return <tr key={id}>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            <p className="text-gray-900 whitespace-no-wrap">
                <Image
                    src={`/upload/products/${image}`}
                    alt={name + "image"}
                    width={50}
                    height={50}
                />
            </p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm max-w-[500px]">
            {name}
        </td>

        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            <p className="text-gray-900 whitespace-no-wrap">
                {amount}
            </p>
        </td>

        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            <p className="text-gray-900 whitespace-no-wrap">
                {quantity}
            </p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            <div className="flex items-center gap-4">
                <button
                    type="button"
                    onClick={() => handleOpen(id)}
                    className="px-2 py-1 border border-primary rounded-md text-primary hover:text-white hover:bg-primary"
                >
                    Info
                </button>
                {is_cancelled ? (
                    <p className="text-gray-500 font-semibold">
                        Cancelled
                    </p>
                ) : loader ? (
                    <Loader loading={loader} />
                ) : (
                    <button
                        type="button"
                        onClick={() => handleOrderCancel(id)}
                        className="px-2 py-1 border border-errorColor rounded-md text-errorColor hover:text-white hover:bg-errorColor"
                    >
                        Cancel
                    </button>
                )}
            </div>
        </td>
    </tr>
}

export default OrderRow;