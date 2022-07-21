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