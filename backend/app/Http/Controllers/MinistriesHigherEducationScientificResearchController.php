<?php
namespace App\Http\Controllers;

use App\Models\Center;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;

class MinistriesHigherEducationScientificResearchController extends Controller
{

    // public function index(Request $request)
    // {
    //     $perPage = $request->get('per_page', 10);

    //     $ministriesHigherEducationScientificResearch = Center::with('pays')
    //         ->where('idTypeCenter', 3)
    //         ->latest()
    //         ->paginate($perPage);

    //     return response()->json($ministriesHigherEducationScientificResearch);
    // }

    public function index(Request $request)
    {
        $perPage = $request->get('per_page', 10);

        // On ajoute orderBy('idPays') pour que le regroupement soit logique
        $centers = Center::with('pays')
            ->where('idTypeCenter', 3)
            ->orderBy('idPays') 
            ->paginate($perPage);

        return response()->json($centers);
    }

    public function show($id)
    {
        $ministriesHigherEducationScientificResearch = Center::with('pays')
            ->where('idTypeCenter', 3)
            ->find($id);

        if (!$ministriesHigherEducationScientificResearch) {
            return response()->json([
                'success' => false,
                'message' => 'Le centre de recherche et d\'innovation demandé est introuvable.'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $ministriesHigherEducationScientificResearch
        ], 200);
    }
    

    public function store(Request $request)
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }

        $request->validate([
            'titre_ar' => 'required|string|max:255',
            'idPays'   => 'required|exists:pays,idPays',
            'photo'    => 'nullable|image|max:2048',
        ]);

        $photoPath = $request->hasFile('photo') 
            ? $request->file('photo')->store('Photos_MinistriesHigherEducationScientificResearch', 'public') 
            : null;

        $ministriesHigherEducationScientificResearch = Center::create([
            'titre_ar'       => $request->titre_ar,
            'titre_en'       => $request->titre_en,
            'description_ar' => $request->description_ar,
            'description_en' => $request->description_en,
            'url'            => $request->url,
            'idPays'         => $request->idPays,
            'idUtilisateur'  => $user->idUtilisateur, 
            'idTypeCenter'   => 3, 
            'photo'          => $photoPath,
        ]);

        return response()->json(['message' => 'Succès', 'data' => $ministriesHigherEducationScientificResearch], 201);
    }

    /**
     * MISE À JOUR (Update)
     */
    public function update(Request $request, $id)
    {
        $ministriesHigherEducationScientificResearch = Center::where('idTypeCenter', 3)->findOrFail($id);

        $request->validate([
            'titre_ar' => 'required|string|max:255',
            'idPays'   => 'required|exists:pays,idPays',
            'photo'    => 'nullable|image|max:2048',
        ]);

        $data = $request->except('photo');

        if ($request->hasFile('photo')) {
            // Supprimer l'ancienne photo si elle existe
            if ($ministriesHigherEducationScientificResearch->photo) {
                Storage::disk('public')->delete($ministriesHigherEducationScientificResearch->photo);
            }
            // Stocker la nouvelle
            $data['photo'] = $request->file('photo')->store('Photos_MinistriesHigherEducationScientificResearch', 'public');
        }

        $ministriesHigherEducationScientificResearch->update($data);

        return response()->json(['message' => 'Mise à jour réussie', 'data' => $ministriesHigherEducationScientificResearch]);
    }

    public function destroy($id)
    {
        // On sécurise pour ne supprimer que si c'est un incubateur
        $ministriesHigherEducationScientificResearch = Center::where('idTypeCenter', 3)->findOrFail($id);
        
        if ($ministriesHigherEducationScientificResearch->photo) {
            Storage::disk('public')->delete($ministriesHigherEducationScientificResearch->photo);
        }
        
        $ministriesHigherEducationScientificResearch->delete();

        return response()->json(['message' => 'Deleted successfully']);
    }

    public function syncFromAI()
    {
        // Exécution du script Python
        $output = shell_exec('python ' . base_path('my_ai_scraper/aidsmo_sync.py'));
        
        return response()->json([
            'success' => true,
            'message' => 'Scraping process finished',
            'output' => $output
        ]);
    }
}