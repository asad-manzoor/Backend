import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';

function Home() {
    const navigate = useNavigate();
    const [users, setUser] = useState([]);

    useEffect(()=>{
      const fetchData = async () => {
        try{
          const response = await axios.get('http://localhost:3000/api/getall/');
          console.log(response.data);
          setUser(response.data);
        }
        catch(error){
          console.log(error);
        }
      }
      fetchData();
    },[]);



    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-teal-400">
            <div className="w-full max-w-6xl p-8 space-y-6 bg-white rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold text-center text-gray-800">User Management</h2>
                {/* Add User Button */}
                <button
                    onClick={() => navigate('/add-user')} // Navigate to Add User page
                    className="w-45 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                    Add User
                </button>

                {/* User Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sr. No.</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {users.map((user,index) => (
                                <tr key={user.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{index}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{`${user.fname} ${user.lname}`}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button onClick={
                                            () => navigate(`/edit-user/${user._id}`)
                                        } 
                                        className="p-1 rounded-md text-white bg-blue-600 hover:bg-blue-800 mr-4">Edit</button>
                                        <button 
                                        onClick={()=>{
                                            axios.delete(`http://localhost:3000/api/delete/${user._id}`)
                                            .then(res => {
                                                console.log(res.data);
                                                setUser(users.filter((item) => item._id !== user._id));
                                                toast.error(res.data.msg, { position: "top-right" });
                                            })
                                            .catch(err => {
                                                console.log(err);
                                            });
                                        }}
                                        className="p-1 rounded-md text-white bg-red-600 hover:bg-red-800"
                                        >Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Home;
