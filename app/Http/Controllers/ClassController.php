<?php
namespace App\Http\Controllers;

use App\Models\ClassModel;
use App\Models\Program;
use App\Models\Year;
use App\Models\Semester;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClassController extends Controller
{
    public function index()
    {
        return Inertia::render('Classes', [
            'classes' => ClassModel::with(['program', 'year', 'semester'])->get(),
            'programs' => Program::all(),
            'years' => Year::all(),
            'semesters' => Semester::all(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'ClassName' => 'required|string|max:255',
            'ProgramID' => 'required|exists:programs,id',
            'YearID' => 'required|exists:years,id',
            'SemesterID' => 'required|exists:semesters,id',
        ]);

        ClassModel::create($validated);

        return redirect()->back();
    }

    public function update(Request $request, $id)
    {
        $class = ClassModel::findOrFail($id);

        $validated = $request->validate([
            'ClassName' => 'required|string|max:255',
            'ProgramID' => 'required|exists:programs,id',
            'YearID' => 'required|exists:years,id',
            'SemesterID' => 'required|exists:semesters,id',
        ]);

        $class->update($validated);

        return redirect()->back();
    }

    public function destroy($id)
    {
        $class = ClassModel::findOrFail($id);
        $class->delete();

        return redirect()->back();
    }
}
