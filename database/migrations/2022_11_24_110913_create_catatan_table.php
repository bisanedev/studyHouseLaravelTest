<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('catatan', function (Blueprint $table) {
            $table->increments('id');
            $table->string('title',200);
            $table->longText('text');
            $table->integer('user_id')->nullable()->unsigned();            
            $table->foreign('user_id')->references('id')->on('users')->onDelete('set null');                                    
            $table->integer('kategori_id')->nullable()->unsigned();            
            $table->foreign('kategori_id')->references('id')->on('kategori')->onDelete('set null');                        
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('catatan');
    }
};
