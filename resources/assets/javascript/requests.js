let loaderBeforeContent = "";
axios.interceptors.request.use((config) => {
    PreLoader("start")
    return config;
  });
/**
 * 
 * @param {*} data 
 * @param {*} url 
 */
const AuthRequest = ( data, url ) => {
    axios.post( url, data ).then( response => {
        if( response.data.message ){
            if( url === "/user-password" ) $("#user-password").trigger("reset")
            Snackbar.show( { text : response.data.message } )
            PreLoader("end")
        }
        if( response.data.location ){
            window.location.replace( response.data.location )
        }
    }).catch( error => {
        if( error.response.data.message ){
            Snackbar.show( { text : error.response.data.message } )
            PreLoader("end")
        }
    })
}

const PreLoader = ( action = "start" ) => {
    $(".alert").removeClass("alert-danger")
    $(".alert").removeClass("alert-success")
    $(".alert").hide()
    let selector = $("body").find(":input",":button");
    if(action === "start") selector.attr("disabled", true)
    if(action === "end") selector.attr("disabled", false)
}


/**
 *
 * @param {*} form_data
 * @param This
 */
const UploadMovie = ( form_data, This ) => {
    let alert = $("#bootstrap-alert-admin");
    axios.post( "/admin/upload-movie", form_data).then( response => {
        if(response.data.reset) This.trigger("reset")
        $("#form__img").attr("src", "")
        $("#movie1").html("")
        $("#gallery1").html("")
        PreLoader("end")
        alert.addClass("alert-success")
        alert.html(response.data.message)
        alert.show()
        This.find(".form__btn").html(loaderBeforeContent)
        scrollToTop()
    }).catch( error => {
        PreLoader("end")
        This.find(".form__btn").html(loaderBeforeContent)
        alert.addClass("alert-danger")
        alert.html(error.response.data.message)
        alert.show()
        scrollToTop()
    })
}

function scrollToTop(){
    $("html, body").animate({ scrollTop: 0 }, "slow");
}

let checkout = new KhaltiCheckout(config);