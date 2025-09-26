### Escuela Colombiana de Ingeniería
### Software Architectures

## **Author**

- **Santiago Hurtado Martínez** [SantiagoHM20](https://github.com/SantiagoHM20) 

## Building a 'Thick' Client with a REST API, HTML5, JavaScript, and CSS3. Part I.  

### Individual or pair work. Students who performed poorly on the previous exam are encouraged to do this individually.  

![](img/mock.png)  

* When pressing 'Get blueprints', the system queries the blueprints of the user entered in the form. For now, if the query fails, nothing will be displayed.  
* On a successful query, a message must be shown that includes the author’s name, along with a table containing: the name of each of the author’s blueprints, the number of points in each, and a button to open it. At the end, the total number of points across all blueprints must be displayed (assume, for example, that the application uses a payment model that requires this information).  
* When selecting one of the blueprints, its drawing must be shown. For now, the drawing will simply be a sequence of line segments created in the same order in which the points are provided.  

---

## Backend Adjustments  

1. Work based on the previous project (where the REST API was implemented).  
2. Add the following Maven dependencies for the jQuery and Bootstrap 'webjars' (this allows the project to have these JavaScript libraries locally when building):  

    ```xml
    <dependency>
        <groupId>org.webjars</groupId>
        <artifactId>webjars-locator</artifactId>
    </dependency>

    <dependency>
        <groupId>org.webjars</groupId>
        <artifactId>bootstrap</artifactId>
        <version>3.3.7</version>
    </dependency>

    <dependency>
        <groupId>org.webjars</groupId>
        <artifactId>jquery</artifactId>
        <version>3.1.0</version>
    </dependency>                
    ```  

---

## Front-End – Views  

1. Create the directory where the JavaScript application will reside. Since SpringBoot is used, the path for static content (static web pages, HTML5/JS apps, etc.) is:  

    ```
    src/main/resources/static
    ```  

2. In this directory, create the `index.html` page, with only the basics: a title, a field for entering the author, a 'Get blueprints' button, a `<div>` to display the selected author’s name, an [HTML table](https://www.w3schools.com/html/html_tables.asp) to display the list of blueprints (with only headers at first), and a `<div>` to display the total points of the author’s blueprints. Remember to add identifiers to these components for easy access with selectors.  

3. In the page’s `<head>` element, add references to the jQuery and Bootstrap libraries and the Bootstrap stylesheet:  

    ```html
    <head>
        <title>Blueprints</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <script src="/webjars/jquery/jquery.min.js"></script>
        <script src="/webjars/bootstrap/3.3.7/js/bootstrap.min.js"></script>
        <link rel="stylesheet"
          href="/webjars/bootstrap/3.3.7/css/bootstrap.min.css" />
    </head>
    ```  

4. Run the application (`mvn spring-boot:run`), and check:  
   1. That the page is accessible at:  
      ```
      http://localhost:8080/index.html
      ```
   2. That when opening the browser’s developer console, no 404 errors appear (meaning the JavaScript libraries loaded correctly).  

---

## Front-End – Logic  

1. Create a JavaScript Module to act as a controller, maintaining state and providing the operations required by the view. Use the [JavaScript Module Pattern](https://toddmotto.com/mastering-the-module-pattern/), and create the module in `static/js/app.js`.  

2. Copy the provided module (`apimock.js`) into the same path as the newly created module. Add more blueprints (with more points) for the hardcoded authors in the file.  

3. Import both new modules in the HTML page (after the jQuery and Bootstrap imports):  
    ```html
    <script src="js/apimock.js"></script>
    <script src="js/app.js"></script>
    ```  

4. Ensure the `app.js` module privately maintains:  
    * The selected author’s name.  
    * The list of blueprints for that author (objects with two properties: blueprint name and number of points).  

   Provide a public operation to change the currently selected author’s name.  

5. Add a public operation to `app.js` that updates the list of blueprints based on the author’s name (given as a parameter). This operation must call the `getBlueprintsByAuthor` method from `apimock`, passing as a _callback_ a function that:  
    * Maps the blueprints into objects containing only the name and number of points.  
    * Iterates over this list and, using jQuery, appends `<tr>` elements with corresponding `<td>`s into the HTML table.  
    * Uses `reduce` to calculate the total number of points and updates the respective `<div>` in the DOM using jQuery.  

6. Bind this operation to the 'on-click' event of the query button in the page.  

7. Test the application: start the server, open the HTML5/JavaScript app, and verify that entering an existing author loads their list of blueprints.  

---

## For Next Week  

8. Add a [Canvas element](https://www.w3schools.com/html/html5_canvas.asp) to the page with its own identifier. Ensure its dimensions are suitable (not too large, leaving space for other components, but large enough to draw the blueprints).  

9. Add a public operation to `app.js` that, given an author and one of their blueprint names as parameters, calls `getBlueprintsByNameAndAuthor` from `apimock.js` with a _callback_ that:  
    * Retrieves the blueprint’s points and consecutively draws line segments using [HTML5 Canvas and 2DContext](https://www.w3schools.com/html/tryit.asp?filename=tryhtml5_canvas_tut_path).  
    * Updates (with jQuery) the `<div>` that displays the name of the currently drawn blueprint (add this `<div>` to the DOM if it doesn’t exist).  

10. Update the rows generated in step 5 so that each includes a button in the last column, with a click event bound to the operation above (passing the corresponding names as parameters).  

11. Verify that the application now allows querying an author’s blueprints and drawing the selected one.  

12. Once the (front-end only) application works, create a new modu
