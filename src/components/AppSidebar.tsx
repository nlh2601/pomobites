import { Timer, Settings, Cookie } from "lucide-react";
import tomatoChef from "@/assets/tomato-chef.png";
import { NavLink } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";

const items = [
  { title: "Timer", url: "/", icon: Timer },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b p-6 space-y-2">
        <div className="flex items-center gap-3">
          <img src={tomatoChef} alt="Tomato Chef Mascot" className="w-12 h-12" />
          <h1 className="text-2xl font-bold text-primary">PomoBites</h1>
        </div>
        <p className="text-xs text-muted-foreground italic">
          Your tasty productivity companion! 🍅
        </p>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                    >
                      {({ isActive }) => (
                        <div
                          className={
                            isActive
                              ? "flex items-center gap-3 px-3 py-2 bg-primary text-primary-foreground font-semibold rounded-lg shadow-sm"
                              : "flex items-center gap-3 px-3 py-2 text-foreground hover:bg-secondary rounded-lg transition-colors"
                          }
                        >
                          <item.icon className="h-5 w-5" />
                          <span>{item.title}</span>
                        </div>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
