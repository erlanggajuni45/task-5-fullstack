<?php

namespace App\Http\Controllers\api\v1;

use App\Models\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request){
        $register = $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|unique:users',
            'password' => 'required|string|confirmed',
        ]);

        $user = User::create([
            'name' => $register['name'],
            'email' => $register['email'],
            'password' => bcrypt($register['password']),
        ]);

        $accessToken = $user->createToken('authToken')->accessToken;
        
        $rsp['code'] = 201;
        $rsp['message'] = 'Registrasi Sukses';
        $rsp['user'] = $user;
        $rsp['token'] = $accessToken;

        return response()->json($rsp, 201);
    }

    public function login(Request $request) 
    {
         $login = $request->validate([
             'email' => 'required|string',
             'password' => 'required|string',
         ]);

        $user = User::where('email', $login['email'])->first();

        if(!$user){
            return response(['message' => 'Email tidak ditemukan'], 401);
        } else if(!Hash::check($login['password'], $user->password)){
            return response(['message' => 'Password salah'], 401);
        }

        $accessToken = $user->createToken('authToken')->accessToken;
        
        $rsp['code'] = 200;
        $rsp['message'] = 'Success';
        $rsp['user'] = $user;
        $rsp['token'] = $accessToken;

        return response()->json($rsp, 200);
    }

    public function logout(){
        auth()->user()->tokens()->delete();

        return response(['message' => 'Berhasil Logout'], 200);
    }
}
