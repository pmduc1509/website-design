app.config(function ($routeProvider) {
    $routeProvider
    .when("/product", {
        templateUrl : "/gardening/src/product.html",
        controller : "myController"
    })
    .when("/details/:id/:name", {
        templateUrl : "/gardening/src/deails.html",
        controller : "myController"
    })
    .when("/", {
        templateUrl : "/gardening/src/home.html",
        controller : "myController"
    })
    .when("/viewCart", {
        templateUrl : "/gardening/src/viewCart.html",
        controller : "myController"
    })
    .when("/checkout", {
        templateUrl : "/gardening/src/checkout.html",
        controller : "myController"
    })
    .when("/payment", {
        templateUrl : "/gardening/src/payment.html",
        controller : "myController"
    })
    .when("/complete", {
        templateUrl : "/gardening/src/complete.html",
        controller : "myController"
    })
    .when("/blog", {
        templateUrl : "/gardening/src/blog.html",
        controller : "myController"
    })
    .when("/contact", {
        templateUrl : "/gardening/src/contact.html",
        controller : "myController"
    })
    .when("/aboutUs", {
        templateUrl : "/gardening/src/aboutUs.html",
        controller : "myController"
    })
    
});