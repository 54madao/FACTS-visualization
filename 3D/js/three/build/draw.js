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

function calculatePositions(data){
    var block_positions = [];
    var building_postitions = [];
    var base_position = [];
    var numColsBlocks = Math.floor(Math.sqrt(data.codeChangedPackagesList.length)) + 2;
    var block_position_x = 0;
    var block_position_z = 0;
    var maxRowlength = 0;
    var maxWidth = 0;
    var maxlength = 0;

    for(var i = 0; i < data.codeChangedPackagesList.length; i++){

        var numbuildings = data.codeChangedPackagesList[i].codeChangedFileList.length;
        var numColsBuildings = Math.ceil(Math.sqrt(numbuildings));

        var rows = Math.ceil(numbuildings / numColsBuildings);
        var width = numColsBuildings * building_scale + (numColsBuildings + 1) * building_border * 2;
        var length = width + text_scale;
        block_positions.push({
            width: width, 
            length: length, 
            x: block_position_x + width / 2, 
            z: block_position_z + length / 2
        });
        maxRowlength = Math.max(maxRowlength, length);
        if(i + 1 == data.codeChangedPackagesList.length){
            maxWidth = Math.max(maxWidth, block_position_x + width);
            maxlength = block_position_z + maxRowlength;
            var base_width = maxWidth + block_border * 4;
            var base_length = maxlength + block_border * 4;
            var base_size = base_width > base_length ? base_width : base_length ;
            base_position.push({
                size: base_size,
                offset: base_size / 2 - block_border * 2
            });
        }

        var building_start_x = block_position_x + building_border * 2 + building_scale / 2;
        var building_start_z = block_position_z + building_border * 2 + building_scale / 2;

        var building_postition_x = building_start_x;
        var building_postition_z = building_start_z;

        for(var j = 0; j < numbuildings; j++){
            
            var build_height = data.codeChangedPackagesList[i].codeChangedFileList[j].changedNumberLinesCode;
            build_height = (build_height - scale_min) / (scale_max - scale_min) * scale_size;


            building_postitions.push({
                x: building_postition_x, 
                z: building_postition_z,
                height: build_height,
                originalHeight: data.codeChangedPackagesList[i].codeChangedFileList[j].changedNumberLinesCode,
                id: i + "_" + j,
                name: data.codeChangedPackagesList[i].codeChangedFileList[j].codePathName.match(/[^\\/]+\.[^\\/]+$/)[0]
            });
            
            if( (j + 1) % numColsBuildings == 0){
                building_postition_z += building_scale + building_border * 2;
                building_postition_x = building_start_x;
            }
            else{
                building_postition_x += building_scale + building_border * 2;
            }
        }

        if((i + 1) % numColsBlocks == 0){
            block_position_z += maxRowlength + block_border * 2;
            maxWidth = Math.max(maxWidth, block_position_x + width);
            block_position_x = 0;
            maxRowlength = 0;
        }
        else{
            block_position_x += width + block_border * 2;
        }
    }
    return [block_positions, building_postitions, base_position];
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

        scene.add( group );
        group.add( block_cube );

        //Text
        var tmp = fileData.codeChangedPackagesList[i].packageName;
        tmp = tmp.replace(/\\/g, ".").substr(1, tmp.length - 2);
        var last = tmp.lastIndexOf('.');
        var packageName = tmp.substr(last + 1, tmp.length - 1);
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

        var spritey = makeTextSprite( packageName, 
        { fontsize: 24, borderColor: {r:255, g:0, b:0, a:1.0}, backgroundColor: {r:255, g:100, b:100, a:0.8} } );
        // spritey.position.x = block_cube.position.x;
        // spritey.position.y = 0;
        // spritey.position.z = block_cube.position.z + block_width / 2;
        spritey.position.set( block_cube.position.x - block_width / 2 + 50, 0, block_cube.position.z + block_width / 2 + text_scale / 2);
        console.log("x: " + block_cube.position.x);
        //console.log("spritey.x: " + spritey.position.x);
        group.add( spritey );
    }
}

function createBuildings(positions,offset){
    //console.log(positions.length);
    for(var i = 0; i < positions.length; i++){       
        var build = new THREE.BoxGeometry( building_scale, positions[i].height, building_scale);
        var build_material = new THREE.MeshLambertMaterial( { color: 0xff0000, overdraw: 0.5 } );
        var build_cube = new THREE.Mesh( build, build_material  );

        build_cube.position.x = positions[i].x - offset;
        build_cube.position.y = positions[i].height / 2;
        build_cube.position.z = positions[i].z - offset;
        build_cube.name = positions[i].name + " (" + positions[i].originalHeight +" LOC)";
        scene.add( build_cube );
        building_objects[positions[i].id] = build_cube;
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
    step = block_border * 2;
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


