<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Kategori;

class Catatan extends Model
{
    use HasFactory;
    protected $table = 'catatan';
    protected $primaryKey = 'id';
    protected $fillable = ['title','text','user_id','kategori_id'];
    
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function kategori()
    {
        return $this->belongsTo(Kategori::class);
    }
}
