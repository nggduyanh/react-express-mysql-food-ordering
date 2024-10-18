import React from "react";
import { Link } from "react-router-dom";

export default function AddDish() {
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
                        <h1>Add Dish</h1>
                        <h3>Back to list</h3>
                        <div className="grid grid-cols-3 gap-6">
                            <div className="border border-default-200 p-6 rounded-lg">
                                <div className="border border-default-200 p-6 rounded-lg mb-4 flex justify-center items-center">
                                    <div className="h-[300px] flex flex-col items-center">
                                        <div className="h-64 w-64 border border-[#F97316] border-dashed border-2 rounded-lg flex items-center justify-center bg-[#FFF0E9]">
                                            <label htmlFor="">Upload Image</label>
                                        </div>
                                        <input type="file" name="" id="" className="mt-4" />
                                    </div>
                                </div>
                                <h4 className="mb-4">Additional Images</h4>
                                <div className="flex gap-2 justify-center">
                                    <div className="border border-default-200 p-6 rounded-lg mb-4 flex justify-center items-center">
                                        <div className="flex flex-col items-center">
                                            <div className="h-24 w-24 border border-[#F97316] border-dashed border-2 rounded-lg flex items-center text-center justify-center bg-[#FFF0E9]">
                                                <label htmlFor="">Upload Image</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-2">
                                <div className="border border-default-200 p-6 rounded-lg grid grid-cols-2 gap-6 mb-4">
                                    <div>
                                        <h5 className="mb-2">Product Name</h5>
                                        <input type="text" placeholder="Product Name" className="border border-default-200 py-3 px-4 rounded-lg w-full mb-6" />
                                        <h5 className="mb-2">Product Catagory</h5>
                                        <input type="text" placeholder="Select" className="border border-default-200 py-3 px-4 rounded-lg w-full mb-6" />
                                        <div className="grid grid-cols-2 gap-6 mb-6">
                                            <div>
                                                <h5 className="mb-2">Selling Price</h5>
                                                <input type="text" placeholder="Selling Price" className="border border-default-200 py-3 px-4 rounded-lg w-full" />
                                            </div>
                                            <div>
                                                <h5 className="mb-2">Cost Price</h5>
                                                <input type="text" placeholder="Cost Price" className="border border-default-200 py-3 px-4 rounded-lg w-full" />
                                            </div>
                                        </div>
                                        <h5 className="mb-2">Quantity</h5>
                                        <input type="text" placeholder="Quantity In Stock" className="border border-default-200 py-3 px-4 rounded-lg w-full mb-6" />
                                        <h5 className="mb-2">Delivery Type</h5>
                                        <input type="text" placeholder="Select" className="border border-default-200 py-3 px-4 rounded-lg w-full mb-6" />
                                        <div className="flex justify-between mb-6">
                                            <h5>Discount</h5>
                                            <div className="flex gap-6 items-center">
                                                <h5>Add Discount</h5>
                                                <input type="checkbox" name="" id="" />
                                            </div>
                                        </div>
                                        <div className="flex justify-between">
                                            <h5>Expiry Date</h5>
                                            <div className="flex gap-6 items-center">
                                                <h5>Add Expiry Date</h5>
                                                <input type="checkbox" name="" id="" />
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <h5 className="mb-2">Product Name</h5>
                                        <textarea name="" id="" placeholder="short Description" className="border border-default-200 py-3 px-4 rounded-lg w-full mb-6 h-36"></textarea>
                                        <div className="flex justify-between mb-6">
                                            <h5>Return Policy</h5>
                                            <div className="flex gap-6 items-center">
                                                <h5>Returnable</h5>
                                                <input type="checkbox" name="" id="" />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-6 mb-6">
                                            <div>
                                                <h5 className="mb-2">Sale Start On</h5>
                                                <input type="text" placeholder="12/9/2022" className="border border-default-200 py-3 px-4 rounded-lg w-full" />
                                            </div>
                                            <div>
                                                <h5 className="mb-2">Sale End On</h5>
                                                <input type="text" placeholder="12/10/2022" className="border border-default-200 py-3 px-4 rounded-lg w-full" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <button className="px-4 py-2 text-[#EF4444] font-medium flex gap-2 items-center justify-center text-center bg-red-500/10 rounded-lg ml-auto">
                                        <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                                            <path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21"></path>
                                            <path d="M22 21H7"></path>
                                            <path d="m5 11 9 9"></path>
                                        </svg>
                                        Clear
                                    </button>
                                    <button className="px-4 py-2 text-white font-medium flex gap-2 items-center justify-center text-center bg-[#F97316] rounded-lg">
                                        <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                                            <polyline points="17 21 17 13 7 13 7 21"></polyline>
                                            <polyline points="7 3 7 8 15 8"></polyline>
                                        </svg>
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}