window.addEventListener('load', main)


let vertexSource = `
  attribute vec4 a_Position;
  attribute float a_PointSize;

  void main() {
    gl_Position = a_Position;
    gl_PointSize= a_PointSize;
  }
`

let fragmentSource = `
  void main() {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
  }
`


function main() {
  let canvas = document.getElementById("canvas");
  let gl = getWebGLContext(canvas);
  let isInitShaders = initShaders(gl, vertexSource, fragmentSource)

  let vertexs = new Float32Array([
    0.0, 0.5, 40,
    -0.5, -0.5, 50,
    0.5, -0.5, 60
  ])

  let vertexBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, vertexs, gl.STATIC_DRAW)
  let FSIZE = vertexs.BYTES_PER_ELEMENT

  let a_Position = gl.getAttribLocation(gl.program, 'a_Position')
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 3, 0)
  gl.enableVertexAttribArray(a_Position)

  let a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize')
  gl.vertexAttribPointer(a_PointSize, 1, gl.FLOAT, false, FSIZE * 3, FSIZE * 2)
  gl.enableVertexAttribArray(a_PointSize)
  

  gl.clearColor(0.5, 0.5, 0.5, 1.0)
  gl.clear(gl.COLOR_BUFFER_BIT)
  gl.drawArrays(gl.POINTS, 0, 3)
}