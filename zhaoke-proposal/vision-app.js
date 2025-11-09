// ===================================
// Zhaoke Ophthalmology - Three.js Vision Scene
// Theme: Clarity Through Innovation
// ===================================

let scene, camera, renderer;
let iris, pupil, lightRays = [], particles = [];
let lensRings = [];
let mouseX = 0, mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

// ===================================
// Initialize Three.js Scene
// ===================================

function initVisionScene() {
    // Scene
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0xF8FCFF, 50, 200);

    // Camera
    camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.z = 80;

    // Renderer
    const canvas = document.getElementById('vision-canvas');
    renderer = new THREE.WebGLRenderer({ 
        canvas: canvas,
        alpha: true,
        antialias: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x40E0D0, 1.5, 100);
    pointLight1.position.set(30, 30, 30);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x4A90E2, 1.2, 100);
    pointLight2.position.set(-30, -30, 20);
    scene.add(pointLight2);

    const spotLight = new THREE.SpotLight(0xC0D5E8, 1, 150, Math.PI / 6, 0.5);
    spotLight.position.set(0, 50, 50);
    scene.add(spotLight);

    // Create visual elements
    createIrisStructure();
    createLightRays();
    createLightParticles();
    createLensRings();
    createFloatingEyeElements();

    // Event listeners
    document.addEventListener('mousemove', onMouseMove, false);
    window.addEventListener('resize', onWindowResize, false);

    // Start animation
    animateVision();
}

// ===================================
// Create Iris Structure
// ===================================

function createIrisStructure() {
    const irisGroup = new THREE.Group();
    
    // Outer iris circle
    const irisGeometry = new THREE.TorusGeometry(12, 1, 16, 50);
    const irisMaterial = new THREE.MeshPhongMaterial({
        color: 0x4A90E2,
        emissive: 0x4A90E2,
        emissiveIntensity: 0.3,
        transparent: true,
        opacity: 0.7,
        shininess: 100
    });
    iris = new THREE.Mesh(irisGeometry, irisMaterial);
    irisGroup.add(iris);
    
    // Iris patterns (radial lines)
    for (let i = 0; i < 24; i++) {
        const angle = (i / 24) * Math.PI * 2;
        const innerRadius = 3;
        const outerRadius = 12;
        
        const points = [];
        points.push(new THREE.Vector3(
            Math.cos(angle) * innerRadius,
            Math.sin(angle) * innerRadius,
            0
        ));
        points.push(new THREE.Vector3(
            Math.cos(angle) * outerRadius,
            Math.sin(angle) * outerRadius,
            0
        ));
        
        const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
        const lineMaterial = new THREE.LineBasicMaterial({
            color: 0x40E0D0,
            transparent: true,
            opacity: 0.4
        });
        const line = new THREE.Line(lineGeometry, lineMaterial);
        irisGroup.add(line);
    }
    
    // Pupil (dark center)
    const pupilGeometry = new THREE.CircleGeometry(3, 32);
    const pupilMaterial = new THREE.MeshBasicMaterial({
        color: 0x0D47A1,
        transparent: true,
        opacity: 0.9
    });
    pupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
    pupil.position.z = 0.1;
    irisGroup.add(pupil);
    
    // Add glow ring around pupil
    const glowGeometry = new THREE.RingGeometry(3, 3.5, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0x40E0D0,
        transparent: true,
        opacity: 0.6,
        side: THREE.DoubleSide
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    glow.position.z = 0.2;
    irisGroup.add(glow);
    
    // Position the iris group
    irisGroup.position.set(-30, 20, -20);
    irisGroup.rotation.x = Math.PI / 8;
    
    scene.add(irisGroup);
    
    // Store reference
    scene.userData.irisGroup = irisGroup;
}

// ===================================
// Create Light Rays
// ===================================

function createLightRays() {
    const rayCount = 8;
    
    for (let i = 0; i < rayCount; i++) {
        const angle = (i / rayCount) * Math.PI * 2;
        const distance = 60 + Math.random() * 20;
        
        // Create ray geometry
        const points = [];
        const segments = 20;
        for (let j = 0; j < segments; j++) {
            const t = j / segments;
            const x = Math.cos(angle) * distance * t;
            const y = Math.sin(angle) * distance * t;
            const z = (Math.random() - 0.5) * 10;
            points.push(new THREE.Vector3(x, y, z));
        }
        
        const rayGeometry = new THREE.BufferGeometry().setFromPoints(points);
        const rayMaterial = new THREE.LineBasicMaterial({
            color: 0xC0D5E8,
            transparent: true,
            opacity: 0.3,
            linewidth: 2
        });
        
        const ray = new THREE.Line(rayGeometry, rayMaterial);
        ray.userData.angle = angle;
        ray.userData.speed = 0.001 + Math.random() * 0.002;
        
        scene.add(ray);
        lightRays.push(ray);
    }
}

// ===================================
// Create Light Particles
// ===================================

function createLightParticles() {
    const particleCount = 300;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    
    const color1 = new THREE.Color(0x4A90E2);
    const color2 = new THREE.Color(0x40E0D0);
    const color3 = new THREE.Color(0xC0D5E8);
    
    for (let i = 0; i < particleCount; i++) {
        // Position particles in a more organized pattern
        const radius = 30 + Math.random() * 50;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        
        positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = radius * Math.cos(phi) - 30;
        
        // Color variation
        const colorChoice = Math.random();
        let color;
        if (colorChoice < 0.4) color = color1;
        else if (colorChoice < 0.7) color = color2;
        else color = color3;
        
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
        
        // Size variation
        sizes[i] = 0.5 + Math.random() * 1.5;
    }
    
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particleGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    
    const particleMaterial = new THREE.PointsMaterial({
        size: 1.5,
        vertexColors: true,
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true
    });
    
    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);
    particles.push(particleSystem);
}

// ===================================
// Create Lens Rings (Vision Clarity Metaphor)
// ===================================

function createLensRings() {
    const ringCount = 5;
    
    for (let i = 0; i < ringCount; i++) {
        const radius = 15 + i * 5;
        const ringGeometry = new THREE.TorusGeometry(radius, 0.3, 16, 100);
        const ringMaterial = new THREE.MeshPhongMaterial({
            color: 0x4A90E2,
            transparent: true,
            opacity: 0.15 - i * 0.02,
            emissive: 0x40E0D0,
            emissiveIntensity: 0.1
        });
        
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.position.set(30, -15, -30);
        ring.rotation.x = Math.PI / 3;
        ring.rotation.y = Math.PI / 6;
        ring.userData.baseRotation = ring.rotation.clone();
        ring.userData.speed = 0.0005 + i * 0.0002;
        
        scene.add(ring);
        lensRings.push(ring);
    }
}

// ===================================
// Create Floating Eye Elements
// ===================================

function createFloatingEyeElements() {
    const elementCount = 12;
    
    for (let i = 0; i < elementCount; i++) {
        const size = 1 + Math.random() * 2;
        const geometry = new THREE.SphereGeometry(size, 16, 16);
        const material = new THREE.MeshPhongMaterial({
            color: i % 2 === 0 ? 0x4A90E2 : 0x40E0D0,
            transparent: true,
            opacity: 0.6,
            emissive: i % 2 === 0 ? 0x4A90E2 : 0x40E0D0,
            emissiveIntensity: 0.3
        });
        
        const sphere = new THREE.Mesh(geometry, material);
        
        // Random position
        const radius = 40 + Math.random() * 30;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        
        sphere.position.x = radius * Math.sin(phi) * Math.cos(theta);
        sphere.position.y = radius * Math.sin(phi) * Math.sin(theta);
        sphere.position.z = radius * Math.cos(phi) - 20;
        
        sphere.userData.velocity = new THREE.Vector3(
            (Math.random() - 0.5) * 0.02,
            (Math.random() - 0.5) * 0.02,
            (Math.random() - 0.5) * 0.02
        );
        
        sphere.userData.basePosition = sphere.position.clone();
        
        scene.add(sphere);
        particles.push(sphere);
    }
}

// ===================================
// Animation Loop
// ===================================

function animateVision() {
    requestAnimationFrame(animateVision);
    
    const time = Date.now() * 0.0005;
    
    // Animate iris group
    if (scene.userData.irisGroup) {
        scene.userData.irisGroup.rotation.z = time * 0.3;
        scene.userData.irisGroup.position.y = 20 + Math.sin(time * 0.5) * 3;
        
        // Pupil dilation effect
        if (pupil) {
            const dilationScale = 1 + Math.sin(time) * 0.1;
            pupil.scale.set(dilationScale, dilationScale, 1);
        }
    }
    
    // Animate light rays
    lightRays.forEach((ray, index) => {
        ray.rotation.z += ray.userData.speed;
        ray.material.opacity = 0.2 + Math.sin(time + index) * 0.1;
    });
    
    // Animate lens rings
    lensRings.forEach((ring, index) => {
        ring.rotation.z += ring.userData.speed;
        ring.rotation.x = ring.userData.baseRotation.x + Math.sin(time + index) * 0.1;
        ring.material.opacity = 0.15 - index * 0.02 + Math.sin(time * 2 + index) * 0.05;
    });
    
    // Animate particles
    particles.forEach((particle, index) => {
        if (particle.geometry && particle.geometry.attributes.position) {
            // Particle system
            particle.rotation.y += 0.001;
            particle.rotation.x += 0.0005;
        } else if (particle.userData.velocity) {
            // Individual spheres
            particle.position.add(particle.userData.velocity);
            
            // Boundary check
            const maxDist = 60;
            if (particle.position.length() > maxDist) {
                particle.userData.velocity.multiplyScalar(-1);
            }
            
            // Floating effect
            particle.position.y += Math.sin(time + index) * 0.05;
        }
    });
    
    // Camera movement based on mouse
    camera.position.x += (mouseX * 0.03 - camera.position.x) * 0.05;
    camera.position.y += (-mouseY * 0.03 - camera.position.y) * 0.05;
    camera.lookAt(scene.position);
    
    renderer.render(scene, camera);
}

// ===================================
// Event Handlers
// ===================================

function onMouseMove(event) {
    mouseX = (event.clientX - windowHalfX) / 100;
    mouseY = (event.clientY - windowHalfY) / 100;
}

function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// ===================================
// Navigation & Scroll Effects
// ===================================

function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section, .hero');
    
    // Smooth scroll
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href;
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                    
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            }
        });
    });
    
    // Active section tracking
    const observerOptions = {
        root: null,
        rootMargin: '-40% 0px -40% 0px',
        threshold: 0
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                if (sectionId) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        if (section.id) {
            observer.observe(section);
        }
    });
}

// ===================================
// Scroll Animations
// ===================================

function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
                entry.target.style.opacity = '1';
            }
        });
    }, observerOptions);
    
    const animatedElements = document.querySelectorAll(
        '.vision-card, .design-block, .platform-card, .feature-item, .investor-card'
    );
    
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.animationDelay = `${(index % 4) * 0.1}s`;
        fadeInObserver.observe(element);
    });
}

// ===================================
// Card Interactions
// ===================================

function initCardInteractions() {
    const cards = document.querySelectorAll(
        '.vision-card, .design-block, .platform-card, .feature-item, .stat-card'
    );
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function(e) {
            // 3D tilt effect
            this.style.transition = 'transform 0.1s ease';
        });
        
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transition = 'transform 0.3s ease';
            this.style.transform = '';
        });
    });
}

// ===================================
// Progress Indicator
// ===================================

function initProgressIndicator() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #4A90E2, #40E0D0);
        z-index: 9999;
        transition: width 0.2s ease;
        box-shadow: 0 2px 10px rgba(74, 144, 226, 0.5);
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = window.pageYOffset;
        const progress = (scrolled / scrollHeight) * 100;
        progressBar.style.width = progress + '%';
    });
}

// ===================================
// Focus Effect
// ===================================

function initFocusEffect() {
    let focusTimeout;
    
    window.addEventListener('scroll', () => {
        // Add slight blur during scroll
        document.body.style.transition = 'filter 0.1s ease';
        document.body.style.filter = 'blur(0.5px)';
        
        clearTimeout(focusTimeout);
        focusTimeout = setTimeout(() => {
            document.body.style.filter = 'blur(0px)';
        }, 150);
    });
}

// ===================================
// Initialize Everything
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Three.js scene
    initVisionScene();
    
    // Initialize interactions
    initNavigation();
    initScrollAnimations();
    initCardInteractions();
    initProgressIndicator();
    initFocusEffect();
    
    // Fade in page
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
    
    // Console branding
    console.log(
        '%c Zhaoke Ophthalmology Website Proposal ',
        'background: linear-gradient(90deg, #4A90E2, #40E0D0); color: white; font-size: 18px; font-weight: bold; padding: 10px 20px; border-radius: 5px;'
    );
    console.log(
        '%c Clarity Through Innovation in Ophthalmology ',
        'background: #F8FCFF; color: #4A90E2; font-size: 14px; padding: 8px 16px; border: 2px solid #40E0D0; border-radius: 5px; margin-top: 10px;'
    );
});

// ===================================
// Performance Optimization
// ===================================

// Reduce particle count on mobile
if (window.innerWidth < 768) {
    // Adjust particle count for mobile performance
    const reduceParticles = () => {
        particles.forEach(particle => {
            if (particle.geometry && particle.geometry.attributes.position) {
                const positions = particle.geometry.attributes.position.array;
                const reducedPositions = new Float32Array(positions.length / 2);
                for (let i = 0; i < reducedPositions.length; i++) {
                    reducedPositions[i] = positions[i * 2];
                }
                particle.geometry.setAttribute('position', new THREE.BufferAttribute(reducedPositions, 3));
            }
        });
    };
    
    window.addEventListener('load', reduceParticles);
}
