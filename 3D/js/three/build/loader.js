function loadFiles(url){
	var res;	
	$.ajax({
	    type: 'GET',
	    url: 'http://jsonstub.com/FACTS/codeChangeSample1-2.1.10-2.1.11',
	    contentType: 'application/json',
	    beforeSend: function (request) {
	        request.setRequestHeader('JsonStub-User-Key', 'db3469d5-0f9f-4a58-bac5-c343433fa8a4');
	        request.setRequestHeader('JsonStub-Project-Key', '29fa3925-9a60-40bb-bd4c-fd509dd582d0');
	    },
	    async: false
	}).done(function (data) {
		$('#version1').text(data.srcPath1);
		$('#version2').text(data.srcPath2);
	    //console.log(JSON.stringify(data, null, 4));
	    //alert(data);
	    //console.log(data.codeChangedPackagesList[0].packageName.replace(/\\/g, ".").substr(1, data.codeChangedPackagesList[0].packageName.length - 2));
	    // for(var i = 0; i < data.codeChangedPackagesList.length; i++){
     //        var tmp = data.codeChangedPackagesList[i].packageName;
     //        var packageName = tmp.replace(/\\/g, ".").substr(1, tmp.length - 2);
	    // 	$('#left_list').append(
	    // 		$('<li>').append(
	    // 			$('<div>').append($('<span>').text(packageName),
	    // 				(function(data){
	    // 					//console.log(data[0]);
	    // 					var list = $('<ul>');
	    // 					for(var j = 0; j < data.length; j++){
	    // 						//.appendTo(list);
	    // 						list.append($('<li>').append(data[j].codePathName.match(/[^\\/]+\.[^\\/]+$/)[0]));
	    // 					}
	    // 					return list;
	    // 				})(data.codeChangedPackagesList[i].codeChangedFileList)				
	    // 			)
	    // 		)
	    // 	);
	    // }

    	//alert(JSON.stringify(data, null, 4));
    	$('#changes').jstree({
    		'core': {
    			'data': (function () {
    				var results = [];
    				for(var i = 0; i < data.codeChangedPackagesList.length; i++){
    					var tmp = data.codeChangedPackagesList[i].packageName;
 				    	var packageName = tmp.replace(/\\/g, ".").substr(1, tmp.length - 2);
 				    	results.push({
 				    		id: i, 
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
    	}); 


	    res = data;
	    //alert(JSON.stringify(res, null, 4));
	});
	//alert(JSON.stringify(res, null, 4));
	return res;
}

function loadLinks(url){

}

function loadDocs(url){

}