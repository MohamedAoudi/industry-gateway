<?php
namespace App\Http\Controllers;

use App\Models\Center;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;

class ScientificResearchInnovationCentersController extends Controller
{

    // public function index(Request $request)
    // {
    //     $perPage = $request->get('per_page', 10);

    //     $scientificResearchInnovationCenters = Center::with('pays')
    //         ->where('idTypeCenter', 1)
    //         ->latest()
    //         ->paginate($perPage);

    //     return response()->json($scientificResearchInnovationCenters);
    // }

    public function index(Request $request)
    {
        $perPage = $request->get('per_page', 10);

        // On ajoute orderBy('idPays') pour que le regroupement soit logique
        $centers = Center::with('pays')
            ->where('idTypeCenter', 1)
            ->orderBy('idPays') 
            ->paginate($perPage);

        return response()->json($centers);
    }

    public function show($id)
    {
        $scientificResearchInnovationCenter = Center::with('pays')
            ->where('idTypeCenter', 1)
            ->find($id);

        if (!$scientificResearchInnovationCenter) {
            return response()->json([
                'success' => false,
                'message' => 'Le centre de recherche et d\'innovation demandé est introuvable.'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $scientificResearchInnovationCenter
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
            ? $request->file('photo')->store('Photos_ScientificResearchInnovationCenters', 'public') 
            : null;

        $scientificResearchInnovationCenter = Center::create([
            'titre_ar'       => $request->titre_ar,
            'titre_en'       => $request->titre_en,
            'description_ar' => $request->description_ar,
            'description_en' => $request->description_en,
            'url'            => $request->url,
            'idPays'         => $request->idPays,
            'idUtilisateur'  => $user->idUtilisateur, 
            'idTypeCenter'   => 1, 
            'photo'          => $photoPath,
        ]);

        return response()->json(['message' => 'Succès', 'data' => $scientificResearchInnovationCenter], 201);
    }

    /**
     * MISE À JOUR (Update)
     */
    public function update(Request $request, $id)
    {
        $scientificResearchInnovationCenter = Center::where('idTypeCenter', 1)->findOrFail($id);

        $request->validate([
            'titre_ar' => 'required|string|max:255',
            'idPays'   => 'required|exists:pays,idPays',
            'photo'    => 'nullable|image|max:2048',
        ]);

        $data = $request->except('photo');

        if ($request->hasFile('photo')) {
            // Supprimer l'ancienne photo si elle existe
            if ($scientificResearchInnovationCenter->photo) {
                Storage::disk('public')->delete($scientificResearchInnovationCenter->photo);
            }
            // Stocker la nouvelle
            $data['photo'] = $request->file('photo')->store('Photos_ScientificResearchInnovationCenters', 'public');
        }

        $scientificResearchInnovationCenter->update($data);

        return response()->json(['message' => 'Mise à jour réussie', 'data' => $scientificResearchInnovationCenter]);
    }

    public function destroy($id)
    {
        // On sécurise pour ne supprimer que si c'est un incubateur
        $scientificResearchInnovationCenter = Center::where('idTypeCenter', 1)->findOrFail($id);
        
        if ($scientificResearchInnovationCenter->photo) {
            Storage::disk('public')->delete($scientificResearchInnovationCenter->photo);
        }
        
        $scientificResearchInnovationCenter->delete();

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