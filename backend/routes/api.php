<?php

use App\Http\Controllers\MovieController;
use Illuminate\Support\Facades\Route;

Route::apiResource('movies', MovieController::class)->except(['update']);
