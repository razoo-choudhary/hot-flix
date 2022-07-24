/**
 *
 * @param data
 * @param url
 * @constructor
 */
const AuthRequest = ( data, url ) => {
    axios.post( url, data ).then( response => {
        if( response.data.message ){
            if(url === "/user-password") $("#user-password").trigger("reset")
            Snackbar.show( { text : response.data.message } )
        }
        if( response.data.location ){
            window.location.replace( response.data.location )
        }
    }).catch( error => {
        if( error.response.data.message ){
            Snackbar.show( { text : error.response.data.message } )
        }
    })
}

let checkout = new KhaltiCheckout(config);