<?php

namespace App\Http\Controllers;

use App\Models\Researcher;
use Illuminate\Http\Request;

class ResearcherController extends Controller
{
    public function index()
    {
        $researchers = Researcher::all();

        return response()->json([
            'status' => 'success',
            'data' => $researchers,
        ]);
    }

    public function update(Request $request, $id)
    {
        abort_unless($request->user()?->role === 'superviseur', 403);

        $data = $request->validate([
            'full_name' => ['required', 'string', 'max:255'],
            'email' => ['nullable', 'email', 'max:255'],
            'research_field' => ['required', 'string', 'max:255'],
            'country' => ['nullable', 'string', 'max:255'],
        ]);

        $researcher = Researcher::findOrFail($id);
        $researcher->update($data);

        return response()->json(['message' => 'تم تحديث الخبير بنجاح', 'data' => $researcher]);
    }

    public function destroy(Request $request, $id)
    {
        abort_unless($request->user()?->role === 'superviseur', 403);

        $researcher = Researcher::findOrFail($id);
        $researcher->delete();

        return response()->json(['message' => 'تم حذف الباحث بنجاح']);
    }
}
