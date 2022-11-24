<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CatatanController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
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
