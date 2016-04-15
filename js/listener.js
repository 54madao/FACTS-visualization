
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
                }
            }   
            INTERSECTED = intersects[0].object;
            material = INTERSECTED.material;
            if(material.emissive){
                if(INTERSECTED != SELECTED){
                    INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
                }
                material.emissive.setHex(onhover_color);
                
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

            }
        }

        INTERSECTED = null;

    }
}

function onDocumentClick( event ) {

   
    event.preventDefault();

    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;


    raycaster.setFromCamera( mouse, camera );

    var intersects = raycaster.intersectObjects( scene.children ), material;

    if (intersects.length > 0) {
        if (SELECTED != intersects[0].object) {
            console.log("not the same");
            if (SELECTED){
                material = SELECTED.material;
                if(material.emissive){
                    material.emissive.setHex(SELECTED.currentHex);
                    
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
                      
                showRelatedCode(false);
                
            }
            console.log("length: " + intersects.length);
            console.log(SELECTED.position);
        }

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
            object.currentHex = object.material.emissive.getHex();
            object.material.emissive.setHex(onlink_color);
        });
        if (SELECTED){
            material = SELECTED.material;
            if(material.emissive){
                material.emissive.setHex(SELECTED.currentHex);
            }
            SELECTED = null;
        }  
    }
}

function onDocumentDblClick(event){
    event.preventDefault();

    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;


    // find intersections

    raycaster.setFromCamera( mouse, camera );
    var intersects = raycaster.intersectObjects( scene.children ), material;
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
        
    }
    else{
        console.log("no object");
        if (SELECTED){
            material = SELECTED.material;

            if(material.emissive){
                material.emissive.setHex(SELECTED.currentHex);
 
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

        SELECTED = null;
    }

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
    
    controls.target.set(object.position.x, object.position.y, object.position.z);
}

function showRelation(object){
    
    var container = document.createElement( 'div' );
    container.style.width = '150px';
    container.style.borderStyle = 'groove';

    var element = document.createElement( 'div' );
        element.style.height = '20px';
        element.style.backgroundColor = 'rgba(200,200,200,1)';
        element.style.boxShadow = '0px 0px 12px rgba(0,255,255,0.5)';
        element.style.border= '1px solid rgba(127,255,255,0.25)';
        element.style.textAlign = "center";
        element.style.overflow = 'hidden';
        element.style.textOverflow = "ellipsis";
        element.style.whiteSpace = "nowrap";

        var content = document.createElement( 'div' );
        content.textContent = 'Defects';
        content.style.fontSize = 15 + 'px';
        content.style.fontWeight = 'bold';
        content.style.color = 'rgba(0,0,0,0.75)';
        content.style.textShadow = '0 0 10px rgba(0,255,255,0.95)';

        element.appendChild(content);
        container.appendChild(element);


    for (var i = 6; i < 12; i++) {

        var element = document.createElement( 'div' );
        element.style.height = '20px';
        element.style.backgroundColor = 'rgba(200,200,200,1)';
        element.style.boxShadow = '0px 0px 12px rgba(0,255,255,0.5)';
        element.style.border= '1px solid rgba(127,255,255,0.25)';
        element.style.textAlign = "center";
        element.style.overflow = 'hidden';
        element.style.textOverflow = "ellipsis";
        element.style.whiteSpace = "nowrap";

        var index = Math.floor(Math.random() * 6);
        var content = document.createElement( 'a' );
        content.setAttribute('role', "button");
        content.href = "#collapse"+index;
        content.setAttribute('data-toggle', "collapse");
        content.setAttribute('aria-expanded', "false");
        content.setAttribute('aria-controls', "linkedcollapse"+index);
        content.setAttribute('data-parent',"#doc_list");
        content.textContent = docData[i].key;

        element.appendChild(content);
        container.appendChild(element);
    }
    
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
        SELECTED = null;
    }else if(event.keyCode == 57){
        onZoomIn();
    }else if(event.keyCode == 48){
        onZoomOut();
    }
}



$(document).on('click', 'a[data-toggle="tab"]',function(e){

    e.stopImmediatePropagation();

})

$(document).on('click', 'a[data-toggle="collapse"]',function(e){

    e.stopImmediatePropagation();

})

$(document).on('mousedown', '#circles-slider', function(e){

    e.stopImmediatePropagation();

})



$(document).on('click.jstree', '.jstree-ocl',function(e){
 
    e.stopImmediatePropagation();

});

$(document).on({
    click: function(e){
        e.stopImmediatePropagation();
 
    }, mousemove: function(e){
        e.stopImmediatePropagation();

    }, mousedown: function(e){
        e.stopImmediatePropagation();
 
    }, mousewheel: function(e){
        e.stopImmediatePropagation();
  
    }
}, '.jstree');

$(document).on('click', '.panel-body', function(e){
    e.stopImmediatePropagation();
})


$(document).on('dblclick', '.labels',function(e){
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
    
    if(camera.position.z > cameraHeight / 3 * 2){
        if(!showDetail){
            block_objects.forEach(function(object){
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
            camera.position.z = cameraHeight / 3 * 2;
            camera.lookAt(controls.target);
        }
    }else if(camera.position.z > cameraHeight / 3){
        camera.position.z = cameraHeight / 3;
        camera.lookAt(controls.target);
    }
}

function onZoomOut(){
    if(camera.position.z > cameraHeight / 3 * 2){       
        if(!showDetail){
            block_objects.forEach(function(object){
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
            camera.position.z = cameraHeight;
            camera.position.x = 0;
            camera.position.y = 0;
            controls.target.set (0,0,0);
            camera.lookAt(controls.target);
            showDetail = false;
        }      
    }else if(camera.position.z > cameraHeight / 3){
        camera.position.z = cameraHeight / 3 * 2;
        camera.lookAt(controls.target);
    }
}