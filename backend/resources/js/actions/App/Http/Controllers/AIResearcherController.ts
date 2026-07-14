import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\AIResearcherController::importMethod
 * @see app/Http/Controllers/AIResearcherController.php:8
 * @route '/api/researchers/import-ai'
 */
export const importMethod = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: importMethod.url(options),
    method: 'post',
})

importMethod.definition = {
    methods: ["post"],
    url: '/api/researchers/import-ai',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\AIResearcherController::importMethod
 * @see app/Http/Controllers/AIResearcherController.php:8
 * @route '/api/researchers/import-ai'
 */
importMethod.url = (options?: RouteQueryOptions) => {
    return importMethod.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AIResearcherController::importMethod
 * @see app/Http/Controllers/AIResearcherController.php:8
 * @route '/api/researchers/import-ai'
 */
importMethod.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: importMethod.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\AIResearcherController::importMethod
 * @see app/Http/Controllers/AIResearcherController.php:8
 * @route '/api/researchers/import-ai'
 */
    const importMethodForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: importMethod.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\AIResearcherController::importMethod
 * @see app/Http/Controllers/AIResearcherController.php:8
 * @route '/api/researchers/import-ai'
 */
        importMethodForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: importMethod.url(options),
            method: 'post',
        })
    
    importMethod.form = importMethodForm
const AIResearcherController = { importMethod, import: importMethod }

export default AIResearcherController