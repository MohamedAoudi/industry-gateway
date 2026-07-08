<?php
namespace App\Http\Controllers;

use App\Models\Center;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;

class CentersExcellenceArtificialIntelligenceController extends Controller
{

    // public function index(Request $request)
    // {
    //     $perPage = $request->get('per_page', 10);

    //     $centersExcellenceArtificialIntelligence = Center::with('pays')
    //         ->where('idTypeCenter', 2)
    //         ->latest()
    //         ->paginate($perPage);

    //     return response()->json($centersExcellenceArtificialIntelligence);
    // }


    public function index(Request $request)
    {
        // On pagine les résultats. Le tri par idPays permet un regroupement plus propre
        $centers = Center::with('pays')
            ->where('idTypeCenter', 2)
            ->orderBy('idPays')
            ->paginate(10); 

        return response()->json($centers);
    }

    public function show($id)
    {
        $centersExcellenceArtificialIntelligence = Center::with('pays')
            ->where('idTypeCenter', 2)
            ->find($id);

        if (!$centersExcellenceArtificialIntelligence) {
            return response()->json([
                'success' => false,
                'message' => 'Le centre de recherche et d\'innovation demandé est introuvable.'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $centersExcellenceArtificialIntelligence
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
            ? $request->file('photo')->store('Photos_CentersExcellenceArtificialIntelligence', 'public') 
            : null;

        $centersExcellenceArtificialIntelligence = Center::create([
            'titre_ar'       => $request->titre_ar,
            'titre_en'       => $request->titre_en,
            'description_ar' => $request->description_ar,
            'description_en' => $request->description_en,
            'url'            => $request->url,
            'idPays'         => $request->idPays,
            'idUtilisateur'  => $user->idUtilisateur, 
            'idTypeCenter'   => 2, 
            'photo'          => $photoPath,
        ]);

        return response()->json(['message' => 'Succès', 'data' => $centersExcellenceArtificialIntelligence], 201);
    }

    /**
     * MISE À JOUR (Update)
     */
    public function update(Request $request, $id)
    {
        $centersExcellenceArtificialIntelligence = Center::where('idTypeCenter', 2)->findOrFail($id);

        $request->validate([
            'titre_ar' => 'required|string|max:255',
            'idPays'   => 'required|exists:pays,idPays',
            'photo'    => 'nullable|image|max:2048',
        ]);

        $data = $request->except('photo');

        if ($request->hasFile('photo')) {
            // Supprimer l'ancienne photo si elle existe
            if ($centersExcellenceArtificialIntelligence->photo) {
                Storage::disk('public')->delete($centersExcellenceArtificialIntelligence->photo);
            }
            // Stocker la nouvelle
            $data['photo'] = $request->file('photo')->store('Photos_CentersExcellenceArtificialIntelligence', 'public');
        }

        $centersExcellenceArtificialIntelligence->update($data);

        return response()->json(['message' => 'Mise à jour réussie', 'data' => $centersExcellenceArtificialIntelligence]);
    }

    public function destroy($id)
    {
        // On sécurise pour ne supprimer que si c'est un incubateur
        $centersExcellenceArtificialIntelligence = Center::where('idTypeCenter', 2)->findOrFail($id);
        
        if ($centersExcellenceArtificialIntelligence->photo) {
            Storage::disk('public')->delete($centersExcellenceArtificialIntelligence->photo);
        }
        
        $centersExcellenceArtificialIntelligence->delete();

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