<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProfessorController;
use App\Http\Controllers\ClassController;
use App\Http\Controllers\ProgramController;  
use App\Http\Controllers\YearController;  
use App\Http\Controllers\SemesterController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('professor', function () {
        return Inertia::render('professor');
    })->name('professor');

    Route::get('/professor', [ProfessorController::class, 'index'])->name('professor.index');  
    Route::post('/professor/store', [ProfessorController::class, 'store'])->name('professor.store');  
    Route::put('/professor/update/{TeacherID}', [ProfessorController::class, 'update'])
     ->name('professor.update');
    Route::delete('/professor/{id}', [ProfessorController::class, 'destroy'])->name('professor.destroy');

    Route::get('students', function () {
        return Inertia::render('students');
    })->name('students');

    Route::get('classes', function () {
        return Inertia::render('classes');
    })->name('classes');
    Route::get('/classes', [ClassController::class, 'index'])->name('classes.index');
    Route::post('/class', [ClassController::class, 'store']);
    Route::put('/class/{id}', [ClassController::class, 'update']);
    Route::delete('/class/{id}', [ClassController::class, 'destroy']);

    Route::get('/programs', [ProgramController::class, 'index']);  
    Route::get('/programs/{id}', [ProgramController::class, 'show']);  
    Route::post('/programs', [ProgramController::class, 'store']);  
    Route::put('/programs/{id}', [ProgramController::class, 'update']);  
    Route::delete('/programs/{id}', [ProgramController::class, 'destroy']);  


    Route::get('/years', [YearController::class, 'index']);  
    Route::get('/years/{id}', [YearController::class, 'show']);  
    Route::post('/years', [YearController::class, 'store']);  
    Route::put('/years/{id}', [YearController::class, 'update']);  
    Route::delete('/years/{id}', [YearController::class, 'destroy']); 


    Route::get('/semesters', [SemesterController::class, 'index']);  
    Route::get('/semesters/{id}', [SemesterController::class, 'show']);  
    Route::post('/semesters', [SemesterController::class, 'store']);  
    Route::put('/semesters/{id}', [SemesterController::class, 'update']);   
    Route::delete('/semesters/{id}', [SemesterController::class, 'destroy']);  

    Route::get('schedule', function () {
        return Inertia::render('schedule');
    })->name('schedule');

});

Route::get('/slider', function () {
    return Inertia::render('slider');
})->name('slidebar');

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
