import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast'; 

function AddUser() {
    const userInitial = {
        fname: '',
        lname: '',
        email: '',
        password: '',
    };

    const [user, setUser] = useState(userInitial);
    const navigate = useNavigate(); // Use the navigate hook correctly

    const eventHandler = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const CreateUser = async (e) => {
        e.preventDefault();
        try {
            // Send a POST request to create the user
            const res = await axios.post('http://localhost:3000/api/create/', user);
            // If successful, show success message and navigate to home
            toast.success(res.data.msg, { position: "top-right" });
            navigate('/'); // Redirect to home after successful creation
        } catch (err) {
            // Handle error for existing email or other issues
            if (err.response && err.response.status === 400) {
                // Show the error message from the backend (e.g., email already exists)
                toast.error(err.response.data.msg, { position: "top-right" });
            } else {
                // Handle any other errors
                toast.error("please input required fields", { position: "top-right" });
            }
        }
    };

    return (
        <div className="h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-teal-400">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold text-center text-gray-800">Create New User</h2>
                <form className="space-y-4" onSubmit={CreateUser}>
                    <div>
                        <label htmlFor="fname" className="block text-sm font-medium text-gray-700">
                            First Name
                        </label>
                        <input
                            type="text"
                            name="fname"
                            id="fname"
                            onChange={eventHandler}
                            className="block w-full px-4 py-2 mt-2 border rounded-lg bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="First Name"
                        />
                    </div>
                    <div>
                        <label htmlFor="lname" className="block text-sm font-medium text-gray-700">
                            Last Name
                        </label>
                        <input
                            type="text"
                            name="lname"
                            id="lname"
                            onChange={eventHandler}
                            className="block w-full px-4 py-2 mt-2 border rounded-lg bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="Last Name"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            onChange={eventHandler}
                            className="block w-full px-4 py-2 mt-2 border rounded-lg bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="Email"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            onChange={eventHandler}
                            className="block w-full px-4 py-2 mt-2 border rounded-lg bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="Password"
                        />
                    </div>
                    <div className='flex flex-row gap-5 pt-5'>
                        <button
                            onClick={() => navigate(-1)} // Navigate back to the previous page
                            className="w-full px-4 py-2 text-blue-600 bg-transparent border border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        >
                            Back
                        </button>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        >
                            Add User
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddUser;
