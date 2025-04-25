<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Classes;
use App\Models\Program;
use App\Models\Year;
use App\Models\Semester;

class ClassController extends Controller
{
    public function index()
    {
        return Inertia::render('Classes', [
            'classes' => Classes::with(['program', 'year', 'semester'])->get(),
            'programs' => Program::all(),
            'years' => Year::all(),
            'semesters' => Semester::all(),
        ]);
    }

    public function store(Request $request)
{
    $validatedData = $request->validate([
        'ClassName' => 'required|string|max:255',
        'ProgramID' => 'required|exists:programs,ProgramID',
        'YearID' => 'required|exists:years,YearID',
        'SemesterID' => 'required|exists:semesters,SemesterID',
    ]);

    Classes::create([
        'ClassName' => $validatedData['ClassName'],
        'ProgramID' => $validatedData['ProgramID'],
        'YearID' => $validatedData['YearID'],
        'SemesterID' => $validatedData['SemesterID'],
    ]);

    return redirect()->back()->with('success', 'Class created successfully');
}

    

public function update(Request $request, $id)
{
    $request->validate([
        'ClassName' => 'required|string|max:255',
        'ProgramID' => 'required|exists:programs,ProgramID',
        'YearID' => 'required|exists:years,YearID',
        'SemesterID' => 'required|exists:semesters,SemesterID',
    ]);

    $class = Classes::findOrFail($id);

    $class->update([
        'ClassName' => $request->ClassName,
        'ProgramID' => $request->ProgramID,
        'YearID' => $request->YearID,
        'SemesterID' => $request->SemesterID,
    ]);

    return redirect()->back()->with('success', 'Class updated successfully.');
}


    public function destroy($id)
    {
        Classes::findOrFail($id)->delete();

        return redirect()->back()->with('success', 'Class deleted.');
    }
}
