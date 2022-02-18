Pts.namespace( window );

var mediums = document.getElementById("mediums")
const cs = getComputedStyle(mediums)
var canvas
const dotRadius = 5;
const halfPi = Math.PI / 2;
const black = Color.rgb(0, 0, 0)
const lineWidth = 3;
const accent = Color.rgb(35, 110, 248);
const peakHeight = 100;
function triFace(a, b, peak, color) {
    var u1 = a.x - peak.x
    var u2 = b.x - peak.x
    if (u1 / Math.sqrt((u1 ** 2) + (a.y - peak.y) ** 2) >= (u2 / Math.sqrt((u2 ** 2) + (b.y - peak.y) ** 2))) {
        form.fill(color).line([a, peak, b])
    }
}

function easeOutSine(x) {
    return Math.sin(x * halfPi);
}

const body = document.body;
const topButton = document.getElementById("to-top")
function toTop() {
    scroll(0, 0)
}

window.addEventListener('scroll', (() => {
    if (document.documentElement.scrollTop < 100) {
        topButton.innerText = ""
        topButton.style = 'width: 0px; padding: 0px; height: 0px'
    } else {
        topButton.style = ''
        topButton.innerText = "Back to top"
    }
}))
if (document.documentElement.scrollTop < 100) {
    topButton.innerText = ""
    topButton.style = 'width: 0px; padding: 0px; height: 0px'
} else {
    topButton.style = ''
    topButton.innerText = "Back to top"
}

function render() {
    if (canvas) {
        mediums.removeChild(canvas)
        canvas = null
    }
    canvas = document.createElement("canvas")
    canvas.id = "thumbnail"
    mediums.appendChild(canvas)
    const width = parseInt(cs.getPropertyValue('width'), 10)
    const height = parseInt(cs.getPropertyValue('height'), 10)
    const halfWidth = width / 2;
    const yRadius = 40;
    const halfHeight = height / 2;
    console.log(width)
    var run = Pts.quickStart( "#thumbnail", "#fff" );
    const radius = 100;
    
    const speed = 0.001;

    run( (time, ftime) => {
        let si = Math.sin(time / 1000);
        let s = Math.abs(si)
        si = easeOutSine(s) * si / s
        const peak = new Pt(halfWidth, halfHeight - peakHeight * si)
        const angle = time * speed;
        let ax = Math.cos(angle) * radius;
        let ay = Math.sin(angle) * yRadius;
        const b1 = new Pt(halfWidth + ax, halfHeight + ay * si);
        const b2 = new Pt(halfWidth - ax, halfHeight - ay * si)
        let bx = Math.cos(angle + halfPi) * radius;
        let by = Math.sin(angle + halfPi) * yRadius;
        const b3 = new Pt(halfWidth + bx, halfHeight + by * si)
        const b4 = new Pt(halfWidth - bx, halfHeight - by * si)
        triFace(b1, b3, peak, black);
        triFace(b3, b2, peak, black);
        triFace(b2, b4, peak, black);
        triFace(b4, b1, peak, black);
        triFace(b3, b1, peak, accent);
        triFace(b2, b3, peak, accent);
        triFace(b4, b2, peak, accent);
        triFace(b1, b4, peak, accent);
    });
}

window.addEventListener("resize", render);
render();

//terminal effect
const topTerminal = document.getElementById("top-terminal")
const sizer = document.getElementById("sizer")

var typed3 = new Typed('#top-terminal', {
    strings: ["From mobile to <h1 class='accent'>desktop</h1>^1600", "From desktop to <h1 class='accent'>mobile</h1>^1600"],
    typeSpeed: 30,
    backSpeed: 10,
    smartBackspace: true, // this is a default
    loop: true,
    showCursor: false,
    onStringTyped: (arrayPos, self) => {
        if (arrayPos === 1) {
            sizer.classList.add('desktop')
            sizer.offsetWidth; 
            sizer.classList.remove('mobile')
        } else {
            sizer.classList.add('mobile')
            sizer.offsetWidth;
            sizer.classList.remove('desktop')
        }
    }
});

