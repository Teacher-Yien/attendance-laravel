import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    return (
        <div className=' '>
            <AppLayout breadcrumbs={breadcrumbs} >
                <Head title="Dashboard" />
                <div className=' group p-5'>
                    <img className=' w-[100px] h-[100px] mx-[45%]' src="image/rupp_logo.png" alt="" />
                    <p className=' text-center p-2 '>ប្រព័ន្ធស្រង់វត្តមានរបស់និស្សិតសកលវិទ្យាល័យភូមិន្ទភ្នំពេញ</p>
                </div>
                <div className=' grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-2 h-[120px] p-2'>
                    <div className=' bg-red-200 rounded'></div>
                    <div className=' bg-red-200 rounded'></div>
                    <div className=' bg-red-200 rounded'></div>
                    <div className=' bg-red-200 rounded'></div>
                    <div className=' bg-red-200 rounded'></div>
                </div>
            </AppLayout>
            
        </div>
        
        
    );
}
