var jsgraphs = jsgraphs || {};

(function(jss){
    var StackNode = function (value) {
        this.value = value;
        this.next = null;
    };
    
    jss.StackNode = StackNode;
    
    var Stack = function() {
        this.N = 0;
        this.first = null;
    };
    
    Stack.prototype.push = function (a) {
        this.first = this._push(this.first, a);  
    };
    
    Stack.prototype._push = function(x, a) {
        if(x == null) {
            this.N++;
            return new jss.StackNode(a);
        }  
        var oldX = x;
        this.N++;
        x = new jss.StackNode(a);
        x.next = oldX;
        return x;
    };
    
    Stack.prototype.pop = function () {
        if (this.first == null) {
            return undefined;
        }  
        
        var oldFirst = this.first;
        var item = oldFirst.value;
        this.first = oldFirst.next;
        this.N--;
        
        return item;
    };
    
    Stack.prototype.size = function() {
        return this.N;  
    };
    
    Stack.prototype.isEmpty = function() {
        return this.N == 0;  
    };
    
    Stack.prototype.peep = function() {
        if (this.first == null) {
            return undefined;
        }  
        
        return this.first.value;
    };
    
    Stack.prototype.toArray = function() {
        var result = [];
        x = this.first;
        while (x != null) {
            result.push(x.value);
            x = x.next;
        }
        return result;
    };
    
    jss.Stack = Stack;
    
	var Graph = function (V) {
        this.V = V;
        this.adjList = [];
        for (var i = 0; i < V; ++i) {
            this.adjList.push([]);
        }
    };
    
    Graph.prototype.addEdge = function(v, w){
        this.adjList[v].push(w);
        this.adjList[w].push(v);
    };
    
    Graph.prototype.adj = function(v) {
        return this.adjList[v];  
    };
    
    jss.Graph = Graph;
    
    var DepthFirstSearch = function(G, s) {
        this.s = s;
        var V = G.V;
        this.marked = [];
        this.edgeTo = [];
        for (var v = 0; v < V; ++v) {
            this.marked.push(false);
            this.edgeTo.push(-1);
        }
        
        this.dfs(G, s);
    };
    
    DepthFirstSearch.prototype.dfs = function (G, v) {
        this.marked[v] = true;
        var adj_v = G.adj(v);
        for (var i = 0; i < adj_v.length; ++i){
            var w = adj_v[i];
            if (!this.marked[w]){
                this.edgeTo[w] = v;
                this.dfs(G, w);
            }
        }
    };
    
    DepthFirstSearch.prototype.hasPathTo = function(v) {
        return this.marked[v];
    };
    
    DepthFirstSearch.prototype.pathTo = function(v) {
        var path = new jss.Stack();
        if(v == this.s) return [v];
        
        for(var x = v; x != this.s; x = this.edgeTo[x]) {
            path.push(x);
        }
        path.push(this.s);
        return path.toArray();
    };
    
    jss.DepthFirstSearch = DepthFirstSearch;

})(jsgraphs);

if(module) {
	module.exports = jsgraphs;
}