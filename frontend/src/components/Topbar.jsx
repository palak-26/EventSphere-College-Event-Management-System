import React, { useContext } from 'react';
import { useAuth } from '../contexts/AuthContext';
import logo from '../assets/logo.png'
import studentAvatar from "../assets/student.svg";
import clubAvatar from "../assets/club.png";
import adminAvatar from "../assets/admin.png";


export default function Topbar({ onMenuClick }){
  const { user } = useAuth();
  const getAvatar = () => {
  if (!user) return studentAvatar;

  switch (user.role) {
    case "student":
      return studentAvatar;
    case "club":
      return clubAvatar;
    case "admin":
      return adminAvatar;
    default:
      return studentAvatar;
  }
};


  return (
    <div className="flex items-center justify-between py-4 px-6 bg-transparent">
      <div className="flex items-center gap-4">
        <button className="md:hidden text-white/90" onClick={onMenuClick}>☰</button>
        <img src={logo} alt="EventSphere" className='h-[40px] w-[40px]' />
        <div className="text-white text-xl font-bold">EventSphere</div>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-white  hidden sm:block">
          Welcome{user ? `, ${user.name}` : ''}
          <p><a href="/home">Logout</a></p>
        </div>
        
        <div className="w-10 h-10 rounded-full bg-white overflow-hidden border border-gray-300">
          <img src={getAvatar()} alt="avatar" className="w-full h-full object-cover" />
        </div>

        
        
      </div>
    </div>
  );
}
