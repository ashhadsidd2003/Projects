import java.io.*;
import java.util.*;

public class Main {
    static final int MAX = 100;
    static int V;  // total number of vertices
    static ArrayList<Integer>[] adj = new ArrayList[MAX];  // graph as adjacency list
    static int[][] weight = new int[MAX][MAX];  // weights of the edges

    static boolean[] visited = new boolean[MAX];
    static int[] dist = new int[MAX];       // stores distance or weight
    static int[] parent = new int[MAX];     // keeps track of parent in MST or shortest path
    static int[] hPos = new int[MAX];       // heap position
    static int[] heap = new int[MAX];       // the min-heap
    static int heapSize;                    // current size of the heap

    public static void main(String[] args) throws Exception {
        Scanner sc = new Scanner(System.in); // Do NOT close this
        System.out.print("Enter input file name: ");
        String file = sc.nextLine();  // ask user for input file name

        try (BufferedReader br = new BufferedReader(new FileReader(file))) {
            String[] firstLine = br.readLine().split(" ");
            V = Integer.parseInt(firstLine[0]);  // read number of vertices
            for (int i = 0; i < V; i++) adj[i] = new ArrayList<>();  // initialize all adjacency lists

            String line;
            while ((line = br.readLine()) != null) {
                String[] parts = line.split(" ");
                int u = Integer.parseInt(parts[0]);
                int v = Integer.parseInt(parts[1]);
                int w = Integer.parseInt(parts[2]);
                adj[u].add(v);        // add edge both sides since it's undirected
                adj[v].add(u);
                weight[u][v] = w;     // put the weight for each edge
                weight[v][u] = w;
            }
        } catch (IOException e) {
            System.out.println("Error reading file: " + e.getMessage());  // if file is not found or something
            return;
        }

        System.out.print("Enter starting vertex (number): ");
        int s = sc.nextInt();  // start point for all the algorithms

        System.out.println("\n--- DFS ---");
        Arrays.fill(visited, false);  // mark all unvisited
        DFS(s);  // run depth-first search

        System.out.println("\n--- BFS ---");
        BFS(s);  // run breadth-first search

        System.out.println("\n--- Prim's MST ---");
        PrimMST(s);  // find MST using Prim's algorithm

        System.out.println("\n--- Dijkstra's Shortest Path ---");
        Dijkstra(s);  // find shortest path using Dijkstra's
    }

    static void DFS(int u) {
        visited[u] = true;                      
        System.out.println("Visited " + u);  // print current node
        for (int v : adj[u]) {               // go through all neighbors
            if (!visited[v]) DFS(v);         // if not visited, go deeper
        }
        System.out.println("Exiting " + u);  // when all done with this node
    }

    static void BFS(int s) {
        boolean[] visited = new boolean[V];  // make visited array for BFS
        Queue<Integer> q = new LinkedList<>();  // use queue for BFS
        visited[s] = true;
        q.add(s);  // start from source
        while (!q.isEmpty()) {
            int u = q.poll();  // take one node
            System.out.println("Visited " + u);
            for (int v : adj[u]) {
                if (!visited[v]) {
                    visited[v] = true;  // mark visited and push to queue
                    q.add(v);
                }
            }
        }
    }

    static void PrimMST(int s) {
        boolean[] selected = new boolean[V];  // to mark if node already in MST
        for (int i = 0; i < V; i++) {
            dist[i] = Integer.MAX_VALUE;  // set all distances high
            parent[i] = -1;
            hPos[i] = 0;
        }
        dist[s] = 0;  // starting node has 0 weight
        heapSize = 0;
        insertHeap(s);  // push it in heap

        while (heapSize > 0) {
            int u = removeMin();  // get smallest dist vertex

            if (selected[u]) continue;  // skip if already added
            selected[u] = true;

            for (int v : adj[u]) {
                if (!selected[v] && weight[u][v] < dist[v]) {
                    dist[v] = weight[u][v];  // update with smaller edge
                    parent[v] = u;
                    if (hPos[v] == 0) insertHeap(v);  // if not in heap, add
                    else siftUp(hPos[v]);  // else adjust its position
                }
            }
            printState("Prim - Selected Vertex: " + u);  // print what’s going on
        }
    }

    static void Dijkstra(int s) {
        for (int i = 0; i < V; i++) {
            dist[i] = Integer.MAX_VALUE;  // make everything far away at start
            parent[i] = -1;
            hPos[i] = 0;
        }

        dist[s] = 0;  // source is 0 distance
        heapSize = 0;
        insertHeap(s);  // add to heap

        while (heapSize > 0) {
            int v = removeMin();  // get vertex with shortest distance
            for (int u : adj[v]) {
                int d = weight[v][u];  // get weight of edge
                if (dist[v] + d < dist[u]) {  // check if new path is better
                    dist[u] = dist[v] + d;    // update distance
                    parent[u] = v;
                    if (hPos[u] == 0) insertHeap(u);  // not in heap, add
                    else siftUp(hPos[u]);             // already in heap, fix position
                }
            }
            printState("Dijkstra - Selected Vertex: " + v);  // show update
        }
    }

    static void printState(String label) {
        System.out.println("\n" + label);
        System.out.print("dist[]: ");
        for (int i = 0; i < V; i++) System.out.print(dist[i] + " ");  // show current distances
        System.out.print("\nparent[]: ");
        for (int i = 0; i < V; i++) System.out.print(parent[i] + " ");  // show tree or path
        System.out.print("\nheap[]: ");
        for (int i = 1; i <= heapSize; i++) System.out.print(heap[i] + " ");  // show heap
        System.out.println("\n");
    }

    static void insertHeap(int v) {
        heap[++heapSize] = v;     // put new element at end
        hPos[v] = heapSize;       // remember where it is
        siftUp(heapSize);         // fix its position
    }

    static void siftUp(int i) {
        int v = heap[i];
        while (i > 1 && dist[v] < dist[heap[i / 2]]) {
            heap[i] = heap[i / 2];        // move parent down
            hPos[heap[i]] = i;
            i /= 2;
        }
        heap[i] = v;        // final spot for new value
        hPos[v] = i;
    }

    static int removeMin() {
        int v = heap[1];               // smallest is on top
        heap[1] = heap[heapSize--];    // move last to top
        siftDown(1);                   // fix heap
        hPos[v] = 0;                   // mark removed
        return v;
    }

    static void siftDown(int i) {
        int v = heap[i];
        while (2 * i <= heapSize) {
            int j = 2 * i;  // left child
            if (j < heapSize && dist[heap[j + 1]] < dist[heap[j]]) j++;  // pick smaller child
            if (dist[v] <= dist[heap[j]]) break;  // in right place
            heap[i] = heap[j];        // move child up
            hPos[heap[i]] = i;
            i = j;
        }
        heap[i] = v;        // final place for moved item
        hPos[v] = i;
    }
}
