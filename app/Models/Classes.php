<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Classes extends Model
{
    // Specify the associated table if it doesn't match the plural of the model name
    protected $table = 'classes';

    protected $primaryKey = 'ClassID';

protected $fillable = [
    'ClassName',
    'ProgramID',
    'YearID',
    'SemesterID',
];


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
