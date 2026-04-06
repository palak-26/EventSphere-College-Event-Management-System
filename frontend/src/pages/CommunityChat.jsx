import LayoutWithSidebar from "../components/LayoutWithSidebar";
import CommunityChat from "../components/CommunityChat";

export default function CommunityChats() {
  return (
    <LayoutWithSidebar>
      
      {/* REMOVE max-width + center alignment */}
      <div className="w-full h-[calc(100vh-80px)] text-white">

        <h1 className="text-2xl md:text-3xl font-bold mb-4">
          Community Chats
        </h1>

        {/* FULL WIDTH CHAT */}
        <div className="h-full">
          <CommunityChat />
        </div>

      </div>

    </LayoutWithSidebar>
  );
}