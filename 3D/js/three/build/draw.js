//draw
function createBase(size, step){

    var base_geometry = new THREE.Geometry();
    for ( var i = - size; i <= size; i += step ) {
        base_geometry.vertices.push( new THREE.Vector3( - size, 0, i ) );
        base_geometry.vertices.push( new THREE.Vector3(   size, 0, i ) );
        base_geometry.vertices.push( new THREE.Vector3( i, 0, - size ) );
        base_geometry.vertices.push( new THREE.Vector3( i, 0,   size ) );

    }
    var base_material = new THREE.LineBasicMaterial( { color: 0x000000, opacity: 0.2, transparent: true } );
    var base_line = new THREE.LineSegments( base_geometry, base_material );
    scene.add( base_line );
}

function createCity(size){
    // Blocks
    var positions = [];
    
    
    for ( var i = 0, nextX = -size, nextZ = -size; i < 45; i ++ ) {
        var group = new THREE.Group();

        var block_length = Math.floor( Math.random() * 51 ) + 50;
        var block_width = Math.floor( Math.random() * 51 ) + 50;
        var block_height = 3;
        var block = new THREE.BoxGeometry( block_length, block_height, block_width );
        var block_material = new THREE.MeshLambertMaterial( { color: 0xffffff, overdraw: 0.5 } );

        var block_cube = new THREE.Mesh( block, block_material  );

        block_cube.position.x = block_length / 2 + nextX;
        block_cube.position.y = block_height / 2;
        block_cube.position.z = block_width / 2 + nextZ;

        scene.add( group );
        group.add( block_cube );
        positions.push(block_cube.position);
        
        //Text
        var textGeo = new THREE.TextGeometry( text + " " +i, {

            size: font_size,
            height: font_height,
            curveSegments: curveSegments,

            font: font,
            weight: weight,
            style: style,

            bevelThickness: bevelThickness,
            bevelSize: bevelSize,
            bevelEnabled: bevelEnabled,

            material: 0,
            extrudeMaterial: 1

        });
        //textGeo.computeBoundingBox();
        //textGeo.computeVertexNormals();
        material = new THREE.MeshFaceMaterial( [
            new THREE.MeshPhongMaterial( { color: 0x00ff00, shading: THREE.FlatShading } ), // front
            new THREE.MeshPhongMaterial( { color: 0x00ff00, shading: THREE.SmoothShading } ) // side
        ] );
        var textMesh = new THREE.Mesh( textGeo, material );

        textMesh.position.x = nextX;
        textMesh.position.y = font_height / 2;
        textMesh.position.z = block_width + nextZ + font_size;
        textMesh.rotation.x = - Math.PI / 2;
        textMesh.rotation.y = 0;
        group.add(textMesh);


        console.log(i + ": " + nextX + ", " + nextZ);
        if(nextX + block_length + 170 > size){
            nextX = -size;
            nextZ += 70 + block_width;
        }
        else{
            nextX += 70 + block_length;
        }

        var num = Math.floor( Math.random() * 4) + 2;
        var x = block_cube.position.x - block_length / 2;
        var z = block_cube.position.z - block_width / 2;
        // Building
        for (var j = 0; j < num; j++) {  
            console.log(j + ": " + x + ", " + z + ", " + block_length);
            //var build_length = Math.floor( block_length / 5 );
            //var build_width = Math.floor( block_width / 5 );
            var build_height = Math.floor( Math.random() * 100 + 3);
            var build = new THREE.BoxGeometry( 10, build_height, 10);
            var build_material = new THREE.MeshLambertMaterial( { color: 0xff0000, overdraw: 0.5 } );
            var build_cube = new THREE.Mesh( build, build_material  );

            build_cube.position.x = 10 / 2 + x;
            build_cube.position.y = build_height / 2 + block_height;
            build_cube.position.z = 10 / 2 + z;
            scene.add( build_cube );

            if(x + 10 + 20 > block_cube.position.x + block_length / 2){
                x = block_cube.position.x - block_length / 2;
                z += 10 + 10;
            }
            else{
                x += 10 + 10;
            }

        };
    }

    //group.position.y = 100;

    //scene.add( group );

    // line
    for (var i = 0; i < 20; i++) {
        console.log("line");
        var line_material = new THREE.LineBasicMaterial({
            color: 0x0000ff
        });
        var line_geometry = new THREE.Geometry();
        var start = Math.floor( Math.random() * 45);
        var end = Math.floor( Math.random() * 45);
        while(end == start){
            end = Math.floor( Math.random() * 45);
        }
        line_geometry.vertices.push(positions[start]);
        line_geometry.vertices.push(positions[end]);
        //line.geometry.vertices.push(new THREE.Vector3(-500, 20, 100));
        var line = new THREE.Line(line_geometry, line_material);
        scene.add(line);
    };
}







