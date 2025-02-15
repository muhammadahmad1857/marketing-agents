/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import * as React from "react";
import { Phone, History, ArrowUpDown, Home } from "lucide-react";

import { NavMain } from "./nav-main";
import { NavHome } from "./nav-home";
import { NavUser } from "./nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { getCurrentUser } from "@/actions/user";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { logout } from "@/actions/auth";

// This is sample data.
const data = {
  user: {
    name: null,
    email: null,
  },
  // teams: [
  //   {
  //     name: "",
  //     logo: GalleryVerticalEnd,
  //     plan: "Enterprise",
  //   },
  //   {
  //     name: "Acme Corp.",
  //     logo: AudioWaveform,
  //     plan: "Startup",
  //   },
  //   {
  //     name: "Evil Corp.",
  //     logo: Command,
  //     plan: "Free",
  //   },
  // ],
  navMain: [
    {
      title: "Send Call",
      url: "/send-call",
      icon: Phone,
      isActive: true,
      // items: [
      //   {
      //     title: "History",
      //     url: "#",
      //   },
      //   {
      //     title: "Starred",
      //     url: "#",
      //   },
      //   {
      //     title: "Settings",
      //     url: "#",
      //   },
      // ],
    },
    {
      title: "History",
      url: "/history",
      icon: History,
      // items: [],
    },
    {
      title: "Pathway",
      url: "/pathway",
      icon: ArrowUpDown,
      // items: [
      //   {
      //     title: "Introduction",
      //     url: "#",
      //   },
      //   {
      //     title: "Get Started",
      //     url: "#",
      //   },
      //   {
      //     title: "Tutorials",
      //     url: "#",
      //   },
      //   {
      //     title: "Changelog",
      //     url: "#",
      //   },
      // ],
    },
    //   {
    //     title: "inbound-agent",
    //     url: "inbound-agent",
    //     icon: BotOffIcon,
    //     items: [
    //       {
    //         title: "General",
    //         url: "#",
    //       },
    //       {
    //         title: "Team",
    //         url: "#",
    //       },
    //       {
    //         title: "Billing",
    //         url: "#",
    //       },
    //       {
    //         title: "Limits",
    //         url: "#",
    //       },
    //     ],
    //   },
  ],

  home: [
    {
      name: "Home",
      url: "/",
      icon: Home,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state } = useSidebar();
  const [isLoading, setIsLoading] = React.useState(true);
  const [count, setCount] = React.useState(0);
  const router = useRouter()
  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const userData = await getCurrentUser();
        const { email, user_name } = userData.user;
        data.user = {
          email,
          name: user_name,
        };
      } catch (error) {
        setCount((prev) => prev + 1);
        if(count<=3){
          router.refresh()

        }else{
          await logout() 
          router.refresh()

        }
        console.error("Error fetching user data:", error);
        toast.error("Failed to load user data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);
  // console.log(props)
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {/* <TeamSwitcher teams={data.teams} /> */}
        <div className="flex  gap-2 justify-between ">
          <Link
            href="/"
            className={`transition-opacity duration-200 ${
              state === "collapsed" ? "opacity-0 hidden" : "opacity-100"
            }`}
          >
            <h1 className="text-3xl font-bold m-b-2">Kognifi.ai</h1>
            <h1 className="text-xs font-semibold mb-6">Ai Call Agent</h1>
          </Link>
          <Separator
            orientation="vertical"
            className={`mr-2 h-full ${
              state === "collapsed" ? "opacity-0 hidden" : "opacity-100"
            }`}
          />
          <SidebarTrigger />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavHome home={data.home} />
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
