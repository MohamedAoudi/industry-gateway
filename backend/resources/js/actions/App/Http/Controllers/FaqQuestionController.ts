import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\FaqQuestionController::index
 * @see app/Http/Controllers/FaqQuestionController.php:11
 * @route '/api/faqs'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/faqs',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\FaqQuestionController::index
 * @see app/Http/Controllers/FaqQuestionController.php:11
 * @route '/api/faqs'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\FaqQuestionController::index
 * @see app/Http/Controllers/FaqQuestionController.php:11
 * @route '/api/faqs'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\FaqQuestionController::index
 * @see app/Http/Controllers/FaqQuestionController.php:11
 * @route '/api/faqs'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\FaqQuestionController::index
 * @see app/Http/Controllers/FaqQuestionController.php:11
 * @route '/api/faqs'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\FaqQuestionController::index
 * @see app/Http/Controllers/FaqQuestionController.php:11
 * @route '/api/faqs'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\FaqQuestionController::index
 * @see app/Http/Controllers/FaqQuestionController.php:11
 * @route '/api/faqs'
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
* @see \App\Http\Controllers\FaqQuestionController::store
 * @see app/Http/Controllers/FaqQuestionController.php:25
 * @route '/api/faqs'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/faqs',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\FaqQuestionController::store
 * @see app/Http/Controllers/FaqQuestionController.php:25
 * @route '/api/faqs'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\FaqQuestionController::store
 * @see app/Http/Controllers/FaqQuestionController.php:25
 * @route '/api/faqs'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\FaqQuestionController::store
 * @see app/Http/Controllers/FaqQuestionController.php:25
 * @route '/api/faqs'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\FaqQuestionController::store
 * @see app/Http/Controllers/FaqQuestionController.php:25
 * @route '/api/faqs'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\FaqQuestionController::adminIndex
 * @see app/Http/Controllers/FaqQuestionController.php:47
 * @route '/api/faqs/admin'
 */
const adminIndex9342bbf2d1d143ad476ee655c9a885e0 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: adminIndex9342bbf2d1d143ad476ee655c9a885e0.url(options),
    method: 'get',
})

adminIndex9342bbf2d1d143ad476ee655c9a885e0.definition = {
    methods: ["get","head"],
    url: '/api/faqs/admin',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\FaqQuestionController::adminIndex
 * @see app/Http/Controllers/FaqQuestionController.php:47
 * @route '/api/faqs/admin'
 */
adminIndex9342bbf2d1d143ad476ee655c9a885e0.url = (options?: RouteQueryOptions) => {
    return adminIndex9342bbf2d1d143ad476ee655c9a885e0.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\FaqQuestionController::adminIndex
 * @see app/Http/Controllers/FaqQuestionController.php:47
 * @route '/api/faqs/admin'
 */
adminIndex9342bbf2d1d143ad476ee655c9a885e0.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: adminIndex9342bbf2d1d143ad476ee655c9a885e0.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\FaqQuestionController::adminIndex
 * @see app/Http/Controllers/FaqQuestionController.php:47
 * @route '/api/faqs/admin'
 */
adminIndex9342bbf2d1d143ad476ee655c9a885e0.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: adminIndex9342bbf2d1d143ad476ee655c9a885e0.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\FaqQuestionController::adminIndex
 * @see app/Http/Controllers/FaqQuestionController.php:47
 * @route '/api/faqs/admin'
 */
    const adminIndex9342bbf2d1d143ad476ee655c9a885e0Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: adminIndex9342bbf2d1d143ad476ee655c9a885e0.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\FaqQuestionController::adminIndex
 * @see app/Http/Controllers/FaqQuestionController.php:47
 * @route '/api/faqs/admin'
 */
        adminIndex9342bbf2d1d143ad476ee655c9a885e0Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: adminIndex9342bbf2d1d143ad476ee655c9a885e0.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\FaqQuestionController::adminIndex
 * @see app/Http/Controllers/FaqQuestionController.php:47
 * @route '/api/faqs/admin'
 */
        adminIndex9342bbf2d1d143ad476ee655c9a885e0Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: adminIndex9342bbf2d1d143ad476ee655c9a885e0.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    adminIndex9342bbf2d1d143ad476ee655c9a885e0.form = adminIndex9342bbf2d1d143ad476ee655c9a885e0Form
    /**
* @see \App\Http\Controllers\FaqQuestionController::adminIndex
 * @see app/Http/Controllers/FaqQuestionController.php:47
 * @route '/admin/faqs'
 */
const adminIndex067b1426c4052914b30e2ee74e797a86 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: adminIndex067b1426c4052914b30e2ee74e797a86.url(options),
    method: 'get',
})

adminIndex067b1426c4052914b30e2ee74e797a86.definition = {
    methods: ["get","head"],
    url: '/admin/faqs',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\FaqQuestionController::adminIndex
 * @see app/Http/Controllers/FaqQuestionController.php:47
 * @route '/admin/faqs'
 */
adminIndex067b1426c4052914b30e2ee74e797a86.url = (options?: RouteQueryOptions) => {
    return adminIndex067b1426c4052914b30e2ee74e797a86.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\FaqQuestionController::adminIndex
 * @see app/Http/Controllers/FaqQuestionController.php:47
 * @route '/admin/faqs'
 */
adminIndex067b1426c4052914b30e2ee74e797a86.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: adminIndex067b1426c4052914b30e2ee74e797a86.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\FaqQuestionController::adminIndex
 * @see app/Http/Controllers/FaqQuestionController.php:47
 * @route '/admin/faqs'
 */
adminIndex067b1426c4052914b30e2ee74e797a86.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: adminIndex067b1426c4052914b30e2ee74e797a86.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\FaqQuestionController::adminIndex
 * @see app/Http/Controllers/FaqQuestionController.php:47
 * @route '/admin/faqs'
 */
    const adminIndex067b1426c4052914b30e2ee74e797a86Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: adminIndex067b1426c4052914b30e2ee74e797a86.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\FaqQuestionController::adminIndex
 * @see app/Http/Controllers/FaqQuestionController.php:47
 * @route '/admin/faqs'
 */
        adminIndex067b1426c4052914b30e2ee74e797a86Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: adminIndex067b1426c4052914b30e2ee74e797a86.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\FaqQuestionController::adminIndex
 * @see app/Http/Controllers/FaqQuestionController.php:47
 * @route '/admin/faqs'
 */
        adminIndex067b1426c4052914b30e2ee74e797a86Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: adminIndex067b1426c4052914b30e2ee74e797a86.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    adminIndex067b1426c4052914b30e2ee74e797a86.form = adminIndex067b1426c4052914b30e2ee74e797a86Form

export const adminIndex = {
    '/api/faqs/admin': adminIndex9342bbf2d1d143ad476ee655c9a885e0,
    '/admin/faqs': adminIndex067b1426c4052914b30e2ee74e797a86,
}

/**
* @see \App\Http\Controllers\FaqQuestionController::update
 * @see app/Http/Controllers/FaqQuestionController.php:62
 * @route '/api/faqs/{id}'
 */
const update52eaa6c6adff261f3acd27ca9215531b = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update52eaa6c6adff261f3acd27ca9215531b.url(args, options),
    method: 'put',
})

update52eaa6c6adff261f3acd27ca9215531b.definition = {
    methods: ["put","patch","post"],
    url: '/api/faqs/{id}',
} satisfies RouteDefinition<["put","patch","post"]>

/**
* @see \App\Http\Controllers\FaqQuestionController::update
 * @see app/Http/Controllers/FaqQuestionController.php:62
 * @route '/api/faqs/{id}'
 */
update52eaa6c6adff261f3acd27ca9215531b.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return update52eaa6c6adff261f3acd27ca9215531b.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\FaqQuestionController::update
 * @see app/Http/Controllers/FaqQuestionController.php:62
 * @route '/api/faqs/{id}'
 */
update52eaa6c6adff261f3acd27ca9215531b.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update52eaa6c6adff261f3acd27ca9215531b.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\FaqQuestionController::update
 * @see app/Http/Controllers/FaqQuestionController.php:62
 * @route '/api/faqs/{id}'
 */
update52eaa6c6adff261f3acd27ca9215531b.patch = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update52eaa6c6adff261f3acd27ca9215531b.url(args, options),
    method: 'patch',
})
/**
* @see \App\Http\Controllers\FaqQuestionController::update
 * @see app/Http/Controllers/FaqQuestionController.php:62
 * @route '/api/faqs/{id}'
 */
update52eaa6c6adff261f3acd27ca9215531b.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update52eaa6c6adff261f3acd27ca9215531b.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\FaqQuestionController::update
 * @see app/Http/Controllers/FaqQuestionController.php:62
 * @route '/api/faqs/{id}'
 */
    const update52eaa6c6adff261f3acd27ca9215531bForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update52eaa6c6adff261f3acd27ca9215531b.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\FaqQuestionController::update
 * @see app/Http/Controllers/FaqQuestionController.php:62
 * @route '/api/faqs/{id}'
 */
        update52eaa6c6adff261f3acd27ca9215531bForm.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update52eaa6c6adff261f3acd27ca9215531b.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\FaqQuestionController::update
 * @see app/Http/Controllers/FaqQuestionController.php:62
 * @route '/api/faqs/{id}'
 */
        update52eaa6c6adff261f3acd27ca9215531bForm.patch = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update52eaa6c6adff261f3acd27ca9215531b.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\FaqQuestionController::update
 * @see app/Http/Controllers/FaqQuestionController.php:62
 * @route '/api/faqs/{id}'
 */
        update52eaa6c6adff261f3acd27ca9215531bForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update52eaa6c6adff261f3acd27ca9215531b.url(args, options),
            method: 'post',
        })
    
    update52eaa6c6adff261f3acd27ca9215531b.form = update52eaa6c6adff261f3acd27ca9215531bForm
    /**
* @see \App\Http\Controllers\FaqQuestionController::update
 * @see app/Http/Controllers/FaqQuestionController.php:62
 * @route '/admin/faqs/{id}'
 */
const updatecbde370f2c4180eb1a085cc45b94e12e = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updatecbde370f2c4180eb1a085cc45b94e12e.url(args, options),
    method: 'post',
})

updatecbde370f2c4180eb1a085cc45b94e12e.definition = {
    methods: ["post"],
    url: '/admin/faqs/{id}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\FaqQuestionController::update
 * @see app/Http/Controllers/FaqQuestionController.php:62
 * @route '/admin/faqs/{id}'
 */
updatecbde370f2c4180eb1a085cc45b94e12e.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return updatecbde370f2c4180eb1a085cc45b94e12e.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\FaqQuestionController::update
 * @see app/Http/Controllers/FaqQuestionController.php:62
 * @route '/admin/faqs/{id}'
 */
updatecbde370f2c4180eb1a085cc45b94e12e.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updatecbde370f2c4180eb1a085cc45b94e12e.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\FaqQuestionController::update
 * @see app/Http/Controllers/FaqQuestionController.php:62
 * @route '/admin/faqs/{id}'
 */
    const updatecbde370f2c4180eb1a085cc45b94e12eForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updatecbde370f2c4180eb1a085cc45b94e12e.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\FaqQuestionController::update
 * @see app/Http/Controllers/FaqQuestionController.php:62
 * @route '/admin/faqs/{id}'
 */
        updatecbde370f2c4180eb1a085cc45b94e12eForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updatecbde370f2c4180eb1a085cc45b94e12e.url(args, options),
            method: 'post',
        })
    
    updatecbde370f2c4180eb1a085cc45b94e12e.form = updatecbde370f2c4180eb1a085cc45b94e12eForm

export const update = {
    '/api/faqs/{id}': update52eaa6c6adff261f3acd27ca9215531b,
    '/admin/faqs/{id}': updatecbde370f2c4180eb1a085cc45b94e12e,
}

/**
* @see \App\Http\Controllers\FaqQuestionController::destroy
 * @see app/Http/Controllers/FaqQuestionController.php:112
 * @route '/api/faqs/{id}'
 */
const destroy52eaa6c6adff261f3acd27ca9215531b = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy52eaa6c6adff261f3acd27ca9215531b.url(args, options),
    method: 'delete',
})

destroy52eaa6c6adff261f3acd27ca9215531b.definition = {
    methods: ["delete"],
    url: '/api/faqs/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\FaqQuestionController::destroy
 * @see app/Http/Controllers/FaqQuestionController.php:112
 * @route '/api/faqs/{id}'
 */
destroy52eaa6c6adff261f3acd27ca9215531b.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return destroy52eaa6c6adff261f3acd27ca9215531b.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\FaqQuestionController::destroy
 * @see app/Http/Controllers/FaqQuestionController.php:112
 * @route '/api/faqs/{id}'
 */
destroy52eaa6c6adff261f3acd27ca9215531b.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy52eaa6c6adff261f3acd27ca9215531b.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\FaqQuestionController::destroy
 * @see app/Http/Controllers/FaqQuestionController.php:112
 * @route '/api/faqs/{id}'
 */
    const destroy52eaa6c6adff261f3acd27ca9215531bForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy52eaa6c6adff261f3acd27ca9215531b.url(args, {
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
 * @route '/api/faqs/{id}'
 */
        destroy52eaa6c6adff261f3acd27ca9215531bForm.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy52eaa6c6adff261f3acd27ca9215531b.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy52eaa6c6adff261f3acd27ca9215531b.form = destroy52eaa6c6adff261f3acd27ca9215531bForm
    /**
* @see \App\Http\Controllers\FaqQuestionController::destroy
 * @see app/Http/Controllers/FaqQuestionController.php:112
 * @route '/admin/faqs/{id}'
 */
const destroycbde370f2c4180eb1a085cc45b94e12e = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroycbde370f2c4180eb1a085cc45b94e12e.url(args, options),
    method: 'delete',
})

destroycbde370f2c4180eb1a085cc45b94e12e.definition = {
    methods: ["delete"],
    url: '/admin/faqs/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\FaqQuestionController::destroy
 * @see app/Http/Controllers/FaqQuestionController.php:112
 * @route '/admin/faqs/{id}'
 */
destroycbde370f2c4180eb1a085cc45b94e12e.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return destroycbde370f2c4180eb1a085cc45b94e12e.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\FaqQuestionController::destroy
 * @see app/Http/Controllers/FaqQuestionController.php:112
 * @route '/admin/faqs/{id}'
 */
destroycbde370f2c4180eb1a085cc45b94e12e.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroycbde370f2c4180eb1a085cc45b94e12e.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\FaqQuestionController::destroy
 * @see app/Http/Controllers/FaqQuestionController.php:112
 * @route '/admin/faqs/{id}'
 */
    const destroycbde370f2c4180eb1a085cc45b94e12eForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroycbde370f2c4180eb1a085cc45b94e12e.url(args, {
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
        destroycbde370f2c4180eb1a085cc45b94e12eForm.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroycbde370f2c4180eb1a085cc45b94e12e.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroycbde370f2c4180eb1a085cc45b94e12e.form = destroycbde370f2c4180eb1a085cc45b94e12eForm

export const destroy = {
    '/api/faqs/{id}': destroy52eaa6c6adff261f3acd27ca9215531b,
    '/admin/faqs/{id}': destroycbde370f2c4180eb1a085cc45b94e12e,
}

const FaqQuestionController = { index, store, adminIndex, update, destroy }

export default FaqQuestionController