# 🏥 Sistema Umanizzare

> Projeto Integrador IV — 8º Semestre de Tecnologia emCIencias da computaçao.

O **Umanizzare** é um ecossistema digital desenvolvido para a gestão e otimização de atendimentos em institutos de saúde e bem-estar. O foco principal da plataforma é oferecer uma experiência humanizada, ágil e segura tanto para os profissionais de saúde quanto para os pacientes.

---

## 🎨 Identidade Visual & Design System

Diferente de interfaces genéricas, o design do sistema foi construído sob o conceito de **Zero Preto Puro**. Toda a tipografia e elementos estruturais que normalmente usariam preto utilizam tons profundos de vinho, reduzindo a fadiga visual e trazendo um aspecto clínico sofisticado e acolhedor.

* **Principal:** Vinho Institucional (`#800020`)
* **Secundária/Destaques:** Bronze Terroso (`#c06b3e`)
* **Fundos de Seção:** Creme/Off-White (`#f3eee8` e `#fdfaf9`)
* **Textos Escuros:** Vinho Profundo (`#4a0010`)

---

## 🚀 Funcionalidades Principais

* **Autenticação Customizada:** Telas de Login e Cadastro em modo *Split Screen* ocupando 100% da viewport.
* **Navegação Lateral Fixa:** Menu estilo *Sidebar* responsivo com indicação visual de rotas ativas.
* **Isolamento de Layout:** Sistema inteligente de rotas que esconde cabeçalhos e rodapés em ambientes de autenticação.
* **Gestão de Documentos e Relatórios:** Módulos internos dedicados para prontuários e acompanhamentos.

---

## 🛠️ Tecnologias Utilizadas

O projeto foi construído utilizando as práticas mais modernas de desenvolvimento web do mercado:

* **React.js** (com TypeScript)
* **Vite** (Build tool de alta performance)
* **React Router Dom v6** (Gerenciamento de rotas e layouts dinâmicos)
* **CSS Modules** (Escopo local de estilos, evitando conflitos globais)

---

## 📂 Estrutura de Pastas Relevantes

```text
src/
├── assets/
│   └── images/          # Logotipos e mídias do sistema
├── components/
│   ├── Header/          # Menu lateral de navegação (Sidebar)
│   └── Footer/          # Rodapé institucional
├── pages/
│   ├── Home/            # Dashboard inicial
│   ├── Login/           # Tela de autenticação split-screen
│   └── Register/        # Tela de criação de conta
├── styles/
│   ├── global.css       # Resets e configurações base
│   └── theme.css        # Variáveis de cores do Design System
├── App.tsx              # Orquestrador de rotas com useLocation
└── main.tsx             # Ponto de entrada do React