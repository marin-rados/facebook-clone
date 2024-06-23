import { useSession } from "next-auth/react";
import {
  ChevronDownIcon,
  ShoppingBagIcon,
  UserGroupIcon,
  ComputerDesktopIcon,
} from "@heroicons/react/24/outline";
import { CalendarIcon, ClockIcon, UsersIcon } from "@heroicons/react/16/solid";
import SidebarRow from "./sidebarRow";

const Sidebar = () => {
  const session = useSession();
  return (
    <div className="p-2 mt-5 max-w-[600px] xl:min-w-[300px]">
      <SidebarRow
        src={session.data?.user?.image}
        title={session.data?.user?.name}
      />
      <SidebarRow Icon={UsersIcon} title="Friends" />
      <SidebarRow Icon={UserGroupIcon} title="Groups" />
      <SidebarRow Icon={ShoppingBagIcon} title="Marketplace" />
      <SidebarRow Icon={ComputerDesktopIcon} title="Watch" />
      <SidebarRow Icon={CalendarIcon} title="Events" />
      <SidebarRow Icon={ClockIcon} title="Memories" />
      <SidebarRow Icon={ChevronDownIcon} title="See More" />
    </div>
  );
};

export default Sidebar;
