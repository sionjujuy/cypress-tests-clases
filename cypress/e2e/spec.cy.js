describe("pruebas de login", () => {
    beforeEach(() => {
      cy.visit("https://the-internet.herokuapp.com/");
      cy.get(":nth-child(21) > a").click();
    });
  //Prueba Positiva: Usuario y contraseña
  it('login con usuario y contraseñas validos', () => {
    //cy.visit('https://the-internet.herokuapp.com/')
    cy.get(':nth-child(21) > a').click()
    cy.get('#username').type('tomsmith')
    cy.get('#password').type('SuperSecretPassword!')
    cy.get('.fa').click()
    cy.get('#flash').contains('You logged into a secure area!')

  })

//Prueba Negativa: Enviar un Formulario Vacío
  it('Debería mostrar mensajes de error', () => {
    //cy.visit('https://the-internet.herokuapp.com/checkboxes');
    cy.get('form').submit();
    cy.contains('Checkbox 1 is required.').should('be.visible');
    cy.contains('Checkbox 2 is required.').should('be.visible');
  });

//Prueba Negativa: Intentar Eliminar un Elemento Inexistente en la Lista de Elementos
  it('Debería mostrar un mensaje de error', () => {
    //cy.visit('https://the-internet.herokuapp.com/add_remove_elements/');
    
    // Intentamos eliminar un elemento que no existe
    cy.get('.added-manually').should('not.exist');
    cy.get('button[onclick="deleteElement()"]').click();

   // Verificamos que se muestre un mensaje de error
    cy.contains('Error: Element NOT Found').should('be.visible');
  });

 // Prueba Negativa: Intentar Subir un Archivo que No Sea una Imagen 
  it('Debería mostrar un mensaje de error', () => {
    //cy.visit('https://the-internet.herokuapp.com/upload');

    // Intentamos subir un archivo que no es una imagen
    const filePath = 'archivo_no_imagen.txt'; // Debes tener un archivo no imagen en tu proyecto
    //cy.get('input[type="file"]').attachFile(filePath);

    // Verificamos que se muestre un mensaje de error
    cy.contains('File Uploaded!').should('not.exist');
    cy.contains('File format not allowed').should('be.visible');
  });
})