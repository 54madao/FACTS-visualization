
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
                $('#changes').jstree('open_node', SELECTED.name.split('#')[0].split('_')[0]);
                console.log(SELECTED.name.split('#')[0]);
                $('#changes').jstree('deselect_all');
                $('#changes').jstree('select_node', SELECTED.name.split('#')[0]);
                var uid = SELECTED.name.split('#')[0];
                $('#changes').scrollTop($('#'+uid).position().top);
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