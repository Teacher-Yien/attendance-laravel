<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Program;
use App\Models\Year;
use App\Models\Semester;
use App\Models\Classes; // If the class name is actually Classes  

class ClassController extends Controller
{
    public function index()
    {
        return Inertia::render('Classes', [
            'classes' => Classes::all(),
            'programs' => Program::all(), 
            'years' => Year::all(),
            'semesters' => Semester::all(),
        ]);
    }
    
    // Other methods...
}