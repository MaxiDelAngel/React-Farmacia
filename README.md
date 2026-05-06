# Pharmacy CRUD System

Aplicación web para la gestión de una farmacia desarrollada con React, TypeScript y Supabase.

El sistema permite administrar medicamentos, inventario y operaciones básicas mediante una interfaz moderna y responsiva.

---

## 👨‍💻 Autor

Maximiliano Del Angel Ojeda

- LinkedIn: https://www.linkedin.com/in/maximilianodelangelojeda/

⭐ Si el proyecto te fue útil, puedes dejar una estrella y seguirme en LinkedIn.

---

## 🚀 Tecnologías

- React
- React Router
- TypeScript
- Vite
- Supabase

---

## ✨ Funcionalidades

- Crear medicamentos
- Editar medicamentos
- Eliminar medicamentos
- Visualizar inventario
- Gestión de stock
- Persistencia de datos con Supabase
- Interfaz responsiva

---

## 📦 Instalación

Clona el repositorio:

```bash
git clone <repository-url>

## Variables de entorno

1. Crea un archivo .env local basado en .env.example.
2. Define estas variables:

- VITE_SUPABASE_URL
- VITE_SUPABASE_PUBLISHABLE_KEY

Importante:

- Nunca subas .env al repositorio.
- La llave publishable (anon) de Supabase si puede estar en frontend.
- Nunca uses la service_role key en React o Vite.

## Deploy en GitHub Pages

Este proyecto ya incluye workflow de deploy en:

- .github/workflows/deploy-pages.yml

Pasos para activarlo en tu repo React-Farmacia:

1. Ve a Settings > Pages.
2. En Build and deployment, selecciona Source: GitHub Actions.
3. Ve a Settings > Secrets and variables > Actions > New repository secret.
4. Crea estos secretos:

- VITE_SUPABASE_URL
- VITE_SUPABASE_PUBLISHABLE_KEY

5. Haz push a main y GitHub publicara en Pages automaticamente.

Nota: el workflow usa VITE_BASE_PATH=/React-Farmacia/ para que funcione con tu nombre de repo.