import React from "react";
import { Link } from "react-router-dom";

export default function OrderDetails() {
    return (
        <div className="h-screen w-screen">
            <div className="flex h-full">
                <div id="sidebar" class="flex flex-col transition-all duration-300 w-64 p-4 border-r border-[#F58220]">
                    <img src='./images/logo.png' className='relative h-10 w-10 mx-auto' />
                    <div className="flex flex-col h-full mt-5 text-sm">
                        <Link to="/home" className='py-3 px-4 mt-1 rounded-lg bg-gray-200 hover:bg-gray-200 hover:rounded-lg'>Dashboard</Link>
                        <Link to="/orders_list" className='py-3 px-4 mt-1 hover:bg-gray-200 hover:rounded-lg'>Orders List</Link>
                        <Link to="/order_details" className='py-3 px-4 mt-1 hover:bg-gray-200 hover:rounded-lg'>Order Details</Link>
                        <Link to="/dish" className='py-3 px-4 mt-1 hover:bg-gray-200 hover:rounded-lg'>Dish List</Link>
                        <Link to="/dish_details" className='py-3 px-4 mt-1 hover:bg-gray-200 hover:rounded-lg'>Dish Details</Link>
                        <Link to="/add_dish" className='py-3 px-4 mt-1 hover:bg-gray-200 hover:rounded-lg'>Add Dish</Link>
                        <Link to="/edit_dish" className='py-3 px-4 mt-1 hover:bg-gray-200 hover:rounded-lg'>Edit Dish</Link>

                        <Link to="/profile" className='py-3 px-4 mt-auto hover:bg-gray-200 hover:rounded-lg'>Profile</Link>
                        <Link to="/" className='py-3 px-4 mt-1 hover:bg-gray-200 hover:rounded-lg'>Logout</Link>

                    </div>
                </div>
                <div class="flex-1 mt-0">
                    <nav className='flex h-16 px-6 items-center border-b border-[#F58220]  text-sm'>
                        <div class="flex items-center border border-gray-300 rounded-full p-2">
                            <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="text-default-600" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.3-4.3"></path>
                            </svg>
                            <input type="text" class="outline-none w-full ps-2" placeholder="Search" />
                        </div>
                        <div className="ml-auto bg-gray-200 p-2 rounded-full mr-4">
                            <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
                                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
                            </svg>
                        </div>
                        <div className='bg-white h-10 w-10 rounded-full  overflow-hidden'>
                            <img src='./images/avatar.png' className='object-cover w-full h-full' />
                        </div>
                        <h3 className='font-medium ml-2'>Kaiya Botosh</h3>
                    </nav>
                    <section className="p-6">
                        <h1>Order Details</h1>
                        <h3>Back to list</h3>
                        <div className="border border-[#F58220] rounded-lg">
                            <div className="p-6 flex gap-3 border-b border-[#F58220]">
                                <h1>Order #9F36CA</h1>
                                <h3>September 23, 2023</h3>
                                <h3>3 Products</h3>
                            </div>
                            <div className="grid grid-cols-4 p-6 gap-6">
                                <div className="border border-[#F58220] rounded-lg">
                                    <h1 className="border-b border-[#F58220] p-4">Billing Address</h1>
                                    <div className="p-4">
                                        <div className="mb-4">
                                            <h4 className="mb-1">Jaylon Calzoni</h4>
                                            <p>2123 Parker st. Allentown, New Mexico 123456</p>
                                        </div>
                                        <div className="mb-4">
                                            <h4 className="mb-1">Email</h4>
                                            <p>jaylon.calzoni@mail.com</p>
                                        </div>
                                        <div>
                                            <h4 className="mb-1">Phone</h4>
                                            <p>(123) 456-7890</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="border border-[#F58220] rounded-lg">
                                    <h1 className="border-b border-[#F58220] p-4">Billing Address</h1>
                                    <div className="p-4">
                                        <div className="mb-4">
                                            <h4 className="mb-1">Jaylon Calzoni</h4>
                                            <p>2123 Parker st. Allentown, New Mexico 123456</p>
                                        </div>
                                        <div className="mb-4">
                                            <h4 className="mb-1">Email</h4>
                                            <p>jaylon.calzoni@mail.com</p>
                                        </div>
                                        <div>
                                            <h4 className="mb-1">Phone</h4>
                                            <p>(123) 456-7890</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="border border-[#F58220] rounded-lg">
                                    <h1 className="border-b border-[#F58220] p-4">Billing Address</h1>
                                    <div className="px-4">
                                        <div className="py-4 flex justify-between border-b border-[#F58220]">
                                            <p>Subtotal:</p>
                                            <span>$365.00</span>
                                        </div>
                                        <div className="py-4 flex justify-between border-b border-[#F58220]">
                                            <p>Subtotal:</p>
                                            <span>$365.00</span>
                                        </div>
                                        <div className="py-4 flex justify-between border-b border-[#F58220]">
                                            <p>Subtotal:</p>
                                            <span>$365.00</span>
                                        </div>
                                        <div className="py-4 flex justify-between">
                                            <p>Subtotal:</p>
                                            <span>$365.00</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="border border-[#F58220] rounded-lg">
                                    <h1 className="border-b border-[#F58220] p-4">Billing Address</h1>
                                    <div className="p-6 text-center">
                                        <img src="./images/Dashboard/ship.png" alt="" className="mx-auto mb-3" />
                                        <h2 className="mb-3">Jay Logistics</h2>
                                        <h2 className="mb-3">ID: JLST2023477890</h2>
                                        <p className="mb-3">Payment Mode: Prepaid (Debit Card)</p>
                                    </div>
                                </div>
                                <div className="col-span-3">
                                    <div className="my-10 relative">
                                        <div className="mx-20">
                                            <div className="h-1.5 bg-[#F58220] rounded-full"></div>
                                        </div>
                                        <div className="flex justify-between mx-10">
                                            <div className="flex flex-col items-center">
                                                <div className="flex items-center justify-center h-10 w-10 bg-[#F58220] rounded-full">
                                                    <span className="">01</span>
                                                </div>
                                                <h4 className="p-2 mt-4">Order received</h4>
                                            </div>
                                            <div className="flex flex-col items-center">
                                                <div className="flex items-center justify-center h-10 w-10 bg-[#F58220] rounded-full">
                                                    <span className="">02</span>
                                                </div>
                                                <h4 className="p-2 mt-4">Order received</h4>
                                            </div>
                                            <div className="flex flex-col items-center">
                                                <div className="flex items-center justify-center h-10 w-10 bg-[#F58220] rounded-full">
                                                    <span className="">03</span>
                                                </div>
                                                <h4 className="p-2 mt-4">Order received</h4>
                                            </div>

                                            <div className="relative flex flex-col items-center">
                                                <div className="flex items-center justify-center h-10 w-10 bg-[#F58220] rounded-full">
                                                    <span className="">04</span>
                                                </div>
                                                <h4 className="p-2 mt-4">Order received</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <table class="w-full border-collapse border border-[#F58220] rounded-lg overflow-hidden">
                                        <thead>
                                            <tr className="bg-[#F1F5F9] border border-gray-300">
                                                <th scope="col" class="px-4 py-4 text-start text-sm font-semibold text-default-800 ">Dish</th>
                                                <th scope="col" class="px-4 py-4 text-start text-sm font-semibold text-default-800">Price</th>
                                                <th scope="col" class="px-4 py-4 text-start text-sm font-semibold text-default-800">Quantity</th>
                                                <th scope="col" class="px-4 py-4 text-start text-sm font-semibold text-default-800">Sub Total</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-default-200">
                                            <tr className="border border-gray-300">
                                                <td className="px-4 py-4 whitespace-nowrap text-sm text-default-600">
                                                    <div className="flex items-center gap-4">
                                                        <img src="./images/Dashboard/pizza.png" alt="" className="h-[72px] max-w-[72px]" />
                                                        <div>
                                                            <p className="text-sm mb-1">Italian Pizza</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-default-600">#C0E4F7</td>

                                                <td className="px-4 py-4 whitespace-nowrap text-sm text-default-600">$359.69</td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </div>
                                <div className="">
                                    <h1 className="border border-[#F58220] p-4 rounded-t-lg">Billing Address</h1>
                                    <div className="px-4 border-x border-b border-[#F58220] rounded-b-lg">
                                        <div className="py-4 flex justify-between border-b border-[#F58220]">
                                            <p>Subtotal:</p>
                                            <span>$365.00</span>
                                        </div>
                                        <div className="py-4 flex justify-between border-b border-[#F58220]">
                                            <p>Subtotal:</p>
                                            <span>$365.00</span>
                                        </div>
                                        <div className="py-4 flex justify-between border-b border-[#F58220]">
                                            <p>Subtotal:</p>
                                            <span>$365.00</span>
                                        </div>
                                        <div className="py-4 flex justify-between">
                                            <p>Subtotal:</p>
                                            <span>$365.00</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}