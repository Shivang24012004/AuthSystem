import React from "react";
import { useSelector } from "react-redux";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <section className="bg-gray-1 py-20 dark:bg-dark lg:py-[40px]">
      <div>
        <div className="container mx-auto">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="relative mx-auto max-w-[525px] overflow-hidden rounded-lg bg-white px-10 py-16 text-center dark:bg-dark-2 sm:px-12 md:px-[60px]">
                <div className="mb-10 text-center md:mb-16">
                  <h1 className="text-3xl text-center font-semibold my-6">
                    Profile
                  </h1>
                  <form >
                    <img src={currentUser.profilePicture} className="w-24 h-24 mx-auto my-6 rounded-full object-cover" alt="" />
                    <div className="mb-6">
                      <input
                        defaultValue={currentUser.username}
                        type="text"
                        placeholder="Username"
                        id="username"
                        className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 "
                      />
                    </div>
                    <div className="mb-6">
                      <input
                        defaultValue={currentUser.email}
                        type="email"
                        placeholder="Email"
                        id="email"
                        className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 "
                      />
                    </div>
                    <div className="mb-6">
                      <input
                        
                        type="password"
                        placeholder="Password"
                        id="password"
                        className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 "
                      />
                    </div>

                    <button
                      className="bg-slate-700 text-white p-3 rounded-lg w-full transition hover:bg-opacity-90"
                    >
                      Update
                    </button>

                  </form>
                  
                  <div className="flex justify-between mt-2">
                    <span className="text-red-700 cursor-pointer">Delete Account</span>
                    <span className="text-red-700 cursor-pointer">Sign Out</span>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
