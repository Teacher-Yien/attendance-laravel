<?php  

namespace App\Http\Controllers;  

use App\Models\Semester;  
use Illuminate\Http\Request;  

class SemesterController extends Controller  
{  
    public function index()  
    {  
        // Retrieve all years  
        $semester = Semester::all();  
        
        // Pass the years to a view  
        return view('semester.index', compact('semester'));  
    }   
}  