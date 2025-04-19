<?php
use Illuminate\Database\Migrations\Migration;  
use Illuminate\Database\Schema\Blueprint;  
use Illuminate\Support\Facades\Schema;  

class CreateProfessorsTable extends Migration  
{  
    public function up()  
    {  
        Schema::create('professor', function (Blueprint $table) {  
            $table->id(); // Auto-incrementing ID  
            $table->string('FirstName');  
            $table->string('LastName');  
            $table->string('Gender');  
            $table->date('DateOfBirth');  
            $table->string('PhoneNumber');  
            $table->string('Email')->unique();  
            $table->string('Address')->nullable();  
            $table->date('HireDate');  
            $table->string('Status');  
            $table->timestamps(); // This will create created_at and updated_at columns  
        });  
    }  

    public function down()  
    {  
        Schema::dropIfExists('professor');  
    }  
}  

// Run `php artisan migrate` to apply migrations  