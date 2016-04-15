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
        console.log("s1: " + data.codeChangedPackagesList.length);
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
 				    					icon: 'jstree-file',
                                        children: (function(i, j){
                                            var results = [];
                                            if(data.codeChangedPackagesList[i].codeChangedFileList[j].hasOwnProperty('AddedMethods')){
                                                results.push({
                                                    id: i + '_' + j + '_A',
                                                    text: 'AddedMethods',
                                                    icon: 'glyphicon-leaf',
                                                    children: (function(i, j){
                                                        var results = [];
                                                        for(var k = 0; k < data.codeChangedPackagesList[i].codeChangedFileList[j].AddedMethods.length; k++){
                                                            results.push({
                                                                id: i + '_' + j + '_A' + k,
                                                                text: data.codeChangedPackagesList[i].codeChangedFileList[j].AddedMethods[k].methodName,
                                                                icon: 'glyphicon-leaf'
                                                            });
                                                        }
                                                        return results;
                                                    })(i, j)
                                                });
                                            }
                                            if(data.codeChangedPackagesList[i].codeChangedFileList[j].hasOwnProperty('DeletedMethods')){
                                                results.push({
                                                    id: i + '_' + j + '_D',
                                                    text: 'DeletedMethods',
                                                    icon: 'glyphicon-leaf',
                                                    children: (function(i, j){
                                                        var results = [];
                                                        for(var k = 0; k < data.codeChangedPackagesList[i].codeChangedFileList[j].DeletedMethods.length; k++){
                                                            results.push({
                                                                id: i + '_' + j + '_D' + k,
                                                                text: data.codeChangedPackagesList[i].codeChangedFileList[j].DeletedMethods[k].methodName,
                                                                icon: 'glyphicon-leaf'
                                                            });
                                                        }
                                                        return results;
                                                    })(i, j)
                                                });
                                            }
                                            if(data.codeChangedPackagesList[i].codeChangedFileList[j].hasOwnProperty('ModifiedMethods')){
                                                results.push({
                                                    id: i + '_' + j + '_M',
                                                    text: 'ModifiedMethods',
                                                    icon: 'glyphicon-leaf',
                                                    children: (function(i, j){
                                                        var results = [];
                                                        for(var k = 0; k < data.codeChangedPackagesList[i].codeChangedFileList[j].ModifiedMethods.length; k++){
                                                            results.push({
                                                                id: i + '_' + j + '_M' + k,
                                                                text: data.codeChangedPackagesList[i].codeChangedFileList[j].ModifiedMethods[k].methodName,
                                                                icon: 'glyphicon-leaf'
                                                            });
                                                        }
                                                        return results;
                                                    })(i, j)
                                                });
                                            }
                                            return results;
                                        })(i, j)
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
            e.stopImmediatePropagation();
            var node = $(event.target).closest("li");
            if(building_objects[node.attr('id')] != null){
                moveUsingMatrix(building_objects[node.attr('id')], 200, 250);
                onZoomIn();
                showRelation(building_objects[node.attr('id')]);
                if(linkCodeObj!=null){
                    css3dscene.remove( linkCodeObj );
                }
                linkCodeObj = method_objects[node.attr('id')];
                css3dscene.add( linkCodeObj );
            }
        }).on('select_node.jstree', function(e, data){
            event.stopImmediatePropagation();
            console.log("click node");
            if(building_objects[data.selected] != null){
                $("a[href='#collapse_list']").text(building_objects[data.selected].name.split('#')[1]);
                if(SELECTED){
                    SELECTED.material.emissive.setHex(SELECTED.currentHex);
                    if(linkCodeObj!=null){
                        css3dscene.remove( linkCodeObj );
                    }
                    if(linkDocObj!=null){
                        css3dscene.remove( linkDocObj );
                    }
                    linkCodeObj = null;
                    linkDocObj = null;     
                }
                SELECTED = building_objects[data.selected];
                SELECTED.currentHex = SELECTED.material.emissive.getHex();
                SELECTED.material.emissive.setHex(onclick_color);
                showRelatedCode(false);
            }
        }); 


	    res = data;
	}).fail(function() {
        console.log("fail");
        return null;
    })
	return res;
}

function loadDocs(url){
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
    	var container = $('#doc_list');
    	$("#docs").css({
    		'max-height': (function(){return window.innerHeight - 100}),
    		'width': (function(){return window.innerWidth / 5})
    	});
    	$('#collapse_list').css({
    		'max-height': (function(){return window.innerHeight - 100}),
    		'width': (function(){return window.innerWidth / 6})
    	});

        console.log('s2: ' + data.length);
    	for (var i = 0; i < data.length; i++) {
    		container.append(
    			$('<div>').addClass("panel panel-default").append(
    				$('<div>').attr({class: "panel-heading", role: "tab", id: "heading"+i}).append(
    					$('<h4>').addClass("panel-title").append(
    						$('<a>').attr({
    							role: "button",
    							'data-toggle': "collapse",
    							'data-parent': "#doc_list",
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
    					$('<div>').addClass("panel-body").append(
                            $('<p>').html(
                                data[i].summary + "<br/><br/>" +
                                "#" + data[i].number + "<br/><br/>" +
                                "Committed By " + data[i].committer + "<br/>" +
                                "Committed on " + data[i].date + "<br/><br/>"+
                                "Created By " + data[i].author + "<br/><br/>" +
                                "<a href='" + data[i].link + "' target='_blank'>Link</a>" + "<br/>"
                            ).append(
                                $('<a>').attr({
                                    href: '#'
                                }).text("show related files").on('click', function(){
                                    showRelatedCode(true);
                                    if(linkCodeObj!=null){
                                        css3dscene.remove( linkCodeObj );
                                    }
                                    if(linkDocObj!=null){
                                        css3dscene.remove( linkDocObj );
                                    }
                                    linkCodeObj = null;
                                    linkDocObj = null;
                                })
                            )
                        )
    				).on('shown.bs.collapse', function(e){
                        e.stopImmediatePropagation();
                        $('#left_tab a[href="#docs"]').tab('show');

                    }).on('hidden.bs.collapse', function(e){
                        e.stopImmediatePropagation();
                        showRelatedCode(false);
                    })
    			)
    		);
    	};
    	

    	res = data;
	});
	return res;
}

function loadVersions(){
    var res;
    var url = 'http://jsonstub.com/FACTS/codeVersions';
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

        var options = [];
        for(var i = 0; i < data.length; i++){
          options.push(data[i].versionNum);
        }
     
        $("#circles-slider").slider({
            min: 0,
            max: data.length - 1,
            values: [ 0, 0],
            step: 1,
            slide: function( event, ui ) {
                event.stopImmediatePropagation();
            },
            change: function( event, ui ) {
                sceneClear();
                event.stopImmediatePropagation();
                console.log(options[ui.values[ 0 ]] + " | " + options[ui.values[ 1 ]]);
                var url = 'http://jsonstub.com/FACTS/codeChangeSample-' + options[ui.values[ 0 ]] + '-' + options[ui.values[ 1 ]];
                fileData = loadFiles(url);
                url = 'http://jsonstub.com/FACTS/docChangeSample-' + options[ui.values[ 0 ]] + '-' + options[ui.values[ 1 ]];
                docData = loadDocs(url);
                
                if(fileData != null){
                    sceneInit();
                }
            }
        }).slider("pips", {
            rest: "label",
            labels: options,
            step: 10,
        })                 
        .slider("float", {
            labels: options
        });

        res = data;
    });

    return res;
}