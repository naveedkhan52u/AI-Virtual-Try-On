# AI Virtual Try-On

A fashion-first web app for previewing clothing before buying.

## Current stage
The homepage is implemented as a Vite frontend prototype.

## Real AI try-on integration
The UI is intentionally ready for a server-side virtual try-on API. Do not put an AI provider API key in browser code.

Recommended flow:

1. User selects a catalog garment.
2. User uploads a clear person photo.
3. Browser sends the person image and garment image to a server endpoint.
4. The server calls the selected virtual try-on provider/model.
5. Server returns the generated image URL.
6. UI displays the generated result.

## Provider configuration

Set these server-side environment variables when the backend integration is added:

`TRYON_API_URL`
`TRYON_API_KEY`

The exact provider/model should be selected before production integration because virtual try-on APIs differ in input format, pricing, output quality, and licensing.

## Run locally

```bash
npm install
npm run dev
```

## Important

The current demo result is not an actual AI-generated try-on. It is a visual placeholder used to validate the complete user flow before connecting a real inference service.
