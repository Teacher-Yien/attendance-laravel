<?php  
namespace App\Http\Controllers;  

use App\Models\Year;  
use Illuminate\Http\Request;  

class YearController extends Controller  
{  
    public function index()  
    {  
        // Retrieve all years  
        $years = Year::all();  
        
        // Pass the years to a view  
        return view('years.index', compact('years'));  
    }  
}  