import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const page = usePage();
    return (
        <SidebarGroup className="px-2 py-1  ">
            {/* <SidebarGroupLabel>Platform</SidebarGroupLabel> */}
            <SidebarMenu >
                {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild isActive={item.href === page.url}>
                            <Link href={item.href} prefetch className='
                            flex items-center px-3 py-2 rounded
                            border border-red-600
                            hover:bg-red-600 hover:text-white

                            focus:outline-none       
                            focus:bg-red-600          
                            focus:text-white         
                            focus:ring-2             
                            focus:ring-red-400    '>
                                {item.icon && <item.icon />}
                                <span className=' p-2'>{item.title}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
