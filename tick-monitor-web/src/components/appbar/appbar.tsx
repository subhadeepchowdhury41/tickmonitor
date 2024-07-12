import Image from "next/image";
import BellIcon from "@/assets/icons/bell.png";

const Appbar = () => {
  return (
    <>
      <div className="flex-grow h-20 border-b-[1px] border-slate-200 flex items-center justify-between px-4">
        <div></div>
        <div className="flex items-center gap-8">
          <div className="w-6 h-6 cursor-pointer">
            <Image src={BellIcon} alt="bell-icon" />
          </div>
          <div className="w-12 h-12 bg-slate-800 rounded-full cursor-pointer"></div>
        </div>
      </div>
    </>
  );
};

export default Appbar;
