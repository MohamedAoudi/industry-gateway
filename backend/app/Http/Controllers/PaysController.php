<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

use App\Models\Pays;


class PaysController extends Controller
{
    public function index()
    {
        return Pays::all();
        
    }

    public function show($id)
    {
        // Trouver le pays par ID
        $pays = Pays::find($id);

        // Vérifier si le pays existe
        if (!$pays) {
            return response()->json(['message' => 'Pays non trouvé'], Response::HTTP_NOT_FOUND);
        }

        // Retourner les détails du pays
        return response()->json($pays);
    }
    public function store(Request $request)
    {
        // Validation des données entrantes
        $validatedData = $request->validate([
            'nomPays' => 'required|string|max:100'
        ]);

        // Créer un nouveau pays avec les données validées
        $pays = Pays::create($validatedData);

        // Retourner la réponse avec le pays créé
        return response()->json($pays, Response::HTTP_CREATED);
    }

    public function update(Request $request, $id)
    {
        // Trouver le pays par ID
        $pays = Pays::find($id);

        // Vérifier si le pays existe
        if (!$pays) {
            return response()->json(['message' => 'Pays non trouvé'], Response::HTTP_NOT_FOUND);
        }

        // Validation des données entrantes
        $validatedData = $request->validate([
            'nomPays' => 'required|string|max:100'
        ]);

        // Mettre à jour les informations du pays
        $pays->update($validatedData);

        // Retourner la réponse avec le pays mis à jour
        return response()->json($pays);
    }

    public function destroy($id)
    {
        // Trouver le pays par ID
        $pays = Pays::find($id);

        // Vérifier si le pays existe
        if (!$pays) {
            return response()->json(['message' => 'Pays non trouvé'], Response::HTTP_NOT_FOUND);
        }

        // Supprimer le pays
        $pays->delete();

        // Retourner une réponse de succès
        return response()->json(['message' => 'Pays supprimé avec succès'], Response::HTTP_NO_CONTENT);
    }
}
