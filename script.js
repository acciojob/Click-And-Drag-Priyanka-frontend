const container = document.getElementById("items");
const cubes = document.querySelectorAll(".item");

let activeCube = null;
let offsetX = 0;
let offsetY = 0;

cubes.forEach((cube) => {

    cube.addEventListener("mousedown", (e) => {
        activeCube = cube;

        const cubeRect = cube.getBoundingClientRect();

        offsetX = e.clientX - cubeRect.left;
        offsetY = e.clientY - cubeRect.top;

        cube.classList.add("dragging");

        // Convert grid item to absolute position
        const containerRect = container.getBoundingClientRect();

        cube.style.position = "absolute";
        cube.style.left =
            cubeRect.left - containerRect.left + "px";
        cube.style.top =
            cubeRect.top - containerRect.top + "px";
    });
});

document.addEventListener("mousemove", (e) => {
    if (!activeCube) return;

    const containerRect = container.getBoundingClientRect();

    let newLeft =
        e.clientX - containerRect.left - offsetX;

    let newTop =
        e.clientY - containerRect.top - offsetY;

    // Boundary constraints
    const maxLeft =
        container.clientWidth - activeCube.offsetWidth;

    const maxTop =
        container.clientHeight - activeCube.offsetHeight;

    newLeft = Math.max(0, Math.min(newLeft, maxLeft));
    newTop = Math.max(0, Math.min(newTop, maxTop));

    activeCube.style.left = `${newLeft}px`;
    activeCube.style.top = `${newTop}px`;
});

document.addEventListener("mouseup", () => {
    if (activeCube) {
        activeCube.classList.remove("dragging");
        activeCube = null;
    }
});