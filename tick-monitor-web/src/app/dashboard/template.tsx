import Appbar from "@/components/appbar/appbar";
import Drawer from "@/components/drawer/drawer";

const DashboardTemplate = () => {
  return (
    <>
      <div className="flex h-screen">
        <Drawer />
        <Appbar />
      </div>
    </>
  );
};

export default DashboardTemplate;
