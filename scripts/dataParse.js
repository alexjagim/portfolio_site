var apiKey  = 'gTiIJMS3lFxmCtlrX4bmYAcoHwBaClvr';
var userID  = 'alexjagim';

function setupPage(projectName)
{
	setupData();
	setupPageData(projectName);
}

function setupData()
{
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
	var projectData = JSON.parse(sessionStorage.getItem(project));
	//Set up Project Cover Image
	var projectCoverImage = document.getElementById('project-cover-image');
	projectCoverImage.innerHTML = '<img src=' + projectData.covers['404'] + '>';

	//Set up Project Name
	var projectTitle = document.getElementById('project-name');
	projectTitle.innerHTML = projectData.name;
	var imageCount = 0;
	//Set up Modules
	var modules = projectData['modules'];
	for(var i = 0; i < modules.length; i++)
	{
		if(modules[i].type == 'text')
		{
			var descriptionText = document.getElementById('project-description');
			descriptionText.innerHTML += modules[i].text;
		} 
		else if (modules[i].type == 'video' || modules[i].type == 'embed')
		{
			var embededVideo = document.getElementById('project-embeded-content');
			embededVideo.innerHTML += modules[i].embed;
		} 
		else if (modules[i].type == 'image')
		{
			if(imageCount < 3)
			{
				var projectImage = document.getElementById('project-images');
				projectImage.innerHTML += '<img src=' + modules[i].src + '>';
				imageCount++;
			}
		}
		else 
		{
			console.log('new modules type: ' + modules[i].type);
		}
	}
}