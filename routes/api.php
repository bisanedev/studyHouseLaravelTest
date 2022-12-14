<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\KategoriController;
use App\Http\Controllers\CatatanController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::controller(AuthController::class)->group(function () {
    Route::post('/login', 'login');
    Route::post('/register', 'register');
    Route::post('/logout', 'logout');
    Route::post('/refresh', 'refresh');
});

Route::controller(KategoriController::class)->group(function () {
    Route::get('/kategori', 'index');
    Route::post('/kategori', 'create');
    Route::patch('/kategori', 'update');
    Route::delete('/kategori', 'delete');
    Route::get('/kategori/coba', 'coba');
});

Route::controller(CatatanController::class)->group(function () {
    Route::get('/catatan/kategori/{id}', 'index');
    Route::post('/catatan', 'create');
    Route::patch('/catatan', 'update');
    Route::delete('/catatan', 'delete');
});
