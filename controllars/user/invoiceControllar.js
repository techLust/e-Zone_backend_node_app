const easyinvoice = require('easyinvoice');
const fs = require('fs')
const { OrderModel } =  require('../../models/user/ordersModel');
const UserModel = require('../../models/user/signUpUser');

exports.createInvoice = async (req, res) => {
    try {
        const orderId = req.params.orderId
        const orderDetails = await OrderModel.findById(orderId)
        console.log("user details", orderDetails.userId)
        const userDetails = await UserModel.findById(orderDetails.userId)
        console.log("order details", orderDetails)
        console.log("userDetails", userDetails)

        // return

        const data = {
            // Customize enables you to provide your own templates
            // Please review the documentation for instructions and examples
            "customize": {
                //  "template": fs.readFileSync('template.html', 'base64') // Must be base64 encoded html 
            },
            "images": {
                // The logo on top of your invoice
                // "logo": "https://public.easyinvoice.cloud/img/logo_en_original.png",
                // "logo": "https://logodownload.org/wp-content/uploads/2017/10/starbucks-logo-0.png",
                logo:"https://products-image.s3.ap-south-1.amazonaws.com/e-zone.png"
                // The invoice background
                // "background": "https://public.easyinvoice.cloud/img/watermark-draft.jpg"
            },
            // Your own data
            "sender": {
                "company": "e-Zone worldwide Pvt Ltd",
                "address": "No 3, RMZ Infinity - Tower",
                "zip": "560016",
                "state": "Karnataka",
                "city": "Bengaluru",
                "country": "India"
                //"custom1": "custom value 1",
                //"custom2": "custom value 2",
                //"custom3": "custom value 3"
            },
            // Your recipient
            "client": {
                "company": 'Customer name',
                "address": "Clientstreet 456",
                "zip": "4567 CD",
                "city": "Clientcity",
                "country": "Clientcountry"
                // "custom1": "custom value 1",
                // "custom2": "custom value 2",
                // "custom3": "custom value 3"
            },
            "information": {
                // Invoice number
                // "number": "2021.0001",
                // Invoice data
                "date": "12-12-2021",
                // Invoice due date
                // "due-date": "31-12-2021"
            },
            // The products you would like to see on your invoice
            // Total values are being calculated automatically
            "products": [
                {
                    "quantity": 2,
                    "description": "Product 1",
                    "tax-rate": 6,
                    "price": 33.87
                },
                {
                    "quantity": 4,
                    "description": "Product 2",
                    "tax-rate": 6,
                    "price": 12.34
                },
                {
                    "quantity": 4,
                    "description": "Product 3",
                    "tax-rate": 21,
                    "price": 6324.453456
                }
            ],
            // The message you would like to display on the bottom of your invoice
            // "bottom-notice": "Kindly pay your invoice within 15 days.",
            // Settings to customize your invoice
            "settings": {
                "currency": "USD", // See documentation 'Locales and Currency' for more info. Leave empty for no currency.
                // "locale": "nl-NL", // Defaults to en-US, used for number formatting (See documentation 'Locales and Currency')        
                // "margin-top": 25, // Defaults to '25'
                // "margin-right": 25, // Defaults to '25'
                // "margin-left": 25, // Defaults to '25'
                // "margin-bottom": 25, // Defaults to '25'
                // "format": "A4", // Defaults to A4, options: A3, A4, A5, Legal, Letter, Tabloid
                // "height": "1000px", // allowed units: mm, cm, in, px
                // "width": "500px", // allowed units: mm, cm, in, px
                // "orientation": "landscape", // portrait or landscape, defaults to portrait
            },
            // Translate your invoice to your preferred language
            "translate": {
                // "invoice": "FACTUUR",  // Default to 'INVOICE'
                // "number": "Nummer", // Defaults to 'Number'
                // "date": "Datum", // Default to 'Date'
                // "due-date": "Verloopdatum", // Defaults to 'Due Date'
                // "subtotal": "Subtotaal", // Defaults to 'Subtotal'
                // "products": "Producten", // Defaults to 'Products'
                // "quantity": "Aantal", // Default to 'Quantity'
                // "price": "Prijs", // Defaults to 'Price'
                // "product-total": "Totaal", // Defaults to 'Total'
                // "total": "Totaal", // Defaults to 'Total'
                // "vat": "btw" // Defaults to 'vat'
            },
        };

        const logo = "http://localhost:4000/public/e-zone.png"

        data.client.company = userDetails.fullName
        data.client.address = userDetails.email
        data.client.zip = `${userDetails.address[0].pin}`
        data.client.city = 'Bengaluru'
        data.client.country = 'India' 


        data.information.date = userDetails.createdAt


        data.products[0].description = orderDetails.orderedItem[0].productName
        data.products[1].description = orderDetails.orderedItem[1].productName
        data.products[2].description = orderDetails.orderedItem[2].productName

        console.log('DTAaaa', data)
        //Create your invoice! Easy!
        easyinvoice.createInvoice(data, function  (result) {
            //The response will contain a base64 encoded PDF file
            // console.log('PDF base64 string: ', result.pdf);
            try{

                fs.writeFileSync('invoice.pdf', result.pdf, 'base64')
            }
            catch(e){
                console.log(e.message)
            }
        });
        res.json({'status': 'invoice generated'})
    } catch (e) {
        console.log(e.message)
    }
}

// var data = {};
// const result = await easyinvoice.createInvoice(data);
// easyinvoice.download('myInvoice.pdf', result.pdf);