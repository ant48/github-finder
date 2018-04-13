//when document is ready and finished loading, proceed the function below
$(document).ready(function() {
  $('#searchUser').keyup(function(evt) {
    let username = evt.target.value;

    //make request to github for user
    $.ajax({
      url: 'https://api.github.com/users/' + username,
      data: {
        client_id: '503b1103ea1bb5009e03',
        client_secret: '1559f60c020f54450c2501ccebceccb83c324a63'
      }
    }).done(function(user) { //callback function
      //request for repos
      $.ajax({
        url: 'https://api.github.com/users/' + username + '/repos',
        data: {
          client_id: '503b1103ea1bb5009e03',
          client_secret: '1559f60c020f54450c2501ccebceccb83c324a63',
          sort: 'created_at asc', //sort repos by latest created date
          per_page: 4 //display only 4 repos
        }
      }).done(function(repos) {
        //loop and display each repo
        $.each(repos, function(index, repo) {
          $('#repos').append(`
            <div class="card border-secondary mb-3 rounded">
              <div class="row repo">
                <div class="col-sm-4 col-md-5 align-self-center">
                  <span class="text-primary font-weight-bold ">${repo.name}</span>
                </div>
                <div class="col-sm-5 col-md-5 align-self-center">
                  <span class="badge badge-primary">Language: ${repo.language}</span>
                  <span class="badge badge-info">Visited: ${repo.watchers_count}</span>
                  <span class="badge badge-secondary">Size: ${repo.size}</span>
                </div>
                <div class="col-sm-3 col-md-2 align-self-center">
                  <a href="${repo.html_url}" target="_blank" class="btn btn-success btn-sm">View repo</a>
                </div>
              </div>
            </div>
          `);
        });
      });

      //display user's info
      $('#profile').html(`
        <div class="card border-primary">
          <div class="card-header text-primary display-4 text-center">${user.name}</div>
          <div class="card-body">
              <div class="row">
                <div class="col-sm-4">
                  <img class="card-img mb-2" src="${user.avatar_url}" alt="user's avatar">
                  <a href="${user.html_url}" class="card-link btn btn-primary btn-block" target="_blank">View profile</a>
                </div>
                <div class="col-sm-8">
                  <span class="badge badge-primary">Username: ${user.login}</span>
                  <span class="badge badge-info">Public repositories: ${user.public_repos}</span>
                  <span class="badge badge-secondary">Public Gists: ${user.public_gists}</span>
                  <ul class="list-group list-group-flush mt-2">
                    <li class="list-group-item">Email: ${user.email}</li>
                    <li class="list-group-item">Website: ${user.blog}</li>
                    <li class="list-group-item">Followers: ${user.followers}</li>
                    <li class="list-group-item">Following: ${user.following}</li>
                    <li class="list-group-item">Member since: ${user.created_at}</li>
                  </ul>
                </div>
              </div>
          </div>
        </div>
        <br>
        <div class="card border-primary">
          <h4 class="card-title text-success mt-2 display-5 text-center">Latest repositories</h4>
          <div id="repos" class="card-body"></div>
        </div>
      `);
    });
  })
});
