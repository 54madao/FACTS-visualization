
// listener
function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

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
                    material.emissive.setHex(INTERSECTED.currentHex);
                    scene.remove(rightline);
                    scene.remove(leftline);
                }
            }   
            INTERSECTED = intersects[0].object;
            material = INTERSECTED.material;
            if(material.emissive){
                INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
                material.emissive.setHex(0xff00ff);

                // to right
                var right_line_geometry = new THREE.Geometry();
                right_line_geometry .vertices.push(INTERSECTED.position);
                right_line_geometry .vertices.push(new THREE.Vector3(1000, Math.random() * 500, 0));
                //line.geometry.vertices.push(new THREE.Vector3(-500, 20, 100));
                rightline = new THREE.Line(right_line_geometry, direct_line_material);
                scene.add(rightline);

                // to left

                var left_line_geometry = new THREE.Geometry();
                left_line_geometry.vertices.push(INTERSECTED.position);
                left_line_geometry.vertices.push(new THREE.Vector3(-1000, Math.random() * 500, 0));
                //line.geometry.vertices.push(new THREE.Vector3(-500, 20, 100));
                leftline = new THREE.Line(left_line_geometry, direct_line_material);
                scene.add(leftline);
            }
            console.log("length: " + intersects.length);
            console.log(INTERSECTED.position);
        }

    } else {

        if (INTERSECTED){
            material = INTERSECTED.material;

            if(material.emissive){
                material.emissive.setHex(INTERSECTED.currentHex);
                scene.remove(rightline);
                scene.remove(leftline);
            }
        }

        INTERSECTED = null;

    }
}