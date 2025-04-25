import { Head, useForm, usePage } from '@inertiajs/react';  
import { Inertia } from '@inertiajs/inertia';  
import AppLayout from '@/layouts/app-layout';  
import Swal from 'sweetalert2';  
import { useState, useEffect } from 'react';  

type Class = {  
  ClassID: number;  
  ClassName: string;  
  ProgramID: number;  
  YearID: number;  
  SemesterID: number;  
};  

type Program = { ProgramID: number; ProgramName: string };  
type Year = { YearID: number; YearName: string };  
type Semester = { SemesterID: number; SemesterName: string };  

type PageProps = {  
  classes?: Class[];  
  programs?: Program[];  
  years?: Year[];  
  semesters?: Semester[];  
};  

// Fixed component name to start with capital letter
export default function Classes() {  
  const { props } = usePage<PageProps>();  
  const {  
    classes = [],  
    programs = [],  
    years = [],  
    semesters = [],  
  } = props || {};  

  // For debugging purposes
  console.log("programs: " + programs);
  console.log("years: " + years.length);
  console.log("semesters: " + semesters.length);
  
  const [modalOpen, setModalOpen] = useState(false);  
  const [editingId, setEditingId] = useState<number | null>(null);  

  // Fix: Updated form types to match expected values
  const { data, setData, post, put, processing, reset, errors } = useForm({  
    ClassName: '',  
    ProgramID: '',  
    YearID: '',  
    SemesterID: '',  
  });  

  useEffect(() => {  
    // Reset form on modal close  
    if (!modalOpen) {  
      reset();  
      setEditingId(null);  
    }  
  }, [modalOpen]);  

  const openCreate = () => {  
    reset();  
    setEditingId(null);  
    setModalOpen(true);  
  };  

  const openEdit = (cls: Class) => {  
    setEditingId(cls.ClassID);  
    setData({  
      ClassName: cls.ClassName,  
      ProgramID: String(cls.ProgramID),  
      YearID: String(cls.YearID),  
      SemesterID: String(cls.SemesterID),  
    });  
    setModalOpen(true);  
  };  

  const closeModal = () => setModalOpen(false);  

  const submit = (e: React.FormEvent) => {  
    e.preventDefault();  
    const url = editingId ? `/classes/${editingId}` : '/classes';  
    
    if (editingId) {
      put(url, {
        onSuccess: () => {  
          Swal.fire({  
            title: 'Success!',  
            text: 'Class updated successfully.',  
            icon: 'success',  
          });  
          closeModal();  
        },  
        onError: (errors) => {  
          console.error(errors);
          Swal.fire({  
            title: 'Error!',  
            text: 'There was an error processing your request.',  
            icon: 'error',  
          });  
        },  
      });
    } else {
      post(url, {
        onSuccess: () => {  
          Swal.fire({  
            title: 'Success!',  
            text: 'New class added successfully.',  
            icon: 'success',  
          });  
          closeModal();  
        },  
        onError: (errors) => {  
          console.error(errors);
          Swal.fire({  
            title: 'Error!',  
            text: 'There was an error processing your request.',  
            icon: 'error',  
          });  
        },  
      });
    }
  };  

  const handleDelete = (id: number) => {
    Swal.fire({  
      title: 'Are you sure you want to delete this class?',  
      icon: 'warning',  
      showCancelButton: true,  
      confirmButtonText: 'Delete',  
    }).then((result) => {  
      if (result.isConfirmed) {  
        Inertia.delete(`/classes/${id}`, {  
          onSuccess: () => {  
            Swal.fire('Deleted!', '', 'success');  
          },  
          onError: (error) => {  
            console.error(error);
            Swal.fire({  
              title: 'Error!',  
              text: 'There was an error deleting the class.',  
              icon: 'error',  
            });  
          },  
        });  
      }  
    });  
  };

  return (
    <AppLayout>
      <Head title="គ្រប់គ្រងថ្នាក់" />

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold p-3">គ្រប់គ្រងថ្នាក់</h1>
        <button
          onClick={openCreate}
        
          className="border border-black text-black hover:bg-red-700 hover:text-white px-4 py-1 rounded font-semibold"
        >
          + បន្ថែមថ្នាក់ថ្មី
        </button>
      </div>

      {classes.length === 0 ? (
        <p className="text-gray-500 text-center">មិនទាន់មានថ្នាក់</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {classes.map(cls => {
            const program = programs.find(p => p.ProgramID === cls.ProgramID);
            const year = years.find(y => y.YearID === cls.YearID);
            const semester = semesters.find(s => s.SemesterID === cls.SemesterID);

            return (
              <div key={cls.ClassID} className="border rounded-lg shadow p-4 bg-white">
                <h2 className="text-lg font-bold text-blue-800 mb-2">{cls.ClassName}</h2>
                <p><span className="font-semibold">កម្មវិធី:</span> {program?.ProgramName}</p>
                <p><span className="font-semibold">ឆ្នាំទី:</span> {year?.YearName}</p>
                <p><span className="font-semibold">ឆមាសទី:</span> {semester?.SemesterName}</p>
                <p><span className="font-semibold">សិស្សសរុប:</span> ...</p>

                <div className="mt-3 flex gap-2">
                  <button className="flex-1 border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-2 py-1 rounded">
                    មើលសិស្ស
                  </button>
                  <button
                    onClick={() => openEdit(cls)}
                    className="border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white px-2 py-1 rounded"
                  >
                    កែប្រែ
                  </button>
                  <button
                    onClick={() => handleDelete(cls.ClassID)}
                    className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-2 py-1 rounded"
                  >
                    លុប
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        
      )}

      {modalOpen && (
        <div
          onClick={closeModal}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
        >
          <div
            onClick={e => e.stopPropagation()}
            className="bg-white rounded shadow-lg w-full max-w-lg p-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-medium">
                {editingId ? 'កែប្រែថ្នាក់' : 'ថ្នាក់ថ្មី'}
              </h2>
              <button onClick={closeModal}>✕</button>
            </div>
            <form onSubmit={submit} className="space-y-4">
              <div>
                <label className="block mb-1">ឈ្មោះថ្នាក់</label>
                <input
                  type="text"
                  value={data.ClassName}
                  onChange={e => setData('ClassName', e.target.value)}
                  className="w-full border rounded p-2"
                  required
                />
                {errors.ClassName && <p className="text-red-500 text-sm">{errors.ClassName}</p>}
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1">កម្មវិធី</label>
                  <select
                    value={data.ProgramID}
                    onChange={e => setData('ProgramID', e.target.value)}
                    className="w-full border rounded p-2"
                    required
                  >
                    <option value="">ជ្រើសរើស</option>
                    {programs.map(p => (
                      <option className=' text-black' key={p.ProgramID} value={p.ProgramID}>{p.ProgramName}</option>
                    ))}
                  </select>
                  {errors.ProgramID && <p className="text-red-500 text-sm">{errors.ProgramID}</p>}
                </div>
                <div>
                  <label className="block mb-1">ឆ្នាំទី</label>
                  <select
                    value={data.YearID}
                    onChange={e => setData('YearID', e.target.value)}
                    className="w-full border rounded p-2"
                    required
                  >
                    <option value="">ជ្រើសរើស</option>
                    {years.map(y => (
                      <option key={y.YearID} value={y.YearID}>{y.YearName}</option>
                    ))}
                  </select>
                  {errors.YearID && <p className="text-red-500 text-sm">{errors.YearID}</p>}
                </div>
                <div>
                  <label className="block mb-1">ឆមាស</label>
                  <select
                    value={data.SemesterID}
                    onChange={e => setData('SemesterID', e.target.value)}
                    className="w-full border rounded p-2"
                    required
                  >
                    <option value="">ជ្រើសរើស</option>
                    {semesters.map(s => (
                      <option key={s.SemesterID} value={s.SemesterID}>{s.SemesterName}</option>
                    ))}
                  </select>
                  {errors.SemesterID && <p className="text-red-500 text-sm">{errors.SemesterID}</p>}
                </div>
              </div>
              <div className="text-right">
                <button
                  type="submit"
                  disabled={processing}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                  {editingId ? 'កែប្រែ' : 'បន្ថែម'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AppLayout>
  );
}