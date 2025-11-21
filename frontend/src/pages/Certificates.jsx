import React from 'react';
import LayoutWithSidebar from '../components/LayoutWithSidebar';
import Card from '../components/EventCard';

export default function Certificates(){
  const certs = [
    { event:'Annual College Fest', date:'22 Sep', url:'/assets/cert_demo_1.pdf' }
  ];
  return (
    <LayoutWithSidebar>
      <h2 className="text-2xl font-semibold mb-4 text-white">My Certificates</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {certs.map((c,i)=>(
          <Card key={i} className="flex items-center justify-between">
            <div>
              <div className="font-semibold">{c.event}</div>
              <div className="subtle text-sm">Issued {c.date}</div>
            </div>
            <a className="btn-primary" href={c.url}>Download</a>
          </Card>
        ))}
      </div>
    </LayoutWithSidebar>
  );
}
