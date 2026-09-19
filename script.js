const canvas = document.getElementById("asciiCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 500;
canvas.height = 500;

const size = 120;
const gap = 12;

let angle = 0;

let mouseX = 0;
let mouseY = 0;




window.addEventListener("mousemove", (event) => {

    mouseX =
        (event.clientX / window.innerWidth - 0.5);

    mouseY =
        (event.clientY / window.innerHeight - 0.5);

});



const points = [];




for (let x = -size; x <= size; x += gap) {

    for (let y = -size; y <= size; y += gap) {

        const nx = (x + size) / (size * 2);
        const ny = (y + size) / (size * 2);

        const letter =
            isS(nx, ny) || isH(nx, ny);


       

        points.push({
            x: x,
            y: y,
            z: size,
            letter
        });


       

        points.push({
            x: x,
            y: y,
            z: -size,
            letter
        });



        points.push({
            x: -size,
            y: y,
            z: -x,
            letter
        });


      

        points.push({
            x: size,
            y: y,
            z: x,
            letter
        });


        

        points.push({
            x: x,
            y: -size,
            z: -y,
            letter
        });


      

        points.push({
            x: x,
            y: size,
            z: y,
            letter
        });

    }
}




function isS(x, y) {

    return (

        (y > 0.15 &&
         y < 0.28 &&
         x > 0.15 &&
         x < 0.45)

        ||

        (y > 0.43 &&
         y < 0.57 &&
         x > 0.15 &&
         x < 0.45)

        ||

        (y > 0.72 &&
         y < 0.85 &&
         x > 0.15 &&
         x < 0.45)

        ||

        (x > 0.15 &&
         x < 0.28 &&
         y > 0.15 &&
         y < 0.50)

        ||

        (x > 0.32 &&
         x < 0.45 &&
         y > 0.50 &&
         y < 0.85)

    );

}




function isH(x, y) {

    return (

        (x > 0.55 &&
         x < 0.68 &&
         y > 0.15 &&
         y < 0.85)

        ||

        (x > 0.82 &&
         x < 0.95 &&
         y > 0.15 &&
         y < 0.85)

        ||

        (y > 0.43 &&
         y < 0.57 &&
         x > 0.55 &&
         x < 0.95)

    );

}



function animate() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );




    angle += 0.008;




    const mouseRotationY =
        mouseX * 0.6;

    const mouseRotationX =
        mouseY * 0.4;


    const rotationY =
        angle + mouseRotationY;

    const rotationX =
        mouseRotationX;


    const cosY = Math.cos(rotationY);
    const sinY = Math.sin(rotationY);

    const cosX = Math.cos(rotationX);
    const sinX = Math.sin(rotationX);


    const projected = [];


    points.forEach(point => {

      

        let x =
            point.x * cosY -
            point.z * sinY;

        let z =
            point.x * sinY +
            point.z * cosY;



        let y =
            point.y * cosX -
            z * sinX;

        z =
            point.y * sinX +
            z * cosX;


    

        const scale =
            500 / (500 + z);


        projected.push({

            x: 250 + x * scale,

            y: 250 + y * scale,

            z,

            letter: point.letter

        });

    });




    projected.sort(
        (a, b) => b.z - a.z
    );




    projected.forEach(point => {

        const depth =
            (point.z + size) /
            (size * 2);


        if (point.letter) {

            ctx.font = "12px monospace";

            ctx.fillStyle = "white";

        } else {

            ctx.font = "7px monospace";

            const opacity =
                0.15 +
                (1 - depth) * 0.4;

            ctx.fillStyle =
                `rgba(255,255,255,${opacity})`;

        }


        ctx.fillText(

            point.letter
                ? "#"
                : "·",

            point.x,
            point.y

        );

    });


    requestAnimationFrame(animate);

}


animate();