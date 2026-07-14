import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\AICompanieController::importCompanie
 * @see app/Http/Controllers/AICompanieController.php:10
 * @route '/api/companies/import-ai'
 */
export const importCompanie = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: importCompanie.url(options),
    method: 'post',
})

importCompanie.definition = {
    methods: ["post"],
    url: '/api/companies/import-ai',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\AICompanieController::importCompanie
 * @see app/Http/Controllers/AICompanieController.php:10
 * @route '/api/companies/import-ai'
 */
importCompanie.url = (options?: RouteQueryOptions) => {
    return importCompanie.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AICompanieController::importCompanie
 * @see app/Http/Controllers/AICompanieController.php:10
 * @route '/api/companies/import-ai'
 */
importCompanie.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: importCompanie.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\AICompanieController::importCompanie
 * @see app/Http/Controllers/AICompanieController.php:10
 * @route '/api/companies/import-ai'
 */
    const importCompanieForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: importCompanie.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\AICompanieController::importCompanie
 * @see app/Http/Controllers/AICompanieController.php:10
 * @route '/api/companies/import-ai'
 */
        importCompanieForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: importCompanie.url(options),
            method: 'post',
        })
    
    importCompanie.form = importCompanieForm
const AICompanieController = { importCompanie }

export default AICompanieController