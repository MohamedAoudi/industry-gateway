import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\CentersExcellenceArtificialIntelligenceController::index
 * @see app/Http/Controllers/CentersExcellenceArtificialIntelligenceController.php:25
 * @route '/api/centersExcellenceArtificialIntelligence'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/centersExcellenceArtificialIntelligence',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CentersExcellenceArtificialIntelligenceController::index
 * @see app/Http/Controllers/CentersExcellenceArtificialIntelligenceController.php:25
 * @route '/api/centersExcellenceArtificialIntelligence'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CentersExcellenceArtificialIntelligenceController::index
 * @see app/Http/Controllers/CentersExcellenceArtificialIntelligenceController.php:25
 * @route '/api/centersExcellenceArtificialIntelligence'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CentersExcellenceArtificialIntelligenceController::index
 * @see app/Http/Controllers/CentersExcellenceArtificialIntelligenceController.php:25
 * @route '/api/centersExcellenceArtificialIntelligence'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\CentersExcellenceArtificialIntelligenceController::index
 * @see app/Http/Controllers/CentersExcellenceArtificialIntelligenceController.php:25
 * @route '/api/centersExcellenceArtificialIntelligence'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\CentersExcellenceArtificialIntelligenceController::index
 * @see app/Http/Controllers/CentersExcellenceArtificialIntelligenceController.php:25
 * @route '/api/centersExcellenceArtificialIntelligence'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\CentersExcellenceArtificialIntelligenceController::index
 * @see app/Http/Controllers/CentersExcellenceArtificialIntelligenceController.php:25
 * @route '/api/centersExcellenceArtificialIntelligence'
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
/**
* @see \App\Http\Controllers\CentersExcellenceArtificialIntelligenceController::store
 * @see app/Http/Controllers/CentersExcellenceArtificialIntelligenceController.php:56
 * @route '/api/centersExcellenceArtificialIntelligence'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/centersExcellenceArtificialIntelligence',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CentersExcellenceArtificialIntelligenceController::store
 * @see app/Http/Controllers/CentersExcellenceArtificialIntelligenceController.php:56
 * @route '/api/centersExcellenceArtificialIntelligence'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CentersExcellenceArtificialIntelligenceController::store
 * @see app/Http/Controllers/CentersExcellenceArtificialIntelligenceController.php:56
 * @route '/api/centersExcellenceArtificialIntelligence'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\CentersExcellenceArtificialIntelligenceController::store
 * @see app/Http/Controllers/CentersExcellenceArtificialIntelligenceController.php:56
 * @route '/api/centersExcellenceArtificialIntelligence'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\CentersExcellenceArtificialIntelligenceController::store
 * @see app/Http/Controllers/CentersExcellenceArtificialIntelligenceController.php:56
 * @route '/api/centersExcellenceArtificialIntelligence'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\CentersExcellenceArtificialIntelligenceController::update
 * @see app/Http/Controllers/CentersExcellenceArtificialIntelligenceController.php:91
 * @route '/api/centersExcellenceArtificialIntelligence/{id}'
 */
export const update = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch","post"],
    url: '/api/centersExcellenceArtificialIntelligence/{id}',
} satisfies RouteDefinition<["put","patch","post"]>

/**
* @see \App\Http\Controllers\CentersExcellenceArtificialIntelligenceController::update
 * @see app/Http/Controllers/CentersExcellenceArtificialIntelligenceController.php:91
 * @route '/api/centersExcellenceArtificialIntelligence/{id}'
 */
update.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        id: args.id,
                }

    return update.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CentersExcellenceArtificialIntelligenceController::update
 * @see app/Http/Controllers/CentersExcellenceArtificialIntelligenceController.php:91
 * @route '/api/centersExcellenceArtificialIntelligence/{id}'
 */
update.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\CentersExcellenceArtificialIntelligenceController::update
 * @see app/Http/Controllers/CentersExcellenceArtificialIntelligenceController.php:91
 * @route '/api/centersExcellenceArtificialIntelligence/{id}'
 */
update.patch = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})
/**
* @see \App\Http\Controllers\CentersExcellenceArtificialIntelligenceController::update
 * @see app/Http/Controllers/CentersExcellenceArtificialIntelligenceController.php:91
 * @route '/api/centersExcellenceArtificialIntelligence/{id}'
 */
update.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\CentersExcellenceArtificialIntelligenceController::update
 * @see app/Http/Controllers/CentersExcellenceArtificialIntelligenceController.php:91
 * @route '/api/centersExcellenceArtificialIntelligence/{id}'
 */
    const updateForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\CentersExcellenceArtificialIntelligenceController::update
 * @see app/Http/Controllers/CentersExcellenceArtificialIntelligenceController.php:91
 * @route '/api/centersExcellenceArtificialIntelligence/{id}'
 */
        updateForm.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\CentersExcellenceArtificialIntelligenceController::update
 * @see app/Http/Controllers/CentersExcellenceArtificialIntelligenceController.php:91
 * @route '/api/centersExcellenceArtificialIntelligence/{id}'
 */
        updateForm.patch = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\CentersExcellenceArtificialIntelligenceController::update
 * @see app/Http/Controllers/CentersExcellenceArtificialIntelligenceController.php:91
 * @route '/api/centersExcellenceArtificialIntelligence/{id}'
 */
        updateForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, options),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\CentersExcellenceArtificialIntelligenceController::destroy
 * @see app/Http/Controllers/CentersExcellenceArtificialIntelligenceController.php:117
 * @route '/api/centersExcellenceArtificialIntelligence/{id}'
 */
export const destroy = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/centersExcellenceArtificialIntelligence/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\CentersExcellenceArtificialIntelligenceController::destroy
 * @see app/Http/Controllers/CentersExcellenceArtificialIntelligenceController.php:117
 * @route '/api/centersExcellenceArtificialIntelligence/{id}'
 */
destroy.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        id: args.id,
                }

    return destroy.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CentersExcellenceArtificialIntelligenceController::destroy
 * @see app/Http/Controllers/CentersExcellenceArtificialIntelligenceController.php:117
 * @route '/api/centersExcellenceArtificialIntelligence/{id}'
 */
destroy.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\CentersExcellenceArtificialIntelligenceController::destroy
 * @see app/Http/Controllers/CentersExcellenceArtificialIntelligenceController.php:117
 * @route '/api/centersExcellenceArtificialIntelligence/{id}'
 */
    const destroyForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\CentersExcellenceArtificialIntelligenceController::destroy
 * @see app/Http/Controllers/CentersExcellenceArtificialIntelligenceController.php:117
 * @route '/api/centersExcellenceArtificialIntelligence/{id}'
 */
        destroyForm.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const CentersExcellenceArtificialIntelligenceController = { index, store, update, destroy }

export default CentersExcellenceArtificialIntelligenceController