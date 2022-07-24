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