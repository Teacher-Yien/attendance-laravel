<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProfessorController;

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


});

Route::get('/slider', function () {
    return Inertia::render('slider');
})->name('slidebar');

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
