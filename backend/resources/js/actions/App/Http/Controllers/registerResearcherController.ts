import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\registerResearcherController::registerResearcher
 * @see app/Http/Controllers/registerResearcherController.php:12
 * @route '/api/register-researcher'
 */
export const registerResearcher = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: registerResearcher.url(options),
    method: 'post',
})

registerResearcher.definition = {
    methods: ["post"],
    url: '/api/register-researcher',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\registerResearcherController::registerResearcher
 * @see app/Http/Controllers/registerResearcherController.php:12
 * @route '/api/register-researcher'
 */
registerResearcher.url = (options?: RouteQueryOptions) => {
    return registerResearcher.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\registerResearcherController::registerResearcher
 * @see app/Http/Controllers/registerResearcherController.php:12
 * @route '/api/register-researcher'
 */
registerResearcher.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: registerResearcher.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\registerResearcherController::registerResearcher
 * @see app/Http/Controllers/registerResearcherController.php:12
 * @route '/api/register-researcher'
 */
    const registerResearcherForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: registerResearcher.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\registerResearcherController::registerResearcher
 * @see app/Http/Controllers/registerResearcherController.php:12
 * @route '/api/register-researcher'
 */
        registerResearcherForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: registerResearcher.url(options),
            method: 'post',
        })
    
    registerResearcher.form = registerResearcherForm
const registerResearcherController = { registerResearcher }

export default registerResearcherController