const BlueprintApi = (function (){
    const baseUrl = "/blueprintsApi/blueprints/";

    let selectedAuthor = null;
    let blueprints = [];
    function handleResponse(promise, callback, errorCb){
        promise
            .then(r => {
                if (!r.ok) {
                    return r.text().then(t => {
                        throw new Error(t || ("HTTP" + r.status))
                    });
                }
                return r.status == 204 ? null : r.json();
            })
            .then(data => callback && callback(data))
            .catch(err => errorCb && errorCb(err.message));
    }

    function getAll(author, callback, errorCb) {
        handleResponse(fetch(baseUrl), callback, errorCb);
    }

    function getByAuthor(author, callback, errorCb) {
        handleResponse(fetch(`${baseUrl}/${encodeURIComponent(author)}`), (data) => {
            blueprints = data.map(bp => ({
                name: bp.name,
                points: bp.points.length
            }));
            callback && callback(data);
        }, errorCb);
    }

    function setSelectedAuthor(author){
        selectedAuthor = author;
    }

    function getBlueprints(){
        return blueprints;
    }


    return {
        getAll,
        getByAuthor,
        setSelectedAuthor,
        getBlueprints
    };



})();

