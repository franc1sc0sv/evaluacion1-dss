<?php 

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:api')->group(function () {
    Route::get('/user', [AuthController::class, 'getUser']);
    Route::post('/logout', [AuthController::class, 'logout']);
});

Route::get('/', function () {
    return response()->json([
        'message' => 'Bienvenido a la API',
        'status' => 'OK',
        'version' => '1.0.0'
    ]);
});
