# Generador de tablas de verdad - UNIPRO

Una aplicación web interactiva para generar y analizar tablas de verdad de expresiones lógicas. Perfecta para estudiantes y profesores de lógica matemática.

## Características

- **Editor de expresiones lógicas**
  - Interfaz intuitiva para construir expresiones
  - Soporte para 6 variables (p, q, r, x, y, z)
  - Validación en tiempo real de la expresión
  - Operadores lógicos completos (AND, OR, NOT, NAND, NOR, XOR, XNOR, Implicación)

- **Generación de tablas de verdad**
  - Generación automática basada en la expresión
  - Visualización clara y ordenada
  - Evaluación en tiempo real
  - Soporte para expresiones complejas con paréntesis

- **Evaluador de casos específicos**
  - Prueba valores específicos para cada variable
  - Resultados instantáneos
  - Interfaz visual intuitiva

- **Exportación de resultados**
  - Exportación a PDF con formato profesional
  - Exportación a TXT para análisis posterior
  - Inclusión de metadatos y fecha de generación

## Tecnologías utilizadas

- React
- Vite
- Tailwind CSS
- TypeScript
- jsPDF (para exportación PDF)

## Instalación

```bash
# Clonar el repositorio
git clone [url-del-repositorio]

# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo
npm run dev
```

## Uso

1. **Crear una expresión lógica**
   - Utiliza el editor de expresiones
   - Selecciona variables y operadores
   - La expresión se valida automáticamente

2. **Generar tabla de verdad**
   - Presiona "Generar tabla de verdad"
   - La tabla se genera automáticamente
   - Visualiza todos los casos posibles

3. **Evaluar casos específicos**
   - Usa el evaluador debajo de la tabla
   - Selecciona valores para cada variable
   - Obtén el resultado instantáneamente

4. **Exportar resultados**
   - Elige entre formato PDF o TXT
   - Los archivos incluyen la expresión y todos los resultados

## Operadores disponibles

| Símbolo | Nombre      | Descripción                                        |
|---------|-------------|---------------------------------------------------|
| ∧       | AND         | Verdadero solo si ambos operandos son verdaderos  |
| ∨       | OR          | Verdadero si al menos un operando es verdadero    |
| ¬       | NOT         | Invierte el valor de verdad                       |
| ⊼       | NAND        | Negación del AND                                  |
| ⊽       | NOR         | Negación del OR                                   |
| ⊕       | XOR         | Verdadero si los operandos son diferentes         |
| ↔       | XNOR        | Verdadero si los operandos son iguales           |
| →       | Implicación | Falso solo si el antecedente es V y consecuente F |

## Contribuir

Las contribuciones son bienvenidas. Por favor, abre un issue primero para discutir los cambios que te gustaría realizar.

## Licencia

MIT License - ver el archivo [LICENSE.md](LICENSE.md) para más detalles.