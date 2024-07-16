import Appbar from "@/components/appbar/appbar";
import Drawer from "@/components/drawer/drawer";

const DashboardTemplate = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="flex h-screen">
        <Drawer />
        <div className="flex-grow">
          <Appbar />
          {children}
        </div>
      </div>
    </>
  );
};

export default DashboardTemplate;
