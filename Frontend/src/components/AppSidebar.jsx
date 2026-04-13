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
import { RouteBlog, RouteCategoryDetails } from '@/helpers/RouteName';
import { useFetch } from '@/hooks/useFetch';

const AppSidebar = () => {
  const API_URL = import.meta.env.VITE_API_BASE_URL;

  const { data: categoryData } = useFetch(`${API_URL}/category/all-category`, {
    method: 'get',
    credentials: 'include',
  });

  // console.log(categoryData);

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
                <Link to={RouteBlog}>Blogs</Link>
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
            {categoryData && categoryData.category.length > 0 &&
              categoryData.category.map((category) => (
                <SidebarMenuItem key={category._id}>
                  <SidebarMenuButton>
                    <GoDotFill />
                    <Link to="">{category.name}</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
