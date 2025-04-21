<?php  
// app/Models/Year.php  
namespace App\Models;  

use Illuminate\Database\Eloquent\Model;  

class Year extends Model  
{  
    protected $table = 'years'; // Make sure this matches your final table name  

    // Specify the primary key if it's different from 'id'  
    protected $primaryKey = 'YearID';  

    // If your table doesn't use timestamps  
    public $timestamps = false;  

    // Specify the fillable attributes  
    protected $fillable = [  
        'YearName',  
        'StartDate',  
        'EndDate',  
    ];  
}   