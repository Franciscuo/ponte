# Enunciado de Prueba Técnica para el Candidato: Simulación de un Call Center con Atención de Tickets

## Enunciado

### Descripción del proyecto:
Estás liderando el desarrollo de un sistema de simulación de un call center que gestionará la atención de un número determinado de tickets de forma eficiente. El sistema debe asignar tickets a **N agentes** de forma paralela y registrar tanto el momento de la asignación del ticket como el momento de la finalización de la atención del mismo en un archivo **CSV**.

---

## Tareas a realizar:

1. **Implementación del mecanismo para leer tickets:**
   - Leer un archivo CSV con los datos de los tickets a ser asignados en la simulación.

2. **Asignación de tickets:**
   - Diseñar un mecanismo que distribuya equitativamente los tickets entre los agentes disponibles.

3. **Sistema de registro:**
   - Registrar el ID del ticket, el tiempo de asignación, el tiempo de resolución y el ID del agente que lo atendió en un archivo **CSV**.

4. **Simulación de atención de tickets:**
   - Simular la atención de los tickets por parte de los agentes (número de agentes varía por caso de prueba).
   - Cada agente debe demorar entre **2 y 3 segundos** en atender cada ticket.

5. **Operaciones paralelas:**
   - Implementar operaciones paralelas para garantizar que los agentes atiendan múltiples tickets simultáneamente de manera eficiente.

---

## Gestión de resultados:
- Diseñar un mecanismo para monitorear el estado de los tickets.
- Generar un archivo **CSV** que incluya:
  - ID del ticket
  - Tiempo de asignación
  - Tiempo de resolución
  - ID del agente que lo resolvió

---

## Entrega del proyecto:

Esta prueba técnica será enviada para que el candidato la realice desde su casa. El candidato tendrá **5 días** para entregar la solución.

### Instrucciones para la entrega:
1. **Analiza:** Revisa el documento y dedica tiempo a pensar en la solución.
2. **Diseño e implementación:** Toma decisiones detalladas de diseño e impleméntalas en código fuente. Itera hasta obtener una solución satisfactoria.
3. **Presentación:**
   - Realiza un screencast de **máximo 5 minutos** (solo se evaluarán los primeros 5 minutos) o proporciona documentación que incluya:
     - Decisiones de diseño tomadas (incluyendo código fuente y, si es necesario, diagramas de arquitectura y algoritmos).
     - Ejecución de los diferentes casos de prueba.

---

## Nota:
Esta prueba técnica evaluará tu capacidad para diseñar e implementar un sistema de simulación que gestione eficientemente la atención de tickets en un entorno de call center, registrando adecuadamente los datos en un archivo **CSV**. Asegúrate de abordar todas las tareas de manera completa y demostrar habilidades en diseño arquitectónico e implementación técnica.

**¡Buena suerte!**

---

## FAQ

1. **¿Puedo resolver este problema en un solo método?**  
   No. Se espera una solución orientada a objetos o funcional, no una solución monolítica.

2. **¿Pueden proporcionar un archivo de entrada?**  
   Sí. Un archivo CSV estará adjunto. Durante la evaluación, se utilizará un archivo CSV final proporcionado por los evaluadores.

3. **¿Es necesario implementar una capa de presentación o UI?**  
   No.

4. **¿Puedo entregar binarios sin el código fuente?**  
   No. Queremos evaluar la calidad de tu código.

5. **¿Puedo entregar mi solución en un archivo comprimido?**  
   No. La entrega debe realizarse a través del repositorio proporcionado.

---

## Annex: Casos de prueba

Todos los casos partirán del mismo archivo CSV de tickets adjunto. Se realizarán **3 ejecuciones**, generando un archivo CSV final para cada caso con una cantidad diferente de agentes.

- **Case 1:** Número de agentes: 3  
- **Case 2:** Número de agentes: 5  
- **Case 3:** Número de agentes: 7  

---

## Ejemplo del Output esperado:
id, fecha_creacion, prioridad, agente, fecha_asignacion, fecha_resolucion
1, 2021-01-01 08:00:00, 1, 1, 2021-01-01 08:00:00, 2021-01-01 08:02:00
2, 2021-01-01 08:00:00, 2, 2, 2021-01-01 08:00:00, 2021-01-01 08:02:00
3, 2021-01-01 08:00:00, 3, 3, 2021-01-01 08:00:00, 2021-01-01 08:02:00

## Local run

Necesitas tener instalado docker y docker-compose en tu máquina.

Para levantar el proyecto en local, sigue los siguientes pasos:

```bash
docker-compose up
```

Este comando levantará el proyecto en local y podrás acceder a la documentación de la API en la siguiente URL:

```
http://localhost:3000/api
```

El endpoint para procesar el archivo CSV es el siguiente:

```
curl --location 'http://127.0.0.1:3000/tickets/assign' \
--header 'x-api-key: api-key-123' \
--header 'Content-Type: application/json' \
--data '{
    "agent_count": 3
}'
```

Donde `agent_count` es el número de agentes que se desea simular.