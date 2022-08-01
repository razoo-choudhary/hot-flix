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

function x_torque( page ) {
    let filters = JSON.parse(sessionStorage.getItem("filter"))
    let activePage = $(".paginatorClassed").find(".paginator__item--active > a").html();
    if(page && page > 0) activePage = page
    let link = "?page=" + activePage;
    if( filters ){
        Object.keys(filters).forEach(function(key) {
            link += "&"+ key+"="+filters[key];
        });
        link += "&filter=true";
    }
    window.location.replace($(".btn-srh-input").val() ? "/search/" + $(".btn-srh-input").val() + link : "/all?" + link)
}

$("#apply-filter").on("click", function () { x_torque() })

$(".paginator__item").on("click", function (){
    if(typeof Number($(this).find("a").attr("data-page")) === "number"){
        x_torque(Number($(this).find("a").attr("data-page")))
    }
})

$("#admin-upload").on("submit", function ( e ) {
    e.preventDefault()
    loaderBeforeContent = $(this).find(".form__btn").html()
    const loader = '<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>';
    $(this).find(".form__btn").html(loader)
    const formData = new FormData(this)
    UploadMovie(formData, $(this))
})