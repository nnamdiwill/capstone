// var Walmart = function() {
//     this.searchButton = $('button');
//     this.searchButton.click(this.onSearchClicked.bind(this));
//     this.searchForm = $('form');
//     this.searchForm.submit(this.onSearchSubmitted.bind(this));
//     this.searchBox = $('input');
//     //console.log(this.searchBox);
//     this.result = $('#result');
//     this.productTemplate = Handlebars.compile($("#product-template").html());
// };
// Walmart.prototype.onSearchClicked = function() {
//     var name = this.searchBox.val();
//     this.search(name);
//     this.result.toggleClass('transparent');
// };
// Walmart.prototype.onSearchSubmitted = function(event) {
//     event.preventDefault();
//     this.searchButton.trigger('click');
// };
// Walmart.prototype.search = function(name) {
//     var ajax = $.ajax('/search/' + name, {
//         type: 'GET',
//         dataType: 'json'
//     });
//     ajax.done(this.onSearchDone.bind(this));
// };
// Walmart.prototype.onSearchDone = function(product) {
//     var result = $(this.productTemplate(product));
//     console.log(result);
//     this.result.empty().append(result);
//     this.result.toggleClass('transparent');
// };




$(document).ready(function() {
    //var app = new Walmart();
    
    //alert("jQuery Working");


    $('form').submit(function(event) {
        event.preventDefault();
        var searchTerm = $('input').val();
        console.log('form submitted with value = ', searchTerm);
        
        var urlBuild = 'https://capstone-namwill.c9users.io/search/' + searchTerm;
        console.log('urlBuild = ', urlBuild);
        
        var result = $.ajax({
                /* update API end point */
                url: urlBuild,
                dataType: 'json',
                /*set the call type GET / POST*/
                type: 'GET'
            })
            /* if the call is successful (status 200 OK) show results */
            .done(function (result) {
                alert('here');
                /* if the results are meeningful, we can just console.log them */
                console.log(result);
               
            })
            /* if the call is NOT successful show errors */
            .fail(function (jqXHR, error, errorThrown) {
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
            });
        
        
        // $.ajax('/search/' + searchTerm, {
        //         type: 'GET',
        //         dataType: 'json'
        //     })
        //     .done(function(result) {
        //         console.log(result);
        //         if (result) {

        //         }
        //         else {
        //             //Search returned null, team doesn't exist - do something here TODO
        //         }
        //     })
        //     .fail(function(jqXHR, error) {
        //         console.log("Sorry, a database error occurred, try again later.");
        //     });
    });
});