import React,{useState} from "react";
import { Link,useNavigate } from "react-router-dom";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      setLoading(false);
      if (data.success===false) {
        setError(true);
        return;
      }
      setError(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <section className="bg-gray-1 py-20 dark:bg-dark lg:py-[120px]">
      <div>
        <div className="container mx-auto">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="relative mx-auto max-w-[525px] overflow-hidden rounded-lg bg-white px-10 py-16 text-center dark:bg-dark-2 sm:px-12 md:px-[60px]">
                <div className="mb-10 text-center md:mb-16">
                  <h1 className="text-3xl text-center font-semibold my-6">
                    Sign In
                  </h1>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                      <input
                        onChange={handleChange}
                        type="email"
                        placeholder="Email"
                        id="email"
                        className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 "
                      />
                    </div>
                    <div className="mb-6">
                      <input
                        onChange={handleChange}
                        type="password"
                        placeholder="Password"
                        id="password"
                        className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 "
                      />
                    </div>
                    <button
                      disabled={loading}
                      className="bg-slate-700 text-white p-3 rounded-lg w-full transition hover:bg-opacity-90"
                    >
                      {loading ? "Loading..." : "Sign In"}
                    </button>
                    {/* <button className="bg-slate-700 text-white mt-4 p-3 rounded-lg w-full transition hover:bg-opacity-90">
                      Sign Up
                    </button> */}
                  </form>
                  <div className="flex gap-2 mt-2">
                    <p>Don&apos;t have an account?</p>
                    <Link to="/sign-up">
                      <span className="text-blue-500">Sign up</span>
                    </Link>
                  </div>
                  <p className="text-red-700 mt-5">
                    {error && "Something went wrong!"}
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
