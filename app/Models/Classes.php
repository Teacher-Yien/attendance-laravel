<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Classes extends Model
{
    // Specify the associated table if it doesn't match the plural of the model name
    protected $table = 'classes';

    // If your table doesn't use 'id' as the primary key
    // protected $primaryKey = 'ClassID';

    // If your table doesn't use timestamps
    // public $timestamps = false;

    // Relationships
    public function program()
    {
        return $this->belongsTo(Program::class, 'ProgramID');
    }

    public function year()
    {
        return $this->belongsTo(Year::class, 'YearID');
    }

    public function semester()
    {
        return $this->belongsTo(Semester::class, 'SemesterID');
    }
}
