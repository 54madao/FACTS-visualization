////////////////////////////////////////////////////////////////////////init////////////////////////////////////////////////////////////////////////




////////////////////////////////////////////////////////////////////////load data////////////////////////////////////////////////////////////////////////
function loadFiles(url){
    var res;
    //url = 'http://jsonstub.com/FACTS/codeChangeSample-2.1.0-2.1.10';
    //url = 'http://jsonstub.com/FACTS/codeChangeSample1-2.1.10-2.1.11';    
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
        //console.log(JSON.stringify(data, null, 4));
        //alert(data);
        //console.log(data.codeChangedPackagesList[0].packageName.replace(/\\/g, ".").substr(1, data.codeChangedPackagesList[0].packageName.length - 2));
        // for(var i = 0; i < data.codeChangedPackagesList.length; i++){
     //        var tmp = data.codeChangedPackagesList[i].packageName;
     //        var packageName = tmp.replace(/\\/g, ".").substr(1, tmp.length - 2);
        //  $('#left_list').append(
        //      $('<li>').append(
        //          $('<div>').append($('<span>').text(packageName),
        //              (function(data){
        //                  //console.log(data[0]);
        //                  var list = $('<ul>');
        //                  for(var j = 0; j < data.length; j++){
        //                      //.appendTo(list);
        //                      list.append($('<li>').append(data[j].codePathName.match(/[^\\/]+\.[^\\/]+$/)[0]));
        //                  }
        //                  return list;
        //              })(data.codeChangedPackagesList[i].codeChangedFileList)             
        //          )
        //      )
        //  );
        // }
        //alert(JSON.stringify(data, null, 4));
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
            //var data = node.data("id");
            // Do some action
            console.log(node.attr('id'));
            console.log(building_objects[node.attr('id')]);
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

            //event.preventDefault();
            event.stopImmediatePropagation();
            //event.stopPropagation();
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
                //showRelatedDocs(true);
                // showRelation(SELECTED);
                showRelatedCode(false);
            }
            else{
                // showRelatedDocs(false);
                // $("a[href='#collapse_list']").text("Related Defects");
                // if(SELECTED){
                //     SELECTED.material.emissive.setHex(SELECTED.currentHex);
                // }
                // SELECTED = null;
            }
        }); 


        res = data;
        //alert(JSON.stringify(res, null, 4));
    }).fail(function() {
        console.log("fail");
        return null;
    })
    //alert(JSON.stringify(res, null, 4));
    return res;
}

function loadLinks(url){

}

function loadDocs(url){
    var res;
    $.ajax({
        type: 'GET',
        //url: 'http://jsonstub.com/FACTS/docChangeSample-2.1.0-2.1.10',
        url: url,
        contentType: 'application/json',
        beforeSend: function (request) {
            request.setRequestHeader('JsonStub-User-Key', 'db3469d5-0f9f-4a58-bac5-c343433fa8a4');
            request.setRequestHeader('JsonStub-Project-Key', '29fa3925-9a60-40bb-bd4c-fd509dd582d0');
        },
        async: false
    }).done(function (data) {
        //console.log(JSON.stringify(data, null, 4));
        //console.log(data.length);
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
                        //showRelatedCode(true);
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
        // $( "#slider-range" ).slider({
        //     range: true,
        //     min: 0,
        //     max: data.length,
        //     values: [ 0, 0 ],
        //     step: 1,
        //     slide: function( event, ui ) {
        //         //$( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
        //         event.stopImmediatePropagation();
        //     }
        // });
        // // .each(function(){
        // //     console.log("len:" + data.length);
        // //     for(var i = 0; i < data.length; i++){
        // //         // Create a new element and position it with percentages
        // //         var el = $('<label>' + data[i].versionNum + '</label>').css({
        // //             'left': (i/data.length*100) + '%',
        // //             'fontSize': "12px"
        // //         });

        // //         // Add the element inside #slider
        // //         $("#slider-range").append(el);
        // //     }
        // // });
        var options = [];
        for(var i = 0; i < data.length; i++){
          options.push(data[i].versionNum);
        }
        // var width = $( "#slider-range" ).width() / (data.length - 1);

        // //after the slider create a containing div with p tags of a set width.
        // $( "#slider-range" ).after('<div class="ui-slider-legend"><p style="width:' + width + 'px;display:inline-block;">' + options.join('</p><p style="width:' + width + 'px;display:inline-block">') +'</p></div>');
        
        $("#circles-slider").slider({
            min: 0,
            max: data.length - 1,
            values: [ 0, 0 ],
            step: 1,
            slide: function( event, ui ) {
                //$( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
                event.stopImmediatePropagation();
            },
            stop: function( event, ui ) {
                sceneClear();
                //$( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
                event.stopImmediatePropagation();
                //console.log("$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ])
                console.log(options[ui.values[ 0 ]] + " | " + options[ui.values[ 1 ]]);
                var url = 'http://jsonstub.com/FACTS/codeChangeSample-' + options[ui.values[ 0 ]] + '-' + options[ui.values[ 1 ]];
                fileData = loadFiles(url);
                url = 'http://jsonstub.com/FACTS/docChangeSample-' + options[ui.values[ 0 ]] + '-' + options[ui.values[ 1 ]];
                docData = loadDocs(url);
                // if(fileData == null)
                //     console.log(fileData);
                
                if(fileData != null){
                    sceneInit();
                }
                //console.log(fileData);
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
////////////////////////////////////////////////////////////////////////draw////////////////////////////////////////////////////////////////////////
//draw
// function createBase(data){
//     //alert(JSON.stringify(data, null, 4));
//     var size, step;
//     var numRows = Math.ceil(Math.sqrt(data.codeChangedPackagesList.length));
//     size = (numRows * 100 + numRows * 50) / 2;
//     //console.log("size: " + size);
//     step = size / 10;

//     var base_geometry = new THREE.Geometry();
//     for ( var i = - size; i <= size; i += step ) {
//         base_geometry.vertices.push( new THREE.Vector3( - size, 0, i ) );
//         base_geometry.vertices.push( new THREE.Vector3(   size, 0, i ) );
//         base_geometry.vertices.push( new THREE.Vector3( i, 0, - size ) );
//         base_geometry.vertices.push( new THREE.Vector3( i, 0,   size ) );

//     }
//     var base_material = new THREE.LineBasicMaterial( { color: 0x000000, opacity: 0.2, transparent: true } );
//     var base_line = new THREE.LineSegments( base_geometry, base_material );
//     scene.add( base_line );
// }

// function createCity(data){
//     // Blocks
//     var positions = [];
//     var size;
//     var numRows = Math.ceil(Math.sqrt(data.codeChangedPackagesList.length));
//     size = (numRows * 100 + numRows * 50) / 2;
//     //console.log("size: " + size);
//     for ( var i = 0, nextX = -size, nextZ = -size; i < data.codeChangedPackagesList.length; i ++ ) {
//         var group = new THREE.Group();

//         var num = data.codeChangedPackagesList[i].codeChangedFileList.length;
//         var block_length = Math.ceil(Math.sqrt(num)) * 2 * 10;
//         var block_width = Math.ceil(Math.sqrt(num)) * 2 * 10;
//         var block_height = 0;
//         var block = new THREE.BoxGeometry( block_length, block_height, block_width );
//         var block_material = new THREE.MeshLambertMaterial( { color: 0xffffff, overdraw: 0.5 } );

//         var block_cube = new THREE.Mesh( block, block_material  );

//         block_cube.position.x = block_length / 2 + nextX;
//         block_cube.position.y = block_height / 2;
//         block_cube.position.z = block_width / 2 + nextZ;

//         scene.add( group );
//         group.add( block_cube );
//         positions.push(block_cube.position);
        
//         // //Text
//         // var textGeo = new THREE.TextGeometry( text + " " +i, {

//         //     size: font_size,
//         //     height: font_height,
//         //     curveSegments: curveSegments,

//         //     font: font,
//         //     weight: weight,
//         //     style: style,

//         //     bevelThickness: bevelThickness,
//         //     bevelSize: bevelSize,
//         //     bevelEnabled: bevelEnabled,

//         //     material: 0,
//         //     extrudeMaterial: 1

//         // });
//         // //textGeo.computeBoundingBox();
//         // //textGeo.computeVertexNormals();
//         // material = new THREE.MeshFaceMaterial( [
//         //     new THREE.MeshPhongMaterial( { color: 0x00ff00, shading: THREE.FlatShading } ), // front
//         //     new THREE.MeshPhongMaterial( { color: 0x00ff00, shading: THREE.SmoothShading } ) // side
//         // ] );
//         // var textMesh = new THREE.Mesh( textGeo, material );

//         // textMesh.position.x = nextX;
//         // textMesh.position.y = font_height / 2;
//         // textMesh.position.z = block_width + nextZ + font_size;
//         // textMesh.rotation.x = - Math.PI / 2;
//         // textMesh.rotation.y = 0;
//         // group.add(textMesh);


//         //console.log(i + ": " + nextX + ", " + nextZ);
//         if(nextX + block_length + 150 > size){
//             nextX = -size;
//             nextZ += 70 + block_width;
//         }
//         else{
//             nextX += 50 + block_length;
//         }

//         // var num = Math.floor( Math.random() * 4) + 2;
//         var x = block_cube.position.x - block_length / 2;
//         var z = block_cube.position.z - block_width / 2;
//         // Building
//         for (var j = 0; j < num; j++) {

//             //console.log(j + ": " + x + ", " + z + ", " + block_length);
//             //var build_length = Math.floor( block_length / 5 );
//             //var build_width = Math.floor( block_width / 5 );
//             //var build_height = Math.floor( Math.random() * 100 + 3);
//             var build_height = data.codeChangedPackagesList[i].codeChangedFileList[j].changedNumberLinesCode;
//             build_height = (build_height - scale_min) / (scale_max - scale_min) * scale_size;
//             //scale_max = Math.max(scale_max, build_height);
//             //scale_min = Math.min(scale_min, build_height);
//             var build = new THREE.BoxGeometry( 10, build_height, 10);
//             var build_material = new THREE.MeshLambertMaterial( { color: 0xff0000, overdraw: 0.5 } );
//             var build_cube = new THREE.Mesh( build, build_material  );

//             build_cube.position.x = 10 / 2 + x;
//             build_cube.position.y = build_height / 2 + block_height;
//             build_cube.position.z = 10 / 2 + z;
//             scene.add( build_cube );
//             building_objects[i + "_" + j] = build_cube;

//             if(x + 10 + 20 > block_cube.position.x + block_length / 2){
//                 x = block_cube.position.x - block_length / 2;
//                 z += 10 + 10;
//             }
//             else{
//                 x += 10 + 10;
//             }

//         };

//     }
//     //console.log(scale_max);
//     //console.log(scale_min);
//     //group.position.y = 100;

//     //scene.add( group );

//     // // line
//     // for (var i = 0; i < 20; i++) {
//     //     console.log("line");
//     //     var line_material = new THREE.LineBasicMaterial({
//     //         color: 0x0000ff
//     //     });
//     //     var line_geometry = new THREE.Geometry();
//     //     var start = Math.floor( Math.random() * data.length);
//     //     var end = Math.floor( Math.random() * data.length);
//     //     while(end == start){
//     //         end = Math.floor( Math.random() * data.length);
//     //     }
//     //     line_geometry.vertices.push(positions[start]);
//     //     line_geometry.vertices.push(positions[end]);
//     //     //line.geometry.vertices.push(new THREE.Vector3(-500, 20, 100));
//     //     var line = new THREE.Line(line_geometry, line_material);
//     //     scene.add(line);
//     // };
// }

function sceneInit(){
    // create camera
    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 10000 );
    //camera.position.y = 1000;
    //camera.lookAt( new THREE.Vector3() );
    cameraPos0 = camera.position.clone();
    cameraUp0 = camera.up.clone();
    // create scene and add globle light
    // scene = new THREE.Scene();
    // scene.add( new THREE.AmbientLight( 0x505050 ) );

    // css3dscene = new THREE.Scene();

    // // create specific light
    // var light = new THREE.SpotLight( 0xffffff, 1.5 );
    // light.position.set( 0, 500, 2000 );
    // light.castShadow = true;
    // light.shadowCameraNear = 200;
    // light.shadowCameraFar = camera.far;
    // light.shadowCameraFov = 50;
    // light.shadowBias = -0.00022;
    // light.shadowMapWidth = 2048;
    // light.shadowMapHeight = 2048;
    // scene.add( light );




    globle_postionts = calculatePositions(fileData);
    createLabels(globle_postionts[0], globle_postionts[3][0].offset);
    createBlocks(globle_postionts[1], globle_postionts[3][0].offset);
    createBuildings(globle_postionts[2], globle_postionts[3][0].offset);
    cameraHeight = createBase(globle_postionts[3]) * 2 / 14 * 14;
    camera.position.y = cameraHeight;
    
    for(var key in label_objects){
        css3dscene.add(label_objects[key]);
    }

    var target = new THREE.Vector3(0, 0, 0);
    //camera.lookAt(0,0,0);
    //controls.target.set(0,0,0);
    //css3drenderer.render( css3dscene, camera);
    //renderer.render( scene, camera );
     // create view control
    controls = new THREE.OrbitControls(this.camera);
    controls.target.set (0,0,0);
    controls.maxDistance = cameraHeight;
}

function sceneClear(){
    block_objects.forEach(function(object){
        //console.log(object);
        scene.remove(object);
    });
    for(var key in sprite_objects){
        css3dscene.remove(sprite_objects[key]);
    }
    for(var key in building_objects){
        scene.remove(building_objects[key]);
    }
    for(var key in label_objects){
        css3dscene.remove(label_objects[key]);
    }
    if(linkCodeObj!=null){
        css3dscene.remove( linkCodeObj );
    }
    if(linkDocObj!=null){
        css3dscene.remove( linkDocObj );
    }
    scene.remove(base_object);

    block_objects = [];
    building_objects = [];
    label_objects = [];
    sprite_objects = [];
    linkCodeObj = null;
    linkDocObj = null;
    
    $('#relatedDocs_list').empty();
    $('#doc_list').empty();
    $('#changes').jstree('destroy');
    $('#version1').empty();
    $('#version2').empty();
    $("a[href='#collapse_list']").text("Related Defects");

     
    showDetail = false;
}

function createVerticalSlider(){
    $( "#slider-vertical" ).slider({
      orientation: "vertical",
    });
}


function paintPoint(position){
    var particleMaterialBlue = new THREE.SpriteMaterial( {
        color: 0x0000FF,
    } );
    var particle = new THREE.Sprite( particleMaterialBlue );

    var scale = 500;
    var rayDir = new THREE.Vector3(position.x*scale,position.y*scale,position.z*scale);
    var rayVector = new THREE.Vector3(camera.position.x + rayDir.x, camera.position.y + rayDir.y, camera.position.z + rayDir.z);

    particle.position.copy(rayVector) ;
    particle.scale.x = particle.scale.y = 16;
    scene.add( particle );
}

// function calculatePositions(data){
//     var block_positions = [];
//     var building_postitions = [];
//     var base_position = [];
//     var numColsBlocks = Math.floor(Math.sqrt(data.codeChangedPackagesList.length)) + 2;
//     var block_position_x = 0;
//     var block_position_z = 0;
//     var maxRowlength = 0;
//     var maxWidth = 0;
//     var maxlength = 0;

//     for(var i = 0; i < data.codeChangedPackagesList.length; i++){

//         var numbuildings = data.codeChangedPackagesList[i].codeChangedFileList.length;
//         var numColsBuildings = Math.ceil(Math.sqrt(numbuildings));

//         var rows = Math.ceil(numbuildings / numColsBuildings);
//         var width = numColsBuildings * building_scale + (numColsBuildings + 1) * building_border * 2;
//         var length = width + text_scale;
//         block_positions.push({
//             width: width, 
//             length: length, 
//             x: block_position_x + width / 2, 
//             z: block_position_z + length / 2
//         });
//         maxRowlength = Math.max(maxRowlength, length);
//         if(i + 1 == data.codeChangedPackagesList.length){
//             maxWidth = Math.max(maxWidth, block_position_x + width);
//             maxlength = block_position_z + maxRowlength;
//             var base_width = maxWidth + block_border * 4;
//             var base_length = maxlength + block_border * 4;
//             var base_size = base_width > base_length ? base_width : base_length ;
//             base_position.push({
//                 size: base_size,
//                 offset: base_size / 2 - block_border * 2
//             });
//         }

//         var building_start_x = block_position_x + building_border * 2 + building_scale / 2;
//         var building_start_z = block_position_z + building_border * 2 + building_scale / 2;

//         var building_postition_x = building_start_x;
//         var building_postition_z = building_start_z;

//         for(var j = 0; j < numbuildings; j++){
            
//             var build_height = data.codeChangedPackagesList[i].codeChangedFileList[j].changedNumberLinesCode;
//             build_height = (build_height - scale_min) / (scale_max - scale_min) * scale_size;


//             building_postitions.push({
//                 x: building_postition_x, 
//                 z: building_postition_z,
//                 height: build_height,
//                 originalHeight: data.codeChangedPackagesList[i].codeChangedFileList[j].changedNumberLinesCode,
//                 id: i + "_" + j,
//                 name: data.codeChangedPackagesList[i].codeChangedFileList[j].codePathName.match(/[^\\/]+\.[^\\/]+$/)[0]
//             });
            
//             if( (j + 1) % numColsBuildings == 0){
//                 building_postition_z += building_scale + building_border * 2;
//                 building_postition_x = building_start_x;
//             }
//             else{
//                 building_postition_x += building_scale + building_border * 2;
//             }
//         }

//         if((i + 1) % numColsBlocks == 0){
//             block_position_z += maxRowlength + block_border * 2;
//             maxWidth = Math.max(maxWidth, block_position_x + width);
//             block_position_x = 0;
//             maxRowlength = 0;
//         }
//         else{
//             block_position_x += width + block_border * 2;
//         }
//     }
//     return [block_positions, building_postitions, base_position];
// }
function calculatePositions(data){
    var label_positions = [];
    var block_positions = [];
    var building_postitions = [];
    var base_position = [];
    var numColsBlocks = Math.ceil(Math.sqrt(data.codeChangedPackagesList.length));
    var block_position_x = 0;
    var block_position_z = 0;
    var maxRowlength = 0;
    var maxWidth = 0;
    var maxlength = 0;
    var maxLabelWidth = 0;

    for(var i = 0; i < data.codeChangedPackagesList.length; i++){
        var numbuildings = data.codeChangedPackagesList[i].codeChangedFileList.length;
        var numColsBuildings = Math.ceil(Math.sqrt(numbuildings));
        var width = numColsBuildings * building_scale + (numColsBuildings + 1) * building_border * 2;
        maxLabelWidth = Math.max(maxLabelWidth, width);
    }
    console.log("maxLabelWidth: " + maxLabelWidth);


    for(var i = 0, label_x = maxLabelWidth / 2, label_z = (maxLabelWidth + text_scale) / 2; i < data.codeChangedPackagesList.length; i++){

        

        var numbuildings = data.codeChangedPackagesList[i].codeChangedFileList.length;
        var numColsBuildings = Math.ceil(Math.sqrt(numbuildings));

        //var rows = Math.ceil(numbuildings / numColsBuildings);
        var width = numColsBuildings * building_scale + (numColsBuildings + 1) * building_border * 2;
        var length = width + text_scale;
        


        var building_start_x = label_x - width / 2 + building_border * 2 + building_scale / 2;
        var building_start_z = label_z - length / 2 + building_border * 2 + building_scale / 2;

        var building_postition_x = building_start_x;
        var building_postition_z = building_start_z;

        var sum = 0;
        for(var j = 0; j < numbuildings; j++){
            
            var build_height = data.codeChangedPackagesList[i].codeChangedFileList[j].changedNumberLinesCode;
            sum += build_height;
            build_height = (build_height - scale_min) / (scale_max - scale_min) * scale_size;

            var methods = [];
            if(data.codeChangedPackagesList[i].codeChangedFileList[j].hasOwnProperty('AddedMethods')){
                methods.push({
                    id: i + '_' + j + '_A',
                    text: 'AddedMethods',
                    children: (function(i, j){
                        var results = [];
                        for(var k = 0; k < data.codeChangedPackagesList[i].codeChangedFileList[j].AddedMethods.length; k++){
                            results.push({
                                id: i + '_' + j + '_A' + k,
                                text: data.codeChangedPackagesList[i].codeChangedFileList[j].AddedMethods[k].methodName
                            });
                        }
                        return results;
                    })(i, j)
                });
            }
            if(data.codeChangedPackagesList[i].codeChangedFileList[j].hasOwnProperty('DeletedMethods')){
                methods.push({
                    id: i + '_' + j + '_D',
                    text: 'DeletedMethods',
                    children: (function(i, j){
                        var results = [];
                        for(var k = 0; k < data.codeChangedPackagesList[i].codeChangedFileList[j].DeletedMethods.length; k++){
                            results.push({
                                id: i + '_' + j + '_D' + k,
                                text: data.codeChangedPackagesList[i].codeChangedFileList[j].DeletedMethods[k].methodName
                            });
                        }
                        return results;
                    })(i, j)
                });
            }
            if(data.codeChangedPackagesList[i].codeChangedFileList[j].hasOwnProperty('ModifiedMethods')){
                methods.push({
                    id: i + '_' + j + '_M',
                    text: 'ModifiedMethods',
                    children: (function(i, j){
                        var results = [];
                        for(var k = 0; k < data.codeChangedPackagesList[i].codeChangedFileList[j].ModifiedMethods.length; k++){
                            results.push({
                                id: i + '_' + j + '_M' + k,
                                text: data.codeChangedPackagesList[i].codeChangedFileList[j].ModifiedMethods[k].methodName
                            });
                        }
                        return results;
                    })(i, j)
                });
            }


            building_postitions.push({
                x: building_postition_x, 
                z: building_postition_z,
                height: build_height,
                originalHeight: data.codeChangedPackagesList[i].codeChangedFileList[j].changedNumberLinesCode,
                id: i + "_" + j,
                name: data.codeChangedPackagesList[i].codeChangedFileList[j].codePathName.match(/[^\\/]+\.[^\\/]+$/)[0],
                methods: methods
            });
            
            if( (j + 1) % numColsBuildings == 0){
                building_postition_z += building_scale + building_border * 2;
                building_postition_x = building_start_x;
            }
            else{
                building_postition_x += building_scale + building_border * 2;
            }
        }
        label_positions.push({
            width: maxLabelWidth,
            length: maxLabelWidth + text_scale,
            x: label_x,
            z: label_z,
            id: i,
            total: sum
        });

        block_positions.push({
            id: i,
            width: width, 
            length: length, 
            x: label_x, 
            z: label_z
        });
        // if((i + 1) % numColsBlocks == 0){
        //     block_position_z += maxRowlength + block_border * 2;
        //     maxWidth = Math.max(maxWidth, block_position_x + width);
        //     block_position_x = 0;
        //     maxRowlength = 0;
        // }
        // else{
        //     block_position_x += width + block_border * 2;
        // }

        if( (i + 1) % numColsBlocks == 0 ){
            label_x = maxLabelWidth / 2;
            label_z += maxLabelWidth + text_scale + label_border * 2;
        }else{
            label_x += maxLabelWidth + label_border * 2;
        }
    }


    var base_width = numColsBlocks * maxLabelWidth + (numColsBlocks + 1) * label_border * 2;
    var rows = Math.ceil(data.codeChangedPackagesList.length / numColsBlocks);
    var base_length = rows * (maxLabelWidth + text_scale) + (rows + 1) * label_border * 2;
    var base_size = base_width > base_length ? base_width : base_length;
    base_position.push({
        size: base_size,
        offset: base_size / 2 - label_border * 2
    });

    return [label_positions, block_positions, building_postitions, base_position];
}

function createLabels(positions, offset){
    //console.log(positions.length);
    //console.log(offset);
    var group = new THREE.Group();
    for(var i = 0; i < positions.length; i++){


        var green = 0, red = 255;
        if(positions[i].total < 100){
            red = Math.round(positions[i].total / 100 * 255);
            green = 255;
        }else if(positions[i].total < 500){
            green = Math.round(255 - (positions[i].total - 100) / 500 * 255);
        }

        //console.log("p: " + positions[i].total + ', r: '+ red + ', g: ' + green);
        //Text
        var tmp = fileData.codeChangedPackagesList[i].packageName;
        tmp = tmp.replace(/\\/g, ".").substr(1, tmp.length - 2);
        var last = tmp.lastIndexOf('.');
        var packageName = tmp.substr(last + 1, tmp.length - 1);

        var element = document.createElement( 'div' );
        element.id = i;
        element.className = 'labels';
        element.style.backgroundColor = 'rgba(' + red + ',' + green + ',0,0.5)';
        //element.style.backgroundBlendMode = 'normal';
        //element.style.backgroundColor = 'rgba(0,100.10,0,0.5)';
        element.style.width = positions[i].width + 'px';
        element.style.height = positions[i].length + 'px';
        element.style.boxShadow = '0px 0px 12px rgba(0,255,255,0.5)';
        element.style.border= '1px solid rgba(127,255,255,0.25)';
        element.style.textAlign = "center";

        var content = document.createElement( 'div' );
        content.textContent = packageName;
        content.style.position = 'absolute';
        content.style.top = positions[i].width / 2 - fontSize + 'px';
        //content.style.verticalAlign = 'middle';
        content.style.left = '0px';
        content.style.right = '0px';
        content.style.fontSize = fontSize + 'px';
        content.style.fontWeight = 'bold';
        content.style.color = 'rgba(0,0,0,0.75)';
        content.style.textShadow = '0 0 10px rgba(0,255,255,0.95)';
        content.style.wordWrap = "break-word";
        // content.style.overflow = 'hidden';
        // content.style.textOverflow = "ellipsis";
        // content.style.whiteSpace = "nowrap";
        element.appendChild( content );

        var object = new THREE.CSS3DObject( element );
        object.position.x = positions[i].x - offset;
        object.position.y = 0;
        object.position.z = positions[i].z - offset;
        object.rotation.x = - Math.PI / 2;
        //css3dscene.add( object );
        label_objects[positions[i].id] = object;
    }
}

function createBlocks(positions,offset){
    //console.log(positions.length);
    //console.log(offset);
    var group = new THREE.Group();
    for(var i = 0; i < positions.length; i++){
        var block_length = positions[i].length;
        var block_width = positions[i].width;
        var block_height = 0;
        var block = new THREE.BoxGeometry( block_width, block_height, block_length );
        var block_material = new THREE.MeshLambertMaterial( { color: 0xffffff, overdraw: 0.5 } );

        var block_cube = new THREE.Mesh( block, block_material  );

        block_cube.position.x = positions[i].x - offset;
        block_cube.position.y = block_height / 2;
        block_cube.position.z = positions[i].z - offset;

        //scene.add( group );
        group.add( block_cube );


        //Text
        var tmp = fileData.codeChangedPackagesList[i].packageName;
        tmp = tmp.replace(/\\/g, ".").substr(1, tmp.length - 2);
        var last = tmp.lastIndexOf('.');
        var packageName = tmp.substr(last + 1, tmp.length - 1);


        // var element = document.createElement( 'div' );
        // element.id = i;
        // element.className = 'labels';
        // element.style.backgroundColor = 'rgba(0,127,127,0.5)';
        // //element.style.backgroundBlendMode = 'normal';
        // //element.style.backgroundColor = 'rgba(0,100.10,0,0.5)';
        // element.style.width = positions[i].width + 'px';
        // element.style.height = text_scale + 'px';
        // element.style.boxShadow = '0px 0px 12px rgba(0,255,255,0.5)';
        // element.style.border= '1px solid rgba(127,255,255,0.25)';
        // element.style.textAlign = "center";
        // //element.style.zIndex = 0;

        // var content = document.createElement( 'div' );
        // content.textContent = packageName;
        // content.style.position = 'absolute';
        // //content.style.top = positions[i].width / 2 - fontSize + 'px';
        // //content.style.verticalAlign = 'middle';
        // content.style.left = '0px';
        // content.style.right = '0px';
        // content.style.fontSize = 12 + 'px';
        // content.style.fontWeight = 'bold';
        // content.style.color = 'rgba(0,0,0,0.75)';
        // content.style.textShadow = '0 0 10px rgba(0,255,255,0.95)';
        // content.style.wordWrap = "break-word";
        // element.appendChild( content );

        // var object = new THREE.CSS3DSprite( element );
        // object.position.x =  block_cube.position.x;
        // object.position.y = 0;
        // object.position.z = block_cube.position.z + block_width / 2 + text_scale / 2;
        // //object.rotation.x = - Math.PI / 2;
        // //css3dscene.add( object );
        // sprite_objects[positions[i].id] = object;

        var spritey = makeTextSprite( packageName, 
        { fontsize: 24, borderColor: {r:255, g:0, b:0, a:1.0}, backgroundColor: {r:255, g:100, b:100, a:0.8} } );
        // spritey.position.x = block_cube.position.x;
        // spritey.position.y = 0;
        // spritey.position.z = block_cube.position.z + block_width / 2;
        spritey.position.set( block_cube.position.x - block_width / 2 + 50, 0, block_cube.position.z + block_width / 2 + text_scale / 2);
        //console.log("x: " + block_cube.position.x);
        //console.log("spritey.x: " + spritey.position.x);
        group.add( spritey );

        block_objects.push(group);

                // var text = packageName,
             // font_height = 2,
        //     font_size = 10,
        //     curveSegments = 4,
        //     bevelThickness = 2,
        //     bevelSize = 1.5,
        //     bevelSegments = 3,
        //     bevelEnabled = true,
        //     font = "helvetiker", // helvetiker, optimer, gentilis, droid sans, droid serif
        //     weight = "bold", // normal bold
        //     style = "normal"; // normal italic

        // var textGeo = new THREE.TextGeometry( text, {

        //     size: font_size,
        //     height: font_height,
        //     curveSegments: curveSegments,

        //     font: font,
        //     weight: weight,
        //     style: style,

        //     material: 0,
        //     extrudeMaterial: 1

        // });
        // //textGeo.computeBoundingBox();
        // //textGeo.computeVertexNormals();
        // var material = new THREE.MeshLambertMaterial( { color: 0xffff00, overdraw: 0.5 } );
        // var textMesh = new THREE.Mesh( textGeo, material );

        // textMesh.position.x = block_cube.position.x - block_width / 2;
        // textMesh.position.y = font_height / 2;
        // textMesh.position.z = block_cube.position.z + block_width / 2;
        // textMesh.rotation.x = - Math.PI / 2;
        // textMesh.rotation.y = 0;
        // group.add(textMesh);
    }
}

function createBuildings(positions,offset){
    //console.log(positions.length);
    for(var i = 0; i < positions.length; i++){
        //console.log(positions[i]);       
        var build = new THREE.BoxGeometry( building_scale, positions[i].height, building_scale);
        var build_material = new THREE.MeshLambertMaterial( { color: 0xff0000, overdraw: 0.5, transparent: true, opacity: 1 } );
        var build_cube = new THREE.Mesh( build, build_material  );

        build_cube.position.x = positions[i].x - offset;
        build_cube.position.y = positions[i].height / 2;
        build_cube.position.z = positions[i].z - offset;
        build_cube.name = positions[i].id + "#" + positions[i].name + " (" + positions[i].originalHeight +" LOC)";
        //scene.add( build_cube );
        building_objects[positions[i].id] = build_cube;


        //var start_y = 0;
        var element_height = 30;
        var methods = [];
        var container = document.createElement( 'div' );
        container.className = 'methods';


        var element = document.createElement( 'div' );
        element.style.backgroundColor = 'rgba(200,200,200,1)';
        //element.style.backgroundBlendMode = 'normal';
        //element.style.backgroundColor = 'rgba(0,100.10,0,0.5)';
        element.style.width = '150px';
        element.style.height = element_height + 'px';
        element.style.boxShadow = '0px 0px 12px rgba(0,255,255,0.5)';
        element.style.border= '1px solid rgba(127,255,255,0.25)';
        element.style.textAlign = "center";
        element.style.overflow = 'hidden';
        element.style.textOverflow = "ellipsis";
        element.style.whiteSpace = "nowrap";


        var content = document.createElement( 'div' );
        content.textContent = positions[i].name + " (" + positions[i].originalHeight +" LOC)";
        content.style.position = 'absolute';
        //content.style.top = positions[i].width / 2 - fontSize + 'px';
        //content.style.verticalAlign = 'middle';
        content.style.left = '0px';
        content.style.right = '0px';
        content.style.fontSize = 20 + 'px';
        content.style.fontWeight = 'bold';
        content.style.color = 'rgba(0,0,0,0.75)';
        content.style.textShadow = '0 0 10px rgba(0,255,255,0.95)';
        content.style.overflow = 'hidden';
        content.style.textOverflow = "ellipsis";
        content.style.whiteSpace = "nowrap";
        //content.style.wordWrap = "break-word";
        //content.style.textOverflow = 'ellipsis';
        element.appendChild( content );

        container.appendChild(element);

        for(var item of positions[i].methods){
            for(var method of item.children){
                var element = document.createElement( 'div' );
                element.id = 'R_' + method.id;
                
                
                if(item.text == 'AddedMethods'){
                    element.style.backgroundColor = 'rgba(0,255,0,0.5)';
                    element.className = 'AddedMethods';
                }
                if(item.text == 'DeletedMethods'){
                    element.style.backgroundColor = 'rgba(255,0,0,0.5)';
                    element.className = 'DeletedMethods';
                }
                if(item.text == 'ModifiedMethods'){
                    element.style.backgroundColor = 'rgba(255,255,0,0.5)';
                    element.className = 'ModifiedMethods';
                }
                //element.style.backgroundBlendMode = 'normal';
                //element.style.backgroundColor = 'rgba(0,100.10,0,0.5)';
                element.style.width = '150px';
                element.style.height = element_height + 'px';
                element.style.boxShadow = '0px 0px 12px rgba(0,255,255,0.5)';
                element.style.border= '1px solid rgba(127,255,255,0.25)';
                element.style.textAlign = "center";


                var content = document.createElement( 'div' );
                content.textContent = method.text;
                content.style.position = 'absolute';
                //content.style.top = positions[i].width / 2 - fontSize + 'px';
                //content.style.verticalAlign = 'middle';
                content.style.left = '0px';
                content.style.right = '0px';
                content.style.fontSize = 20 + 'px';
                content.style.fontWeight = 'bold';
                content.style.color = 'rgba(0,0,0,0.75)';
                content.style.textShadow = '0 0 10px rgba(0,255,255,0.95)';
                content.style.overflow = 'hidden';
                content.style.textOverflow = "ellipsis";
                content.style.whiteSpace = "nowrap";
                //content.style.wordWrap = "break-word";
                //content.style.textOverflow = "clip";
                element.appendChild( content );

                container.appendChild(element);

                // var object = new THREE.CSS3DSprite( element );
                // object.position.x = build_cube.position.x - 400;
                // object.position.y = start_y;
                // object.position.z = build_cube.position.z;
                // //object.rotation.x = - Math.PI / 2;
                // start_y += element_height;
                // //css3dscene.add( object );
                // methods.push(object);
                
            }
        }
        var object = new THREE.CSS3DSprite( container );
        object.position.x = build_cube.position.x - 150;
        object.position.y = build_cube.position.y;
        object.position.z = build_cube.position.z;
        method_objects[positions[i].id] = object;
    }
}

function createBase(position){
    //alert(JSON.stringify(data, null, 4));
    var size, step;
    // var numRows = Math.ceil(Math.sqrt(data.codeChangedPackagesList.length));
    // size = (numRows * 100 + numRows * 50) / 2;
    // //console.log("size: " + size);
    // step = size / 10;
    // var a = position[0].a;
    // var b = position[0].b;
    // var c = position[0].c;
    // var d = position[0].d;
    //step = block_border * 2;
    step = label_border * 2;
    size = Math.ceil(position[0].size / step) * step / 2;
    console.log("size: " + size);
   

    var base_geometry = new THREE.Geometry();
    for ( var i = - size; i <= size;  i += step) {
        base_geometry.vertices.push( new THREE.Vector3( - size , 0, i ) );
        base_geometry.vertices.push( new THREE.Vector3(   size, 0, i ) );
        base_geometry.vertices.push( new THREE.Vector3( i, 0, - size ) );
        base_geometry.vertices.push( new THREE.Vector3( i, 0,   size ) );
        
        // if(i > size){
        //     base_geometry.vertices.push( new THREE.Vector3( - block_border * 2, 0, size ) );
        //     base_geometry.vertices.push( new THREE.Vector3(   size, 0, size ) );
        //     base_geometry.vertices.push( new THREE.Vector3( size, 0, - block_border * 2 ) );
        //     base_geometry.vertices.push( new THREE.Vector3( size, 0,   size ) );
        //     break;
        // }

    }
    var base_material = new THREE.LineBasicMaterial( { color: 0x000000, opacity: 0.2, transparent: true } );
    var base_line = new THREE.LineSegments( base_geometry, base_material );
    var group = new THREE.Group();
    scene.add( group );
    group.add( base_line );
    //scene.add( base_line );
    base_object = group;
    return size;
}

function makeTextSprite( message, parameters )
{
    if ( parameters === undefined ) parameters = {};
    
    var fontface = parameters.hasOwnProperty("fontface") ? 
        parameters["fontface"] : "Arial";
    
    var fontsize = parameters.hasOwnProperty("fontsize") ? 
        parameters["fontsize"] : 18;
    
    var borderThickness = parameters.hasOwnProperty("borderThickness") ? 
        parameters["borderThickness"] : 4;
    
    var borderColor = parameters.hasOwnProperty("borderColor") ?
        parameters["borderColor"] : { r:0, g:0, b:0, a:1.0 };
    
    var backgroundColor = parameters.hasOwnProperty("backgroundColor") ?
        parameters["backgroundColor"] : { r:255, g:255, b:255, a:1.0 };

    //var spriteAlignment = THREE.SpriteAlignment.topLeft;
        
    var canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 128;
    var context = canvas.getContext('2d');
    context.font = "Bold " + fontsize + "px " + fontface;
    
    // get size data (height depends only on font size)
    var metrics = context.measureText( message );
    var textWidth = metrics.width;
    //console.log("width: " + textWidth);
    
    // background color
    context.fillStyle   = "rgba(" + backgroundColor.r + "," + backgroundColor.g + ","
                                  + backgroundColor.b + "," + backgroundColor.a + ")";
    // border color
    context.strokeStyle = "rgba(" + borderColor.r + "," + borderColor.g + ","
                                  + borderColor.b + "," + borderColor.a + ")";

    context.lineWidth = borderThickness;
    roundRect(context, borderThickness/2, borderThickness/2, textWidth + borderThickness, fontsize * 1.4 + borderThickness, 6);
    // 1.4 is extra height factor for text below baseline: g,j,p,q.
    
    // text color
    context.fillStyle = "rgba(0, 0, 0, 1.0)";

    context.fillText( message, borderThickness, fontsize + borderThickness);
    
    // canvas contents will be used for a texture
    var texture = new THREE.Texture(canvas) 
    texture.needsUpdate = true;

    var spriteMaterial = new THREE.SpriteMaterial( 
        { map: texture} );
    var sprite = new THREE.Sprite( spriteMaterial );
    sprite.scale.set(100,50,1.0);
    //console.log("canvas width: " + canvas.width);
    //console.log("canvas height: " + canvas.height);
    return sprite;  
}

// function for drawing rounded rectangles
function roundRect(ctx, x, y, w, h, r) 
{
    ctx.beginPath();
    ctx.moveTo(x+r, y);
    ctx.lineTo(x+w-r, y);
    ctx.quadraticCurveTo(x+w, y, x+w, y+r);
    ctx.lineTo(x+w, y+h-r);
    ctx.quadraticCurveTo(x+w, y+h, x+w-r, y+h);
    ctx.lineTo(x+r, y+h);
    ctx.quadraticCurveTo(x, y+h, x, y+h-r);
    ctx.lineTo(x, y+r);
    ctx.quadraticCurveTo(x, y, x+r, y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();   
}

function createSlider(){
    $( "#slider-range" ).slider({
      range: true,
      min: 0,
      max: 500,
      values: [ 75, 300 ],
      slide: function( event, ui ) {
        //$( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
        event.stopImmediatePropagation();
      }
    });
}
////////////////////////////////////////////////////////////////////////listener////////////////////////////////////////////////////////////////////////

// listener
function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
    css3drenderer.setSize( window.innerWidth, window.innerHeight );
    $('#changes').css({
        'max-height': (function(){return window.innerHeight - 100}),
        'width': (function(){return window.innerWidth / 5})
    });
    $("#docs").css({
        'max-height': (function(){return window.innerHeight - 100}),
        'width': (function(){return window.innerWidth / 5})
    });
    $('#collapse_list').css({
        'max-height': (function(){return window.innerHeight - 100}),
        'width': (function(){return window.innerWidth / 6}),
        'max-width': (function(){return window.innerWidth / 6})
    });
    $('#left_tab').css({
        'max-width': (function(){return window.innerWidth / 5})
    });
    $('#right_tab').css({
        'width': (function(){return window.innerWidth / 6}),
        'max-width': (function(){return window.innerWidth / 6})
    });
}

function onDocumentMouseMove( event ) {

    event.preventDefault();

    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;


    // find intersections

    raycaster.setFromCamera( mouse, camera );

    var intersects = raycaster.intersectObjects( scene.children ), material;

    if (intersects.length > 0) {
        if (INTERSECTED != intersects[0].object) {
            if (INTERSECTED){
                material = INTERSECTED.material;
                if(material.emissive){
                    if(INTERSECTED != SELECTED){
                        material.emissive.setHex(INTERSECTED.currentHex);
                    }
                    else
                        material.emissive.setHex(onclick_color);
                    // scene.remove(rightline);
                    // scene.remove(leftline);
                }
            }   
            INTERSECTED = intersects[0].object;
            material = INTERSECTED.material;
            if(material.emissive){
                if(INTERSECTED != SELECTED){
                    INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
                }
                material.emissive.setHex(onhover_color);
                //material.opacity = 1;
                // // to right
                // var right_line_geometry = new THREE.Geometry();
                // right_line_geometry .vertices.push(INTERSECTED.position);
                // right_line_geometry .vertices.push(new THREE.Vector3(1000, Math.random() * 500, 0));
                // //line.geometry.vertices.push(new THREE.Vector3(-500, 20, 100));
                // rightline = new THREE.Line(right_line_geometry, direct_line_material);
                // scene.add(rightline);

                // // to left

                // var left_line_geometry = new THREE.Geometry();
                // left_line_geometry.vertices.push(INTERSECTED.position);
                // left_line_geometry.vertices.push(new THREE.Vector3(-1000, Math.random() * 500, 0));
                // //line.geometry.vertices.push(new THREE.Vector3(-500, 20, 100));
                // leftline = new THREE.Line(left_line_geometry, direct_line_material);
                // scene.add(leftline);
            }
            console.log("length: " + intersects.length);
            console.log(INTERSECTED.position);
        }

    } else {

        if (INTERSECTED){
            material = INTERSECTED.material;

            if(material.emissive){
                if(INTERSECTED != SELECTED){
                    material.emissive.setHex(INTERSECTED.currentHex);
                }
                else
                    material.emissive.setHex(onclick_color);
                // scene.remove(rightline);
                // scene.remove(leftline);
            }
        }

        INTERSECTED = null;

    }
}

function onDocumentClick( event ) {

    // event.preventDefault();
    // console.log("position: " + event.clientX + ", "+ event.clientY);
    // mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    // mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    // console.log("position: " + mouse.x + ", "+ mouse.y);
    // //raycaster.setFromCamera( mouse, camera );

    // var particleMaterialBlue = new THREE.SpriteMaterial( {
    //     color: 0x0000FF,
    // } );
    // var particle = new THREE.Sprite( particleMaterialBlue );

    // var tmp = new THREE.Vector3(mouse.x, mouse.y, 0.5);
    // tmp.unproject(camera);
    // console.log("position: " + tmp.x + ", "+ tmp.y + ", "+ tmp.z);
    // tmp.sub( camera.position );
    // console.log("position: " + tmp.x + ", "+ tmp.y + ", "+ tmp.z);
    // tmp.normalize();
    // console.log("position: " + tmp.x + ", "+ tmp.y + ", "+ tmp.z);
    // var scale = window.innerWidth*2;
    // var rayDir = new THREE.Vector3(tmp.x*scale,tmp.y*scale,tmp.z*scale);
    // var rayVector = new THREE.Vector3(camera.position.x + rayDir.x, camera.position.y + rayDir.y, camera.position.z + rayDir.z);

    // particle.position.copy(rayVector) ;
    // particle.scale.x = particle.scale.y = 16;
    // scene.add( particle );

    // add stoppropagate to jstree.js
    event.preventDefault();
    //event.stopPropagation();

    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    //showRelation();

    // find intersections

    raycaster.setFromCamera( mouse, camera );

    var intersects = raycaster.intersectObjects( scene.children ), material;

    if (intersects.length > 0) {
        if (SELECTED != intersects[0].object) {
            console.log("not the same");
            if (SELECTED){
                material = SELECTED.material;
                if(material.emissive){
                    material.emissive.setHex(SELECTED.currentHex);
                    //scene.remove(rightline);
                    //scene.remove(leftline);
                }
                if(linkCodeObj!=null){
                    css3dscene.remove( linkCodeObj );
                }
                if(linkDocObj!=null){
                    css3dscene.remove( linkDocObj );
                }
                linkCodeObj = null;
                linkDocObj = null;
            }   
            SELECTED = intersects[0].object;
            material = SELECTED.material;
            if(material.emissive){
                //if(SELECTED != INTERSECTED)
                //SELECTED.currentHex = SELECTED.material.emissive.getHex();
                material.emissive.setHex(onclick_color);
                $("a[href='#collapse_list']").text(SELECTED.name.split('#')[1]);
                $('#changes').jstree('close_all');
                $('#changes').jstree('open_node', SELECTED.name.split('#')[0].split('_')[0]);
                console.log(SELECTED.name.split('#')[0]);
                $('#changes').jstree('deselect_all');
                $('#changes').jstree('select_node', SELECTED.name.split('#')[0]);
                var uid = SELECTED.name.split('#')[0];
                console.log($('#changes').scrollTop());
                console.log($('#'+uid).position().top);
                var p1 = $('#'+uid).position().top;
                var p2 = $('#changes').scrollTop();
                var scrollValue = p1 > p2 ? p1 - p2 - 50 : p1 + p2 - 50;
                console.log(scrollValue);
                $('#changes').scrollTop(scrollValue);
                

                // method_objects[uid].forEach(function(object){
                //     css3dscene.add( object );
                // });
                //css3dscene.add( method_objects[uid] );
                //showRelatedDocs(true);
                showRelatedCode(false);
                // // to right
                // var right_line_geometry = new THREE.Geometry();
                // right_line_geometry .vertices.push(INTERSECTED.position);
                // right_line_geometry .vertices.push(new THREE.Vector3(1000, Math.random() * 500, 0));
                // //line.geometry.vertices.push(new THREE.Vector3(-500, 20, 100));
                // rightline = new THREE.Line(right_line_geometry, direct_line_material);
                // scene.add(rightline);

                // // to left

                // var left_line_geometry = new THREE.Geometry();
                // left_line_geometry.vertices.push(INTERSECTED.position);
                // left_line_geometry.vertices.push(new THREE.Vector3(-1000, Math.random() * 500, 0));
                // //line.geometry.vertices.push(new THREE.Vector3(-500, 20, 100));
                // leftline = new THREE.Line(left_line_geometry, direct_line_material);
                // scene.add(leftline);
            }
            console.log("length: " + intersects.length);
            console.log(SELECTED.position);
        }

    } else {
        // console.log("no object");
        // if (SELECTED){
        //     material = SELECTED.material;

        //     if(material.emissive){
        //         material.emissive.setHex(SELECTED.currentHex);
        //         // scene.remove(rightline);
        //         // scene.remove(leftline);
        //     }
        // }
        // showRelatedDocs(false);
        // $("a[href='#collapse_list']").text("Related Defects");
        // SELECTED = null;

    }

}

function showRelatedDocs(on){
    var container = $('#relatedDocs_list');
    container.empty();
    if(on){
        var num = Math.floor(Math.random() * 5) + 1;   
        for (var i = 0; i < num; i++) {
            var index = Math.floor(Math.random() * 6);
            container.append(
                $('<div>').addClass("panel panel-default").append(
                    $('<div>').attr({class: "panel-heading", role: "tab", id: "relatedheading"+index}).append(

                        $('<h4>').addClass("panel-title").append(

                            $('<a>').attr({
                                role: "button",
                                'data-toggle': "collapse",
                                //'data-parent': "#doc_list",
                                href: "#relatedcollapse"+index,
                                'aria-expanded': "false",
                                'aria-controls': "relatedcollapse"+index
                            }).text(docData[index].key)
                            // $('<a>').attr({href: "#", class: "pull-right"}).append(
                            //     $('<span>').addClass("glyphicon glyphicon-th-list")
                            // )
                            
                        )
                    ),
                    $('<div>').attr({
                        id: "relatedcollapse"+index,
                        class: "panel-collapse collapse",
                        role: "tabpanel",
                        'aria-labelledby': "relatedheading"+index
                    }).append(
                        $('<div>').addClass("panel-body").append('<p>').html(
                            docData[i].summary + "<br/><br/>" +
                            "#" + docData[i].number + "<br/><br/>" +
                            "Committed By " + docData[i].committer + "<br/>" +
                            "Committed on " + docData[i].date + "<br/><br/>"+
                            "Created By " + docData[i].author
                            )
                    )
                )
            );
        };
    }
    
}


function showRelatedCode(on){
    relatedObj.forEach(function(object){
        //console.log(object);
        object.material.emissive.setHex(object.currentHex);
    });
    relatedObj = [];
    if(on){
        var num = Math.floor(Math.random() * 10) + 1;
        for (var k = 0; k < num; ) {
            var i = Math.floor(Math.random() * 52);
            var j = Math.floor(Math.random() * 10);
            var id = i + '_' + j;
            if(building_objects[id] != null){
                relatedObj.push(building_objects[id]);
                k++;
            }
         }
        relatedObj.forEach(function(object){
            //console.log(object);
            object.currentHex = object.material.emissive.getHex();
            object.material.emissive.setHex(onlink_color);
        });
        if (SELECTED){
            material = SELECTED.material;
            if(material.emissive){
                material.emissive.setHex(SELECTED.currentHex);
                //scene.remove(rightline);
                //scene.remove(leftline);
            }
            SELECTED = null;
        }  
    }
}



$(document).on('click', "a[role='button']",function(event){
    //event.preventDefault();
    var tmp = event.target.tagName;
    //console.log(tmp);
});

// $('#collapse_list').on('shown.bs.collapse', function () {
//   // do something…
//     $('#collapse_list').css('height',function(){
//         if($(this).height() > window.innerHeight)
//             return window.innerHeight - 100;
//         else
//             return $(this).height();
//     });
// })


function onDocumentDblClick(event){
    event.preventDefault();

    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;


    // find intersections

    raycaster.setFromCamera( mouse, camera );
    //alert("Double!");
    var intersects = raycaster.intersectObjects( scene.children ), material;
    //console.log(intersects.length);
    if (intersects.length > 0){
        moveUsingMatrix(intersects[0].object, 200, 250);
        onZoomIn();
        var uid = intersects[0].object.name.split('#')[0];
        showRelation(building_objects[uid]);
        if(linkCodeObj!=null){
            css3dscene.remove( linkCodeObj );
        }
        linkCodeObj = method_objects[uid];
        css3dscene.add( linkCodeObj );
        //controls.update();

        // solution 2 using quaternion
        // //reset everything
        // var endQ = new THREE.Quaternion().copy(intersects[0].object.quaternion).normalize();
        // console.log(endQ);
        // var iniQ = new THREE.Quaternion().copy(camera.quaternion).normalize();
        // console.log(iniQ);
        // var curQ = new THREE.Quaternion();
        // var vec3 = new THREE.Vector3();
        // //var euler = new THREE.Euler();
        // //euler.setFromVector3(intersects[0].object.quaternion);
        // //endQ.setFromEuler(euler);
        // THREE.Quaternion.slerp(iniQ, endQ, curQ, 1);
        // console.log(curQ);

        // // apply new quaternion to camera position
        // vec3.x = cameraPos0.x;
        // vec3.y = cameraPos0.y;
        // vec3.z = cameraPos0.z;
        // console.log(vec3);
        // vec3.applyQuaternion(curQ.normalize());
        // console.log(vec3);
        // camera.position.copy(vec3);
        // console.log(camera.position);
        // //camera.lookAt( intersects[0].object.position );
        // // // apply new quaternion to camera up
        // // vec3 = cameraUp0.clone();
        // // vec3.applyQuaternion(curQ);
        // // camera.up.copy(vec3);
    }
    else{
        console.log("no object");
        if (SELECTED){
            material = SELECTED.material;

            if(material.emissive){
                material.emissive.setHex(SELECTED.currentHex);
                // scene.remove(rightline);
                // scene.remove(leftline);
            }
            if(linkCodeObj!=null){
                css3dscene.remove( linkCodeObj );
            }
            if(linkDocObj!=null){
                css3dscene.remove( linkDocObj );
            }
            linkCodeObj = null;
            linkDocObj = null;

        }
        showRelatedCode(false);
        //showRelatedDocs(false);
        //$("a[href='#collapse_list']").text("Related Defects");
        SELECTED = null;
    }
    // if (intersects.length > 0) {
    //     if (SELECTED != intersects[0].object) {
    //         console.log("not the same");
    //         if (SELECTED){
    //             material = SELECTED.material;
    //             if(material.emissive){
    //                 material.emissive.setHex(SELECTED.currentHex);
    //             }
    //         }   
    //         SELECTED = intersects[0].object;
    //         material = SELECTED.material;
    //         if(material.emissive){
    //             //if(SELECTED != INTERSECTED)
    //             //SELECTED.currentHex = SELECTED.material.emissive.getHex();
    //             material.emissive.setHex(onclick_color);
    //             $("a[href='#collapse_list']").text(SELECTED.name);
    //             showRelatedDocs(true);
    //         }
    //         console.log("length: " + intersects.length);
    //         console.log(SELECTED.position);
    //     }

    // } else {
    //     //console.log("no object");
    //     // if (SELECTED){
    //     //     material = SELECTED.material;

    //     //     if(material.emissive){
    //     //         material.emissive.setHex(SELECTED.currentHex);
    //     //         // scene.remove(rightline);
    //     //         // scene.remove(leftline);
    //     //     }
    //     // }

    //     // SELECTED = null;

    // }
}

function moveUsingMatrix(object, min, max){
    // solution 1 using matrix
    console.log("object: " + object.position.x + ", " + object.position.y + ", " + object.position.z);
    console.log("camera: " + camera.position.x + ", " + camera.position.y + ", " + camera.position.z);
    var x = (camera.position.x - object.position.x) / 3;
    var y = (camera.position.y - object.position.y) / 3;
    var z = (camera.position.z - object.position.z) / 3;
    x = Math.abs(x) < min ? x / Math.abs(x) * min : Math.abs(x) > max ? x / Math.abs(x) * max : x;
    y = Math.abs(y) < min ? y / Math.abs(y) * min : Math.abs(y) > max ? y / Math.abs(y) * max : y;
    z = Math.abs(z) < min ? z / Math.abs(z) * min : Math.abs(z) > max ? z / Math.abs(z) * max : z;
    x += object.position.x;
    y += object.position.y;
    z += object.position.z;
    console.log("target: " + x + ", " + y + ", " + z);  
    var start = new THREE.Vector3();
    start = camera.position.clone();
    var target = new THREE.Vector3(x, y, z);
    tween = new TWEEN.Tween(start).to(target, 1000).onUpdate(function(){
        camera.position.set(start.x, start.y, start.z);
        console.log("camera: " + camera.position.x + ", " + camera.position.y + ", " + camera.position.z);  
        camera.lookAt( object.position );
    }).start();
    
   // console.log("camera: " + camera.position.x + ", " + camera.position.y + ", " + camera.position.z);      
    //console.log("camera: " + camera.position.x + ", " + camera.position.y + ", " + camera.position.z);
    controls.target.set(object.position.x, object.position.y, object.position.z);
}

function showRelation(object){
    // var element = document.createElement( 'div' );
    // element.className = 'element';
    // element.style.backgroundColor = 'rgba(0,127,127,' + ( Math.random() * 0.5 + 0.25 ) + ')';

    // var number = document.createElement( 'div' );
    // number.className = 'number';
    // number.textContent = 1;
    // element.appendChild( number );

    // var symbol = document.createElement( 'div' );
    // symbol.className = 'symbol';
    // symbol.textContent = "TEST";
    // element.appendChild( symbol );

    // var details = document.createElement( 'div' );
    // details.className = 'details';
    // details.innerHTML = "TEST" + '<br>' + "TEST";
    // element.appendChild( details );

    // var object = new THREE.CSS3DSprite( element );
    // //var object = new THREE.CSS3DObject( element );
    // object.position.x = 0;
    // object.position.y = 0;
    // object.position.z = 0;
    // //object.rotation.x = - Math.PI / 2;
    // css3dscene.add( object );
    var container = document.createElement( 'div' );
    //container.style.maxHeight = (function(){return window.innerHeight - 100});
    //container.style.width = (function(){return window.innerWidth / 5})
    container.style.width = '150px';
    //container.style.height = '30px';
    container.style.borderStyle = 'groove';
    //container.style.overflow = 'hidden';

    var element = document.createElement( 'div' );
        element.style.height = '20px';
        element.style.backgroundColor = 'rgba(200,200,200,1)';
        element.style.boxShadow = '0px 0px 12px rgba(0,255,255,0.5)';
        element.style.border= '1px solid rgba(127,255,255,0.25)';
        element.style.textAlign = "center";
        element.style.overflow = 'hidden';
        element.style.textOverflow = "ellipsis";
        element.style.whiteSpace = "nowrap";
        //element.className = "panel panel-default";

        var content = document.createElement( 'div' );
        content.textContent = 'Defects';
        content.style.fontSize = 15 + 'px';
        content.style.fontWeight = 'bold';
        content.style.color = 'rgba(0,0,0,0.75)';
        content.style.textShadow = '0 0 10px rgba(0,255,255,0.95)';

        element.appendChild(content);
        container.appendChild(element);


    var num = Math.floor(Math.random() * 5) + 1;   
    for (var i = 0; i < num; i++) {

        var element = document.createElement( 'div' );
        element.style.height = '20px';
        element.style.backgroundColor = 'rgba(200,200,200,1)';
        element.style.boxShadow = '0px 0px 12px rgba(0,255,255,0.5)';
        element.style.border= '1px solid rgba(127,255,255,0.25)';
        element.style.textAlign = "center";
        element.style.overflow = 'hidden';
        element.style.textOverflow = "ellipsis";
        element.style.whiteSpace = "nowrap";
        //element.className = "panel panel-default";

        var index = Math.floor(Math.random() * 6);
        var content = document.createElement( 'a' );
        content.setAttribute('role', "button");
        content.href = "#collapse"+index;
        content.setAttribute('data-toggle', "collapse");
        content.setAttribute('aria-expanded', "false");
        content.setAttribute('aria-controls', "linkedcollapse"+index);
        content.setAttribute('data-parent',"#doc_list");
        content.textContent = docData[index].key;

        element.appendChild(content);
        container.appendChild(element);
    }
    // var container = $('<div>').css({
    //         'max-height': (function(){return window.innerHeight - 100}),
    //         'width': (function(){return window.innerWidth / 5}),
    //         "border-right-style": 'groove',
    //         "border-bottom-style": 'groove',
    //         'overflow': 'auto'
    //     });
    // var header = document.createElement( 'div' );
    // header.className = "nav nav-tabs nav-justified";
    // header.textContent = object.name.split('#')[1];
    // header.setAttribute('role', "tablist");
    // //header.style.position = 'absolute';
    // //header.style.fontSize = 12 + 'px';
    // //header.style.fontWeight = 'bold';
    // //header.style.color = 'rgba(0,0,0,0.75)';
    // //header.style.textShadow = '0 0 10px rgba(0,255,255,0.95)';
    // container.appendChild(header);

    // var list = document.createElement( 'div' );
    // list.className = "panel-group";
    // list.id = "accordion";
    // list.setAttribute('role', "tablist");
    // list.setAttribute('aria-multiselectable', 'true');
    // container.appendChild(list);

    // var num = Math.floor(Math.random() * 5) + 1;   
    // for (var i = 0; i < num; i++) {
    //     var index = Math.floor(Math.random() * 6);
        
    //     var l1 = document.createElement( 'div' );
    //     l1.className = "panel panel-default";
    //     list.appendChild(l1);

    //     var l21 = document.createElement( 'div' );
    //     l21.className = "panel-heading";
    //     l21.setAttribute('role', "tab");
    //     l21.id = "relatedheading"+index;
    //     l1.appendChild(l21);

    //     var l31 = document.createElement( 'h4' );
    //     l31.className = "panel-title";
    //     l21.appendChild(l31);

    //     var l41 = document.createElement( 'a' );
    //     l41.setAttribute('role', "button");
    //     l41.href = "#linkedcollapse"+index;
    //     l41.setAttribute('data-toggle', "collapse");
    //     l41.setAttribute('aria-expanded', "false");
    //     l41.setAttribute('aria-controls', "linkedcollapse"+index);
    //     l41.setAttribute('data-parent',"#accordion");
    //     l41.textContent = docData[index].key;
    //     l31.appendChild(l41);

    //     var l22 = document.createElement( 'div' );
    //     l22.className = "panel-collapse collapse";
    //     l22.setAttribute('role', "tabpanel");
    //     l22.id = "linkedcollapse"+index;
    //     l22.setAttribute('aria-labelledby', "relatedheading"+index);
    //     l1.appendChild(l22);

    //     var l32 = document.createElement( 'div' );
    //     l32.className = "panel-body";
    //     l32.innerHTML = '<p>' + 
    //                     docData[i].summary + "<br/><br/>" +
    //                     "#" + docData[i].number + "<br/><br/>" +
    //                     "Committed By " + docData[i].committer + "<br/>" +
    //                     "Committed on " + docData[i].date + "<br/><br/>"+
    //                     "Created By " + docData[i].author +
    //                     '</p>';
    //     l22.appendChild(l32);

    //     // list.append(
    //     //     $('<div>').addClass("panel panel-default").append(
    //     //         $('<div>').attr({class: "panel-heading", role: "tab", id: "relatedheading"+index}).append(

    //     //             $('<h4>').addClass("panel-title").append(

    //     //                 $('<a>').attr({
    //     //                     role: "button",
    //     //                     'data-toggle': "collapse",
    //     //                     //'data-parent': "#doc_list",
    //     //                     href: "#relatedcollapse"+index,
    //     //                     'aria-expanded': "false",
    //     //                     'aria-controls': "relatedcollapse"+index
    //     //                 }).text(docData[index].key)
    //     //                 // $('<a>').attr({href: "#", class: "pull-right"}).append(
    //     //                 //     $('<span>').addClass("glyphicon glyphicon-th-list")
    //     //                 // )
                        
    //     //             )
    //     //         ),
    //     //         $('<div>').attr({
    //     //             id: "relatedcollapse"+index,
    //     //             class: "panel-collapse collapse",
    //     //             role: "tabpanel",
    //     //             'aria-labelledby': "relatedheading"+index
    //     //         }).append(
    //     //             $('<div>').addClass("panel-body").append('<p>').html(
    //     //                 docData[i].summary + "<br/><br/>" +
    //     //                 "#" + docData[i].number + "<br/><br/>" +
    //     //                 "Committed By " + docData[i].committer + "<br/>" +
    //     //                 "Committed on " + docData[i].date + "<br/><br/>"+
    //     //                 "Created By " + docData[i].author
    //     //                 )
    //     //         )
    //     //     )
    //     // );
    // };
    // console.log(object.position.x+ ", " + object.position.y + ", " + object.position.z);
    if(linkDocObj != null){
        css3dscene.remove(linkDocObj);
    }
    linkDocObj = new THREE.CSS3DSprite( container );
    linkDocObj.position.x = object.position.x + 150;
    linkDocObj.position.y = object.position.y;
    linkDocObj.position.z = object.position.z;
    css3dscene.add( linkDocObj );
}

function onKeyDown( event ) {
    if(event.keyCode == 27){
        console.log("ESC");
        if (SELECTED){
            material = SELECTED.material;

            if(material.emissive){
                material.emissive.setHex(SELECTED.currentHex);
                // scene.remove(rightline);
                // scene.remove(leftline);
            }
            if(linkCodeObj!=null){
                css3dscene.remove( linkCodeObj );
            }
            if(linkDocObj!=null){
                css3dscene.remove( linkDocObj );
            }
            linkCodeObj = null;
            linkDocObj = null;
        }
        showRelatedCode(false);
        //showRelatedDocs(false);
        //$("a[href='#collapse_list']").text("Related Defects");
        SELECTED = null;
    }else if(event.keyCode == 57){
        onZoomIn();
    }else if(event.keyCode == 48){
        onZoomOut();
    }
}

// $('a[href="#changes"]').click(function(e){
//     e.preventDefault();
//     e.stopImmediatePropagation();
//     $(this).tab('show');
// })

// $('a[href="#docs"]').click(function(e){
//     e.preventDefault();
//     e.stopImmediatePropagation();
//     $(this).tab('show');
// })

$(document).on('click', 'a[data-toggle="tab"]',function(e){
    //e.preventDefault();
    e.stopImmediatePropagation();
    //var target = $(this).href;
    //console.log(target);
    //$('#collapse_list').collapse('toggle');
    //showRelatedDocs(true);
})

$(document).on('click', 'a[data-toggle="collapse"]',function(e){
    //e.preventDefault();
    e.stopImmediatePropagation();
    //var target = $(this).href;
    //console.log(target);
    //$('#collapse_list').collapse('toggle');
    //showRelatedDocs(true);
})

$(document).on('mousedown', '#circles-slider', function(e){
    //e.preventDefault();
    e.stopImmediatePropagation();
    //console.log(e.target.width());
    //var target = $(this).href;
    //console.log(target);
    //$('#collapse_list').collapse('toggle');
    //showRelatedDocs(true);
})

//e.stopImmediatePropagation();

$(document).on('click.jstree', '.jstree-ocl',function(e){
    //e.preventDefault();
    e.stopImmediatePropagation();
    //console.log("!!!!!!");
    //var target = $(this).href;
    //console.log(target);
    //$('#collapse_list').collapse('toggle');
    //showRelatedDocs(true);
});

$(document).on({
    click: function(e){
        //e.preventDefault();
        e.stopImmediatePropagation();
        //console.log("!!!!!!");
        //var target = $(this).href;
        //console.log(target);
        //$('#collapse_list').collapse('toggle');
        //showRelatedDocs(true);
    }, mousemove: function(e){
        //e.preventDefault();
        e.stopImmediatePropagation();
        //console.log("!!!!!!");
        //var target = $(this).href;
        //console.log(target);
        //$('#collapse_list').collapse('toggle');
        //showRelatedDocs(true);
    }, mousedown: function(e){
        //e.preventDefault();
        e.stopImmediatePropagation();
        //console.log("!!!!!!");
        //var target = $(this).href;
        //console.log(target);
        //$('#collapse_list').collapse('toggle');
        //showRelatedDocs(true);
    }, mousewheel: function(e){
        //e.preventDefault();
        e.stopImmediatePropagation();
        //console.log("!!!!!!");
        //var target = $(this).href;
        //console.log(target);
        //$('#collapse_list').collapse('toggle');
        //showRelatedDocs(true);
    }
}, '.jstree');

$(document).on('click', '.panel-body', function(e){
    e.stopImmediatePropagation();
})


$(document).on('dblclick', '.labels',function(e){
    //e.preventDefault();
    e.stopImmediatePropagation();
    console.log(e.target.id);
    moveUsingMatrix(label_objects[e.target.id], 100, 150);
    onZoomIn();
    $('#changes').jstree('open_node', e.target.id);
})

$(document).on('mouseenter', '[style*="text-overflow: ellipsis"]', function(e){
    e.stopImmediatePropagation();
    $(this).css({
        'text-overflow': 'inherit',
        'overflow': 'visible',
    });
});

$(document).on('mouseleave','[style*="text-overflow: inherit"]', function(e){
    $(this).css({
        'text-overflow': 'ellipsis',
        'overflow': 'hidden'
    });
});

function onMouseWheel( event ){
    //createBlocks(globle_postionts[1], globle_postionts[3][0].offset);
    //createBuildings(globle_postionts[2], globle_postionts[3][0].offset);
    //console.log("x:" + camera.position.x + ", y:" + camera.position.y + ", z" + camera.position.z);
    var delta = 0;

    if ( event.wheelDelta !== undefined ) {

        // WebKit / Opera / Explorer 9

        delta = event.wheelDelta;

    } else if ( event.detail !== undefined ) {

        // Firefox

        delta = - event.detail;

    }

    if ( delta > 0 ) {

        onZoomIn();
        console.log("ZoomIn");

    } else if ( delta < 0 ) {

        onZoomOut();
        console.log("ZoomOut");
    }

}

function onZoomIn(){
    
    if(camera.position.y > cameraHeight / 3 * 2){
        if(!showDetail){
            block_objects.forEach(function(object){
                //console.log(object);
                scene.add(object);
            });
            for(var key in sprite_objects){
                css3dscene.add(sprite_objects[key]);
            }
            for(var key in building_objects){
                scene.add(building_objects[key]);
            }
            for(var key in label_objects){
                css3dscene.remove(label_objects[key]);
            }
            if(linkCodeObj!=null){
                css3dscene.add( linkCodeObj );
            }
            if(linkDocObj!=null){
                css3dscene.add( linkDocObj );
            }
    
            showDetail = true;
        }else{
            camera.position.y = cameraHeight / 3 * 2;
            camera.lookAt(controls.target);
        }
    }else if(camera.position.y > cameraHeight / 3){
        camera.position.y = cameraHeight / 3;
        camera.lookAt(controls.target);
    }
}

function onZoomOut(){
    if(camera.position.y > cameraHeight / 3 * 2){       
        if(!showDetail){
            block_objects.forEach(function(object){
                //console.log(object);
                scene.remove(object);
            });
            for(var key in sprite_objects){
                css3dscene.remove(sprite_objects[key]);
            }
            for(var key in building_objects){
                scene.remove(building_objects[key]);
            }
            for(var key in label_objects){
                css3dscene.add(label_objects[key]);
            }
            if(linkCodeObj!=null){
                css3dscene.remove( linkCodeObj );
            }
            if(linkDocObj!=null){
                css3dscene.remove( linkDocObj );
            }           
        }else{
            camera.position.y = cameraHeight;
            camera.position.x = 0;
            camera.position.z = 0;
            controls.target.set (0,0,0);
            camera.lookAt(controls.target);
            showDetail = false;
        }      
    }else if(camera.position.y > cameraHeight / 3){
        camera.position.y = cameraHeight / 3 * 2;
        camera.lookAt(controls.target);
    }
}