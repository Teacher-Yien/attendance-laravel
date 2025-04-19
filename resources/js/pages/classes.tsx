import { Head, useForm, usePage } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import AppLayout from '@/layouts/app-layout';
import Swal from 'sweetalert2';
import { useState } from 'react';

type Class = {
  ClassID: number;
  ClassName: string;
  ProgramID: number;
  YearID: number;
  SemesterID: number;
};

type Program = { id: number; name: string };
type Year    = { id: number; label: string };
type Semester = { id: number; label: string };

type PageProps = {
  classes: Class[];
  programs: Program[];
  years: Year[];
  semesters: Semester[];
};

export default function Classes() {
  const { props } = usePage<PageProps>();
  const { classes, programs, years, semesters } = props;

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Inertia form
  const { data, setData, post, put, processing, reset, errors } = useForm({
    ClassName: '',
    ProgramID: '',
    YearID: '',
    SemesterID: '',
  });

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
  const closeModal = () => {
    reset();
    setEditingId(null);
    setModalOpen(false);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingId
      ? `/class/${editingId}`
      : '/class';
    const method = editingId ? put : post;

    method(url, {
      onSuccess: () => {
        Swal.fire({
          title: 'Success!',
          text: editingId ? 'Class updated.' : 'Class created.',
          icon: 'success',
        });
        closeModal();
      },
    });
  };

  const handleDelete = (id: number) => {
    Swal.fire({
      title: 'Delete this class?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete',
    }).then((r) => {
      if (r.isConfirmed) {
        Inertia.delete(`/class/${id}`);
        Swal.fire('Deleted!', '', 'success');
      }
    });
  };

  return (
    <AppLayout>
      <Head title="Create Classes" />

      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">គ្រប់គ្រងថ្នាក់</h1>
          <button
            onClick={openCreate}
            className="border border-red-600 text-black hover:bg-red-700 hover:text-white px-4 py-1 rounded font-semibold"
          >
            + បន្តែមថ្នាក់ថ្មី
          </button>
        </div> 

        {/* Classes Table */}
        <div className="grid grid-cols-5 ">
          <div className="content-class p-5 rounded border border-dotted border-red-500 ">
												<h1 className=' text-black font-semibold p-1'>ថ្នាក់: </h1>
												<h1 className=' text-black font-semibold p-1'>ឆ្នាំទី: </h1>
												<h1 className=' text-black font-semibold p-1'>ឆមាសទី: </h1>
												<h1 className=' text-black font-semibold'>សិស្សសរុប: </h1>
												<button className=' p-1 rounded font-semibold w-full border border-red-600 mt-3'>បញ្ចូលសិស្ស</button>
										</div>
        </div>
      </div>

      {/* Create / Edit Modal */}
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
                {editingId ? 'Edit Class' : 'New Class'}
              </h2>
              <button onClick={closeModal}>✕</button>
            </div>
            <form onSubmit={submit} className="space-y-4">
              <div>
                <label className="block mb-1">Class Name</label>
                <input
                  type="text"
                  value={data.ClassName}
                  onChange={e => setData('ClassName', e.target.value)}
                  className="w-full border rounded p-2"
                  required
                />
                {errors.ClassName && <p className="text-red-500 text-sm">{errors.ClassName}</p>}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block mb-1">Program</label>
                  <select
                    value={data.ProgramID}
                    onChange={e => setData('ProgramID', e.target.value)}
                    className="w-full border rounded p-2"
                    required
                  >
                    <option value="">Select</option>
                    {programs.map(p => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                  {errors.ProgramID && <p className="text-red-500 text-sm">{errors.ProgramID}</p>}
                </div>
                <div>
                  <label className="block mb-1">Year</label>
                  <select
                    value={data.YearID}
                    onChange={e => setData('YearID', e.target.value)}
                    className="w-full border rounded p-2"
                    required
                  >
                    <option value="">Select</option>
                    {years.map(y => (
                      <option key={y.id} value={y.id}>{y.label}</option>
                    ))}
                  </select>
                  {errors.YearID && <p className="text-red-500 text-sm">{errors.YearID}</p>}
                </div>
                <div>
                  <label className="block mb-1">Semester</label>
                  <select
                    value={data.SemesterID}
                    onChange={e => setData('SemesterID', e.target.value)}
                    className="w-full border rounded p-2"
                    required
                  >
                    <option value="">Select</option>
                    {semesters.map(s => (
                      <option key={s.id} value={s.id}>{s.label}</option>
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
                  {editingId ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AppLayout>
  );
}
