//   import React, { Component } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useState, useEffect } from "react";
// import { v4 as uuidv4 } from 'uuid';

// function manager() {
//   const [form, setform] = useState({ site: "", user: "", pass: "" });
//   const [pws, setpws] = useState([]);
//   const getpasswd =async ()=>{
//     const pwd =await fetch("http://localhost:3000");
//   const pass = await pwd.json();
//   console.log(pass);
//   setpws(pass);
//   }
  
//   useEffect(() => {
//      getpasswd();
//   }, []);
//   const Password = async () => {
//     if (!form.site || !form.user || !form.pass) {
//     toast.error("All fields are required!");
//     return;
//   }
//      const newEntry = { ...form, id: uuidv4() };
//      const updatedPws = [...pws, newEntry];
//      setpws(updatedPws);
//      let pass = await fetch("http://localhost:3000", {method:"POST" ,headers: {"Content-Type" : "application/json"},body: JSON.stringify({...form, id: uuidv4()})})
//      //  localStorage.setItem("Password", JSON.stringify(updatedPws));
//     //  console.log(updatedPws);

//      setform({site: "", user: "", pass: ""});
     

//   };
// const deleteUser =async (id)=>{
//  console.log("delte hai" + id);
//  let c = confirm("DO YOU REALLY WANT TO DELETE YOUR PASSWORD ")
//  if(c){
//  setpws(pws.filter(items=>items.id!=id));
// //  localStorage.setItem("Password", JSON.stringify(pws.filter(items=>items.id!=id)))
//     let pass = await fetch("http://localhost:3000", {method:"DELETE" ,headers: {"Content-Type" : "application/json"},body: JSON.stringify({...form, id})})
//  }

// }
// const editUser = (id)=>{
//  console.log("eidt hai" + id);
//  setform(pws.filter(items=>items.id===id)[0]);
//  setpws(pws.filter(items=>items.id!=id));

// }
//   const Handle = (e) => {
//     setform({ ...form, [e.target.name]: e.target.value });
//   };
//   const copy = (item) => {
//     // alert("Copied To Clipboard " + item);
//     navigator.clipboard.writeText(item);
//     toast.success("Copied " + item + " !");
//   };
//   return (
//     <>
//      <ToastContainer position="top-center" autoClose={1500} />
//       <div>
//         <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
//       </div>

//       <div className="container max-w-[60rem] mx-auto bg-red-600 mt-15">
//         <h1 className="flex justify-center">PASSWORD MANAGER</h1>
//         <div>
//           <input
//             className="bg-white w-full rounded-4xl border-green-500 border-2 focus:outline-none pl-3 pt-1.5 pb-1.5"
//             value={form.site}
//             placeholder="Enter The  Website Name"
//             onChange={Handle}
//             type="text"
//             name="site"
//           />
//         </div>
//         <div className="pt-8 gap-4 flex w-full justify-between">
//           <input
//             className="bg-white rounded-4xl w-50 border-green-500 border-2 focus:outline-none pl-3 pt-1.5 pb-1.5"
//             value={form.user}
//             placeholder="Enter Username"
//             onChange={Handle}
//             type="text"
//             name="user"
//           />
//           <input
//             className="bg-white rounded-4xl w-50 border-green-500 border-2 focus:outline-none pl-3 pt-1.5 pb-1.5"
//             value={form.pass}
//             placeholder="Enter Password"
//             onChange={Handle}
//             type="password"
//             name="pass"
//           />
//         </div>
//         <div className="justify-center flex mt-8 items-center  bg-amber-950 ">
//           <button
//             onClick={Password}
//             className="bg-amber-200 flex rounded-full items-center px-2 py-2"
//           >
//             <lord-icon
//               src="https://cdn.lordicon.com/jgnvfzqg.json"
//               trigger="hover"
//             ></lord-icon>
//             Add Password
//           </button>
//         </div>
//         <div className="mt-10 relative overflow-auto">
//           {pws.length === 0 && (
//               <div className="text-white bg-amber-950 overflow-x-auto max-w-full">NO Password To Show</div>
//             )}
//           <table className="table-auto mx-auto bg-amber-950 w-full border-collapse">
            
//             {pws.length != 0 && (
//               <>
//                 <thead className="border-2 border-amber-200">
//                   <tr className="text-center text-white">
//                     <th className="px-4 py-2 border-2">SITE NAME</th>
//                     <th className="px-4 py-2 border-2">USERNAME</th>
//                     <th className="px-4 py-2 border-2">PASSWORDS</th>
//                     <th className="px-4 py-2 border-2">ACTIONS</th>
//                   </tr>
//                 </thead>

//                 <tbody className="text-center text-white">
//                   {pws.map((items, index) => (
//                     <tr key={index}>
//                       <td className="px-4 py-2 border-2 ">
//                         <div className="flex items-center justify-between gap-2">
//                           {items.site}
//                           <lord-icon
//                             className="invert flex-shrink-0 cursor-pointer"
//                             onClick={() => copy(items.site)}
//                             src="https://cdn.lordicon.com/iykgtsbt.json"
//                             trigger="hover"
//                           ></lord-icon>
//                         </div>
//                       </td>
//                       <td className="px-4 py-2 border-2 ">
//                         <div className="flex items-center justify-between gap-2">
//                           {items.user}
//                           <lord-icon
//                             className="invert flex-shrink-0 cursor-pointer"
//                             onClick={() => copy(items.user)}
//                             src="https://cdn.lordicon.com/iykgtsbt.json"
//                             trigger="hover"
//                           ></lord-icon>
//                         </div>
//                       </td>
//                       <td className="px-4 py-2 border-2">
//                         <div className="flex items-center justify-between gap-2">
//                           {items.pass}
//                           <lord-icon
//                             className="invert flex-shrink-0 cursor-pointer"
//                             onClick={() => {copy(items.pass);
//                             }}
//                             src="https://cdn.lordicon.com/iykgtsbt.json"
                            
//                             trigger="hover"
//                           ></lord-icon>
//                         </div>
//                       </td>
//                       <td className="px-4 py-2 border-2">
//                         <div className="flex items-center invert justify-center gap-2">
//                           <span><lord-icon onClick={()=>{
//                             editUser(items.id);
//                           }}
//                           src="https://cdn.lordicon.com/gwlusjdu.json"
//                             trigger="hover"
//                           ></lord-icon>
//                           </span>
//                           <span>
//                             <lord-icon onClick={()=>{
//                             deleteUser(items.id);
//                           }}
//                             src="https://cdn.lordicon.com/skkahier.json"
//                             trigger="hover"
//                           ></lord-icon>
//                           </span>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </>
//             )}
//           </table>
//         </div>
//       </div>
//     </>
//   );
// }

// export default manager;
import Aurora from "./Aurora";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import Navbar from "./navbar";
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';
import Login from './Login'; // Import the new Login component

function Manager() { // Changed to Manager for clarity
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [form, setform] = useState({ site: "", user: "", pass: "" });
  const [pws, setpws] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      getpasswd(token);
    }
  }, []);

  const getpasswd = async (token) => {
    try {
      const pwd = await fetch("http://localhost:5000/api/passwords", {
        headers: {
          'x-auth-token': token,
        },
      });
      const pass = await pwd.json();
      setpws(pass);
    } catch (error) {
      console.error("Failed to fetch passwords:", error);
    }
  };

  const Password = async () => {
    if (!form.site || !form.user || !form.pass) {
      toast.error("All fields are required!");
      return;
    }
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error("You must be logged in to add passwords.");
      return;
    }

    const newEntry = { ...form };
    const res = await fetch("http://localhost:5000/api/passwords", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        'x-auth-token': token,
      },
      body: JSON.stringify(newEntry)
    });
    const addedPass = await res.json();
    setpws([...pws, addedPass]);
    setform({ site: "", user: "", pass: "" });
    toast.success("Password added!");
  };

  const deleteUser = async (id) => {
    let c = window.confirm("DO YOU REALLY WANT TO DELETE YOUR PASSWORD?");
    if (c) {
      const token = localStorage.getItem('token');
      if (!token) return;

      const res = await fetch(`http://localhost:5000/api/passwords/${id}`, {
        method: "DELETE",
        headers: {
          'x-auth-token': token,
        },
      });
      if (res.ok) {
        setpws(pws.filter(items => items._id !== id));
        toast.success("Password deleted!");
      }
    }
  };
  
  // Note: The editUser function will need to be updated to work with the database
  const editUser = (id) => {
    setform(pws.find(items => items._id === id));
    setpws(pws.filter(items => items._id !== id));
    toast.info("Password moved to edit form!");
  };

  const Handle = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };
  
  const copy = (item) => {
    navigator.clipboard.writeText(item);
    toast.success("Copied " + item + " !");
  };

if (!isLoggedIn) {
    return (
      <>
        {/* <Navbar isLoggedIn={isLoggedIn} /> */}
        <Login setIsLoggedIn={setIsLoggedIn} getpasswd={getpasswd} />
      </>
    );
  }

  return (
    <>
     <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setPasswords={setpws} />
      <ToastContainer position="top-center" autoClose={1500} />

{/* <Aurora
  colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
  blend={0.5}
  amplitude={1.0}
  speed={0.5}
/> */}
      <div>
        <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 bg-[rgb(225,246,233)]"></div>
      </div>

      <div className="container max-w-[60rem] mx-auto bg-[rgbrgb(198,244,215)] mt-19">
        <h1 className="flex justify-center">PASSWORD MANAGER</h1>
        {/* <div className="flex justify-end">
          <button onClick={() => { localStorage.removeItem('token'); setIsLoggedIn(false); setpws([]); }} className="bg-white text-red-600 p-2 rounded-md">Logout</button>
        </div> */}
        <div>
          <input
            className="bg-[#FFFFFF] border-[#39cf96] text-[#A9A9A9] w-full rounded-4xl shadow-sm focus:outline-none focus:ring-2 focus:border-[rgb(58,154,82)] border-2 pl-3 pt-1.5 pb-1.5 "
            value={form.site}
            placeholder="Enter The Website Name"
            onChange={Handle}
            type="text"
            name="site"
          />
        </div>
        <div className="pt-8 gap-4 flex w-full justify-between">
          <input
            className="bg-[#FFFFFF] border-[#39cf96] text-[#A9A9A9] rounded-4xl shadow-sm focus:outline-none focus:ring-2 focus:border-[rgb(58,154,82)] w-50  border-2 pl-3 pt-1.5 pb-1.5"
            value={form.user}
            placeholder="Enter Username"
            onChange={Handle}
            type="text"
            name="user"
          />
          <input
            className="bg-[#FFFFFF] border-[#39cf96] text-[#A9A9A9] rounded-4xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-[rgb(58,154,82)] w-50  border-2 focus:outline-none pl-3 pt-1.5 pb-1.5"
            value={form.pass}
            placeholder="Enter Password"
            onChange={Handle}
            type="password"
            name="pass"
          />
        </div>
        <div className="justify-center flex mt-8 items-center">
          <button
            onClick={Password}
            className="bg-[#16A085] text-black flex rounded-full items-center px-2 py-2"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Add Password
          </button>
        </div>
        <div className="mt-10 rounded-b-lg relative overflow-auto border-black">
          {pws.length === 0 && (
            <div className="bg-[#F3F4F6] overflow-x-auto max-w-full text-center text-black p-3 text-xl font-bold ">No Password To Show</div>
          )}
          <table className="table-auto mx-auto bg-[#265548] w-full border-collapse">
            {pws.length !== 0 && (
              <>
                <thead className="border-2 border-amber-200">
                  <tr className="text-center text-white">
                    <th className="px-4 py-2 border-2">SITE NAME</th>
                    <th className="px-4 py-2 border-2">USERNAME</th>
                    <th className="px-4 py-2 border-2">PASSWORDS</th>
                    <th className="px-4 py-2 border-2">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="text-center text-white">
                  {pws.map((items) => (
                    <tr key={items._id}>
                      <td className="px-4 py-2 border-2 ">
                        <div className="flex items-center justify-between gap-2">
                          {items.site}
                          <lord-icon
                            className="invert flex-shrink-0 cursor-pointer"
                            onClick={() => copy(items.site)}
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="hover"
                          ></lord-icon>
                        </div>
                      </td>
                      <td className="px-4 py-2 border-2 ">
                        <div className="flex items-center justify-between gap-2">
                          {items.user}
                          <lord-icon
                            className="invert flex-shrink-0 cursor-pointer"
                            onClick={() => copy(items.user)}
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="hover"
                          ></lord-icon>
                        </div>
                      </td>
                      <td className="px-4 py-2 border-2">
                        <div className="flex items-center justify-between gap-2">
                          {/* Display masked password */}
                          {'*******'} 
                          <lord-icon
                            className="invert flex-shrink-0 cursor-pointer"
                            onClick={() => { copy(items.password); }}
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="hover"
                          ></lord-icon>
                        </div>
                      </td>
                      <td className="px-4 py-2 border-2">
                        <div className="flex items-center invert justify-center gap-2">
                          <span>
                            <lord-icon onClick={() => editUser(items._id)}
                              src="https://cdn.lordicon.com/gwlusjdu.json"
                              trigger="hover"
                            ></lord-icon>
                          </span>
                          <span>
                            <lord-icon onClick={() => deleteUser(items._id)}
                              src="https://cdn.lordicon.com/skkahier.json"
                              trigger="hover"
                            ></lord-icon>
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </>
            )}
          </table>
        </div>
      </div>
    </>
  );
}

export default Manager;