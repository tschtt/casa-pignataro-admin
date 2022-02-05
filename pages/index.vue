<template>
  <main class="main card">
    <h2 class="center">Panel de Administración</h2>
    <p class="center">
      Bienvenido al panel de administración de
      <b>Casa Pignataro</b>. Aquí podrá modificar los datos
      de la tienda, asi como tambien las cuentas de 
      administrador, entre otras cosas.
    </p>
    <ul>
      <li>
        <nuxt-link to="/articulos" class="link icon icon-shopping-bag">
          <article>
            <h4>Artículos</h4>
            <p>
              Modificá los distintos datos de los artículos, como
              su nombre, precio o atributos. También podes exportar 
              los artículos a un excel, o importarlos desde uno.
            </p>
          </article>
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/secciones" class="link icon icon-menu">
          <article>
            <h4>Secciones, categorías y atributos</h4>
            <p>
              Configurá la forma en que se agrupan los artículos en la tienda.
              Esto permitirá que los usuarios encuentren con mayor facilidad lo 
              que estan buscando.
            </p>
            <p>
              Las <b>Secciones</b> son los grupos principales en que se divide
              la página, y estan compuestos por <b>Categorías</b>. Estas son mas 
              definidas que las secciones, y permiten enfocar mas profundamente la 
              busqueda. 
            </p>
            <p>
              Además, cada categoría puede contar con uno o mas <b>Atributos</b>.
              Estos son las caracteristicas similares con las que cuentan todos los
              artículos de una misma categoría, como pueden ser la marca, el voltaje,
              entre otras cosas.
            </p>
          </article>
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/contacto" class="link icon icon-contact-page">
          <article>
            <h4>Datos de contacto</h4>
            <p>
              Agregá, modificá o eliminá los datos con los que los usuarios 
              podrán ponerse en contacto con Casa Pignataro. Estos pueden ser
              direcciones, teléfonos, horarios, entre muchos datos más.
            </p>
          </article>
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/administradores" class="link icon icon-admin-panel-settings">
          <article>
            <h4>Administradores</h4>
            <p>
              Configurá quienes pueden acceder al panel de 
              administración. Agregá, modificá y eliminá cuentas.
            </p>
          </article>
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/perfil" class="link icon icon-account-circle">
          <article>
            <h4>Mi Perfil</h4>
            <p>
              Desde aquí podras administrar los datos relacionados a tu 
              cuenta, como cambiár tu contraseña o cerrar sesión.
            </p>
          </article>
        </nuxt-link>
      </li>
    </ul>
  </main>
</template>

<script>
import { onMounted, useRouter } from '@nuxtjs/composition-api'
import { useSession, useFetch } from '~/composition'

export default {
  setup() {
    const $router = useRouter()
    const $session = useSession()
    const $fetch = useFetch()

    const sections = [
      { 
        id: 0, 
        to: '/articulos', 
        name: 'Articulos',
        description: 'Administra',
      },
      { 
        id: 1, 
        to: '/secciones', 
        name: 'Secciones',
        description: '',
      },
      { 
        id: 2, 
        to: '/contacto', 
        name: 'Datos de Contacto',
        description: '',
      },
      { 
        id: 3, 
        to: '/administradores', 
        name: 'Administradores',
        description: '',
      },
      { 
        id: 4, 
        to: '/perfil', 
        name: 'Mi Perfil',
        description: '',
       },
    ]

    onMounted(async () => {
      try {
        await $session.refresh()
        $fetch.setRefreshCallback($session.refresh)
      } catch (error) {
        $router.push('/sesion/iniciar')
      }
    })

    return {
      sections
    }
  }
}
</script>

<style lang="scss" scoped>

.card {
  --card-padding-inline: var(--space-600);
  --card-padding-block: var(--space-600);
  --card-space: var(--space-500);
}

h2 {
  font-family: var(--font-heading);
  font-size: 30px;
  font-weight: 600;
  letter-spacing: .05em;
  text-align: center;
}

h3 {
  font-family: var(--font-heading);
  font-size: 25px;
  letter-spacing: .05em;
}

h4 {
  font-family: var(--font-heading);
  font-size: 20px;
  letter-spacing: .05em;
}

p {
  min-width: 30ch;
  max-width: 55ch;
}

ul {
  -webkit-columns: 2 40ch;
  -moz-columns: 2 40ch;
  columns: 2 40ch;

  > * + * {
    margin-top: var(--space-600);
  }

  li {
    -webkit-column-break-inside: avoid;
    page-break-inside: avoid-column;
    break-inside: avoid;
    break-inside: avoid-column;
  }
}

.icon {
  display: flex;
  justify-content: center;
  gap: var(--space-400);

  &::before {
    font-size: 30px;
  }
}

section {

  > * + * {
    margin-top: var(--space-400);
  }

  
}

article {
  > * + * {
    margin-top: var(--space-200);
  }
}


</style>
