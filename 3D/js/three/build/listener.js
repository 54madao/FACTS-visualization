
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
    event.preventDefault();

    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    showRelation();

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
            }   
            SELECTED = intersects[0].object;
            material = SELECTED.material;
            if(material.emissive){
                //if(SELECTED != INTERSECTED)
                //SELECTED.currentHex = SELECTED.material.emissive.getHex();
                material.emissive.setHex(onclick_color);
                $("a[href='#collapse_list']").text(SELECTED.name);
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
        //console.log("no object");
        // if (SELECTED){
        //     material = SELECTED.material;

        //     if(material.emissive){
        //         material.emissive.setHex(SELECTED.currentHex);
        //         // scene.remove(rightline);
        //         // scene.remove(leftline);
        //     }
        // }

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

$('#changes').on('select_node.jstree', function(e, data){
    if(building_objects[data.selected] != null){
        $("a[href='#collapse_list']").text(building_objects[data.selected].name);
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
        $("a[href='#collapse_list']").text("Related Defects");
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


function onDocumentDblClick(event){
    event.preventDefault();

    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;


    // find intersections

    raycaster.setFromCamera( mouse, camera );
    //alert("Double!");
    var intersects = raycaster.intersectObjects( scene.children ), material;
    if (intersects.length > 0){
       moveUsingMatrix(intersects[0].object);
        
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

function moveUsingMatrix(object){
    // solution 1 using matrix
    console.log("object: " + object.position.x + ", " + object.position.y + ", " + object.position.z);
    console.log("camera: " + camera.position.x + ", " + camera.position.y + ", " + camera.position.z);
    var x = (camera.position.x - object.position.x) / 3;
    var y = (camera.position.y - object.position.y) / 3;
    var z = (camera.position.z - object.position.z) / 3;
    x = Math.abs(x) < 200 ? x / Math.abs(x) * 200 : x;
    y = Math.abs(y) < 200 ? y / Math.abs(y) * 200 : y;
    z = Math.abs(z) < 200 ? z / Math.abs(z) * 200 : z;
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

function showRelation(){
    var element = document.createElement( 'div' );
    element.className = 'element';
    element.style.backgroundColor = 'rgba(0,127,127,' + ( Math.random() * 0.5 + 0.25 ) + ')';

    var number = document.createElement( 'div' );
    number.className = 'number';
    number.textContent = 1;
    element.appendChild( number );

    var symbol = document.createElement( 'div' );
    symbol.className = 'symbol';
    symbol.textContent = "TEST";
    element.appendChild( symbol );

    var details = document.createElement( 'div' );
    details.className = 'details';
    details.innerHTML = "TEST" + '<br>' + "TEST";
    element.appendChild( details );

    var object = new THREE.CSS3DSprite( element );
    object.position.x = Math.random() * 500;
    object.position.y = Math.random() * 500;
    object.position.z = Math.random() * 500;
    css3dscene.add( object );
}