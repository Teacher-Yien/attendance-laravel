<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Semester extends Model
{
    // Explicitly define the primary key and disable timestamps
    protected $primaryKey = 'SemesterID';
    public $timestamps = false;

    // Allow mass assignment
    protected $fillable = [
        'SemesterName',
        'YearID',
        'StartDate',
        'EndDate',
    ];

    // Relationships
    public function year()
    {
        return $this->belongsTo(Year::class, 'YearID');
    }

    public function classes()
    {
        return $this->hasMany(ClassModel::class, 'SemesterID');
    }
}
