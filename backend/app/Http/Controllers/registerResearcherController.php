<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Researcher;

class registerResearcherController extends Controller
{


    public function registerResearcher(Request $request) {
        $data = $request->validate([
            'full_name' => 'required|string|max:255',
            'email' => 'required|email|unique:researchers,email',
            'research_field' => 'required|string',
        ]);

        Researcher::create($data);

        return response()->json(['status' => 'success', 'message' => 'تم تسجيل الباحث بنجاح']);
    }

}
