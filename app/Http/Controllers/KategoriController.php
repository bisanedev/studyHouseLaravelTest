<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Notihnio\RequestParser\RequestParser;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use App\Models\Kategori;

class KategoriController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function index()
    {
        $data = Kategori::all();
        return response()->json([
            'status' => 'success',
            'message' => $data  
        ]);
    }

    public function create(Request $request)
    {        
        $validator = Validator::make($request->all(), [
            'nama' => 'required|string'
        ]);

        // pesan jika  validator error
        if ($validator->fails()) {
            return response()->json([
               'status' => "error",
               'message' => $validator->errors(),
            ], 400);
        }

        try {
            
            $data = new Kategori;
            $data->nama = $request->nama;
            $data->save();

        } catch (ModelNotFoundException $exception) {
            return response()->json([
                'status' => "error" ,
                'message' => "Create data bermasalah",
            ], 400);
        } 

        return response()->json([
            'status' => 'success',
            'message' => "Data ".$request->nama." Berhasil Ditambahkan"
        ]);
    }

    public function update()
    {
        $_PATCH = RequestParser::parse()->params;
        $validator = Validator::make($_PATCH, [
            'id' => 'required|string',
            'nama' => 'required|string'
        ]);

        // pesan jika  validator error
        if ($validator->fails()) {
            return response()->json([
               'status' => "error" ,
               'message' => $validator->errors(),
            ], 400);
        }

        try {
            $data = Kategori::where('id', $_PATCH["id"])->firstOrFail();
            $data->nama = $_PATCH["nama"];
            $data->save();                  
            return response()->json([
                'status' => 'success',
                'message' => "Data ".$_PATCH["nama"]." Berhasil Di perbarui"
            ]);
        } catch (ModelNotFoundException $exception) {
            return response()->json([
                'status' => "error" ,
                'message' => "Data Tidak ditemukan",
             ], 400);
        }   

        return response()->json([
            'status' => 'success',
            'message' => "Data ".$_PATCH["nama"]." Berhasil Di Perbarui"
        ]);
    }

    public function delete(Request $request)
    {
        $_DELETE = RequestParser::parse()->params;
        $validator = Validator::make($_DELETE, [
            'id' => 'required|string'
        ]);

        // pesan jika  validator error
        if ($validator->fails()) {
            return response()->json([
               'status' => "error" ,
               'message' => $validator->errors(),
            ], 400);
        }

        try {
            $data = Kategori::findOrFail($_DELETE["id"]);  
            $data->delete();          
            return response()->json([
                'status' => 'success',
                'message' => "Data ".$data->nama." Berhasil Di hapus"
            ]);
        } catch (ModelNotFoundException $exception) {
            return response()->json([
                'status' => "error" ,
                'message' => "Data Tidak ditemukan",
             ], 400);
        }    
    }
}
