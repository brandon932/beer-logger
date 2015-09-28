app.controller("BeerController", function($scope, httpFactory){
  $scope.beer = {};
  getBeers = function(url){
    httpFactory.get(url)
    .then(function(response){
      $scope.beers = response.data;
    });
  };

  getBeers("/api/v1/beers");

  $scope.postBeer = function(){
    console.log("beer");
    var payload = $scope.beer;
    httpFactory.post('/api/v1/beers', payload)
    .then(function(response){
      $scope.beers.push(response.data);
      $scope.beer = {};
      $scope.success= true;
      $scope.message= "Added a new beer. Thanks!";
      $timeout(messageTimeout, 5000);
    });
  };

  $scope.deleteBeer = function(id){
    httpFactory.delete('/api/v1/beer/'+ id)
    .then(function(response){
      console.log(response.data);
      getBeers("/api/v1/beers");
    });
  };
  $scope.getBeer = function(id){
    console.log("get beer");
    httpFactory.get('/api/v1/beer/'+ id)
    .then(function(response){
      console.log(response.data);
      $scope.editBeer = response.data;
    });
    $scope.show = true;

  };

  $scope.updateBeer = function(id){
    console.log("edit beers");
    var payload = $scope.editBeer;
    httpFactory.put('/api/v1/beer/'+ id, payload)
    .then(function(response){
      $scope.editBeer = {};
      $scope.success= true;
      $scope.message= "Updated beer!";
      getBeers("/api/v1/beers");
    });
  };


});
