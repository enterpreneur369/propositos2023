let input = document.querySelector("#purpose");
let btn = document.querySelector("#savePurpose");

btn.addEventListener("click", function() {
    // Guardar en local storage
    let purpose = input.value;
    let object = JSON.stringify({"purpose": purpose, "completed": false});
    localStorage.setItem("purpose_" + Date.now(), object); // Utiliza una clave única
    window.location.reload();
});

window.onload = function() {
    // Tomar los valores del storage
    let list = document.getElementById("purposes"); // Crea una lista en el DOM
    for(let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        if (key.startsWith("purpose_")) { // Filtra las claves por la convención de nombres utilizada
            let object = JSON.parse(localStorage.getItem(key));
            let listItem = document.createElement("li"); // Crea un elemento de lista en el DOM
            listItem.textContent = object.purpose; // Agrega el propósito al elemento de lista
            let check = document.createElement("input");
            check.type = "checkbox";
            check.checked = object.completed; // Establece el estado del checkbox basado en el valor de 'completed' en el objeto
            check.addEventListener("change", function() {
                // Actualizar el estado en el localStorage cuando el checkbox cambie
                object.completed = this.checked;
                localStorage.setItem(key, JSON.stringify(object));
            });
            listItem.appendChild(check);
            list.appendChild(listItem); // Agrega el elemento de lista a la lista en el DOM
        }
    }
    let main = document.querySelector("main");
    main.appendChild(list); // Agrega la lista al cuerpo del documento
};
