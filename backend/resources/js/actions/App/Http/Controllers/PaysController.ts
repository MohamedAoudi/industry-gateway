import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\PaysController::index
 * @see app/Http/Controllers/PaysController.php:13
 * @route '/api/pays'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/pays',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PaysController::index
 * @see app/Http/Controllers/PaysController.php:13
 * @route '/api/pays'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PaysController::index
 * @see app/Http/Controllers/PaysController.php:13
 * @route '/api/pays'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PaysController::index
 * @see app/Http/Controllers/PaysController.php:13
 * @route '/api/pays'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PaysController::index
 * @see app/Http/Controllers/PaysController.php:13
 * @route '/api/pays'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PaysController::index
 * @see app/Http/Controllers/PaysController.php:13
 * @route '/api/pays'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PaysController::index
 * @see app/Http/Controllers/PaysController.php:13
 * @route '/api/pays'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
const PaysController = { index }

export default PaysController