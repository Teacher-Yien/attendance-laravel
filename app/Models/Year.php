<?php
// app/Models/ClassModel.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ClassModel extends Model
{
    protected $table = 'classes';
    protected $primaryKey = 'ClassID';
    public $timestamps = false;

    protected $fillable = [
        'ClassName',
        'ProgramID',
        'YearID',
        'SemesterID',
    ];

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
