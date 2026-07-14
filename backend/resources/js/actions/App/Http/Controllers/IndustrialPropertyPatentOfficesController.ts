import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\IndustrialPropertyPatentOfficesController::index
 * @see app/Http/Controllers/IndustrialPropertyPatentOfficesController.php:25
 * @route '/api/industrialPropertyPatentOffices'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/industrialPropertyPatentOffices',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\IndustrialPropertyPatentOfficesController::index
 * @see app/Http/Controllers/IndustrialPropertyPatentOfficesController.php:25
 * @route '/api/industrialPropertyPatentOffices'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\IndustrialPropertyPatentOfficesController::index
 * @see app/Http/Controllers/IndustrialPropertyPatentOfficesController.php:25
 * @route '/api/industrialPropertyPatentOffices'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\IndustrialPropertyPatentOfficesController::index
 * @see app/Http/Controllers/IndustrialPropertyPatentOfficesController.php:25
 * @route '/api/industrialPropertyPatentOffices'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\IndustrialPropertyPatentOfficesController::index
 * @see app/Http/Controllers/IndustrialPropertyPatentOfficesController.php:25
 * @route '/api/industrialPropertyPatentOffices'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\IndustrialPropertyPatentOfficesController::index
 * @see app/Http/Controllers/IndustrialPropertyPatentOfficesController.php:25
 * @route '/api/industrialPropertyPatentOffices'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\IndustrialPropertyPatentOfficesController::index
 * @see app/Http/Controllers/IndustrialPropertyPatentOfficesController.php:25
 * @route '/api/industrialPropertyPatentOffices'
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
* @see \App\Http\Controllers\IndustrialPropertyPatentOfficesController::store
 * @see app/Http/Controllers/IndustrialPropertyPatentOfficesController.php:58
 * @route '/api/industrialPropertyPatentOffices'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/industrialPropertyPatentOffices',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\IndustrialPropertyPatentOfficesController::store
 * @see app/Http/Controllers/IndustrialPropertyPatentOfficesController.php:58
 * @route '/api/industrialPropertyPatentOffices'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\IndustrialPropertyPatentOfficesController::store
 * @see app/Http/Controllers/IndustrialPropertyPatentOfficesController.php:58
 * @route '/api/industrialPropertyPatentOffices'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\IndustrialPropertyPatentOfficesController::store
 * @see app/Http/Controllers/IndustrialPropertyPatentOfficesController.php:58
 * @route '/api/industrialPropertyPatentOffices'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\IndustrialPropertyPatentOfficesController::store
 * @see app/Http/Controllers/IndustrialPropertyPatentOfficesController.php:58
 * @route '/api/industrialPropertyPatentOffices'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\IndustrialPropertyPatentOfficesController::update
 * @see app/Http/Controllers/IndustrialPropertyPatentOfficesController.php:93
 * @route '/api/industrialPropertyPatentOffices/{id}'
 */
export const update = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch","post"],
    url: '/api/industrialPropertyPatentOffices/{id}',
} satisfies RouteDefinition<["put","patch","post"]>

/**
* @see \App\Http\Controllers\IndustrialPropertyPatentOfficesController::update
 * @see app/Http/Controllers/IndustrialPropertyPatentOfficesController.php:93
 * @route '/api/industrialPropertyPatentOffices/{id}'
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
* @see \App\Http\Controllers\IndustrialPropertyPatentOfficesController::update
 * @see app/Http/Controllers/IndustrialPropertyPatentOfficesController.php:93
 * @route '/api/industrialPropertyPatentOffices/{id}'
 */
update.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\IndustrialPropertyPatentOfficesController::update
 * @see app/Http/Controllers/IndustrialPropertyPatentOfficesController.php:93
 * @route '/api/industrialPropertyPatentOffices/{id}'
 */
update.patch = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})
/**
* @see \App\Http\Controllers\IndustrialPropertyPatentOfficesController::update
 * @see app/Http/Controllers/IndustrialPropertyPatentOfficesController.php:93
 * @route '/api/industrialPropertyPatentOffices/{id}'
 */
update.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\IndustrialPropertyPatentOfficesController::update
 * @see app/Http/Controllers/IndustrialPropertyPatentOfficesController.php:93
 * @route '/api/industrialPropertyPatentOffices/{id}'
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
* @see \App\Http\Controllers\IndustrialPropertyPatentOfficesController::update
 * @see app/Http/Controllers/IndustrialPropertyPatentOfficesController.php:93
 * @route '/api/industrialPropertyPatentOffices/{id}'
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
* @see \App\Http\Controllers\IndustrialPropertyPatentOfficesController::update
 * @see app/Http/Controllers/IndustrialPropertyPatentOfficesController.php:93
 * @route '/api/industrialPropertyPatentOffices/{id}'
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
* @see \App\Http\Controllers\IndustrialPropertyPatentOfficesController::update
 * @see app/Http/Controllers/IndustrialPropertyPatentOfficesController.php:93
 * @route '/api/industrialPropertyPatentOffices/{id}'
 */
        updateForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, options),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\IndustrialPropertyPatentOfficesController::destroy
 * @see app/Http/Controllers/IndustrialPropertyPatentOfficesController.php:120
 * @route '/api/industrialPropertyPatentOffices/{id}'
 */
export const destroy = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/industrialPropertyPatentOffices/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\IndustrialPropertyPatentOfficesController::destroy
 * @see app/Http/Controllers/IndustrialPropertyPatentOfficesController.php:120
 * @route '/api/industrialPropertyPatentOffices/{id}'
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
* @see \App\Http\Controllers\IndustrialPropertyPatentOfficesController::destroy
 * @see app/Http/Controllers/IndustrialPropertyPatentOfficesController.php:120
 * @route '/api/industrialPropertyPatentOffices/{id}'
 */
destroy.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\IndustrialPropertyPatentOfficesController::destroy
 * @see app/Http/Controllers/IndustrialPropertyPatentOfficesController.php:120
 * @route '/api/industrialPropertyPatentOffices/{id}'
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
* @see \App\Http\Controllers\IndustrialPropertyPatentOfficesController::destroy
 * @see app/Http/Controllers/IndustrialPropertyPatentOfficesController.php:120
 * @route '/api/industrialPropertyPatentOffices/{id}'
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
const IndustrialPropertyPatentOfficesController = { index, store, update, destroy }

export default IndustrialPropertyPatentOfficesController