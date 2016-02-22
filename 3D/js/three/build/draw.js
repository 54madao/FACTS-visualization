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
    camera.up.set(0,0,1);
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
    camera.position.z = cameraHeight;
    
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
    var block_position_y = 0;
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


    for(var i = 0, label_x = maxLabelWidth / 2, label_y = - (maxLabelWidth + text_scale) / 2; i < data.codeChangedPackagesList.length; i++){

        

        var numbuildings = data.codeChangedPackagesList[i].codeChangedFileList.length;
        var numColsBuildings = Math.ceil(Math.sqrt(numbuildings));

        //var rows = Math.ceil(numbuildings / numColsBuildings);
        var width = numColsBuildings * building_scale + (numColsBuildings + 1) * building_border * 2;
        var length = width + text_scale;
        


        var building_start_x = label_x - width / 2 + building_border * 2 + building_scale / 2;
        var building_start_y = label_y + length / 2 + building_border * 2 + building_scale / 2;

        var building_postition_x = building_start_x;
        var building_postition_y = building_start_y;

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
                y: building_postition_y,
                height: build_height,
                originalHeight: data.codeChangedPackagesList[i].codeChangedFileList[j].changedNumberLinesCode,
                id: i + "_" + j,
                name: data.codeChangedPackagesList[i].codeChangedFileList[j].codePathName.match(/[^\\/]+\.[^\\/]+$/)[0],
                methods: methods
            });
            
            if( (j + 1) % numColsBuildings == 0){
                building_postition_y -= building_scale + building_border * 2;
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
            y: label_y,
            id: i,
            total: sum
        });

        block_positions.push({
            id: i,
            width: width, 
            length: length, 
            x: label_x, 
            y: label_y
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
            label_y -= maxLabelWidth + text_scale + label_border * 2;
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
        object.position.y = positions[i].y + offset;
        object.position.z = 0;
        //object.rotation.x = - Math.PI / 2;
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
        block_cube.position.z = block_height / 2;
        block_cube.position.y = positions[i].y + offset;

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
        spritey.position.set( block_cube.position.x - block_width / 2 + 50, 0, block_cube.position.y + block_width / 2 + text_scale / 2);
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
        build_cube.position.z = positions[i].height / 2;
        build_cube.position.y = positions[i].y + offset;
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

        positions[i].methods.forEach(function(item){
            item.children.forEach(function(method){
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
                
            });
        });
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
        base_geometry.vertices.push( new THREE.Vector3( - size , i, 0 ) );
        base_geometry.vertices.push( new THREE.Vector3(   size, i, 0 ) );
        base_geometry.vertices.push( new THREE.Vector3( i, - size , 0) );
        base_geometry.vertices.push( new THREE.Vector3( i, size,   0 ) );
        
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


