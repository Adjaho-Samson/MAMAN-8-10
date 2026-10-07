# 🎨 Ressources de Personnalisation Avancée

## 🎯 Palettes de Couleurs Alternatives

### Palette Elegante Rose

```css
:root {
  --gold: #d4a574;
  --rose: #e8b4c8;
  --cream: #fdf6f0;
  --ink: #3d2e2a;
}
```

### Palette Moderne Bleu

```css
:root {
  --gold: #4a7c9e;
  --rose: #6b9fb4;
  --cream: #f0f4f7;
  --ink: #1f3a47;
}
```

### Palette Chaude Ocre

```css
:root {
  --gold: #d4874e;
  --rose: #c9845f;
  --cream: #faf6f1;
  --ink: #3d2817;
}
```

### Palette Douce Lavande

```css
:root {
  --gold: #9b88c4;
  --rose: #b8a8d9;
  --cream: #f8f6fc;
  --ink: #3f3d4f;
}
```

## 🎬 Animations Avancées à Ajouter

### Effet Tilt 3D

Ajoute cette classe à n'importe quel élément pour le tilt effect:

```html
<div class="tilt-card">
  <!-- Contenu -->
</div>
```

```css
.tilt-card {
  perspective: 1000px;
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.tilt-card:hover {
  transform: rotateX(5deg) rotateY(-5deg) scale(1.05);
}
```

### Effet Neon

```css
.neon-text {
  color: var(--gold);
  text-shadow:
    0 0 7px var(--gold),
    0 0 10px var(--gold),
    0 0 21px var(--gold);
}
```

### Effet Blur Background

```css
.blur-bg {
  background: rgba(248, 244, 237, 0.5);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
```

## 🖼️ Styles de Galerie Avancés

### Masonry Layout (Pinterest Style)

```css
.gallery {
  column-count: 3;
  column-gap: 20px;
}

.photo-card {
  break-inside: avoid;
  margin-bottom: 20px;
  height: auto;
}
```

### Carousel Style

```css
.gallery {
  display: flex;
  overflow-x: auto;
  snap-type: x mandatory;
  scroll-behavior: smooth;
}

.photo-card {
  scroll-snap-align: center;
  flex: 0 0 80vw;
}
```

## 🎵 Effets Audio Avancés

### Visualiseur Audio

```javascript
// Ajoute aux animations.js pour un visualiseur simple
const audio = document.getElementById("birthdayAudio");
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const analyser = audioContext.createAnalyser();
const source = audioContext.createMediaElementAudioSource(audio);
source.connect(analyser);
analyser.connect(audioContext.destination);
```

## 🎥 Effets Vidéo Avancés

### Background Vidéo

```html
<video autoplay muted loop class="hero-photo">
  <source src="assets/video/background.mp4" type="video/mp4" />
</video>
```

```css
.hero-photo {
  position: absolute;
  inset: 0;
  object-fit: cover;
  width: 100%;
  height: 100%;
}
```

## 🌟 Éléments de Décoration

### Particules Animées

```css
@keyframes float-particles {
  0% {
    transform: translateY(100vh) rotate(0deg);
  }
  100% {
    transform: translateY(-100vh) rotate(360deg);
  }
}

.particle {
  position: fixed;
  width: 8px;
  height: 8px;
  background: rgba(177, 138, 82, 0.3);
  border-radius: 50%;
  animation: float-particles 10s linear infinite;
  pointer-events: none;
}
```

### Effet Spotlight

```css
.spotlight {
  position: absolute;
  width: 400px;
  height: 400px;
  background: radial-gradient(
    circle,
    rgba(177, 138, 82, 0.3) 0%,
    transparent 70%
  );
  filter: blur(40px);
  animation: spotlight-move 8s ease-in-out infinite;
}

@keyframes spotlight-move {
  0%,
  100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(100px, 100px);
  }
}
```

## 🎯 Modes Spécialisés

### Mode Minimaliste

```css
/* Cache les décorations */
.section::before,
.section::after,
.decorative-line,
.dot-pattern {
  display: none;
}

/* Simplifie les animations */
.btn {
  transition: none;
}
```

### Mode Contraste Élevé

```css
:root {
  --gold: #000;
  --rose: #000;
  --cream: #fff;
  --ink: #000;
}

.btn {
  border: 2px solid var(--ink);
  box-shadow:
    0 0 0 2px var(--cream),
    0 0 0 4px var(--ink);
}
```

### Mode Impression

```css
@media print {
  .floating-btn,
  .site-header,
  .intro,
  .scroll-hint {
    display: none;
  }

  .section {
    page-break-inside: avoid;
  }

  body {
    background: white;
    color: black;
  }
}
```

## 🔮 Animations Futures

### Scroll Timeline (CSS4)

```css
@supports (animation-timeline: view()) {
  .reveal {
    animation: slideIn linear;
    animation-timeline: view();
  }
}
```

### Container Queries (CSS4)

```css
@container (min-width: 400px) {
  .message-card {
    grid-column: span 2;
  }
}
```

## 🌐 Intégrations Possibles

### Google Analytics

```html
<script
  async
  src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", "G-XXXXXXXXXX");
</script>
```

### Formulaire de Contact

```html
<form
  class="contact-form"
  action="https://formspree.io/f/YOUR-ID"
  method="POST"
>
  <input type="text" name="message" placeholder="Ajouter un message" required />
  <button type="submit" class="btn">Envoyer</button>
</form>
```

### Compteur de Visites

```html
<script
  async
  src="https://cdn.jsdelivr.net/npm/counter-js@1.0.0/counter.min.js"
></script>
<div data-count="visits"></div>
```

## 🎨 Ressources Utiles

- **Fonts** : fonts.google.com
- **Colors** : coolors.co
- **Icons** : fontawesome.com
- **Animations** : keyframes.app
- **Effects** : getcscan.com
- **Gradients** : gradients.dev

---

**Laisse libre cours à ta créativité ! 🚀**
