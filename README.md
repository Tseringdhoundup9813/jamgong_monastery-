DEVELOPMENT
HOW TO START ENGINE, TYPE
-----"npm run dev"

PRODUCTION
HOW TO START ENGINE, TYPE
-----'npm start/npm run start'

COORDINATOR

<!-- ---------------------------------------------------------- -->

    GET COORDIANTOR ROUTES
                    --http://localhost:8000/api/coordinator

                    Response
                        --all coordinator list
                        --length of coordinator
                        --success -- true/false


    POST COORDINATOR ROUTES
                     http://localhost:8000/api/coordinator

                    paylod are
                        --code -- required field!/unqiue
                        --name -- required field!
                        --country -- required field!
                        --address -- required field!
                        --email -- required field!
                        --whatsapp -- optional

<!-- ------------------------------------------------------------- -->

<!-- ORDER DELETE GUIDE FOR FRONTEND -->

order delete api endpoint order/delete/:id
you have to pass order ID to the end of endpoint,
example
-----"http://localhost:8000/api/order/delete/kflsd123123123123"

<!-- //////////////////////////////////////////////////////////////// -->

<!-- NEW UPDATE DATE tue,15,oct -->

/// update order payment status
api: /api/order/payment/status/id
method: POST
payload: {status:true} /{status:false}

<!-- ////////////////////////////////////////// -->
