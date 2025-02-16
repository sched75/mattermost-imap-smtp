# Developer Documentation

This document provides technical details for developers working on the **Mattermost IMAP/SMTP Plugin**. It covers the architecture, development setup, testing, and contribution guidelines.

---

## **Table of Contents**
1. [Architecture](#architecture)
2. [Development Setup](#development-setup)
3. [Running Tests](#running-tests)
4. [Contributing](#contributing)
5. [Code Style](#code-style)
6. [Debugging](#debugging)
7. [Deployment](#deployment)

---

## **Architecture**

The plugin is structured into several modules to ensure modularity and maintainability:

### **Server-Side**
- **`server/clients/`**: Contains clients for interacting with IMAP, SMTP, and Mattermost APIs.
  - `imap_client.js`: Fetches emails from an IMAP server.
  - `smtp_client.js`: Sends emails via an SMTP server.
  - `mattermost_client.js`: Interacts with the Mattermost API (e.g., posting messages, uploading files).
- **`server/factories/`**: Implements the Factory pattern to create instances of clients.
  - `client_factory.js`: Creates IMAP and SMTP clients based on configuration.
- **`server/handlers/`**: Centralized error handling.
  - `error_handler.js`: Logs errors and sends notifications to Mattermost.
- **`server/queues/`**: Manages asynchronous tasks.
  - `sync_queue.js`: Implements a queue for processing emails.
- **`server/engines/`**: Core logic for synchronization.
  - `sync_engine.js`: Orchestrates the synchronization between IMAP, SMTP, and Mattermost.
- **`server/plugin.js`**: Entry point for the plugin.

### **Client-Side (Webapp)**
- **`webapp/actions/`**: Redux actions for managing state.
- **`webapp/components/`**: React components for the plugin's UI.
  - `ConfigurationForm.js`: Form for adding/editing configurations.
  - `ConfigurationList.js`: Displays a list of configurations.
  - `AttachmentViewer.js`: Displays email attachments.
  - `RoutingRules.js`: Form for defining routing rules.
- **`webapp/reducers/`**: Redux reducers for state management.
- **`webapp/index.js`**: Entry point for the webapp.

### **Tests**
- **`tests/`**: Contains unit and integration tests.
  - `imap_client.test.js`: Tests for the IMAP client.
  - `smtp_client.test.js`: Tests for the SMTP client.
  - `sync_engine.test.js`: Tests for the synchronization engine.

---

## **Development Setup**

### **Prerequisites**
- Node.js (v16 or higher)
- npm (v8 or higher)
- Mattermost server (for testing the plugin)

### **Installation**
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/mattermost-imap-smtp-plugin.git
   cd mattermost-imap-smtp-plugin
   ```

2. Install dependencies:

```bash
npm install
```

3. Building the Plugin
Build the server-side code:

```bash
Copy
npm run build:server
```

4. Build the client-side code:

```bash
Copy
npm run build:webapp
```

5. Running the Plugin Locally
Start your Mattermost server.

Upload the plugin to your Mattermost instance via the System Console.

Configure the plugin using the provided UI.

6. Running Tests
Unit Tests
Run all unit tests:

```bash
Copy
npm test
```

7. Integration Tests
Run integration tests (requires a running Mattermost server):

```bash
Copy
npm run test:integration
```

8. Test Coverage
Generate a test coverage report:

```bash
Copy
npm run coverage
```

### **Contributing**
We welcome contributions! Here's how you can help:

Fork the Repository: Create a fork of the repository.

Create a Branch: Use a descriptive branch name (e.g., feature/add-routing-rules).

Make Changes: Implement your changes and ensure all tests pass.

Submit a Pull Request: Open a PR with a detailed description of your changes.

### Code Review Guidelines
Ensure your code follows the project's coding standards.

Include unit tests for new features.

Update the documentation if necessary.

### Code Style
Use ESLint for linting:

```bash
npm run lint
```
Follow the Airbnb JavaScript Style Guide.

Use Prettier for code formatting:

```bash
npm run format
```

### **Debugging**
#### **Server-Side Debugging**
Use console.log or a debugger like node-inspect:

```bash
node --inspect server/plugin.js
```

#### **Client-Side Debugging**
Use the browser's developer tools to debug React components.

#### **Logs**
Check the Mattermost server logs for plugin-related errors.

### **Deployment**
#### **Production Build**
Build the plugin for production:

```bash
npm run build
```

#### **Deploying to Mattermost**
Upload the plugin bundle (mattermost-imap-smtp-plugin.tar.gz) to your Mattermost instance.

Enable the plugin via the System Console.

Configure the plugin settings.

### **Versioning**
Follow Semantic Versioning (e.g., v1.0.0).

Update the version in plugin.json before releasing a new version.

### **Support**
For help, contact the plugin maintainers or open an issue on GitHub.

### **License**
This project is licensed under the MIT License. See the LICENSE file for details.
---

### **Explications des sections**
1. **Architecture** : Décrit la structure du projet et les responsabilités de chaque module.
2. **Development Setup** : Explique comment configurer l'environnement de développement.
3. **Running Tests** : Détaille comment exécuter les tests unitaires et d'intégration.
4. **Contributing** : Fournit des directives pour contribuer au projet.
5. **Code Style** : Explique les conventions de codage et les outils de linting/formatting.
6. **Debugging** : Donne des conseils pour déboguer le code.
7. **Deployment** : Explique comment déployer le plugin en production.

---

### **Conclusion**
Ce fichier `DEVELOPER.md` fournit une **documentation technique complète** pour les développeurs travaillant sur le plugin. Il couvre tous les aspects du développement, de l'installation à la contribution, en passant par les tests et le déploiement. 🚀
