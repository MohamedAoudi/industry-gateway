import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\registerCompanyController::registerCompany
 * @see app/Http/Controllers/registerCompanyController.php:11
 * @route '/api/register-company'
 */
export const registerCompany = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: registerCompany.url(options),
    method: 'post',
})

registerCompany.definition = {
    methods: ["post"],
    url: '/api/register-company',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\registerCompanyController::registerCompany
 * @see app/Http/Controllers/registerCompanyController.php:11
 * @route '/api/register-company'
 */
registerCompany.url = (options?: RouteQueryOptions) => {
    return registerCompany.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\registerCompanyController::registerCompany
 * @see app/Http/Controllers/registerCompanyController.php:11
 * @route '/api/register-company'
 */
registerCompany.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: registerCompany.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\registerCompanyController::registerCompany
 * @see app/Http/Controllers/registerCompanyController.php:11
 * @route '/api/register-company'
 */
    const registerCompanyForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: registerCompany.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\registerCompanyController::registerCompany
 * @see app/Http/Controllers/registerCompanyController.php:11
 * @route '/api/register-company'
 */
        registerCompanyForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: registerCompany.url(options),
            method: 'post',
        })
    
    registerCompany.form = registerCompanyForm
const registerCompanyController = { registerCompany }

export default registerCompanyController