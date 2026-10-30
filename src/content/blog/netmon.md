---
title: Building netmon, a NETwork MONitoring CLI in C and eBPF
description: A network monitoring and connecion state tracking CLI with eBPF and C.
date: 2026-10-30
tags: ["netmon", "c", "ebpf", "bpf", "cli", "tui"]
---

In systems programming, you eventually hit a wall with traditional userspace tools. Standard utilities force the kernel to copy packets and data across the user-kernel boundary repeatedly. In high-throughput situations, this overhead adds up pretty fast.

At the same time, my feed started to be filled with a Linux technology, eBPF (extended Berkeley Packet Filter). So with a feeling of FOMO, I decided to make a low-level network monitor that aggregates state entirely inside kernel space and renders a clean TUI output. This resulted in **netmon**, built in C and eBPF with `libbpf` and `bpftool`.

# The Shift from Event Streams to Aggregation

I feel like most beginner eBPF tutorials rely on ring buffers (`BPF_MAP_TYPE_RINGBUF`) to stream every single packet to userspace, and so did I. But when I looked at the cluttered output with most entries being repetitive kernel stuff, I thought there has to be a better way to do this.

So with some googling and AI-ing, I found out about the existence of hashmaps (`BPF_MAP_TYPE_HASH`). Perfect. Just what I needed.

Now for every event at the tracepoint `tp/tcp/tcp_probe`, the code creates a unique key and finds whether it already exists in the hashmap. If it does not, its a first occurrence and creates a new value for the key and pushes it. If it does exist, the existing value is fetched and updated.

## Hashmap Key and its Identity Crisis

To capture both packet metrics and connection states, `netmon` attaches to two tracepoints:

- `tp/tcp/tcp_probe`: Fires on packet transmission/reception to aggregate byte and packet counts.
- `tp/sock/inet_sock_set_state`: Fires when any socket transitions between states (`ESTABLISHED`, `CLOSE`, etc).

In the earlier stages, I tried creating the key with a combination of the PID and the 4-tuple `(saddr, daddr, sport, dport)` (s=source, d=destination). It didn't take long for that to break though.

When an application initiates a connection, the `SYN` packet triggers in the application's process context. But when the acknowledgement `ACK` returns, the kernel processes it in a hardware interrupt or softirq context (like ksoftirqd). As a result, the `bpf_get_current_pid_tgid()` returns a kernel or other PId and not the application's PID, thus changing the value of the key, as a result of which the earlier hashmap entry can't be found.

To fix this, I just dropped the PID field from the key structure. Network connections are uniquely identified by the 4-tuple `(saddr, daddr, sport, dport)`. By relying on this, the connection state transitions are tracked well.

## Value in the Hashmap

The value is also a custom struct, with the following fields:

```c
struct conn_stats {
  __u64 packet_count;
  __u64 total_bytes;
  __u64 last_seen_timestamp;
  __u64 handshake_latency_ns;
  __u32 state;
};
```

> The types `__u64` and `__u32` come from `"vmlinux.h"` or `<linux/types.h>`, but they might cause conflicts if used. If it does cause conflicts, use `unsigned int` for `__u32` and `unsigned long long` for `__u64`.

We'll not discuss about the field `handshake_latency_ns` since it hasn't been implemented fully. The other fields are pretty self-explanatory.

# Safe Kernel Memory Access (CO-RE : Compile Once, Run Everywhere)

Reading socket states from pointers inside `tcp_probe` (`skaddr`) is a minefield. Direct pointer dereferencing like `sk->sk_socket->state` makes the eBPF verifier mad at you (source: personal experience).

`netmon` uses CO-RE properties and `libbpf` helper macros to handle this:

- Auto-generates `vmlinux.h` via `bpftool` to get the kernel tracepoint event structures and other types.
- Uses `BPF_CORE_READ` helper macro to safely traverse kernel pointers at runtime without the verifier screaming.

# TUI

Now that the data is received from the kernel, we're done! ... or so one would think.

It was just half the work done. The remaining half was to display the data to the userspace.

Initially, I just used printf statements to log the data. It worked, but it piled up pretty quickly. For a better look, I added cursor-reset commands in printf (`\033[H\033[J`), flushed stdout every iteration, and a better structured table-like formatting, `netmon` now looked like a polished, real-time dashboard that feels at home with other tools like `top`.

It currently refreshes every second to fetch new data. I was torn between whether to go for a busy loop like this, or a event-driven loop `epoll/io_uring`. However, I think with the number of times the system does stuff (I don't know what most of them do, but they do show up), an event-driven loop might get woken up more than one time in a second, so I figured a simple while loop with `sleep(1)` should suffice.

# The End

So here we have, `netmon`. Building this gave me a deep appreciation of the powers of eBPF, though I'm sure I've just barely touched the surface.

If you want to look at the code or run it yourself, here's the repository links:

- [GitHub Repo](https://github.com/aether-flux/netmon)
- [Codeberg Repo](https://codeberg.org/aether-flux/netmon)
