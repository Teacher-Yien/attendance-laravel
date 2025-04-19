<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Professor extends Model
{
    protected $table = 'professor';

    protected $primaryKey = 'TeacherID'; // ← this is the fix

    public $timestamps = true;

    public $incrementing = true; // since it's auto_increment
    protected $keyType = 'int';

    protected $fillable = [
        'FirstName',
        'LastName',
        'Gender',
        'DateOfBirth',
        'PhoneNumber',
        'Email',
        'Address',
        'HireDate',
        'Status',
    ];
}
