import React, { useEffect, useState } from 'react';
import LayoutWithSidebar from '../components/LayoutWithSidebar';
import API from '../utils/api';

export default function ClubApprovals(){
  const [clubs, setClubs] = useState([]);
  useEffect(()=>{
    API.get('/clubs/pending').then(r => setClubs(r.data));
  }, []);

  const approve = async (id) => {
    await API.put(`/clubs/${id}/approve`);
    setClubs(prev => prev.filter(c=>c._id !== id));
  };

  return (
    <LayoutWithSidebar>
      <h2 className="text-2xl font-semibold mb-4 text-white">Club Approvals</h2>
      <div className="space-y-3">
        {clubs.map(c => (
          <div key={c._id} className="surface p-4 flex items-center justify-between">
            <div>
              <div className="font-semibold">{c.name}</div>
              <div className="text-sm text-gray-500">{c.description}</div>
            </div>
            <div>
              <button onClick={()=>approve(c._id)} className="btn-primary">Approve</button>
            </div>
          </div>
        ))}
        {clubs.length === 0 && <div className="subtle">No pending clubs</div>}
      </div>
    </LayoutWithSidebar>
  );
}
