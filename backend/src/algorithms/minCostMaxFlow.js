class Edge {
    constructor(to, capacity, cost, rev) {
        this.to = to;
        this.capacity = capacity;
        this.cost = cost;
        this.rev = rev;
    }
}

export class MinCostMaxFlow {
    constructor(N) {
        this.N = N;
        this.graph = Array.from({ length: N }, () => []);
    }

    addEdge(from, to, capacity, cost) {
        this.graph[from].push(new Edge(to, capacity, cost, this.graph[to].length));
        this.graph[to].push(new Edge(from, 0, -cost, this.graph[from].length - 1));
    }

    minCostFlow(source, sink) {
        const N = this.N;
        let totalCost = 0;

        const dist = Array(N);
        const parent = Array(N);
        const parentEdge = Array(N);

        while (true) {
            dist.fill(Infinity);
            dist[source] = 0;

            const inQueue = Array(N).fill(false);
            const queue = [source];
            inQueue[source] = true;

            // SPFA (simpler than Dijkstra for interview)
            while (queue.length) {
                const u = queue.shift();
                inQueue[u] = false;

                this.graph[u].forEach((edge, i) => {
                    if (edge.capacity > 0 && dist[edge.to] > dist[u] + edge.cost) {
                        dist[edge.to] = dist[u] + edge.cost;
                        parent[edge.to] = u;
                        parentEdge[edge.to] = i;

                        if (!inQueue[edge.to]) {
                            queue.push(edge.to);
                            inQueue[edge.to] = true;
                        }
                    }
                });
            }

            if (dist[sink] === Infinity) break;

            let flow = Infinity;

            for (let v = sink; v !== source; v = parent[v]) {
                const u = parent[v];
                const edge = this.graph[u][parentEdge[v]];
                flow = Math.min(flow, edge.capacity);
            }

            for (let v = sink; v !== source; v = parent[v]) {
                const u = parent[v];
                const edge = this.graph[u][parentEdge[v]];
                edge.capacity -= flow;
                this.graph[v][edge.rev].capacity += flow;
            }

            totalCost += flow * dist[sink];
        }

        return totalCost;
    }
}