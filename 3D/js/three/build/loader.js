function loadFiles(url){
	$.ajax({
    type: 'GET',
    url: 'http://jsonstub.com/project7/getUser',
    contentType: 'application/json',
    beforeSend: function (request) {
        request.setRequestHeader('JsonStub-User-Key', 'db3469d5-0f9f-4a58-bac5-c343433fa8a4');
        request.setRequestHeader('JsonStub-Project-Key', '29fa3925-9a60-40bb-bd4c-fd509dd582d0');
    }
	}).done(function (data) {
    	console.log(JSON.stringify(data, null, 4));
	});
}

function loadLinks(url){

}

function loadDocs(url){

}