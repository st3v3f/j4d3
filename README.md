# J4d3

J4d3 - 'Just Another D3' library.

Provides a lightweight JavaScript library for creating responsive real-time graphs.

[Currently work in progress..]

## Getting Started

  Here's an example of how to draw a graph :

```javascript

<head>
  <link rel="stylesheet" type="text/css" href="../css/j4d3.css">
</head>

<body>
  <div id="graph"></div>

  <script src="../d3.min.js"></script>
  <script src="../j4d3.js"></script>
  ...

  var data = [{ "timestamp": "2015-01-20T00:00:00.000Z",   "val": 500},
              { "timestamp": "2015-01-20T01:00:00.000Z",   "val": 2000},
              { "timestamp": "2015-01-20T02:00:00.000Z",   "val": 1000},
              { "timestamp": "2015-01-20T03:00:00.000Z",   "val": 4000},
              { "timestamp": "2015-01-20T04:00:00.000Z",   "val": 500},
              { "timestamp": "2015-01-20T05:00:00.000Z",   "val": 4500}];

  var graph = new J4d3.Graph('#graph');
  graph.draw(data);

  //...[data update]  
  graph.draw(data);

...


```

## Dependencies

J4d3 relies on the awesome [D3 visualization library](http://mbostock.github.com/d3/) for the clever stuff.
