import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\SupportingBodiesScientificResearchController::index
 * @see app/Http/Controllers/SupportingBodiesScientificResearchController.php:12
 * @route '/api/supportingBodiesScientificResearch'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/supportingBodiesScientificResearch',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SupportingBodiesScientificResearchController::index
 * @see app/Http/Controllers/SupportingBodiesScientificResearchController.php:12
 * @route '/api/supportingBodiesScientificResearch'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SupportingBodiesScientificResearchController::index
 * @see app/Http/Controllers/SupportingBodiesScientificResearchController.php:12
 * @route '/api/supportingBodiesScientificResearch'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SupportingBodiesScientificResearchController::index
 * @see app/Http/Controllers/SupportingBodiesScientificResearchController.php:12
 * @route '/api/supportingBodiesScientificResearch'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\SupportingBodiesScientificResearchController::index
 * @see app/Http/Controllers/SupportingBodiesScientificResearchController.php:12
 * @route '/api/supportingBodiesScientificResearch'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\SupportingBodiesScientificResearchController::index
 * @see app/Http/Controllers/SupportingBodiesScientificResearchController.php:12
 * @route '/api/supportingBodiesScientificResearch'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\SupportingBodiesScientificResearchController::index
 * @see app/Http/Controllers/SupportingBodiesScientificResearchController.php:12
 * @route '/api/supportingBodiesScientificResearch'
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
* @see \App\Http\Controllers\SupportingBodiesScientificResearchController::store
 * @see app/Http/Controllers/SupportingBodiesScientificResearchController.php:45
 * @route '/api/supportingBodiesScientificResearch'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/supportingBodiesScientificResearch',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SupportingBodiesScientificResearchController::store
 * @see app/Http/Controllers/SupportingBodiesScientificResearchController.php:45
 * @route '/api/supportingBodiesScientificResearch'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SupportingBodiesScientificResearchController::store
 * @see app/Http/Controllers/SupportingBodiesScientificResearchController.php:45
 * @route '/api/supportingBodiesScientificResearch'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\SupportingBodiesScientificResearchController::store
 * @see app/Http/Controllers/SupportingBodiesScientificResearchController.php:45
 * @route '/api/supportingBodiesScientificResearch'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\SupportingBodiesScientificResearchController::store
 * @see app/Http/Controllers/SupportingBodiesScientificResearchController.php:45
 * @route '/api/supportingBodiesScientificResearch'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\SupportingBodiesScientificResearchController::update
 * @see app/Http/Controllers/SupportingBodiesScientificResearchController.php:80
 * @route '/api/supportingBodiesScientificResearch/{id}'
 */
export const update = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch","post"],
    url: '/api/supportingBodiesScientificResearch/{id}',
} satisfies RouteDefinition<["put","patch","post"]>

/**
* @see \App\Http\Controllers\SupportingBodiesScientificResearchController::update
 * @see app/Http/Controllers/SupportingBodiesScientificResearchController.php:80
 * @route '/api/supportingBodiesScientificResearch/{id}'
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
* @see \App\Http\Controllers\SupportingBodiesScientificResearchController::update
 * @see app/Http/Controllers/SupportingBodiesScientificResearchController.php:80
 * @route '/api/supportingBodiesScientificResearch/{id}'
 */
update.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\SupportingBodiesScientificResearchController::update
 * @see app/Http/Controllers/SupportingBodiesScientificResearchController.php:80
 * @route '/api/supportingBodiesScientificResearch/{id}'
 */
update.patch = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})
/**
* @see \App\Http\Controllers\SupportingBodiesScientificResearchController::update
 * @see app/Http/Controllers/SupportingBodiesScientificResearchController.php:80
 * @route '/api/supportingBodiesScientificResearch/{id}'
 */
update.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\SupportingBodiesScientificResearchController::update
 * @see app/Http/Controllers/SupportingBodiesScientificResearchController.php:80
 * @route '/api/supportingBodiesScientificResearch/{id}'
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
* @see \App\Http\Controllers\SupportingBodiesScientificResearchController::update
 * @see app/Http/Controllers/SupportingBodiesScientificResearchController.php:80
 * @route '/api/supportingBodiesScientificResearch/{id}'
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
* @see \App\Http\Controllers\SupportingBodiesScientificResearchController::update
 * @see app/Http/Controllers/SupportingBodiesScientificResearchController.php:80
 * @route '/api/supportingBodiesScientificResearch/{id}'
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
* @see \App\Http\Controllers\SupportingBodiesScientificResearchController::update
 * @see app/Http/Controllers/SupportingBodiesScientificResearchController.php:80
 * @route '/api/supportingBodiesScientificResearch/{id}'
 */
        updateForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, options),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\SupportingBodiesScientificResearchController::destroy
 * @see app/Http/Controllers/SupportingBodiesScientificResearchController.php:106
 * @route '/api/supportingBodiesScientificResearch/{id}'
 */
export const destroy = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/supportingBodiesScientificResearch/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\SupportingBodiesScientificResearchController::destroy
 * @see app/Http/Controllers/SupportingBodiesScientificResearchController.php:106
 * @route '/api/supportingBodiesScientificResearch/{id}'
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
* @see \App\Http\Controllers\SupportingBodiesScientificResearchController::destroy
 * @see app/Http/Controllers/SupportingBodiesScientificResearchController.php:106
 * @route '/api/supportingBodiesScientificResearch/{id}'
 */
destroy.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\SupportingBodiesScientificResearchController::destroy
 * @see app/Http/Controllers/SupportingBodiesScientificResearchController.php:106
 * @route '/api/supportingBodiesScientificResearch/{id}'
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
* @see \App\Http\Controllers\SupportingBodiesScientificResearchController::destroy
 * @see app/Http/Controllers/SupportingBodiesScientificResearchController.php:106
 * @route '/api/supportingBodiesScientificResearch/{id}'
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
const SupportingBodiesScientificResearchController = { index, store, update, destroy }

export default SupportingBodiesScientificResearchController