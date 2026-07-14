import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\FaqQuestionController::index
 * @see app/Http/Controllers/FaqQuestionController.php:47
 * @route '/admin/faqs'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/faqs',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\FaqQuestionController::index
 * @see app/Http/Controllers/FaqQuestionController.php:47
 * @route '/admin/faqs'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\FaqQuestionController::index
 * @see app/Http/Controllers/FaqQuestionController.php:47
 * @route '/admin/faqs'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\FaqQuestionController::index
 * @see app/Http/Controllers/FaqQuestionController.php:47
 * @route '/admin/faqs'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\FaqQuestionController::index
 * @see app/Http/Controllers/FaqQuestionController.php:47
 * @route '/admin/faqs'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\FaqQuestionController::index
 * @see app/Http/Controllers/FaqQuestionController.php:47
 * @route '/admin/faqs'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\FaqQuestionController::index
 * @see app/Http/Controllers/FaqQuestionController.php:47
 * @route '/admin/faqs'
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
* @see \App\Http\Controllers\FaqQuestionController::update
 * @see app/Http/Controllers/FaqQuestionController.php:62
 * @route '/admin/faqs/{id}'
 */
export const update = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(args, options),
    method: 'post',
})

update.definition = {
    methods: ["post"],
    url: '/admin/faqs/{id}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\FaqQuestionController::update
 * @see app/Http/Controllers/FaqQuestionController.php:62
 * @route '/admin/faqs/{id}'
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
* @see \App\Http\Controllers\FaqQuestionController::update
 * @see app/Http/Controllers/FaqQuestionController.php:62
 * @route '/admin/faqs/{id}'
 */
update.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\FaqQuestionController::update
 * @see app/Http/Controllers/FaqQuestionController.php:62
 * @route '/admin/faqs/{id}'
 */
    const updateForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\FaqQuestionController::update
 * @see app/Http/Controllers/FaqQuestionController.php:62
 * @route '/admin/faqs/{id}'
 */
        updateForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, options),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\FaqQuestionController::destroy
 * @see app/Http/Controllers/FaqQuestionController.php:112
 * @route '/admin/faqs/{id}'
 */
export const destroy = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/faqs/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\FaqQuestionController::destroy
 * @see app/Http/Controllers/FaqQuestionController.php:112
 * @route '/admin/faqs/{id}'
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
* @see \App\Http\Controllers\FaqQuestionController::destroy
 * @see app/Http/Controllers/FaqQuestionController.php:112
 * @route '/admin/faqs/{id}'
 */
destroy.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\FaqQuestionController::destroy
 * @see app/Http/Controllers/FaqQuestionController.php:112
 * @route '/admin/faqs/{id}'
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
* @see \App\Http\Controllers\FaqQuestionController::destroy
 * @see app/Http/Controllers/FaqQuestionController.php:112
 * @route '/admin/faqs/{id}'
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
const faqs = {
    index: Object.assign(index, index),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default faqs