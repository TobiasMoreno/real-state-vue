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
const currentYear = new Date().getFullYear()

function scrollToAnchor(anchor) {
  const el = document.getElementById(anchor)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<style lang="scss">

.footer {
  position: relative;
  padding-top: 73px;
  height: 400px;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background-image: url("https://res.cloudinary.com/dzzqhjmlf/image/upload/v1747313344/footer-house_kszi2l.jpg");
    background-size: cover;
    background-position: top 35% center;
    z-index: -2;
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #36519680;
  }

  &__container {
    position: relative;
    max-width: 1700px;
    margin: 0 auto;
    z-index: 1;
    width: 100%;
    padding: 0 32px;
  }

  &__content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    margin-bottom: 64px;
  }

  &__section {
    h3 {
      color: var(--color-white);
      font-size: 20px;
      margin-bottom: 16px;
      font-weight: 800;
      text-transform: uppercase;
    }

    ul {
      list-style: none;

      li {
        margin-bottom: 12px;

        a {
          color: var(--color-white);
          text-decoration: none;
          font-size: 14px;
          transition: color 0.3s ease;
          cursor: pointer;

          &:hover {
            opacity: 0.8;
          }
        }
      }
    }
  }

  &__logo-img {
    width: 80px;
    height: 80px;
  }

  &__social {
    display: grid;
    gap: 12px;

    a {
      color: var(--color-white);
      font-size: 20px;
      transition: color 0.3s ease;
      width: 25px;

      &:hover {
        opacity: 0.8;
      }
    }
  }

  &__copyright {
    text-align: center;
    padding-top: 16px;
    border-top: 1px solid #fcfcfc;

    p {
      margin: 0;
      font-size: 12px;
      color: var(--color-white);
    }
  }
}

@media (max-width: 1024px) {
  .footer {
    height: auto;
    padding: 48px 0 24px;

    &__container {
      padding: 0 16px;
    }

    &__content {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 24px;
      margin-bottom: 48px;
    }

    &__section {
      h3 {
        font-size: 18px;
      }
      ul li {
        margin-bottom: 8px;
      }
    }

    &__social {
      justify-content: start;
      gap: 16px;
    }
  }
}

@media (max-width: 768px) {
  .footer {
    padding: 24px 0 16px;

    &__content {
      gap: 16px;
      grid-template-columns: 1fr;
    }

    &__section {
      text-align: center;

      h3 {
        font-size: 15px;
      }
    }

    &__social {
      justify-content: center;
    }
  }
}
</style>
