<?php


namespace App\Http\Controllers;  

use App\Models\Program;  
use Illuminate\Http\Request;  
use Inertia\Inertia;

class ProgramController extends Controller  
{  
    

public function index()
{
    $programs = Program::all();
    return Inertia::render('YourComponent', [
        'programs' => $programs
    ]);
}

}  