# Documento Informativo Del Proyecto FestiVAL

[**1\. Presentación del proyecto	2**](#presentación-del-proyecto)

[**2\. Objetivo principal	2**](#objetivo-principal)

[**3\. Qué ofrece la página	3**](#qué-ofrece-la-página)

[**4\. Enfoque del producto	3**](#enfoque-del-producto)

[**5\. Público objetivo	3**](#público-objetivo)

[**6\. Catálogo actual de festivales	3**](#catálogo-actual-de-festivales)

[**7\. Secciones principales de la web	3**](#secciones-principales-de-la-web)

[**8\. Características actuales	3**](#características-actuales)

[**9\. Posicionamiento del proyecto	3**](#posicionamiento-del-proyecto)

[**10\. Visión futura	3**](#visión-futura)

1. # Presentación del proyecto {#presentación-del-proyecto}

   TuriaFest es una aplicación web desarrollada con Angular que constituye un portal de información dedicado a los principales festivales de música de la Comunidad Valenciana, abarcando las provincias de Valencia, Alicante y Castellón.
     
   El presente proyecto tiene como finalidad ofrecer a los usuarios un punto de consulta centralizado donde descubrir festivales y acceder a información relativa a fechas de celebración, ubicaciones, géneros musicales, carteles de artistas, precios de partida y enlaces oficiales.

2. # Objetivo principal {#objetivo-principal}

El objetivo principal de TuriaFest es centralizar en un único portal web toda la información relevante sobre los principales festivales de música de la Comunidad Valenciana (Valencia, Alicante y Castellón), de modo que el usuario pueda descubrir festivales y comparar con rapidez fechas, ubicaciones, géneros musicales, carteles de artistas y precios de partida antes de decidir a cuál asistir.

En términos más concretos, el proyecto persigue resolver una necesidad específica: la del aficionado a la música de la Comunidad Valenciana que, habitualmente desde un dispositivo móvil, desea determinar qué festival se ajusta mejor a sus preferencias durante la temporada estival, sin necesidad de consultar múltiples fuentes dispersas.

Cabe subrayar dos rasgos que delimitan este objetivo:

* **Carácter estrictamente informativo**: el portal no comercializa entradas ni actúa como intermediario; dirige al usuario a los canales oficiales de cada festival.  
* **Acceso libre**: en su primera fase no requiere registro ni autenticación, priorizando la inmediatez de la consulta.


  




3. # Qué ofrece la página {#qué-ofrece-la-página}

**TuriaFest** ofrece al usuario un servicio de consulta integral sobre los festivales de música de la Comunidad Valenciana, articulado en las siguientes funcionalidades:

### **Contenido informativo**

Para cada festival del catálogo (Bigsound, Latin Fest, Medusa, Reggaeton Beach Festival, Reve, Zevra…), el portal proporciona:

* Fechas de celebración, con formato en español («12 – 16 jul 2026»)  
* **Ubicación**: provincia, ciudad y coordenadas del recinto  
* **Géneros musicales** (indie, electrónica, reguetón, música latina…)  
* **Cartel de artistas**, ordenado por relevancia, desde cabezas de cartel hasta artistas emergentes  
* **Precio de partida** de las entradas, en euros  
* **Enlace oficial** del festival, para la compra de entradas en los canales legítimos

  ### **Vistas y herramientas de exploración**

* **Página de inicio** con festivales destacados en un carrusel  
* **Listado completo con filtros** por provincia, mes y género musical  
* **Ficha de detalle** de cada festival, con acceso al cartel completo  
* **Calendario cronológico** que ordena los festivales día a día  
* **Mapa interactivo** con la ubicación de los recintos  
* **Perfiles de artistas**  
* **Listados por provincia** (Valencia, Alicante, Castellón)  
* **Búsqueda difusa** por nombre de festival o cabeza de cartel, tolerante a erratas y tildes

  ### **Cualidades de la experiencia**

* **Diseño adaptable** a cualquier dispositivo, con especial atención al uso móvil  
* **Tema claro y oscuro**, seleccionable o ajustado automáticamente al sistema  
* **Accesibilidad** conforme al estándar WCAG 2.1 AA  
* **Privacidad**: sin cookies de seguimiento, sin banner de consentimiento y sin necesidad de registro  
* **Rapidez de carga**, gracias al renderizado en servidor y a la carga diferida de secciones

En síntesis: la página ofrece **todo lo necesario para decidir a qué festival asistir** —comparar fechas, precios, carteles y ubicaciones— en un único lugar, de forma gratuita, rápida y sin barreras de acceso.

# 

4. # Enfoque del producto {#enfoque-del-producto}

### **1\. Posicionamiento**

El festival se posiciona como la referencia informativa especializada en festivales de música de la Comunidad Valenciana. Su enfoque es deliberadamente vertical y territorial: en lugar de competir con agregadores generalistas de eventos de ámbito nacional o internacional, concentra todo su valor en un nicho geográfico y temático concreto, lo que le permite ofrecer un catálogo curado, exhaustivo y actualizado temporada a temporada.

### **2\. Propuesta de valor**

La propuesta de valor se resume en una idea: reducir el coste de decisión del usuario. Hoy, quien desea elegir un festival debe consultar múltiples webs oficiales, redes sociales y portales de venta, cada uno con formatos distintos. festival unifica esa información dispersa en fichas homogéneas y comparables —fechas, precios de partida, carteles, ubicación— para que la decisión se tome en minutos, no en horas.

### **3\. Usuario objetivo**

El producto se diseña para un perfil claramente definido: el aficionado a la música residente en la Comunidad Valenciana (o visitante estival) que planifica su asistencia a festivales, principalmente desde el móvil. Esta premisa condiciona el diseño: prioridad absoluta a la experiencia móvil, tiempos de carga mínimos y navegación directa sin fricciones.

### **4\. Principios rectores**

* Informativo, no transaccional: el portal no vende entradas ni intermedia; deriva siempre a los canales oficiales. Ello preserva su neutralidad editorial y la confianza del usuario.  
* **Acceso sin barreras**: sin registro, sin cookies de seguimiento, sin muros de consentimiento. El contenido es inmediato.  
* **Curación editorial**: el catálogo no se nutre de volcados automáticos, sino de datos verificados y mantenidos por un equipo editorial, con una voz y un estilo propios en español.  
* **Calidad técnica como ventaja competitiva**: rendimiento (Core Web Vitals), accesibilidad (WCAG 2.1 AA) y posicionamiento en buscadores (URLs en español, datos estructurados) se tratan como atributos del producto, no como detalles técnicos. La captación de usuarios descansa en gran medida en el SEO orgánico.  
* **Identidad local**: URLs en español, formato de fechas español y, en la hoja de ruta, el valenciano como lengua propia del territorio.

### 

  ### **5\. Estrategia de crecimiento**

El enfoque evolutivo es incremental y por fases: consolidar primero el valor informativo (MVP), fidelizar después mediante personalización (favoritos, PWA instalable), y solo entonces incorporar capas de comunidad (cuentas, valoraciones) e integraciones externas (Spotify, ticketing). Cada fase se apoya en la anterior sin comprometer la simplicidad del núcleo: consultar debe seguir siendo instantáneo aunque el producto crezca.

# 

5. # Público objetivo {#público-objetivo}

   ### **1\. Perfil principal**

El público objetivo primario de TuriaFest es el aficionado a la música residente en la Comunidad Valenciana, con edad comprendida aproximadamente entre los 18 y los 35 años, que asiste o planea asistir a festivales durante la temporada estival. Sus rasgos definitorios son:

* **Consulta desde el móvil**: planificar su ocio desde el smartphone, a menudo en momentos breves (transporte, descansos), por lo que exige inmediatez y claridad.  
* **Compara antes de decidir**: valora fechas, precio de partida, cartel y distancia al recinto antes de comprometerse con una entrada.  
* **Consume en español**: busca en Google en castellano («festivales Valencia 2026», «cartel Medusa»), razón por la cual las URLs y el contenido del portal se mantienen en dicho idioma.  
* **Sensible al género musical**: su decisión pivota sobre estilos concretos —electrónica, reguetón, indie, música latina—, de ahí la importancia de los filtros por género.

  ### **2\. Perfiles secundarios**

* **Visitantes de otras comunidades autónomas**: asistentes de fuera de la región atraídos por festivales de gran formato (Medusa, Reggaeton Beach Festival), que necesitan además contexto de ubicación —de ahí el mapa interactivo y los listados por provincia.  
* **Turistas internacionales**: público extranjero, especialmente británico, que combina vacaciones en la costa alicantina o valenciana con la asistencia a festivales. Este segmento justifica la futura versión en inglés (`en-GB`) prevista en la hoja de ruta.  
* **Público valenciano hablante**: usuarios que prefieren consultar en valenciano, atendidos en la fase multilingüe mediante el locale `ca-ES-valencia`.  
* **Grupos y planificadores**: quien organiza la asistencia de un grupo de amigos y comparte enlaces —de ahí la relevancia de URLs legibles y compartibles (`/festivales/medusa`).

6. # Catálogo actual de festivales {#catálogo-actual-de-festivales}

   ## **Catálogo actual de festivales**

El catálogo inicial de TuriaFest comprende seis festivales, cuyos datos —verificados por última vez el 14 de junio de 2026— residen en los ficheros festival-detail-\*.json del directorio [public/](https://claude.ai/epitaxy/public/). Se describen a continuación.

* **Bigsound Festival**. Se celebra en la ciudad de Valencia. Su género principal es el pop, con presencia de indie y electrónica. El precio de las entradas parte de 55 euros, sin gastos de gestión incluidos. El acceso se permite desde los 16 años, con autorización paterna para los menores de 18\.


* **Latin Fest**. Tiene lugar igualmente en Valencia y está dedicado a la música latina, el reguetón y el género urbano. Es el festival más asequible del catálogo, con entradas desde 49 euros. Comparte la política de acceso general: desde los 16 años con autorización hasta la mayoría de edad.


* **Medusa Festival**. Se celebra en Cullera, provincia de Valencia, y constituye la gran cita de música electrónica del catálogo, abarcando techno, house y EDM. Su precio de partida es de 77 euros y presenta dos particularidades: es el único festival cuyo precio incluye los gastos de gestión, y dispone de una zona reservada exclusivamente a adultos, el River Town Resort.

* **Reve Festival**. Celebrado en Valencia (Roig Arena), ofrece una propuesta de pop de gran formato, orientada al gran público y al espectáculo. El precio de partida es de 75 euros, y rige la política de acceso general desde los 16 años.

* **Zevra Festival**. Segundo festival radicado en Cullera, se dedica a la música urbana, el reguetón y los ritmos latinos. Las entradas parten de 69 euros, con acceso desde los 16 años y autorización paterna para menores de 18\.

  ### **Observaciones sobre el catálogo**

En cuanto a la distribución territorial, cinco de los seis festivales pertenecen a la provincia de Valencia —dos de ellos concentrados en Cullera— y uno a la de Alicante. La provincia de Castellón carece aún de representación, lo que constituye una vía natural de ampliación futura.

Por lo que respecta a los horarios, a fecha de la última verificación ninguno de los seis festivales había publicado su programación oficial; cada ficha remite entre tanto al enlace informativo oficial correspondiente. Todas las fichas incluyen además la URL oficial de venta de entradas, en coherencia con el carácter no transaccional del portal.

7. # Secciones principales de la web {#secciones-principales-de-la-web}

   ## **Secciones principales de la web**

El portal TuriaFest se estructura en un conjunto de secciones concebidas para acompañar al usuario en todo el proceso de decisión: descubrir los festivales, compararlos y planificar su asistencia. Conviene distinguir entre las secciones actualmente disponibles y aquellas previstas para futuras etapas del proyecto.

### **Secciones disponibles**

**Inicio**. Constituye la puerta de entrada al portal. Presenta una selección de los festivales más destacados de la temporada, ofreciendo al visitante una primera visión del conjunto de la oferta y un acceso directo a la información de cada evento.

**Listado de festivales**. Reúne el catálogo completo y permite acotarlo mediante filtros por provincia, mes de celebración y género musical. Es la sección de exploración por excelencia: en ella el usuario delimita la oferta hasta encontrar los festivales que mejor se ajustan a sus preferencias.

**Ficha del festival**. Cada festival dispone de una página propia que concentra toda su información relevante: fechas de celebración, localidad y provincia, géneros musicales, cartel de artistas, precio de partida de las entradas, condiciones de acceso por edad y enlace al canal oficial de venta.

**Calendario**. Ordena cronológicamente todos los festivales de la temporada, día a día. Está pensado para quien planifica en función de sus fechas disponibles y desea contemplar de un solo vistazo el panorama completo del verano.

### **Secciones previstas**

La hoja de ruta del proyecto contempla la incorporación progresiva de las siguientes secciones:

* **Cartel completo**, con la relación íntegra de artistas de cada festival, ordenada desde los cabezas de cartel hasta las propuestas emergentes.  
* **Perfil de artista**, con información sobre cada intérprete y los festivales en los que participa.  
* **Listado por provincia**, con vistas dedicadas a Valencia, Alicante y Castellón.  
* **Mapa interactivo**, que situará todos los recintos sobre un plano de la Comunidad Valenciana.  
* **Sobre nosotros**, página institucional dedicada a la presentación del proyecto.

  ### 

  ### 

  ### **Consideración final**

En su estado actual, el portal ofrece cuatro secciones plenamente operativas —inicio, listado, ficha de festival y calendario— que cubren el ciclo esencial de consulta: descubrir la oferta, filtrar según las propias preferencias, examinar cada festival en detalle y organizar la asistencia en el tiempo. Las secciones previstas enriquecerán progresivamente esta experiencia hasta completar el conjunto de la propuesta.

8. # Características actuales  {#características-actuales}

   ## **Características actuales**

En su estado presente, el portal TuriaFest reúne el siguiente conjunto de características, plenamente operativas.

### **Consulta y exploración**

El visitante dispone de cuatro secciones en funcionamiento: una página de inicio con los festivales destacados de la temporada, un listado completo del catálogo con filtros por provincia, mes y género musical, una ficha detallada de cada festival y un calendario cronológico que ordena los eventos día a día. Con ellas queda cubierto el ciclo esencial de uso: descubrir la oferta, acotarla, examinar cada festival y planificar la asistencia.

### **Contenido curado y verificado**

El catálogo comprende seis festivales de referencia —Bigsound, Latin Fest, Medusa, Reggaeton Beach Festival, Reve y Zevra—, cuyos datos (fechas, precios, condiciones de acceso, enlaces oficiales) son objeto de verificación editorial periódica, con constancia expresa de la fecha de la última revisión. El portal remite siempre a los canales oficiales de venta, sin actuar como intermediario.

### **Experiencia de uso**

* **Diseño adaptable a cualquier dispositivo**, desde ordenadores de sobremesa hasta los teléfonos móviles más compactos, con especial atención a la experiencia móvil, que constituye el uso predominante.  
* **Tema claro y tema oscuro**, a elección del usuario o ajustado automáticamente a las preferencias de su dispositivo, con una identidad visual propia de inspiración mediterránea.  
* **Accesibilidad** conforme a los estándares internacionales, de modo que el portal resulte utilizable con teclado, lectores de pantalla y niveles de contraste adecuados.  
* **Rapidez de carga**: las páginas se generan en el servidor y cada sección se descarga únicamente cuando el usuario la visita, lo que se traduce en una respuesta inmediata incluso en conexiones móviles.

  ### **Idioma y proyección multilingüe**

La interfaz se ofrece íntegramente en español, con fechas y textos redactados conforme a las convenciones propias del idioma. La infraestructura multilingüe se encuentra ya integrada, con los ficheros de traducción al valenciano y al inglés preparados y mantenidos en paridad con el original, a la espera de su activación en la fase correspondiente de la hoja de ruta.

### **Privacidad y confianza**

El portal puede consultarse **sin registro alguno**, no emplea cookies de seguimiento y, en consecuencia, no interpone banners de consentimiento. La analítica utilizada es respetuosa con la privacidad, y el sistema de supervisión de errores permite detectar y corregir incidencias con celeridad, en garantía de la calidad del servicio.

### **Solidez del proyecto**

Más allá de lo visible para el usuario, el proyecto se apoya en prácticas rigurosas de ingeniería: verificación automática de la calidad del código antes de cada cambio, pruebas que protegen las funcionalidades existentes, presupuestos estrictos de peso de la aplicación y una arquitectura modular que permite crecer —nuevas secciones, nuevos idiomas, nuevas integraciones— sin comprometer la estabilidad de lo ya construido.

9. # Posicionamiento del proyecto {#posicionamiento-del-proyecto}

   ### **Definición**

TuriaFest se posiciona como el portal de referencia para la información sobre festivales de música de la Comunidad Valenciana. Su aspiración no es ser el más grande, sino el más fiable y completo dentro de su ámbito: cuando un usuario se pregunte a qué festival asistir en Valencia, Alicante o Castellón, TuriaFest debe ser la primera respuesta que encuentre y la única que necesite.

### **Especialización como ventaja**

Frente a los grandes agregadores de eventos de alcance nacional o internacional, TuriaFest opta deliberadamente por la especialización territorial y temática. Esta elección le confiere ventajas difíciles de replicar por actores generalistas: un catálogo verdaderamente exhaustivo dentro de su ámbito, datos verificados de manera periódica por un equipo editorial, y un conocimiento próximo del territorio, sus recintos y su público. Allí donde un portal generalista ofrece amplitud sin profundidad, TuriaFest ofrece profundidad total en un ámbito acotado.

### **Independencia y neutralidad**

Un pilar esencial del posicionamiento es su carácter informativo e independiente. El portal no vende entradas, no percibe comisiones por las ventas y no mantiene vínculo comercial con los festivales que recoge; se limita a remitir a los canales oficiales. Esta neutralidad sustenta el activo más valioso del proyecto: la confianza del usuario, que sabe que la información que consulta no está condicionada por intereses de intermediación.

### **Compromiso con el usuario**

El posicionamiento se completa con un conjunto de compromisos que distinguen al portal de buena parte de su entorno digital:

* **Acceso libre y sin fricciones**: sin registro, sin muros de contenido y sin barreras de entrada de ninguna clase.  
* **Respeto a la privacidad**: sin cookies de seguimiento ni banners de consentimiento, en un sector donde ambos son la norma.  
* **Accesibilidad universal**: el portal se diseña para que pueda utilizarlo cualquier persona, con independencia de sus capacidades o del dispositivo que emplee.  
* **Identidad local**: direcciones web en español, convenciones propias del idioma y, en el horizonte próximo, presencia del valenciano como lengua propia del territorio.

  ### 

  ### **Vocación de permanencia**

TuriaFest no se concibe como un producto de temporada, sino como una infraestructura informativa estable que se renueva año tras año con cada edición de los festivales. Su estrategia de visibilidad descansa en el posicionamiento orgánico en buscadores —consolidado mediante direcciones web permanentes y contenido de calidad— antes que en la inversión publicitaria, lo que refuerza su sostenibilidad a largo plazo.

### **Síntesis**

En una frase: TuriaFest se posiciona como la fuente especializada, independiente y de confianza para la información festivalera de la Comunidad Valenciana — un proyecto de nicho con vocación de referencia, que compite por profundidad y rigor allí donde otros compiten por volumen.

# 

10. # Visión futura {#visión-futura}

    ### **Horizonte general**

La visión de TuriaFest a largo plazo es consolidarse como el punto de encuentro digital entre los festivales de la Comunidad Valenciana y su público: un espacio que no solo informe, sino que acompañe al usuario durante todo el ciclo festivalero — desde el descubrimiento inicial hasta la asistencia, y de una temporada a la siguiente. El proyecto evolucionará por fases sucesivas, cada una construida sobre la anterior, sin comprometer jamás la sencillez y la inmediatez que definen su esencia.

### **Fases de evolución**

**Compleción de la experiencia informativa**. El paso más inmediato consiste en culminar las secciones previstas: el cartel completo de cada festival, los perfiles de artistas, las vistas por provincia, el mapa interactivo de recintos y la página institucional. Con ellas, la propuesta informativa quedará plenamente desarrollada.

**Personalización**. El portal pasará de ser un lugar que se consulta a ser un lugar que se habita. El usuario podrá guardar sus festivales favoritos y conservarlos entre visitas, e instalar el portal en su móvil como una aplicación, con capacidad de consulta incluso sin conexión — todo ello, fiel al espíritu del proyecto, sin necesidad de registro.

**Comunidad**. En una etapa posterior se incorporarán las cuentas de usuario, que abrirán la puerta a las valoraciones y los comentarios. El portal sumará así a la información editorial la voz de quienes han vivido los festivales, convirtiéndose en un espacio de opinión y recomendación entre aficionados.

**Integraciones**. La experiencia se enriquecerá con servicios externos: la escucha previa de los artistas del cartel a través de plataformas de música en streaming, la conexión con los principales operadores de venta de entradas y un calendario anual interactivo. El usuario podrá pasar de descubrir un artista a escucharlo, y de decidirse por un festival a adquirir su entrada, sin abandonar el flujo natural de consulta.

**Plurilingüismo**. El portal hablará las lenguas de su público: al español se sumarán el valenciano, como lengua propia del territorio, y el inglés, orientado al visitante internacional que combina turismo y festivales en la costa mediterránea. La infraestructura necesaria está ya preparada desde el origen del proyecto.

### 

### **Crecimiento del catálogo**

En paralelo a las fases funcionales, el catálogo crecerá temporada a temporada, con dos direcciones claras: la incorporación de nuevos festivales de las provincias ya representadas y la extensión a la provincia de Castellón, actualmente sin presencia, hasta cubrir la totalidad del mapa festivalero de la Comunidad Valenciana.

### **Principio rector**

Todo este crecimiento queda subordinado a un principio invariable: consultar debe seguir siendo instantáneo, libre y sin barreras, por más que el producto gane en profundidad. La visión de futuro de TuriaFest no consiste en acumular funcionalidades, sino en profundizar en su promesa original — que decidir a qué festival asistir sea cada vez más fácil, más rico y más placentero.
