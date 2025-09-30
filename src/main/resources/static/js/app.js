const BlueprintApi = (function (){
    const baseUrl = "/blueprintsApi/blueprints"; // sin slash final
    let selectedAuthor = null;
    let blueprints = [];
    let authorsCache = [];

    function handleResponse(promise, ok, fail){
        promise.then(r=>{
            if(!r.ok) return r.text().then(t=>{throw new Error(t||("HTTP"+r.status));});
            return r.status===204?null:r.json();
        }).then(d=>ok&&ok(d))
            .catch(e=>fail&&fail(e.message));
    }

    function getAll(callback, errorCb){
        handleResponse(fetch(baseUrl), callback, errorCb);
    }

    function loadAuthors(){
        if(authorsCache.length){
            renderAuthors(authorsCache);
            return;
        }
        getAll(data=>{
            const set = new Set(data.map(bp=>bp.author));
            authorsCache = Array.from(set).sort();
            renderAuthors(authorsCache);
        }, console.error);
    }

    function renderAuthors(list){
        const dl = document.getElementById("authorsList");
        dl.innerHTML = "";
        list.forEach(a=>{
            const opt=document.createElement("option");
            opt.value=a;
            dl.appendChild(opt);
        });
    }

    function getByAuthor(author, callback, errorCb){
        handleResponse(fetch(`${baseUrl}/${encodeURIComponent(author)}`), data=>{
            blueprints = data.map(bp=>({name:bp.name, points:bp.points.length}));
            callback && callback(data);
        }, errorCb);
    }

    function updateBlueprintsTable(){
        if(!selectedAuthor){ alert("Seleccione un autor"); return; }

        getByAuthor(selectedAuthor, (data)=>{
            const tbody = $("#blueprintTable tbody");
            tbody.empty();

            if (blueprints.length === 0) {
                tbody.append('<tr><td colspan="3">No se encontraron planos para este autor.</td></tr>');
            } else {
                blueprints.forEach(bp=>{
                    tbody.append(`
                      <tr>
                        <td>${bp.name}</td>
                        <td>${bp.points}</td>
                        <td><button class="open-btn" data-bp="${bp.name}">Open</button></td>
                      </tr>
                    `);
                });
            }
            $("#totalPoints").text(blueprints.reduce((sum, bp) => sum + bp.points, 0));
        }, (errorMsg) => {
            $("#blueprintTable tbody").empty();
            $("#totalPoints").text(0);
            alert("Error al cargar los planos: " + errorMsg);
        });
    }

    function consultAuthor(){
        const author = $("#author").val();
        if(!author) return;
        selectedAuthor = author;
        $("#author-name").text(author);
        updateBlueprintsTable();
    }

    return {
        loadAuthors,
        consultAuthor
    };
})();

$(function(){
    $("#author").on("focus", ()=>BlueprintApi.loadAuthors());
    $("#btn-consult").on("click", ()=>BlueprintApi.consultAuthor());
});