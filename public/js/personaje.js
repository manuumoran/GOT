const sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque")
const sectionReiniciar = document.getElementById("reiniciar")
const botonPersonaje = document.getElementById("boton-personaje")
const botonReiniciar = document.getElementById("boton-reiniciar")

const sectionSeleccionarPersonaje = document.getElementById("seleccionar-personaje")
const spanPersonajeJugador = document.getElementById("personaje-jugador")

const spanPersonajeEnemigo = document.getElementById("personaje-enemigo")

const spanVictoriasJugador = document.getElementById("victorias-jugador")
const spanVictoriasEnemigo = document.getElementById("victorias-enemigo")

const sectionMensajes = document.getElementById("resultado")
const sectionAtaquesJugador = document.getElementById("ataques-jugador")
const sectionAtaquesEnemigo = document.getElementById("ataques-enemigo")

const contenedorTarjetas = document.getElementById("contenedor-tarjetas")
const contenedorAtaques = document.getElementById("contenedor-ataques")
const contenedorSubtitulo = document.getElementById("subtitulo2")

const sectionVerMapa = document.getElementById("ver-mapa")
const mapa = document.getElementById("mapa")

let jugadorId = null
let enemigoId = null
let ataquesPersonajeEnemigo
let personajes = []
let personajesEnemigos = []
let opcionDePersonajes
let opcionSubtitulo
let opcionDeAtaques
let ataqueJugador = []
let ataqueEnemigo = []
let inputArya 
let inputTyrion
let inputDaenerys 
let inputNightKing 
let inputJaime 
let inputJon
let personajeJugadorObjeto
let botonFuego
let botonAgua
let botonTierra
let botones = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let personajeJugador
let victoriasJugador = 0
let victoriasEnemigo = 0
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
mapaBackground.src = "./assets/fondoGOT.jpg"
let alturaQueBuscamos
let anchoDelMapa = window.innerWidth - 20
const anchoMaximoDelMapa = 350

if (anchoDelMapa > anchoMaximoDelMapa) {
    anchoDelMapa = anchoMaximoDelMapa - 20
}

alturaQueBuscamos = anchoDelMapa * 600 / 800

mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos


class Personaje {
    constructor(nombre, foto, tipo, fotoMapa, x, y, nombreCompleto, id = null) {
        this.id = id
        this.nombre = nombre
        this.foto = foto
        this.tipo = tipo
        this.ataques = []
        this.ancho = 40
        this.alto = 40
        this.x = x
        this.y = y
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
        this.nombreCompleto = nombreCompleto
    }

    pintarPersonaje() {
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}



let arya = new Personaje("Arya", "./assets/arya.png", "Agua", "./assets/aryaCabeza.png", 220, 80, "Arya Stark")

let tyrion = new Personaje("Tyrion", "./assets/tyrion.png", "Tierra", "./assets/tyrionCabeza.png", 85, 35, "Tyrion Lannister")

let daenerys = new Personaje("Daenerys", "./assets/daenerys.png", "Fuego", "./assets/daenerysCabeza.png", 90, 110,  "Daenerys Targaryen")

let nightKing = new Personaje("NightKing", "./assets/nightKing.png", "Agua", "./assets/nightKingCabeza.png", 300, 40, "Night King")

let jaime = new Personaje("Jaime", "./assets/jaime.png", "Tierra", "./assets/jaimeCabeza.png", 110, 45, "Jaime Lannister")

let jon = new Personaje("Jon", "./assets/jon.png", "Fuego", "./assets/jonCabeza.png", 280, 100, "Jon snow")


const ARYA_ATAQUES = [
    { nombre: "💧", id: "boton-agua" },

    { nombre: "💧", id: "boton-agua" },

    { nombre: "💧", id: "boton-agua" },

    { nombre: "🔥", id: "boton-fuego" },

    { nombre: "🌱", id: "boton-tierra" }
]

arya.ataques.push(...ARYA_ATAQUES)

const TYRION_ATAQUES = [
    { nombre: "🌱", id: "boton-tierra" },
    { nombre: "🌱", id: "boton-tierra" },
    { nombre: "🌱", id: "boton-tierra" },
    { nombre: "💧", id: "boton-agua" },
    { nombre: "🔥", id: "boton-fuego" }
]

tyrion.ataques.push(...TYRION_ATAQUES)

const DAENERYS_ATAQUES = [
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "💧", id: "boton-agua" },
    { nombre: "🌱", id: "boton-tierra" }
]

daenerys.ataques.push(...DAENERYS_ATAQUES)

const NIGHTKING_ATAQUES = [
    { nombre: "💧", id: "boton-agua" },
    { nombre: "💧", id: "boton-agua" },
    { nombre: "💧", id: "boton-agua" },
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "🌱", id: "boton-tierra" }
]

nightKing.ataques.push(...NIGHTKING_ATAQUES)

const JAIME_ATAQUES = [
    { nombre: "🌱", id: "boton-tierra" },
    { nombre: "🌱", id: "boton-tierra" },
    { nombre: "🌱", id: "boton-tierra" },
    { nombre: "💧", id: "boton-agua" },
    { nombre: "🔥", id: "boton-fuego" }
]

jaime.ataques.push(...JAIME_ATAQUES)

const JON_ATAQUES = [
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "🔥", id: "boton-fuego" },
    { nombre: "💧", id: "boton-agua" },
    { nombre: "🌱", id: "boton-tierra" }
]

jon.ataques.push(...JON_ATAQUES)

personajes.push(arya ,tyrion ,daenerys, nightKing, jaime, jon)


function iniciarJuego() {
    sectionSeleccionarAtaque.style.display = "none"
    sectionVerMapa.style.display = "none"

    personajes.forEach((personaje) => {
        opcionDePersonajes = `
        <input type="radio" name="personaje" id=${personaje.nombre} />
        <label class="tarjeta-de-personaje" for=${personaje.nombre}>
            <p>${personaje.nombreCompleto}</p>
            <img src=${personaje.foto} alt=${personaje.nombre}>
        </label>
        `
        contenedorTarjetas.innerHTML += opcionDePersonajes

        inputArya = document.getElementById("Arya")
        inputTyrion = document.getElementById("Tyrion")
        inputDaenerys = document.getElementById("Daenerys")
        inputNightKing = document.getElementById("NightKing")
        inputJaime = document.getElementById("Jaime")
        inputJon = document.getElementById("Jon")
    })

    sectionReiniciar.style.display = "none"
 
    botonPersonaje.addEventListener("click", seleccionarPersonajeJugador)
    
    botonReiniciar.addEventListener("click", reiniciarJuego)

    unirseAlJuego()
}

function unirseAlJuego() {
    fetch(`https://got-ebon.vercel.app/unirse`)
        .then(function (res) {
            if (res.ok) {
                res.text()
                    .then(function (respuesta) {
                        console.log(respuesta)
                        jugadorId = respuesta
                    })
            }
        })
}

function seleccionarPersonajeJugador() {
    // let imagen

    if (inputArya.checked == true) {
        spanPersonajeJugador.innerHTML = inputArya.id
        personajeJugador = inputArya.id
    } else if (inputTyrion.checked == true) {
        spanPersonajeJugador.innerHTML = inputTyrion.id
        personajeJugador = inputTyrion.id
    } else if (inputDaenerys.checked == true) { 
        spanPersonajeJugador.innerHTML = inputDaenerys.id
        personajeJugador = inputDaenerys.id
    } else if (inputNightKing.checked == true) {
        spanPersonajeJugador.innerHTML = inputNightKing.id
        personajeJugador = inputNightKing.id
    } else if (inputJaime.checked == true) { 
        spanPersonajeJugador.innerHTML = inputJaime.id
        personajeJugador = inputJaime.id
    } else if (inputJon.checked == true) { 
        spanPersonajeJugador.innerHTML = inputJon.id
        personajeJugador = inputJon.id
    } else {
        alert("No has seleccionado ningun personaje")
        return
    }

    seleccionarPersonaje(personajeJugador)
    sectionVerMapa.style.display = "flex"
    opcionSubtitulo = `Recorre el mapa con ${personajeJugador}`
    contenedorSubtitulo.innerHTML += opcionSubtitulo
    iniciarMapa()
    sectionSeleccionarPersonaje.style.display = "none"
    extraerAtaques(personajeJugador)
}

function seleccionarPersonaje(personajeJugador) {
    fetch(`https://got-ebon.vercel.app/personaje/${jugadorId}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            personaje: personajeJugador
        })
    })
}

function extraerAtaques(personajeJugador) {
    let ataques

    for (let i = 0; i < personajes.length; i++) {
        if (personajeJugador === personajes[i].nombre) {
            ataques = personajes[i].ataques
        }
    }
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques) {
    ataques.forEach((ataque) => {
        opcionDeAtaques = `
        <button id=${ataque.id} class="boton-ataque BAtaque">${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += opcionDeAtaques
    })

    botonFuego = document.getElementById("boton-fuego")
    botonAgua = document.getElementById("boton-agua")
    botonTierra = document.getElementById("boton-tierra")

    botones = document.querySelectorAll(".BAtaque")
}

function secuenciaAtaque() { 
    botones.forEach((boton) => {
        boton.addEventListener("click", (e) => {
            if (e.target.textContent === "🔥") {
                ataqueJugador.push("🔥")
                boton.style.background = "#112f58"
                boton.disabled = true
            } else if (e.target.textContent === "💧") {
                ataqueJugador.push("💧")
                boton.style.background = "#112f58"
                boton.disabled = true
            } else {
                ataqueJugador.push("🌱")
                boton.style.background = "#112f58"
                boton.disabled = true
            }
            if (ataqueJugador.length === 5) {
                enviarAtaques(ataqueJugador)                
            }
        })
    })
}

function enviarAtaques(){
    fetch(`https://got-ebon.vercel.app/personaje/${jugadorId}/ataques`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ataques: ataqueJugador
        })
    })

    intervalo = setInterval(obtenerAtaques, 50  )
}

function obtenerAtaques() {
    fetch(`https://got-ebon.vercel.app/personaje/${enemigoId}/ataques`)
        .then(function (res) {
            if (res.ok) {
                res.json()
                    .then(function ({ataques}) {
                        if (ataques.length === 5) {
                            ataqueEnemigo = ataques
                            batalla()
                        }
                    })
            }
        })
}

function seleccionarPersonajeEnemigo(enemigo) {
    // spanPersonajeEnemigo.innerHTML = `<img src=${enemigo.foto} alt=${enemigo.nombre}>`
    spanPersonajeEnemigo.innerHTML = enemigo.nombre
    ataquesPersonajeEnemigo = enemigo.ataques
    secuenciaAtaque()
}

function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(0, ataquesPersonajeEnemigo.length -1)

    ataqueEnemigo.push(ataquesPersonajeEnemigo[ataqueAleatorio].nombre)
  
    iniciarPelea()
}

function iniciarPelea() {
     if (ataqueJugador.length === 5 && ataqueEnemigo.length === 5) {
        batalla()
     }
}

function indexAmbosOponentes(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function batalla() {
    clearInterval(intervalo)

    for (let i = 0; i < ataqueJugador.length; i++) {
        if (ataqueJugador[i] === ataqueEnemigo[i]) {
            indexAmbosOponentes(i, i)
            crearMensaje("EMPATASTE")
        } else if (ataqueJugador[i] === "🔥" && ataqueEnemigo[i] === "🌱" || ataqueJugador[i] === "🌱" && ataqueEnemigo[i] === "💧" || ataqueJugador[i] === "💧" && ataqueEnemigo[i] === "🔥") {
            indexAmbosOponentes(i, i)
            crearMensaje("GANASTE")
            victoriasJugador ++
            spanVictoriasJugador.innerHTML = victoriasJugador + " V"
        } else {
            indexAmbosOponentes(i, i)
            crearMensaje("PERDISTE")
            victoriasEnemigo ++
            spanVictoriasEnemigo.innerHTML = victoriasEnemigo + " V"
        }
    }
    
    revisarVictorias()
}

function revisarVictorias() {
    if (victoriasJugador > victoriasEnemigo) {
        crearMensajeFinal("GANASTE")
    } else if (victoriasEnemigo > victoriasJugador) {
        crearMensajeFinal("PERDISTE")
    } else {
        crearMensajeFinal("EMPATASTE")
    }
}

function crearMensaje(resultado) {
    let nuevoAtaqueJugador = document.createElement("p")
    let nuevoAtaqueEnemigo = document.createElement("p")
    let resultadoJugador = ""
    let resultadoEnemigo = ""

    if (resultado == "EMPATASTE"){
        resultadoJugador = "🟡"
        resultadoEnemigo = "🟡"
    } else if (resultado == "GANASTE"){
        resultadoJugador = "✅"
        resultadoEnemigo = "❌"
    } else {
        resultadoJugador = "❌"
        resultadoEnemigo = "✅"
    }

    nuevoAtaqueJugador.innerHTML = indexAtaqueJugador + resultadoJugador
    nuevoAtaqueEnemigo.innerHTML = indexAtaqueEnemigo + resultadoEnemigo

    sectionAtaquesJugador.appendChild(nuevoAtaqueJugador)
    sectionAtaquesEnemigo.appendChild(nuevoAtaqueEnemigo)
}

function crearMensajeFinal(resultadoFinal) {
    sectionMensajes.innerHTML = "GAME OVER - " + resultadoFinal

    sectionReiniciar.style.display = "block"
}

function reiniciarJuego() {
    location.reload()
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function pintarCanvas() {        
    personajeJugadorObjeto.x += personajeJugadorObjeto.velocidadX
    personajeJugadorObjeto.y += personajeJugadorObjeto.velocidadY
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    personajeJugadorObjeto.pintarPersonaje()

    enviarPosicion(personajeJugadorObjeto.x, personajeJugadorObjeto.y)
    
    personajesEnemigos.forEach(function(personaje) {
        if (personaje != undefined){
            personaje.pintarPersonaje()
            revisarColision(personaje)
            detenerEnBordesDelMapa()
        }
    })
}

function enviarPosicion(x, y) {
    fetch(`https://got-ebon.vercel.app/personaje/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },  
        body: JSON.stringify({
            x,
            y
        })
    })
    .then(function (res) {
        if (res.ok) {
            res.json()
                .then(function({enemigos}) {
                    console.log(enemigos)
                    personajesEnemigos = enemigos.map(function (enemigo) {
                        let personajeEnemigo = null
                        if (enemigo.personaje != undefined) {
                            const personajeNombre = enemigo.personaje.nombre || ""
                            if (personajeNombre === "Arya") {
                                personajeEnemigo = new Personaje("Arya", "./assets/arya.png", "Agua", "./assets/aryaCabeza.png", 220, 80, "Arya Stark", enemigo.id)
                            } else if (personajeNombre === "Tyrion") {
                                personajeEnemigo = new Personaje("Tyrion", "./assets/tyrion.png", "Tierra", "./assets/tyrionCabeza.png", 85, 35, "Tyrion Lannister", enemigo.id)
                            } else if (personajeNombre === "Daenerys") {
                                personajeEnemigo = new Personaje("Daenerys", "./assets/daenerys.png", "Fuego", "./assets/daenerysCabeza.png", 90, 110, "Daenerys Targaryen", enemigo.id)
                            } else if (personajeNombre === "NightKing") {
                                personajeEnemigo = new Personaje("NightKing", "./assets/nightKing.png", "Agua", "./assets/nightKingCabeza.png", 300, 40, "Night King", enemigo.id)
                            } else if (personajeNombre === "Jaime") {
                                personajeEnemigo = new Personaje("Jaime", "./assets/jaime.png", "Tierra", "./assets/jaimeCabeza.png", 110, 45, "Jaime Lannister", enemigo.id)
                            } else if (personajeNombre === "Jon") {
                                personajeEnemigo = new Personaje("Jon", "./assets/jon.png", "Fuego", "./assets/jonCabeza.png", 280, 100, "Jon Snow", enemigo.id)
                            }

                            personajeEnemigo.x = enemigo.x 
                            personajeEnemigo.y = enemigo.y 

                            return personajeEnemigo
                        }
                    })
                })
        }
    })
}

function moverDerecha() {
    personajeJugadorObjeto.velocidadX = 5
}

function moverIzquierda() {
    personajeJugadorObjeto.velocidadX = -5
}

function moverAbajo() {
    personajeJugadorObjeto.velocidadY = 5
}

function moverArriba() {
    personajeJugadorObjeto.velocidadY = -5
}

function detenerMovimiento() {
        personajeJugadorObjeto.velocidadX = 0
        personajeJugadorObjeto.velocidadY = 0
}

function detenerEnBordesDelMapa() {
    // Verificar si los personajes ya llegaron al borde del mapa
  
    const arribaMapa = 0
    const abajoMapa = mapa.height - personajeJugadorObjeto.alto
    const derechaMapa = mapa.width
    const izquierdaMapa = 0
  
    const arribaJugador = personajeJugadorObjeto.y
    const derechaJugador = personajeJugadorObjeto.x + personajeJugadorObjeto.ancho
    const izquierdaJugador = personajeJugadorObjeto.x
  
    if (arribaJugador < arribaMapa) {
      personajeJugadorObjeto.y = arribaMapa
    }
  
    if (arribaJugador > abajoMapa) {
      personajeJugadorObjeto.y = abajoMapa
    }
  
    if (derechaJugador > derechaMapa) {
      personajeJugadorObjeto.x = derechaMapa - personajeJugadorObjeto.ancho
    }
  
    if (izquierdaJugador < izquierdaMapa) {
      personajeJugadorObjeto.x = izquierdaMapa
    }
}

function sePresionoUnaTecla(event) {
    switch (event.key) {
        case "ArrowUp":
        case "w":
            moverArriba()            
            break
        case "ArrowLeft":
        case "a":
            moverIzquierda()
            break
        case "ArrowDown":   
        case "s":
            moverAbajo()
            break
        case "ArrowRight":
        case "d":
            moverDerecha()
            break
    }
}

function iniciarMapa() {
    personajeJugadorObjeto = obtenerPersonajeJugador(personajeJugador) 

    console.log(personajeJugadorObjeto, personajeJugador);

    intervalo = setInterval(pintarCanvas, 50)

    window.addEventListener("keydown", sePresionoUnaTecla)

    window.addEventListener("keyup", detenerMovimiento)
}

function obtenerPersonajeJugador() {
    for (let i = 0; i < personajes.length; i++) {
        if (personajeJugador === personajes[i].nombre) {
            return personajes[i]
        }        
    }
}

function revisarColision(enemigo) {
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x 

    const arribaPersonaje = personajeJugadorObjeto.y +25
    const abajoPersonaje = personajeJugadorObjeto.y + personajeJugadorObjeto.alto -25
    const derechaPersonaje = personajeJugadorObjeto.x + personajeJugadorObjeto.ancho -25
    const izquierdaPersonaje = personajeJugadorObjeto.x +25

    if (
       abajoPersonaje < arribaEnemigo ||
       arribaPersonaje > abajoEnemigo ||
       derechaPersonaje < izquierdaEnemigo ||
       izquierdaPersonaje > derechaEnemigo
    ) {
        return
    }

    if(enemigo.x == undefined || enemigo.y == undefined){
        return
    }
    
    detenerMovimiento()
    clearInterval(intervalo)

    enemigoId = enemigo.id
    sectionVerMapa.style.display = "none"
    sectionSeleccionarAtaque.style.display = "flex"
    seleccionarPersonajeEnemigo(enemigo)
}

window.addEventListener("load", iniciarJuego)


// PROCEDIMIENTO PARA MOSTRAR LA Personaje DEL JUGADOR EN IMAGEN
    // personajes.forEach((personaje) => {
    //     if (personajeJugador == personaje.nombre) {
    //         imagen = personaje.foto
    //     }   
    // })
    // spanPersonajeJugador.innerHTML = personajeJugador + `<img src=${imagen} alt=${personajeJugador}>`

// FUNCION PARA MOSTRAR LA Personaje DEL ENEMIGO EN IMAGEN
// function seleccionarMascotaEnemigo() {
//     let mascotaAleatoria = aleatorio(0, personajes.length -1)
//     spanMascotaEnemigo.innerHTML = `<img src=${personajes[mascotaAleatoria].foto} alt=${personajes[mascotaAleatoria].nombre}>`
// }