<template>
  <footer class="footer">
    <div class="footer__container">
      <div class="footer__content">
        <div class="footer__section">
          <img src="https://res.cloudinary.com/dzzqhjmlf/image/upload/v1747320410/logo-dark_aoaq01.png" alt="logo"
            class="footer__logo-img">
        </div>

        <div class="footer__section">
          <h3>Inicio</h3>
          <ul>
            <li><a href="#" @click.prevent="scrollToAnchor('home')">Inicio</a></li>
            <li><RouterLink to="/servicios">Servicios</RouterLink></li>
            <li><RouterLink to="/registrarse">Registrarse</RouterLink></li>
            <li><RouterLink to="/nosotros">Nosotros</RouterLink></li>
          </ul>
        </div>

        <div class="footer__section">
          <h3>Secciones</h3>
          <ul>
            <li><RouterLink to="/alquilar">Alquilar</RouterLink></li>
            <li><RouterLink to="/comprar">Comprar</RouterLink></li>
            <li><RouterLink to="/inversiones">Inversiones</RouterLink></li>
          </ul>
        </div>

        <div class="footer__section">
          <h3>Propiedades</h3>
          <ul>
            <li><RouterLink to="/departamentos">Departamentos</RouterLink></li>
            <li><RouterLink to="/casas">Casas</RouterLink></li>
            <li><RouterLink to="/terrenos">Terrenos</RouterLink></li>
          </ul>
        </div>

        <div class="footer__section">
          <h3>Contacto</h3>
          <ul>
            <li><RouterLink to="/informacion">Información</RouterLink></li>
            <li><RouterLink to="/ayuda">Ayuda</RouterLink></li>
            <li><RouterLink to="/mail">Mail</RouterLink></li>
          </ul>
        </div>

        <div class="footer__section">
          <h3>Seguinos</h3>
          <div class="footer__social">
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <i class="fab fa-instagram"></i>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <i class="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>

      <div class="footer__copyright">
        <p>Copyright ©{{ currentYear }} | Todos los derechos reservados</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const currentYear = new Date().getFullYear()

function scrollToAnchor(anchor) {
  const el = document.getElementById(anchor)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<style scoped src="./footer.scss"></style>
