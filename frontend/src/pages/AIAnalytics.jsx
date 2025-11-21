import React from 'react';
import LayoutWithSidebar from '../components/LayoutWithSidebar';
import Card from '../components/EventCard';

export default function AIAnalytics(){
  return (
    <LayoutWithSidebar>
      <h2 className="text-2xl font-semibold mb-4">AI Analytics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <div className="font-semibold">Participation Trends</div>
          <div className="mt-4 h-40 bg-white/6 rounded" />
        </Card>
        <Card>
          <div className="font-semibold">Engagement Suggestions</div>
          <div className="mt-4 subtle">Try scheduling technical workshops on evenings to improve turnout.</div>
        </Card>
      </div>
    </LayoutWithSidebar>
  );
}
