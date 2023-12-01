app.directive('slickSlider', function() {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        $(element).slick({
          slidesToShow: 4,
          slidesToScroll: 1,
          isFinite: true,
          arrows: true,
          autoplay: false,
          autoplaySpeed: 2000,
          draggable: false,
          prevArrow:"<button type='button' class='slick-prev slick-arrow'><i class='fa fa-angle-left' aria-hidden='true'></i></button>",
          nextArrow:"<button type='button' class='slick-next slick-arrow'><i class='fa fa-angle-right' aria-hidden='true'></i></button>",
          dots: false,
          responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                arrows: false,
                isFinite: false
              }
            }           
          ]
        });
      }
    };
  })
  .controller('myController', function($scope, $http, $window, $routeParams, $interval) {
    $http.get('/gardening/product.json')
      .then(function(response) {
        $scope.products = response.data;
        $scope.id = $routeParams.id;
        $scope.name = $routeParams.name;
        $scope.productDetails = $scope.products.find(function(product) {
            return product.id === parseInt($scope.id) && product.name === $scope.name;
        });
      });
        // img ID
    $scope.filterByIds = function(ids) {
      return function(product) {
        return ids.indexOf(product.id) !== -1;
      };
    };

    // Banner
    $scope.slides = [
      {
          text1: 'Style Destination',
          text2: 'The Most Beautiful',
          text3: 'Bonsai',
          text4: 'Elegant living sculptures, meticulously shaped and cherished.',
          imageUrl: '/gardening/img/banner/s1.webp'
      },
      {
          text1: 'Style Destination',
          text2: 'Up To 30% Off',
          text3: 'First Order',
          text4: 'The sale will take place this week.',
          imageUrl: '/gardening/img/banner/s2.webp'
      }
      // Add more slides as needed
  ];
  
  $scope.currentSlide = 0;

  $scope.changeSlide = function(index) {
      $scope.currentSlide = index;
  }

  $interval(function() {
      $scope.currentSlide = ($scope.currentSlide + 1) % $scope.slides.length;
  }, 3000);

  // Feedback
  $scope.currentfbSlide = 0;
$scope.fbslides = [
{ image: '/gardening/img/banner/customer1.jpg', feedback: 'Great product!', name: 'John Doe', date: '01/10/2023' },
{ image: '/gardening/img/banner/customer2.jpg', feedback: 'I love it!', name: 'Jane Smith', date: '02/02/2023' },
{ image: '/gardening/img/banner/customer3.jpg', feedback: 'Highly recommended!', name: 'Bob Johnson', date: '07/08/2023' },
{ image: '/gardening/img/banner/customer4.jpg', feedback: 'Amazing plant!', name: 'Alice Brown', date: '13/02/2023' }
];
$scope.productImage = '/gardening/img/banner/feed-back.jpg';

$scope.changefbSlide = function (index) {
if (index < 0) {
index = $scope.fbslides.length - 1;
} else if (index >= $scope.fbslides.length) {
index = 0;
}
$scope.currentfbSlide = index;
resetAutofbSlide();
};

var autofbSlideInterval = $interval(function () {
$scope.changefbSlide($scope.currentfbSlide + 1);
}, 3000);

function resetAutofbSlide() {
$interval.cancel(autofbSlideInterval);
autofbSlideInterval = $interval(function () {
$scope.changefbSlide($scope.currentfbSlide + 1);
}, 6000);
}
resetAutofbSlide();


    // Show cart
    $scope.showCart = false;
    $scope.showcart = function() {
      $scope.showCart = !$scope.showCart 
    }

    $scope.closeCart = function() {
      $scope.showCart = false; 
    };

    // Filter products by Category
    $scope.filterCategory = 'All';

    $scope.filterByCategory = function(category) {
      $scope.filterCategory = category;
    
    };
    
    $scope.matchCategory = function(product) {
      return $scope.filterCategory === 'All' || product.categories === $scope.filterCategory;
    };

    // filter products by price
    $scope.filterCategory = 'All';


    $scope.isAnyChecked = false;
    $scope.priceRange = {
        '10-15': false,
        '15-20': false,
        '20-30': false,
        '30-40': false,
        '40-50': false
    };

    $scope.updatePriceCheckStatus = function() {
        $scope.isAnyChecked = false;
        for (var range in $scope.priceRange) {
            if ($scope.priceRange[range]) {
                $scope.isAnyChecked = true;
                break;
            }
        }
    };

    $scope.priceFilter = function(product) {
        if (!$scope.isAnyChecked) {
            return true;
        }
        for (var range in $scope.priceRange) {
            if ($scope.priceRange[range] && product.price >= parseInt(range.split('-')[0]) && product.price <= parseInt(range.split('-')[1])) {
                return true;
            }
        }
        return false;
    };

  





     // Sort products by letter, price, favorite
     $scope.sortOption = 'Default Sorting';

        // Product filter function based on sort option
    $scope.sortProducts = function(product) {
      if ($scope.sortOption === 'Default Sorting') {
          return true;
      } else if ($scope.sortOption === 'Sort by Price: low to high') {
          return true; // Hiển thị tất cả sản phẩm, không cần sắp xếp ở đây
      } else if ($scope.sortOption === 'Sort by Price: high to low') {
          return true; // Hiển thị tất cả sản phẩm, không cần sắp xếp ở đây
      } else if ($scope.sortOption === 'Sort by Letter') {
          // Logic sắp xếp theo chữ cái
          return true; // Hiển thị tất cả sản phẩm, không cần sắp xếp ở đây
      } else if ($scope.sortOption === 'Sort by Popularity') {
        // Logic sắp xếp theo chữ cái
        return true; // Hiển thị tất cả sản phẩm, không cần sắp xếp ở đây
    }

      // Trả về false để ẩn sản phẩm không phù hợp với tùy chọn sắp xếp
      return false;
  };
   // Hàm sắp xếp sản phẩm theo giá từ cao xuống thấp
   $scope.sortByPriceHighToLow = function(product) {
    if ($scope.sortOption === 'Sort by Price: high to low') {
        return -product.price;
    }
    return 0;
};
 // Hàm sắp xếp sản phẩm theo tên (bảng chữ cái)
 $scope.sortByName = function(product) {
  if ($scope.sortOption === 'Sort by Letter') {
      return product.name;
  }
  return 0;
};
// Hàm sắp xếp sản phẩm theo số lượng (quantity)
$scope.sortByQuantity = function(product) {
  // Thay đổi tên tùy chọn tương ứng với ng-model của select box
  if ($scope.sortOption === 'Sort by Popularity') {
      return product.quantity;
  } 
  return 0;
};
// Hàm sắp xếp sản phẩm theo giá từ thấp lên cao
$scope.sortByPriceLowToHigh = function(product) {
  if ($scope.sortOption === 'Sort by Price: low to high') {
      return product.price;
  }
  return 0;
};
 // Hàm sắp xếp sản phẩm theo do hap dan
 $scope.sortByQuantity = function(product) {
  // Thay đổi tên tùy chọn tương ứng với ng-model của select box
  if ($scope.sortOption === 'Sort by Popularity') {
      return product.quantity;
  } 
  return 0;
};

    // purchase and sale function
 // btn up down quantity
 $scope.downquantity = function(item) {
  if (item.quantity > 1) {
    item.quantity--;
    $scope.updateQuantity(item);
    $scope.calculateTotalPrice();
  }
}
$scope.upquantity = function(item) {
  item.quantity++;
  $scope.updateQuantity(item);
  $scope.calculateTotalPrice();

}
 // Add to cart
    // Funtion subTotal
    $scope.calculateSubTotal = function(item) {
      return item.quantity * item.price;
    };
    // Funtion total
    $scope.totalPrice = 0;
    if (sessionStorage.getItem('totalPrice')) {
      $scope.totalPrice = parseFloat(sessionStorage.getItem('totalPrice'));
    }
    $scope.calculateTotalPrice = function() {
      $scope.totalPrice = 0;
      for (var i = 0; i < $scope.cartItems.length; i++) {
        var item = $scope.cartItems[i];
        if (item.quantity && item.price) {
          item.subTotal = $scope.calculateSubTotal(item); 
          $scope.totalPrice += item.subTotal;
        }
      }
      sessionStorage.setItem('totalPrice', $scope.totalPrice.toString());
    };
    
    // add to cart
    $scope.cartItems = [];
    if (sessionStorage.getItem('cartItems')) {
      $scope.cartItems = angular.fromJson(sessionStorage.getItem('cartItems'));
    }
    $scope.count = 0;
    if (sessionStorage.getItem('count')) {
      $scope.count = angular.fromJson(sessionStorage.getItem('count'));
    }
    $scope.addToCart = function(product) {
       
      var existingProductIndex = $scope.cartItems.findIndex(function(item) {
        return item.id === product.id;
      });
    
      if (existingProductIndex !== -1) {
        $scope.cartItems[existingProductIndex].quantity++;
      } else {
        var cart = {
          "id": product.id,
          "name": product.name,
          "price": product.price,
          "quantity": 1,
          "categories": product.categories,
          "img1": product.img1,
          "img2": product.img2,
          "img3": product.img3,
          "desc": product.desc
        };
        $scope.cartItems.push(cart);
        $scope.count = $scope.cartItems.length;
      }
      sessionStorage.setItem('cartItems',angular.toJson($scope.cartItems))
      sessionStorage.setItem('count',angular.toJson($scope.count))
      console.log($scope.cartItems)
     
      $scope.calculateTotalPrice();
      console.log($scope.totalPrice);

    }
    // Delete product
    $scope.deleteCartItems = function(id) {
      for (var i = 0; i < $scope.cartItems.length; i++) {
        if ($scope.cartItems[i].id === id) {
          $scope.cartItems.splice(i, 1);
          break; 
        }
      }
      // Cập nhật số lượng
    $scope.count = $scope.cartItems.length;
    $scope.calculateTotalPrice();
    console.log($scope.totalPrice);
    sessionStorage.setItem('count',angular.toJson($scope.count))
    sessionStorage.setItem('cartItems', angular.toJson($scope.cartItems));
    };
    // Update quantity
    $scope.updateQuantity = function(item) {       
        var index = $scope.cartItems.indexOf(item);
      if (index !== -1) {
        var copyItem = angular.copy(item);
        copyItem.quantity = item.quantity;
        $scope.cartItems[index] = angular.extend({}, copyItem);
        sessionStorage.setItem('cartItems', angular.toJson($scope.cartItems));
        sessionStorage.setItem('quantity', item.quantity.toString());
      }
      $scope.calculateTotalPrice();
    };

    $scope.shipping = 7.50;
    $scope.total = $scope.shipping + $scope.totalPrice;
    $scope.calculateTotal = function() {
      $scope.total = $scope.shipping + $scope.totalPrice;
    };
    
    $scope.$watch('totalPrice', function(newValue, oldValue) {
      if (newValue !== oldValue) {
        $scope.calculateTotal();
        sessionStorage.setItem('total', $scope.total.toString());
      }
    });
    // validate
    $scope.nameError = false;
    $scope.emailError = false;
    $scope.messageError = false;

    $scope.submitForm = function() {
        // Kiểm tra các trường input và hiển thị thông báo lỗi nếu cần
        if (!$scope.name || $scope.name.trim() === '') {
            $scope.nameError = true;
        }
        if (!$scope.email || $scope.email.trim() === '') {
            $scope.emailError = true;
        }
        if (!$scope.message || $scope.message.trim() === '') {
            $scope.messageError = true;
        }

        // Nếu có lỗi, ngăn chặn việc submit
        if ($scope.nameError || $scope.emailError || $scope.messageError) {
            return;
        }

  
    };
    // reivew
   
    $scope.nameError1 = false;

    $scope.messageError1 = false;

    $scope.submitForm1 = function() {
        // Kiểm tra các trường input và hiển thị thông báo lỗi nếu cần
        if (!$scope.username || $scope.username.trim() === '') {
            $scope.nameError1 = true;
        }
        if (!$scope.message1 || $scope.message1.trim() === '') {
            $scope.messageError1 = true;
        }

        // Nếu có lỗi, ngăn chặn việc submit
        if ($scope.nameError1 || $scope.messageError1) {
            return;
        }

    };


});
  
  
  