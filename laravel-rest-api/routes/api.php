<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

Route::get('/', function () {
    return response()->json([
        'message' => 'Bienvenido a la API de Laravel',
        'status' => 'OK',
        'timestamp' => now(),
    ]);
})->name('api.index');

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return response()->json([
        'user' => $request->user()
    ]);
});

Route::middleware('auth:api')->group(function () {
    Route::post('logout', [AuthController::class, 'logout']);
});
