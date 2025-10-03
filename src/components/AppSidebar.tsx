import { Home, BarChart3, Sparkles, AlertTriangle, Filter, Calendar, Moon, Sun, User } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useTheme } from "next-themes";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const menuItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "AI Insights", url: "/ai", icon: Sparkles },
  { title: "Urgent Issues", url: "/urgent", icon: AlertTriangle },
  { title: "Feedback List", url: "/feedback", icon: Filter },
  { title: "Weekly Report", url: "/weekly", icon: Calendar },
];

export function AppSidebar() {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  // Replace with actual user data from your auth/context
  const userData = {
    name: "John Doe",
    email: "john.doe@example.com",
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Sidebar className="border-r border-sidebar-border">
      <SidebarContent>
        <div className="px-6 py-4">
          <h1 className="text-xl font-bold text-sidebar-foreground">Feedback Hub</h1>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className={({ isActive }) =>
                        isActive
                          ? "bg-sidebar-accent text-sidebar-primary font-medium"
                          : "hover:bg-sidebar-accent/50"
                      }
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        {/* Profile Section */}
        <div className="px-4 py-2 border-t border-sidebar-border">
          <button
            onClick={() => navigate('/profile')}
            className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-sidebar-accent transition-colors group"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0 shadow-sm">
              {getInitials(userData.name)}
            </div>
            <div className="flex-1 text-left overflow-hidden">
              <p className="text-sm font-medium text-sidebar-foreground truncate group-hover:text-sidebar-primary">
                {userData.name}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                View Profile
              </p>
            </div>
            <User className="h-4 w-4 text-muted-foreground group-hover:text-sidebar-primary flex-shrink-0 transition-colors" />
          </button>
        </div>

        {/* Theme Toggle */}
        <div className="px-4 py-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-full justify-start gap-2"
          >
            {theme === "dark" ? (
              <>
                <Sun className="h-4 w-4" />
                <span>Light Mode</span>
              </>
            ) : (
              <>
                <Moon className="h-4 w-4" />
                <span>Dark Mode</span>
              </>
            )}
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}