function DOMFactory(query) {
    var elements = new Collection();
    var cleanQuery = query.replace(/\s/g, "");

    var pattern = /^create\d+div(?:id:random\(\)|,|className:\S+)*/;

    var cleanQuery = "create 10 div id:random(),className:capaFoto";

    //alert(cleanQuery.match(pattern));
    return elements;
}
//# sourceMappingURL=DOMFactory.js.map
