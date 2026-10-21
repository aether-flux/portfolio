---
layout: ../../layouts/ProjectLayout.astro
title: Rensa - Backend framework
description: A minimal and fast backend framework in Node.js.
image:
  url:
  alt:
tags:
  [
    "rensa",
    "backend",
    "framework",
    "javascript",
    "typescript",
    "js",
    "ts",
    "nodejs",
    "node.js",
    "opinionated",
    "compose",
    "compose",
    "cli",
    "agnostic",
    "friendly",
    "developer",
    "experience",
    "http",
    "server",
    "request",
    "response",
  ]
---

# Rensa

Rensa is a powerful yet lightweight backend framework designed for developers who value speed and simplicity.

## The Reason

One day while working on a backend server, I was wondering how a backend framework actually sets up routes and starts the server. As a result, I decided to dive deep by building a backend framework myself from the ground up.

## What It Does

- File-based routing (**Compose Mode**)
- Structured Layers (middleware)
- Built-in Layers/middlewares
- Rensa CLI (**rensa dev**, **rensa routes** and more)
- Flexible configuration via **rensa.config.js**
- Custom 404 handler support
- Support for view engine (ejs)

## Installation

### Manual

Install the official package:

```sh
npm install rensa
```

### Quick Start

Get started with your first project in an instant:

```sh
npx create-rensa-app@latest
```

Select your desired template when prompted:

- `Manual`: Spins up a Rensa project in `manual` mode.
- `Compose`: Creates a new project in `compose` mode.

Know more about the templates in [this repository](https://github.com/aether-flux/rensa-templates).
Learn more about getting started in the [docs](https://rensa.vercel.app/docs/quick-start-guide).

### Rensa CLI

Rensa comes with a feature-packed CLI that can help you build with Rensa.

Some of the commands are:

##### `dev`

You can start your server with hot reload on file changes with just one command. Use this command as follows:

```sh
npx rensa dev
```

##### `route` [in Compose mode only]

You can create a new route with a single command. Specify the route path and method as follows, and Rensa CLI will create a new route for you:

```sh
npx rensa route [method] [path]
```

There are many more commands in the Rensa CLI. To know more about the Rensa CLI, visit the docs for [available commands](https://rensa.vercel.app/docs/available-commands).

## Technical Design

- Rust-powered routing system
- Routing engine uses a trie + hashmap system for efficient routing ([learn more here](https://dev.to/aetherflux/the-hidden-complexity-of-routing-why-your-requests-take-longer-than-they-should-5bbf))
- A config file **rensa.config.js** which is detected automatically when running the CLI
- Uses Node.js's **http** module for starting the server
- **Compose mode** automatically sets up routes by scanning the folder structure
- CLI can scaffold a new project and a template config file, create new routes, and start the server while watching for changes

## Links

### Website

- [Website](https://rensa.vercel.app)
- [Documentation](https://rensa.vercel.app/docs/what-is-rensa)

### GitHub

- [Rensa](https://github.com/aether-flux/rensa)
- [Rensa CLI](https://github.com/aether-flux/rensa-cli)

### Packages

- [NPM](https://npmjs.com/package/rensa)
