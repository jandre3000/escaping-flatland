$(document).ready(function(){

    var renderer = new THREE.CanvasRenderer({antialias:true});
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 45, window.outerWidth / window.outerHeight, 0.1, 2000);
    var mouse = { x: 0, y: 0 };
    var projector = new THREE.Projector();
    var vector = new THREE.Vector3( mouse.x, mouse.y, 0 );
    var rayCaster = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );
    var shapes = [];
    var shapesPosition = [];
    var cubeVelocity = 5

    var pi = {}
    pi.num = 1
    pi.val = pi.num * Math.sin()

    camera.position.set(0,0,800);
    camera.lookAt(scene.position);  
    scene.add(camera);
    renderer.setSize( window.outerWidth, window.outerHeight );
    $(renderer.domElement).addClass('escapingflatland_canvas')
    $('body').append(renderer.domElement)

    if ('ontouchstart' in window){ 
        document.addEventListener('touchmove', onDocumentTouchMove, false);    
        cubeVelocity = 15;
    } 
    else {
        document.addEventListener('mousemove', onDocumentMouseMove, false);    
    }

    function onDocumentMouseMove(event){
        if ( event.target === renderer.domElement ) {
            mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
            mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
            updateRayCaster()
            addCube();
        }
    }
    function onDocumentTouchMove(event){
        if ( event.target === renderer.domElement ) {
            event.preventDefault()
            mouse.x = ( event.touches[0].pageX / window.innerWidth ) * 2 - 1;
            mouse.y = - ( event.touches[0].pageY / window.innerHeight ) * 2 + 1;
            updateRayCaster()
            addCube();               
        }
    }
    function addCube(){
        var rand =  Math.random(0.5, 0.8)
        var geometry = new THREE.CubeGeometry(rand*20, rand*20, 0 );
        var material = new THREE.MeshNormalMaterial( {shading:true} );
        var shape = new THREE.Mesh( geometry, material );
        shape.position.set( Math.round( rayCaster.ray.direction.x*1000 /19 )*19, Math.round( rayCaster.ray.direction.y*1000/19 )*19, 0  );
        shape.custom_rotation_x = Math.random()/50
        shape.custom_rotation_y = Math.random()/50
        shape.custom_velocity = Math.random()*cubeVelocity

        scene.add( shape );

        shapesPosition.push(shape)

        setTimeout(function(){
            shapes.push(shape)
        }, 1000)
        
        setTimeout(function(){
            scene.remove(shape)
        }, 10000)     
    }

    function updateRayCaster(){
        vector.x = mouse.x;
        vector.y = mouse.y;
        projector.unprojectVector( vector, camera );
        rayCaster = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );
    }

    function animate() {
        window.requestAnimationFrame( animate );
        pi.num += pi.num*Math.sin(1)
        for(i=shapes.length-1; i>0; i--){
            var shape = shapes[i]
            shapes[i].rotation.x += shapes[i].custom_rotation_x
            shapes[i].rotation.y += shapes[i].custom_rotation_y
            shapes[i].position.z += shapes[i].custom_velocity
        }
        renderer.render( scene, camera );
    }


    animate()

});