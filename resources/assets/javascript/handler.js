$("#auth-signin").on("submit", function ( e )  { e.preventDefault()
    AuthRequest($(this).serialize(), "/signin")
})

$("#auth-signup").on("submit", function ( e ) { e.preventDefault()
    AuthRequest($(this).serialize(), "/signup")
})

$("#auth-forgot").on("submit", function ( e ) { e.preventDefault()
    AuthRequest($(this).serialize(), "/forgot")
})

$("#auth-reset").on("submit", function ( e ) { e.preventDefault()
    AuthRequest($(this).serialize(), "/reset")
})

$("#user-basic").on("submit", function ( e ) { e.preventDefault()
    AuthRequest($(this).serialize(), "/user-basics")
})

$("#user-password").on("submit", function ( e ) { e.preventDefault()
    AuthRequest($(this).serialize(), "/user-password")
})

$("#create-review").on("submit", function ( e ) { e.preventDefault()
    let h = $(this).serialize()
    h += '&count=' + Number($('#form__slider-value').html());
    AuthRequest(h, "/create-review")
})

$(".pay-plan").on("click", function () {
    let dataID = $(this).attr("data-id")
    if(dataID === "1"){
        checkout.show({amount: 5000});
    }

    if(dataID === "0"){
        Snackbar.show({ text : "Wait for your premium package to expire"})
    }

    if(dataID === "2"){
        checkout.show({amount: 10000});
    }
})

$("#search-head").on("submit",  function ( e ){
    e.preventDefault()
    let data = $(this).serializeArray()
    window.location.replace("/search/" + data[0]["value"]);
})