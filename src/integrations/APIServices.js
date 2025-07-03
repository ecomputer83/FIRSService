const { handleResponse } = require('./HandleResponse.js')
const { requestOptions } = require('./RequestOptions.js')

const APIServices = {
    getCountries,
    getCurrencies,
    getTaxCategories,
    getInvoiceType,
    validateInvoice,
    signInvoice
}

async function getCountries() {
    return await fetch(`${process.env.BASE_URL}/api/v1/invoice/resources/countries`, requestOptions.get())
}
async function getCurrencies() {
    return await fetch(`${process.env.BASE_URL}/api/v1/invoice/resources/currencies`, requestOptions.get())  
}
async function getTaxCategories() {
  return await fetch(`${process.env.BASE_URL}/api/v1/invoice/resources/tax-categories`, requestOptions.get())
}
async function getInvoiceType() {
  return await fetch(`${process.env.BASE_URL}/api/v1/invoice/resources/invoice-types`, requestOptions.get())
}
async function validateInvoice(data) {
  return await fetch(`${process.env.BASE_URL}/api/v1/invoice/validate`, requestOptions.post(data))
}
async function signInvoice(data) {
  return await fetch(`${process.env.BASE_URL}/api/v1/invoice/sign`, requestOptions.post(data))
}

module.exports = {
  APIServices: APIServices
}