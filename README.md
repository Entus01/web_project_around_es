# Tripleten web_project_around_es

Este proyecto consiste en el desarrollo de una página web que permite a los usuarios personalizar su perfil de manera interactiva.  
Las principales funcionalidades incluyen:

- Personalización de **imagen de perfil**, **nombre** y **descripción personal**.
- Opción de **agregar imágenes** al perfil.
- Posibilidad de **dar "like"** a las imágenes.
- Funcionalidad para **eliminar imágenes**.
- Visualización de imágenes en **tamaño original** al hacer clic sobre ellas.
- Manejo de **ventanas emergentes (modales)** para realizar cambios:
  - Los formularios muestran un estado de "guardando" mientras se envían los datos.
  - Una vez confirmados los cambios, la ventana emergente se cierra automáticamente.
  - Al reabrir una ventana emergente, esta aparece vacía, excepto la de cambio de nombre y descripción, que muestra los valores actuales del usuario.
- Validación de formularios:
  - Los campos deben contener información válida.
  - En caso contrario, se muestran mensajes de error y se bloquea el envío.

Todos los cambios realizados se envían mediante **APIs** a un servidor, el cual se encarga de almacenarlos.

---

## 🛠️ Herramientas y Tecnologías Utilizadas
- **POO (Programación Orientada a Objetos)**  
- **Clases y Subclases** para organizar la lógica del proyecto  
- **Importar/Exportar entre Módulos** para mantener un código modular y escalable  
- **Manejo de Formularios** con validaciones y retroalimentación visual  
- **Programación Asíncrona** para gestionar operaciones de red sin bloquear la interfaz  
- **Métodos HTTP** (GET, POST, PUT, DELETE) para comunicación con el servidor  
- **APIs** para persistencia de datos  
- **Control de Versiones** con Git  
- **Estilos con CSS** para diseño y experiencia de usuario 

////////////////////////////////////////////////////////////

This project focuses on developing a web page that allows users to personalize their profile interactively.  
Key features include:

- Customization of **profile picture**, **name**, and **personal description**.
- Option to **add images** to the profile.
- Ability to **like images**.
- Functionality to **delete images**.
- View images in **full size** when clicking on them.
- Use of **modal windows** to perform changes:
  - Forms display a "saving" state while data is being sent.
  - Once changes are confirmed, the modal window closes automatically.
  - When reopening a modal, fields are empty except for the profile name and description modal, which shows the current user values.
- Form validation:
  - Fields must contain valid information.
  - Otherwise, error messages are displayed and the form cannot be submitted until corrected.

All changes are sent via **APIs** to a server, which stores the updates.

---

## 🛠️ Tools and Technologies Used
- **OOP (Object-Oriented Programming)**  
- **Classes and Subclasses** for project structure  
- **Import/Export between Modules** for modular and scalable code  
- **Form Handling** with validation and error feedback  
- **Asynchronous Programming** for non-blocking network operations  
- **HTTP Methods** (GET, POST, PUT, DELETE) for server communication  
- **APIs** for data persistence  
- **Version Control** with Git  
- **CSS Styling** for design and user experience  
