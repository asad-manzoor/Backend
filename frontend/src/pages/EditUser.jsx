import {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const EditUser = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const initialUser = {
        fname: "",
        lname: "",
        email: "",
    };
    const [user, setUser] = useState(initialUser);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const fetchData = async () => {
            try{
                const response = await axios.get(`http://localhost:3000/api/getone/${id}`);
                console.log(response.data);
                setUser(response.data);
                setLoading(false);
            }
            catch(error){
                console.log(error);
            }
        }
        fetchData();
    },[id]);


    const eventHandler = (e) => {
        const {name, value} = e.target;
        console.log(name, value);
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
    }
    const updateUser = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.put(`http://localhost:3000/api/update/${id}`, user);
            console.log(response.data);
            navigate(-1);
            toast.success(response.data.msg, { position: "top-right" });
        }
        catch(error){
            console.log(error);
        }
    }



    return(
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-teal-400">
    <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
        {(loading) ?(
            <h2 className="text-2xl font-bold text-center text-gray-800">Loading...</h2>
        ):(<>
        <h2 className="text-2xl font-bold text-center text-gray-800">Update User</h2>
        <form className="space-y-4"
         onSubmit={updateUser}
         >
            <div>
                <label htmlFor="fname" className="block text-sm font-medium text-gray-700">
                    First Name
                </label>
                <input
                    type="text"
                    value={user.fname}
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
                    value={user.lname}
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
                    value={user.email}
                    name="email"
                    id="email"
                    onChange={eventHandler}
                    className="block w-full px-4 py-2 mt-2 border rounded-lg bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Email"
                />
            </div>
            <div className='flex flex-row gap-5 pt-5'>
                <button
                    onClick={() => navigate(-1)}
                    className="w-full px-4 py-2 text-blue-600 bg-transparent border border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                    Back
                </button>
                <button
                    type="submit"
                    className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                    Update
                </button>
            </div>
        </form>
        </>)}
    </div>
</div>
    );
};

export default EditUser;
