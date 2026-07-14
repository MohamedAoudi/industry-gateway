import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\CompanyController::index
 * @see app/Http/Controllers/CompanyController.php:11
 * @route '/api/companies'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/companies',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CompanyController::index
 * @see app/Http/Controllers/CompanyController.php:11
 * @route '/api/companies'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CompanyController::index
 * @see app/Http/Controllers/CompanyController.php:11
 * @route '/api/companies'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CompanyController::index
 * @see app/Http/Controllers/CompanyController.php:11
 * @route '/api/companies'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\CompanyController::index
 * @see app/Http/Controllers/CompanyController.php:11
 * @route '/api/companies'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\CompanyController::index
 * @see app/Http/Controllers/CompanyController.php:11
 * @route '/api/companies'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\CompanyController::index
 * @see app/Http/Controllers/CompanyController.php:11
 * @route '/api/companies'
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
* @see \App\Http\Controllers\CompanyController::getPendingRequests
 * @see app/Http/Controllers/CompanyController.php:17
 * @route '/api/companies/pending'
 */
export const getPendingRequests = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getPendingRequests.url(options),
    method: 'get',
})

getPendingRequests.definition = {
    methods: ["get","head"],
    url: '/api/companies/pending',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CompanyController::getPendingRequests
 * @see app/Http/Controllers/CompanyController.php:17
 * @route '/api/companies/pending'
 */
getPendingRequests.url = (options?: RouteQueryOptions) => {
    return getPendingRequests.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CompanyController::getPendingRequests
 * @see app/Http/Controllers/CompanyController.php:17
 * @route '/api/companies/pending'
 */
getPendingRequests.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getPendingRequests.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CompanyController::getPendingRequests
 * @see app/Http/Controllers/CompanyController.php:17
 * @route '/api/companies/pending'
 */
getPendingRequests.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getPendingRequests.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\CompanyController::getPendingRequests
 * @see app/Http/Controllers/CompanyController.php:17
 * @route '/api/companies/pending'
 */
    const getPendingRequestsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getPendingRequests.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\CompanyController::getPendingRequests
 * @see app/Http/Controllers/CompanyController.php:17
 * @route '/api/companies/pending'
 */
        getPendingRequestsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getPendingRequests.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\CompanyController::getPendingRequests
 * @see app/Http/Controllers/CompanyController.php:17
 * @route '/api/companies/pending'
 */
        getPendingRequestsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getPendingRequests.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    getPendingRequests.form = getPendingRequestsForm
/**
* @see \App\Http\Controllers\CompanyController::updateStatus
 * @see app/Http/Controllers/CompanyController.php:22
 * @route '/api/companies/{id}/status'
 */
export const updateStatus = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateStatus.url(args, options),
    method: 'put',
})

updateStatus.definition = {
    methods: ["put"],
    url: '/api/companies/{id}/status',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\CompanyController::updateStatus
 * @see app/Http/Controllers/CompanyController.php:22
 * @route '/api/companies/{id}/status'
 */
updateStatus.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return updateStatus.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CompanyController::updateStatus
 * @see app/Http/Controllers/CompanyController.php:22
 * @route '/api/companies/{id}/status'
 */
updateStatus.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateStatus.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\CompanyController::updateStatus
 * @see app/Http/Controllers/CompanyController.php:22
 * @route '/api/companies/{id}/status'
 */
    const updateStatusForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateStatus.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\CompanyController::updateStatus
 * @see app/Http/Controllers/CompanyController.php:22
 * @route '/api/companies/{id}/status'
 */
        updateStatusForm.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateStatus.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    updateStatus.form = updateStatusForm
/**
* @see \App\Http\Controllers\CompanyController::destroy
 * @see app/Http/Controllers/CompanyController.php:44
 * @route '/api/companies/{id}'
 */
export const destroy = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/api/companies/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\CompanyController::destroy
 * @see app/Http/Controllers/CompanyController.php:44
 * @route '/api/companies/{id}'
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
* @see \App\Http\Controllers\CompanyController::destroy
 * @see app/Http/Controllers/CompanyController.php:44
 * @route '/api/companies/{id}'
 */
destroy.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\CompanyController::destroy
 * @see app/Http/Controllers/CompanyController.php:44
 * @route '/api/companies/{id}'
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
* @see \App\Http\Controllers\CompanyController::destroy
 * @see app/Http/Controllers/CompanyController.php:44
 * @route '/api/companies/{id}'
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
const CompanyController = { index, getPendingRequests, updateStatus, destroy }

export default CompanyController