import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
                <header className="mb-6 w-full max-w-[500px] text-sm not-has-[nav]:hidden lg:max-w-7xl">
                    <nav className="flex items-center justify-end gap-4">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="  inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] border-[#ee3436] dark:text-[#EDEDEC] hover:text-gray-50 hover:bg-[#ee3436] "
                                >
                                    ចូលគណនី
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="inline-block rounded-sm  px-5 py-1.5 text-sm leading-normal text-[#fff]  dark:text-[#EDEDEC] bg-[#ee3436]"
                                >
                                    ចុះឈ្មោះ
                                </Link>
                            </>
                        )}
                    </nav>
                </header>
                <div className="flex w-full flex-col items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                    <main className=" flex w-full max-w-[400px]  flex-col">
                        <img className=' w-[200px] h-[200px] m-auto' src="image/rupp_logo.png" alt="" />
                        <h1 className=' text-logo text-center mt-3' style={{ fontFamily:"Moul" }} >សូមស្វាគមន៍មកកាន់ប្រព័ន្ធស្រង់វត្តមានរបស់និស្សិតនៃសកលវិទ្យាល័យភូមិន្ទភ្នំពេញ</h1>
                        
                    </main>
                    <section className="xl:w-[60%] lg:w-[60%] md:w-[70%] mt-5">
                    <p className="text-gray-300 text-center text-[14px] xl:line-clamp-3 lg:line-clamp-3 md:line-clamp-2 sm:line-clamp-2">
                        ប្រព័ន្ធនេះត្រូវបានអភិវឌ្ឍឡើងដើម្បីជួយគ្រប់គ្រងការស្រង់វត្តមានរបស់និស្សិត។  
                        វាអាចប្រើសម្រាប់កត់ត្រា ពិនិត្យ និងរៀបចំព័ត៌មានអំពីវត្តមាន។  
                        ប្រព័ន្ធនេះផ្ដល់ភាពងាយស្រួលដល់គ្រូបង្រៀន និងបុគ្គលិកក្នុងការត្រួតពិនិត្យទិន្នន័យ។  
                    </p>
                    </section>

                    
                </div>
                
                <div className="hidden h-14.5 lg:block"></div>
            </div>
        </>
    );
}
