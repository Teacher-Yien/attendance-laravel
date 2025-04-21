<?php  

namespace App\Http\Controllers;  

use App\Models\Semester;  
use Illuminate\Http\Request;  

class SemesterController extends Controller  
{  
    public function index()  
    {  
        // Retrieve all semesters from the database  
        $semesters = Semester::all();  
        return response()->json($semesters);  
    }  

    public function show($id)  
    {  
        // Retrieve a specific semester by ID  
        $semester = Semester::find($id);  

        if (!$semester) {  
            return response()->json(['message' => 'Semester not found'], 404);  
        }  

        return response()->json($semester);  
    }  

    public function store(Request $request)  
    {  
        // Validate the incoming request data  
        $request->validate([  
            'label' => 'required|string|max:255',  
        ]);  

        // Create a new semester  
        $semester = Semester::create($request->all());  

        return response()->json($semester, 201);  
    }  

    public function update(Request $request, $id)  
    {  
        // Validate the incoming request data  
        $request->validate([  
            'label' => 'required|string|max:255',  
        ]);  

        $semester = Semester::find($id);  
        if (!$semester) {  
            return response()->json(['message' => 'Semester not found'], 404);  
        }  

        // Update the semester  
        $semester->update($request->all());  

        return response()->json($semester);  
    }  

    public function destroy($id)  
    {  
        $semester = Semester::find($id);  
        if (!$semester) {  
            return response()->json(['message' => 'Semester not found'], 404);  
        }  

        // Delete the semester  
        $semester->delete();  

        return response()->json(['message' => 'Semester deleted successfully']);  
    }  
}  