<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Program extends Model
{
    // Custom primary key
    protected $primaryKey = 'ProgramID';

    // If your primary key is not auto-incrementing or not an integer, uncomment below:
    // public $incrementing = false;
    // protected $keyType = 'string';

    // Disable timestamps if your table does not have created_at / updated_at
    public $timestamps = false;

    // Table name (optional if it follows Laravel naming convention)
    protected $table = 'programs';

    // Mass assignable fields
    protected $fillable = [
        'ProgramName',
        'Description',
    ];

    // Relationships
    public function classes()
    {
        return $this->hasMany(ClassModel::class, 'ProgramID', 'ProgramID');
    }
}
