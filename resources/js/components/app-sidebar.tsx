import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid ,ShieldPlus,School,CopyCheck,GraduationCap ,CalendarCheck2} from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'គ្រប់គ្រង',
        href: '/dashboard',
        icon: LayoutGrid, 
    },
    {
        title:'សាស្រ្តាចារ្យ',
        href:'/professor',
        icon:ShieldPlus,
    },
    // {
    //     title:'និស្សិត',
    //     href:'/students',
    //     icon:GraduationCap,
    // },
    {
        title:'កាល វិភាគ',
        href:'/schedule',
        icon:CalendarCheck2,
    },
    // {
    //     title:'ថ្នាក់',
    //     href:'/classes',
    //     icon:School,
    // },
    {
        title:'វត្តមាន',
        href:'/attendance',
        icon:CopyCheck,
    },
];

const footerNavItems: NavItem[] = [
    // {
    //     title: 'Repository',
    //     href: 'https://github.com/Teacher-Yien',
    //     icon: Folder,
    // },
    // {
    //     title: 'Documentation',
    //     href: 'https://github.com/Teacher-Yien',
    //     icon: BookOpen,
    // },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                        
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain  items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
