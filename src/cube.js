// image cube
export default function imageCube(imageTitle) {
    const home = document.querySelector('#Home');
    home.style.opacity = "0";
    home.style.pointerEvents = "none";
    let cubeWidth = window.innerWidth;
    let cubeHeight = 500;
    let cameraSize = 50;

    if (window.outerWidth > 500) {
        cubeWidth = window.innerWidth;
        cubeHeight = 500;
    }
    else if (350 < window.outerWidth && window.outerWidth < 500) {
        cubeWidth = 200;
        cubeHeight = 300;
        cameraSize = 55;
    }
    else {
        cubeWidth = 200;
        cubeHeight = 300;
        cameraSize = 70;
    }
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(cameraSize, window.innerWidth / window.innerHeight, 0.1, 1000);
    const loader = new THREE.TextureLoader();
    const canvas = document.querySelector('#Canvas');
    const renderer = new THREE.WebGLRenderer({ canvas });;

    renderer.setSize(cubeWidth, cubeHeight);
        

    document.body.appendChild(renderer.domElement);
    const geometry = new THREE.BoxGeometry();
    const material =[
        new THREE.MeshBasicMaterial({ map: loader.load(`data/images/${imageTitle}1.jpg`) }),
        new THREE.MeshBasicMaterial({ map: loader.load(`data/images/${imageTitle}2.jpg`) }),
        new THREE.MeshBasicMaterial({ map: loader.load(`data/images/${imageTitle}3.jpg`) }),
        new THREE.MeshBasicMaterial({ map: loader.load(`data/images/${imageTitle}4.jpg`) }),
        new THREE.MeshBasicMaterial({ map: loader.load(`data/images/${imageTitle}5.jpg`) }),
        new THREE.MeshBasicMaterial({ map: loader.load(`data/images/${imageTitle}6.jpg`) })]
        ;
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 3;

    // 회전 속도
    const animate = function () {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        renderer.render(scene, camera);
    };
    animate();
}