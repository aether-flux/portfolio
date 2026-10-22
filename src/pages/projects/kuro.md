---
layout: ../../layouts/ProjectLayout.astro
name: kuro
title: "Kuro - A Container Runtime"
description: "An experimental container runtime in Rust."
image:
  url: "https://amarch.vercel.app/kuro.webp"
  alt: "Kuro - An experimental container runtime in Rust"
tags:
  [
    "kuro",
    "container",
    "containers",
    "linux",
    "oci",
    "runtime",
    "rust",
    "namespace",
    "isolation",
    "docker",
    "podman",
    "runc",
  ]
---

# Kuro

A lightweight, experimental OCI-compliant container runtime built in Rust.

[GitHub](https://github.com/aether-flux/kuro)
[Crates.io](https://crates.io/crates/kuro-run)

## What and Why

Tools like Docker and Podman use a different runtime under the hood to create and run containers from images. Usually, its [`runc`](https://github.com/opencontainers/runc). Other reliable options are [`crun`](https://github.com/containers/crun) and [`youki`](https://github.com/containers/crun).
I wanted to learn how containers are actually isolated and ran at the OS level. So, I developed a container runtime myself, fully experimental, to learn about core concepts.
(**It is NOT production-grade or reliable. It's purely meant for educational purposes.**)
`kuro` creates a container from a bundle rootfs and `config.json` (compliant with OCI runtime spec) and pauses it, resumes it on start, sends signals through kill command, and cleans up the resources cleanly on delete.

## Features

- Complete lifecycle management with `create`, `start`, `state`, `kill`, and `delete` commands.
- Full namespace isolation and device availability as per bundle's `config.json`.
- Dropping capabilities, setting user/group IDs, and setting rlimits and Seccomp filters.
- PTY allocation for interactive terminal.

## Commands

`kuro` currently supports the following commands:

- `create --bundle <bundle-path> <container-id>`: Loads the `config.json`, creates namespaces and mount points, sets container state to _Creating_ and then _Created_, and uses a named pipe to pause and wait for `start` command.
- `start <container-id>`: Sends a ready signal to the named pipe to resume the container, set environment variables, sets user/group IDs, capabilities, rlimits, Seccomp filters, calls `execve()`, and set container state to _Running_.
- `state <container-id>`: Fetches and returns the container state json as per OCI spec. It updates state on every load, checks if process is alive, and sets status to _Stopped_ if dead.
- `kill <container-id> <signal>`: Sends `signal` to running container process. `signal` can be a number (eg. 9) or a string (eg. SIGKILL).
- `delete <container-id>`: Removes the container state, named pipes, console sockets, and cleans up all mounts and resources isolated for it.

## Prerequisites

- **Operating system**: Linux
- **Kernel features**:
  - Cgroups v2 mounted at `/sys/fs/cgroup/`
  - User namespaces enabled (CLONE_NEWUSER)
  - Mount and PID namespaces (CLONE_NEWNS, CLONE_NEWPID)
  - Support for `PR_SET_KEEPCAPS` and `PR_SET_NO_NEW_PRIVS` via `prctl`
- **Privileges**: `root/sudo` access required for container creation and mounting rootfs filesystems
- **Build toolchain**:
  - Rust 1.75+ (Edition 2021)
  - cargo
  - gcc / standard C build essentials (libc bindings)

## Installation

```sh
# Clone the repository
git clone https://github.com/aether-flux/kuro
cd kuro

# Build the binary
cargo build --release

# Move to path (optional, but recommended)
sudo cp target/release/kuro-run /usr/local/bin/
```

## Quickstart

```sh
# Prepare bundle (alpine)
mkdir -p /tmp/demo/rootfs
cd /tmp/demo
docker export $(docker create alpine) | tar -C rootfs -xvf -

# Generate standard spec (config.json)
runc spec

# Create and start the container
sudo kuro create demo-container -b .  # -b or --bundle
sudo kuro start demo-container
sudo kuro delete demo-container
```
