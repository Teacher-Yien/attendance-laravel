<?php

namespace App\Http\Controllers;

use App\Models\Professor;
use Illuminate\Http\Request;

class ProfessorController extends Controller
{
    // List all professors
    public function index()
    {
        $professors = Professor::all();
        return inertia('CreateProfessor', ['professor' => $professors]);
    }

    // Store new professor
    public function store(Request $request)
    {
        $request->validate([
            'FirstName' => 'required|string|max:255',
            'LastName' => 'required|string|max:255',
            'Gender' => 'required|string',
            'DateOfBirth' => 'required|date',
            'PhoneNumber' => 'required|string',
            'Email' => 'required|email|unique:professors,Email',
            'Address' => 'nullable|string',
            'HireDate' => 'required|date',
            'Status' => 'required|string',
        ]);

        Professor::create($request->all());

        return redirect()->route('professor.index')->with('success', 'Professor added successfully.');
    }

    // Update professor
    public function update(Request $request, $TeacherID)
    {
        $professor = Professor::findOrFail($TeacherID);

        $request->validate([
            'FirstName' => 'required|string|max:255',
            'LastName' => 'required|string|max:255',
            'Gender' => 'required|string',
            'DateOfBirth' => 'required|date',
            'PhoneNumber' => 'required|string',
            'Email' => 'required|email|unique:professors,Email,' . $TeacherID,
            'Address' => 'nullable|string',
            'HireDate' => 'required|date',
            'Status' => 'required|string',
        ]);

        $professor->update($request->all());

        return redirect()->route('professor.index')->with('success', 'Professor updated successfully.');
    }

    // Delete professor
    public function destroy($TeacherID)
{
    $professor = Professor::findOrFail($TeacherID);
    $professor->delete();

    return redirect()->back()->with('success', 'Professor deleted successfully.');
}

}
