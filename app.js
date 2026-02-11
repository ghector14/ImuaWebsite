// Landing page and runner transition
const landingPage = document.querySelector(".landingPage");
const enterButton = document.querySelector(".enterButton");
const runnerTransition = document.querySelector(".runnerTransition");

// Make entire landing page clickable
landingPage.addEventListener("click", () => {
    landingPage.classList.add("hidden");
    
    setTimeout(() => {
        landingPage.style.display = "none";
        runnerTransition.classList.add("active");
    }, 800);
    
    setTimeout(() => {
        runnerTransition.style.display = "none";
        document.body.classList.add("loaded");
    }, 2500);
});

// ============================================
// 3D GLOBE INTERACTION
// ============================================
import * as THREE from "https://cdn.skypack.dev/three@0.133.1/build/three.module";
import {OrbitControls} from "https://cdn.skypack.dev/three@0.133.1/examples/jsm/controls/OrbitControls";

const containerEl = document.querySelector(".globe-wrapper");
if (containerEl) {
    const canvas3D = containerEl.querySelector("#globe-3d");
    const canvas2D = containerEl.querySelector("#globe-2d-overlay");
    const popupEl = containerEl.querySelector(".globe-popup");

    let renderer, scene, camera, rayCaster, controls;
    let overlayCtx = canvas2D.getContext("2d");
    let coordinates2D = [0, 0];
    let pointerPos;
    let clock, mouse, pointer, globe, globeMesh;
    let popupVisible;
    let earthTexture, mapMaterial;
    let popupOpenTl, popupCloseTl;

    let dragged = false;

    initScene();
    window.addEventListener("resize", updateSize);

    function initScene() {
        renderer = new THREE.WebGLRenderer({canvas: canvas3D, alpha: true});
        renderer.setPixelRatio(2);
        renderer.setClearColor(0x1a0a0f, 0);

        scene = new THREE.Scene();
        scene.fog = new THREE.Fog(0x2d0f1a, 1, 3);
        camera = new THREE.OrthographicCamera(-1.1, 1.1, 1.1, -1.1, 0, 3);
        camera.position.z = 1.1;

        rayCaster = new THREE.Raycaster();
        rayCaster.far = 1.15;
        mouse = new THREE.Vector2(-1, -1);
        clock = new THREE.Clock();

        createOrbitControls();

        popupVisible = false;

        new THREE.TextureLoader().load(
            "https://ksenia-k.com/img/earth-map-colored.png",
            (mapTex) => {
                earthTexture = mapTex;
                earthTexture.repeat.set(1, 1);
                createGlobe();
                createPointer();
                createPopupTimelines();
                addCanvasEvents();
                updateSize();
                render();
            });
    }

    function createOrbitControls() {
        controls = new OrbitControls(camera, canvas3D);
        controls.enablePan = false;
        controls.enableZoom = false;
        controls.enableDamping = true;
        controls.minPolarAngle = .4 * Math.PI;
        controls.maxPolarAngle = .4 * Math.PI;
        controls.autoRotate = true;

        let timestamp;
        controls.addEventListener("start", () => {
            timestamp = Date.now();
        });
        controls.addEventListener("end", () => {
            dragged = (Date.now() - timestamp) > 600;
        });
    }

    function createGlobe() {
        const globeGeometry = new THREE.IcosahedronGeometry(1, 22);
        mapMaterial = new THREE.ShaderMaterial({
            vertexShader: document.getElementById("vertex-shader-map").textContent,
            fragmentShader: document.getElementById("fragment-shader-map").textContent,
            uniforms: {
                u_map_tex: {type: "t", value: earthTexture},
                u_dot_size: {type: "f", value: 0},
                u_pointer: {type: "v3", value: new THREE.Vector3(.0, .0, 1.)},
                u_time_since_click: {value: 0},
            },
            alphaTest: false,
            transparent: true
        });

        globe = new THREE.Points(globeGeometry, mapMaterial);
        scene.add(globe);

        globeMesh = new THREE.Mesh(globeGeometry, new THREE.MeshBasicMaterial({
            color: 0x8B002A,
            transparent: true,
            opacity: .15
        }));
        scene.add(globeMesh);
    }

    function createPointer() {
        const geometry = new THREE.SphereGeometry(.04, 16, 16);
        const material = new THREE.MeshBasicMaterial({
            color: 0xFF7291,
            transparent: true,
            opacity: 0
        });
        pointer = new THREE.Mesh(geometry, material);
        scene.add(pointer);
    }

    function updateOverlayGraphic() {
        let activePointPosition = pointer.position.clone();
        activePointPosition.applyMatrix4(globe.matrixWorld);
        const activePointPositionProjected = activePointPosition.clone();
        activePointPositionProjected.project(camera);
        coordinates2D[0] = (activePointPositionProjected.x + 1) * containerEl.offsetWidth * .5;
        coordinates2D[1] = (1 - activePointPositionProjected.y) * containerEl.offsetHeight * .5;

        const matrixWorldInverse = controls.object.matrixWorldInverse;
        activePointPosition.applyMatrix4(matrixWorldInverse);

        if (activePointPosition.z > -1) {
            if (popupVisible === false) {
                popupVisible = true;
                showPopupAnimation(false);
            }

            let popupX = coordinates2D[0];
            popupX -= (activePointPositionProjected.x * containerEl.offsetWidth * .3);

            let popupY = coordinates2D[1];
            const upDown = (activePointPositionProjected.y > .6);
            popupY += (upDown ? 20 : -20);

            gsap.set(popupEl, {
                x: popupX,
                y: popupY,
                xPercent: -35,
                yPercent: upDown ? 0 : -100
            });

            popupY += (upDown ? -5 : 5);
            const curveMidX = popupX + activePointPositionProjected.x * 100;
            const curveMidY = popupY + (upDown ? -.5 : .1) * coordinates2D[1];

            drawPopupConnector(coordinates2D[0], coordinates2D[1], curveMidX, curveMidY, popupX, popupY);

        } else {
            if (popupVisible) {
                popupOpenTl.pause(0);
                popupCloseTl.play(0);
            }
            popupVisible = false;
        }
    }

    function addCanvasEvents() {
        containerEl.addEventListener("mousemove", (e) => {
            updateMousePosition(e.clientX, e.clientY);
        });

        containerEl.addEventListener("click", (e) => {
            if (!dragged) {
                updateMousePosition(
                    e.targetTouches ? e.targetTouches[0].pageX : e.clientX,
                    e.targetTouches ? e.targetTouches[0].pageY : e.clientY,
                );

                const res = checkIntersects();
                if (res.length) {
                    pointerPos = res[0].face.normal.clone();
                    pointer.position.set(res[0].face.normal.x, res[0].face.normal.y, res[0].face.normal.z);
                    mapMaterial.uniforms.u_pointer.value = res[0].face.normal;
                    popupEl.innerHTML = cartesianToLatLong();
                    showPopupAnimation(true);
                    clock.start()
                }
            }
        });

        function updateMousePosition(eX, eY) {
            mouse.x = (eX - containerEl.offsetLeft) / containerEl.offsetWidth * 2 - 1;
            mouse.y = -((eY - containerEl.offsetTop) / containerEl.offsetHeight) * 2 + 1;
        }
    }

    function checkIntersects() {
        rayCaster.setFromCamera(mouse, camera);
        const intersects = rayCaster.intersectObject(globeMesh);
        if (intersects.length) {
            document.body.style.cursor = "pointer";
        } else {
            document.body.style.cursor = "auto";
        }
        return intersects;
    }

    function render() {
        mapMaterial.uniforms.u_time_since_click.value = clock.getElapsedTime();
        checkIntersects();
        if (pointer) {
            updateOverlayGraphic();
        }
        controls.update();
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }

    function updateSize() {
        const containerWidth = containerEl.offsetWidth;
        const containerHeight = containerEl.offsetHeight;
        renderer.setSize(containerWidth, containerHeight);
        canvas2D.width = containerWidth;
        canvas2D.height = containerHeight;
        mapMaterial.uniforms.u_dot_size.value = .04 * Math.min(containerWidth, containerHeight);
    }

    function cartesianToLatLong() {
        const pos = pointer.position;
        const lat = 90 - Math.acos(pos.y) * 180 / Math.PI;
        const lng = (270 + Math.atan2(pos.x, pos.z) * 180 / Math.PI) % 360 - 180;
        return formatCoordinate(lat, 'N', 'S') + ",&nbsp;" + formatCoordinate(lng, 'E', 'W');
    }

    function formatCoordinate(coordinate, positiveDirection, negativeDirection) {
        const direction = coordinate >= 0 ? positiveDirection : negativeDirection;
        return `${Math.abs(coordinate).toFixed(4)}°&nbsp${direction}`;
    }

    function createPopupTimelines() {
        popupOpenTl = gsap.timeline({
            paused: true
        })
            .to(pointer.material, {
                duration: .2,
                opacity: 1,
            }, 0)
            .fromTo(canvas2D, {
                opacity: 0
            }, {
                duration: .3,
                opacity: 1
            }, .15)
            .fromTo(popupEl, {
                opacity: 0,
                scale: .9,
                transformOrigin: "center bottom"
            }, {
                duration: .1,
                opacity: 1,
                scale: 1,
            }, .15 + .1);

        popupCloseTl = gsap.timeline({
            paused: true
        })
            .to(pointer.material, {
                duration: .3,
                opacity: .2,
            }, 0)
            .to(canvas2D, {
                duration: .3,
                opacity: 0
            }, 0)
            .to(popupEl, {
                duration: 0.3,
                opacity: 0,
                scale: 0.9,
                transformOrigin: "center bottom"
            }, 0);
    }

    function showPopupAnimation(lifted) {
        if (lifted) {
            let positionLifted = pointer.position.clone();
            positionLifted.multiplyScalar(1.3);
            gsap.from(pointer.position, {
                duration: .25,
                x: positionLifted.x,
                y: positionLifted.y,
                z: positionLifted.z,
                ease: "power3.out"
            });
        }
        popupCloseTl.pause(0);
        popupOpenTl.play(0);
    }

    function drawPopupConnector(startX, startY, midX, midY, endX, endY) {
        overlayCtx.strokeStyle = "#ffffff";
        overlayCtx.lineWidth = 2;
        overlayCtx.lineCap = "round";
        overlayCtx.clearRect(0, 0, containerEl.offsetWidth, containerEl.offsetHeight);
        overlayCtx.beginPath();
        overlayCtx.moveTo(startX, startY);
        overlayCtx.quadraticCurveTo(midX, midY, endX, endY);
        overlayCtx.stroke();
    }
}