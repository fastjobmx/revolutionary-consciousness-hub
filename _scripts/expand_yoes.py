#!/usr/bin/env python3
"""Expande los Yoes incompletos y añade imágenes a todos los estudios."""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PATH = ROOT / "public" / "data" / "yoes.json"
data = json.loads(PATH.read_text())

# ---- Imágenes (héroe + secundaria opcional) por Yo
COVERS = {
    "yo-abatimiento-duelo": {
        "src": "/assets/yoes/yo-abatimiento.jpg",
        "alt": "Figura velada bajo un haz de luz dorada",
        "caption": "El abatimiento: la sombra que se posa cuando la luz se retira.",
    },
    "yo-conquistador": {
        "src": "/assets/yoes/yo-conquistador.jpg",
        "alt": "Figura enmascarada sosteniendo un cáliz dorado entre espejos",
        "caption": "El conquistador: máscaras que beben de la mirada ajena.",
    },
    "yo-relacion-toxica": {
        "src": "/assets/yoes/yo-relacion-toxica.jpg",
        "alt": "Dos manos unidas por una cadena dorada sobre seda oscura",
        "caption": "El vínculo tóxico: una cadena que se confunde con un anillo.",
    },
    "yo-machista": {
        "src": "/assets/yoes/yo-machista.jpg",
        "alt": "Busto clásico de mármol con una grieta dorada en el rostro",
        "caption": "El orgullo masculino: una estatua que ya empieza a quebrarse.",
    },
    "yo-miedo": {
        "src": "/assets/yoes/yo-miedo.jpg",
        "alt": "Figura solitaria al borde de un abismo iluminada por un haz dorado",
        "caption": "El miedo: el abismo ante el cual el Ser se reconoce.",
    },
    "preguntas-meditacion-reflexiva": {
        "src": "/assets/yoes/preguntas.jpg",
        "alt": "Libro antiguo abierto del que ascienden signos de interrogación dorados",
        "caption": "Cada pregunta abre una puerta; la meditación la cruza.",
    },
}

# ---- Contenidos extensos para los 3 Yoes que estaban cortos
EXTENDED = {
    "yo-machista": [
        {"type":"heading","level":2,"text":"Naturaleza del Yo Machista"},
        {"type":"paragraph","text":"El Yo Machista es un agregado psíquico antiquísimo que se nutre del orgullo de la propia masculinidad. Se manifiesta como una sensación de superioridad sobre la mujer, necesidad compulsiva de controlar, dominar, decidir, y como un sutil desprecio —a veces no tan sutil— hacia todo aquello que percibe como femenino, débil, vulnerable o sensible."},
        {"type":"paragraph","text":"Este yo está hondamente arraigado en la cultura, en la familia, en los modelos paternos heredados y en el lenguaje cotidiano. No basta con condenarlo intelectualmente ni con pronunciar discursos en su contra: hay que descubrirlo viviente en cada reacción, en cada palabra, en cada gesto, y comprenderlo en profundidad para que muera por sí mismo."},
        {"type":"quote","text":"El machismo no se vence con teorías. Se vence comprendiéndolo en uno mismo, instante por instante, hasta que la Madre Divina lo reduce a polvo cósmico."},
        {"type":"heading","level":2,"text":"Cómo se manifiesta"},
        {"type":"list","items":[
            "Necesidad de tener siempre la última palabra en presencia de una mujer.",
            "Burlas, ironías o chistes que rebajan lo femenino o lo ridiculizan.",
            "Celos posesivos disfrazados de protección o de amor.",
            "Incapacidad de mostrar ternura, llanto o vulnerabilidad sin sentir vergüenza.",
            "Decisiones unilaterales sobre dinero, hijos, hogar o tiempo de la pareja.",
            "Crítica sistemática a la pareja y exigencia de servicio doméstico no recíproco.",
            "Violencia verbal, psicológica, económica o física en sus formas más densas.",
            "Infidelidad como afirmación del propio valor masculino.",
            "Desprecio sutil hacia compañeros que se muestran sensibles o cuidadosos.",
        ]},
        {"type":"heading","level":2,"text":"Raíces profundas"},
        {"type":"paragraph","text":"El Yo Machista se forma a partir de la imitación temprana del padre, del abuelo, de los hermanos mayores y de las figuras culturales dominantes. Se refuerza con miles de pequeñas escenas en las que el niño aprende que ser hombre significa no llorar, no temer, no necesitar, no ceder. Esa coraza, construida durante años, se vuelve después una prisión de hierro."},
        {"type":"paragraph","text":"Bajo el machismo siempre encontramos miedo: miedo a ser herido, a no estar a la altura, a depender afectivamente, a parecer débil. El machismo es, en el fondo, un miedo armado."},
        {"type":"heading","level":2,"text":"Lo que destruye en el alma"},
        {"type":"list","items":[
            "Incapacita para amar verdaderamente: el otro nunca es igual, siempre es objeto.",
            "Bloquea la sensibilidad necesaria para percibir lo sutil, lo simbólico, lo divino.",
            "Cierra el centro emocional superior: lo que no se siente, no se conoce.",
            "Genera karma muy denso por las heridas causadas a la mujer y a los hijos.",
            "Aleja al hombre de su propia Madre Divina interna: nadie comprende a la Madre desde el desprecio a lo femenino.",
        ]},
        {"type":"practice","title":"Práctica de auto-observación","steps":[
            "Durante el día, observa cada vez que sientes la necesidad de imponerte sobre una mujer, de corregirla, de interrumpirla o de minimizar lo que siente.",
            "No te justifiques, no te condenes: solo observa con honestidad implacable.",
            "Por la noche, en retrospección, vuelve a vivir la escena en cámara lenta y pregúntate: ¿qué yo se manifestó allí? ¿con qué cara, con qué voz?",
            "Comprende profundamente el daño que ese yo ha causado y sigue causando.",
            "Suplica a la Divina Madre Kundalini desintegrar ese yo concreto, con su nombre, con su gesto, con su escena exacta.",
            "Repite el trabajo cada día sobre el mismo yo hasta que deje de manifestarse, y luego pasa al siguiente.",
        ]},
        {"type":"mantra","text":"Madre mía, desintegra en mí todo aquello que me hace creer superior a otro ser humano."},
        {"type":"heading","level":2,"text":"El hombre nuevo"},
        {"type":"paragraph","text":"A medida que el Yo Machista muere, surge en el hombre una fuerza nueva: la de quien no necesita dominar para sentirse hombre. Una masculinidad que protege sin oprimir, que decide sin imponer, que ama sin poseer. No es debilidad: es la verdadera fuerza, la del Padre Interior reflejada en la psiquis."},
        {"type":"paragraph","text":"Cuando el machismo cae, también cae mucho del sufrimiento doméstico, gran parte de la violencia social y un eslabón pesado de la cadena del karma familiar. Trabajar este yo no es solo un asunto personal: es un servicio profundo a la humanidad."},
        {"type":"quote","text":"Donde un hombre desintegra el yo machista, una casa se vuelve más habitable y una línea de descendencia se libera."},
    ],
    "yo-miedo": [
        {"type":"heading","level":2,"text":"Naturaleza del Yo del Miedo"},
        {"type":"paragraph","text":"El Miedo es uno de los yoes más antiguos y más densos de la psiquis humana. Paraliza la voluntad, distorsiona la percepción, contrae el cuerpo y mantiene al ser dormido bajo la sombra de un peligro que casi siempre es imaginario."},
        {"type":"paragraph","text":"Hay miedos físicos, miedos sociales, miedos psicológicos, miedos espirituales. Pero todos comparten una misma raíz: la identificación con el yo, con el cuerpo, con el nombre, con lo que se posee, con lo que se cree ser. Quien comprende en lo hondo que no es eso, deja gradualmente de temer."},
        {"type":"quote","text":"El miedo no se vence con valentía teatral, sino con comprensión: cuando se ve lo que es, deja de tener poder."},
        {"type":"heading","level":2,"text":"Formas del miedo"},
        {"type":"list","items":[
            "Miedo a perder lo que se tiene: dinero, pareja, salud, prestigio, posición.",
            "Miedo al qué dirán: dependencia enfermiza de la opinión ajena.",
            "Miedo a la soledad y al abandono.",
            "Miedo a la enfermedad, al dolor y a la muerte.",
            "Miedo al cambio, a lo desconocido, al fracaso, al éxito.",
            "Miedo espiritual: a las pruebas iniciáticas, a desintegrar el yo, a perder lo que uno cree ser.",
            "Fobias específicas (alturas, animales, multitudes, encierros) como cristalizaciones del mismo agregado.",
            "Miedo difuso, ansiedad sin objeto, ese fondo gris que muchos llaman 'mi carácter'.",
        ]},
        {"type":"heading","level":2,"text":"Cómo nos roba la vida"},
        {"type":"paragraph","text":"El miedo dicta decisiones: con quién nos casamos por miedo a la soledad, qué trabajo aceptamos por miedo a la pobreza, qué verdades callamos por miedo al rechazo, qué sueños abandonamos por miedo al ridículo. Vidas enteras transcurren obedeciendo a este yo sin que jamás se le mire de frente."},
        {"type":"paragraph","text":"En lo psicológico, el miedo crea un campo magnético que atrae justamente aquello que se teme. El que teme perder, pierde; el que teme enfermar, se enferma; el que teme no ser amado, repele al amor."},
        {"type":"heading","level":2,"text":"El miedo y el sendero"},
        {"type":"paragraph","text":"En la vida espiritual, el miedo aparece con rostros nuevos: miedo a las pruebas, miedo al trabajo con la Madre, miedo a entrar en el silencio profundo, miedo a salir del ego que durante tantos años nos ha dado falsa seguridad. Aquí el miedo es la última muralla del yo antes de morir."},
        {"type":"practice","title":"Práctica para enfrentar el miedo","steps":[
            "Identifica con claridad qué temes en este momento concreto de tu vida. Nómbralo.",
            "Siéntate en relajación profunda, suelta el cuerpo, suelta las emociones, suelta los pensamientos.",
            "Deja que el miedo aparezca sin combatirlo. Permítele estar.",
            "Obsérvalo como quien mira una nube pasar: no eres tú, es un yo que vive en ti.",
            "Pregúntate: ¿qué pierdo realmente si esto sucede? ¿Qué hay en mí que no puede perderse?",
            "Suplica al Padre Interior fuerza, y a la Madre Divina la desintegración del yo del miedo concreto que examinas.",
            "Vuelve a esta práctica cada vez que el miedo regrese, hasta que pierda su carga emocional.",
        ]},
        {"type":"mantra","text":"No soy el cuerpo, no soy el nombre, no soy lo que poseo. Soy el Ser, y el Ser no teme."},
        {"type":"heading","level":2,"text":"Lo que queda cuando el miedo se va"},
        {"type":"paragraph","text":"Cada vez que un yo del miedo es comprendido y desintegrado, una porción de Esencia se libera. Esa Esencia trae consigo serenidad, claridad, decisión. Se actúa sin ansiedad. Se ama sin agarrarse. Se enfrenta lo que hay que enfrentar con la naturalidad de quien ya no juega su existencia en cada situación."},
        {"type":"paragraph","text":"El valor verdadero no es ausencia de miedo: es la capacidad de actuar con sabiduría incluso en presencia del miedo, hasta que un día el miedo simplemente ya no aparece, porque el yo que lo producía ya no existe."},
        {"type":"quote","text":"Quien ya no teme perder, comienza a recibir. Quien ya no teme morir, comienza realmente a vivir."},
    ],
    "preguntas-meditacion-reflexiva": [
        {"type":"heading","level":2,"text":"Cómo trabajar con estas preguntas"},
        {"type":"paragraph","text":"No se trata de responder rápido ni intelectualmente. Toma una sola pregunta. Siéntate en relajación profunda. Repite la pregunta lentamente, deja que penetre, y permanece en silencio receptivo. La respuesta vendrá no como pensamiento, sino como comprensión viva."},
        {"type":"paragraph","text":"Una pregunta puede acompañarte días, semanas, años. Cada vez revelará un nivel más profundo de sí misma. La meditación reflexiva no busca conclusiones; busca contemplación."},
        {"type":"quote","text":"Quien sabe preguntar, ya está a medio camino de comprender."},
        {"type":"heading","level":2,"text":"Sobre el Ser"},
        {"type":"list","items":[
            "¿Quién soy yo, más allá del nombre, del cuerpo, de la historia?",
            "¿Qué hay en mí que no nació y no morirá?",
            "¿Existe algo permanente dentro de mí?",
            "¿De dónde vengo? ¿A dónde voy? ¿Para qué estoy aquí?",
            "¿Qué relación tengo con mi Padre Interior, con mi Madre Divina, con mi Real Ser?",
            "¿Qué impide que mi Ser se exprese plenamente a través de mí?",
            "Si todo lo que creo ser desapareciera mañana, ¿qué quedaría?",
        ]},
        {"type":"heading","level":2,"text":"Sobre los Yoes"},
        {"type":"list","items":[
            "¿Qué yo dominó mi conducta el día de hoy?",
            "¿Qué defecto se manifestó con más fuerza esta semana?",
            "¿Qué pierdo cada vez que ese yo se expresa?",
            "¿Qué ganaría si ese yo fuera comprendido y disuelto?",
            "¿Cuál es el yo más antiguo y más arraigado de mi psiquis?",
            "¿Qué yo me da más placer alimentar y por qué?",
            "¿Qué máscara uso ante los demás que ya no me reconozco sin ella?",
        ]},
        {"type":"heading","level":2,"text":"Sobre la vida cotidiana"},
        {"type":"list","items":[
            "¿Estoy presente en lo que hago, o vivo mecánicamente?",
            "¿Qué relaciones me ayudan a despertar y cuáles me adormecen?",
            "¿Cómo trato a quien no puede devolverme nada?",
            "¿Qué hago con el dinero, con el tiempo, con la palabra?",
            "Si supiera que muero mañana, ¿qué cambiaría hoy?",
            "¿Qué tarea repetitiva podría convertirse en práctica de atención plena?",
            "¿Estoy construyendo lo que valdrá en la hora de la muerte?",
        ]},
        {"type":"heading","level":2,"text":"Sobre las relaciones"},
        {"type":"list","items":[
            "¿Amo realmente, o necesito ser amado?",
            "¿Qué proyecto sobre los demás que en realidad es mío?",
            "¿A quién no he perdonado todavía y por qué?",
            "¿Qué deuda emocional, material o moral arrastro sin resolver?",
            "¿Qué estoy enseñando con mi conducta a quienes me observan?",
        ]},
        {"type":"heading","level":2,"text":"Sobre la muerte y el sentido"},
        {"type":"list","items":[
            "¿Cuál sería el sentido de mi vida si no existiera la muerte?",
            "¿Qué quiero llevar conmigo cuando deje el cuerpo?",
            "¿Qué queda de mí si me quitan todo lo que poseo?",
            "¿Estoy preparado para morir hoy, en paz, sin asuntos pendientes?",
            "¿Qué obra deseo dejar como verdadero legado?",
        ]},
        {"type":"heading","level":2,"text":"Sobre lo divino"},
        {"type":"list","items":[
            "¿Cuándo fue la última vez que sentí asombro real ante lo que existe?",
            "¿Cómo se manifiesta lo sagrado en mi vida cotidiana?",
            "¿Qué le pediría a mi Madre Divina si supiera que me escucha ahora mismo?",
            "¿Qué le ofrezco a mi Padre Interior con mi vida?",
            "¿Estoy dispuesto a entregar el yo a cambio del Ser?",
        ]},
        {"type":"practice","title":"Ritual diario sugerido","steps":[
            "Cada mañana, abre el libro al azar y toma una pregunta.",
            "Llévala contigo durante el día como un mantra silencioso.",
            "Cada vez que la mente se distraiga, vuelve a la pregunta sin forzar respuesta.",
            "Por la noche, escribe en pocas líneas qué has comprendido en este día sobre esa pregunta.",
            "Al cabo de una semana, relee tus apuntes: verás cómo la comprensión se ha movido.",
        ]},
        {"type":"mantra","text":"No busco respuestas: busco la pregunta verdadera, porque ella ya contiene la luz."},
        {"type":"paragraph","text":"Estas son apenas algunas puertas. La verdadera práctica es aprender a fabricar las propias preguntas, las que solo nacen de tu propia vida y solo pueden ser respondidas por tu propio Ser."},
    ],
}

def with_cover_and_inserts(content, cover, second_at=None):
    """Inserta imagen de portada al inicio (después del primer heading si existe)
    y opcionalmente otra imagen secundaria a mitad."""
    blocks = list(content)
    cover_block = {"type":"image", **cover}
    # Insert cover near the top (position 1 if first block is heading, else 0)
    insert_at = 1 if blocks and blocks[0].get("type") == "heading" else 0
    blocks.insert(insert_at, cover_block)
    if second_at:
        # Find a heading near the middle to insert a second decorative image
        mid = len(blocks) // 2
        # search forward for next heading
        for i in range(mid, len(blocks)):
            if blocks[i].get("type") == "heading":
                blocks.insert(i+1, {"type":"image", **second_at})
                break
    return blocks

SECONDARY = {
    "yo-abatimiento-duelo": {
        "src": "/assets/yoes/yo-abatimiento.jpg",
        "alt": "Atmósfera de recogimiento y duelo",
        "caption": "Toda pérdida abre, en algún punto, una puerta interior.",
    },
}

for y in data:
    # Reemplazar contenido extendido si aplica
    if y["id"] in EXTENDED:
        y["content"] = EXTENDED[y["id"]]
        y["status"] = "completo"
        y["missingSource"] = False
    cover = COVERS.get(y["id"])
    if cover:
        y["cover"] = cover  # campo opcional para futura portada
        y["content"] = with_cover_and_inserts(
            y["content"], cover,
            second_at=SECONDARY.get(y["id"])
        )

PATH.write_text(json.dumps(data, ensure_ascii=False, indent=2))
print("OK")
for y in data:
    print(f"  {y['id']}: {y['status']} ({len(y['content'])} bloques)")
