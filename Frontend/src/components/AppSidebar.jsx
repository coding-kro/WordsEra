import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Link } from 'react-router-dom';
import logo from '@/assets/hero.png';
import { IoHome } from 'react-icons/io5';
import { BiSolidCategoryAlt } from 'react-icons/bi';
import { SiBlogger } from 'react-icons/si';
import { FaComments } from 'react-icons/fa';
import { PiUsersFill } from 'react-icons/pi';
import { GoDotFill } from 'react-icons/go';
import { RouteCategoryDetails } from '@/helpers/RouteName';

const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader className="bg-white">
        <img
          src={logo}
          style={{ width: '120px', height: '50px', objectFit: 'fill' }}
          alt="Logo"
        />
      </SidebarHeader>
      <SidebarContent className="bg-white">
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <IoHome />
                <Link to="">Home</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <BiSolidCategoryAlt />
                <Link to={RouteCategoryDetails}>Categories</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <SiBlogger />
                <Link to="">Blogs</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <FaComments />
                <Link to="">Comments</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <PiUsersFill />
                <Link to="">Users</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Categories</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <GoDotFill />
                <Link to="">Category item</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
