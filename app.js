// ===================================
// Three.js Scene Setup
// ===================================

let scene, camera, renderer, dnaHelices = [], particles = [];
let mouseX = 0, mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

function initThreeJS() {
    // Scene
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x051639, 1, 2000);

    // Camera
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        2000
    );
    camera.position.z = 50;

    // Renderer
    const canvas = document.getElementById('bg-canvas');
    renderer = new THREE.WebGLRenderer({ 
        canvas: canvas,
        alpha: true,
        antialias: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x00FFB3, 2, 100);
    pointLight1.position.set(25, 25, 25);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x3E92CC, 1.5, 100);
    pointLight2.position.set(-25, -25, -25);
    scene.add(pointLight2);

    // Create DNA Helix structures
    createDNAHelices();

    // Create particle field
    createParticleField();

    // Add floating molecules
    createFloatingMolecules();

    // Event listeners
    document.addEventListener('mousemove', onDocumentMouseMove, false);
    window.addEventListener('resize', onWindowResize, false);

    // Start animation
    animate();
}

// ===================================
// DNA Helix Creation
// ===================================

function createDNAHelices() {
    const helixCount = 3;
    
    for (let h = 0; h < helixCount; h++) {
        const helix = new THREE.Group();
        const radius = 5 + h * 3;
        const height = 100;
        const segments = 50;
        
        // Create two strands
        for (let strand = 0; strand < 2; strand++) {
            const points = [];
            const offset = strand * Math.PI;
            
            for (let i = 0; i < segments; i++) {
                const angle = (i / segments) * Math.PI * 4 + offset;
                const y = (i / segments) * height - height / 2;
                const x = Math.cos(angle) * radius;
                const z = Math.sin(angle) * radius;
                
                points.push(new THREE.Vector3(x, y, z));
                
                // Add spheres at key points
                if (i % 3 === 0) {
                    const sphereGeometry = new THREE.SphereGeometry(0.3, 8, 8);
                    const sphereMaterial = new THREE.MeshPhongMaterial({
                        color: strand === 0 ? 0x00FFB3 : 0x3E92CC,
                        emissive: strand === 0 ? 0x00FFB3 : 0x3E92CC,
                        emissiveIntensity: 0.5,
                        transparent: true,
                        opacity: 0.8
                    });
                    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
                    sphere.position.set(x, y, z);
                    helix.add(sphere);
                }
            }
            
            // Create the strand line
            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            const material = new THREE.LineBasicMaterial({ 
                color: strand === 0 ? 0x00FFB3 : 0x3E92CC,
                transparent: true,
                opacity: 0.6
            });
            const line = new THREE.Line(geometry, material);
            helix.add(line);
        }
        
        // Add connecting rungs
        for (let i = 0; i < segments; i += 4) {
            const angle1 = (i / segments) * Math.PI * 4;
            const angle2 = angle1 + Math.PI;
            const y = (i / segments) * height - height / 2;
            
            const x1 = Math.cos(angle1) * radius;
            const z1 = Math.sin(angle1) * radius;
            const x2 = Math.cos(angle2) * radius;
            const z2 = Math.sin(angle2) * radius;
            
            const rungGeometry = new THREE.BufferGeometry().setFromPoints([
                new THREE.Vector3(x1, y, z1),
                new THREE.Vector3(x2, y, z2)
            ]);
            const rungMaterial = new THREE.LineBasicMaterial({ 
                color: 0x0A2463,
                transparent: true,
                opacity: 0.4
            });
            const rung = new THREE.Line(rungGeometry, rungMaterial);
            helix.add(rung);
        }
        
        // Position helices
        helix.position.x = (h - 1) * 40;
        helix.position.y = 0;
        helix.rotation.x = Math.PI / 6;
        
        scene.add(helix);
        dnaHelices.push(helix);
    }
}

// ===================================
// Particle Field
// ===================================

function createParticleField() {
    const particleCount = 500;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    const color1 = new THREE.Color(0x00FFB3);
    const color2 = new THREE.Color(0x3E92CC);
    
    for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 200;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 200;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 200;
        
        const color = Math.random() > 0.5 ? color1 : color2;
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
    }
    
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const material = new THREE.PointsMaterial({
        size: 0.5,
        vertexColors: true,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending
    });
    
    const particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);
    particles.push(particleSystem);
}

// ===================================
// Floating Molecules
// ===================================

function createFloatingMolecules() {
    const moleculeCount = 20;
    
    for (let i = 0; i < moleculeCount; i++) {
        const group = new THREE.Group();
        
        // Central sphere
        const centralGeometry = new THREE.SphereGeometry(1, 16, 16);
        const centralMaterial = new THREE.MeshPhongMaterial({
            color: 0x00FFB3,
            emissive: 0x00FFB3,
            emissiveIntensity: 0.3,
            transparent: true,
            opacity: 0.7
        });
        const central = new THREE.Mesh(centralGeometry, centralMaterial);
        group.add(central);
        
        // Orbiting spheres
        const orbitCount = 3 + Math.floor(Math.random() * 3);
        for (let j = 0; j < orbitCount; j++) {
            const angle = (j / orbitCount) * Math.PI * 2;
            const distance = 2 + Math.random() * 1;
            
            const orbitGeometry = new THREE.SphereGeometry(0.4, 8, 8);
            const orbitMaterial = new THREE.MeshPhongMaterial({
                color: 0x3E92CC,
                emissive: 0x3E92CC,
                emissiveIntensity: 0.2,
                transparent: true,
                opacity: 0.6
            });
            const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
            orbit.position.x = Math.cos(angle) * distance;
            orbit.position.z = Math.sin(angle) * distance;
            
            // Add connecting line
            const lineGeometry = new THREE.BufferGeometry().setFromPoints([
                new THREE.Vector3(0, 0, 0),
                new THREE.Vector3(orbit.position.x, 0, orbit.position.z)
            ]);
            const lineMaterial = new THREE.LineBasicMaterial({ 
                color: 0x0A2463,
                transparent: true,
                opacity: 0.3
            });
            const line = new THREE.Line(lineGeometry, lineMaterial);
            group.add(line);
            group.add(orbit);
        }
        
        // Random position
        group.position.x = (Math.random() - 0.5) * 150;
        group.position.y = (Math.random() - 0.5) * 150;
        group.position.z = (Math.random() - 0.5) * 100;
        
        // Random scale
        const scale = 0.5 + Math.random() * 0.5;
        group.scale.set(scale, scale, scale);
        
        scene.add(group);
        particles.push(group);
    }
}

// ===================================
// Animation Loop
// ===================================

function animate() {
    requestAnimationFrame(animate);
    
    const time = Date.now() * 0.0001;
    
    // Rotate DNA helices
    dnaHelices.forEach((helix, index) => {
        helix.rotation.y = time * (0.5 + index * 0.1);
        helix.position.y = Math.sin(time + index) * 5;
    });
    
    // Rotate particles
    particles.forEach((particle, index) => {
        if (particle.rotation) {
            particle.rotation.x += 0.001 * (index % 2 === 0 ? 1 : -1);
            particle.rotation.y += 0.002 * (index % 3 === 0 ? 1 : -1);
        }
    });
    
    // Camera movement based on mouse
    camera.position.x += (mouseX * 0.05 - camera.position.x) * 0.05;
    camera.position.y += (-mouseY * 0.05 - camera.position.y) * 0.05;
    camera.lookAt(scene.position);
    
    renderer.render(scene, camera);
}

// ===================================
// Event Handlers
// ===================================

function onDocumentMouseMove(event) {
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
    const sections = document.querySelectorAll('.section');
    
    // Smooth scroll on nav click
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
                
                // Update active state
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        });
    });
    
    // Update active nav on scroll
    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);
    
    sections.forEach(section => observer.observe(section));
    
    // Parallax effect on scroll
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.molecular-card, .design-card, .feature-card');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index % 3) * 0.1;
            const yPos = -(scrolled * speed / 100);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// ===================================
// Card Interactions
// ===================================

function initCardInteractions() {
    const cards = document.querySelectorAll('.molecular-card, .design-card, .feature-card, .page-module');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function(e) {
            this.style.transition = 'all 0.3s ease';
            
            // Add glow effect
            const glow = document.createElement('div');
            glow.className = 'card-glow';
            glow.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: radial-gradient(circle at center, rgba(0, 255, 179, 0.1) 0%, transparent 70%);
                pointer-events: none;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            
            if (this.style.position !== 'absolute' && this.style.position !== 'fixed') {
                this.style.position = 'relative';
            }
            
            this.appendChild(glow);
            setTimeout(() => glow.style.opacity = '1', 10);
        });
        
        card.addEventListener('mouseleave', function() {
            const glow = this.querySelector('.card-glow');
            if (glow) {
                glow.style.opacity = '0';
                setTimeout(() => glow.remove(), 300);
            }
        });
        
        // 3D tilt effect
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
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
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
                entry.target.style.opacity = '1';
            }
        });
    }, observerOptions);
    
    const animatedElements = document.querySelectorAll('.molecular-card, .design-card, .feature-card, .page-module, .enhancement-item, .marketing-card');
    
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.animationDelay = `${index * 0.1}s`;
        fadeInObserver.observe(element);
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
        background: linear-gradient(90deg, #00FFB3, #3E92CC);
        z-index: 9999;
        transition: width 0.2s ease;
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
// Initialize Everything
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    initThreeJS();
    initNavigation();
    initCardInteractions();
    initScrollAnimations();
    initProgressIndicator();
    
    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
    
    console.log('%c Peg-Bio Website Proposal ', 'background: #00FFB3; color: #0A2463; font-size: 20px; font-weight: bold; padding: 10px;');
    console.log('%c Engineering Molecules for a Healthier Future ', 'background: #0A2463; color: #00FFB3; font-size: 14px; padding: 5px;');
});
