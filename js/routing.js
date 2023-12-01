app.config(function ($routeProvider) {
    $routeProvider
    .when("/product", {
        templateUrl : "/src/product.html",
        controller : "myController"
    })
    .when("/details/:id/:name", {
        templateUrl : "/src/deails.html",
        controller : "myController"
    })
    .when("/", {
        templateUrl : "/src/home.html",
        controller : "myController"
    })
    .when("/viewCart", {
        templateUrl : "/src/viewCart.html",
        controller : "myController"
    })
    .when("/checkout", {
        templateUrl : "/src/checkout.html",
        controller : "myController"
    })
    .when("/payment", {
        templateUrl : "/src/payment.html",
        controller : "myController"
    })
    .when("/complete", {
        templateUrl : "/src/complete.html",
        controller : "myController"
    })
    .when("/blog", {
        templateUrl : "/src/blog.html",
        controller : "myController"
    })
    .when("/contact", {
        templateUrl : "/src/contact.html",
        controller : "myController"
    })
    .when("/aboutUs", {
        templateUrl : "/src/aboutUs.html",
        controller : "myController"
    })
    
});