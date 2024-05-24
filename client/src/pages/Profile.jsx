import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useRef, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserFailure,
  deleteUserSuccess,
  signOut
} from "../redux/user/userSlice";

export default function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [image, setImage] = useState(null);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, profilePicture: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {}
  };

  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data));
        return;
      }
      dispatch(deleteUserSuccess());
    } catch (error) {
      dispatch(deleteUserFailure(error));
    }
  };

  const handleSignOut = async() => {
    try {
      await fetch("/api/auth/signout");
      dispatch(signOut());
    } catch (error) {
      console.log(error);
    }
  }

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
                  <form onSubmit={handleSubmit}>
                    <input
                      type="file"
                      ref={fileRef}
                      hidden
                      accept="image/*"
                      onChange={(e) => setImage(e.target.files[0])}
                    />
                    <img
                      src={
                        formData.profilePicture || currentUser.profilePicture
                      }
                      className="w-24 h-24 mx-auto my-4 rounded-full object-cover"
                      alt=""
                      onClick={() => fileRef.current.click()}
                    />
                    <p className="text-sm self-center mb-4">
                      {imageError ? (
                        <span className="text-red-700">
                          Error Uploading image
                        </span>
                      ) : imagePercent > 0 && imagePercent < 100 ? (
                        <span className="text-slate-700">{`Uploading : ${imagePercent}%...`}</span>
                      ) : imagePercent === 100 ? (
                        <span className="text-green-700">
                          Image uploaded successfully
                        </span>
                      ) : (
                        ""
                      )}
                    </p>
                    <div className="mb-6">
                      <input
                        defaultValue={currentUser.username}
                        type="text"
                        placeholder="Username"
                        id="username"
                        className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 "
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-6">
                      <input
                        defaultValue={currentUser.email}
                        type="email"
                        placeholder="Email"
                        id="email"
                        className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 "
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-6">
                      <input
                        type="password"
                        placeholder="Password"
                        id="password"
                        className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 "
                        onChange={handleChange}
                      />
                    </div>

                    <button className="bg-slate-700 text-white p-3 rounded-lg w-full transition hover:bg-opacity-90">
                      {loading ? "Loading..." : "Update"}
                    </button>
                  </form>

                  <div className="flex justify-between mt-2">
                    <span
                      className="text-red-700 cursor-pointer"
                      onClick={handleDeleteAccount}
                    >
                      Delete Account
                    </span>
                    <span className="text-red-700 cursor-pointer" onClick={handleSignOut}>
                      Sign Out
                    </span>
                  </div>
                  <p className="text-red-700 mt-2">
                    {error && error.message}
                  </p>
                  <p className="text-green-700 mt-2">
                    {updateSuccess && "Successful update!"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
