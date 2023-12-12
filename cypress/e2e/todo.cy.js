describe('TodoMVC Tests', () => {
    beforeEach(() => {
      cy.visit('https://todomvc.com/examples/react/#/')
    })
    //Primera tarea
    it('Ingresar el nombre de la tarea en el campo de texto', () => {
      // Ingresar el nombre de la tarea en el campo de texto
      cy.get('.new-todo').type('Nueva Tarea')
  
      // Presionar "enter" para agregar la tarea o hacer clic en el botón "Add"
      cy.get('.new-todo').type('{enter}')
      // O puedes usar: cy.get('.add-button').click()
  
      // Verificar que la tarea se agregó correctamente a la lista
      cy.get('.todo-list').should('contain', 'Nueva Tarea')
    })


    //Marcar tarea como completada//
    it('Ingresar el nombre de la tarea en el campo de texto', () => {
        cy.get('.new-todo').type('Nueva Tarea')
    
        // Presionar "enter" para agregar la tarea o hacer clic en el botón "Add"
        cy.get('.new-todo').type('{enter}')
        // Se puede usar tambien: cy.get('.add-button').click()
    
        // Verificar que la tarea se agregó correctamente a la lista
        cy.get('.todo-list').should('contain', 'Nueva Tarea')
    
        // Hacer clic en el botón de la marca de verificación junto a la tarea
        cy.get('.toggle').click()
    
        // Verificar que la tarea se marque como completada
        cy.get('.completed').should('contain', 'Nueva Tarea')
      })


    //Desmarcar Tarea completada
    it('should add a todo, mark it as completed, unmark it, and verify', () => {
        // Ingresar el nombre de la tarea en el campo de texto
        cy.get('.new-todo').type('Nueva Tarea')
    
        // Presionar "enter" para agregar la tarea o hacer clic en el botón "Add"
        cy.get('.new-todo').type('{enter}')
        // O puedes usar: cy.get('.add-button').click()
    
        // Verificar que la tarea se agregó correctamente a la lista
        cy.get('.todo-list').should('contain', 'Nueva Tarea')
    
        // Hacer clic en el botón de la marca de verificación junto a la tarea para marcarla como completada
        cy.contains('.todo-list label', 'Nueva Tarea').prev('.toggle').check()
    
        // Verificar que la tarea se marque como completada
        cy.get('.completed').should('contain', 'Nueva Tarea')
    
        // Hacer clic de nuevo en el botón de la marca de verificación para desmarcar la tarea
        cy.contains('.todo-list label', 'Nueva Tarea').prev('.toggle').uncheck()
    
        // Verificar que la tarea no esté marcada como completada
        cy.get(cy.get('[data-highlight-hitbox="true"]')).should('not.contain', 'Nueva Tarea')
    
        // Verificar que la tarea se muestra como no completada
        cy.contains('.todo-list label', 'Nueva Tarea').should('not.have.class', 'completed')
      })
    
    //Editar nueva tarea
    it('Nueva tarea en el campo de texto', () => {
        cy.get('.new-todo').type('Nueva Tarea 2')
    
        // Presionar "enter" para agregar la tarea o hacer clic en el botón "Add"
        cy.get('.new-todo').type('{enter}')
        // O puedes usar: cy.get('.add-button').click()
    
        // Verificar que la tarea se agregó correctamente a la lista
        cy.get('.todo-list').should('contain', 'Nueva Tarea 2')
    
        // Hacer doble clic en el texto de la tarea para editarlo
        cy.contains('.todo-list label', 'Nueva Tarea 2').dblclick()
    
        // Ingresar un nuevo nombre para la tarea
        cy.get('.todo-list input.edit').type(' - Editada{enter}')
    
        // Verificar que la tarea se actualizó correctamente en la lista
        cy.get('.todo-list').should('contain', 'Nueva Tarea 2 - Editada')
      })
    
    //Borra tarea
    it('should add a todo, delete it, and verify the updated list', () => {
        // Ingresar el nombre de la tarea en el campo de texto
        cy.get('.new-todo').type('Nueva Tarea 5')
    
        // Presionar "enter" para agregar la tarea o hacer clic en el botón "Add"
        cy.get('.new-todo').type('{enter}')
        // O puedes usar: cy.get('.add-button').click()
    
        // Verificar que la tarea se agregó correctamente a la lista
        cy.get('.todo-list').should('contain', 'Nueva Tarea 5')
    
        // Hacer clic en el botón "X" para eliminar la tarea
        cy.contains('.todo-list label', 'Nueva Tarea 5').parent('.view').find('.destroy').click()
    
        // Verificar que la tarea se eliminó correctamente de la lista
        cy.get('.todo-list').should('not.contain', 'Nueva Tarea 5')
      })

    //Multiples Tareas
        it('should add multiple todos, filter completed and uncompleted todos, and show all todos', () => {
            // Agregar tareas completadas
            cy.get('.new-todo').type('Tarea Completada 1{enter}')
            cy.contains('.todo-list label', 'Tarea Completada 1').prev('.toggle').check()
            cy.get('.new-todo').type('Tarea Completada 2{enter}')
            cy.contains('.todo-list label', 'Tarea Completada 2').prev('.toggle').check()
            cy.get('.new-todo').type('Tarea Completada 3{enter}')
            cy.contains('.todo-list label', 'Tarea Completada 3').prev('.toggle').check()
            cy.get('.new-todo').type('Tarea Completada 4{enter}')
            cy.contains('.todo-list label', 'Tarea Completada 4').prev('.toggle').check()
            cy.get('.new-todo').type('Tarea Completada 5{enter}')
            cy.contains('.todo-list label', 'Tarea Completada 5').prev('.toggle').check()
        
            // Agregar tareas no completadas
            cy.get('.new-todo').type('Tarea No Completada 1{enter}')
            cy.get('.new-todo').type('Tarea No Completada 2{enter}')
            cy.get('.new-todo').type('Tarea No Completada 3{enter}')
            cy.get('.new-todo').type('Tarea No Completada 4{enter}')
            cy.get('.new-todo').type('Tarea No Completada 5{enter}')
        
            // Verificar que todas las tareas se agregaron correctamente a la lista
            cy.get('.todo-list').should('have.length', 10)
        
            // Filtrar tareas completadas
            cy.contains('a', 'Completed').click()
        
            // Verificar que solo se muestran tareas completadas
            cy.get('.completed').should('have.length', 5)
            cy.get('.todo-list').should('have.length', 5)
        
            // Filtrar tareas no completadas
            cy.contains('a', 'Active').click()
        
            // Verificar que solo se muestran tareas no completadas
            cy.get('.completed').should('have.length', 0)
            cy.get('.todo-list').should('have.length', 5)
        
            // Mostrar todas las tareas
            cy.contains('a', 'All').click()
        
            // Verificar que se muestran todas las tareas
            cy.get('.todo-list').should('have.length', 10)
        })  

  })