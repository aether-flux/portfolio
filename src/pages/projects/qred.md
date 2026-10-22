---
layout: ../../layouts/ProjectLayout.astro
name: qred
title: "Qred - QR encoder from scratch"
description: "A fast and lightweight QR generator in Rust"
image:
  url: "https://amarch.vercel.app/qred.webp"
  alt: "Qred - A fast and lightweight QR generator in Rust"
tags:
  [
    "qred",
    "qr",
    "quick",
    "response",
    "code",
    "encode",
    "decode",
    "scan",
    "product",
    "rust",
    "math",
    "error",
    "detection",
    "correction",
    "galois field",
    "reed solomon",
    "bit mask",
    "bit",
    "bit manipulation",
  ]
---

# QRED

A fast, zero-dependency*, light-footprint native QR code generator in Rust.

> *There is one dependency `image` to convert the QR code to an actual image.

[GitHub](https://github.com/aether-flux/qred)
[Crates.io](https://crates.io/crates/qred)
[Documentation](https://docs.rs/qred)

---

# Quickstart

## Installation

```sh
cargo add qred
```

And it will be there in your `Cargo.toml`.

## Example Code (Default QR code generation)

```rust
use qred::QrCode;

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let qrcode = QrCode::new("sample text to convert")?;
    qrcode.save_image("sample_qr.png")?;     // or "sample_qr.jpg" if you want to store as JPG/JPEG

    // Or specify a custom error correction level
    // let qrcode = QrCode::new_with_error_level("important text", "H");
    // More about error correction levels below
    Ok(())
}
```

## Example Code (Generate QR code with custom colors)

```rust
use qred::{QrCode, QrOptions};

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let qrcode = QrCode::new("https://amarch.vercel.app")?;

    let mut options = QrOptions::default();
    options.set_dark_color("#EBE3A7")?;
    options.set_light_color("#2C5745")?;

    qrcode.save_image_with_options("sample_custom_qr.png", &options)?;

    Ok(())
}
```

---

# Under The Hood

## Data Encoding

A QR code has different modes of encoding the data to be stored. The three supported modes are as follows:

1. **Numeric**: Stores only numeric values. Supported characters: 0-9. [3 digits - 10 bits; 2 digits - 7 bits; 1 digit: 4 bits]
2. **Alphanumeric**: Stores some characters with numeric values. Supported characters: `0-9 | A-Z | [ ] (space) | '$' | '%' | '*' | '+' | '-' | '.' | '/' | ':'`. [2 characters - 11 bits; 1 character - 6 bits]
3. **Byte**: Supports all ISO 8859-1 characters (or often UTF-8). [1 character - 8 bits]

The initial text content is taken as a string slice (&str), the most efficient encoding mode is decided, and length of the text is calculated. Following this, the best suited version and spec for the QR code is determined, and the bits start to be pushed into the buffer.
I have used a `BitBuffer` object with a buffer `Vec<u8>` to store the bytes to be placed on the QR code. The first four bits are the mode bits:

- Numeric: 0001
- Alphanumeric: 0010
- Byte: 0100

Next, the number of character bits are determined from the QR code spec, and the length of the text is pushed. Afterwards, the actual text content in bytes is added into the buffer.

To clean things up, terminator bits (4 0's) are added, padded with 0s to the nearest next multiple of 8, and bytes 0xEC and 0x11 are added alternatively to pad the bytes up to the remaining spaces of message body.

## The Math

Let's start with the lowest level, galois field. I've used GF(2^8), and set up the log and antilog (exp) tables. Since 256 entries in log table and 256 entries in exp table combine to form 512 entries, and the content always stay the same, it's better to reuse a single instance of this rather than re-computing every time. So, we pass a borrowed instance of GF(2^8) with a lifetime ensuring that the ReedSolomon struct can outlive the galois field instance.

The core of error correction is Reed Solomon codes. It takes the data bytes and number of error correction bytes required, and sets up the generator polynomial. Then bytes in the data are divided by the generator polynomial, and a vector stores the running remainder. This running remainder gives us the required error correction bytes to be appended to the end of the previously generated message bytes.

## Masks

A mask is essentially a formula according to which a pixel in the QR code grid would be dark or light. There are 8 different masks ranging from 000 to 111 in binary.

The code iterates through every single mask, generates the 15 bit format string and places it, and applies the mask. It is then scored on 4 penalty rules, and the mask with the least penalty score is chosen as the final mask.

### Mask IDs and formulae

1. 000 - (r + c) % 2 == 0
2. 001 - r % 2 == 0
3. 010 - c % 3 == 0
4. 011 - (r + c) % 3 == 0
5. 100 - ((r / 2) + (c / 3)) % 2 == 0
6. 101 - ((r * c) % 2) + ((r * c) % 3) == 0
7. 110 - (((r * c) % 2) + ((r * c) % 3)) % 2 == 0
8. 111 - (((r + c) % 2) + ((r * c) % 3)) % 2 == 0

## Penalty Rules

1. Runs of 5 or more same-color blocks in a row/column. [ 3 + (n - 5) points per run of length n >= 5 ]
2. 2x2 blocks of same-color modules. [ 3 points per 2x2 block ]
3. Patterns matching 1011101 surrounded by 4 light modules (finder-like false positive patterns). [ 40 points per occurrence ]
4. Proportion of dark vs light modules deviating from 50%. [ 10 * floor(abs(dark_percent - 50) / 5) points ]

## Format String

A format string is a 15-bit binary string that stores information needed for a scanner to decode the QR code. At different parts of the QR code, two copies of the format string are placed.

A format string has 5 data bits and 10 extra bits for error correction (BCH code). Of the 5 data bits, 2 bits represent the error correction level and the other 3 tell which mask was applied.

## Error Correction Levels

There are 4 error correction levels, and each denote how much portion of the QR code can be destroyed safely and still be decoded accurately.

- L (Low): 7%
- M (Medium): 15%
- Q (Quartile): 25%
- H (High): 30%

---

# Performance & Benchmarks

Benchmarks measured complete execution pipelines (data encoding, RS arithmetic, mask penalty scoring, and PNG rendering to disk):

| Operation                  | Output                   | Execution Time |
| :------------------------- | :----------------------- | :------------: |
| **Matrix Generation Only** | Pure Bit Matrix          | **179.92 µs**  |
| **Default Image Save**     | Standard PNG Export      | **237.19 µs**  |
| **Single Custom Color**    | Custom Foreground        | **274.65 µs**  |
| **Dual Custom Colors**     | Custom Fore & Background | **281.26 µs**  |
