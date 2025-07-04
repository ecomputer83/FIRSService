const payloadConvert = (payload) => {
    try {
        var dt = payload.invoiceDate.replace('-', '').replace('-', '')
    var irn = payload.invoiceNo + '-' + payload.serviceID + '-' + dt
    console.log(irn)
    var req = {
    business_id: payload.businessId,
    irn: irn,
    issue_date: payload.issueDate,
    due_date: payload.dueDate, //optional
    issue_time: payload.issueTime, //optional   
    invoice_type_code: payload.invoiceType,
    payment_status: "PENDING", //optional, defaults to pending  
    note: payload.note, //optional
    tax_point_date: payload.taxPointDate, //optional
    document_currency_code: payload.documentCurrencyCode,
    tax_currency_code: payload.taxCurrencyCode, //optional
    accounting_cost: `${payload.accountingCost} ${payload.documentCurrencyCode}`, //optional
    buyer_reference: payload.buyerReference, //optional
    order_reference: payload.orderReference, //optional
    accounting_supplier_party: {
        party_name: payload.companyName, 
        tin: payload.companyTin, // now mandatory 
        email: payload.companyEmail, // now mandatory 
        telephone: payload.companyTelephone, //optional, must start with + (meaning country code) 
        business_description: payload.commpanyDetail, //optional 
        postal_address: {
            street_name: payload.streetAddress, 
            city_name: payload.city, 
            postal_zone: payload.postalCode, 
            country: payload.country 
        } 
    },
    payment_terms_note: payload.paymentTerms,//optional
    tax_total: [],
    legal_monetary_total: {
        line_extension_amount: payload.extendedAmount,
        tax_exclusive_amount: payload.taxExclusive,
        tax_inclusive_amount: payload.taxInclusive,
        payable_amount: payload.payableAmount
    },
    invoice_line: []
    }
    console.log(req)
    payload.invoiceLines.forEach(line => {
        var totalTax = {
            tax_amount: line.taxAmount,
            tax_subtotal: (line.subtotal.length > 0) ? line.subtotal : [
                {
                    taxable_amount: line.itemAmount,
                    tax_amount: line.taxAmount,
                    tax_category: {
                        id: line.taxCategory,
                        percent: line.tax
                    }
                }
            ]
        }
        var invline = {
            hsn_code: line.itemNo, 
            product_category: line.itemCategory, 
            discount_rate: line.discountRate, 
            discount_amount: line.discountAmount, 
            fee_rate: line.itemRate, 
            fee_amount: line.itemAmount, 
            invoiced_quantity: line.itemQuantity,
            line_extension_amount: line.itemAmount,
            item: {
                name: line.itemName,
                description: line.itemDescription
            },
            price: {
                price_amount: line.itemAmount,
                base_quantity: line.itemQuantity,
                price_unit: `${line.itemRate} ${payload.documentCurrencyCode} per 1`
            }
        }
        req.tax_total.push(totalTax)
        req.invoice_line.push(invline)
    });
    return req
    }
    catch(e) {
        console.log(e)
    }
}

module.exports = {
    payloadConvert: payloadConvert
}