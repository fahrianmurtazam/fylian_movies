$('.searchBtn').click(function(){
    $.ajax({
        url:'http://www.omdbapi.com/?apikey=7518a6f5&s=' + $('.input-keyword').val(),
        success: results => {
            const movies = results.Search;
            let cards = '';
            movies.forEach(m => {
                cards += showCards(m);
            });
            $('.movie-container').html(cards);
            
            // ketika tombol detail di klik
            $('.modalBtn').click(function(){
                $.ajax({
                    url:'http://www.omdbapi.com/?apikey=7518a6f5&i=' + $(this).data('imdbid'),
                    success: mdl => {
                        const movieDetail = ShowMovieDetail(mdl)
                        $('.modal-body').html(movieDetail);
                    },
                    error: (e) => {
                        console.log(e.responseText);
                    }
                });
            });
        },
        error: (e) => {
            console.log(e.responseText);
        }
    });
})





function showCards(m){
    return `<div class="col-md-4 my-3">
                <div class="card">
                    <img src="${m.Poster}" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">${m.Title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
                        <a href="#" class="modalBtn btn btn-primary" data-bs-toggle="modal" data-bs-target="#movieDetail" data-imdbid="${m.imdbID}">Show Detail</a>
                    </div>
                </div>
            </div>`;
};


function ShowMovieDetail(mdl){
    return `<div class="container-fluid">
                <div class="row">
                    <div class="col-md-3">
                        <img src="${mdl.Poster}" class="img-fluid">
                    </div>
                    <div class="col-md">
                        <ul class="list-group">
                            <li class="list-group-item"><h4>${mdl.Title}, ${mdl.Year}</h4></li>
                            <li class="list-group-item"><strong>Genre : </strong>${mdl.Genre}</li>
                            <li class="list-group-item"><strong>Director : </strong>${mdl.Director}</li>
                            <li class="list-group-item"><strong>Actors : </strong>${mdl.Actors}</li>
                            <li class="list-group-item"><strong>Writer : </strong>${mdl.Writer}</li>
                            <li class="list-group-item"><strong>Plot : </strong> <br> ${mdl.Plot}</li>
                        </ul>
                    </div>
                </div>
            </div>`;
};