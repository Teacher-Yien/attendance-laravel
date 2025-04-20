<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

// ClassModel.php
class ClassModel extends Model
{
    protected $table = 'classes';

    public function program() {
        return $this->belongsTo(Program::class, 'ProgramID');
    }

    public function year() {
        return $this->belongsTo(Year::class, 'YearID');
    }

    public function semester() {
        return $this->belongsTo(Semester::class, 'SemesterID');
    }
}

