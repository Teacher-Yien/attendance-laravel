import { Head, useForm, usePage } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import AppLayout from '@/layouts/app-layout';
import Swal from 'sweetalert2';
import { useState } from 'react';

type Professor = {
    TeacherID: number;
    FirstName: string;
    LastName: string;
    Gender: string;
    DateOfBirth:string;
    PhoneNumber:string;
    Email: string;
    Address: string,
    HireDate: string,
    Status: string;
};

type PageProps = {
    professor: Professor[];
};

export default function CreateProfessor() {
    const { props } = usePage<PageProps>();
    const professors = props.professor || [];

    const [modalOpen, setModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);

    const { data, setData, post, put, processing, errors, reset } = useForm({
        FirstName: '',
        LastName: '',
        Gender: '',
        DateOfBirth: '',
        PhoneNumber: '',
        Email: '',
        Address: '',
        HireDate: '',
        Status: 'Active',
    });

    const closeModal = () => {
        setModalOpen(false);
        setEditingId(null);
        reset();
    };

    // const submit = (e: React.FormEvent) => {
    //     e.preventDefault();

    //     const method = editingId ? put : post;
    //     const url = editingId ? `/professor/update/${editingId}` : '/professor/store';


    //     method(url, {
    //         onSuccess: () => {
    //             Swal.fire({
    //                 title: "ជោគជ័យ!",
    //                 text: editingId ? "បានកែប្រែព័ត៌មានគ្រូ!" : "គ្រូត្រូវបានបញ្ចូលដោយជោគជ័យ!",
    //                 icon: "success"
    //             });
    //             closeModal();
    //         }
    //     });
    // };
    
    const submit = (e: React.FormEvent) => {
        e.preventDefault();
    
        if (!data.FirstName || !data.LastName || !data.Email || !data.Gender) {
            Swal.fire({
                title: "Error",
                text: "Please fill in all required fields.",
                icon: "error"
            });
            return;
        }
    
        if (editingId === null || editingId === undefined) {
            Swal.fire({
                title: "Error",
                text: "Invalid professor ID.",
                icon: "error"
            });
            return;
        }
    
        const method = editingId ? put : post;
        const url = editingId ? `/professor/update/${editingId}` : '/professor/store';
    
        method(url, { ...data, onSuccess: () => {
            Swal.fire({
                title: "Success!",
                text: editingId ? "Professor information updated successfully!" : "Professor added successfully!",
                icon: "success"
            });
            closeModal();
        }, onError: () => {
            Swal.fire({
                title: "Error",
                text: "An error occurred while saving the professor's information.",
                icon: "error"
            });
        }});
    };
    

    const handleEdit = (professor: Professor) => {
        setEditingId(professor.TeacherID);
        setData({
            FirstName: professor.FirstName,
            LastName: professor.LastName,
            Gender: professor.Gender,
            DateOfBirth:professor.DateOfBirth,
            PhoneNumber: professor.PhoneNumber,
            Email: professor.Email,
            Address: professor.Address,
            HireDate: professor.HireDate,
            Status: professor.Status,
        });
        setModalOpen(true);
    };

    const handleDelete = (id: number) => {
        Swal.fire({
            title: 'តើអ្នកប្រាកដថាចង់លុប?',
            text: 'ព័ត៌មាននេះនឹងត្រូវលុបចេញជាអចិន្ត្រៃយ៍!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'លុប',
            cancelButtonText: 'បោះបង់'
        }).then((result) => {
            if (result.isConfirmed) {
                Inertia.delete(`/professor/${id}`);
            }
        });
    };

    return (
        <AppLayout>
            <Head title="Add New Teacher" />

            <button
                onClick={() => setModalOpen(true)}
                className="block w-[140px] border border-red-600 hover:bg-red-600 hover:text-white font-medium rounded-lg text-sm py-1 mx-3 mt-2 text-center"
                type="button"
            >
                បន្ថែមគ្រូថ្មី
            </button>

            {/* Modal */}
            {modalOpen && (
                <div
                    onClick={closeModal}
                    className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50"
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white rounded-lg shadow-md w-full max-w-xl p-6"
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">
                                {editingId ? 'កែប្រែព័ត៌មានគ្រូ' : 'បន្ថែមគ្រូថ្មី'}
                            </h2>
                            <button onClick={closeModal}>✕</button>
                        </div>

                        <form onSubmit={submit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input label="នាមត្រកូល" value={data.FirstName} onChange={(e) => setData('FirstName', e.target.value)} error={errors.FirstName} />
                                <Input label="នាមខ្លួន" value={data.LastName} onChange={(e) => setData('LastName', e.target.value)} error={errors.LastName} />
                                <Select label="ភេទ" value={data.Gender} onChange={(e) => setData('Gender', e.target.value)} options={['Male', 'Female']} error={errors.Gender} />
                                <Input type="date" label="ថ្ងៃខែឆ្នាំកំណើត" value={data.DateOfBirth} onChange={(e) => setData('DateOfBirth', e.target.value)} error={errors.DateOfBirth} />
                                <Input label="លេខទូរស័ព្ទ" value={data.PhoneNumber} onChange={(e) => setData('PhoneNumber', e.target.value)} error={errors.PhoneNumber} />
                                <Input type="email" label="អ៊ីមែល" value={data.Email} onChange={(e) => setData('Email', e.target.value)} error={errors.Email} />
                                <Textarea label="អាស័យដ្ឋាន" value={data.Address} onChange={(e) => setData('Address', e.target.value)} error={errors.Address} />
                                <Input type="date" label="កាលបរិច្ឆេទជួល" value={data.HireDate} onChange={(e) => setData('HireDate', e.target.value)} error={errors.HireDate} />
                                <Select label="ស្ថានភាព" value={data.Status} onChange={(e) => setData('Status', e.target.value)} options={['Active', 'Inactive']} error={errors.Status} />
                            </div>

                            <button type="submit" disabled={processing} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">
                                រក្សាទុក
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Teacher List */}
            <div className="mt-6 px-4">
                <h2 className="text-lg font-semibold mb-2">បញ្ជីគ្រូ</h2>
                <table className="min-w-full bg-white border border-gray-300 text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 border text-center">#</th>
                            <th className="px-4 py-2 border text-left">នាមត្រកូល</th>
                            <th className="px-4 py-2 border text-left">នាមខ្លួន</th>
                            <th className="px-4 py-2 border text-left">ភេទ</th>
                            <th className="px-4 py-2 border text-left">អ៊ីមែល</th>
                            <th className="px-4 py-2 border text-left">ស្ថានភាព</th>
                            <th className="px-4 py-2 border text-center">សកម្មភាព</th>
                        </tr>
                    </thead>
                    <tbody>
                        {professors.length > 0 ? (
                            professors.map((pro, index) => (
                                <tr key={pro.TeacherID} className="hover:bg-gray-50">
                                    <td className="px-4 py-2 border text-center">{index + 1}</td>
                                    <td className="px-4 py-2 border">{pro.FirstName}</td>
                                    <td className="px-4 py-2 border">{pro.LastName}</td>
                                    <td className="px-4 py-2 border">{pro.Gender}</td>
                                    <td className="px-4 py-2 border">{pro.Email}</td>
                                    <td className="px-4 py-2 border">{pro.Status}</td>
                                    <td className="px-4 py-2 border text-center space-x-2">
                                        <button onClick={() => handleEdit(pro)} className="text-blue-600 hover:underline">
                                            កែប្រែ
                                        </button>
                                        <button onClick={() => handleDelete(pro.TeacherID)} className="text-red-600 hover:underline">
                                            លុប
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={7} className="text-center py-4 text-gray-500">
                                    មិនមានទិន្នន័យ!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </AppLayout>
    );
}

// Reusable Inputs
type InputProps = {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    type?: string;
};

const Input = ({ label, value, onChange, error, type = 'text' }: InputProps) => (
    <div>
        <label className="block font-medium mb-1">{label}</label>
        <input type={type} value={value} onChange={onChange} className="w-full border rounded p-2" />
        {error && <div className="text-red-500 text-sm">{error}</div>}
    </div>
);

type TextareaProps = {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    error?: string;
};

const Textarea = ({ label, value, onChange, error }: TextareaProps) => (
    <div className="md:col-span-2">
        <label className="block font-medium mb-1">{label}</label>
        <textarea value={value} onChange={onChange} className="w-full border rounded p-2" />
        {error && <div className="text-red-500 text-sm">{error}</div>}
    </div>
);

type SelectProps = {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: string[];
    error?: string;
};

const Select = ({ label, value, onChange, options, error }: SelectProps) => (
    <div>
        <label className="block font-medium mb-1">{label}</label>
        <select value={value} onChange={onChange} className="w-full border rounded p-2">
            <option value="">ជ្រើសរើស</option>
            {options.map(option => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
        {error && <div className="text-red-500 text-sm">{error}</div>}
    </div>
);
