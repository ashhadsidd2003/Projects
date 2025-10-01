import java.io.*;
import java.util.*;

public class DijkstraOnly {
    static final int MAX = 10005;  // max number of nodes (bigger for large graphs)
    static int V;  // total number of vertices
    static ArrayList<Integer>[] adj = new ArrayList[MAX];  // graph as adjacency list
    static int[][] weight = new int[MAX][MAX];  // weights for each edge

    static int[] dist = new int[MAX];    // distance array (shortest distance)
    static int[] parent = new int[MAX];  // to keep track of the path
    static int[] hPos = new int[MAX];    // heap position
    static int[] heap = new int[MAX];    // min-heap for Dijkstra
    static int heapSize;                 // current heap size

    public static void main(String[] args) throws Exception {
        long startMem = getUsedMemory();         // memory before algo runs
        long startTime = System.currentTimeMillis();  // time before algo runs

        BufferedReader br = new BufferedReader(new FileReader("road_graph.txt"));  // read the input file
        V = Integer.parseInt(br.readLine().trim());  // first line has number of vertices
        for (int i = 0; i < V; i++) adj[i] = new ArrayList<>();  // initialize adjacency list

        String line;
        while ((line = br.readLine()) != null) {  // keep reading till end
            String[] parts = line.split(" ");     
            int u = Integer.parseInt(parts[0]);   // from node
            int v = Integer.parseInt(parts[1]);   // to node
            int w = Integer.parseInt(parts[2]);   // weight of edge
            adj[u].add(v);                        // undirected graph
            adj[v].add(u);
            weight[u][v] = w;                     
            weight[v][u] = w;
        }
        br.close();  // close the file

        int s = 0; // we start from node 0
        Dijkstra(s);  // run the main algorithm

        long endTime = System.currentTimeMillis();     // end time
        long endMem = getUsedMemory();                 // end memory

        System.out.println("Dijkstra finished.");
        System.out.println("Time taken: " + (endTime - startTime) + " ms");  // how much time it took
        System.out.println("Memory used: " + (endMem - startMem) + " KB");   // how much memory was used

        System.out.println("Final shortest distances from node " + s + ":");
        for (int i = 0; i < V; i++) {
            if (dist[i] == Integer.MAX_VALUE)
                System.out.println("To " + i + ": ∞");  // unreachable nodes
            else
                System.out.println("To " + i + ": " + dist[i]);  // print distance
        }
    }

    static void Dijkstra(int s) {
        for (int i = 0; i < V; i++) {
            dist[i] = Integer.MAX_VALUE;  // set everything far at first
            parent[i] = -1;               // no parent yet
            hPos[i] = 0;                  // not in heap yet
        }
        dist[s] = 0;         // starting point has 0 cost
        heapSize = 0;
        insertHeap(s);       // push starting node into heap

        while (heapSize > 0) {
            int v = removeMin();  // take node with smallest distance
            for (int u : adj[v]) {
                int d = weight[v][u];  // edge cost
                if (dist[v] + d < dist[u]) {  // found a shorter path
                    dist[u] = dist[v] + d;
                    parent[u] = v;
                    if (hPos[u] == 0) insertHeap(u);  // if not in heap, add it
                    else siftUp(hPos[u]);              // if already there, move it up
                }
            }
        }
    }

    static void insertHeap(int v) {
        heap[++heapSize] = v;     // add node at the end
        hPos[v] = heapSize;       // save its heap position
        siftUp(heapSize);         // move it up to correct spot
    }

    static void siftUp(int i) {
        int v = heap[i];          // get the value
        while (i > 1 && dist[v] < dist[heap[i / 2]]) {  // while not root and smaller than parent
            heap[i] = heap[i / 2];       // move parent down
            hPos[heap[i]] = i;
            i /= 2;                      // move to parent
        }
        heap[i] = v;              // place value
        hPos[v] = i;
    }

    static int removeMin() {
        int v = heap[1];                  // root has min value
        heap[1] = heap[heapSize--];       // move last to root
        siftDown(1);                      // fix the heap
        hPos[v] = 0;                      // mark as removed
        return v;
    }

    static void siftDown(int i) {
        int v = heap[i];
        while (2 * i <= heapSize) {      // while there is at least a left child
            int j = 2 * i;
            if (j < heapSize && dist[heap[j + 1]] < dist[heap[j]]) j++;  // pick smaller child
            if (dist[v] <= dist[heap[j]]) break;  // correct spot
            heap[i] = heap[j];           // move child up
            hPos[heap[i]] = i;
            i = j;                       // go down
        }
        heap[i] = v;
        hPos[v] = i;
    }

    static long getUsedMemory() {
        Runtime rt = Runtime.getRuntime();
        rt.gc();  // try to clean memory (not guaranteed)
        return (rt.totalMemory() - rt.freeMemory()) / 1024;  // convert to KB
    }
}
