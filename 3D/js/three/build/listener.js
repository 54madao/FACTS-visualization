
// listener
function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
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
        'width': (function(){return window.innerWidth / 6})
    });
    $('#left_tab').css({
        'max-width': (function(){return window.innerWidth / 5})
    });
    $('#right_tab').css({
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
                    material.emissive.setHex(INTERSECTED.currentHex);
                    //scene.remove(rightline);
                    //scene.remove(leftline);
                }
            }   
            INTERSECTED = intersects[0].object;
            material = INTERSECTED.material;
            if(material.emissive){
                if(INTERSECTED != SELECTED)
                    INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
                material.emissive.setHex(onhover_color);

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
                if(INTERSECTED != SELECTED)
                    material.emissive.setHex(INTERSECTED.currentHex);
                else
                    material.emissive.setHex(onclick_color);
                // scene.remove(rightline);
                // scene.remove(leftline);
            }
        }

        INTERSECTED = null;

    }
}

function onDocumentMouseDown( event ) {

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
    event.preventDefault();

    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;


    // find intersections

    raycaster.setFromCamera( mouse, camera );

    var intersects = raycaster.intersectObjects( scene.children ), material;

    if (intersects.length > 0) {
        if (SELECTED != intersects[0].object) {
            if (SELECTED){
                material = SELECTED.material;
                if(material.emissive){
                    material.emissive.setHex(SELECTED.currentHex);
                    //scene.remove(rightline);
                    //scene.remove(leftline);
                }
            }   
            SELECTED = intersects[0].object;
            material = SELECTED.material;
            if(material.emissive){
                //if(SELECTED != INTERSECTED)
                //SELECTED.currentHex = SELECTED.material.emissive.getHex();
                material.emissive.setHex(onclick_color);
                showRelatedDocs(true);

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

        if (SELECTED){
            material = SELECTED.material;

            if(material.emissive){
                material.emissive.setHex(SELECTED.currentHex);
                // scene.remove(rightline);
                // scene.remove(leftline);
            }
        }

        SELECTED = null;

    }

}

function showRelatedDocs(on){
    var container = $('#relatedDocs_list');
    container.empty();
    if(on){
        var num = Math.floor(Math.random() * 5) + 1;   
        for (var i = 0; i < num; i++) {
            var index = Math.floor(Math.random() * 100);
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
                        $('<div>').addClass("panel-body").text(docData[index].summary)
                    )
                )
            );
        };
    }
    
}

$('#changes').on('select_node.jstree', function(e, data){
    if(building_objects[data.selected] != null){
        if(SELECTED){
            SELECTED.material.emissive.setHex(SELECTED.currentHex);    
        }
        SELECTED = building_objects[data.selected];
        SELECTED.currentHex = SELECTED.material.emissive.getHex();
        SELECTED.material.emissive.setHex(onclick_color);
        showRelatedDocs(true);
    }
    else{
        showRelatedDocs(false);
        if(SELECTED){
            SELECTED.material.emissive.setHex(SELECTED.currentHex);
        }
        SELECTED = null;
    }
});

$(document).on('click', "a[role='button']",function(event){
    //event.preventDefault();
    var tmp = event.target.tagName;
    console.log(tmp);
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