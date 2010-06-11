
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

    JSDOC.Symbol.prototype.memberp = function(otherSym) {
	return this.categoryNames.indexOf(otherSym.alias) !== -1 || otherSym.alias == this.memberOf;
    }

    JSDOC.Symbol.prototype.classlikep = function() {
	return this.is("CONSTRUCTOR") || this.isNamespace || this.isCategory;
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

	symbols.map(function(sym) { 
		sym.categoryNames.map(function (catName) {
			var container = symbolSet.getSymbol(catName);
			if (container) {
			    container.addMember(sym);
			    container.isCategory = true;
			}
		    });
	    });

	return symbols.filter(function(sym) { return sym.isCategory; });
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
    