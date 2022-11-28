<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use DateTimeImmutable;

class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login','register']]);
    }

    public function login(Request $request)
    {
        $now = new DateTimeImmutable(); 

        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'password' => 'required|string',
            'remember' => 'required|boolean'
        ]);

        // pesan jika  validator error
        if ($validator->fails()) {
            return response()->json([
               'status' => 'error',
               'message' => $validator->errors(),
            ], 400);
        }

        $credentials = $request->only('email', 'password');

        if($request->remember == true){
            // token berumur setahun
            User::where('email', $request->email)->update(['expiredToken' => $now->modify('+1 year')->getTimestamp()]);            
            $token = Auth::setTTL(525600)->attempt($credentials);
        }else{
            // token berumur sehari
            User::where('email', $request->email)->update(['expiredToken' => $now->modify('+1 day')->getTimestamp()]);            
            $token = Auth::setTTL(1440)->attempt($credentials);
        }                

        if (!$token) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized',
            ], 401);
        }
        

        $user = Auth::user();
        return response()->json([
            'status' => 'success',
            'user' => $user,
            'authorisation' => [
                'token' => $token,
                'type' => 'bearer',
            ]
        ]);
    }

    public function register(Request $request){

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);

        // pesan jika  validator error
        if ($validator->fails()) {
             return response()->json([
                'status' => 'error',
                'message' => $validator->errors(),
            ], 400);
        }

        $user = User::create([
            'nama' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $token = Auth::login($user);
        return response()->json([
            'status' => 'success',
            'message' => 'User created successfully',
            'user' => $user,
            'authorisation' => [
                'token' => $token,
                'type' => 'bearer',
            ]
        ]);
   
    }

    public function logout()
    {
        Auth::logout();
        return response()->json([
            'status' => 'success',
            'message' => 'Successfully logged out',
        ]);
    }

    public function refresh()
    {
        return response()->json([
            'status' => 'success',
            'user' => Auth::user(),
            'authorisation' => [
                'token' => Auth::refresh(),
                'type' => 'bearer',
            ]
        ]);
    }

}