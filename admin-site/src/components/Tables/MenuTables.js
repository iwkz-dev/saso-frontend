import React from 'react';


const MenuTables = () => {
    const menu = [
        {
            name: 'Pempek',
            description: 'Pempek enak asal palembang asli!',
            quantity: '100',
            ordered: '50',
            price: '5.5€',
            category: 'Makanan Besar',
            image:
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
            updated: '10.01.2022',
            created: '10.03.2022'
        },
        {
            name: 'Pempek1',
            description: 'Pempek enak asal palembang asli!',
            quantity: '100',
            ordered: '20',
            price: '5.5€',
            category: 'Makanan Besar',
            image:
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
            updated: '10.01.2022',
            created: '10.03.2022'
        },
        {
            name: 'Pempek2',
            description: 'Pempek enak asal palembang asli!',
            quantity: '100',
            ordered: '70',
            price: '5.5€',
            category: 'Makanan Besar',
            image:
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
            updated: '10.01.2022',
            created: '10.03.2022'
        },
        // More people...
    ];

    return (
        <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Nr.
                                </th>
                                {
                                    Object.keys(menu[0]).map((k, index)=>{
                                        return(
                                            <th
                                                key={index}
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                {k}
                                            </th>
                                        )
                                    })
                                }
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Actions
                                </th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {menu.map((m, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="text-sm text-gray-900">{index+1}</div>
                                    </td>
                                    {
                                        Object.keys(menu[0]).map((k, index)=>{
                                            return(
                                                <td key={k} className="px-6 py-4 whitespace-nowrap">
                                                    {
                                                        k==="image" ? (
                                                            <img className="h-10 w-10 rounded-full" src={m.image} alt="" />
                                                        ) : (
                                                            <div className="text-sm text-gray-900">{m[k] }</div>
                                                        )
                                                    }
                                                </td>
                                            )
                                        })
                                    }
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <a href="#" className="text-indigo-600 hover:text-indigo-900 px-1">
                                            Edit
                                        </a>
                                        <a href="#" className="text-red-600 hover:text-red-900 px-2">
                                            delete
                                        </a>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MenuTables;