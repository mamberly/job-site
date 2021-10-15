//var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var url = "https://jooble.org/api/";
var key = "ebdf2c90-5a03-4cf0-b0bc-fd296abf54fd";

document.getElementById("submitInput").addEventListener("click", function(event) {
	event.preventDefault();
	var params = {
		keywords: document.getElementById("keywordInput").value,
		location: document.getElementById("locationInput").value
	}
	var payload = {
	  headers: {
	    'Accept': 'application/json',
	    'Content-Type': 'application/json'
	  },
	  method: "POST",
	  body: JSON.stringify(params),
		mode: 'cors'
	}

	console.log(payload);

	fetch(url + key, payload, mode='no-cors')
	  .then(function(res) {
	    return res.json();
	  })
	  .catch(function(res) {
	    console.log("ERROR");
			console.log(res);
	  })
		.then(function(json) {
			var jobs = json.jobs;
			var allJobData = "<div class = \"item\"><h1>We found " + json.totalCount + " jobs for you!</h1></div>";
			allJobData += "<div class = \"item\">";
			for (let i = 0; i < jobs.length; i++) {
				let job = jobs[i];
				let jobData = "<div class = \"popup\" id = \"job" + i + "\">";
				jobData += "<h2>" + job.title + ", " + job.company + "</h2>";
				jobData += "<h3>" + job.location + "</h3>";
				if(job.salary != ''){
					jobData += "<h4>Salary: $" + job.salary + "</h4>";
				}
				if(job.type != ''){
					jobData += "<h4>" + job.type + "</h4>";
				}
				jobData += "<span class=\"popuptext\" id=\"jobpopup" + i + "\">";
				jobData += job.snippet.replace(/: \r\n/g, ': ').replace(/\r\n/g, '<br/>').replace("]]", '');
				jobData += "<a href = \"" + job.link + "\" target=\"_blank\">Click for more info</a>";
				jobData += "</span>";
				jobData += "</div>" //close jobDescription div
				allJobData += jobData;
			}
			allJobData += "</div>";
			document.getElementById("jobResults").innerHTML = allJobData;

			for (let i = 0; i < jobs.length; i++) {
				document.getElementById("job" + i).addEventListener("click", function(event) {
					var popup = document.getElementById("jobpopup" + i);
	  			popup.classList.toggle("show");
				});
			}
		});
	});
