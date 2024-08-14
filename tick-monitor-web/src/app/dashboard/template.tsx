import Appbar from "@/components/appbar/appbar";
import Drawer from "@/components/drawer/drawer";

const DashboardTemplate = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="flex h-screen">
        <Drawer />
        <div className="flex-grow bg-slate-50">
          <Appbar />
          {children}
        </div>
      </div>
    </>
  );
};

export default DashboardTemplate;
