<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Catatan extends Model
{
    use HasFactory;
    protected $table = 'catatan';
    protected $primaryKey = 'id';
    protected $fillable = ['title','text','user_id','kategori_id'];
    
    public function user()
    {
        return $this->belongsTo('App\User', 'user_id', 'id');
    }

    public function kategori()
    {
        return $this->belongsTo('App\Kategori', 'kategori_id', 'id');
    }
}
