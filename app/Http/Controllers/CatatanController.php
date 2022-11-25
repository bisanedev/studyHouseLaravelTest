<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Notihnio\RequestParser\RequestParser;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use App\Models\Catatan;
use App\Models\Kategori;

class CatatanController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function index($id)
    {        
        $data = Catatan::with(['User'])->where('kategori_id', $id)->get();
        $kategori = Kategori::findOrFail($id);
        return response()->json([
            'status' => 'success',
            'message' => $data,
            'kategori' => $kategori
        ]);
    }

    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string',
            'kategoriID' => 'required|string',
            'userID' => 'required|string',
            'text' => 'required|string',
        ]);

        // pesan jika  validator error
        if ($validator->fails()) {
            return response()->json([
               'status' => "error",
               'message' => $validator->errors(),
            ], 400);
        }

        // catch jika database error
        try {

            $data = new Catatan;
            $data->title = $request->title;
            $data->text = $request->text;
            $data->kategori_id = $request->kategoriID;
            $data->user_id = $request->userID;
            $data->save();
            return response()->json([
                'status' => 'success',
                'message' => "Data ".$request->title." Berhasil Ditambahkan"
            ]);

        } catch (ModelNotFoundException $exception) {
            return response()->json([
                'status' => "error" ,
                'message' => "Create data bermasalah",
            ], 400);
        } 
    }

    public function update()
    {
        $_PATCH = RequestParser::parse()->params;
        $validator = Validator::make($_PATCH, [
            'id' => 'required|string',
            'title' => 'required|string',
            'text' => 'required|string'
        ]);

        // pesan jika  validator error
        if ($validator->fails()) {
            return response()->json([
               'status' => "error" ,
               'message' => $validator->errors(),
            ], 400);
        }

        // catch jika database error
        try {
            $data = Catatan::where('id', $_PATCH["id"])->firstOrFail();
            $data->title = $_PATCH["title"];
            $data->text = $_PATCH["text"];
            $data->save();                  
            return response()->json([
                'status' => 'success',
                'message' => "Data ".$_PATCH["title"]." Berhasil Di perbarui"
            ]);
        } catch (ModelNotFoundException $exception) {
            return response()->json([
                'status' => "error" ,
                'message' => "Data Tidak ditemukan",
             ], 400);
        }
    }

    public function delete()
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
        // catch jika database error
        try {
            $data = Catatan::findOrFail($_DELETE["id"]);  
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
