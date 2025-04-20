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
type Year = { id: number; label: string };
type Semester = { id: number; label: string };

type PageProps = {
  classes?: Class[];
  programs?: Program[];
  years?: Year[];
  semesters?: Semester[];
};

export default function Classes() {
  const { props } = usePage<PageProps>();
  const {
    classes = [],
    programs = [],
    years = [],
    semesters = [],
  } = props || {};

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

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
    const url = editingId ? `/class/${editingId}` : '/class';
    const method = editingId ? put : post;

    method(url, {
      onSuccess: () => {
        Swal.fire({
          title: 'ជោគជ័យ!',
          text: editingId ? 'កែប្រែថ្នាក់រួចរាល់' : 'បន្ថែមថ្នាក់ថ្មីបានជោគជ័យ។',
          icon: 'success',
        });
        closeModal();
      },
    });
  };

  const handleDelete = (id: number) => {
    Swal.fire({
      title: 'តើអ្នកចង់លុបថ្នាក់នេះមែនទេ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'លុប',
    }).then((r) => {
      if (r.isConfirmed) {
        Inertia.delete(`/class/${id}`);
        Swal.fire('លុបរួចរាល់!', '', 'success');
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
        <p className="text-gray-500">មិនទាន់មានថ្នាក់។</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {classes.map(cls => {
            const program = programs.find(p => p.id === cls.ProgramID);
            const year = years.find(y => y.id === cls.YearID);
            const semester = semesters.find(s => s.id === cls.SemesterID);

            return (
              <div key={cls.ClassID} className="border rounded-lg shadow p-4 bg-white">
                <h2 className="text-lg font-bold text-blue-800 mb-2">{cls.ClassName}</h2>
                <p><span className="font-semibold">កម្មវិធី:</span> {program?.name}</p>
                <p><span className="font-semibold">ឆ្នាំទី:</span> {year?.label}</p>
                <p><span className="font-semibold">ឆមាសទី:</span> {semester?.label}</p>
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                      <option key={p.id} value={p.id}>{p.name}</option>
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
                      <option key={y.id} value={y.id}>{y.label}</option>
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
