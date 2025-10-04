import { Timer, Settings } from "lucide-react";
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
  useSidebar,
} from "@/components/ui/sidebar";

const items = [
  { title: "Timer", url: "/", icon: Timer },
  { title: "Settings", url: "/settings", icon: Settings },
];

interface AppSidebarProps {
  transparent?: boolean;
}

export function AppSidebar({ transparent = false }: AppSidebarProps) {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon" className={transparent ? "bg-transparent border-transparent" : ""}>
      {!isCollapsed && (
        <SidebarHeader className="border-b p-6 space-y-2">
          <div className="flex items-center gap-3">
            <img src={tomatoChef} alt="Tomato Chef Mascot" className="w-12 h-12" />
            <h1 className="text-2xl font-bold text-primary">PomoBites</h1>
          </div>
          <p className="text-xs text-muted-foreground italic">
            Your tasty productivity companion! 🍅
          </p>
        </SidebarHeader>
      )}
      <SidebarContent className={isCollapsed ? "pt-4" : "pt-4"}>
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
                              ? `flex items-center ${isCollapsed ? 'justify-center' : 'gap-3 px-3'} py-2 bg-primary text-primary-foreground font-semibold rounded-full shadow-sm`
                              : `flex items-center ${isCollapsed ? 'justify-center' : 'gap-3 px-3'} py-2 text-foreground hover:bg-secondary rounded-full transition-colors`
                          }
                        >
                          <item.icon className="h-5 w-5" />
                          {!isCollapsed && <span>{item.title}</span>}
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
