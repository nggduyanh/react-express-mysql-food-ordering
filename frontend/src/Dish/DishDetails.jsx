import React from "react";
import { Link } from "react-router-dom";

export default function DishDetails() {
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
                        <h1>Food Name</h1>
                        <div className="pt-6 grid grid-cols-2 gap-6">
                            <div className="border border-default-200 p-6 rounded-lg">
                                <div className="flex justify-center items-center">
                                    <img src="./images/Dashboard/burito1.png" alt="" className="mx-9" />
                                </div>
                                <div className="flex gap-2 h-32 justify-center">
                                    <div className="border border-[#F58220] rounded-lg overflow-hidden h-32 w-32">
                                        <img src="./images/Dashboard/burito2.png" alt="" className="h-full" />
                                    </div>
                                    <div className="border border-[#F58220] rounded-lg overflow-hidden h-32 w-32">
                                        <img src="./images/Dashboard/burito1.png" alt="" className="h-full" />
                                    </div>
                                    <div className="border border-[#F58220] rounded-lg overflow-hidden h-32 w-32">
                                        <img src="./images/Dashboard/burito3.png" alt="" className="h-full" />
                                    </div>
                                </div>
                            </div>
                            <div className="border border-default-200 p-6 rounded-lg">
                                <div className="flex justify-between items-center">
                                    <h1 className="text-4xl">Gujarati Thali</h1>
                                    <h3 className="text-3xl">$35.1<span className="text-base line-through ml-3">$58.5</span></h3>
                                </div>
                                <h5 className="mb-2 text-lg font-medium text-default-600"><span className="text-base font-normal text-default-500">by </span>Savory Bites Cafe</h5>
                                <div className="mb-3">
                                    <div className="flex gap-3 items-center">
                                        <div className="flex gap-1.5">
                                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 576 512" class="fill-yellow-400 text-yellow-400" height="18" width="18" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path>
                                            </svg>
                                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 576 512" class="fill-yellow-400 text-yellow-400" height="18" width="18" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path>
                                            </svg>
                                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 576 512" class="fill-yellow-400 text-yellow-400" height="18" width="18" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path>
                                            </svg>
                                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 576 512" class="fill-yellow-400 text-yellow-400" height="18" width="18" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"></path>
                                            </svg>
                                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 640 512" class="text-yellow-400" height="18" width="18" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M320 376.4l.1-.1 26.4 14.1 85.2 45.5-16.5-97.6-4.8-28.7 20.7-20.5 70.1-69.3-96.1-14.2-29.3-4.3-12.9-26.6L320.1 86.9l-.1 .3V376.4zm175.1 98.3c2 12-3 24.2-12.9 31.3s-23 8-33.8 2.3L320.1 439.8 191.8 508.3C181 514 167.9 513.1 158 506s-14.9-19.3-12.9-31.3L169.8 329 65.6 225.9c-8.6-8.5-11.7-21.2-7.9-32.7s13.7-19.9 25.7-21.7L227 150.3 291.4 18c5.4-11 16.5-18 28.8-18s23.4 7 28.8 18l64.3 132.3 143.6 21.2c12 1.8 22 10.2 25.7 21.7s.7 24.2-7.9 32.7L470.5 329l24.6 145.7z"></path>
                                            </svg>
                                        </div>
                                        <h5 className="px-3 border-l border-default-700">1221 Reviews</h5>
                                    </div>
                                </div>
                                <p className="mb-4 text-sm text-default-500">Mexican burritos are usually made with a wheat tortilla and contain grilled meat, cheese toppings, and fresh vegetables which are sources of vitamins, proteins, fibers, minerals, and antioxidants. This makes burritos a balanced meal that can be enjoyed in moderation as part of a healthy meal plan.</p>
                                <div className="flex mb-5 gap-2">
                                    <div className="rounded-full border border-default-200 px-3 py-1.5 text-xs">Veg</div>
                                    <div className="rounded-full border border-default-200 px-3 py-1.5 text-xs">Meal</div>
                                </div>
                                <div className="flex mb-8 items-center gap-3 text-sm">
                                    <h4 >Size:</h4>
                                    <label htmlFor="S0" className="flex h-9 w-9 bg-[#E2E8F0] items-center justify-center rounded-full font-medium">S</label>
                                    <label htmlFor="M1" className="flex h-9 w-9 bg-[#E2E8F0] items-center justify-center rounded-full font-medium">M</label>
                                    <label htmlFor="L2" className="flex h-9 w-9 bg-[#E2E8F0] items-center justify-center rounded-full font-medium">L</label>
                                </div>
                                <h5 className="text-lg mb-4">Nutrition Facts <span className="text-sm text-default-500">(per serving)</span></h5>
                                <div className="p-3 border border-default-200 p-6 rounded-lg grid grid-cols-4 text-center mb-4">
                                    <h4 className="mb-1 text-base font-medium text-default-700">564</h4>
                                    <h4 className="mb-1 text-base font-medium text-default-700">306mg</h4>
                                    <h4 className="mb-1 text-base font-medium text-default-700">2gm</h4>
                                    <h4 className="mb-1 text-base font-medium text-default-700">6.5gm</h4>
                                    <h4 className="mb-1 text-base text-default-700">Calories</h4>
                                    <h4 className="mb-1 text-base text-default-700">Fat</h4>
                                    <h4 className="mb-1 text-base text-default-700">Carbs</h4>
                                    <h4 className="mb-1 text-base text-default-700">Protein</h4>
                                </div>
                                <div className="flex items-center">
                                    <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="me-2 text-primary" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                    <span className="mr-2">152</span>
                                    <p>People are viewing this right now</p>
                                </div>
                            </div>
                        </div>

                    </section>
                </div>
            </div>
        </div>
    )
}