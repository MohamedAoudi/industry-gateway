<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Researcher;


class ResearcherController extends Controller
{
    public function index() {
        $researchers = Researcher::all();
        
        return response()->json([
            'status' => 'success',
            'data' => $researchers
        ]);
    }

    public function destroy($id) {
        $researcher = Researcher::findOrFail($id);
        $researcher->delete();
        return response()->json(['message' => 'تم حذف الباحث بنجاح']);
    }
}
