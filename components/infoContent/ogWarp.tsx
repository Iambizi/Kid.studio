
import * as THREE from 'three';
import React, { useEffect } from "react";
export default function ogWarp():JSX.Element{
    useEffect(()=>{

        function onMouseDown(a) {
            (mouseDown = !0), (prevMouse.x = mouse.x), (prevMouse.y = mouse.y);
        }
        function onMouseUp() {
            (mouseDown = !1), (snapping = !0), (snapback.x = cubes[0].rotation.x / 60), (snapback.y = cubes[0].rotation.y / 60);
        }
        function onDocumentMouseMove(a) {
            (hovering = !1), (mouse.x = a.clientX / window.innerWidth), (mouse.y = a.clientY / window.innerHeight);
        }
        function resize(a) {
            (widthIncrease = window.innerWidth / prevWidth), (heightIncrease = window.innerHeight / prevHeight), (scaling *= heightIncrease / widthIncrease);
            for (var b = 0; b < cubes.length; b++) cubes[b].scale.x = scaling;
            (prevHeight = window.innerHeight), (prevWidth = window.innerWidth), renderer.setSize(window.innerWidth, window.innerHeight);
            var c = window.innerHeight,
                d = $("#featured").height(),
                e = (c - d) / 2;
            (isInfoPage && window.innerWidth <= 600) || $("#featured").css("margin-top", e + "px");
        }
        function dragMove() {
            (distMouse.x = prevMouse.x - mouse.x), (distMouse.y = prevMouse.y - mouse.y);
            for (var a = 0; a < cubes.length; a++) (cubes[a].rotation.y -= 2 * distMouse.x), (cubes[a].rotation.x -= 2 * distMouse.y);
        }
        function hoverMove() {
            for (var a = 0; a < cubes.length; a++)
                mouse.x > 0.5 ? cubes[a].rotation.y < hover_dist && (cubes[a].rotation.y += 0.002) : mouse.x < 0.5 && cubes[a].rotation.y > -hover_dist && (cubes[a].rotation.y -= 0.002),
                    mouse.y > 0.5 ? cubes[a].rotation.x < hover_dist && (cubes[a].rotation.x += 0.002) : mouse.y < 0.5 && cubes[a].rotation.x > -hover_dist && (cubes[a].rotation.x -= 0.002);
            (cubes[0].rotation.y > hover_dist || cubes[0].rotation.y < -hover_dist) && (cubes[0].rotation.x > hover_dist || cubes[0].rotation.x < -hover_dist) && (hovering = !0);
        }
        function snapBack() {
            cubes[0].rotation.x < 0.002 && cubes[0].rotation.x > -0.002 && cubes[0].rotation.y < 0.002 && cubes[0].rotation.y > -0.002 && (snapping = !1);
            for (var a = 0; a < cubes.length; a++) (cubes[a].rotation.x -= snapback.x), (cubes[a].rotation.y -= snapback.y);
        }
        function hover() {
            i == timerx && (i = 0);
            for (var a = 0; a < cubes.length; a++) timerx / 2 > i ? ((cubes[a].rotation.x += 3e-4), (cubes[a].rotation.y -= 3e-4)) : ((cubes[a].rotation.x -= 3e-4), (cubes[a].rotation.y += 3e-4));
            i++;
        }
        function render() {
            requestAnimationFrame(render),
                mouseDown ? dragMove() : snapping ? snapBack() : hovering ? hover() : hoverMove(),
                leftScroll && (transitionFrames >= transitionCounter ? ((camera.position.x += 62.5), transitionCounter++) : ((transitionCounter = 0), (leftScroll = !1))),
                dLeftScroll && (transitionFrames >= transitionCounter ? ((camera.position.x += 125), transitionCounter++) : ((transitionCounter = 0), (dLeftScroll = !1))),
                rightScroll && (transitionFrames >= transitionCounter ? ((camera.position.x -= 62.5), transitionCounter++) : ((transitionCounter = 0), (rightScroll = !1))),
                dRightScroll && (transitionFrames >= transitionCounter ? ((camera.position.x -= 125), transitionCounter++) : ((transitionCounter = 0), (dRightScroll = !1))),
                mouseDown && ((prevMouse.y = mouse.y), (prevMouse.x = mouse.x)),
                renderer.render(scene, camera);
        }
        var scene = new THREE.Scene(),
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1e4),
            renderer = new THREE.WebGLRenderer({ alpha: !0 }),
            mouse = { x: 0, y: 0 },
            prevMouse = { x: 0, y: 0 },
            distMouse = { x: 0, y: 0 },
            timerx = 500,
            transitionFrames = 31,
            i = 0,
            transitionCounter = 0,
            leftScroll = !1,
            dLeftScroll = !1,
            dRightScroll = !1,
            rightScroll = !1,
            val = -window.innerHeight / 2,
            oriHeight = Math.min(window.innerHeight, window.innerWidth),
            minSize = Math.min(window.innerWidth, window.innerHeight),
            oriRatio = window.innerHeight / window.innerWidth,
            currentFocus = 1,
            snapping = !1,
            snapback = { x: 0, y: 0 },
            hovering = !1,
            scale = 1,
            isInfoPage = $(".info").length > 0,
            currHeight = window.innerHeight,
            currWidth = window.innerWidth,
            mobilecheck = function () {
                var a = !1;
                return (
                    (function (b) {
                        (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
                            b
                        ) ||
                            /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
                                b.substr(0, 4)
                            )) &&
                            (a = !0);
                    })(navigator.userAgent || navigator.vendor || window.opera),
                    a
                );
            };
        mobilecheck() ? (scale = 0.4) : null != navigator.userAgent.match(/iPad/i) && window.innerWidth < 800 && (scale = 0.56), document.getElementById("featured") && document.getElementById("featured").appendChild(renderer.domElement);
        var image1Link = document.getElementById("image1").className;
        if ($(".featured-info").length > 0)
            var image2Link = "/assets/images/right.png",
                image3Link = "/assets/images/right.png";
        else
            var image2Link = document.getElementById("image2").className,
                image3Link = document.getElementById("image3").className;
        renderer.setSize(window.innerWidth, window.innerHeight), renderer.setClearColor(0, 0);
        for (
            var cubes = [
                    new THREE.Mesh(
                        new THREE.BoxGeometry(900 * scale, 506.25 * scale, 0, 10, 10, 10),
                        new THREE.MeshBasicMaterial({
                            map: THREE.ImageUtils.loadTexture(
                                image1Link,
                                {},
                                function () {},
                                function () {}
                            ),
                        })
                    ),
                    new THREE.Mesh(
                        new THREE.BoxGeometry(900 * scale, 506.25 * scale, 0, 10, 10, 10),
                        new THREE.MeshBasicMaterial({
                            map: THREE.ImageUtils.loadTexture(
                                image2Link,
                                {},
                                function () {},
                                function () {}
                            ),
                        })
                    ),
                    new THREE.Mesh(
                        new THREE.BoxGeometry(900 * scale, 506.25 * scale, 0, 10, 10, 10),
                        new THREE.MeshBasicMaterial({
                            map: THREE.ImageUtils.loadTexture(
                                image3Link,
                                {},
                                function () {},
                                function () {}
                            ),
                        })
                    ),
                ],
                mouseDown = !1,
                i = 0;
            i < cubes.length;
            i++
        )
            scene.add(cubes[i]);
        (camera.position.z = 500),
            (cubes[1].position.x = 2e3),
            (cubes[2].position.x = 4e3),
            document.addEventListener("mousemove", onDocumentMouseMove, !1),
            document.addEventListener("mousedown", onMouseDown, !1),
            document.addEventListener("mouseup", onMouseUp, !1),
            $(".next").click(onNext),
            $(".prev").click(onPrev);
        var textCounter = 1;
        $(document).ready(function () {
            $("a.next").click(function () {
                3 == textCounter ? ($(".title").animate({ left: "+=200%" }, 550, "linear"), (textCounter = 1)) : ($(".title").animate({ left: "-=100%" }, 550, "linear"), textCounter++), $("div.img-counter").text(textCounter + " / 3");
            }),
                $("a.prev").click(function () {
                    1 == textCounter ? ($(".title").animate({ left: "-=200%" }, 550, "linear"), (textCounter = 3)) : ($(".title").animate({ left: "+=100%" }, 550, "linear"), textCounter--), $("div.img-counter").text(textCounter + " / 3");
                });
        });
        var dimension = { x: window.innerWidth, y: window.innerHeight };
        $(window).resize(resize);
        var scaling = 1,
            widthIncrease = 1,
            heightIncrease = 1,
            prevHeight = window.innerHeight,
            prevWidth = window.innerWidth,
            hover_dist = 0.3;
        render();
    })
    
    return(
        <>
        </>
    )
}