Graph Algorithms in Java

This project implements classic graph algorithms in Java for better understanding and comparison.  
The goal is to learn how different algorithms work on graphs and compare their behaviors.

Implemented Algorithms
- Depth First Search (DFS)
- Breadth First Search (BFS)
- Prim's Minimum Spanning Tree
- Dijkstra's Shortest Path Algorithm


Main.java
- Runs DFS, BFS, Prim’s, and Dijkstra on the provided graph.
- Purpose: compare how traversal algorithms (DFS/BFS) differ from path-finding (Dijkstra) and spanning tree generation (Prim).
- Useful for students who want to see multiple graph algorithms side-by-side.



DijkstraOnly.java
- A special version focused only on Dijkstra’s shortest path.
- Uses real-world-like graph data (cities/roads with weights = distances or times).
- Example: You can find the shortest travel time or distance between cities.  
- Data files like `road_graph` and `wGraph1` are used as input.



Input Data
- road_graph : Contains city/road connections with weights (distance/time).
- wGraph1 : Smaller weighted graph for testing algorithms quickly.

