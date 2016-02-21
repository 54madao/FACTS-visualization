////////////////////////////////////////////////////////////////////////init////////////////////////////////////////////////////////////////////////




////////////////////////////////////////////////////////////////////////load data////////////////////////////////////////////////////////////////////////
function loadFiles(url){
	var res;	
	$.ajax({
	    type: 'GET',
	    url: url,
	    contentType: 'application/json',
	    beforeSend: function (request) {
	        request.setRequestHeader('JsonStub-User-Key', 'db3469d5-0f9f-4a58-bac5-c343433fa8a4');
	        request.setRequestHeader('JsonStub-Project-Key', '29fa3925-9a60-40bb-bd4c-fd509dd582d0');
	    },
	    async: false
	}).done(function (data) {
		$('#version1').text(data.version1);
		$('#version2').text(data.version2);
    	scale_max = data.maxChangedNumber;
    	scale_min = data.minChangedNumber;
    	$('#left_tab').css({
    		'max-width': (function(){return window.innerWidth / 5})
    	});
    	$('#right_tab').css({
	        'width': (function(){return window.innerWidth / 6}),
	        'max-width': (function(){return window.innerWidth / 6})
	    });
    	$('#changes').css({
    			'max-height': (function(){return window.innerHeight - 100}),
    			'width': (function(){return window.innerWidth / 5})
    	}).jstree({
    		'core': {
    			'data': (function () {
    				var results = [];
    				for(var i = 0; i < data.codeChangedPackagesList.length; i++){
    					var tmp = data.codeChangedPackagesList[i].packageName;
 				    	var packageName = tmp.replace(/\\/g, ".").substr(1, tmp.length - 2);
 				    	results.push({
 				    		id: i + '', 
 				    		text: packageName,
 				    		children: (function(i){
 				    			var results = [];
 				    			for(var j = 0; j < data.codeChangedPackagesList[i].codeChangedFileList.length; j++){
 				    				results.push({
 				    					id: i + '_' + j,
 				    					text: data.codeChangedPackagesList[i].codeChangedFileList[j].codePathName.match(/[^\\/]+\.[^\\/]+$/)[0],
 				    					icon: 'jstree-file'
 				    				});
 				    			}
 				    			return results;
 				    		})(i)	
 				    	});
    				}
    				return results;
    			})()
    		}
    	}).bind("dblclick.jstree", function (e, data) {
            var node = $(event.target).closest("li");
            console.log(node.attr('id'));
            console.log(building_objects[node.attr('id')]);
            if(building_objects[node.attr('id')] != null)
                moveUsingMatrix(building_objects[node.attr('id')], 100, 150);
        });; 
	    res = data;
	}).fail(function() {
        console.log("fail");
        return null;
    })
	return res;
}

function loadLinks(url){

}

function loadDocs(url){
	var res;
	$.ajax({
	    type: 'GET',
	    url: 'http://jsonstub.com/FACTS/docChangeSample',
	    contentType: 'application/json',
	    beforeSend: function (request) {
	        request.setRequestHeader('JsonStub-User-Key', 'db3469d5-0f9f-4a58-bac5-c343433fa8a4');
	        request.setRequestHeader('JsonStub-Project-Key', '29fa3925-9a60-40bb-bd4c-fd509dd582d0');
	    },
	    async: false
	}).done(function (data) {
    	var container = $('#doc_list');
    	$("#docs").css({
    		'max-height': (function(){return window.innerHeight - 100}),
    		'width': (function(){return window.innerWidth / 5})
    	});
    	$('#collapse_list').css({
    		'max-height': (function(){return window.innerHeight - 100}),
    		'width': (function(){return window.innerWidth / 6})
    	});
    	for (var i = 0; i < data.length; i++) {
    		container.append(
    			$('<div>').addClass("panel panel-default").append(
    				$('<div>').attr({class: "panel-heading", role: "tab", id: "heading"+i}).append(
    					$('<h4>').addClass("panel-title").append(
    						$('<a>').attr({
    							role: "button",
    							'data-toggle': "collapse",
    							//'data-parent': "#doc_list",
    							href: "#collapse"+i,
    							'aria-expanded': "false",
    							'aria-controls': "collapse"+i
    						}).text(data[i].key)
    					)
    				),
    				$('<div>').attr({
    					id: "collapse"+i,
    					class: "panel-collapse collapse",
    					role: "tabpanel",
    					'aria-labelledby': "heading"+i
    				}).append(
    					$('<div>').addClass("panel-body").append('<p>').html(
                            data[i].summary + "<br/><br/>" +
                            "#" + data[i].number + "<br/><br/>" +
                            "Committed By " + data[i].committer + "<br/>" +
                            "Committed on " + data[i].date + "<br/><br/>"+
                            "Created By " + data[i].author
                            )
    				)
    			)
    		);
    	};
    	

    	res = data;
	});
	return res;
}

function loadVersions(){
    var res;

    $.ajax({
        type: 'GET',
        url: 'http://jsonstub.com/FACTS/codeVersions',
        contentType: 'application/json',
        beforeSend: function (request) {
            request.setRequestHeader('JsonStub-User-Key', 'db3469d5-0f9f-4a58-bac5-c343433fa8a4');
            request.setRequestHeader('JsonStub-Project-Key', '29fa3925-9a60-40bb-bd4c-fd509dd582d0');
        },
        async: false
    }).done(function (data) {
        var options = [];
        for(var i = 0; i < data.length; i++){
          options.push(data[i].versionNum);
        }
    
        
        $("#circles-slider").slider({
            min: 0,
            max: data.length - 1,
            values: [ 0, 0 ],
            step: 1,
            slide: function( event, ui ) {

                event.stopImmediatePropagation();
            },
            stop: function( event, ui ) {

                event.stopImmediatePropagation();

                console.log(options[ui.values[ 0 ]] + " | " + options[ui.values[ 1 ]]);
                var url = 'http://jsonstub.com/FACTS/codeChangeSample-' + options[ui.values[ 0 ]] + '-' + options[ui.values[ 1 ]];
                fileData = loadFiles(url);

                sceneClear();
                if(fileData != null){
                    sceneInit();
                }

            }
        }).slider("pips", {
            rest: "label",
            labels: options
        })                 
        .slider("float", {
            labels: options
        });



        res = data;
    });

    return res;
}
////////////////////////////////////////////////////////////////////////draw////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////listener////////////////////////////////////////////////////////////////////////
