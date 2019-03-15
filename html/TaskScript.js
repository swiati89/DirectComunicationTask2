
var items = [];
$(document).ready(function() {
    $.getJSON( "Code_Test_Data.txt", function( data ) {
        $.each( data, function( key, val ) {
            for(var i = 0; i<val.length; i++){
                items.push(val[i]);
                let item = items[i];
                $('#tableBody').append(prepareTableRow(item));
            }
        });
    });
});

function prepareTableRow(movieData) {
    prepareModal(movieData);

    return '<tr class="movieData">' +
            '<td><img class="img-responsive" alt="picture" style="max-height: 50px;" src='+ movieData.Poster+'> </td>' +
            '<td>'+movieData.Title+'</td>' +
            '<td>'+movieData.Year+'</td>' +
            '<td>'+movieData.Genre+' </td>' +
            '<td><button type="button" class="btn btn-info" data-toggle="modal" data-target='+ '#' + movieData.imdbID +'>Show more info</button></td>' +
            '</tr>';
}

function prepareModal(movie){
     $('<div class="modal fade" id='+ movie.imdbID +' tabindex="-1" role="dialog" aria-labelledby='+ movie.imdbID +' aria-hidden="true">\n' +
        '  <div class="modal-dialog modal-dialog-centered" role="document">\n' +
        '    <div class="modal-content">\n' +
        '      <div class="modal-header">\n' +
        '        <h5 class="modal-title" id='+ movie.imdbID +'title>'+movie.Title+'</h5>\n' +
        '        <button type="button" class="close" data-dismiss="modal" aria-label="Close">\n' +
        '          <span aria-hidden="true">&times;</span>\n' +
        '        </button>\n' +
        '      </div>\n' +
        '      <div class="modal-body">\n' +
                prepareMovieDetails(movie) +
        '      </div>\n' +
        '      <div class="modal-footer">\n' +
        '        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>\n' +
        '      </div>\n' +
        '    </div>\n' +
        '  </div>\n' +
        '</div>').appendTo(document.body);
}

function prepareMovieDetails(movie){

    return '<div class="container" style="margin-top:20px;">\n' +
        '    <div class="row">\n' +
        '        <div class="col">\n' +
        '            <div class="text-center">\n' +
        '                <img src='+movie.Poster+' class="img-fluid" alt="Responsive image">\n' +
        '            </div>\n' +
        '        </div>\n' +
        '        <div class="col">\n' +
        '            <div class="row">\n' +
        '                <div class="col">\n' +
        '                    <h6>Genre:</h6>\n' +
        '                </div>\n' +
        '                <div class="col">\n' +
        '                    <p>'+movie.Genre+'</p>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '            <div class="row">\n' +
        '                <div class="col">\n' +
        '                    <h6>Duration time:</h6>\n' +
        '                </div>\n' +
        '                <div class="col">\n' +
        '                    <p>'+movie.Runtime+'</p>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '            <div class="row">\n' +
        '                <div class="col">\n' +
        '                    <h6>Country:</h6>\n' +
        '                </div>\n' +
        '                <div class="col">\n' +
        '                    <p>'+movie.Country+'</p>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '            <div class="row">\n' +
        '                <div class="col">\n' +
        '                    <h6>Released:</h6>\n' +
        '                </div>\n' +
        '                <div class="col">\n' +
        '                    <p>'+movie.Released+'</p>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '            <div class="row">\n' +
        '                <div class="col">\n' +
        '                    <h6>Director:</h6>\n' +
        '                </div>\n' +
        '                <div class="col">\n' +
        '                    <p>'+movie.Director+'</p>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '    <div class="row" style="margin-top:20px;">\n' +
        '        <div class="col-12">\n' +
        '            <h6>Writer:</h6>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '    <div class="row">\n' +
        '        <div class="col-12">\n' +
        '            <p>'+movie.Writer+'</p>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '    <div class="row">\n' +
        '        <div class="col-12">\n' +
        '            <h6>Cast:</h6>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '    <div class="row">\n' +
        '        <div class="col-12">\n' +
        '            <p>'+movie.Actors+'</p>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '    <div class="row">\n' +
        '        <div class="col-12">\n' +
        '            <h6>Plot description:</h6>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '    <div class="row">\n' +
        '        <div class="col-12">\n' +
        '            <p>'+movie.Plot+'</p>\n' +
        '        </div>\n' +
        '    </div>\n' +
        '</div>'
}

function searchMovies(inputData) {
    let filteredList = [];
    let regex = new RegExp(inputData.toLowerCase());
    for (let i=0; i<items.length; i++){
        let writer = items[i].Writer.toLowerCase();
        let genre = items[i].Genre.toLowerCase();
        let country = items[i].Country.toLowerCase();


        if(regex.test(writer) && !filteredList.includes(items[i])){
            filteredList.push(items[i]);
        }
        if(regex.test(genre) && !filteredList.includes(items[i])){
            filteredList.push(items[i]);
        }
        if(regex.test(country) && !filteredList.includes(items[i])){
            filteredList.push(items[i]);
        }
    }

    return filteredList;
}

function redrawTable(){
    let input = document.getElementById('searchInput').value;
    $('#tableBody').empty();
    let filteredMovieList = searchMovies(input);

    for(let i = 0; i<filteredMovieList.length; i++){
        $('#tableBody').append(prepareTableRow(filteredMovieList[i]));
    }
}




