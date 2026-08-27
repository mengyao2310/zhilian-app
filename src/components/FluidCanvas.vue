<template>
  <canvas ref="canvas" class="fluid-canvas"></canvas>
</template>

<script>
const VERT_SRC = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`

// MasterGo 导出的有机流动着色器
// 仅两处适配：加 precision 声明（GLSL ES 1.00 必需）；
// 原 textureSize(u_texture, 0) 仅用于取画布尺寸，改为 u_resolution 以兼容 WebGL1/WebGL2，渲染结果不变
const FRAG_SRC = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;

// 动画速度：[0.1, 2.0]
const float SPEED = 0.5;

// 有机扭曲强度：[0.0, 1.0]
const float DISTORTION = 0.2;

// 旋涡扭曲强度：[0.0, 1.0]
const float SWIRL = 0.2;

// 色彩数量：[2, 6]
const int COLOR_COUNT = 2;

// 色彩聚合度：[1.5, 6.0]
const float DIST_POWER = 4.0;

// 色彩边缘颗粒：[0.0, 1.0]
const float GRAIN_MIXER = 0.0;

// 全屏颗粒叠加：[0.0, 1.0]
const float GRAIN_OVERLAY = 0.0;

// 色彩1
const vec4 COLOR_0 = vec4(0.1725, 0.0706, 0.8863, 1.0000);
// 色彩2
const vec4 COLOR_1 = vec4(0.1725, 0.4000, 0.9647, 1.0000);
// 色彩3
const vec4 COLOR_2 = vec4(1.00, 1.00, 1.00, 1.00);
// 色彩4
const vec4 COLOR_3 = vec4(1.00, 1.00, 1.00, 1.00);
// 色彩5
const vec4 COLOR_4 = vec4(1.00, 1.00, 1.00, 1.00);
// 色彩6
const vec4 COLOR_5 = vec4(1.00, 1.00, 1.00, 1.00);

float hash21(vec2 p) {
    p = fract(p * vec2(0.3183099, 0.3678794)) + 0.1;
    p += dot(p, p + 19.19);
    return fract(p.x * p.y);
}

float valueNoise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    float a = hash21(i);
    float b = hash21(i + vec2(1.0, 0.0));
    float c = hash21(i + vec2(0.0, 1.0));
    float d = hash21(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

vec2 rotate(vec2 uv, float th) {
    return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
}

vec2 getPosition(int i, float t) {
    float fi = float(i);
    float a = fi * 0.37;
    float b = 0.6 + fract(fi / 3.0) * 0.9;
    float c = 0.8 + fract((fi + 1.0) / 4.0);
    float x = sin(t * b + a);
    float y = cos(t * c + a * 1.5);
    return 0.5 + 0.5 * vec2(x, y);
}

void main() {
    vec2 texSize = u_resolution;

    vec2 uv = gl_FragCoord.xy / texSize;

    float t = (u_time * 0.001 + 41.5) * SPEED;

    vec2 grainUV = uv * 1000.0;
    float grain = valueNoise(grainUV);
    float mixerGrain = 0.4 * GRAIN_MIXER * (grain - 0.5);

    float radius = smoothstep(0.0, 1.0, length(uv - 0.5));
    float center = 1.0 - radius;

    for (float i = 1.0; i <= 2.0; i++) {
        uv.x += DISTORTION * center / i
            * sin(t + i * 0.4 * smoothstep(0.0, 1.0, uv.y))
            * cos(0.2 * t + i * 2.4 * smoothstep(0.0, 1.0, uv.y));
        uv.y += DISTORTION * center / i
            * cos(t + i * 2.0 * smoothstep(0.0, 1.0, uv.x));
    }

    vec2 uvRotated = uv - 0.5;
    float angle = 3.0 * SWIRL * radius;
    uvRotated = rotate(uvRotated, -angle);
    uvRotated += 0.5;

    vec3 color = vec3(0.0);
    float opacity = 0.0;
    float totalWeight = 0.0;

    for (int i = 0; i < 6; i++) {
        if (i >= COLOR_COUNT) break;

        vec4 c;
        if      (i == 0) c = COLOR_0;
        else if (i == 1) c = COLOR_1;
        else if (i == 2) c = COLOR_2;
        else if (i == 3) c = COLOR_3;
        else if (i == 4) c = COLOR_4;
        else             c = COLOR_5;

        vec2 pos = getPosition(i, t) + mixerGrain;

        float dist = length(uvRotated - pos);
        dist = pow(dist, DIST_POWER);
        float weight = 1.0 / (dist + 1e-3);

        color   += c.rgb * c.a * weight;
        opacity += c.a * weight;
        totalWeight += weight;
    }

    color   /= max(1e-4, totalWeight);
    opacity /= max(1e-4, totalWeight);

    float grainOverlay = valueNoise(rotate(grainUV, 1.0) + vec2(3.0));
    grainOverlay = mix(grainOverlay,
        valueNoise(rotate(grainUV, 2.0) + vec2(-1.0)), 0.5);
    grainOverlay = pow(grainOverlay, 1.3);
    float grainOverlayV = grainOverlay * 2.0 - 1.0;
    vec3  grainOverlayColor = vec3(step(0.0, grainOverlayV));
    float grainOverlayStrength = GRAIN_OVERLAY * abs(grainOverlayV);
    grainOverlayStrength = pow(grainOverlayStrength, 0.8);

    color    = mix(color, grainOverlayColor, 0.35 * grainOverlayStrength);
    opacity += 0.5 * grainOverlayStrength;
    opacity  = clamp(opacity, 0.0, 1.0);

    gl_FragColor = vec4(color, opacity);
}
`

export default {
  name: 'FluidCanvas',
  mounted() {
    this.initGL()
    window.addEventListener('resize', this.onResize)
    document.addEventListener('visibilitychange', this.onVisibility)
  },
  beforeDestroy() {
    if (this.raf) cancelAnimationFrame(this.raf)
    window.removeEventListener('resize', this.onResize)
    document.removeEventListener('visibilitychange', this.onVisibility)
    if (this.gl) {
      const lose = this.gl.getExtension('WEBGL_lose_context')
      if (lose) lose.loseContext()
      this.gl = null
    }
  },
  methods: {
    onResize() {
      this.render()
    },
    onVisibility() {
      if (document.hidden) {
        if (this.raf) {
          cancelAnimationFrame(this.raf)
          this.raf = 0
        }
      } else {
        this.render()
      }
    },
    initGL() {
      const canvas = this.$refs.canvas
      const opts = { alpha: false, antialias: true, preserveDrawingBuffer: true, depth: false, stencil: false }
      const gl = canvas.getContext('webgl', opts) || canvas.getContext('experimental-webgl', opts)
      if (!gl) return
      this.gl = gl

      const compile = (type, src) => {
        const sh = gl.createShader(type)
        gl.shaderSource(sh, src)
        gl.compileShader(sh)
        if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
          // eslint-disable-next-line no-console
          console.error('[FluidCanvas] 着色器编译失败:', gl.getShaderInfoLog(sh))
        }
        return sh
      }
      const prog = gl.createProgram()
      gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT_SRC))
      gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG_SRC))
      gl.linkProgram(prog)
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
        // eslint-disable-next-line no-console
        console.error('[FluidCanvas] 程序链接失败:', gl.getProgramInfoLog(prog))
      }
      gl.useProgram(prog)
      this.program = prog

      const buf = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, buf)
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
      const loc = gl.getAttribLocation(prog, 'a_position')
      gl.enableVertexAttribArray(loc)
      gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

      this.uTime = gl.getUniformLocation(prog, 'u_time')
      this.uRes = gl.getUniformLocation(prog, 'u_resolution')

      this.render()
    },
    render() {
      if (!this.gl) return
      const canvas = this.$refs.canvas
      const gl = this.gl
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = Math.max(1, Math.round(canvas.clientWidth * dpr))
      const h = Math.max(1, Math.round(canvas.clientHeight * dpr))
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
      }
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform2f(this.uRes, canvas.width, canvas.height)
      gl.uniform1f(this.uTime, window.performance.now())
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      this.raf = requestAnimationFrame(this.render)
    }
  }
}
</script>

<style scoped>
.fluid-canvas {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
