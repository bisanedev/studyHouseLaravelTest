<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Catatan;

class CatatanController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function index($id)
    {        
        $data = Catatan::with(['User','Kategori'])->where('kategori_id', $id)->get();
        return response()->json([
            'status' => 'success',
            'message' => $data
        ]);
    }

    public function create(Request $request)
    {
        echo "create";
    }

    public function update(Request $request)
    {
        echo "updated";
    }

    public function delete(Request $request)
    {
        echo "delete";
    }
}
