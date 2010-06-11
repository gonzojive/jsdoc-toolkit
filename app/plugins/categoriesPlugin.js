
(function(){
    /** maps category name to a list of symbols in that category. */
    var categoryMap = {};

    /** Adds symbol to category of name cat */
    function addSymbolToCategory(cat, sym) {
	var arr = categoryMap[cat];
	if (!arr)
	    arr = categoryMap[cat] = [];
	arr.push(sym);
    }
    JSDOC.PluginManager.registerPlugin
	("JSDOC.categoriesPlugin",
	 {
	     onSetTags: function(symbol) {
		 var categories = symbol.comment.getTag("category");
		 symbol.categoryNames = categories.map(function(catTag) {
			 return catTag.desc.trim();
                     });
             },
             onDocCommentTags: function(comment) {
                 
             },
             onSymbol: function(symbol) {
		 
	     },
             onFinishRelate: function(symbolSet) {
		 // get a list of categories
		 symbolSet.categories = resolveCategories(symbolSet);

		 // annotate each category
	
	     }
	 }
	 );

    /** Resolves all category references in the symbol set.  Also
	annotates the classes as appropriate
    */
    function resolveCategories(symbolSet) {
	var symbols = symbolSet.toArray();

	var categoryNames = removeDuplicateStrings(appendArrays(symbols.map(function(sym) { return sym.categoryNames; })));

	function identity(x) { return x; };
	var categorySymbols = categoryNames.map(function (catName) { 
		return symbolSet.getSymbol(catName);
	    }).filter(identity);
	
	symbols.map(function(sym) { 
		sym.categoryNames.map(function (catName) {
			var cat = symbolSet.getSymbol(catName);
			
		    });
	    });

	categorySymbols.map(function(cat) { cat.isCategory = true; });

	LOG.warn("Category names: " + categoryNames.length + " // Symbols " + categorySymbols + 
		 " -- " + appendArrays(symbols.map(function(sym) { return sym.categoryNames; })).toSource());
	LOG.warn("Finding a symbol: `" + categorySymbols + "'");

	return categorySymbols;
    }
    
    /** removes the duplicate strings from an array */
    function removeDuplicateStrings(arr) {
	var o = {};
	arr.map(function(x) { o[x] = true; });
	var a = [];
	for (var key in o) {
	    a.push(key);
	}
	return a;
    }

    /** Joins the given arrays into one array. */
    function appendArrays(arrays) {
	var out = [];
	for (var i=0; i < arrays.length; i++) {
	    out = out.concat(arrays[i]);
	}
	return out;
    }
})();
    