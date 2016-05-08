var apiKey  = 'gTiIJMS3lFxmCtlrX4bmYAcoHwBaClvr';
var userID  = 'alexjagim';

function setupPage(projectName)
{
	setupData();
	setupPageData(projectName);
}

function setupData()
{
	console.log("setting up data");
	var behanceUserAPI = 'http://www.behance.net/v2/users/'+ userID +'/projects?callback=?&api_key='+ apiKey;
	if(sessionStorage.getItem('behanceUser')) {
	} else {
	    $.getJSON(behanceUserAPI, function(user) {
	        var data = JSON.stringify(user);
	        sessionStorage.setItem('behanceUser', data);
	        var projects = user['projects'];
	        setupProjectData(projects);
	    });
	};
}

function setupProjectData(projects)
{
	for(var i = 0; i < projects.length; i++)
	{
		var projectId = projects[i].id;
		var behanceUserAPI = 'https://www.behance.net/v2/projects/' + projectId + '?callback=?&api_key=' + apiKey;
		 $.getJSON(behanceUserAPI, function(user) {
	        var project = user['project'];
	        data = JSON.stringify(project);
			sessionStorage.setItem(project.name, data);
		});
	}
}


function setupPageData(project)
{
	var projectData    = sessionStorage.getItem(project);
	console.log()
}